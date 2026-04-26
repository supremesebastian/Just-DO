import SwiftUI

@main
struct Just_DOApp: App {
    @StateObject private var store = StudyStore()
    @StateObject private var network = NetworkMonitor()
    @StateObject private var theme = ThemeManager()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(store)
                .environmentObject(network)
                .environmentObject(theme)
                .preferredColorScheme(theme.colorScheme)
                .tint(theme.palette.accent)
        }
    }
}
