import Foundation

@main struct NativeCoreTests {
  static func main() throws {
    let zero = Date(timeIntervalSince1970: 0)
    let point: (Double) -> Date = { zero.addingTimeInterval($0) }
    precondition(HealthMath.unionSeconds([]) == 0)
    precondition(
      HealthMath.unionSeconds([
        (point(0), point(100)), (point(50), point(150)), (point(200), point(250)),
      ]) == 200, "Overlap must be counted once")
    precondition(
      HealthMath.unionSeconds([(point(100), point(0)), (point(0), point(0))]) == 0,
      "Invalid intervals must not create sleep")
    precondition(
      HealthMath.unionSeconds([(point(0), point(100)), (point(0), point(100))]) == 100,
      "Duplicate source intervals must not double sleep")
    let summary = DailySummary(
      id: "test", date: "2026-09-09", sleep: 400, rhr: nil, hrv: nil, source: "HealthKit",
      sampleAt: "2026-09-09T12:00:00.000Z", syncAt: "2026-09-09T12:00:00.000Z")
    let object =
      try JSONSerialization.jsonObject(with: JSONEncoder().encode(summary)) as! [String: Any]
    precondition(
      object["rhr"] is NSNull && object["hrv"] is NSNull,
      "Missing reads must remain explicit nulls in the API contract")
    let packet = WatchPacket(
      id: UUID().uuidString, accountLink: "fixture", date: "2026-09-08",
      sets: [WatchSet(exercise: "Squat", muscle: "Quads", reps: 10, load: 20, rpe: 7)],
      effort: "About right", status: "completed")
    let restored = try JSONDecoder().decode(WatchPacket.self, from: JSONEncoder().encode(packet))
    precondition(
      restored.id == packet.id && restored.date == packet.date
        && restored.accountLink == packet.accountLink,
      "Offline persistence must preserve identity, date and account binding")
    print(
      "PASS: 6 native core checks (interval merging, missing-signal encoding, durable packet identity)"
    )
  }
}
