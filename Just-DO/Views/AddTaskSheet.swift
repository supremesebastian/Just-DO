import SwiftUI

// Repurposed: CoachView (AI-Coach Chat).
// File name kept to fit the existing Xcode project.

struct ChatMessage: Identifiable, Equatable {
    enum Role { case user, ai }
    let id = UUID()
    let role: Role
    let text: String
}

struct CoachView: View {
    @EnvironmentObject private var store: StudyStore
    @EnvironmentObject private var theme: ThemeManager
    @State private var draft: String = ""
    @State private var messages: [ChatMessage] = [
        ChatMessage(role: .ai,
                    text: "Guten Morgen! Du hast heute 4 h Lernzeit eingeplant. Statistik sollte Priorität haben – Klausur in 12 Tagen, dein Fortschritt liegt bei 42 %. Soll ich einen Intensivplan erstellen?")
    ]
    @State private var isAITyping: Bool = false
    @FocusState private var inputFocused: Bool

    var body: some View {
        let p = theme.palette
        VStack(spacing: 0) {
            header
            ScrollViewReader { proxy in
                ScrollView {
                    VStack(spacing: 12) {
                        ForEach(messages) { msg in
                            ChatBubble(message: msg)
                                .id(msg.id)
                        }
                        if isAITyping { TypingDots().id("typing") }
                    }
                    .padding(.horizontal, Layout.screenHorizontalPadding)
                    .padding(.vertical, 16)
                    .readableWidth()
                }
                .onChange(of: messages.count) { _, _ in
                    if let last = messages.last {
                        withAnimation { proxy.scrollTo(last.id, anchor: .bottom) }
                    }
                }
            }
            inputBar
        }
        .background(p.bg.ignoresSafeArea())
    }

    private var header: some View {
        let p = theme.palette
        return HStack(spacing: 12) {
            ZStack {
                RoundedRectangle(cornerRadius: 12, style: .continuous)
                    .fill(LinearGradient(colors: [p.accent, p.accentSecondary],
                                         startPoint: .topLeading, endPoint: .bottomTrailing))
                    .frame(width: 36, height: 36)
                Image(systemName: "brain.head.profile")
                    .font(.system(size: 18, weight: .bold))
                    .foregroundStyle(.white)
            }
            VStack(alignment: .leading, spacing: 2) {
                Text("AI Coach")
                    .font(.system(size: 17, weight: .heavy))
                    .foregroundStyle(p.text)
                Text("dein Lernplan-Berater")
                    .font(.system(size: 12))
                    .foregroundStyle(p.textSub)
            }
            Spacer()
        }
        .padding(.horizontal, Layout.screenHorizontalPadding)
        .padding(.top, 8)
        .padding(.bottom, 12)
        .background(p.surface.opacity(0.0))
        .overlay(p.divider.frame(height: 1), alignment: .bottom)
    }

    private var inputBar: some View {
        let p = theme.palette
        return HStack(spacing: 10) {
            TextField("Frag den Coach …", text: $draft, axis: .horizontal)
                .focused($inputFocused)
                .submitLabel(.send)
                .onSubmit(send)
                .padding(.horizontal, 14)
                .padding(.vertical, 12)
                .background(p.pillBg, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                .foregroundStyle(p.text)
            Button(action: send) {
                Image(systemName: "paperplane.fill")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundStyle(.white)
                    .frame(width: 44, height: 44)
                    .background(
                        LinearGradient(colors: [p.accent, p.accentSecondary],
                                       startPoint: .topLeading, endPoint: .bottomTrailing),
                        in: RoundedRectangle(cornerRadius: 14, style: .continuous)
                    )
            }
            .buttonStyle(.plain)
            .disabled(draft.trimmingCharacters(in: .whitespaces).isEmpty)
            .opacity(draft.trimmingCharacters(in: .whitespaces).isEmpty ? 0.5 : 1)
        }
        .padding(.horizontal, Layout.screenHorizontalPadding)
        .padding(.vertical, 10)
        .background(p.surface.opacity(0.0))
        .overlay(p.divider.frame(height: 1), alignment: .top)
    }

    private func send() {
        let text = draft.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { return }
        messages.append(ChatMessage(role: .user, text: text))
        draft = ""
        isAITyping = true
        // Local mock reply – the real app would call an AI backend here.
        Task {
            try? await Task.sleep(nanoseconds: 900_000_000)
            await MainActor.run {
                isAITyping = false
                messages.append(ChatMessage(role: .ai, text: mockReply(for: text)))
            }
        }
    }

    private func mockReply(for prompt: String) -> String {
        let lower = prompt.lowercased()
        if lower.contains("plan") || lower.contains("statistik") {
            return "Klar — ich schlage 2 × 45 min Statistik heute Abend vor, dazwischen 10 min Pause. Soll ich das in deinen Tagesplaner eintragen?"
        }
        if lower.contains("pause") {
            return "Mach gerne 15 min Pause – etwas Wasser, kurzer Spaziergang. Ich erinnere dich danach."
        }
        return "Verstanden. Ich behalte das im Kopf und passe deinen Lernplan entsprechend an."
    }
}

// MARK: - Chat bubble + typing dots

struct ChatBubble: View {
    @EnvironmentObject private var theme: ThemeManager
    let message: ChatMessage

    var body: some View {
        let p = theme.palette
        let isUser = message.role == .user
        HStack {
            if isUser { Spacer(minLength: 40) }
            Text(message.text)
                .font(.system(size: 14))
                .foregroundStyle(isUser ? .white : p.text)
                .padding(.horizontal, 14)
                .padding(.vertical, 10)
                .background(
                    Group {
                        if isUser {
                            LinearGradient(colors: [p.accent, p.accentSecondary],
                                           startPoint: .topLeading, endPoint: .bottomTrailing)
                        } else {
                            p.card
                        }
                    },
                    in: RoundedRectangle(cornerRadius: 16, style: .continuous)
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .stroke(isUser ? Color.clear : p.cardBorder, lineWidth: 1)
                )
            if !isUser { Spacer(minLength: 40) }
        }
    }
}

struct TypingDots: View {
    @EnvironmentObject private var theme: ThemeManager
    @State private var phase: Int = 0

    var body: some View {
        let p = theme.palette
        HStack(spacing: 6) {
            ForEach(0..<3) { i in
                Circle()
                    .fill(p.textSub)
                    .frame(width: 6, height: 6)
                    .scaleEffect(phase == i ? 1.4 : 1)
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, 12)
        .background(p.card, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .frame(maxWidth: .infinity, alignment: .leading)
        .onAppear {
            Timer.scheduledTimer(withTimeInterval: 0.35, repeats: true) { _ in
                phase = (phase + 1) % 3
            }
        }
    }
}

// Legacy alias so older references still compile.
typealias AddTaskSheet = CoachView
