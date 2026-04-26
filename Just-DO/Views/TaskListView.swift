import SwiftUI

// Repurposed: Kurse / Subjects tab.
// File name kept to fit the existing Xcode project.

struct KurseView: View {
    @EnvironmentObject private var store: StudyStore
    @EnvironmentObject private var theme: ThemeManager
    @State private var selected: Subject?

    var body: some View {
        let p = theme.palette
        ScrollView {
            VStack(spacing: 16) {
                header
                semesterBanner
                VStack(spacing: 10) {
                    ForEach(store.subjects) { subj in
                        Button { selected = subj } label: {
                            SubjectCard(subject: subj)
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
            .padding(.horizontal, Layout.screenHorizontalPadding)
            .padding(.top, 8)
            .padding(.bottom, 16)
            .readableWidth()
        }
        .background(p.bg.ignoresSafeArea())
        .sheet(item: $selected) { subj in
            NavigationStack {
                SubjectDetailView(subject: subj)
            }
            .presentationDetents([.large])
            .presentationDragIndicator(.visible)
        }
    }

    private var header: some View {
        let p = theme.palette
        return HStack(alignment: .firstTextBaseline) {
            VStack(alignment: .leading, spacing: 2) {
                Text("Kurse")
                    .font(.system(size: 26, weight: .heavy))
                    .tracking(-0.5)
                    .foregroundStyle(p.text)
                Text("\(store.subjects.count) Fächer · Semesterüberblick")
                    .font(.system(size: 13))
                    .foregroundStyle(p.textSub)
            }
            Spacer()
        }
    }

    private var semesterBanner: some View {
        let p = theme.palette
        let avg = store.subjects.map(\.progress).reduce(0, +) / Double(max(1, store.subjects.count))
        return VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .center, spacing: 14) {
                ProgressRing(progress: avg, size: 56, stroke: 5, color: p.accent, background: p.pillBg)
                VStack(alignment: .leading, spacing: 2) {
                    Text("Semester-Fortschritt")
                        .font(.system(size: 11, weight: .semibold))
                        .tracking(0.5)
                        .foregroundStyle(p.textSub)
                    Text("\(Int((avg * 100).rounded())) %")
                        .font(.system(size: 22, weight: .heavy))
                        .foregroundStyle(p.text)
                    Text("\(store.subjects.count) Fächer aktiv")
                        .font(.system(size: 12))
                        .foregroundStyle(p.textSub)
                }
                Spacer()
            }
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(p.pillBg).frame(height: 6)
                    Capsule()
                        .fill(LinearGradient(colors: [p.accent, p.accentSecondary],
                                             startPoint: .leading, endPoint: .trailing))
                        .frame(width: geo.size.width * avg, height: 6)
                }
            }
            .frame(height: 6)
        }
        .padding(16)
        .cardStyle(palette: p, corner: Layout.largeCardCorner)
    }
}

// MARK: - Subject card

struct SubjectCard: View {
    @EnvironmentObject private var theme: ThemeManager
    let subject: Subject

    var body: some View {
        let p = theme.palette
        HStack(spacing: 14) {
            ProgressRing(progress: subject.progress, size: 44, stroke: 4, color: subject.color, background: p.pillBg)
                .overlay(
                    Text("\(Int((subject.progress * 100).rounded()))")
                        .font(.system(size: 11, weight: .heavy))
                        .foregroundStyle(p.text)
                )
            VStack(alignment: .leading, spacing: 4) {
                Text(subject.name)
                    .font(.system(size: 15, weight: .bold))
                    .foregroundStyle(p.text)
                    .lineLimit(1)
                HStack(spacing: 8) {
                    Label("\(subject.openTasks) Tasks", systemImage: "list.bullet")
                    Label("\(subject.credits) ECTS", systemImage: "graduationcap")
                }
                .font(.system(size: 11, weight: .medium))
                .foregroundStyle(p.textSub)
            }
            Spacer()
            VStack(alignment: .trailing, spacing: 2) {
                Text("Klausur")
                    .font(.system(size: 9, weight: .semibold))
                    .tracking(0.5)
                    .foregroundStyle(p.textSub)
                Text(subject.examLabel)
                    .font(.system(size: 12, weight: .bold, design: .monospaced))
                    .foregroundStyle(p.text)
                Text("in \(subject.daysLeft) Tagen")
                    .font(.system(size: 10))
                    .foregroundStyle(p.textSub)
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 14)
        .cardStyle(palette: p)
    }
}

// Legacy alias
typealias TaskListView = KurseView
