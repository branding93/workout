# Änderungen am Menüband

Dieses Dokument beschreibt **ausschließlich** die Navigation („Menüband") – also alles, was zwischen
AppBar und Inhalt liegt bzw. das Aufklapp-Menü in der AppBar. Alle anderen Bereiche (Views, Karten,
Timer, Quiz, Glossar) sind hier bewusst nicht beschrieben.

---

## 1. Vorher

- Ein einziger Navigationsmechanismus: ein Button **„☰ Menü"** in der AppBar.
- Der Button zeigte rechts das aktuelle Label (`#navCurrentLabel`, z. B. „TKD") und öffnete ein
  Dropdown (`#navMenuPanel`) mit 6 Einträgen (`#navTKD`, `#navWC`, `#navOTHER`, `#navTRAIN`,
  `#navTIMER`, `#navQUIZ`).
- Auf jeder Seite musste das Menü erst geöffnet werden; die Navigation war auf Mobile und Desktop
  identisch und relativ klein.

## 2. Neu: ein Menüband, zwei Darstellungen

Die sechs Navigationspunkte existieren jetzt als **eine** Liste (`.navRail`) und werden je nach
Viewport unterschiedlich dargestellt:

| Viewport | Darstellung | Position |
|---|---|---|
| ≥ 901 px | linke **Rail** mit Icon + Label + Kurzhinweis | unter der AppBar, sticky, volle Höhe |
| ≤ 900 px | **Bottom-Tab-Bar** mit Icon + Label | fixiert am unteren Rand, 6 Spalten |

Eigenschaften:

- **Keine doppelten IDs:** Die Rail-Buttons behalten ihre bestehenden IDs (`#navTKD` … `#navQUIZ`).
  Das Aufklapp-Menü nutzt stattdessen `data-menu-view` – dadurch bleibt die ID-Struktur eindeutig.
- **Icons:** Inline-SVG (Schild/Wellen/Hantel/Clipboard/Stoppuhr/Fragezeichen), `aria-hidden="true"`.
  Die Emojis im Inhalt bleiben unverändert.
- **Kurzhinweise:** `.menuHint` („Planung", „Übersicht", „Intervall", „10 Fragen") stehen in der Rail
  rechts, auf Mobile werden sie ausgeblendet (Platz).
- **Aktiver Zustand:** `.active` + `aria-current="page"`; in der Rail zusätzlich ein Akzentbalken
  (`inset 3px 0 0 var(--accent)`), im Bottom-Bar (`inset 0 2px 0 var(--accent)`).
- **Akzentfarbe folgt der Disziplin:** Petrol bei TKD, Amber bei Wing Chun, neutrales Tiefteal bei
  Training/Timer/Quiz (`#appRoot[data-theme]`).
- **Scrollverhalten:** Der aktive Zustand wird ohne Scrollen gesetzt; die Rail selbst scrollt nur,
  wenn die Höhe nicht reicht (`overflow-y: auto`).
- **Touch-Ziele:** Rail-Einträge ≥ 44 px hoch, Bottom-Bar-Einträge ~51 px, Menüband-Abstände mit
  `env(safe-area-inset-bottom)` für Geräte mit Home-Indicator.

## 3. Das Aufklapp-Menü existiert weiterhin

Das gewohnte „☰ Menü"-Dropdown ist **wieder da** und bleibt dauerhaft verfügbar – auf Desktop
zusätzlich zur Rail, auf Mobile zusätzlich zur Bottom-Bar.

- Button: `#navMenuBtn` mit `aria-haspopup="true"` und `aria-expanded`
- Aktuelles Label: `#navCurrentLabel` (wird bei jedem Viewwechsel über `updateNavCurrentLabel()`
  aktualisiert)
- Panel: `#navMenuPanel` mit `role="menu"`, Einträge mit `role="menuitemradio"` und `aria-selected`
- Position: rechts unter dem Button (Desktop), linksbündig unter dem Button auf ≤ 760 px
- Öffnen/Schließen: Klick auf den Button, Klick außerhalb, `Esc`
- Eintrag wählen → gleicher Viewwechsel wie Rail/Bottom-Bar, Panel schließt automatisch
- Das Menü und das Menüband bleiben synchron: `setNavActive()` markiert beide Stellen
  (`.active`, `aria-current`, `aria-selected`)

Der Text des Buttons ist unverändert „☰ Menü" + aktuelles Label; die sechs Einträge tragen
unverändert ihre Labels und Kurzhinweise.

## 4. Was unverändert bleibt

- Alle IDs, ARIA-Rollen, Labels, Kurzhinweise und Reihenfolge der sechs Seiten.
- Die Handler: `showView()`, `navGo()`, `setNavActive()`, `updateNavCurrentLabel()`,
  `initNavMenu()`, `setMenuOpen()` – nur additiv erweitert.
- Swipe-Navigation (Touch/Trackpad) und Tastaturbedienung.
- `localStorage`-Keys – die Navigation speichert weiterhin nichts.

## 5. Betroffene Dateien

- `index.html` – AppBar-Actions (`.menuWrap` mit Button + Panel), `<nav class="navRail">`
- `style.css` – Abschnitte „4. Navigation" und „4b. Aufklappbares Menü (Menüband)" sowie die
  Breakpoints 1240 / 1023 / 900 / 760 / 560
- `app.js` – `initNavMenu()` (Klick-Handler der Panel-Einträge), `setNavActive()` (Synchronisation
  Menüband ↔ Panel), `showView()` (`data-theme`, Scroll nach oben)

## 6. Prüfliste

1. Desktop ≥ 901 px: Rail links sichtbar, korrekter Eintrag aktiv, Akzentfarbe passt zur Disziplin.
2. ≤ 900 px: Bottom-Bar fixiert, kein Eintrag verdeckt Inhalt (Content hat 96 px Bottom-Padding).
3. „☰ Menü" öffnet das Panel, Label zeigt den aktuellen View, `Esc` und Klick außerhalb schließen.
4. Eintrag im Panel → View wechselt, Panel schließt, Rail/Bottom-Bar und Panel sind gleich markiert.
5. Kein horizontaler Overflow bei 360 / 560 / 900 / 1024 / 1440 px.
6. Textbestand: alle ursprünglichen Navigationslabels vorhanden (durch Rail **und** Panel mehrfach).
