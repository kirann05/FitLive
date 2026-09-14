import Foundation

enum HealthMath {
  static func sum(_ values: [Double]) -> Double? { values.isEmpty ? nil : values.reduce(0, +) }
  static func mean(_ values: [Double]) -> Double? { guard let total = sum(values) else { return nil }; return total / Double(values.count) }
  /// Merges overlapping asleep intervals to avoid double counting stages and duplicate sources.
  static func unionSeconds(_ intervals: [(Date, Date)]) -> TimeInterval {
    let sorted = intervals.filter { $0.1 > $0.0 }.sorted { $0.0 < $1.0 }
    guard var current = sorted.first else { return 0 }
    var total: TimeInterval = 0
    for interval in sorted.dropFirst() {
      if interval.0 <= current.1 {
        current.1 = max(current.1, interval.1)
      } else {
        total += current.1.timeIntervalSince(current.0)
        current = interval
      }
    }
    return total + current.1.timeIntervalSince(current.0)
  }

}
