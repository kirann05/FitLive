import CryptoKit
import Foundation
import HealthKit

/// Reads only the minimum recovery inputs. Missing reads never imply permission was granted.
final class HealthBridge {
  private let store = HKHealthStore()
  private let sleepType = HKCategoryType(.sleepAnalysis)
  private let rhrType = HKQuantityType(.restingHeartRate)
  private let hrvType = HKQuantityType(.heartRateVariabilitySDNN)

  func authorize() async throws {
    guard HKHealthStore.isHealthDataAvailable() else { throw BridgeError.unavailable }
    try await store.requestAuthorization(toShare: [], read: [sleepType, rhrType, hrvType])
  }

  private func samples(_ type: HKSampleType, from: Date, to: Date) async throws -> [HKSample] {
    try await withCheckedThrowingContinuation { continuation in
      let predicate = HKQuery.predicateForSamples(withStart: from, end: to)
      let query = HKSampleQuery(
        sampleType: type, predicate: predicate, limit: HKObjectQueryNoLimit, sortDescriptors: nil
      ) { _, samples, error in
        if let error {
          continuation.resume(throwing: error)
        } else {
          continuation.resume(returning: samples ?? [])
        }
      }
      store.execute(query)
    }
  }

  func summaries(now: Date = Date()) async throws -> [DailySummary] {
    let calendar = Calendar.current
    let iso = ISO8601DateFormatter()
    iso.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    let dayFormatter = DateFormatter()
    dayFormatter.locale = Locale(identifier: "en_US_POSIX")
    dayFormatter.calendar = Calendar(identifier: .gregorian)
    dayFormatter.dateFormat = "yyyy-MM-dd"
    var result: [DailySummary] = []
    for offset in (0..<29).reversed() {
      let day = calendar.date(byAdding: .day, value: -offset, to: now)!
      let noon = calendar.date(bySettingHour: 12, minute: 0, second: 0, of: day)!
      let from = calendar.date(byAdding: .day, value: -1, to: noon)!
      let to = min(noon, now)
      let sleepSamples = try await samples(sleepType, from: from, to: to).compactMap {
        $0 as? HKCategorySample
      }
      let asleep = sleepSamples.filter {
        HKCategoryValueSleepAnalysis.allAsleepValues.contains(
          HKCategoryValueSleepAnalysis(rawValue: $0.value) ?? .inBed)
      }
      guard !asleep.isEmpty else { continue }
      let seconds = HealthMath.unionSeconds(
        asleep.map { (max($0.startDate, from), min($0.endDate, to)) })
      let resting = try await samples(rhrType, from: from, to: to).compactMap {
        $0 as? HKQuantitySample
      }
      let variability = try await samples(hrvType, from: from, to: to).compactMap {
        $0 as? HKQuantitySample
      }
      let rhrValues = resting.map {
        $0.quantity.doubleValue(for: HKUnit.count().unitDivided(by: .minute()))
      }
      let hrvValues = variability.map { $0.quantity.doubleValue(for: .secondUnit(with: .milli)) }
      let rhr = rhrValues.isEmpty ? nil : rhrValues.reduce(0, +) / Double(rhrValues.count)
      let hrv = hrvValues.isEmpty ? nil : hrvValues.reduce(0, +) / Double(hrvValues.count)
      let date = dayFormatter.string(from: day)
      let minutes = Int((seconds / 60).rounded())
      let latest = asleep.map(\.endDate).max() ?? to
      let identity = "\(date)|\(minutes)|\(rhr ?? -1)|\(hrv ?? -1)|\(iso.string(from: latest))"
      let hash = SHA256.hash(data: Data(identity.utf8)).map { String(format: "%02x", $0) }.joined()
      result.append(
        DailySummary(
          id: "hk-" + hash, date: date, sleep: minutes, rhr: rhr, hrv: hrv, source: "HealthKit",
          sampleAt: iso.string(from: latest), syncAt: iso.string(from: now)))
    }
    return result
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
    case .noData: "No readable sleep data was found. Check Health access and try again."
    }
  }
}
