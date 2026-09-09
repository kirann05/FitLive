import SwiftUI

struct NativeSettings: View {
  @EnvironmentObject var account: AccountStore
  @ObservedObject private var watch = PhoneWatchBridge.shared
  @State private var endpoint = ""
  @State private var token = ""
  @State private var healthConsent = false
  @State private var healthBusy = false
  @State private var healthStatus = "No Health sync yet"
  @State private var confirmDisconnect = false
  @State private var confirmDiscard = false
  var body: some View {
    NavigationStack {
      Form {
        Section {
          Text("A little context. A clearer next step.").font(.title2)
          Text(
            "Create your real workspace on FitLive web, then use Account → Connections to pair this device."
          )
        }
        Section("Account connection") {
          TextField("HTTPS backend address", text: $endpoint).textInputAutocapitalization(.never)
            .autocorrectionDisabled().keyboardType(.URL)
          SecureField("One-time device token", text: $token).textInputAutocapitalization(.never)
            .autocorrectionDisabled()
          Button("Connect account") {
            Task {
              await account.connect(origin: endpoint, token: token)
              token = ""
            }
          }.disabled(token.isEmpty || endpoint.isEmpty || account.busy)
          if let error = account.error { Text(error).foregroundStyle(.red).font(.caption) }
        }
        if account.connected {
          Section("Apple Health") {
            Text(
              "Read sleep, resting heart rate and HRV for your personal baseline. FitLive never writes to Apple Health."
            )
            Toggle("Send these summaries to my FitLive account", isOn: $healthConsent)
            Button(healthBusy ? "Reading Health…" : "Connect & sync Health") {
              Task { await syncHealth() }
            }.disabled(!healthConsent || healthBusy || account.busy || account.pending != nil)
            Text(healthStatus).font(.caption)
            Text(
              "Health access can be changed in the Health app. An empty result cannot tell us whether access was denied or no records exist."
            ).font(.footnote).foregroundStyle(.secondary)
          }
          Section("Sessions from your Watch") {
            if watch.inbox.isEmpty { Text("No sessions waiting for review.") }
            ForEach(watch.inbox) { packet in
              VStack(alignment: .leading) {
                Text("\(packet.date) · \(packet.sets.count) sets").font(.headline)
                Text(packet.sets.map { "\($0.exercise): \($0.reps) reps" }.joined(separator: " · "))
                  .font(.caption)
                Button("Confirm & save session") {
                  Task {
                    if let data = try? JSONEncoder().encode(packet.sets),
                      let sets = try? JSONSerialization.jsonObject(with: data)
                    {
                      await account.send(
                        [
                          "type": "workout", "date": packet.date, "sets": sets,
                          "effort": packet.effort, "status": packet.status,
                        ], operationID: packet.id)
                    }
                  }
                }.disabled(account.busy || account.pending != nil)
              }
            }
          }
          Section("Pending save") {
            if account.pending != nil {
              Text(
                "A save is awaiting confirmation. Retrying uses the same identifier to prevent duplicates."
              )
              Button("Retry save") { Task { await account.retry() } }
              Button("Discard pending save", role: .destructive) { confirmDiscard = true }
            } else {
              Text("No pending changes")
            }
          }
          Section("Privacy") {
            Text(
              "Export or delete your account from FitLive web → Account → Privacy. Disconnecting removes this device’s credential and pending save; revoke its token on the web too."
            )
            Button("Disconnect device", role: .destructive) { confirmDisconnect = true }
          }
        }
      }.navigationTitle("Your account").task { endpoint = account.endpoint }
        .confirmationDialog(
          "Discard this pending save? Refresh your account afterward before entering it again.",
          isPresented: $confirmDiscard, titleVisibility: .visible
        ) {
          Button("Discard", role: .destructive) {
            account.discardPending()
            Task { await account.refresh() }
          }
        }
        .confirmationDialog(
          "Disconnect and discard any unsaved changes on this device?",
          isPresented: $confirmDisconnect, titleVisibility: .visible
        ) { Button("Disconnect", role: .destructive) { account.disconnect() } }
    }
  }
  private func syncHealth() async {
    guard account.profile["consent"] as? Bool == true, account.state["mode"] as? String == "real"
    else {
      healthStatus = "Finish your real workspace setup on FitLive web first."
      return
    }
    guard account.profile["timezone"] as? String == TimeZone.current.identifier else {
      healthStatus =
        "Set your FitLive profile time zone to \(TimeZone.current.identifier) before syncing this device."
      return
    }
    healthBusy = true
    defer { healthBusy = false }
    do {
      let bridge = HealthBridge()
      try await bridge.authorize()
      let summaries = try await bridge.summaries()
      guard !summaries.isEmpty else { throw BridgeError.noData }
      let data = try JSONEncoder().encode(summaries)
      let samples = try JSONSerialization.jsonObject(with: data)
      if await account.send(["type": "health", "samples": samples]) {
        healthStatus = "Saved \(summaries.count) summaries to your shared account."
      } else {
        healthStatus = "Not confirmed. Resolve the pending save before syncing again."
      }
    } catch { healthStatus = error.localizedDescription }
  }
}
