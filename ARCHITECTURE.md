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