import Foundation

struct DailySummary: Codable, Identifiable {
  var id: String
  let date: String
  let sleep: Int?
  let rhr: Double?
  let hrv: Double?
  let source: String
  let sampleAt: String
  let syncAt: String
  var steps: Double? = nil
  var activeEnergy: Double? = nil
  var workoutMinutes: Double? = nil
  var workoutCount: Int? = nil
  var bodyMass: Double? = nil
  var stale: Bool = false
  var readableTypes: [String] = []
  private enum CodingKeys: String, CodingKey {
    case id, date, sleep, rhr, hrv, source, sampleAt, syncAt, steps, activeEnergy, workoutMinutes, workoutCount, bodyMass, stale, readableTypes
  }
  func encode(to encoder: Encoder) throws {
    var c = encoder.container(keyedBy: CodingKeys.self)
    try c.encode(steps, forKey: .steps)
    try c.encode(activeEnergy, forKey: .activeEnergy)
    try c.encode(workoutMinutes, forKey: .workoutMinutes)
    try c.encode(workoutCount, forKey: .workoutCount)
    try c.encode(bodyMass, forKey: .bodyMass)
    try c.encode(stale, forKey: .stale)
    try c.encode(readableTypes, forKey: .readableTypes)
    try c.encode(id, forKey: .id)
    try c.encode(date, forKey: .date)
    try c.encode(sleep, forKey: .sleep)
    try c.encode(rhr, forKey: .rhr)
    try c.encode(hrv, forKey: .hrv)
    try c.encode(source, forKey: .source)
    try c.encode(sampleAt, forKey: .sampleAt)
    try c.encode(syncAt, forKey: .syncAt)
  }
}
