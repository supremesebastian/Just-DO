import Foundation
import Combine

@MainActor
final class TaskStore: ObservableObject {
    @Published private(set) var lists: [TaskList] = []
    @Published private(set) var tasks: [TaskItem] = []
    @Published var isLoading: Bool = false
    @Published var loadError: String?

    private let tasksURL: URL
    private let listsURL: URL

    init() {
        let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
        self.tasksURL = docs.appendingPathComponent("tasks.json")
        self.listsURL = docs.appendingPathComponent("lists.json")
        load()
    }

    func tasks(in list: TaskList) -> [TaskItem] {
        if list.id == TaskList.today.id {
            let cal = Calendar.current
            return tasks
                .filter { task in
                    guard let due = task.dueDate else { return false }
                    return cal.isDateInToday(due)
                }
                .sorted(by: sortRule)
        }
        return tasks
            .filter { $0.listID == list.id }
            .sorted(by: sortRule)
    }

    private func sortRule(_ a: TaskItem, _ b: TaskItem) -> Bool {
        if a.isDone != b.isDone { return !a.isDone }
        return a.createdAt > b.createdAt
    }

    func add(title: String, notes: String, dueDate: Date?, list: TaskList) {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        let target = list.id == TaskList.today.id ? TaskList.inbox : list
        let task = TaskItem(
            title: trimmed,
            notes: notes,
            dueDate: dueDate,
            listID: target.id
        )
        tasks.append(task)
        persist()
    }

    func update(_ task: TaskItem) {
        guard let idx = tasks.firstIndex(where: { $0.id == task.id }) else { return }
        tasks[idx] = task
        persist()
    }

    func toggleDone(_ task: TaskItem) {
        guard let idx = tasks.firstIndex(where: { $0.id == task.id }) else { return }
        tasks[idx].isDone.toggle()
        persist()
    }

    func delete(_ task: TaskItem) {
        tasks.removeAll { $0.id == task.id }
        persist()
    }

    func delete(at offsets: IndexSet, in list: TaskList) {
        let visible = tasks(in: list)
        let ids = offsets.map { visible[$0].id }
        tasks.removeAll { ids.contains($0.id) }
        persist()
    }

    func addList(name: String, symbol: String) {
        let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        lists.append(TaskList(name: trimmed, symbol: symbol))
        persist()
    }

    func deleteCustomList(_ list: TaskList) {
        guard list.id != TaskList.inbox.id, list.id != TaskList.today.id else { return }
        lists.removeAll { $0.id == list.id }
        tasks.removeAll { $0.listID == list.id }
        persist()
    }

    var systemLists: [TaskList] { [TaskList.today, TaskList.inbox] }
    var customLists: [TaskList] { lists }

    func openCount(for list: TaskList) -> Int {
        tasks(in: list).filter { !$0.isDone }.count
    }

    private func load() {
        isLoading = true
        defer { isLoading = false }
        do {
            if FileManager.default.fileExists(atPath: tasksURL.path) {
                let data = try Data(contentsOf: tasksURL)
                tasks = try JSONDecoder().decode([TaskItem].self, from: data)
            }
            if FileManager.default.fileExists(atPath: listsURL.path) {
                let data = try Data(contentsOf: listsURL)
                lists = try JSONDecoder().decode([TaskList].self, from: data)
            }
            loadError = nil
        } catch {
            loadError = "Could not load saved tasks. Starting fresh."
            tasks = []
            lists = []
        }
    }

    private func persist() {
        do {
            let tasksData = try JSONEncoder().encode(tasks)
            try tasksData.write(to: tasksURL, options: .atomic)
            let listsData = try JSONEncoder().encode(lists)
            try listsData.write(to: listsURL, options: .atomic)
        } catch {
            loadError = "Could not save changes locally."
        }
    }
}
