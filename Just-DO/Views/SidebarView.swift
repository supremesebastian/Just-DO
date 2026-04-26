import SwiftUI

struct SidebarView: View {
    @EnvironmentObject private var store: TaskStore
    @Environment(\.horizontalSizeClass) private var hSize
    @Binding var selection: TaskList?

    @State private var showingAddList = false
    @State private var newListName = ""
    @State private var newListSymbol = "list.bullet"

    private let symbols = ["list.bullet", "star", "house", "briefcase", "cart", "book", "heart", "leaf", "gamecontroller"]

    var body: some View {
        Group {
            if hSize == .regular {
                listContent
                    .listStyle(.sidebar)
            } else {
                listContent
                    .listStyle(.insetGrouped)
            }
        }
        .navigationTitle("Just Do")
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button {
                    showingAddList = true
                } label: {
                    Label("New List", systemImage: "plus")
                }
                .accessibilityLabel("Add list")
            }
        }
        .sheet(isPresented: $showingAddList) {
            addListSheet
        }
    }

    @ViewBuilder
    private var listContent: some View {
        List(selection: $selection) {
            Section {
                ForEach(store.systemLists) { list in
                    row(for: list)
                }
            }

            if !store.customLists.isEmpty {
                Section("My Lists") {
                    ForEach(store.customLists) { list in
                        row(for: list)
                            .swipeActions(edge: .trailing) {
                                Button(role: .destructive) {
                                    if selection?.id == list.id {
                                        selection = TaskList.today
                                    }
                                    store.deleteCustomList(list)
                                } label: {
                                    Label("Delete", systemImage: "trash")
                                }
                            }
                    }
                }
            }
        }
    }

    @ViewBuilder
    private func row(for list: TaskList) -> some View {
        let count = store.openCount(for: list)
        let content = HStack {
            Label {
                Text(list.name)
            } icon: {
                Image(systemName: list.symbol)
                    .foregroundStyle(Theme.accent)
            }
            Spacer()
            if count > 0 {
                Text("\(count)")
                    .font(.subheadline.monospacedDigit())
                    .foregroundStyle(.secondary)
            }
        }
        .contentShape(Rectangle())

        if hSize == .regular {
            content.tag(list)
        } else {
            NavigationLink(value: list) { content }
        }
    }

    private var addListSheet: some View {
        NavigationStack {
            Form {
                Section("Name") {
                    TextField("List name", text: $newListName)
                        .submitLabel(.done)
                }
                Section("Icon") {
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 12), count: 6), spacing: 12) {
                        ForEach(symbols, id: \.self) { symbol in
                            Button {
                                newListSymbol = symbol
                            } label: {
                                Image(systemName: symbol)
                                    .font(.title3)
                                    .frame(width: 40, height: 40)
                                    .background(
                                        RoundedRectangle(cornerRadius: 10)
                                            .fill(newListSymbol == symbol ? Theme.accent.opacity(0.18) : Color(.tertiarySystemFill))
                                    )
                                    .foregroundStyle(newListSymbol == symbol ? Theme.accent : Color.primary)
                            }
                            .buttonStyle(.plain)
                            .accessibilityLabel("Choose \(symbol)")
                        }
                    }
                    .padding(.vertical, 4)
                }
            }
            .navigationTitle("New List")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        resetSheet()
                        showingAddList = false
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        store.addList(name: newListName, symbol: newListSymbol)
                        resetSheet()
                        showingAddList = false
                    }
                    .disabled(newListName.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private func resetSheet() {
        newListName = ""
        newListSymbol = "list.bullet"
    }
}
