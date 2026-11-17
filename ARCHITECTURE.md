# Martial Repertoire App – Architektur & Dokumentation

## 1. Ziel & Zweck der App
Die App ist eine webbasierte Progressive Web App (PWA) zur Unterstützung von Training und Lernen im Bereich Martial Arts (Taekwondo & Wing Chun).

### Hauptfunktionen
- Anzeige von Techniken, Begriffen und Übungen
- Popup mit Detailinformationen
- Audio-Unterstützung (MP3)
- Trainings-Timer
- Quiz-System

## 2. Architekturprinzipien
- Trennung von HTML/CSS/JS
- Keine Frameworks
- PWA-fähig
- Modular & erweiterbar

## 3. Ordnerstruktur
/
├── index.html
├── style.css
├── app.js
├── data.js
├── quiz.js
├── manifest.json
├── sw.js
├── /audio
├── /pics

## 4. Popup-System
- Bild (glossImg)
- Audio (glossAudioWrap)
- Accordion Sections

## 5. Audio-Konzept
termAudioUrl(term) → ./audio/<slug>.mp3

## 6. NEXT LEVEL
### Komponenten
- Popup, Timer, Quiz
- Audio Engine, Timer Engine, Quiz Engine

### Datenfluss
User → openGlossary → data → UI → Audio

## 7. Regeln
- IDs nicht ändern
- Struktur nicht umbauen
- nur punktuelle Änderungen

## 8. Fazit
Single Source of Truth für KI Änderungen (Struktur, nichts kaputt machen, stabil erweitern)

## 9. Menüband / Navigation
- Eine Liste (`.navRail`) mit sechs Einträgen, zwei Darstellungen:
  - ≥ 901 px: linke, sticky Rail unter der AppBar (Icon + Label + Kurzhinweis).
  - ≤ 900 px: fixierte Bottom-Tab-Bar (Icon + Label, Safe-Area-Padding).
- IDs `#navTKD` … `#navQUIZ` liegen ausschließlich in der Rail (keine Dubletten).
- Das Aufklapp-Menü (`#navMenuPanel`) bleibt dauerhaft verfügbar und nutzt `data-menu-view`.
- Synchronisation: `setNavActive()` setzt `.active`, `aria-current="page"` (Rail) und
  `aria-selected` (Panel). `updateNavCurrentLabel()` pflegt `#navCurrentLabel`.
- `showView()` setzt `data-theme` (`tkd` | `wc` | `neutral`) und scrollt nach oben.
- Keine Navigationseinstellungen im `localStorage`; Swipe und Tastatur bleiben unverändert.

## 10. Krafttraining-Gruppierung
- `OTHER_KRAFT` in `data.js` trägt pro Übung ein optionales Feld `g` (Körperbereich).
- `otherRenderList()` zeigt beim Gruppenwechsel eine Zwischenüberschrift (`.listGroupTitle`).
- Der Auswahlstatus bleibt eine flache Map (`state.other.kraft`) mit dem Übungsnamen als Schlüssel.
- Umbenennung „Klimmzüge (optional)“ → „Klimmzüge“ wird in `safeLoad()` migriert.

