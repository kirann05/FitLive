import Foundation

struct DailySummary: Codable, Identifiable {
  let id: String
  let date: String
  let sleep: Int
  let rhr: Double?
  let hrv: Double?
  let source: String
  let sampleAt: String
  let syncAt: String
  private enum CodingKeys: String, CodingKey {
    case id, date, sleep, rhr, hrv, source, sampleAt, syncAt
  }
  func encode(to encoder: Encoder) throws {
    var c = encoder.container(keyedBy: CodingKeys.self)
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
