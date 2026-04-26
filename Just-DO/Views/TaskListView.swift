import SwiftUI

struct TaskListView: View {
    @EnvironmentObject private var store: TaskStore
    @Environment(\.horizontalSizeClass) private var hSize
    let list: TaskList
    @Binding var selection: TaskItem?

    @State private var showingAddTask = false
    @State private var quickAddText = ""
    @FocusState private var quickAddFocused: Bool

    private var visibleTasks: [TaskItem] {
        store.tasks(in: list)
    }

    var body: some View {
        Group {
            if store.isLoading {
                ProgressView("Loading…")
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else if visibleTasks.isEmpty {
                EmptyStateView.noTasks(in: list) {
                    showingAddTask = true
                }
            } else {
                taskList
            }
        }
        .navigationTitle(list.name)
        .navigationBarTitleDisplayMode(hSize == .regular ? .large : .large)
        .safeAreaInset(edge: .bottom) {
            quickAddBar
        }
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button {
                    showingAddTask = true
                } label: {
                    Label("New Task", systemImage: "plus.circle.fill")
                        .labelStyle(.iconOnly)
                        .font(.title3)
                }
                .accessibilityLabel("Add task")
            }
        }
        .sheet(isPresented: $showingAddTask) {
            AddTaskSheet(targetList: list)
        }
    }

    private var taskList: some View {
        List(selection: $selection) {
            ForEach(visibleTasks) { task in
                if hSize == .regular {
                    TaskRow(task: task)
                        .tag(task)
                } else {
                    NavigationLink(value: task) {
                        TaskRow(task: task)
                    }
                }
            }
            .onDelete { offsets in
                store.delete(at: offsets, in: list)
            }
        }
        .listStyle(.plain)
    }

    private var quickAddBar: some View {
        HStack(spacing: 10) {
            Image(systemName: "plus.circle")
                .foregroundStyle(Theme.accent)
            TextField("Add a task…", text: $quickAddText, axis: .horizontal)
                .focused($quickAddFocused)
                .submitLabel(.done)
                .onSubmit(submitQuickAdd)
            if !quickAddText.isEmpty {
                Button("Add", action: submitQuickAdd)
                    .buttonStyle(.borderedProminent)
                    .controlSize(.small)
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
        .background(.regularMaterial)
        .overlay(alignment: .top) {
            Divider()
        }
    }

    private func submitQuickAdd() {
        let text = quickAddText
        guard !text.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        let due: Date? = list.id == TaskList.today.id ? Date() : nil
        store.add(title: text, notes: "", dueDate: due, list: list)
        quickAddText = ""
        quickAddFocused = false
    }
}
