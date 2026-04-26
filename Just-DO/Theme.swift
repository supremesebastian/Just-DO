import SwiftUI

enum Theme {
    static let accent = Color(red: 0.20, green: 0.55, blue: 0.95)
    static let surface = Color(.secondarySystemBackground)
    static let cardCorner: CGFloat = 14

    static let phoneHorizontalPadding: CGFloat = 16
    static let padHorizontalPadding: CGFloat = 24

    static let readableContentMaxWidth: CGFloat = 720
}

extension View {
    @ViewBuilder
    func adaptiveHorizontalPadding(_ horizontalSizeClass: UserInterfaceSizeClass?) -> some View {
        switch horizontalSizeClass {
        case .regular:
            self.padding(.horizontal, Theme.padHorizontalPadding)
        default:
            self.padding(.horizontal, Theme.phoneHorizontalPadding)
        }
    }

    @ViewBuilder
    func readableWidth() -> some View {
        self.frame(maxWidth: Theme.readableContentMaxWidth)
            .frame(maxWidth: .infinity)
    }
}
