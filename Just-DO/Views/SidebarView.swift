import SwiftUI

// Repurposed: Dashboard / Home tab.
// File name kept to fit the existing Xcode project.

struct DashboardView: View {
    @EnvironmentObject private var store: StudyStore
    @EnvironmentObject private var theme: ThemeManager
    @Environment(\.horizontalSizeClass) private var hSize

    var body: some View {
        let p = theme.palette
        ScrollView {
            VStack(spacing: 18) {
                header
                streakRow
                aiCoachCard
                examsSection
                todayPlanSection
            }
            .padding(.horizontal, Layout.screenHorizontalPadding)
            .padding(.top, 8)
            .padding(.bottom, 16)
            .readableWidth()
        }
        .background(p.bg.ignoresSafeArea())
    }

    // MARK: Header

    private var header: some View {
        let p = theme.palette
        return HStack(alignment: .center) {
            VStack(alignment: .leading, spacing: 2) {
                Text(dateLabel)
                    .font(.system(size: 13, weight: .regular))
                    .foregroundStyle(p.textSub)
                Text("Hi, \(store.greetingName) 👋")
                    .font(.system(size: 24, weight: .heavy))
                    .tracking(-0.5)
                    .foregroundStyle(p.text)
            }
            Spacer()
            HStack(spacing: 10) {
                circleIconButton(systemName: "bell.fill", badge: store.exams.contains { $0.daysLeft <= 3 })
                Button {
                    theme.toggle()
                } label: {
                    circleIcon(systemName: theme.mode == .dark ? "sun.max.fill" : "moon.fill")
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Theme umschalten")

                avatarButton
            }
        }
    }

    private var dateLabel: String {
        let f = DateFormatter()
        f.locale = Locale(identifier: "de_DE")
        f.dateFormat = "EEEE, d. MMMM"
        return f.string(from: Date())
    }

    private func circleIconButton(systemName: String, badge: Bool = false) -> some View {
        let p = theme.palette
        return ZStack(alignment: .topTrailing) {
            circleIcon(systemName: systemName)
            if badge {
                Circle()
                    .fill(StatusColor.danger)
                    .frame(width: 8, height: 8)
                    .overlay(Circle().stroke(p.bg, lineWidth: 2))
                    .offset(x: -4, y: 4)
            }
        }
    }

    private func circleIcon(systemName: String) -> some View {
        let p = theme.palette
        return Image(systemName: systemName)
            .font(.system(size: 15, weight: .semibold))
            .foregroundStyle(p.text)
            .frame(width: 36, height: 36)
            .background(p.pillBg, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
    }

    private var avatarButton: some View {
        let p = theme.palette
        return Text(initials(from: store.greetingName))
            .font(.system(size: 12, weight: .heavy))
            .foregroundStyle(.white)
            .frame(width: 36, height: 36)
            .background(
                LinearGradient(colors: [p.accent, p.accentSecondary],
                               startPoint: .topLeading, endPoint: .bottomTrailing),
                in: RoundedRectangle(cornerRadius: 12, style: .continuous)
            )
    }

    private func initials(from name: String) -> String {
        let parts = name.split(separator: " ")
        let chars = parts.compactMap { $0.first.map(String.init) }
        return chars.prefix(2).joined().uppercased()
    }

    // MARK: Streak row

    private var streakRow: some View {
        HStack(spacing: 10) {
            StatPill(icon: "flame.fill", value: "\(store.streakDays) Tage", label: "Streak", tint: StatusColor.warning)
            StatPill(icon: "clock.fill",  value: timeString(store.todayHoursDone) + "/" + timeString(store.todayHoursPlanned), label: "Heute", tint: theme.palette.accent)
            StatPill(icon: "checkmark.seal.fill", value: "\(store.doneCount)/\(store.totalCount)", label: "Tasks", tint: StatusColor.success)
        }
    }

    private func timeString(_ hours: Double) -> String {
        let h = Int(hours.rounded(.down))
        let m = Int((hours - Double(h)) * 60)
        if h == 0 { return "\(m)m" }
        if m == 0 { return "\(h)h" }
        return "\(h)h\(m)"
    }

    // MARK: AI Coach card

    private var aiCoachCard: some View {
        let p = theme.palette
        return VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 12) {
                ZStack {
                    RoundedRectangle(cornerRadius: 12, style: .continuous)
                        .fill(LinearGradient(
                            colors: [p.accent.opacity(0.35), p.accentSecondary.opacity(0.35)],
                            startPoint: .topLeading, endPoint: .bottomTrailing
                        ))
                        .frame(width: 36, height: 36)
                    Image(systemName: "brain.head.profile")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundStyle(p.text)
                }
                VStack(alignment: .leading, spacing: 2) {
                    Text("AI Coach")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundStyle(p.text)
                    Text("Tipp für heute")
                        .font(.system(size: 11, weight: .semibold))
                        .tracking(0.5)
                        .foregroundStyle(p.textSub)
                }
                Spacer()
            }
            Text("Statistik sollte heute Priorität haben — dein Fortschritt liegt erst bei 42 % und die Klausur ist in 12 Tagen.")
                .font(.system(size: 14, weight: .regular))
                .foregroundStyle(p.text)
                .lineLimit(3)
            HStack(spacing: 6) {
                Text("Mit Coach sprechen")
                    .font(.system(size: 13, weight: .semibold))
                Image(systemName: "chevron.right")
                    .font(.system(size: 11, weight: .bold))
            }
            .foregroundStyle(p.accent)
        }
        .padding(16)
        .background(
            RoundedRectangle(cornerRadius: Layout.largeCardCorner, style: .continuous)
                .fill(LinearGradient(
                    colors: [p.accent.opacity(0.13), p.accentSecondary.opacity(0.13)],
                    startPoint: .topLeading, endPoint: .bottomTrailing
                ))
        )
        .overlay(
            RoundedRectangle(cornerRadius: Layout.largeCardCorner, style: .continuous)
                .stroke(p.accent.opacity(0.2), lineWidth: 1)
        )
    }

    // MARK: Exams section

    private var examsSection: some View {
        let p = theme.palette
        return VStack(alignment: .leading, spacing: 10) {
            SectionHeader("Anstehende Prüfungen")
            VStack(spacing: 8) {
                ForEach(store.exams) { exam in
                    examRow(exam)
                }
            }
        }
    }

    private func examRow(_ exam: Exam) -> some View {
        let p = theme.palette
        let countdown = countdownColor(for: exam.daysLeft, palette: p)
        return HStack(spacing: 12) {
            VStack(spacing: 2) {
                Text("\(exam.daysLeft)")
                    .font(.system(size: 18, weight: .heavy, design: .monospaced))
                    .foregroundStyle(countdown)
                Text("Tage")
                    .font(.system(size: 9, weight: .semibold))
                    .tracking(0.5)
                    .foregroundStyle(p.textSub)
            }
            .frame(width: 48, height: 48)
            .background(countdown.opacity(0.12), in: RoundedRectangle(cornerRadius: 12, style: .continuous))

            VStack(alignment: .leading, spacing: 2) {
                Text(exam.name)
                    .font(.system(size: 15, weight: .bold))
                    .foregroundStyle(p.text)
                    .lineLimit(1)
                HStack(spacing: 6) {
                    Circle()
                        .fill(exam.subjectColor)
                        .frame(width: 6, height: 6)
                    Text(exam.subjectName + " · " + exam.time)
                        .font(.system(size: 12))
                        .foregroundStyle(p.textSub)
                }
            }
            Spacer()
            Image(systemName: "chevron.right")
                .font(.system(size: 12, weight: .bold))
                .foregroundStyle(p.textMuted)
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 12)
        .cardStyle(palette: p)
    }

    private func countdownColor(for days: Int, palette p: ThemePalette) -> Color {
        if days <= 0 { return StatusColor.danger }
        if days <= 3 { return StatusColor.warning }
        return p.accent
    }

    // MARK: Today plan preview

    private var todayPlanSection: some View {
        let p = theme.palette
        return VStack(alignment: .leading, spacing: 10) {
            SectionHeader("Heute geplant")
            VStack(spacing: 8) {
                ForEach(store.todayPlan.prefix(4)) { task in
                    HStack(spacing: 12) {
                        DoneCheckbox(done: task.done) { store.toggle(task) }
                        VStack(alignment: .leading, spacing: 2) {
                            Text(task.label)
                                .font(.system(size: 14, weight: .semibold))
                                .strikethrough(task.done, color: p.textMuted)
                                .foregroundStyle(task.done ? p.textSub : p.text)
                                .lineLimit(2)
                            HStack(spacing: 6) {
                                Text(task.time)
                                    .font(.system(size: 11, weight: .medium, design: .monospaced))
                                    .foregroundStyle(p.textSub)
                                if let subj = task.subjectName {
                                    Text("· " + subj)
                                        .font(.system(size: 11))
                                        .foregroundStyle(p.textSub)
                                        .lineLimit(1)
                                }
                            }
                        }
                        Spacer()
                        TypeBadge(type: task.type)
                    }
                    .padding(.horizontal, 14)
                    .padding(.vertical, 10)
                    .opacity(task.done ? 0.55 : 1)
                    .cardStyle(palette: p)
                }
            }
        }
    }
}

// Legacy alias: anything that still references SidebarView gets DashboardView.
typealias SidebarView = DashboardView
