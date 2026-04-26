import Foundation
import SwiftUI

// Repurposed: PlanTask = a single block in the daily Tagesplaner timeline.
// File name kept to fit the existing Xcode project; the type below is what the app uses.

enum PlanTaskType: String, Codable, CaseIterable {
    case study, practice, review, breakTime = "break", focus

    var label: String {
        switch self {
        case .study:     return "Lernen"
        case .practice:  return "Üben"
        case .review:    return "Wiederholung"
        case .breakTime: return "Pause"
        case .focus:     return "Fokus"
        }
    }

    var color: Color {
        switch self {
        case .study:     return SubjectAccent.math
        case .practice:  return SubjectAccent.stats
        case .review:    return StatusColor.success
        case .breakTime: return StatusColor.warning
        case .focus:     return StatusColor.danger
        }
    }
}

struct PlanTask: Identifiable, Codable, Hashable {
    let id: UUID
    var time: String          // e.g. "08:00"
    var durationMinutes: Int
    var subjectName: String?
    var label: String
    var type: PlanTaskType
    var done: Bool

    init(
        id: UUID = UUID(),
        time: String,
        durationMinutes: Int = 30,
        subjectName: String? = nil,
        label: String,
        type: PlanTaskType,
        done: Bool = false
    ) {
        self.id = id
        self.time = time
        self.durationMinutes = durationMinutes
        self.subjectName = subjectName
        self.label = label
        self.type = type
        self.done = done
    }
}

// Backwards-compatible alias so any older references keep compiling.
typealias TaskItem = PlanTask
