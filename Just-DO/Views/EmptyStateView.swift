import SwiftUI

struct EmptyStateView: View {
    let symbol: String
    let title: String
    let message: String
    let actionTitle: String?
    let action: (() -> Void)?

    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: symbol)
                .font(.system(size: 56, weight: .light))
                .foregroundStyle(Theme.accent)
            Text(title)
                .font(.title2.weight(.semibold))
                .multilineTextAlignment(.center)
            Text(message)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 32)
            if let actionTitle, let action {
                Button(actionTitle, action: action)
                    .buttonStyle(.borderedProminent)
                    .controlSize(.large)
            }
        }
        .frame(maxWidth: 420)
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemBackground))
    }

    static func noTasks(in list: TaskList, action: @escaping () -> Void) -> some View {
        EmptyStateView(
            symbol: "checkmark.circle",
            title: "Nothing to do here",
            message: "You're all caught up in \(list.name). Add a task to get started.",
            actionTitle: "Add task",
            action: action
        )
    }

    static var noListSelected: some View {
        EmptyStateView(
            symbol: "list.bullet.rectangle",
            title: "Choose a list",
            message: "Pick a list on the left to see its tasks.",
            actionTitle: nil,
            action: nil
        )
    }

    static var noTaskSelected: some View {
        EmptyStateView(
            symbol: "square.and.pencil",
            title: "Select a task",
            message: "Pick a task to view or edit its details.",
            actionTitle: nil,
            action: nil
        )
    }
}
