import SwiftUI

enum AppTab: String, CaseIterable, Identifiable {
    case home, kurse, planer, coach
    var id: String { rawValue }

    var label: String {
        switch self {
        case .home:   return "Home"
        case .kurse:  return "Kurse"
        case .planer: return "Planer"
        case .coach:  return "Coach"
        }
    }

    var icon: String {
        switch self {
        case .home:   return "house.fill"
        case .kurse:  return "books.vertical.fill"
        case .planer: return "calendar"
        case .coach:  return "brain.head.profile"
        }
    }
}

struct RootView: View {
    @EnvironmentObject private var theme: ThemeManager
    @EnvironmentObject private var network: NetworkMonitor
    @State private var showSplash = true
    @State private var splashOpacity: Double = 1
    @State private var selectedTab: AppTab = .home

    var body: some View {
        ZStack {
            theme.palette.bg.ignoresSafeArea()

            MainTabsView(selectedTab: $selectedTab)
                .opacity(showSplash ? 0 : 1)

            if showSplash {
                SplashScreen()
                    .opacity(splashOpacity)
                    .transition(.opacity)
            }
        }
        .overlay(alignment: .top) {
            if network.isOffline {
                OfflineBanner()
                    .transition(.move(edge: .top).combined(with: .opacity))
            }
        }
        .animation(.easeInOut(duration: 0.2), value: network.isOffline)
        .task {
            // Splash timing matches the design: ~700ms reveal, hold, then ~500ms fade out.
            try? await Task.sleep(nanoseconds: 1_800_000_000)
            withAnimation(.easeOut(duration: 0.5)) { splashOpacity = 0 }
            try? await Task.sleep(nanoseconds: 500_000_000)
            showSplash = false
        }
    }
}

// MARK: - Splash

struct SplashScreen: View {
    @EnvironmentObject private var theme: ThemeManager
    @State private var animateIn = false

    var body: some View {
        let p = theme.palette
        ZStack {
            p.bg.ignoresSafeArea()
            VStack(spacing: 16) {
                ZStack {
                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                        .fill(LinearGradient(
                            colors: [p.accent, p.accentSecondary],
                            startPoint: .topLeading, endPoint: .bottomTrailing
                        ))
                        .frame(width: 72, height: 72)
                        .shadow(color: p.accent.opacity(0.33), radius: 30, x: 0, y: 20)
                    Image(systemName: "bolt.fill")
                        .font(.system(size: 32, weight: .bold))
                        .foregroundStyle(.white)
                }
                VStack(spacing: 6) {
                    Text("Just Do")
                        .font(.system(size: 32, weight: .heavy))
                        .tracking(-1)
                        .foregroundStyle(p.text)
                    Text("AI Study Coach")
                        .font(.system(size: 13, weight: .regular))
                        .tracking(0.5)
                        .foregroundStyle(p.textSub)
                }
            }
            .opacity(animateIn ? 1 : 0)
            .offset(y: animateIn ? 0 : 24)
            .animation(.spring(response: 0.7, dampingFraction: 0.6), value: animateIn)
        }
        .onAppear { animateIn = true }
    }
}

// MARK: - Main tabs container

struct MainTabsView: View {
    @EnvironmentObject private var theme: ThemeManager
    @Binding var selectedTab: AppTab

    var body: some View {
        let p = theme.palette
        ZStack(alignment: .bottom) {
            p.bg.ignoresSafeArea()

            Group {
                switch selectedTab {
                case .home:   DashboardView()
                case .kurse:  KurseView()
                case .planer: PlanerView()
                case .coach:  CoachView()
                }
            }
            .padding(.bottom, Layout.tabBarHeight + 24)

            TabBar(selected: $selectedTab)
        }
    }
}

// MARK: - Tab bar

struct TabBar: View {
    @EnvironmentObject private var theme: ThemeManager
    @Binding var selected: AppTab

    var body: some View {
        let p = theme.palette
        HStack(spacing: 0) {
            ForEach(AppTab.allCases) { tab in
                let active = (tab == selected)
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) { selected = tab }
                } label: {
                    VStack(spacing: 4) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 12, style: .continuous)
                                .fill(active ? p.accentSub : Color.clear)
                                .frame(height: 32)
                            Image(systemName: tab.icon)
                                .font(.system(size: 18, weight: .semibold))
                                .foregroundStyle(active ? p.accent : p.textSub)
                        }
                        .frame(maxWidth: .infinity)
                        Text(tab.label)
                            .font(.system(size: 10, weight: active ? .semibold : .regular))
                            .foregroundStyle(active ? p.accent : p.textSub)
                    }
                    .frame(maxWidth: .infinity, minHeight: 44)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.horizontal, 14)
        .padding(.top, 10)
        .padding(.bottom, 24)
        .background(
            p.navBg
                .background(.ultraThinMaterial)
                .overlay(p.divider.frame(height: 1), alignment: .top)
        )
    }
}

// MARK: - Offline banner

private struct OfflineBanner: View {
    @EnvironmentObject private var theme: ThemeManager
    var body: some View {
        let p = theme.palette
        HStack(spacing: 8) {
            Image(systemName: "wifi.slash")
            Text("Offline – Änderungen werden lokal gespeichert.")
                .font(.footnote)
        }
        .foregroundStyle(p.text)
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(.ultraThinMaterial, in: Capsule())
        .padding(.top, 8)
        .accessibilityElement(children: .combine)
    }
}
