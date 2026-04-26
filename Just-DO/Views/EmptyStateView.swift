import SwiftUI

// Repurposed: shared building blocks for the AI Study Coach screens.
// File name kept to fit the existing Xcode project.

// MARK: - Progress Ring

struct ProgressRing: View {
    var progress: Double
    var size: CGFloat = 48
    var stroke: CGFloat = 3.5
    var color: Color
    var background: Color = Color.white.opacity(0.08)

    var body: some View {
        ZStack {
            Circle()
                .stroke(background, lineWidth: stroke)
            Circle()
                .trim(from: 0, to: max(0, min(1, progress)))
                .stroke(color, style: StrokeStyle(lineWidth: stroke, lineCap: .round))
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 0.8), value: progress)
        }
        .frame(width: size, height: size)
    }
}

// MARK: - Stat pill (used in dashboard streak row)

struct StatPill: View {
    @EnvironmentObject private var theme: ThemeManager
    let icon: String
    let value: String
    let label: String
    let tint: Color

    var body: some View {
        let p = theme.palette
        VStack(alignment: .leading, spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(tint)
            Text(value)
                .font(.system(size: 16, weight: .bold))
                .foregroundStyle(p.text)
            Text(label.uppercased())
                .font(.system(size: 10, weight: .semibold))
                .tracking(0.5)
                .foregroundStyle(p.textSub)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.vertical, 12)
        .padding(.horizontal, 12)
        .cardStyle(palette: p, corner: 14)
    }
}

// MARK: - Section header

struct SectionHeader<Trailing: View>: View {
    @EnvironmentObject private var theme: ThemeManager
    let title: String
    @ViewBuilder var trailing: () -> Trailing

    var body: some View {
        let p = theme.palette
        HStack {
            Text(title)
                .font(.system(size: 17, weight: .bold))
                .foregroundStyle(p.text)
            Spacer()
            trailing()
        }
    }
}

extension SectionHeader where Trailing == EmptyView {
    init(_ title: String) {
        self.init(title: title, trailing: { EmptyView() })
    }
}

// MARK: - Type badge (study / practice / pause …)

struct TypeBadge: View {
    let type: PlanTaskType

    var body: some View {
        Text(type.label.uppercased())
            .font(.system(size: 10, weight: .bold))
            .tracking(0.5)
            .foregroundStyle(type.color)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(type.color.opacity(0.15), in: RoundedRectangle(cornerRadius: 8, style: .continuous))
    }
}

// MARK: - Done checkbox (44pt tap target)

struct DoneCheckbox: View {
    @EnvironmentObject private var theme: ThemeManager
    let done: Bool
    let action: () -> Void

    var body: some View {
        let p = theme.palette
        Button(action: action) {
            ZStack {
                RoundedRectangle(cornerRadius: 8, style: .continuous)
                    .fill(done ? StatusColor.success : Color.clear)
                    .overlay(
                        RoundedRectangle(cornerRadius: 8, style: .continuous)
                            .stroke(done ? StatusColor.success : p.textMuted, lineWidth: 1.5)
                    )
                    .frame(width: 26, height: 26)
                if done {
                    Image(systemName: "checkmark")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundStyle(.white)
                }
            }
            .frame(width: 44, height: 44)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel(done ? "Erledigt – rückgängig machen" : "Als erledigt markieren")
    }
}

// MARK: - Empty state

struct EmptyStateView: View {
    @EnvironmentObject private var theme: ThemeManager
    let symbol: String
    let title: String
    let message: String

    var body: some View {
        let p = theme.palette
        VStack(spacing: 12) {
            Image(systemName: symbol)
                .font(.system(size: 40, weight: .light))
                .foregroundStyle(p.textMuted)
            Text(title)
                .font(.system(size: 18, weight: .bold))
                .foregroundStyle(p.text)
            Text(message)
                .font(.system(size: 14))
                .foregroundStyle(p.textSub)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: 320)
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

// MARK: - App icon mark (used in header / splash variants)

struct AppMark: View {
    @EnvironmentObject private var theme: ThemeManager
    var size: CGFloat = 36
    var corner: CGFloat = 10

    var body: some View {
        let p = theme.palette
        ZStack {
            RoundedRectangle(cornerRadius: corner, style: .continuous)
                .fill(LinearGradient(
                    colors: [p.accent, p.accentSecondary],
                    startPoint: .topLeading, endPoint: .bottomTrailing
                ))
            Image(systemName: "bolt.fill")
                .font(.system(size: size * 0.45, weight: .bold))
                .foregroundStyle(.white)
        }
        .frame(width: size, height: size)
    }
}
