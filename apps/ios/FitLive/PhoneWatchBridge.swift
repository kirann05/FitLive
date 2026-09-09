import Foundation
import WatchConnectivity

@MainActor final class PhoneWatchBridge: NSObject, ObservableObject, WCSessionDelegate {
  static let shared = PhoneWatchBridge()
  @Published var inbox: [WatchPacket] = []
  private let session = WCSession.default
  private var link: String { UserDefaults.standard.string(forKey: "watch-account-link") ?? "" }
  private let file = FileManager.default.urls(
    for: .applicationSupportDirectory, in: .userDomainMask)[0].appendingPathComponent(
      "watch-inbox.json")
  override init() {
    super.init()
    if let data = try? Data(contentsOf: file),
      let packets = try? JSONDecoder().decode([WatchPacket].self, from: data)
    {
      inbox = packets
    }
    if WCSession.isSupported() {
      session.delegate = self
      session.activate()
    }
  }
  func beginAccount() {
    UserDefaults.standard.set(UUID().uuidString, forKey: "watch-account-link")
    inbox = []
    persist()
  }
  func publish(plan: [[String: Any]], timezone: String) {
    guard session.activationState == .activated else { return }
    if link.isEmpty { beginAccount() }
    try? session.updateApplicationContext(["accountLink": link, "timezone": timezone, "plan": plan])
  }
  func disconnect() {
    UserDefaults.standard.removeObject(forKey: "watch-account-link")
    inbox = []
    persist()
    try? session.updateApplicationContext(["accountLink": "", "plan": []])
  }
  private func persist() {
    do {
      try FileManager.default.createDirectory(
        at: file.deletingLastPathComponent(), withIntermediateDirectories: true)
      try JSONEncoder().encode(inbox).write(
        to: file, options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
    } catch { /* A packet is never acknowledged until the server accepts it. */  }
  }
  func acknowledge(_ id: String) {
    guard inbox.contains(where: { $0.id == id }) else { return }
    inbox.removeAll { $0.id == id }
    persist()
    session.transferUserInfo(["acknowledged": id, "accountLink": link])
  }
  func receive(_ info: [String: Any]) {
    guard let data = info["workout"] as? Data, data.count <= 100_000,
      let packet = try? JSONDecoder().decode(WatchPacket.self, from: data),
      packet.accountLink == link, !link.isEmpty, packet.sets.count <= 80,
      !inbox.contains(where: { $0.id == packet.id })
    else { return }
    inbox.append(packet)
    persist()
  }
  nonisolated func session(
    _ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState,
    error: Error?
  ) {}
  nonisolated func sessionDidBecomeInactive(_ session: WCSession) {}
  nonisolated func sessionDidDeactivate(_ session: WCSession) { session.activate() }
  nonisolated func session(_ session: WCSession, didReceiveUserInfo userInfo: [String: Any] = [:]) {
    Task { @MainActor in self.receive(userInfo) }
  }
}
