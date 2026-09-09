import SwiftUI
import WatchConnectivity

@main
struct FitLiveApp: App {
    var body: some Scene { WindowGroup { CompanionView() } }
}

struct CompanionView: View {
    @AppStorage("sync-endpoint") private var endpoint = ""
    @State private var token = ""
    @State private var consent = false
    @State private var busy = false
    @State private var status = "Not connected"
    @State private var latest: DailySummary?
    private let bridge = HealthBridge()
    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Label("FitLive", systemImage: "waveform.path.ecg").font(.largeTitle.bold())
                    Text("A little context. A clearer next step.").foregroundStyle(.secondary)
                }
                Section("Apple Health") {
                    Text("Read sleep, resting heart rate and HRV to build your personal baseline. FitLive does not write to Apple Health.")
                    Toggle("Allow summaries to be sent to my FitLive server", isOn: $consent)
                    if let latest {
                        LabeledContent("Latest sleep", value: "\(latest.sleep / 60)h \(latest.sleep % 60)m")
                        LabeledContent("Date", value: latest.date)
                    }
                    Text(status).accessibilityLabel("Sync status: \(status)")
                    Button(busy ? "Syncing…" : "Connect & sync Health") { Task { await sync() } }.disabled(busy || !consent || endpoint.isEmpty || token.isEmpty)
                }
                Section("Your server") {
                    TextField("HTTPS health sync endpoint", text: $endpoint).textInputAutocapitalization(.never).keyboardType(.URL).autocorrectionDisabled()
                    SecureField("Device token / access token", text: $token).textInputAutocapitalization(.never).autocorrectionDisabled()
                    Text("Use a deployed API that accepts your device credential. A private Sites browser login is not a native API credential.").font(.footnote).foregroundStyle(.secondary)
                }
                Section("Privacy") {
                    Button("Disconnect this device", role: .destructive) { Keychain.delete(); token = ""; consent = false; latest = nil; status = "Disconnected locally. Revoke the server token in your account too." }
                    Text("Permission does not guarantee readable data. Missing Health records are never displayed as zero recovery.").font(.footnote)
                }
            }
            .tint(Color(red: 0.22, green: 0.37, blue: 0.44))
            .navigationTitle("Your daily compass")
            .task { token = Keychain.read() }
        }
        .preferredColorScheme(.light)
    }
    @MainActor private func sync() async {
        busy = true
        defer { busy = false }
        do {
            guard let url = URL(string: endpoint), url.scheme == "https", url.host != nil else { throw BridgeError.invalidEndpoint }
            try Keychain.save(token)
            try await bridge.authorize()
            let summaries = try await bridge.summaries()
            guard !summaries.isEmpty else { throw BridgeError.noData }
            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
            request.httpBody = try JSONEncoder().encode(["samples": summaries])
            request.timeoutInterval = 30
            let (_, response) = try await URLSession.shared.data(for: request)
            guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else { throw BridgeError.rejected((response as? HTTPURLResponse)?.statusCode ?? 0) }
            latest = summaries.last
            status = "Saved \(summaries.count) daily summaries. Synced just now."
        } catch { status = error.localizedDescription }
    }
}
