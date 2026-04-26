import Foundation
import SwiftUI

// Repurposed: Subject = a study subject ("Mathematik II", "Statistik" …).
// File name kept to fit the existing Xcode project.

struct Subject: Identifiable, Codable, Hashable {
    let id: Int
    var name: String
    var colorHex: UInt32
    var progress: Double      // 0…1
    var credits: Int
    var examLabel: String     // e.g. "15. Jun"
    var daysLeft: Int
    var openTasks: Int

    var color: Color { Color(hex: colorHex) }

    static let seed: [Subject] = [
        Subject(id: 1, name: "Mathematik II",    colorHex: 0x4A7CFF, progress: 0.68, credits: 5, examLabel: "15. Jun", daysLeft: 51, openTasks: 12),
        Subject(id: 2, name: "Statistik",        colorHex: 0x7C6EFA, progress: 0.42, credits: 6, examLabel: "22. Jun", daysLeft: 58, openTasks: 9),
        Subject(id: 3, name: "Wirtschaftsrecht", colorHex: 0x34C7A0, progress: 0.81, credits: 4, examLabel: "10. Jun", daysLeft: 46, openTasks: 7),
        Subject(id: 4, name: "Marketing",        colorHex: 0xFF6B6B, progress: 0.29, credits: 3, examLabel: "28. Jun", daysLeft: 64, openTasks: 15),
        Subject(id: 5, name: "BWL Grundlagen",   colorHex: 0xFFB347, progress: 0.55, credits: 5, examLabel: "18. Jun", daysLeft: 54, openTasks: 10),
        Subject(id: 6, name: "Makroökonomie",    colorHex: 0xA855F7, progress: 0.33, credits: 6, examLabel: "5. Jul",  daysLeft: 71, openTasks: 11),
    ]
}

struct Exam: Identifiable, Codable, Hashable {
    let id: UUID
    var name: String
    var subjectName: String
    var subjectColorHex: UInt32
    var date: Date
    var time: String          // "HH:mm"
    var location: String

    var subjectColor: Color { Color(hex: subjectColorHex) }

    var daysLeft: Int {
        let cal = Calendar.current
        let start = cal.startOfDay(for: Date())
        let end = cal.startOfDay(for: date)
        return cal.dateComponents([.day], from: start, to: end).day ?? 0
    }
}

// Keep the legacy alias so older code won't break compilation.
typealias TaskList = Subject
