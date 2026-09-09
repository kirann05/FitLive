import SwiftUI

@main struct FitLiveApp: App {
  @StateObject private var account = AccountStore()
  var body: some Scene {
    WindowGroup {
      FitLiveRoot().environmentObject(account).tint(Color(red: 0.22, green: 0.37, blue: 0.44))
        .preferredColorScheme(.light)
    }
  }
}
struct FitLiveRoot: View {
  @EnvironmentObject var account: AccountStore
  @State private var settings = false
  var body: some View {
    Group {
      if account.connected {
        TabView {
          NativeToday().tabItem { Label("Today", systemImage: "sun.max") }
          NativeTrain().tabItem { Label("Train", systemImage: "dumbbell") }
          NativeEat().tabItem { Label("Eat", systemImage: "leaf") }
          NativeProgress().tabItem { Label("Progress", systemImage: "chart.xyaxis.line") }
          NativeCoach().tabItem { Label("Coach", systemImage: "bubble.left.and.bubble.right") }
        }
        .safeAreaInset(edge: .top) {
          HStack {
            Text("FitLive").font(.headline)
            Spacer()
            if account.busy { ProgressView() }
            Button("Account", systemImage: "person.crop.circle") { settings = true }
          }.padding(.horizontal).padding(.vertical, 8).background(.thinMaterial)
        }
        .safeAreaInset(edge: .bottom) {
          if let error = account.error {
            VStack(alignment: .leading) {
              Text(error).font(.caption)
              if account.pending != nil {
                Button("Retry pending save") { Task { await account.retry() } }
              }
            }.padding().frame(maxWidth: .infinity).background(Color.yellow.opacity(0.12))
          }
        }
        .sheet(isPresented: $settings) { NativeSettings() }
        .task { await account.refresh() }
      } else {
        NativeSettings()
      }
    }
  }
}
struct NativeToday: View {
  @EnvironmentObject var account: AccountStore
  @State private var energy = 3
  @State private var soreness = 2
  @State private var motivation = 3
  @State private var note = ""
  var body: some View {
    NavigationStack {
      Form {
        Section("Your next step") {
          let action = account.daily["recommendation"] as? [String: Any] ?? [:]
          Text(action["title"] as? String ?? "A little context. A clearer next step.").font(.title2)
          Text(action["text"] as? String ?? "Connect your account to see your plan.")
        }
        Section("Recovery context") {
          let recovery = account.daily["recovery"] as? [String: Any] ?? [:]
          LabeledContent("Readiness", value: recovery["band"] as? String ?? "No recent data")
          LabeledContent("Confidence", value: recovery["confidence"] as? String ?? "Low")
          Text("An explanation of recent signals, not a medical score.").font(.footnote)
            .foregroundStyle(.secondary)
        }
        Section("How do you feel?") {
          Stepper("Energy: \(energy)/5", value: $energy, in: 1...5)
          Stepper("Soreness: \(soreness)/5", value: $soreness, in: 1...5)
          Stepper("Motivation: \(motivation)/5", value: $motivation, in: 1...5)
          TextField("Anything to keep in mind?", text: $note)
          Button("Save check-in") {
            Task {
              if await account.send([
                "type": "checkin", "energy": energy, "soreness": soreness, "motivation": motivation,
                "note": note,
              ]) {
                note = ""
              }
            }
          }.disabled(account.busy || account.pending != nil)
        }
      }.navigationTitle("Today").refreshable { await account.refresh() }
    }
  }
}
struct NativeTrain: View {
  @EnvironmentObject var account: AccountStore
  @State private var selected = ""
  @State private var reps = 10
  @State private var load = 0.0
  @State private var rpe = 7.0
  @State private var draft: [[String: Any]] = []
  @State private var effort = "About right"
  @State private var partial = false
  @State private var restUntil: Date?
  var exercises: [[String: Any]] { account.daily["plan"] as? [[String: Any]] ?? [] }
  var body: some View {
    NavigationStack {
      Form {
        Section("Your session") {
          ForEach(Array(exercises.enumerated()), id: \.offset) { _, exercise in
            VStack(alignment: .leading) {
              Text(exercise["name"] as? String ?? "Exercise").font(.headline)
              Text(
                "\(exercise["sets"] as? Int ?? 3) sets · \(exercise["reps"] as? String ?? "") reps · \(exercise["load"] as? Double ?? 0, specifier: "%.1f") kg"
              )
              Text(exercise["reason"] as? String ?? "").font(.caption).foregroundStyle(.secondary)
            }
          }
        }
        Section("Log a set") {
          Picker("Exercise", selection: $selected) {
            Text("Choose an exercise").tag("")
            ForEach(Array(exercises.enumerated()), id: \.offset) { _, x in
              Text(x["name"] as? String ?? "").tag(x["name"] as? String ?? "")
            }
          }
          Stepper("\(reps) reps", value: $reps, in: 1...100)
          Stepper("\(load, specifier: "%.1f") kg", value: $load, in: 0...500, step: 0.5)
          Stepper("Effort: \(rpe, specifier: "%.0f")/10", value: $rpe, in: 1...10)
          Button("Add set to draft") {
            let muscle =
              exercises.first { $0["name"] as? String == selected }?["muscle"] as? String ?? ""
            draft.append([
              "exercise": selected, "muscle": muscle, "reps": reps, "load": load, "rpe": rpe,
            ])
            persistDraft()
            restUntil = Date().addingTimeInterval(90)
          }.disabled(
            selected.isEmpty || draft.count >= 80 || account.busy || account.pending != nil)
          if let restUntil, restUntil > Date() {
            Text(restUntil, style: .timer).monospacedDigit()
            Text("Rest at your own pace").font(.caption)
          }
        }
        Section("Draft · \(draft.count) sets") {
          ForEach(Array(draft.enumerated()), id: \.offset) { i, set in
            HStack {
              Text("\(set["exercise"] as? String ?? "") · \(set["reps"] as? Int ?? 0) reps")
              Spacer()
              Button("Remove", role: .destructive) {
                draft.remove(at: i)
                persistDraft()
              }
            }
          }
          Picker("How was it?", selection: $effort) {
            ForEach(["About right", "Too hard", "Too easy"], id: \.self) { Text($0) }
          }
          Toggle("I finished only part of the session", isOn: $partial)
          Button("Save workout") {
            Task {
              if await account.send([
                "type": "workout", "sets": draft, "effort": effort,
                "status": partial ? "partial" : "completed",
              ]) {
                draft = []
                persistDraft()
              }
            }
          }.disabled(draft.isEmpty || account.busy || account.pending != nil)
        }
      }.navigationTitle("Train").task { draft = account.readDraft() }.onChange(
        of: account.draftRevision
      ) { _, _ in draft = account.readDraft() }.onChange(of: selected) {
        _, name in load = exercises.first { $0["name"] as? String == name }?["load"] as? Double ?? 0
      }
    }
  }
  private func persistDraft() { account.saveDraft(draft) }
}
struct NativeEat: View {
  @EnvironmentObject var account: AccountStore
  @State private var name = ""
  @State private var grams = 100.0
  @State private var kcal = 0.0
  @State private var protein = 0.0
  @State private var carbs = 0.0
  @State private var fat = 0.0
  @State private var fiber = 0.0
  @State private var vegetarian = false
  @State private var vegan = false
  @State private var allergens = ""
  @State private var confirmed = false
  var body: some View {
    NavigationStack {
      Form {
        Section("Confirmed food label · per 100 g") {
          TextField("Food name", text: $name)
          number("Calories", $kcal)
          number("Protein (g)", $protein)
          number("Carbohydrate (g)", $carbs)
          number("Fat (g)", $fat)
          number("Fiber (g)", $fiber)
          number("Portion (g)", $grams)
          Toggle("Vegetarian", isOn: $vegetarian)
          Toggle("Vegan", isOn: $vegan)
          TextField("Allergens, separated by commas", text: $allergens)
          Toggle("I checked the label and dietary details", isOn: $confirmed)
          Button("Log meal") {
            Task {
              let food: [String: Any] = [
                "id": "label-" + UUID().uuidString, "name": name, "kcal": kcal, "protein": protein,
                "carbs": carbs, "fat": fat, "fiber": fiber, "vegan": vegan,
                "vegetarian": vegetarian || vegan,
                "allergens": allergens.split(separator: ",").map {
                  $0.trimmingCharacters(in: .whitespaces).lowercased()
                }.filter { !$0.isEmpty }, "source": "User-confirmed label",
              ]
              if await account.send(["type": "meal", "food": food, "grams": grams]) {
                name = ""
                confirmed = false
              }
            }
          }.disabled(
            !confirmed || name.isEmpty || grams <= 0 || account.busy || account.pending != nil)
        }
        Section("Recent meals") {
          ForEach(Array(account.rows("meals").suffix(12).reversed().enumerated()), id: \.offset) {
            _, meal in
            let food = meal["food"] as? [String: Any] ?? [:]
            LabeledContent(
              food["name"] as? String ?? "Meal",
              value: String(format: "%.0f g", meal["grams"] as? Double ?? 0))
          }
        }
        Section("Groceries") {
          Button("Build shopping list") {
            Task { await account.send(["type": "grocery-generate"]) }
          }
          ForEach(Array(account.rows("grocery").enumerated()), id: \.offset) { _, item in
            Button {
              Task {
                await account.send([
                  "type": "grocery-check", "id": item["id"] as? String ?? "",
                  "checked": !(item["checked"] as? Bool ?? false),
                ])
              }
            } label: {
              Label(
                item["name"] as? String ?? "Item",
                systemImage: item["checked"] as? Bool == true ? "checkmark.circle.fill" : "circle")
            }
          }
          Text("A shopping list only. No orders are placed.").font(.caption)
        }
      }.navigationTitle("Eat")
    }
  }
  private func number(_ title: String, _ value: Binding<Double>) -> some View {
    HStack {
      Text(title)
      Spacer()
      TextField(title, value: value, format: .number).keyboardType(.decimalPad)
        .multilineTextAlignment(.trailing)
    }
  }
}
struct NativeProgress: View {
  @EnvironmentObject var account: AccountStore
  var body: some View {
    NavigationStack {
      List {
        Section("Your rhythm") {
          LabeledContent(
            "Completed sessions",
            value:
              "\(account.rows("workouts").filter { $0["status"] as? String == "completed" }.count)")
          LabeledContent("Check-ins", value: "\(account.rows("checkins").count)")
        }
        Section("Workout history") {
          ForEach(Array(account.rows("workouts").reversed().enumerated()), id: \.offset) {
            _, workout in
            VStack(alignment: .leading) {
              Text(workout["date"] as? String ?? "").font(.headline)
              Text(
                "\((workout["sets"] as? [Any])?.count ?? 0) sets · \(workout["status"] as? String ?? "")"
              )
              Text(workout["effort"] as? String ?? "").foregroundStyle(.secondary)
            }
          }
        }
        Section("Why the plan changed") {
          ForEach(Array(account.rows("audit").suffix(15).reversed().enumerated()), id: \.offset) {
            _, audit in
            VStack(alignment: .leading) {
              Text(audit["text"] as? String ?? "")
              Text(audit["at"] as? String ?? "").font(.caption).foregroundStyle(.secondary)
            }
          }
        }
      }.navigationTitle("Progress")
    }
  }
}
struct NativeCoach: View {
  @EnvironmentObject var account: AccountStore
  @State private var message = ""
  var body: some View {
    NavigationStack {
      List {
        Section {
          Text("Your training and food context, explained.")
          Text("This native coach currently uses FitLive’s deterministic guidance.").font(.caption)
            .foregroundStyle(.secondary)
        }
        ForEach(Array(account.rows("messages").enumerated()), id: \.offset) { _, item in
          VStack(alignment: .leading) {
            Text(item["role"] as? String == "user" ? "You" : "FitLive").font(.caption.bold())
            Text(item["text"] as? String ?? "")
          }
        }
        Section {
          TextField("Ask about your day", text: $message, axis: .vertical)
          Button("Send") {
            Task { if await account.send(["type": "chat", "message": message]) { message = "" } }
          }.disabled(
            message.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || message.count > 1000
              || account.busy || account.pending != nil)
        }
      }.navigationTitle("Coach")
    }
  }
}
