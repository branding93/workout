/* quiz.js – Lesbar strukturierte Quiz-Bibliothek

Enthält:
- 200 Fragen Taekwondo (100 mcq + 100 cloze)
- 200 Fragen Wing Chun (100 mcq + 100 cloze)

Regeln:
- Jede Frage ist einzigartig (kein doppelter Fragetext).
- Jede Frage hat 4 eindeutige Antwortoptionen.
- Die richtige Antwort ist NICHT immer A; die Optionen wurden pro Frage deterministisch gemischt.

Export für die App:
  window.QUIZ_BANKS = { tkd: TKD_QUESTIONS, wc: WC_QUESTIONS }
*/

(function(){
  'use strict';

  // =========================
  // TKD – Taekwondo (200)
  // =========================
  const TKD_QUESTIONS = [
  {
    "type": "mcq",
    "q": "TKD: Welche Technik ist ein Kick (Tritt) – Beispieltyp?",
    "options": [
      "Ap Chagui",
      "Mittleren Block",
      "Unteren Block",
      "Oberen Block"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Technik ist ein Block?",
    "options": [
      "Naeryo Chagui",
      "Unteren Block",
      "Ap Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Option ist eine Stellung (Stand)?",
    "options": [
      "Vorwärts-Stellung (jeongul seogi)",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Kombination entspricht den fünf Tenets?",
    "options": [
      "Respekt · Kraft · Schnelligkeit · Sieg · Ehre",
      "Balance · Timing · Distanz · Reaktion · Härte",
      "Mut · Technik · Ausdauer · Tradition · Ruhm",
      "Courtesy · Integrity · Perseverance · Self-Control · Indomitable Spirit"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Welcher Begriff gehört zu den fünf Tenets?",
    "options": [
      "Flexibilität",
      "Kata",
      "Reichweite",
      "Courtesy"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Kammer (Knie hoch)“?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Recoil (Zurückziehen)“?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Timing“?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Distanz“?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Deckung“?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Schutzposition der Hände/Arme",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Balance“?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Stabilität auf dem Standbein",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Hüftrotation“?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Drehung der Hüfte zur Kraftübertragung",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Präzision“?",
    "options": [
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Beschreibung passt am besten zu „Kontrolle“?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Sicher und dosiert – Partner/Sicherheit beachten"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Chon-Ji Hyong“ (laut App)?",
    "options": [
      "Gelb",
      "Weiß",
      "Grün",
      "Blau"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Chon-Ji Hyong“ (laut App)?",
    "options": [
      "19",
      "21",
      "28",
      "23"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Tan-Gun Hyong“ (laut App)?",
    "options": [
      "Grün",
      "Weiß",
      "Gelb",
      "Blau"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Tan-Gun Hyong“ (laut App)?",
    "options": [
      "21",
      "28",
      "19",
      "23"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „To-San Hyong“ (laut App)?",
    "options": [
      "Gelb",
      "Grün",
      "Weiß",
      "Blau"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „To-San Hyong“ (laut App)?",
    "options": [
      "21",
      "23",
      "28",
      "19"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Won-Hyo Hyong“ (laut App)?",
    "options": [
      "Gelb",
      "Weiß",
      "Blau",
      "Grün"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Won-Hyo Hyong“ (laut App)?",
    "options": [
      "21",
      "28",
      "19",
      "23"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Yul-Gok Hyong“ (laut App)?",
    "options": [
      "Weiß",
      "Blau",
      "Gelb",
      "Grün"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Yul-Gok Hyong“ (laut App)?",
    "options": [
      "23",
      "38",
      "19",
      "21"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Chung-Gun Hyong“ (laut App)?",
    "options": [
      "Gelb",
      "Weiß",
      "Blau",
      "Grün"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Chung-Gun Hyong“ (laut App)?",
    "options": [
      "23",
      "21",
      "19",
      "32"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Toi-Gye Hyong“ (laut App)?",
    "options": [
      "Weiß",
      "Gelb",
      "Blau",
      "Grün"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Toi-Gye Hyong“ (laut App)?",
    "options": [
      "21",
      "37",
      "19",
      "23"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Hwa-Rang Hyong“ (laut App)?",
    "options": [
      "Rot",
      "Grün",
      "Weiß",
      "Gelb"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Hwa-Rang Hyong“ (laut App)?",
    "options": [
      "23",
      "19",
      "21",
      "29"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Chung-Mu Hyong“ (laut App)?",
    "options": [
      "Grün",
      "Weiß",
      "Gelb",
      "Rot"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Chung-Mu Hyong“ (laut App)?",
    "options": [
      "23",
      "30",
      "21",
      "19"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Zu welcher Gürtelstufe gehört „Gwang-Gae Hyong“ (laut App)?",
    "options": [
      "Weiß",
      "Schwarz",
      "Gelb",
      "Grün"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Wie viele Bewegungen hat „Gwang-Gae Hyong“ (laut App)?",
    "options": [
      "21",
      "39",
      "19",
      "23"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD: Welche Option ist ein Beispiel für eine Kombination (Kombi)?",
    "options": [
      "Kombination 1-8",
      "Kombination 1-14",
      "Übung 1-8",
      "4 Kicks + 6 Kicks + 6 Kicks mit Sprung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD: Was bedeutet „Ilbo“ im Einschrittkampf?",
    "options": [
      "Freikampf",
      "3 Schritte",
      "2 Schritte",
      "1 Schritt"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Was bedeutet „Ibo“ im Einschrittkampf?",
    "options": [
      "1 Schritt",
      "3 Schritte",
      "Freikampf",
      "2 Schritte"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD: Was bedeutet „Sambo“ im Einschrittkampf?",
    "options": [
      "Freikampf",
      "3 Schritte",
      "2 Schritte",
      "1 Schritt"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 1: Welche Aussage beschreibt „Recoil (Zurückziehen)“ am besten?",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 2: Welche Aussage beschreibt „Timing“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 3: Welche Aussage beschreibt „Distanz“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Abstand so wählen, dass Technik sauber trifft",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 4: Welche Aussage beschreibt „Deckung“ am besten?",
    "options": [
      "Schutzposition der Hände/Arme",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 5: Welche Aussage beschreibt „Balance“ am besten?",
    "options": [
      "Stabilität auf dem Standbein",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 6: Welche Aussage beschreibt „Hüftrotation“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Drehung der Hüfte zur Kraftübertragung",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 7: Welche Aussage beschreibt „Präzision“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 8: Welche Aussage beschreibt „Kontrolle“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Sicher und dosiert – Partner/Sicherheit beachten"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 9: Welche Aussage beschreibt „Kammer (Knie hoch)“ am besten?",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 10: Welche Aussage beschreibt „Recoil (Zurückziehen)“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 11: Welche Aussage beschreibt „Timing“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 12: Welche Aussage beschreibt „Distanz“ am besten?",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 13: Welche Aussage beschreibt „Deckung“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Schutzposition der Hände/Arme",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 14: Welche Aussage beschreibt „Balance“ am besten?",
    "options": [
      "Stabilität auf dem Standbein",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 15: Welche Aussage beschreibt „Hüftrotation“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Drehung der Hüfte zur Kraftübertragung",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 16: Welche Aussage beschreibt „Präzision“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 17: Welche Aussage beschreibt „Kontrolle“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Sicher und dosiert – Partner/Sicherheit beachten"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 18: Welche Aussage beschreibt „Kammer (Knie hoch)“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Abstand so wählen, dass Technik sauber trifft",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 19: Welche Aussage beschreibt „Recoil (Zurückziehen)“ am besten?",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 20: Welche Aussage beschreibt „Timing“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 21: Welche Aussage beschreibt „Distanz“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 22: Welche Aussage beschreibt „Deckung“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Schutzposition der Hände/Arme"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 23: Welche Aussage beschreibt „Balance“ am besten?",
    "options": [
      "Stabilität auf dem Standbein",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 24: Welche Aussage beschreibt „Hüftrotation“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Drehung der Hüfte zur Kraftübertragung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 25: Welche Aussage beschreibt „Präzision“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 26: Welche Aussage beschreibt „Kontrolle“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Sicher und dosiert – Partner/Sicherheit beachten",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 27: Welche Aussage beschreibt „Kammer (Knie hoch)“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 28: Welche Aussage beschreibt „Recoil (Zurückziehen)“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 29: Welche Aussage beschreibt „Timing“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 30: Welche Aussage beschreibt „Distanz“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 31: Welche Aussage beschreibt „Deckung“ am besten?",
    "options": [
      "Schutzposition der Hände/Arme",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 32: Welche Aussage beschreibt „Balance“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Stabilität auf dem Standbein"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 33: Welche Aussage beschreibt „Hüftrotation“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Drehung der Hüfte zur Kraftübertragung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 34: Welche Aussage beschreibt „Präzision“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 35: Welche Aussage beschreibt „Kontrolle“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Sicher und dosiert – Partner/Sicherheit beachten"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 36: Welche Aussage beschreibt „Kammer (Knie hoch)“ am besten?",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 37: Welche Aussage beschreibt „Recoil (Zurückziehen)“ am besten?",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 38: Welche Aussage beschreibt „Timing“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 39: Welche Aussage beschreibt „Distanz“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 40: Welche Aussage beschreibt „Deckung“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Schutzposition der Hände/Arme",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 41: Welche Aussage beschreibt „Balance“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Stabilität auf dem Standbein",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 42: Welche Aussage beschreibt „Hüftrotation“ am besten?",
    "options": [
      "Drehung der Hüfte zur Kraftübertragung",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 43: Welche Aussage beschreibt „Präzision“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 44: Welche Aussage beschreibt „Kontrolle“ am besten?",
    "options": [
      "Sicher und dosiert – Partner/Sicherheit beachten",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 45: Welche Aussage beschreibt „Kammer (Knie hoch)“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 46: Welche Aussage beschreibt „Recoil (Zurückziehen)“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 47: Welche Aussage beschreibt „Timing“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Abstand so wählen, dass Technik sauber trifft",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 48: Welche Aussage beschreibt „Distanz“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 49: Welche Aussage beschreibt „Deckung“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Schutzposition der Hände/Arme"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 50: Welche Aussage beschreibt „Balance“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Stabilität auf dem Standbein",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 51: Welche Aussage beschreibt „Hüftrotation“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Drehung der Hüfte zur Kraftübertragung",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 52: Welche Aussage beschreibt „Präzision“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 53: Welche Aussage beschreibt „Kontrolle“ am besten?",
    "options": [
      "Sicher und dosiert – Partner/Sicherheit beachten",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 54: Welche Aussage beschreibt „Kammer (Knie hoch)“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 55: Welche Aussage beschreibt „Recoil (Zurückziehen)“ am besten?",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 56: Welche Aussage beschreibt „Timing“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Abstand so wählen, dass Technik sauber trifft",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 57: Welche Aussage beschreibt „Distanz“ am besten?",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 58: Welche Aussage beschreibt „Deckung“ am besten?",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Schutzposition der Hände/Arme",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 59: Welche Aussage beschreibt „Balance“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Stabilität auf dem Standbein",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 60: Welche Aussage beschreibt „Hüftrotation“ am besten?",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Drehung der Hüfte zur Kraftübertragung",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 61: Welche Aussage beschreibt „Präzision“ am besten?",
    "options": [
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr",
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "TKD Technik-Qualität 62: Welche Aussage beschreibt „Kontrolle“ am besten?",
    "options": [
      "Sicher und dosiert – Partner/Sicherheit beachten",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): Der Tritt heißt ____.",
    "options": [
      "Ap Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Yop Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): Ein Block heißt ____.",
    "options": [
      "Sudo Daebi Magki",
      "Mittleren Block",
      "Oberen Block",
      "Unteren Block"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): Eine Stellung heißt ____.",
    "options": [
      "Distanz",
      "Rückwärts-Stellung (hugul seogi)",
      "Timing",
      "Vorwärts-Stellung (jeongul seogi)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): Ein Tenet heißt ____.",
    "options": [
      "Perseverance",
      "Integrity",
      "Self-Control",
      "Courtesy"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Kammer (Knie hoch)“ bedeutet ____.",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Recoil (Zurückziehen)“ bedeutet ____.",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Timing“ bedeutet ____.",
    "options": [
      "Abstand so wählen, dass Technik sauber trifft",
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Distanz“ bedeutet ____.",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Abstand so wählen, dass Technik sauber trifft"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Deckung“ bedeutet ____.",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Schutzposition der Hände/Arme",
      "Knie anheben und Kick vorbereiten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Balance“ bedeutet ____.",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Stabilität auf dem Standbein"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Hüftrotation“ bedeutet ____.",
    "options": [
      "Drehung der Hüfte zur Kraftübertragung",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Knie anheben und Kick vorbereiten",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Präzision“ bedeutet ____.",
    "options": [
      "Knie anheben und Kick vorbereiten",
      "Sauberes Trefferbild (Kontrolle vor Power)",
      "Nach dem Treffer zügig zurück in die Ausgangsposition",
      "Richtiger Moment für Angriff/Abwehr"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Kontrolle“ bedeutet ____.",
    "options": [
      "Richtiger Moment für Angriff/Abwehr",
      "Knie anheben und Kick vorbereiten",
      "Sicher und dosiert – Partner/Sicherheit beachten",
      "Nach dem Treffer zügig zurück in die Ausgangsposition"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Chon-Ji Hyong“ hat ____ Bewegungen.",
    "options": [
      "28",
      "19",
      "21",
      "23"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Tan-Gun Hyong“ hat ____ Bewegungen.",
    "options": [
      "21",
      "28",
      "23",
      "19"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „To-San Hyong“ hat ____ Bewegungen.",
    "options": [
      "28",
      "23",
      "21",
      "19"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Won-Hyo Hyong“ hat ____ Bewegungen.",
    "options": [
      "19",
      "28",
      "23",
      "21"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Yul-Gok Hyong“ hat ____ Bewegungen.",
    "options": [
      "21",
      "23",
      "19",
      "38"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Chung-Gun Hyong“ hat ____ Bewegungen.",
    "options": [
      "32",
      "21",
      "19",
      "23"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Toi-Gye Hyong“ hat ____ Bewegungen.",
    "options": [
      "23",
      "19",
      "21",
      "37"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Hwa-Rang Hyong“ hat ____ Bewegungen.",
    "options": [
      "23",
      "21",
      "29",
      "19"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Chung-Mu Hyong“ hat ____ Bewegungen.",
    "options": [
      "23",
      "21",
      "19",
      "30"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Gwang-Gae Hyong“ hat ____ Bewegungen.",
    "options": [
      "19",
      "21",
      "39",
      "23"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): Ein Beispiel für eine Kombi ist ____.",
    "options": [
      "Kombination 1-8",
      "Übung 1-8",
      "Kombination 1-14",
      "4 Kicks + 6 Kicks + 6 Kicks mit Sprung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD): „Ibo“ steht für ____.",
    "options": [
      "4 Schritte",
      "3 Schritte",
      "2 Schritte",
      "1 Schritt"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 1: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Yop Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 2: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Dollyo Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 3: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Yop Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 4: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Pandae Dollyo Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 5: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Tui Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 6: Ein Kick heißt ____.",
    "options": [
      "Twio Yop Chagui",
      "Ap Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 7: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui",
      "Yop Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 8: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Naeryo Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 9: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 10: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Yop Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 11: Ein Kick heißt ____.",
    "options": [
      "Pandae Dollyo Chagui",
      "Ap Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 12: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Tui Chagui",
      "Ap Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 13: Ein Kick heißt ____.",
    "options": [
      "Twio Yop Chagui",
      "Naeryo Chagui",
      "Ap Chagui",
      "Dollyo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 14: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Yop Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 15: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Dollyo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 16: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 17: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 18: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Pandae Dollyo Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 19: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Tui Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 20: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Twio Yop Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 21: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Yop Chagui",
      "Naeryo Chagui",
      "Ap Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 22: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Dollyo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 23: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 24: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Yop Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 25: Ein Kick heißt ____.",
    "options": [
      "Pandae Dollyo Chagui",
      "Ap Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 26: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Naeryo Chagui",
      "Tui Chagui",
      "Dollyo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 27: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Twio Yop Chagui",
      "Naeryo Chagui",
      "Ap Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 28: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 29: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui",
      "Yop Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 30: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 31: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui",
      "Yop Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 32: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Ap Chagui",
      "Pandae Dollyo Chagui",
      "Naeryo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 33: Ein Kick heißt ____.",
    "options": [
      "Tui Chagui",
      "Naeryo Chagui",
      "Ap Chagui",
      "Dollyo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 34: Ein Kick heißt ____.",
    "options": [
      "Twio Yop Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Ap Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 35: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Yop Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 36: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 37: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Yop Chagui",
      "Ap Chagui",
      "Dollyo Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 38: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 39: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Dollyo Chagui",
      "Pandae Dollyo Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 40: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Tui Chagui",
      "Ap Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 41: Ein Kick heißt ____.",
    "options": [
      "Twio Yop Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 42: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 43: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Yop Chagui",
      "Naeryo Chagui",
      "Ap Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 44: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Dollyo Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 45: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Yop Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 46: Ein Kick heißt ____.",
    "options": [
      "Pandae Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 47: Ein Kick heißt ____.",
    "options": [
      "Tui Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 48: Ein Kick heißt ____.",
    "options": [
      "Twio Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 49: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Yop Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 50: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Dollyo Chagui",
      "Yop Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 51: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Yop Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 52: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Yop Chagui",
      "Ap Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 53: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Pandae Dollyo Chagui",
      "Dollyo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 54: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Tui Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 55: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Twio Yop Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 56: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Dollyo Chagui",
      "Yop Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 57: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 58: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Yop Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 59: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Yop Chagui",
      "Ap Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 60: Ein Kick heißt ____.",
    "options": [
      "Pandae Dollyo Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Ap Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 61: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Tui Chagui",
      "Dollyo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 62: Ein Kick heißt ____.",
    "options": [
      "Twio Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 63: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Ap Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 64: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Ap Chagui",
      "Yop Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 65: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 66: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Dollyo Chagui",
      "Yop Chagui",
      "Naeryo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 67: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Pandae Dollyo Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 68: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Tui Chagui",
      "Dollyo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 69: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Twio Yop Chagui",
      "Naeryo Chagui",
      "Ap Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 70: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Yop Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 71: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Naeryo Chagui",
      "Ap Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 72: Ein Kick heißt ____.",
    "options": [
      "Yop Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Ap Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 73: Ein Kick heißt ____.",
    "options": [
      "Dollyo Chagui",
      "Yop Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 74: Ein Kick heißt ____.",
    "options": [
      "Naeryo Chagui",
      "Pandae Dollyo Chagui",
      "Ap Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (TKD) 75: Ein Kick heißt ____.",
    "options": [
      "Ap Chagui",
      "Tui Chagui",
      "Naeryo Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  }
];

  // =========================
  // WC – Wing Chun (200)
  // =========================
  const WC_QUESTIONS  = [
  {
    "type": "mcq",
    "q": "WC: Was beschreibt „Centerline“ am besten?",
    "options": [
      "Angriff & Schutz entlang der zentralen Linie (kürzester Weg)",
      "Nur Bodenkampf",
      "Nur hohe Kicks",
      "Nur große Kreisbewegungen"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC: Was bedeutet „Economy of Motion“?",
    "options": [
      "Immer zurückweichen",
      "Extra große Ausholbewegungen",
      "So kurz und direkt wie möglich bewegen",
      "Nur mit Kraft arbeiten"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC: Was ist das Hauptziel von Chi Sao?",
    "options": [
      "Kicks auf Distanz üben",
      "Waffenwechsel üben",
      "Sensitivität/Reflexe durch Kontakt entwickeln",
      "Ausdauerlauf trainieren"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC: Welches Element ist ein Kernprinzip im Wing Chun?",
    "options": [
      "Centerline Theory",
      "Aikido-Würfe",
      "Kata (Karate)",
      "Grappling-only"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC: Welche Beschreibung passt am besten zu „Centerline Theory“?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC: Welche Beschreibung passt am besten zu „Economy of Motion“?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC: Welche Beschreibung passt am besten zu „Simultaneous Attack and Defense“?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC: Welche Beschreibung passt am besten zu „Chi Sao“?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC: Welche Beschreibung passt am besten zu „Structure & Balance“?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Stabile Struktur und Balance als Basis",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC: Welche Option ist eine Arm-/Handtechnik (Sao)?",
    "options": [
      "Fook Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC: Welche Option ist eine Beintechnik (Gerk)?",
    "options": [
      "Fook Sao",
      "Jing Gerk",
      "Tan Sao",
      "Pak Sao"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC: Welcher Code gehört zur Form „Siu Nim Tao“?",
    "options": [
      "BT",
      "CK",
      "SNT",
      "Timing"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC: Welche Form hat den Code „SNT“?",
    "options": [
      "Chum Kiu",
      "Siu Nim Tao",
      "Timing",
      "Biu Tze"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC: Welcher Code gehört zur Form „Chum Kiu“?",
    "options": [
      "BT",
      "Timing",
      "CK",
      "SNT"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC: Welche Form hat den Code „CK“?",
    "options": [
      "Biu Tze",
      "Timing",
      "Chum Kiu",
      "Siu Nim Tao"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC: Welcher Code gehört zur Form „Biu Tze“?",
    "options": [
      "BT",
      "SNT",
      "CK",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC: Welche Form hat den Code „BT“?",
    "options": [
      "Chum Kiu",
      "Timing",
      "Biu Tze",
      "Siu Nim Tao"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 1: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 2: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 3: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 4: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Stabile Struktur und Balance als Basis",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 5: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 6: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 7: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 8: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 9: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Stabile Struktur und Balance als Basis",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 10: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 11: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 12: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 13: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 14: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Stabile Struktur und Balance als Basis",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 15: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 16: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 17: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 18: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 19: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Stabile Struktur und Balance als Basis",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 20: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 21: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 22: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 23: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 24: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Stabile Struktur und Balance als Basis",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 25: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 26: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 27: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 28: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 29: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Stabile Struktur und Balance als Basis",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 30: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 31: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 32: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 33: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 34: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Stabile Struktur und Balance als Basis"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 35: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 36: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 37: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 38: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 39: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Stabile Struktur und Balance als Basis",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 40: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 41: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 42: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 43: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 44: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Stabile Struktur und Balance als Basis",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 45: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 46: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 47: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 48: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 49: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Stabile Struktur und Balance als Basis"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 50: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 51: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 52: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 53: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 54: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Stabile Struktur und Balance als Basis"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 55: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 56: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 57: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 58: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 59: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Stabile Struktur und Balance als Basis",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 60: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 61: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 62: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 63: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 64: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Stabile Struktur und Balance als Basis",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 65: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 66: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 67: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 68: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 69: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Stabile Struktur und Balance als Basis",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 70: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 71: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 72: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 73: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 74: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Stabile Struktur und Balance als Basis",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 75: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 76: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 77: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 78: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 79: Welche Aussage beschreibt „Structure & Balance“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Stabile Struktur und Balance als Basis",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 80: Welche Aussage beschreibt „Centerline Theory“ am besten?",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 81: Welche Aussage beschreibt „Economy of Motion“ am besten?",
    "options": [
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 82: Welche Aussage beschreibt „Simultaneous Attack and Defense“ am besten?",
    "options": [
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "WC Prinzip-Check 83: Welche Aussage beschreibt „Chi Sao“ am besten?",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Centerline Theory“ bedeutet ____.",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Economy of Motion“ bedeutet ____.",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Gleichzeitig abwehren und treffen",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Simultaneous Attack and Defense“ bedeutet ____.",
    "options": [
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen",
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Chi Sao“ bedeutet ____.",
    "options": [
      "Kontakt-Drill zur Sensitivitäts- und Reflexschulung",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Structure & Balance“ bedeutet ____.",
    "options": [
      "Stabile Struktur und Balance als Basis",
      "Fokus auf die zentrale Linie (kürzester Weg) für Angriff & Schutz",
      "Unnötige Bewegungen vermeiden – direkt und effizient",
      "Gleichzeitig abwehren und treffen"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Fook Sao“ ist eine ____ Technik.",
    "options": [
      "Waffe",
      "Stand",
      "Bein",
      "Arm/Hand"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Pak Sao“ ist eine ____ Technik.",
    "options": [
      "Stand",
      "Waffe",
      "Bein",
      "Arm/Hand"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Tan Sao“ ist eine ____ Technik.",
    "options": [
      "Stand",
      "Arm/Hand",
      "Bein",
      "Waffe"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Bong Sao“ ist eine ____ Technik.",
    "options": [
      "Arm/Hand",
      "Waffe",
      "Stand",
      "Bein"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Kao Sao“ ist eine ____ Technik.",
    "options": [
      "Bein",
      "Arm/Hand",
      "Waffe",
      "Stand"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Jam Sao“ ist eine ____ Technik.",
    "options": [
      "Bein",
      "Arm/Hand",
      "Stand",
      "Waffe"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Gaun Sao“ ist eine ____ Technik.",
    "options": [
      "Arm/Hand",
      "Bein",
      "Waffe",
      "Stand"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Gum Sao“ ist eine ____ Technik.",
    "options": [
      "Bein",
      "Arm/Hand",
      "Waffe",
      "Stand"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): „Scheren-Gaun“ ist eine ____ Technik.",
    "options": [
      "Waffe",
      "Stand",
      "Bein",
      "Arm/Hand"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): Eine Beintechnik heißt ____.",
    "options": [
      "Jing Gerk",
      "Yap Gerk",
      "Bong Gerk",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): Der Code für „Siu Nim Tao“ ist ____.",
    "options": [
      "CK",
      "Timing",
      "BT",
      "SNT"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): Der Code für „Chum Kiu“ ist ____.",
    "options": [
      "BT",
      "CK",
      "SNT",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC): Der Code für „Biu Tze“ ist ____.",
    "options": [
      "SNT",
      "BT",
      "CK",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 1: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 2: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Economy of Motion",
      "Sensitivity (Chi Sao)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 3: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 4: Ein Kernprinzip heißt ____.",
    "options": [
      "Structure & Balance",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 5: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Economy of Motion",
      "Sensitivity (Chi Sao)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 6: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 7: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 8: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 9: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Structure & Balance",
      "Centerline Theory"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 10: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 11: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 12: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Centerline Theory"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 13: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 14: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Structure & Balance",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 15: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Sensitivity (Chi Sao)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 16: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Economy of Motion"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 17: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Economy of Motion",
      "Sensitivity (Chi Sao)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 18: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 19: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Structure & Balance",
      "Centerline Theory",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 20: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 21: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 22: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 23: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 24: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Economy of Motion",
      "Structure & Balance"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 25: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 26: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Sensitivity (Chi Sao)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 27: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 28: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 29: Ein Kernprinzip heißt ____.",
    "options": [
      "Structure & Balance",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 30: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Economy of Motion",
      "Simultaneous Attack and Defense"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 31: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 32: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 33: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 34: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Structure & Balance",
      "Economy of Motion"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 35: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Centerline Theory"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 36: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 37: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 38: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Economy of Motion",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 39: Ein Kernprinzip heißt ____.",
    "options": [
      "Structure & Balance",
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Economy of Motion"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 40: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 41: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 42: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Centerline Theory"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 43: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Centerline Theory"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 44: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Structure & Balance",
      "Economy of Motion"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 45: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Centerline Theory"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 46: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Sensitivity (Chi Sao)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 47: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 48: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 49: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Economy of Motion",
      "Structure & Balance"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 50: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 51: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 52: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Simultaneous Attack and Defense"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 53: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Simultaneous Attack and Defense"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 54: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Structure & Balance",
      "Centerline Theory"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 55: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 56: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 57: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Simultaneous Attack and Defense"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 58: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 59: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Structure & Balance"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 60: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 61: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 62: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Economy of Motion",
      "Simultaneous Attack and Defense"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 63: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 64: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Structure & Balance",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 65: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 66: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 67: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 68: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 69: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Structure & Balance"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 70: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 71: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Centerline Theory"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 72: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Sensitivity (Chi Sao)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 73: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 74: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Structure & Balance",
      "Centerline Theory",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 75: Ein Kernprinzip heißt ____.",
    "options": [
      "Economy of Motion",
      "Centerline Theory",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 76: Ein Kernprinzip heißt ____.",
    "options": [
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Centerline Theory",
      "Economy of Motion"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 77: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 78: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 79: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Structure & Balance",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 80: Ein Kernprinzip heißt ____.",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Lückentext (WC) 81: Ein Kernprinzip heißt ____.",
    "options": [
      "Centerline Theory",
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense"
    ],
    "a": 1
  }
];

  // Export
  window.QUIZ_BANKS = { tkd: TKD_QUESTIONS, wc: WC_QUESTIONS };
  try { var QUIZ_BANKS = window.QUIZ_BANKS; } catch(e) {}
})();
