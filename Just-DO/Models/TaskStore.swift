import Foundation
import Combine

@MainActor
final class StudyStore: ObservableObject {
    @Published private(set) var subjects: [Subject] = Subject.seed
    @Published private(set) var todayPlan: [PlanTask] = StudyStore.seedPlan
    @Published private(set) var exams: [Exam] = StudyStore.seedExams
    @Published private(set) var streakDays: Int = 7
    @Published private(set) var todayHoursPlanned: Double = 4.0
    @Published private(set) var todayHoursDone: Double = 1.5
    @Published var greetingName: String = "Max"
    @Published var isLoading: Bool = false
    @Published var loadError: String?

    private let planURL: URL

    init() {
        let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
        self.planURL = docs.appendingPathComponent("plan.json")
        load()
    }

    // MARK: - Plan tasks

    func toggle(_ task: PlanTask) {
        guard let idx = todayPlan.firstIndex(where: { $0.id == task.id }) else { return }
        todayPlan[idx].done.toggle()
        recomputeProgress()
        persist()
    }

    func delete(_ task: PlanTask) {
        todayPlan.removeAll { $0.id == task.id }
        recomputeProgress()
        persist()
    }

    func add(_ task: PlanTask) {
        todayPlan.append(task)
        todayPlan.sort { $0.time < $1.time }
        recomputeProgress()
        persist()
    }

    var todayProgress: Double {
        guard todayHoursPlanned > 0 else { return 0 }
        return min(1.0, todayHoursDone / todayHoursPlanned)
    }

    var doneCount: Int  { todayPlan.filter { $0.done }.count }
    var totalCount: Int { todayPlan.count }

    private func recomputeProgress() {
        let totalMinutes = todayPlan.reduce(0) { $0 + $1.durationMinutes }
        let doneMinutes  = todayPlan.filter { $0.done }.reduce(0) { $0 + $1.durationMinutes }
        todayHoursPlanned = Double(totalMinutes) / 60.0
        todayHoursDone    = Double(doneMinutes) / 60.0
    }

    // MARK: - Persistence

    private func load() {
        isLoading = true
        defer { isLoading = false }
        do {
            if FileManager.default.fileExists(atPath: planURL.path) {
                let data = try Data(contentsOf: planURL)
                let decoded = try JSONDecoder().decode([PlanTask].self, from: data)
                if !decoded.isEmpty { todayPlan = decoded }
            }
            recomputeProgress()
            loadError = nil
        } catch {
            loadError = "Konnte den Tagesplan nicht laden – starte mit den Standardwerten."
            todayPlan = StudyStore.seedPlan
            recomputeProgress()
        }
    }

    private func persist() {
        do {
            let data = try JSONEncoder().encode(todayPlan)
            try data.write(to: planURL, options: .atomic)
        } catch {
            loadError = "Änderungen am Plan konnten nicht gespeichert werden."
        }
    }

    // MARK: - Seed data

    static let seedPlan: [PlanTask] = [
        PlanTask(time: "08:00", durationMinutes: 90, subjectName: "Mathematik II",    label: "Integralrechnung – Kap. 4", type: .study,     done: true),
        PlanTask(time: "09:30", durationMinutes: 30, subjectName: nil,                label: "Pause & Bewegung",            type: .breakTime, done: true),
        PlanTask(time: "10:00", durationMinutes: 60, subjectName: "Statistik",        label: "Übungsblatt 7 lösen",         type: .practice,  done: false),
        PlanTask(time: "11:00", durationMinutes: 45, subjectName: "Wirtschaftsrecht", label: "Zusammenfassung lesen",       type: .review,    done: false),
        PlanTask(time: "12:00", durationMinutes: 60, subjectName: nil,                label: "Mittagspause",                type: .breakTime, done: false),
        PlanTask(time: "13:00", durationMinutes: 90, subjectName: "Marketing",        label: "Fallstudie Analyse",          type: .study,     done: false),
        PlanTask(time: "14:30", durationMinutes: 25, subjectName: nil,                label: "Pomodoro – Deep Work",        type: .focus,     done: false),
        PlanTask(time: "16:00", durationMinutes: 60, subjectName: "Statistik",        label: "Karteikarten wiederholen",    type: .review,    done: false),
    ]

    static let seedExams: [Exam] = {
        let cal = Calendar.current
        func d(_ days: Int) -> Date { cal.date(byAdding: .day, value: days, to: cal.startOfDay(for: Date()))! }
        return [
            Exam(id: UUID(), name: "Klausur Wirtschaftsrecht", subjectName: "Wirtschaftsrecht", subjectColorHex: 0x34C7A0, date: d(2),  time: "10:00", location: "Hörsaal 3"),
            Exam(id: UUID(), name: "Statistik Midterm",        subjectName: "Statistik",        subjectColorHex: 0x7C6EFA, date: d(12), time: "09:00", location: "Audimax"),
            Exam(id: UUID(), name: "Mathematik II Klausur",    subjectName: "Mathematik II",    subjectColorHex: 0x4A7CFF, date: d(51), time: "08:30", location: "Hörsaal A"),
        ]
    }()
}

// Legacy alias
typealias TaskStore = StudyStore
