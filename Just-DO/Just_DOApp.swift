import SwiftUI

@main
struct Just_DOApp: App {
    @StateObject private var store = TaskStore()
    @StateObject private var network = NetworkMonitor()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(store)
                .environmentObject(network)
                .tint(Theme.accent)
        }
    }
}
