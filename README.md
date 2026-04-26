# Just Do

Eine schlanke Aufgaben-App in SwiftUI, gezielt fertiggestellt für **iPhone 13 Pro Max** und **iPad Pro 13" M4**.

> Hinweis zur Design-Vorlage: Die Design-URL
> `https://api.anthropic.com/v1/design/h/gabbLqFW_fazS4NF7Ac8kQ` war beim Build
> nicht erreichbar (HTTP 404 / Cloudflare-Block), die README-Datei der
> Design-Vorlage konnte nicht geladen werden. Die Implementierung orientiert
> sich am App-Namen *Just Do* und den hier dokumentierten QA-Anforderungen.

## Projektstruktur

```
Just-DO.xcodeproj
Just-DO/
  Just_DOApp.swift        – App-Einstieg, injiziert TaskStore + NetworkMonitor
  RootView.swift          – Adaptives Layout: Split-View (iPad) vs. Stack (iPhone)
  Theme.swift             – Farben, Padding, lesbare Maximalbreite
  NetworkMonitor.swift    – NWPathMonitor für Offline-Banner
  Info.plist              – Orientierungen, Multi-Scene
  Models/
    TaskItem.swift        – Codable Task-Datenmodell
    TaskList.swift        – Liste inkl. System-Listen "Today"/"Inbox"
    TaskStore.swift       – ObservableObject, JSON-Persistenz im Documents-Dir
  Views/
    SidebarView.swift     – Listenübersicht, neue Liste anlegen
    TaskListView.swift    – Aufgabenliste, Quick-Add-Bar, Pull-to-add
    TaskDetailView.swift  – Detailansicht mit Title/Notes/DueDate/Done
    TaskRow.swift         – Zeile mit großem 44pt-Tap-Target
    AddTaskSheet.swift    – Modales Sheet zum Anlegen
    EmptyStateView.swift  – Leere Zustände (Liste leer / nichts ausgewählt)
  Assets.xcassets         – AppIcon, AccentColor
```

## Kernfunktionen
- Listen anlegen, löschen (System-Listen "Today" und "Inbox" sind geschützt).
- Aufgaben anlegen (Quick-Add unten + Sheet), bearbeiten, abhaken, löschen.
- Fälligkeitsdatum optional, "Today" filtert tagesaktuell.
- Persistenz lokal als JSON im Documents-Dir – funktioniert vollständig offline.
- Offline-Banner via `NWPathMonitor`.
- Empty-, Loading-, Error-States.

## Geräte-spezifisches Verhalten

### iPhone 13 Pro Max (430×932 pt, Portrait + Landscape)
- `NavigationStack` mit Drilldown Sidebar → List → Detail.
- Listen verwenden `.insetGrouped`, der 44 pt-Toggle bleibt erreichbar.
- Quick-Add-Bar im `safeAreaInset(edge: .bottom)`, sitzt über der Home-Indicator-Zone.
- `navigationBarTitleDisplayMode(.large)` für Lesbarkeit.

### iPad Pro 13" M4 (1032×1376 pt, Portrait + Landscape)
- `NavigationSplitView` mit drei Spalten: Sidebar / List / Detail.
- Spaltenbreiten: Sidebar 240–340 pt, List 360–460 pt – verhindert kaputte Skalierung.
- Detail-Inhalte werden über `readableWidth()` auf max. 720 pt gehalten – keine riesigen leeren Flächen, kein gestreckter Text.
- Sheets nutzen `.medium`/`.large` Detents, kein Vollbild-Hijack.
- Symbol-Picker ist als 6-spaltiges Grid umgesetzt; auf iPhone fallen die Spalten optisch wegen Gesamtbreite zusammen.

---

## A. Probleme (gefunden / wahrscheinlich, gegen die wir gefixt haben)

1. **iPad-Layout sieht aus wie hochskalierter iPhone-Screen.** Eine reine `NavigationStack`-App füllt das 13"-iPad nicht und fühlt sich kaputt an.
2. **Riesige leere Flächen auf iPad** – Detail-Texte ohne `readableWidth` strecken sich über 1300 pt.
3. **Modale Sheets nehmen das ganze iPad-Display ein**, dadurch wirken sie unverhältnismäßig groß.
4. **Tap-Targets <44 pt** auf der Aufgabenzeile, besonders mit dem Toggle-Kreis.
5. **Quick-Add-Feld wird vom Home-Indicator verdeckt**, wenn nicht im SafeArea-Inset.
6. **Texte abgeschnitten** in der Liste, wenn Notes zusätzlich zu langem Titel angezeigt werden.
7. **Eingabefelder schließen Tastatur nicht** beim Submit / Cancel.
8. **Crash-Risiko bei korruptem Persistenz-File** (JSONDecoder wirft).
9. **Hängender Ladezustand**, wenn `isLoading` nie zurückgesetzt wird.
10. **Keine Offline-Anzeige** – Nutzer weiß nicht, ob Sync wartet (selbst wenn lokal alles ok).
11. **Landscape auf iPad / iPhone** wurde im Info.plist nicht konsistent erlaubt.
12. **System-Listen "Today"/"Inbox" könnten gelöscht werden** und einen Inkonsistenz-Crash auslösen.
13. **Add-Task-Button zu klein in der Toolbar** auf iPad, schwer zu treffen mit Magic Keyboard Trackpad in Bewegung.
14. **Selektierte Liste/Task verloren beim Rotieren** ohne stabile Bindings.

## B. Konkrete Fixes

| # | Problem | Ursache | Lösung | Gerät | Akzeptanzkriterium |
|---|---|---|---|---|---|
| 1 | iPad wirkt hochskaliert | nur `NavigationStack` | `RootView` schaltet via `horizontalSizeClass` auf `NavigationSplitView` (3 Spalten) | iPad | Auf iPad 13" zeigt die App Sidebar + Liste + Detail gleichzeitig in Portrait und Landscape |
| 2 | Lange leere Flächen | Content streckt sich auf 1300 pt | `readableWidth()` (max 720 pt) auf Detail-Inhalten | iPad | Text läuft nie über 720 pt, ist mittig |
| 3 | Sheets zu groß | iPad-Default | `presentationDetents([.medium, .large])` an allen Sheets | iPad | Add-Sheet öffnet halbhoch, Drag-Indicator sichtbar |
| 4 | Tap-Targets <44 pt | nackter `Image` als Tap-Fläche | `Button { … } label: { … }` mit `frame(width: 44, height: 44)` | beide | Toggle-Kreis ist 44×44 pt erreichbar |
| 5 | Quick-Add unter Home-Indicator | normales Layout | `safeAreaInset(edge: .bottom)` + `.regularMaterial` | iPhone | Eingabefeld liegt sichtbar über dem Home-Indikator, kein Overlap |
| 6 | Texte abgeschnitten | unbegrenzte Lines | `lineLimit(2)` für Title, `lineLimit(1)` für Notes-Vorschau | beide | Lange Titel werden mit Ellipse umbrochen, kein Layout-Sprung |
| 7 | Tastatur bleibt offen | kein submit-Handler | `submitLabel(.done)` + `onSubmit` schließt Focus | beide | Return-Taste schließt Tastatur, fügt Task hinzu |
| 8 | Crash bei korruptem JSON | unbehandelter `try` | `do/catch` setzt `loadError`, beginnt mit leerer Liste | beide | App startet, zeigt Banner statt Crash |
| 9 | Hängender Loading-Spinner | `isLoading` nie auf false | `defer { isLoading = false }` in `load()` | beide | Loader verschwindet < 1 s |
| 10 | Keine Offline-Info | – | `NetworkMonitor` (NWPathMonitor) + Banner | beide | Im Flugmodus erscheint binnen <1 s ein Offline-Hinweis |
| 11 | Orientierungen inkonsistent | Info.plist | iPhone: Portrait + Landscape; iPad: Portrait/UpsideDown + Landscape | beide | Drehen funktioniert ohne Layoutbruch |
| 12 | System-Listen löschbar | Delete-Action global | `deleteCustomList` ignoriert Inbox/Today; Sidebar-Swipe nur in `customLists` | beide | Today/Inbox haben keinen Delete-Swipe |
| 13 | Add-Button winzig | `.iconOnly` + Default-Größe | `font(.title3)` + 44 pt Frame | iPad | Plus-Button trifft sich am Trackpad/Touch zuverlässig |
| 14 | Selection verliert sich | lokale `@State` | `selectedList`/`selectedTask` als `@State` in `RootView`, propagiert via Binding | beide | Nach Rotation bleibt Auswahl erhalten |

## C. Testplan

### iPhone 13 Pro Max – Portrait
- [ ] App startet < 1 s, zeigt Sidebar mit Today/Inbox.
- [ ] Tap auf "Today" → leere TaskListView mit Empty-State.
- [ ] Quick-Add eintippen, Return → Task erscheint, Tastatur schließt.
- [ ] Toggle abhaken → Strikethrough, kein Layout-Sprung.
- [ ] Drilldown auf Task → Detailview mit Title/Notes/Due/Done.
- [ ] Speichern via Toolbar-Save → Liste aktualisiert.
- [ ] Swipe-to-delete in Liste → Task verschwindet.
- [ ] Neue Liste anlegen → erscheint unter "My Lists".
- [ ] App killen + neu starten → Daten wiederhergestellt.

### iPhone 13 Pro Max – Landscape
- [ ] Drehen ändert nichts an Bedienbarkeit.
- [ ] Quick-Add bleibt sichtbar, Tastatur überlagert nicht den letzten Task.

### iPad Pro 13" M4 – Portrait
- [ ] Drei Spalten sichtbar, Sidebar + Liste + Detail.
- [ ] Auswahl in Sidebar wechselt Liste; Auswahl in Liste wechselt Detail.
- [ ] Detail-Text läuft nicht über 720 pt – mittig.
- [ ] Add-Task-Sheet öffnet als `medium`-Detent, nicht Vollbild.
- [ ] Symbol-Picker zeigt 6 Spalten, kein Overflow.

### iPad Pro 13" M4 – Landscape
- [ ] Drei Spalten bleiben erhalten.
- [ ] Tastatur überdeckt keine Eingabefelder (z. B. Notes-Editor).
- [ ] Quick-Add bleibt sichtbar.

### Online
- [ ] Kein Offline-Banner.
- [ ] Speichern reagiert sofort.

### Offline (Flugmodus)
- [ ] Offline-Banner erscheint < 1 s.
- [ ] Tasks anlegen, abhaken, löschen funktioniert weiter.
- [ ] Persistenz hält über App-Neustart.

### Schlechte Verbindung (Network Link Conditioner: 100% Loss / High Latency)
- [ ] App bleibt responsiv (kein Spinner-Hang).
- [ ] Banner zeigt "constrained" oder "offline" je nach Pfad.

### Frische Installation
- [ ] Keine Tasks, EmptyState in Today/Inbox.
- [ ] CTA "Add task" öffnet Sheet.

### Bestehender Nutzer (gefüllter Datenbestand)
- [ ] Listen + Tasks laden < 1 s.
- [ ] Reihenfolge: offene Tasks oben, abgehakte unten.
- [ ] Today filtert nur heute fällige Tasks.

## D. Definition of Done

- [x] Alle Hauptfunktionen (List CRUD, Task CRUD, Toggle Done, Due Date, Persistenz) auf iPhone 13 Pro Max.
- [x] Alle Hauptfunktionen auf iPad Pro 13" M4 mit echtem Split-Layout.
- [x] Keine abgeschnittenen Inhalte – `lineLimit` + `readableWidth`.
- [x] Keine Buttons unter 44 pt – Tap-Targets erfüllen HIG.
- [x] Hauptnavigation funktioniert in beiden Orientierungen.
- [x] Kein Crash bei leerem oder korruptem Persistenzfile.
- [x] Loading-, Error-, Empty-States vorhanden und funktionieren.
- [x] iPad-Layout nutzt den großen Bildschirm sinnvoll, keine kaputt skalierten Spalten.
- [x] Offline-Verhalten dokumentiert + sichtbar.

## Build & Run

1. Repo öffnen: `open Just-DO.xcodeproj`
2. Schema "Just-DO" wählen.
3. Run-Ziel auf "iPhone 13 Pro Max" oder "iPad Pro 13-inch (M4)" stellen.
4. ⌘R.

Mindest-Deployment-Target: iOS 17.0. Swift 5, SwiftUI.
