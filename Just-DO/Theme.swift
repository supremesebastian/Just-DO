import SwiftUI
import Combine

// MARK: - Theme tokens (mirrors the design handoff color palette)

struct ThemePalette {
    let bg: Color
    let surface: Color
    let card: Color
    let cardBorder: Color
    let pillBg: Color
    let text: Color
    let textSub: Color
    let textMuted: Color
    let accent: Color
    let accentSecondary: Color
    let accentSub: Color
    let divider: Color
    let navBg: Color

    static let dark = ThemePalette(
        bg:              Color(hex: 0x09090E),
        surface:         Color(hex: 0x12121C),
        card:            Color(hex: 0x16162A),
        cardBorder:      Color.white.opacity(0.07),
        pillBg:          Color(hex: 0x1C1C2E),
        text:            Color(hex: 0xEEF0FF),
        textSub:         Color(red: 220/255, green: 222/255, blue: 255/255).opacity(0.45),
        textMuted:       Color(red: 220/255, green: 222/255, blue: 255/255).opacity(0.25),
        accent:          Color(hex: 0x4A7CFF),
        accentSecondary: Color(hex: 0x7C6EFA),
        accentSub:       Color(hex: 0x4A7CFF).opacity(0.15),
        divider:         Color.white.opacity(0.06),
        navBg:           Color(hex: 0x0C0C16).opacity(0.9)
    )

    static let light = ThemePalette(
        bg:              Color(hex: 0xEFF1FA),
        surface:         Color(hex: 0xF7F8FF),
        card:            Color.white,
        cardBorder:      Color.black.opacity(0.06),
        pillBg:          Color(hex: 0xE4E6F5),
        text:            Color(hex: 0x0D0E1A),
        textSub:         Color(hex: 0x0D0E1A).opacity(0.5),
        textMuted:       Color(hex: 0x0D0E1A).opacity(0.3),
        accent:          Color(hex: 0x3A6EFF),
        accentSecondary: Color(hex: 0x7C6EFA),
        accentSub:       Color(hex: 0x3A6EFF).opacity(0.10),
        divider:         Color.black.opacity(0.05),
        navBg:           Color(hex: 0xEFF1FA).opacity(0.92)
    )
}

// Subject accent colors
enum SubjectAccent {
    static let math       = Color(hex: 0x4A7CFF)
    static let stats      = Color(hex: 0x7C6EFA)
    static let law        = Color(hex: 0x34C7A0)
    static let marketing  = Color(hex: 0xFF6B6B)
    static let bwl        = Color(hex: 0xFFB347)
    static let macro      = Color(hex: 0xA855F7)
}

// Status colors
enum StatusColor {
    static let success = Color(hex: 0x34C7A0)
    static let danger  = Color(hex: 0xFF6B6B)
    static let warning = Color(hex: 0xFFB347)
    static let purple  = Color(hex: 0x7C6EFA)
}

// MARK: - Theme manager

@MainActor
final class ThemeManager: ObservableObject {
    @Published var mode: Mode {
        didSet { UserDefaults.standard.set(mode.rawValue, forKey: "justdo_theme") }
    }

    enum Mode: String { case dark, light }

    init() {
        let stored = UserDefaults.standard.string(forKey: "justdo_theme")
        self.mode = Mode(rawValue: stored ?? "dark") ?? .dark
    }

    var palette: ThemePalette { mode == .dark ? .dark : .light }
    var colorScheme: ColorScheme { mode == .dark ? .dark : .light }

    func toggle() {
        withAnimation(.easeInOut(duration: 0.3)) {
            mode = (mode == .dark) ? .light : .dark
        }
    }
}

// MARK: - Layout helpers

enum Layout {
    static let screenHorizontalPadding: CGFloat = 20
    static let cardCorner: CGFloat = 16
    static let largeCardCorner: CGFloat = 20
    static let pillCorner: CGFloat = 12
    static let chipCorner: CGFloat = 10
    static let sectionGap: CGFloat = 16
    static let cardGap: CGFloat = 10
    static let readableMaxWidth: CGFloat = 720
    static let tabBarHeight: CGFloat = 64
}

// MARK: - View modifiers / helpers

extension View {
    @ViewBuilder
    func readableWidth() -> some View {
        self.frame(maxWidth: Layout.readableMaxWidth)
            .frame(maxWidth: .infinity)
    }

    func cardStyle(palette: ThemePalette, corner: CGFloat = Layout.cardCorner) -> some View {
        self
            .background(
                RoundedRectangle(cornerRadius: corner, style: .continuous)
                    .fill(palette.card)
            )
            .overlay(
                RoundedRectangle(cornerRadius: corner, style: .continuous)
                    .stroke(palette.cardBorder, lineWidth: 1)
            )
    }

    func dmFont(size: CGFloat, weight: Font.Weight = .regular, design: Font.Design = .default) -> some View {
        // DM Sans is not bundled — fall back to the system rounded face which feels close enough.
        self.font(.system(size: size, weight: weight, design: design))
    }
}

// MARK: - Color hex helper

extension Color {
    init(hex: UInt32, alpha: Double = 1.0) {
        let r = Double((hex & 0xFF0000) >> 16) / 255.0
        let g = Double((hex & 0x00FF00) >> 8) / 255.0
        let b = Double( hex & 0x0000FF) / 255.0
        self.init(.sRGB, red: r, green: g, blue: b, opacity: alpha)
    }
}
