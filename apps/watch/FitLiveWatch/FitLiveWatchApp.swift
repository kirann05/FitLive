import SwiftUI

@main
struct FitLiveWatchApp: App {
    var body: some Scene { WindowGroup { WatchSessionView() } }
}
struct WatchSessionView: View {
    @AppStorage("draft-reps") private var reps = 10
    @AppStorage("draft-load") private var load = 20.0
    @AppStorage("draft-sets") private var sets = 0
    var body: some View {
        NavigationStack {
            List {
                Label("FitLive", systemImage: "waveform.path.ecg").font(.headline)
                Text("Device-only workout draft").font(.caption).foregroundStyle(.secondary)
                Stepper("\(reps) reps", value: $reps, in: 1...50)
                Stepper("\(load, specifier: "%.1f") kg", value: $load, in: 0...200, step: 0.5)
                Button("Count set") { sets += 1 }
                Text("\(sets) sets counted")
                Text("Not synced to your account. Record the session in FitLive web.").font(.caption)
                Button("Clear count", role: .destructive) { sets = 0 }
            }
        }
        .tint(.cyan)
    }
}
