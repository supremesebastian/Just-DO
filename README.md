# Just Do – AI Study Coach (SwiftUI)

Native SwiftUI-Implementierung des Designs aus dem **Claude Design Handoff Bundle**
(`Just Do.html` und Begleitdateien). Zielgeräte: **iPhone 13 Pro Max** und
**iPad Pro 13" M4** ab iOS 17.

> Quelle der Vorlage: `https://api.anthropic.com/v1/design/h/WY7GmgEJDXpm3tpwuUNicA`
> – ein gzip-Tar mit dem `organisation-app/` Bundle (HTML/JSX-Prototyp + README
> + Chat-Transkripte). Die HTML-/JSX-Dateien sind Design-Referenz; Production-Code
> ist diese SwiftUI-App.

## Was ist umgesetzt

Die App entspricht dem Tab-basierten 4-Screen-Flow aus dem Handoff:

| Tab | SwiftUI-View | Inhalt |
|---|---|---|
| Splash | `RootView.SplashScreen` | App-Mark mit Gradient, Title + Subtitle, Spring-Reveal, Fade-out |
| Home | `DashboardView` (in `Views/SidebarView.swift`) | Header mit Datum + Begrüßung, Notification-Bell mit Badge, Theme-Toggle (Sonne/Mond), Avatar; Streak-Karten (Streak / Heute / Tasks); AI-Coach-Karte (Gradient, Tipp); Anstehende Prüfungen (Countdown-Badge, Subject-Color); Heute geplant (Top-4 Tasks, Toggle, Type-Badge) |
| Kurse | `KurseView` (in `Views/TaskListView.swift`) | Semester-Banner mit Progress-Ring + Verlaufsbalken; Fach-Karten mit Mini-Ring, ECTS, Klausur-Datum; Tap öffnet `SubjectDetailView` als Sheet |
| Planer | `PlanerView` (in `Views/TaskRow.swift`) | Header + Quick-Add; Heute-Fortschrittsbalken; Fokus-Banner; Timeline (Zeitspalte / Verbindungslinie + Dot in Type-Color / Karte mit Checkbox + Type-Badge + Subject) |
| Coach | `CoachView` (in `Views/AddTaskSheet.swift`) | AI-Header (Bot-Mark + Untertitel); Chat-Verlauf mit User-Bubbles (Gradient) und AI-Bubbles (Card); Typing-Dots; Eingabe-Bar mit Send-Button |

Sub-View:
- `SubjectDetailView` (in `Views/TaskDetailView.swift`) – Großer Ring mit %,
  Stats-Zeile, Material-Liste, Upload-Karte (Dashed Border + Gradient),
  Action-Pills "Karteikarten" / "Quiz".

## Design-Treue

Die Werte aus dem Handoff sind 1:1 in `Theme.swift` übernommen:

- **Farb-Token** (Dark + Light): bg, surface, card, cardBorder, pillBg, text,
  textSub, textMuted, accent (#4A7CFF dark / #3A6EFF light), accentSecondary
  (#7C6EFA), accentSub, divider, navBg.
- **Subject-Akzentfarben** (Math, Statistik, Recht, Marketing, BWL, Macro).
- **Status-Farben** (success #34C7A0, danger #FF6B6B, warning #FFB347, purple #7C6EFA).
- **Layout**: 20pt Screen-Padding, 16/20pt Card-Corner, 64pt Tab-Bar-Höhe,
  720pt readable max width fürs iPad.
- **Typografie**: DM Sans/DM Mono nicht gebündelt – Fallback auf das System
  (System für Sans, `.monospaced` Design für Zeiten/Countdowns). Wer DM Sans
  pixelgenau will, fügt die `.ttf`-Dateien zu Assets hinzu und tauscht in
  `Theme.swift` `.system(size:weight:)` gegen `.custom("DMSans-…")`.

## Features im Detail

- **Splash → Tab-App**: `RootView` blendet 1.8 s lang die Splash-View ein, dann
  Fade-out zur `MainTabsView` mit Pill-Tab-Bar.
- **Dark / Light Toggle**: `ThemeManager` (ObservableObject) speichert die Wahl
  in `UserDefaults` ("justdo_theme"), `preferredColorScheme` wird in
  `Just_DOApp` gesetzt; Toggle im Dashboard-Header (Sonne/Mond).
- **Persistenz**: `StudyStore` lädt/speichert den Tagesplan als JSON im
  Documents-Verzeichnis (`plan.json`). Subjects + Exams sind Seed-Daten
  (Konstanten) – wie im Prototyp gemockt.
- **Offline-Banner**: `NetworkMonitor` (NWPathMonitor) liefert weiterhin den
  Offline-Hinweis am oberen Rand.
- **44pt-Tap-Targets**: `DoneCheckbox` ist als 44×44pt Button gebaut (visuell
  26pt). Tab-Bar-Buttons haben min 44pt Höhe.
- **iPad**: `readableWidth()` (max 720pt) hält Inhalte mittig; die Tab-Bar
  läuft auch auf dem iPad als Single-Screen-Layout (kein Split-View, weil das
  Design mobile-first konzipiert ist).
- **AI-Coach**: lokales Mock-Reply (kein Live-API-Call); die Stelle für eine
  echte Anbindung steht in `CoachView.send`.

## Projektstruktur

```
Just-DO.xcodeproj
Just-DO/
  Just_DOApp.swift             – App-Einstieg + Environment (Store, Theme, Network)
  RootView.swift               – Splash, MainTabsView, TabBar, OfflineBanner
  Theme.swift                  – ThemePalette (dark/light), Tokens, ThemeManager
  NetworkMonitor.swift         – NWPathMonitor (unverändert)
  Info.plist                   – iPhone Portrait+Landscape, iPad alle 4 Orientierungen
  Models/
    TaskItem.swift             – PlanTask + PlanTaskType (Lernen/Üben/Wiederholung/Pause/Fokus)
    TaskList.swift             – Subject + Exam (Seed-Daten)
    TaskStore.swift            – StudyStore (Tagesplan-CRUD + JSON-Persistenz)
  Views/
    SidebarView.swift          – DashboardView (Home-Tab)
    TaskListView.swift         – KurseView + SubjectCard
    TaskDetailView.swift       – SubjectDetailView (Sheet)
    TaskRow.swift              – PlanerView + TimelineRow
    AddTaskSheet.swift         – CoachView + ChatBubble + TypingDots
    EmptyStateView.swift       – ProgressRing, StatPill, SectionHeader, TypeBadge,
                                 DoneCheckbox, EmptyStateView, AppMark
  Assets.xcassets              – AppIcon, AccentColor
```

> Die Datei-Namen wurden vom alten Todo-App-Stand übernommen, damit das
> bestehende `project.pbxproj` ohne Schema-Änderung weiter baut. Die Inhalte
> sind komplett neu und tragen die Verantwortlichkeiten oben in der Tabelle.
> Legacy-Aliase (`typealias TaskList = Subject` etc.) bleiben am Ende der
> Dateien, falls externe Skripte sie referenzieren.

## Build & Run

1. `open Just-DO.xcodeproj`
2. Schema "Just-DO" wählen.
3. Run-Ziel "iPhone 13 Pro Max" oder "iPad Pro 13-inch (M4)".
4. ⌘R.

Mindest-Deployment-Target: iOS 17.0. Swift 5, SwiftUI.

## Was bewusst noch nicht drin ist

Der Handoff dokumentiert deutlich mehr Funktionalität als in einer ersten
Iteration sinnvoll umzusetzen wäre. Folgendes ist gemockt oder absichtlich
ausgespart und sollte in späteren Iterationen native Pendants bekommen:

- **Auth-Screen / Onboarding-Wizard / Notification-Modal** – Prototyp-Screens
  aus `auth-screen.jsx`, `onboarding-screen.jsx`, `exams-notifications.jsx`
  sind nicht abgebildet. Die App startet direkt im Dashboard mit Mock-User
  "Max".
- **Materialien-Upload** – Material-Liste ist statisch; "Material hinzufügen"
  noch ohne `UIDocumentPicker`-Anbindung.
- **Karteikarten / Quiz** – Mode-Auswahl + 3D-Flip (`flashcards-screen.jsx`)
  fehlt. Als Stub gibt es die Action-Pills im SubjectDetail.
- **Echter AI-Call** – `CoachView.send` liefert lokale Mock-Antworten. Für
  Production: Backend-Call (z. B. Claude API) statt `mockReply(for:)`.
- **Swipe-to-Delete** mit iOS-Snap-Animation – im Prototyp custom; in SwiftUI
  würde man dafür `List` + `swipeActions` nutzen. Aktuell genügt ein
  `contextMenu`-Eintrag pro Zeile.
- **Cloud-Sync (Firestore/Supabase)** – nur lokale JSON-Persistenz.
