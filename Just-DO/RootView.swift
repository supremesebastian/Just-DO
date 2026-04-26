import SwiftUI

struct RootView: View {
    @EnvironmentObject private var store: TaskStore
    @EnvironmentObject private var network: NetworkMonitor
    @Environment(\.horizontalSizeClass) private var hSize

    @State private var selectedList: TaskList? = TaskList.today
    @State private var selectedTask: TaskItem?

    var body: some View {
        Group {
            if hSize == .regular {
                iPadLayout
            } else {
                iPhoneLayout
            }
        }
        .overlay(alignment: .top) {
            if network.isOffline {
                OfflineBanner()
                    .transition(.move(edge: .top).combined(with: .opacity))
            }
        }
        .animation(.easeInOut(duration: 0.2), value: network.isOffline)
    }

    private var iPadLayout: some View {
        NavigationSplitView(columnVisibility: .constant(.all)) {
            SidebarView(selection: $selectedList)
                .navigationSplitViewColumnWidth(min: 240, ideal: 280, max: 340)
        } content: {
            if let list = selectedList {
                TaskListView(list: list, selection: $selectedTask)
                    .navigationSplitViewColumnWidth(min: 360, ideal: 460)
            } else {
                EmptyStateView.noListSelected
            }
        } detail: {
            if let task = selectedTask {
                TaskDetailView(task: task)
            } else {
                EmptyStateView.noTaskSelected
            }
        }
        .navigationSplitViewStyle(.balanced)
    }

    private var iPhoneLayout: some View {
        NavigationStack {
            SidebarView(selection: $selectedList)
                .navigationDestination(for: TaskList.self) { list in
                    TaskListView(list: list, selection: $selectedTask)
                        .navigationDestination(for: TaskItem.self) { task in
                            TaskDetailView(task: task)
                        }
                }
        }
    }
}

private struct OfflineBanner: View {
    var body: some View {
        HStack(spacing: 8) {
            Image(systemName: "wifi.slash")
            Text("Offline – changes are saved on this device.")
                .font(.footnote)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(.ultraThinMaterial, in: Capsule())
        .padding(.top, 8)
        .accessibilityElement(children: .combine)
    }
}
