import SwiftUI
import WatchConnectivity

@MainActor final class WatchStore: NSObject, ObservableObject, WCSessionDelegate {
  @Published var plan: [[String: Any]] = []
  @Published var queue: [WatchPacket] = []
  @Published var draft: [WatchSet] = []
  @Published var status = "Open FitLive on your paired iPhone."
  private var link = ""
  private var timezone = "UTC"
  private let session = WCSession.default
  private let directory = FileManager.default.urls(
    for: .applicationSupportDirectory, in: .userDomainMask)[0]
  override init() {
    super.init()
    if let data = try? Data(contentsOf: directory.appendingPathComponent("queue.json")),
      let saved = try? JSONDecoder().decode([WatchPacket].self, from: data)
    {
      queue = saved
    }
    if let data = try? Data(contentsOf: directory.appendingPathComponent("draft.json")),
      let saved = try? JSONDecoder().decode([WatchSet].self, from: data)
    {
      draft = saved
    }
    link = UserDefaults.standard.string(forKey: "draft-account-link") ?? ""
    session.delegate = self
    session.activate()
  }
  private func persist<T: Encodable>(_ value: T, name: String) -> Bool {
    do {
      try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
      try JSONEncoder().encode(value).write(
        to: directory.appendingPathComponent(name),
        options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
      return true
    } catch {
      status = "Could not save this draft on the Watch."
      return false
    }
  }
  func add(_ set: WatchSet) {
    guard draft.count < 80 else { return }
    let next = draft + [set]
    if persist(next, name: "draft.json") { draft = next }
  }
  func finish() {
    guard !link.isEmpty, !draft.isEmpty, queue.count < 20 else {
      status = "Connect the phone or sync pending sessions first."
      return
    }
    let formatter = DateFormatter()
    formatter.calendar = Calendar(identifier: .gregorian)
    formatter.locale = Locale(identifier: "en_US_POSIX")
    formatter.timeZone = TimeZone(identifier: timezone)
    formatter.dateFormat = "yyyy-MM-dd"
    let packet = WatchPacket(
      id: UUID().uuidString, accountLink: link, date: formatter.string(from: Date()), sets: draft,
      effort: "About right", status: "completed")
    if persist(queue + [packet], name: "queue.json") {
      queue.append(packet)
      draft = []
      _ = persist(draft, name: "draft.json")
      retry()
    }
  }
  func retry() {
    guard session.activationState == .activated else { return }
    for packet in queue where packet.accountLink == link {
      if let data = try? JSONEncoder().encode(packet) {
        session.transferUserInfo(["workout": data])
      }
    }
    status = queue.isEmpty ? "No pending sessions" : "Waiting for review and save on iPhone"
  }
  func context(_ context: [String: Any]) {
    let newLink = context["accountLink"] as? String ?? ""
    if !link.isEmpty && newLink != link {
      draft = []
      _ = persist(draft, name: "draft.json")
    }
    link = newLink
    UserDefaults.standard.set(link, forKey: "draft-account-link")
    timezone = context["timezone"] as? String ?? "UTC"
    plan = context["plan"] as? [[String: Any]] ?? []
    retry()
  }
  nonisolated func session(
    _ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState,
    error: Error?
  ) { Task { @MainActor in self.context(session.receivedApplicationContext) } }
  nonisolated func session(
    _ session: WCSession, didReceiveApplicationContext applicationContext: [String: Any]
  ) { Task { @MainActor in self.context(applicationContext) } }
  nonisolated func session(_ session: WCSession, didReceiveUserInfo userInfo: [String: Any] = [:]) {
    Task { @MainActor in
      guard let id = userInfo["acknowledged"] as? String,
        let account = userInfo["accountLink"] as? String
      else { return }
      self.queue.removeAll { $0.id == id && $0.accountLink == account }
      _ = self.persist(self.queue, name: "queue.json")
      self.status = "Session saved to FitLive"
    }
  }
}
@main struct FitLiveWatchApp: App {
  @StateObject private var store = WatchStore()
  var body: some Scene { WindowGroup { WatchSessionView().environmentObject(store) } }
}
struct WatchSessionView: View {
  @EnvironmentObject var store: WatchStore
  @State private var exercise = ""
  @State private var reps = 10
  @State private var load = 0.0
  @State private var rpe = 7.0
  @State private var restUntil: Date?
  var body: some View {
    NavigationStack {
      List {
        Label("FitLive", systemImage: "dumbbell")
        Picker("Exercise", selection: $exercise) {
          Text("Choose").tag("")
          ForEach(Array(store.plan.enumerated()), id: \.offset) { _, x in
            Text(x["name"] as? String ?? "").tag(x["name"] as? String ?? "")
          }
        }
        Stepper("\(reps) reps", value: $reps, in: 1...100)
        Stepper("\(load, specifier: "%.1f") kg", value: $load, in: 0...500, step: 0.5)
        Stepper("Effort \(rpe, specifier: "%.0f")/10", value: $rpe, in: 1...10)
        Button("Log set") {
          let muscle =
            store.plan.first { $0["name"] as? String == exercise }?["muscle"] as? String ?? ""
          store.add(WatchSet(exercise: exercise, muscle: muscle, reps: reps, load: load, rpe: rpe))
          restUntil = Date().addingTimeInterval(90)
        }.disabled(exercise.isEmpty)
        if let restUntil, restUntil > Date() { Text(restUntil, style: .timer) }
        Text("\(store.draft.count) sets in draft")
        Button("Finish & send to iPhone") { store.finish() }.disabled(store.draft.isEmpty)
        Text(store.status).font(.caption)
        if !store.queue.isEmpty {
          Button("Retry \(store.queue.count) pending sessions") { store.retry() }
        }
      }.onChange(of: exercise) { _, name in
        load = store.plan.first { $0["name"] as? String == name }?["load"] as? Double ?? 0
      }
    }.tint(Color(red: 0.6, green: 0.8, blue: 0.85))
  }
}
