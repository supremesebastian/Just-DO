import Foundation

struct TaskList: Identifiable, Codable, Hashable {
    let id: UUID
    var name: String
    var symbol: String

    init(id: UUID = UUID(), name: String, symbol: String = "list.bullet") {
        self.id = id
        self.name = name
        self.symbol = symbol
    }

    static let inbox = TaskList(
        id: UUID(uuidString: "00000000-0000-0000-0000-000000000001")!,
        name: "Inbox",
        symbol: "tray"
    )

    static let today = TaskList(
        id: UUID(uuidString: "00000000-0000-0000-0000-000000000002")!,
        name: "Today",
        symbol: "sun.max"
    )
}
