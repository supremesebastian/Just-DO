import SwiftUI

// Repurposed: SubjectDetailView (Materialien & Stats).
// File name kept to fit the existing Xcode project.

struct SubjectDetailView: View {
    @EnvironmentObject private var theme: ThemeManager
    @Environment(\.dismiss) private var dismiss
    let subject: Subject

    var body: some View {
        let p = theme.palette
        ScrollView {
            VStack(spacing: 18) {
                hero
                statsRow
                materialsSection
                actionsRow
            }
            .padding(.horizontal, Layout.screenHorizontalPadding)
            .padding(.top, 8)
            .padding(.bottom, 24)
            .readableWidth()
        }
        .background(p.bg.ignoresSafeArea())
        .navigationTitle(subject.name)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Fertig") { dismiss() }
            }
        }
    }

    private var hero: some View {
        let p = theme.palette
        return VStack(spacing: 14) {
            ZStack {
                ProgressRing(progress: subject.progress, size: 96, stroke: 7, color: subject.color, background: p.pillBg)
                Text("\(Int((subject.progress * 100).rounded())) %")
                    .font(.system(size: 22, weight: .heavy))
                    .foregroundStyle(p.text)
            }
            VStack(spacing: 4) {
                Text(subject.name)
                    .font(.system(size: 22, weight: .heavy))
                    .tracking(-0.5)
                    .foregroundStyle(p.text)
                Text("Klausur \(subject.examLabel) · in \(subject.daysLeft) Tagen")
                    .font(.system(size: 13))
                    .foregroundStyle(p.textSub)
            }
        }
        .padding(.top, 8)
    }

    private var statsRow: some View {
        let p = theme.palette
        return HStack(spacing: 10) {
            statBlock(value: "\(subject.openTasks)", label: "Offene Tasks", tint: p.accent)
            statBlock(value: "\(subject.credits)",  label: "ECTS",         tint: subject.color)
            statBlock(value: "\(subject.daysLeft)", label: "Tage übrig",   tint: StatusColor.warning)
        }
    }

    private func statBlock(value: String, label: String, tint: Color) -> some View {
        let p = theme.palette
        return VStack(alignment: .center, spacing: 4) {
            Text(value)
                .font(.system(size: 18, weight: .heavy))
                .foregroundStyle(tint)
            Text(label.uppercased())
                .font(.system(size: 9, weight: .semibold))
                .tracking(0.5)
                .foregroundStyle(p.textSub)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .cardStyle(palette: p, corner: 14)
    }

    private var materialsSection: some View {
        let p = theme.palette
        return VStack(alignment: .leading, spacing: 10) {
            SectionHeader("Materialien")
            VStack(spacing: 8) {
                materialRow(icon: "doc.richtext", title: "Skript Kapitel 4.pdf", meta: "PDF · 2,1 MB")
                materialRow(icon: "doc.text",     title: "Übungsblatt 7",        meta: "DOCX · 480 KB")
                materialRow(icon: "note.text",    title: "Notizen Vorlesung",    meta: "Notiz · vor 2 Tagen")
            }
            uploadCard
        }
    }

    private func materialRow(icon: String, title: String, meta: String) -> some View {
        let p = theme.palette
        return HStack(spacing: 12) {
            ZStack {
                RoundedRectangle(cornerRadius: 10, style: .continuous)
                    .fill(subject.color.opacity(0.18))
                    .frame(width: 36, height: 36)
                Image(systemName: icon)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(subject.color)
            }
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundStyle(p.text)
                    .lineLimit(1)
                Text(meta)
                    .font(.system(size: 11))
                    .foregroundStyle(p.textSub)
            }
            Spacer()
            Image(systemName: "chevron.right")
                .font(.system(size: 12, weight: .bold))
                .foregroundStyle(p.textMuted)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .cardStyle(palette: p)
    }

    private var uploadCard: some View {
        let p = theme.palette
        return HStack(spacing: 10) {
            Image(systemName: "plus")
                .font(.system(size: 16, weight: .bold))
            Text("Material hinzufügen")
                .font(.system(size: 14, weight: .semibold))
        }
        .foregroundStyle(p.accent)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(
            RoundedRectangle(cornerRadius: Layout.cardCorner, style: .continuous)
                .fill(LinearGradient(
                    colors: [p.accent.opacity(0.13), p.accentSecondary.opacity(0.13)],
                    startPoint: .topLeading, endPoint: .bottomTrailing
                ))
        )
        .overlay(
            RoundedRectangle(cornerRadius: Layout.cardCorner, style: .continuous)
                .strokeBorder(p.accent.opacity(0.33), style: StrokeStyle(lineWidth: 1.5, dash: [6, 6]))
        )
    }

    private var actionsRow: some View {
        HStack(spacing: 10) {
            actionPill(icon: "rectangle.on.rectangle.angled", title: "Karteikarten", tint: theme.palette.accent)
            actionPill(icon: "bolt.fill",                     title: "Quiz",         tint: StatusColor.success)
        }
    }

    private func actionPill(icon: String, title: String, tint: Color) -> some View {
        HStack(spacing: 8) {
            Image(systemName: icon)
            Text(title)
                .font(.system(size: 14, weight: .semibold))
        }
        .foregroundStyle(.white)
        .frame(maxWidth: .infinity)
        .padding(.vertical, 14)
        .background(
            LinearGradient(colors: [tint, tint.opacity(0.78)],
                           startPoint: .topLeading, endPoint: .bottomTrailing),
            in: RoundedRectangle(cornerRadius: 14, style: .continuous)
        )
        .shadow(color: tint.opacity(0.27), radius: 12, x: 0, y: 6)
    }
}

// Legacy alias
typealias TaskDetailView = SubjectDetailView
