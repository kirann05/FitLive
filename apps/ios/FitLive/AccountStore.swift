import CryptoKit
import Foundation
import SwiftUI

/// Account ownership comes from the paired device token, never from an editable user ID.
@MainActor final class AccountStore: ObservableObject {
  @Published var state: [String: Any] = [:]
  @Published var daily: [String: Any] = [:]
  @Published var busy = false
  @Published var draftRevision = 0
  @Published var error: String?
  @Published var pending: Data?
  @Published var connected = false
  private var version = 0
  var endpoint: String { UserDefaults.standard.string(forKey: "api-origin") ?? "" }
  private var queueURL: URL {
    FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
      .appendingPathComponent("fitlive-pending.json")
  }
  init() {
    pending = try? Data(contentsOf: queueURL)
    connected = !Keychain.read().isEmpty && !endpoint.isEmpty
  }
  var profile: [String: Any] { state["profile"] as? [String: Any] ?? [:] }
  func rows(_ key: String) -> [[String: Any]] { state[key] as? [[String: Any]] ?? [] }
  func request(_ path: String, body: Data? = nil) async throws -> [String: Any] {
    guard let origin = URL(string: endpoint), origin.scheme == "https", origin.host != nil,
      origin.user == nil, origin.password == nil, let url = URL(string: path, relativeTo: origin)
    else { throw BridgeError.invalidEndpoint }
    var request = URLRequest(url: url)
    request.timeoutInterval = 30
    request.httpMethod = body == nil ? "GET" : "POST"
    request.httpBody = body
    request.setValue("Bearer \(Keychain.read())", forHTTPHeaderField: "Authorization")
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    let (data, response) = try await URLSession.shared.data(for: request)
    guard let response = response as? HTTPURLResponse else { throw BridgeError.rejected(0) }
    guard (200..<300).contains(response.statusCode) else {
      throw BridgeError.rejected(response.statusCode)
    }
    guard let value = try JSONSerialization.jsonObject(with: data) as? [String: Any] else {
      throw BridgeError.rejected(0)
    }
    return value
  }
  private func accept(_ snapshot: [String: Any]) throws {
    guard let state = snapshot["state"] as? [String: Any], let version = snapshot["version"] as? Int
    else { throw BridgeError.rejected(0) }
    self.state = state
    self.version = version
  }
  func refresh() async {
    guard !busy, connected else { return }
    busy = true
    defer { busy = false }
    do {
      try accept(await request("/api/state"))
      daily = try await request("/api/daily")
      publishWatch()
      error = nil
    } catch { self.error = error.localizedDescription }
  }
  @discardableResult func send(_ command: [String: Any], operationID: String = UUID().uuidString)
    async -> Bool
  {
    guard !busy, pending == nil else {
      error = "Finish or resolve the pending save first."
      return false
    }
    do {
      let body = try JSONSerialization.data(
        withJSONObject: ["id": operationID, "version": version, "command": command],
        options: [.sortedKeys])
      try FileManager.default.createDirectory(
        at: queueURL.deletingLastPathComponent(), withIntermediateDirectories: true)
      try body.write(
        to: queueURL, options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
      pending = body
    } catch {
      self.error = "Could not protect the pending save on this device."
      return false
    }
    return await retry()
  }
  @discardableResult func retry() async -> Bool {
    guard !busy, let body = pending else { return false }
    busy = true
    defer { busy = false }
    do {
      try accept(await request("/api/state", body: body))
      if let object = try? JSONSerialization.jsonObject(with: body) as? [String: Any],
        let id = object["id"] as? String
      {
        let fromWatch = PhoneWatchBridge.shared.inbox.contains { $0.id == id }
        if !fromWatch, let command = object["command"] as? [String: Any],
          command["type"] as? String == "workout", let saved = command["sets"] as? [[String: Any]]
        {
          let current = readDraft()
          if current.count >= saved.count,
            let prefix = try? JSONSerialization.data(
              withJSONObject: Array(current.prefix(saved.count)), options: [.sortedKeys]),
            let sent = try? JSONSerialization.data(withJSONObject: saved, options: [.sortedKeys]),
            prefix == sent
          {
            saveDraft(Array(current.dropFirst(saved.count)))
          }
        }
        PhoneWatchBridge.shared.acknowledge(id)
      }
      try? FileManager.default.removeItem(at: queueURL)
      pending = nil
      error = nil
      do {
        daily = try await request("/api/daily")
        publishWatch()
      } catch { self.error = "Saved. The daily view could not refresh yet." }
      return true
    } catch {
      self.error = error.localizedDescription
      return false
    }
  }
  func discardPending() {
    try? FileManager.default.removeItem(at: queueURL)
    pending = nil
  }
  func connect(origin: String, token: String) async {
    guard pending == nil else {
      error = "Resolve the pending save before changing accounts."
      return
    }
    guard let url = URL(string: origin), url.scheme == "https", url.host != nil, url.user == nil,
      url.password == nil
    else {
      error = BridgeError.invalidEndpoint.localizedDescription
      return
    }
    do {
      try Keychain.save(token.trimmingCharacters(in: .whitespacesAndNewlines))
      UserDefaults.standard.set(url.absoluteString, forKey: "api-origin")
      connected = true
      state = [:]
      daily = [:]
      PhoneWatchBridge.shared.beginAccount()
      await refresh()
    } catch { self.error = error.localizedDescription }
  }
  private var draftURL: URL {
    let identity = endpoint + "|" + Keychain.read()
    let hash = SHA256.hash(data: Data(identity.utf8)).map { String(format: "%02x", $0) }.joined()
    return queueURL.deletingLastPathComponent().appendingPathComponent("workout-" + hash + ".json")
  }
  func readDraft() -> [[String: Any]] {
    guard let data = try? Data(contentsOf: draftURL) else { return [] }
    return (try? JSONSerialization.jsonObject(with: data) as? [[String: Any]]) ?? []
  }
  func saveDraft(_ draft: [[String: Any]]) {
    do {
      try FileManager.default.createDirectory(
        at: draftURL.deletingLastPathComponent(), withIntermediateDirectories: true)
      try JSONSerialization.data(withJSONObject: draft).write(
        to: draftURL, options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
      draftRevision += 1
    } catch { self.error = "The workout draft could not be saved on this device." }
  }
  private func publishWatch() {
    PhoneWatchBridge.shared.publish(
      plan: daily["plan"] as? [[String: Any]] ?? [],
      timezone: profile["timezone"] as? String ?? TimeZone.current.identifier)
  }
  func disconnect() {
    PhoneWatchBridge.shared.disconnect()
    try? FileManager.default.removeItem(at: draftURL)
    Keychain.delete()
    discardPending()
    state = [:]
    daily = [:]
    connected = false
    UserDefaults.standard.removeObject(forKey: "api-origin")
  }
}
