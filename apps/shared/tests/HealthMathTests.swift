import Foundation
@main struct HealthMathTests {
 static func main() {
  // Deterministic fixtures only; never sent to HealthKit or a server.
  precondition(HealthMath.sum([]) == nil)
  precondition(HealthMath.mean([]) == nil)
  precondition(HealthMath.sum([100, 240]) == 340) // steps
  precondition(HealthMath.sum([25.5, 30]) == 55.5) // active kcal
  precondition(HealthMath.sum([20, 35]) == 55) // workout minutes
  precondition([20, 35].count == 2) // workouts
  precondition(HealthMath.mean([60, 64]) == 62) // resting HR
  precondition(HealthMath.mean([30, 40]) == 35) // HRV ms
  let first=Date(timeIntervalSince1970:0)
  precondition(HealthMath.unionSeconds([(first,first.addingTimeInterval(60)),(first.addingTimeInterval(30),first.addingTimeInterval(90))]) == 90)
  print("Health summary arithmetic fixtures passed; no hardware evidence.")
 }
}
