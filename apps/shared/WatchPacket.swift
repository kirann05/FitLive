import Foundation

struct WatchSet: Codable {
  let exercise: String
  let muscle: String
  let reps: Int
  let load: Double
  let rpe: Double
}
struct WatchPacket: Codable, Identifiable {
  let id: String
  let accountLink: String
  let date: String
  let sets: [WatchSet]
  let effort: String
  let status: String
}
