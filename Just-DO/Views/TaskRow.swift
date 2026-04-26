import SwiftUI

// Repurposed: PlanerView (Tagesplaner timeline).
// File name kept to fit the existing Xcode project.

struct PlanerView: View {
    @EnvironmentObject private var store: StudyStore
    @EnvironmentObject private var theme: ThemeManager

    var body: some View {
        let p = theme.palette
        ScrollView {
            VStack(spacing: 18) {
                header
                progressCard
                focusBanner
                timeline
            }
            .padding(.horizontal, Layout.screenHorizontalPadding)
            .padding(.top, 8)
            .padding(.bottom, 16)
            .readableWidth()
        }
        .background(p.bg.ignoresSafeArea())
    }

    private var header: some View {
        let p = theme.palette
        return HStack(alignment: .firstTextBaseline) {
            VStack(alignment: .leading, spacing: 2) {
                Text("Tagesplaner")
                    .font(.system(size: 26, weight: .heavy))
                    .tracking(-0.5)
                    .foregroundStyle(p.text)
                Text(dateLabel)
                    .font(.system(size: 13))
                    .foregroundStyle(p.textSub)
            }
            Spacer()
            Button {
                // Placeholder for "add task" — wired into the in-memory store via a quick item.
                store.add(PlanTask(time: "17:00", durationMinutes: 30, label: "Neue Aufgabe", type: .study))
            } label: {
                Image(systemName: "plus")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundStyle(.white)
                    .frame(width: 36, height: 36)
                    .background(
                        LinearGradient(colors: [p.accent, p.accentSecondary],
                                       startPoint: .topLeading, endPoint: .bottomTrailing),
                        in: RoundedRectangle(cornerRadius: 12, style: .continuous)
                    )
            }
            .buttonStyle(.plain)
            .accessibilityLabel("Aufgabe hinzufügen")
        }
    }

    private var dateLabel: String {
        let f = DateFormatter()
        f.locale = Locale(identifier: "de_DE")
        f.dateFormat = "EEEE, d. MMMM"
        return f.string(from: Date())
    }

    private var progressCard: some View {
        let p = theme.palette
        let pct = store.todayProgress
        return VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text("Heute geschafft")
                    .font(.system(size: 13, weight: .semibold))
                    .tracking(0.5)
                    .foregroundStyle(p.textSub)
                Spacer()
                Text("\(Int((pct * 100).rounded())) %")
                    .font(.system(size: 18, weight: .heavy, design: .monospaced))
                    .foregroundStyle(p.text)
            }
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(p.pillBg).frame(height: 8)
                    Capsule()
                        .fill(LinearGradient(colors: [p.accent, p.accentSecondary],
                                             startPoint: .leading, endPoint: .trailing))
                        .frame(width: geo.size.width * pct, height: 8)
                        .animation(.easeInOut(duration: 1.0), value: pct)
                }
            }
            .frame(height: 8)
        }
        .padding(14)
        .cardStyle(palette: p)
    }

    private var focusBanner: some View {
        let p = theme.palette
        guard store.todayPlan.contains(where: { $0.type == .focus && !$0.done }) else {
            return AnyView(EmptyView())
        }
        return AnyView(
            HStack(spacing: 12) {
                ZStack {
                    Circle().fill(StatusColor.danger.opacity(0.18)).frame(width: 40, height: 40)
                    Image(systemName: "timer")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundStyle(StatusColor.danger)
                }
                VStack(alignment: .leading, spacing: 2) {
                    Text("Fokus-Session bereit")
                        .font(.system(size: 14, weight: .bold))
                        .foregroundStyle(p.text)
                    Text("Pomodoro 25 min · Deep Work")
                        .font(.system(size: 12))
                        .foregroundStyle(p.textSub)
                }
                Spacer()
                Text("25:00")
                    .font(.system(size: 18, weight: .heavy, design: .monospaced))
                    .foregroundStyle(p.text)
            }
            .padding(14)
            .background(
                RoundedRectangle(cornerRadius: Layout.cardCorner, style: .continuous)
                    .fill(StatusColor.danger.opacity(0.10))
            )
            .overlay(
                RoundedRectangle(cornerRadius: Layout.cardCorner, style: .continuous)
                    .stroke(StatusColor.danger.opacity(0.35), lineWidth: 1)
            )
        )
    }

    private var timeline: some View {
        VStack(spacing: 10) {
            ForEach(store.todayPlan) { task in
                TimelineRow(task: task)
            }
        }
    }
}

// MARK: - Timeline row (single plan task)

struct TimelineRow: View {
    @EnvironmentObject private var store: StudyStore
    @EnvironmentObject private var theme: ThemeManager
    let task: PlanTask

    var body: some View {
        let p = theme.palette
        HStack(alignment: .top, spacing: 10) {
            // Time column
            VStack {
                Text(task.time)
                    .font(.system(size: 12, weight: .bold, design: .monospaced))
                    .foregroundStyle(p.textSub)
                Text("\(task.durationMinutes)m")
                    .font(.system(size: 10))
                    .foregroundStyle(p.textMuted)
            }
            .frame(width: 44, alignment: .leading)

            // Connector dot
            ZStack(alignment: .top) {
                Rectangle()
                    .fill(p.divider)
                    .frame(width: 2)
                Circle()
                    .fill(task.type.color)
                    .frame(width: 10, height: 10)
                    .padding(.top, 12)
            }
            .frame(width: 10)

            // Task card
            HStack(spacing: 10) {
                DoneCheckbox(done: task.done) { store.toggle(task) }
                VStack(alignment: .leading, spacing: 6) {
                    HStack(spacing: 6) {
                        TypeBadge(type: task.type)
                        if let subj = task.subjectName {
                            Text(subj)
                                .font(.system(size: 11, weight: .semibold))
                                .foregroundStyle(p.textSub)
                                .lineLimit(1)
                        }
                    }
                    Text(task.label)
                        .font(.system(size: 14, weight: .semibold))
                        .strikethrough(task.done, color: p.textMuted)
                        .foregroundStyle(task.done ? p.textSub : p.text)
                        .lineLimit(2)
                }
                Spacer()
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 12)
            .frame(maxWidth: .infinity)
            .opacity(task.done ? 0.55 : 1)
            .cardStyle(palette: p)
        }
        // Long-press to delete (real swipe-to-delete needs a List, which we intentionally avoid
        // so the timeline keeps its custom rail layout).
        .contextMenu {
            Button(role: .destructive) {
                store.delete(task)
            } label: {
                Label("Löschen", systemImage: "trash")
            }
        }
    }
}

// Legacy alias: keep TaskRow working for any compiler reference.
struct TaskRow: View {
    let task: PlanTask
    var body: some View { TimelineRow(task: task) }
}
