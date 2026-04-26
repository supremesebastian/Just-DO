import Foundation

struct TaskItem: Identifiable, Codable, Hashable {
    let id: UUID
    var title: String
    var notes: String
    var isDone: Bool
    var createdAt: Date
    var dueDate: Date?
    var listID: UUID

    init(
        id: UUID = UUID(),
        title: String,
        notes: String = "",
        isDone: Bool = false,
        createdAt: Date = Date(),
        dueDate: Date? = nil,
        listID: UUID
    ) {
        self.id = id
        self.title = title
        self.notes = notes
        self.isDone = isDone
        self.createdAt = createdAt
        self.dueDate = dueDate
        self.listID = listID
    }
}
