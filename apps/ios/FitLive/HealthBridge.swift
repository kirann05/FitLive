import CryptoKit
import Foundation
import HealthKit

/// Written, unverified on device. Raw samples and query anchors remain device-local.
@MainActor final class HealthBridge {
  private let store = HKHealthStore()
  private let types: [(String, HKSampleType)] = [
    ("sleep", HKCategoryType(.sleepAnalysis)), ("rhr", HKQuantityType(.restingHeartRate)),
    ("hrv", HKQuantityType(.heartRateVariabilitySDNN)), ("steps", HKQuantityType(.stepCount)),
    ("activeEnergy", HKQuantityType(.activeEnergyBurned)), ("workouts", HKObjectType.workoutType()),
    ("bodyMass", HKQuantityType(.bodyMass))]
  private struct Record: Codable {
    let id: String; let type: String; let start: Date; let end: Date
    let value: Double; let source: String; let priority: Int
  }
  private struct LocalState: Codable {
    var since: Date = Date().addingTimeInterval(-35 * 86400)
    var timezone: String = TimeZone.current.identifier
    var anchors: [String: Data] = [:]
    var records: [String: Record] = [:]
    var dirty: Set<String> = []
    var stale: Set<String> = []
    var summaries: [String: DailySummary] = [:]
  }
  private var file: URL {
    FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
      .appendingPathComponent("fitlive-health-reader.json")
  }
  private func save(_ state: LocalState) throws {
    try FileManager.default.createDirectory(at: file.deletingLastPathComponent(), withIntermediateDirectories: true)
    try JSONEncoder().encode(state).write(to: file, options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
    var url = file; var values = URLResourceValues(); values.isExcludedFromBackup = true
    try url.setResourceValues(values)
  }
  func authorize() async throws {
    guard HKHealthStore.isHealthDataAvailable() else { throw BridgeError.unavailable }
    for (_, type) in types { try await store.requestAuthorization(toShare: [], read: [type]) }
  }
  private func changes(_ type: HKSampleType, anchor: HKQueryAnchor?, since: Date) async throws -> ([HKSample], [HKDeletedObject], HKQueryAnchor?) {
    try await withCheckedThrowingContinuation { continuation in
      let query = HKAnchoredObjectQuery(type: type, predicate: HKQuery.predicateForSamples(withStart: since, end: nil), anchor: anchor, limit: HKObjectQueryNoLimit) { _, added, deleted, next, error in
        if let error { continuation.resume(throwing: error) }
        else { continuation.resume(returning: (added ?? [], deleted ?? [], next)) }
      }
      store.execute(query)
    }
  }
  private func record(_ sample: HKSample, type: String) -> Record? {
    var value: Double
    if let sleep = sample as? HKCategorySample {
      guard HKCategoryValueSleepAnalysis.allAsleepValues.contains(HKCategoryValueSleepAnalysis(rawValue: sleep.value) ?? .inBed) else { return nil }
      value = sleep.endDate.timeIntervalSince(sleep.startDate)
    } else if let workout = sample as? HKWorkout { value = workout.duration / 60 }
    else if let quantity = sample as? HKQuantitySample {
      let unit: HKUnit
      switch type { case "rhr": unit = .count().unitDivided(by: .minute())
      case "hrv": unit = .secondUnit(with: .milli)
      case "steps": unit = .count()
      case "activeEnergy": unit = .kilocalorie()
      default: unit = .gramUnit(with: .kilo) }
      value = quantity.quantity.doubleValue(for: unit)
    } else { return nil }
    guard value.isFinite, value >= 0 else { return nil }
    return Record(id: sample.uuid.uuidString, type: type, start: sample.startDate, end: sample.endDate, value: value,
      source: sample.sourceRevision.source.bundleIdentifier,
      priority: sample.device?.model?.localizedCaseInsensitiveContains("watch") == true ? 0 : 1)
  }
  func summaries(now: Date = Date()) async throws -> [DailySummary] {
    var state: LocalState
    if FileManager.default.fileExists(atPath: file.path) { state = try JSONDecoder().decode(LocalState.self, from: Data(contentsOf: file)) }
    else { state = LocalState() }
    let calendar = Calendar.current
    let formatter = DateFormatter(); formatter.calendar = Calendar(identifier: .gregorian)
    formatter.locale = Locale(identifier: "en_US_POSIX"); formatter.dateFormat = "yyyy-MM-dd"
    func key(_ date: Date) -> String { formatter.string(from: date) }
    let dates = (0..<29).map { calendar.date(byAdding: .day, value: -$0, to: now)! }
    if state.timezone != TimeZone.current.identifier { state = LocalState() }
    func affected(_ record: Record) -> Set<String> {
      // Sleep is assigned to the noon-ending window; other types use the start day.
      if record.type != "sleep" { return [key(record.start)] }
      return Set(dates.filter { date in
        let noon = calendar.date(bySettingHour: 12, minute: 0, second: 0, of: date)!
        return record.end > calendar.date(byAdding: .day, value: -1, to: noon)! && record.start < noon
      }.map(key))
    }
    for (name, type) in types {
      let anchor = try state.anchors[name].map { try NSKeyedUnarchiver.unarchivedObject(ofClass: HKQueryAnchor.self, from: $0) } ?? nil
      let (added, deleted, next) = try await changes(type, anchor: anchor, since: state.since)
      for deletion in deleted {
        if let old = state.records.removeValue(forKey: deletion.uuid.uuidString) {
          let days = affected(old); state.dirty.formUnion(days); state.stale.formUnion(days)
        } else { state.dirty.formUnion(dates.map(key)); state.stale.formUnion(dates.map(key)) }
      }
      for sample in added {
        if let old = state.records.removeValue(forKey: sample.uuid.uuidString) { state.dirty.formUnion(affected(old)) }
        if let next = record(sample, type: name) { state.records[next.id] = next; state.dirty.formUnion(affected(next)) }
      }
      if let next { state.anchors[name] = try NSKeyedArchiver.archivedData(withRootObject: next, requiringSecureCoding: true) }
      // Anchor and raw changes are persisted together, never independently.
      try save(state)
    }
    state.dirty.insert(key(now))
    let iso = ISO8601DateFormatter(); iso.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    for date in dates where state.dirty.contains(key(date)) {
      let day = key(date); let start = calendar.startOfDay(for: date)
      let end = min(calendar.date(byAdding: .day, value: 1, to: start)!, now)
      let noon = calendar.date(bySettingHour: 12, minute: 0, second: 0, of: date)!
      let sleepStart = calendar.date(byAdding: .day, value: -1, to: noon)!; let sleepEnd = min(noon, now)
      func selected(_ type: String) -> [Record] {
        let records = state.records.values.filter { $0.type == type && (type == "sleep" ? $0.end > sleepStart && $0.start < sleepEnd : $0.start >= start && $0.start < end) }
        let source = records.sorted { ($0.priority, $0.source) < ($1.priority, $1.source) }.first?.source
        return records.filter { $0.source == source }.sorted { ($0.start, $0.id) < ($1.start, $1.id) }
      }
      let sleep = selected("sleep"), resting = selected("rhr"), variability = selected("hrv")
      let steps = selected("steps"), energy = selected("activeEnergy"), workouts = selected("workouts"), mass = selected("bodyMass")
      let all = sleep + resting + variability + steps + energy + workouts + mass
      guard !all.isEmpty || state.stale.contains(day) else { continue }
      func mean(_ records: [Record]) -> Double? { HealthMath.mean(records.map(\.value)) }
      func sum(_ records: [Record]) -> Double? { HealthMath.sum(records.map(\.value)) }
      let seconds = HealthMath.unionSeconds(sleep.map { (max($0.start, sleepStart), min($0.end, sleepEnd)) })
      var summary = DailySummary(id: "pending", date: day, sleep: sleep.isEmpty ? nil : Int((seconds / 60).rounded()), rhr: mean(resting), hrv: mean(variability), source: "HealthKit", sampleAt: iso.string(from: all.map(\.end).max() ?? start), syncAt: iso.string(from: now))
      summary.steps = sum(steps); summary.activeEnergy = sum(energy)
      summary.workoutMinutes = sum(workouts); summary.workoutCount = workouts.isEmpty ? nil : workouts.count
      summary.bodyMass = mass.last?.value; summary.stale = state.stale.contains(day)
      summary.readableTypes = types.compactMap { selected($0.0).isEmpty ? nil : $0.0 }
      // Stable content identity excludes delivery time; retrying a summary is idempotent.
      let identity = "\(day)|\(summary.sleep ?? -1)|\(summary.rhr ?? -1)|\(summary.hrv ?? -1)|\(summary.steps ?? -1)|\(summary.activeEnergy ?? -1)|\(summary.workoutMinutes ?? -1)|\(summary.workoutCount ?? -1)|\(summary.bodyMass ?? -1)|\(summary.stale)|\(summary.sampleAt)"
      let hash = SHA256.hash(data: Data(identity.utf8)).map { String(format: "%02x", $0) }.joined()
      summary.id = "hk-" + hash
      state.summaries[day] = summary; state.dirty.remove(day)
    }
    let validDays = Set(dates.map(key)); state.summaries = state.summaries.filter { validDays.contains($0.key) }
    let cutoff = now.addingTimeInterval(-35 * 86400)
    state.records = state.records.filter { $0.value.end >= cutoff }
    state.stale = state.stale.intersection(validDays)
    state.dirty = state.dirty.intersection(validDays)
    try save(state)
    // Cached summaries remain available until the existing durable upload queue confirms them.
    return state.summaries.values.sorted { $0.date < $1.date }
  }
}
enum BridgeError: LocalizedError {
  case unavailable, invalidEndpoint
  case rejected(Int)
  case noData
  var errorDescription: String? {
    switch self {
    case .unavailable: "Health data is unavailable on this device."
    case .invalidEndpoint: "Enter a valid HTTPS sync endpoint."
    case .rejected(let code):
      "Sync was not accepted (HTTP \(code)). Your data remains in Apple Health."
    case .noData: "No readable health data was found. Check Health access and try again."
    }
  }
}
