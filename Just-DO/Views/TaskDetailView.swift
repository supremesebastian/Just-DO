import SwiftUI

struct TaskDetailView: View {
    @EnvironmentObject private var store: TaskStore
    @Environment(\.horizontalSizeClass) private var hSize
    @Environment(\.dismiss) private var dismiss

    let task: TaskItem

    @State private var draftTitle: String = ""
    @State private var draftNotes: String = ""
    @State private var draftDueDate: Date = Date()
    @State private var hasDueDate: Bool = false
    @State private var draftDone: Bool = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                Toggle(isOn: $draftDone) {
                    Text(draftDone ? "Completed" : "Mark as done")
                        .font(.headline)
                }
                .toggleStyle(.switch)
                .tint(Theme.accent)

                VStack(alignment: .leading, spacing: 6) {
                    Text("Title").font(.subheadline).foregroundStyle(.secondary)
                    TextField("Title", text: $draftTitle, axis: .vertical)
                        .textFieldStyle(.plain)
                        .font(.title3.weight(.semibold))
                        .padding(12)
                        .background(Theme.surface, in: RoundedRectangle(cornerRadius: Theme.cardCorner))
                }

                VStack(alignment: .leading, spacing: 6) {
                    Text("Notes").font(.subheadline).foregroundStyle(.secondary)
                    TextEditor(text: $draftNotes)
                        .frame(minHeight: 140)
                        .scrollContentBackground(.hidden)
                        .padding(8)
                        .background(Theme.surface, in: RoundedRectangle(cornerRadius: Theme.cardCorner))
                }

                VStack(alignment: .leading, spacing: 6) {
                    Toggle("Due date", isOn: $hasDueDate)
                        .tint(Theme.accent)
                    if hasDueDate {
                        DatePicker("", selection: $draftDueDate, displayedComponents: [.date, .hourAndMinute])
                            .datePickerStyle(.graphical)
                            .padding(12)
                            .background(Theme.surface, in: RoundedRectangle(cornerRadius: Theme.cardCorner))
                    }
                }
            }
            .readableWidth()
            .adaptiveHorizontalPadding(hSize)
            .padding(.vertical, 20)
        }
        .navigationTitle("Task")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .destructiveAction) {
                Button(role: .destructive) {
                    store.delete(task)
                    if hSize != .regular { dismiss() }
                } label: {
                    Image(systemName: "trash")
                }
                .accessibilityLabel("Delete task")
            }
            ToolbarItem(placement: .confirmationAction) {
                Button("Save", action: save)
                    .disabled(draftTitle.trimmingCharacters(in: .whitespaces).isEmpty)
            }
        }
        .onAppear(perform: loadDrafts)
        .onChange(of: task.id) { _, _ in loadDrafts() }
    }

    private func loadDrafts() {
        draftTitle = task.title
        draftNotes = task.notes
        draftDone = task.isDone
        hasDueDate = task.dueDate != nil
        draftDueDate = task.dueDate ?? Date()
    }

    private func save() {
        var updated = task
        updated.title = draftTitle.trimmingCharacters(in: .whitespacesAndNewlines)
        updated.notes = draftNotes
        updated.isDone = draftDone
        updated.dueDate = hasDueDate ? draftDueDate : nil
        store.update(updated)
        if hSize != .regular { dismiss() }
    }
}
