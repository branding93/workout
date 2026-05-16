/* quiz.js – komplett neu generiert: eindeutige Fragen (ohne Präfixe)

- TKD: 200 (100 MCQ + 100 Lückentext)
- Wing Chun: 200 (100 MCQ + 100 Lückentext)
- Jede Frage (q) ist eindeutig und so formuliert, dass nur 1 Antwort logisch richtig ist.
- Pro Frage genau 1 richtige Antwort (Index a).
- Antwortpositionen sind gemischt (A/B/C/D).
*/

(function(){
  'use strict';

  // ===== Taekwondo (TKD) =====
  const TKD_MCQ = [
  {
    "type": "mcq",
    "q": "Welcher Kick ist der Frontkick (nach vorn)?",
    "options": [
      "Dollyo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Kick ist der Axtkick (von oben nach unten)?",
    "options": [
      "Ap Chagui",
      "Naeryo Chagui",
      "Yop Chagui",
      "Dollyo Chagui"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Kick ist der Rundkick (Roundhouse)?",
    "options": [
      "Yop Chagui",
      "Naeryo Chagui",
      "Ap Chagui",
      "Dollyo Chagui"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Kick ist der Seitkick (Side kick)?",
    "options": [
      "Naeryo Chagui",
      "Ap Chagui",
      "Yop Chagui",
      "Dollyo Chagui"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Kick ist der Reverse-Roundhouse (Gegen-Rundkick)?",
    "options": [
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Pandae Dollyo Chagui",
      "Ap Chagui"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Kick ist der Back Kick (nach hinten)?",
    "options": [
      "Tui Chagui",
      "Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Kick ist der Jump Side Kick (Sprungseitkick)?",
    "options": [
      "Ap Chagui",
      "Naeryo Chagui",
      "Twio Yop Chagui",
      "Dollyo Chagui"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Technik passt zu: Abwehr gegen niedrige Angriffe?",
    "options": [
      "Unteren Block",
      "Oberen Block",
      "Sudo Daebi Magki",
      "Mittleren Block"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Technik passt zu: Abwehr gegen Angriffe zur Körpermitte?",
    "options": [
      "Oberen Block",
      "Mittleren Block",
      "Unteren Block",
      "Sudo Daebi Magki"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Technik passt zu: Abwehr gegen hohe Angriffe zum Kopf?",
    "options": [
      "Sudo Daebi Magki",
      "Unteren Block",
      "Mittleren Block",
      "Oberen Block"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik passt zu: Handkanten-Schutzblock?",
    "options": [
      "Oberen Block",
      "Unteren Block",
      "Mittleren Block",
      "Sudo Daebi Magki"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik passt zu: Unterarm-Schutzblock?",
    "options": [
      "Oberen Block",
      "Mittleren Block",
      "Unteren Block",
      "Palmok Daebi Magki"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Stellung passt zu: langer Stand nach vorn?",
    "options": [
      "Vorwärts-Stellung (jeongul seogi)",
      "Distanz",
      "Rückwärts-Stellung (hugul seogi)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Stellung passt zu: Gewicht eher hinten (defensiv)?",
    "options": [
      "Rückwärts-Stellung (hugul seogi)",
      "Timing",
      "Distanz",
      "Vorwärts-Stellung (jeongul seogi)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Tenet bedeutet „Höflichkeit“?",
    "options": [
      "Courtesy",
      "Integrity",
      "Self-Control",
      "Perseverance"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Tenet bedeutet „Integrität“?",
    "options": [
      "Integrity",
      "Courtesy",
      "Perseverance",
      "Self-Control"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Tenet bedeutet „Durchhaltevermögen“?",
    "options": [
      "Self-Control",
      "Integrity",
      "Courtesy",
      "Perseverance"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Tenet bedeutet „Selbstkontrolle“?",
    "options": [
      "Integrity",
      "Self-Control",
      "Courtesy",
      "Perseverance"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Tenet bedeutet „Unbezwingbarer Geist“?",
    "options": [
      "Indomitable Spirit",
      "Integrity",
      "Perseverance",
      "Courtesy"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Chon-Ji Hyong“?",
    "options": [
      "Gelb",
      "Weiß",
      "Blau",
      "Grün"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „Chon-Ji Hyong“?",
    "options": [
      "23",
      "28",
      "21",
      "19"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Tan-Gun Hyong“?",
    "options": [
      "Blau",
      "Weiß",
      "Grün",
      "Gelb"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „Tan-Gun Hyong“?",
    "options": [
      "21",
      "23",
      "28",
      "19"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „To-San Hyong“?",
    "options": [
      "Blau",
      "Grün",
      "Gelb",
      "Weiß"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „To-San Hyong“?",
    "options": [
      "23",
      "21",
      "28",
      "19"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Won-Hyo Hyong“?",
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
    "q": "Wie viele Bewegungen hat „Won-Hyo Hyong“?",
    "options": [
      "19",
      "23",
      "21",
      "28"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Yul-Gok Hyong“?",
    "options": [
      "Grün",
      "Blau",
      "Weiß",
      "Gelb"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „Yul-Gok Hyong“?",
    "options": [
      "38",
      "19",
      "23",
      "21"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Chung-Gun Hyong“?",
    "options": [
      "Gelb",
      "Blau",
      "Grün",
      "Weiß"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „Chung-Gun Hyong“?",
    "options": [
      "21",
      "23",
      "19",
      "32"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Toi-Gye Hyong“?",
    "options": [
      "Blau",
      "Gelb",
      "Grün",
      "Weiß"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „Toi-Gye Hyong“?",
    "options": [
      "19",
      "37",
      "23",
      "21"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Hwa-Rang Hyong“?",
    "options": [
      "Weiß",
      "Grün",
      "Rot",
      "Gelb"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „Hwa-Rang Hyong“?",
    "options": [
      "21",
      "23",
      "29",
      "19"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Chung-Mu Hyong“?",
    "options": [
      "Rot",
      "Gelb",
      "Weiß",
      "Grün"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „Chung-Mu Hyong“?",
    "options": [
      "23",
      "19",
      "30",
      "21"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Zu welchem Gürtel gehört „Gwang-Gae Hyong“?",
    "options": [
      "Schwarz",
      "Weiß",
      "Grün",
      "Gelb"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie viele Bewegungen hat „Gwang-Gae Hyong“?",
    "options": [
      "39",
      "19",
      "23",
      "21"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Kammer (Knie hoch)",
      "Distanz",
      "Recoil (Zurückziehen)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie nennt man: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Distanz",
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welches Konzept beschreibt: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Distanz",
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Fachbegriff bedeutet: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck steht für: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz",
      "Kammer (Knie hoch)"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Recoil (Zurückziehen)",
      "Distanz",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff beschreibt am treffendsten: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Distanz",
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welches Wort meint: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Distanz",
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Wie heißt das Prinzip: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Distanz",
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Terminus steht für: „Knie anheben und Kick vorbereiten“?",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Wie nennt man: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Kammer (Knie hoch)",
      "Timing",
      "Distanz",
      "Recoil (Zurückziehen)"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welches Konzept beschreibt: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Timing",
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Fachbegriff bedeutet: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Distanz",
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck steht für: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Timing",
      "Distanz",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Timing",
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff beschreibt am treffendsten: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)",
      "Distanz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welches Wort meint: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Distanz",
      "Kammer (Knie hoch)"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Wie heißt das Prinzip: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Terminus steht für: „Nach dem Treffer zügig zurück in die Ausgangsposition“?",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Wie nennt man: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welches Konzept beschreibt: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Fachbegriff bedeutet: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck steht für: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Distanz",
      "Timing"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Distanz",
      "Recoil (Zurückziehen)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff beschreibt am treffendsten: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Distanz",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welches Wort meint: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie heißt das Prinzip: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Distanz",
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Terminus steht für: „Richtiger Moment für Angriff/Abwehr“?",
    "options": [
      "Kammer (Knie hoch)",
      "Distanz",
      "Recoil (Zurückziehen)",
      "Timing"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie nennt man: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welches Konzept beschreibt: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Distanz",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Fachbegriff bedeutet: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Kammer (Knie hoch)",
      "Distanz",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck steht für: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff beschreibt am treffendsten: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Distanz",
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welches Wort meint: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Distanz",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Wie heißt das Prinzip: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Distanz",
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Terminus steht für: „Abstand so wählen, dass Technik sauber trifft“?",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Schutzposition der Hände/Arme“?",
    "options": [
      "Deckung",
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie nennt man: „Schutzposition der Hände/Arme“?",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing",
      "Deckung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welches Konzept beschreibt: „Schutzposition der Hände/Arme“?",
    "options": [
      "Deckung",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Fachbegriff bedeutet: „Schutzposition der Hände/Arme“?",
    "options": [
      "Deckung",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck steht für: „Schutzposition der Hände/Arme“?",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Deckung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Schutzposition der Hände/Arme“?",
    "options": [
      "Recoil (Zurückziehen)",
      "Deckung",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff beschreibt am treffendsten: „Schutzposition der Hände/Arme“?",
    "options": [
      "Deckung",
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welches Wort meint: „Schutzposition der Hände/Arme“?",
    "options": [
      "Deckung",
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie heißt das Prinzip: „Schutzposition der Hände/Arme“?",
    "options": [
      "Kammer (Knie hoch)",
      "Deckung",
      "Recoil (Zurückziehen)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Terminus steht für: „Schutzposition der Hände/Arme“?",
    "options": [
      "Timing",
      "Deckung",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Stabilität auf dem Standbein“?",
    "options": [
      "Kammer (Knie hoch)",
      "Timing",
      "Balance",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Wie nennt man: „Stabilität auf dem Standbein“?",
    "options": [
      "Balance",
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welches Konzept beschreibt: „Stabilität auf dem Standbein“?",
    "options": [
      "Balance",
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Fachbegriff bedeutet: „Stabilität auf dem Standbein“?",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing",
      "Balance"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck steht für: „Stabilität auf dem Standbein“?",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing",
      "Balance"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Stabilität auf dem Standbein“?",
    "options": [
      "Balance",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff beschreibt am treffendsten: „Stabilität auf dem Standbein“?",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Balance",
      "Kammer (Knie hoch)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welches Wort meint: „Stabilität auf dem Standbein“?",
    "options": [
      "Balance",
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Wie heißt das Prinzip: „Stabilität auf dem Standbein“?",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Balance"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Terminus steht für: „Stabilität auf dem Standbein“?",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Balance",
      "Kammer (Knie hoch)"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Drehung der Hüfte zur Kraftübertragung“?",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Hüftrotation"
    ],
    "a": 3
  }
];
  const TKD_CLOZE = [
  {
    "type": "cloze",
    "q": "Wie heißt der Frontkick (nach vorn)? ____",
    "options": [
      "Ap Chagui",
      "Dollyo Chagui",
      "Naeryo Chagui",
      "Yop Chagui"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt der Axtkick (von oben nach unten)? ____",
    "options": [
      "Ap Chagui",
      "Dollyo Chagui",
      "Yop Chagui",
      "Naeryo Chagui"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie heißt der Rundkick (Roundhouse)? ____",
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
    "q": "Wie heißt der Seitkick (Side kick)? ____",
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
    "q": "Wie heißt der Reverse-Roundhouse (Gegen-Rundkick)? ____",
    "options": [
      "Dollyo Chagui",
      "Pandae Dollyo Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt der Back Kick (nach hinten)? ____",
    "options": [
      "Dollyo Chagui",
      "Tui Chagui",
      "Ap Chagui",
      "Naeryo Chagui"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt der Jump Side Kick (Sprungseitkick)? ____",
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
    "q": "Welche Technik passt zu: Abwehr gegen niedrige Angriffe? ____",
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
    "q": "Welche Technik passt zu: Abwehr gegen Angriffe zur Körpermitte? ____",
    "options": [
      "Unteren Block",
      "Sudo Daebi Magki",
      "Mittleren Block",
      "Oberen Block"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welche Technik passt zu: Abwehr gegen hohe Angriffe zum Kopf? ____",
    "options": [
      "Unteren Block",
      "Sudo Daebi Magki",
      "Mittleren Block",
      "Oberen Block"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welche Technik passt zu: Handkanten-Schutzblock? ____",
    "options": [
      "Mittleren Block",
      "Sudo Daebi Magki",
      "Oberen Block",
      "Unteren Block"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welche Technik passt zu: Unterarm-Schutzblock? ____",
    "options": [
      "Mittleren Block",
      "Palmok Daebi Magki",
      "Unteren Block",
      "Oberen Block"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt die Stellung: langer Stand nach vorn? ____",
    "options": [
      "Vorwärts-Stellung (jeongul seogi)",
      "Distanz",
      "Rückwärts-Stellung (hugul seogi)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt die Stellung: Gewicht eher hinten (defensiv)? ____",
    "options": [
      "Distanz",
      "Vorwärts-Stellung (jeongul seogi)",
      "Rückwärts-Stellung (hugul seogi)",
      "Timing"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welcher Tenet bedeutet „Höflichkeit“? ____",
    "options": [
      "Integrity",
      "Courtesy",
      "Self-Control",
      "Perseverance"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Tenet bedeutet „Integrität“? ____",
    "options": [
      "Courtesy",
      "Integrity",
      "Perseverance",
      "Self-Control"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Tenet bedeutet „Durchhaltevermögen“? ____",
    "options": [
      "Self-Control",
      "Perseverance",
      "Courtesy",
      "Integrity"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Tenet bedeutet „Selbstkontrolle“? ____",
    "options": [
      "Courtesy",
      "Integrity",
      "Self-Control",
      "Perseverance"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welcher Tenet bedeutet „Unbezwingbarer Geist“? ____",
    "options": [
      "Integrity",
      "Indomitable Spirit",
      "Perseverance",
      "Courtesy"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Zu welchem Gürtel gehört „Chon-Ji Hyong“? ____",
    "options": [
      "Weiß",
      "Grün",
      "Gelb",
      "Blau"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "„Chon-Ji Hyong“ hat ____ Bewegungen.",
    "options": [
      "19",
      "21",
      "28",
      "23"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Zu welchem Gürtel gehört „Tan-Gun Hyong“? ____",
    "options": [
      "Grün",
      "Gelb",
      "Blau",
      "Weiß"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "„Tan-Gun Hyong“ hat ____ Bewegungen.",
    "options": [
      "21",
      "19",
      "28",
      "23"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Zu welchem Gürtel gehört „To-San Hyong“? ____",
    "options": [
      "Blau",
      "Weiß",
      "Gelb",
      "Grün"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "„To-San Hyong“ hat ____ Bewegungen.",
    "options": [
      "23",
      "21",
      "28",
      "19"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Zu welchem Gürtel gehört „Won-Hyo Hyong“? ____",
    "options": [
      "Blau",
      "Gelb",
      "Weiß",
      "Grün"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "„Won-Hyo Hyong“ hat ____ Bewegungen.",
    "options": [
      "23",
      "19",
      "21",
      "28"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Zu welchem Gürtel gehört „Yul-Gok Hyong“? ____",
    "options": [
      "Gelb",
      "Weiß",
      "Grün",
      "Blau"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "„Yul-Gok Hyong“ hat ____ Bewegungen.",
    "options": [
      "23",
      "21",
      "38",
      "19"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Zu welchem Gürtel gehört „Chung-Gun Hyong“? ____",
    "options": [
      "Gelb",
      "Grün",
      "Weiß",
      "Blau"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "„Chung-Gun Hyong“ hat ____ Bewegungen.",
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
    "q": "Zu welchem Gürtel gehört „Toi-Gye Hyong“? ____",
    "options": [
      "Gelb",
      "Weiß",
      "Blau",
      "Grün"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "„Toi-Gye Hyong“ hat ____ Bewegungen.",
    "options": [
      "19",
      "37",
      "23",
      "21"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Zu welchem Gürtel gehört „Hwa-Rang Hyong“? ____",
    "options": [
      "Weiß",
      "Gelb",
      "Rot",
      "Grün"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "„Hwa-Rang Hyong“ hat ____ Bewegungen.",
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
    "q": "Zu welchem Gürtel gehört „Chung-Mu Hyong“? ____",
    "options": [
      "Gelb",
      "Grün",
      "Weiß",
      "Rot"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "„Chung-Mu Hyong“ hat ____ Bewegungen.",
    "options": [
      "19",
      "23",
      "30",
      "21"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Zu welchem Gürtel gehört „Gwang-Gae Hyong“? ____",
    "options": [
      "Weiß",
      "Grün",
      "Schwarz",
      "Gelb"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "„Gwang-Gae Hyong“ hat ____ Bewegungen.",
    "options": [
      "19",
      "39",
      "23",
      "21"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Knie anheben und Kick vorbereiten“ heißt ____.",
    "options": [
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)",
      "Distanz"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt es? „Knie anheben und Kick vorbereiten“ -> ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing",
      "Distanz"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Fachbegriff: „Knie anheben und Kick vorbereiten“ = ____",
    "options": [
      "Kammer (Knie hoch)",
      "Distanz",
      "Recoil (Zurückziehen)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wort gesucht für: „Knie anheben und Kick vorbereiten“ ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz",
      "Kammer (Knie hoch)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Das nennt man: „Knie anheben und Kick vorbereiten“ ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Distanz",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Bezeichnung gesucht: „Knie anheben und Kick vorbereiten“ = ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff trifft zu: „Knie anheben und Kick vorbereiten“? ____",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Distanz"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie nennt man das: „Knie anheben und Kick vorbereiten“ ____",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Terminus passt zu: „Knie anheben und Kick vorbereiten“? ____",
    "options": [
      "Distanz",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Passender Begriff für „Knie anheben und Kick vorbereiten“: ____",
    "options": [
      "Distanz",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Nach dem Treffer zügig zurück in die Ausgangsposition“ heißt ____.",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt es? „Nach dem Treffer zügig zurück in die Ausgangsposition“ -> ____",
    "options": [
      "Distanz",
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Fachbegriff: „Nach dem Treffer zügig zurück in die Ausgangsposition“ = ____",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Distanz"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wort gesucht für: „Nach dem Treffer zügig zurück in die Ausgangsposition“ ____",
    "options": [
      "Timing",
      "Distanz",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Das nennt man: „Nach dem Treffer zügig zurück in die Ausgangsposition“ ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Bezeichnung gesucht: „Nach dem Treffer zügig zurück in die Ausgangsposition“ = ____",
    "options": [
      "Kammer (Knie hoch)",
      "Distanz",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff trifft zu: „Nach dem Treffer zügig zurück in die Ausgangsposition“? ____",
    "options": [
      "Kammer (Knie hoch)",
      "Distanz",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie nennt man das: „Nach dem Treffer zügig zurück in die Ausgangsposition“ ____",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Terminus passt zu: „Nach dem Treffer zügig zurück in die Ausgangsposition“? ____",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Passender Begriff für „Nach dem Treffer zügig zurück in die Ausgangsposition“: ____",
    "options": [
      "Timing",
      "Distanz",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Richtiger Moment für Angriff/Abwehr“ heißt ____.",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wie heißt es? „Richtiger Moment für Angriff/Abwehr“ -> ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz",
      "Kammer (Knie hoch)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Fachbegriff: „Richtiger Moment für Angriff/Abwehr“ = ____",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Distanz",
      "Kammer (Knie hoch)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wort gesucht für: „Richtiger Moment für Angriff/Abwehr“ ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Distanz",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Das nennt man: „Richtiger Moment für Angriff/Abwehr“ ____",
    "options": [
      "Distanz",
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Bezeichnung gesucht: „Richtiger Moment für Angriff/Abwehr“ = ____",
    "options": [
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)",
      "Distanz"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff trifft zu: „Richtiger Moment für Angriff/Abwehr“? ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing",
      "Distanz"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wie nennt man das: „Richtiger Moment für Angriff/Abwehr“ ____",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Distanz",
      "Timing"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Terminus passt zu: „Richtiger Moment für Angriff/Abwehr“? ____",
    "options": [
      "Distanz",
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Passender Begriff für „Richtiger Moment für Angriff/Abwehr“: ____",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Distanz"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Abstand so wählen, dass Technik sauber trifft“ heißt ____.",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie heißt es? „Abstand so wählen, dass Technik sauber trifft“ -> ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz",
      "Kammer (Knie hoch)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Fachbegriff: „Abstand so wählen, dass Technik sauber trifft“ = ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Distanz",
      "Timing"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wort gesucht für: „Abstand so wählen, dass Technik sauber trifft“ ____",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing",
      "Distanz"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Das nennt man: „Abstand so wählen, dass Technik sauber trifft“ ____",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Distanz",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Bezeichnung gesucht: „Abstand so wählen, dass Technik sauber trifft“ = ____",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Distanz"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff trifft zu: „Abstand so wählen, dass Technik sauber trifft“? ____",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Distanz"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie nennt man das: „Abstand so wählen, dass Technik sauber trifft“ ____",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Distanz"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Terminus passt zu: „Abstand so wählen, dass Technik sauber trifft“? ____",
    "options": [
      "Distanz",
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Passender Begriff für „Abstand so wählen, dass Technik sauber trifft“: ____",
    "options": [
      "Kammer (Knie hoch)",
      "Distanz",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Schutzposition der Hände/Arme“ heißt ____.",
    "options": [
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Deckung",
      "Timing"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wie heißt es? „Schutzposition der Hände/Arme“ -> ____",
    "options": [
      "Timing",
      "Recoil (Zurückziehen)",
      "Deckung",
      "Kammer (Knie hoch)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Fachbegriff: „Schutzposition der Hände/Arme“ = ____",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Deckung",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wort gesucht für: „Schutzposition der Hände/Arme“ ____",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Timing",
      "Deckung"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Das nennt man: „Schutzposition der Hände/Arme“ ____",
    "options": [
      "Kammer (Knie hoch)",
      "Timing",
      "Deckung",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Bezeichnung gesucht: „Schutzposition der Hände/Arme“ = ____",
    "options": [
      "Timing",
      "Deckung",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff trifft zu: „Schutzposition der Hände/Arme“? ____",
    "options": [
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)",
      "Deckung",
      "Timing"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wie nennt man das: „Schutzposition der Hände/Arme“ ____",
    "options": [
      "Kammer (Knie hoch)",
      "Deckung",
      "Recoil (Zurückziehen)",
      "Timing"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Terminus passt zu: „Schutzposition der Hände/Arme“? ____",
    "options": [
      "Timing",
      "Kammer (Knie hoch)",
      "Deckung",
      "Recoil (Zurückziehen)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Passender Begriff für „Schutzposition der Hände/Arme“: ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Deckung",
      "Timing"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Stabilität auf dem Standbein“ heißt ____.",
    "options": [
      "Recoil (Zurückziehen)",
      "Balance",
      "Timing",
      "Kammer (Knie hoch)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt es? „Stabilität auf dem Standbein“ -> ____",
    "options": [
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)",
      "Balance"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Fachbegriff: „Stabilität auf dem Standbein“ = ____",
    "options": [
      "Balance",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wort gesucht für: „Stabilität auf dem Standbein“ ____",
    "options": [
      "Balance",
      "Kammer (Knie hoch)",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Das nennt man: „Stabilität auf dem Standbein“ ____",
    "options": [
      "Timing",
      "Balance",
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Bezeichnung gesucht: „Stabilität auf dem Standbein“ = ____",
    "options": [
      "Timing",
      "Balance",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff trifft zu: „Stabilität auf dem Standbein“? ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Timing",
      "Balance",
      "Kammer (Knie hoch)"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wie nennt man das: „Stabilität auf dem Standbein“ ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing",
      "Balance"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Terminus passt zu: „Stabilität auf dem Standbein“? ____",
    "options": [
      "Recoil (Zurückziehen)",
      "Kammer (Knie hoch)",
      "Timing",
      "Balance"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Passender Begriff für „Stabilität auf dem Standbein“: ____",
    "options": [
      "Balance",
      "Timing",
      "Kammer (Knie hoch)",
      "Recoil (Zurückziehen)"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Drehung der Hüfte zur Kraftübertragung“ heißt ____.",
    "options": [
      "Kammer (Knie hoch)",
      "Hüftrotation",
      "Timing",
      "Recoil (Zurückziehen)"
    ],
    "a": 1
  }
];
  const TKD_QUESTIONS = TKD_MCQ.concat(TKD_CLOZE);

  // ===== Wing Chun (WC) =====
  const WC_MCQ = [
  {
    "type": "mcq",
    "q": "Welches Prinzip passt zu: „Prinzip der Mittellinie“?",
    "options": [
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Simultaneous Attack and Defense",
      "Economy of Motion"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welches Prinzip passt zu: „Ökonomie der Bewegung“?",
    "options": [
      "Economy of Motion",
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Centerline Theory"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welches Prinzip passt zu: „Angriff und Abwehr gleichzeitig“?",
    "options": [
      "Simultaneous Attack and Defense",
      "Sensitivity (Chi Sao)",
      "Economy of Motion",
      "Centerline Theory"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welches Prinzip passt zu: „Sensitivität durch Kontakt“?",
    "options": [
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Simultaneous Attack and Defense",
      "Centerline Theory"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welches Prinzip passt zu: „Struktur und Balance“?",
    "options": [
      "Structure & Balance",
      "Economy of Motion",
      "Centerline Theory",
      "Simultaneous Attack and Defense"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Stand & Struktur“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Stand & Struktur“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Richtungs-Wechsel",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Stand & Struktur“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Stand & Struktur“?",
    "options": [
      "Richtungs-Wechsel",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Stand & Struktur“?",
    "options": [
      "Richtungs-Wechsel",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Stabilität am Boden“?",
    "options": [
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Stabilität am Boden“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Stabilität am Boden“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Boden-Kampf-Stellung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Stabilität am Boden“?",
    "options": [
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Stabilität am Boden“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Kontrolle & Sicherheit“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Kontrolle & Sicherheit“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Kontrolle & Sicherheit“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Kontrolle & Sicherheit“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Kontrolle & Sicherheit“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Bewegung & Winkel“?",
    "options": [
      "Richtungs-Wechsel",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Bewegung & Winkel“?",
    "options": [
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Bewegung & Winkel“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Bewegung & Winkel“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Bewegung & Winkel“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Schutz & Reset“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Sicherheitsstellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Schutz & Reset“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Sicherheitsstellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Schutz & Reset“?",
    "options": [
      "Sicherheitsstellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Schutz & Reset“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Sicherheitsstellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Schutz & Reset“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Sicherheitsstellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Basis für Struktur“?",
    "options": [
      "Trainingsstand / Adduktorenstand",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Basis für Struktur“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Trainingsstand / Adduktorenstand",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Basis für Struktur“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Trainingsstand / Adduktorenstand",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Basis für Struktur“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Trainingsstand / Adduktorenstand"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Basis für Struktur“?",
    "options": [
      "Trainingsstand / Adduktorenstand",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Fußarbeit“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kreuzschritt",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Fußarbeit“?",
    "options": [
      "Kreuzschritt",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Fußarbeit“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kreuzschritt"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Fußarbeit“?",
    "options": [
      "Kreuzschritt",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Fußarbeit“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kreuzschritt",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Vorstufe Chi Sao“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Einarmiges Dan Chi"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Vorstufe Chi Sao“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Einarmiges Dan Chi",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Vorstufe Chi Sao“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Einarmiges Dan Chi",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Vorstufe Chi Sao“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Einarmiges Dan Chi",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Vorstufe Chi Sao“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Einarmiges Dan Chi"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Sensitivität · Reflexe · Gefühl für den Gegner“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Chi Sao („Klebende Hände\")"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Sensitivität · Reflexe · Gefühl für den Gegner“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Chi Sao („Klebende Hände\")",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Sensitivität · Reflexe · Gefühl für den Gegner“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Chi Sao („Klebende Hände\")"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Sensitivität · Reflexe · Gefühl für den Gegner“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Chi Sao („Klebende Hände\")",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Sensitivität · Reflexe · Gefühl für den Gegner“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Chi Sao („Klebende Hände\")"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Fook Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“?",
    "options": [
      "Fook Sao",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Fook Sao"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Fook Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Fook Sao",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Pak Sao"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“?",
    "options": [
      "Pak Sao",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“?",
    "options": [
      "Pak Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Pak Sao"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Pak Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Tan Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Tan Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Tan Sao",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“?",
    "options": [
      "Tan Sao",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Tan Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „„Flügelhand“ – schwingend ablenken.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Bong Sao",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „„Flügelhand“ – schwingend ablenken.“?",
    "options": [
      "Bong Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „„Flügelhand“ – schwingend ablenken.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Bong Sao",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „„Flügelhand“ – schwingend ablenken.“?",
    "options": [
      "Bong Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „„Flügelhand“ – schwingend ablenken.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Bong Sao",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „„offene Hand“ / „Innerer Schwingenarm““?",
    "options": [
      "Boden-Kampf-Stellung",
      "Kao Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „„offene Hand“ / „Innerer Schwingenarm““?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kao Sao"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „„offene Hand“ / „Innerer Schwingenarm““?",
    "options": [
      "Kao Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „„offene Hand“ / „Innerer Schwingenarm““?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kao Sao"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „„offene Hand“ / „Innerer Schwingenarm““?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kao Sao",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“?",
    "options": [
      "Jam Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Jam Sao",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Jam Sao",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Jam Sao",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Jam Sao",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „„schneidende Hand“ / „zeichnender Arm““?",
    "options": [
      "Gaun Sao",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „„schneidende Hand“ / „zeichnender Arm““?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Gaun Sao"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „„schneidende Hand“ / „zeichnender Arm““?",
    "options": [
      "Gaun Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „„schneidende Hand“ / „zeichnender Arm““?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Gaun Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „„schneidende Hand“ / „zeichnender Arm““?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Gaun Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Gum Sao"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Gum Sao"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Gum Sao",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“?",
    "options": [
      "Gum Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“?",
    "options": [
      "Gum Sao",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Kombination aus Gaun Sao und hohem Jam Sao.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Scheren-Gaun"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Kombination aus Gaun Sao und hohem Jam Sao.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Scheren-Gaun"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Kombination aus Gaun Sao und hohem Jam Sao.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Scheren-Gaun",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Kombination aus Gaun Sao und hohem Jam Sao.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Scheren-Gaun",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Kombination aus Gaun Sao und hohem Jam Sao.“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Scheren-Gaun"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welcher Begriff passt zu: „Fronttritt.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Jing Gerk"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Technik/Übung wird so beschrieben: „Fronttritt.“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Jing Gerk",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "mcq",
    "q": "Welche Bezeichnung passt zu: „Fronttritt.“?",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Jing Gerk",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "mcq",
    "q": "Welcher Ausdruck beschreibt: „Fronttritt.“?",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Jing Gerk"
    ],
    "a": 3
  },
  {
    "type": "mcq",
    "q": "Welche Option entspricht der Beschreibung: „Fronttritt.“?",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Jing Gerk",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  }
];
  const WC_CLOZE = [
  {
    "type": "cloze",
    "q": "Welches Prinzip passt zu: „Prinzip der Mittellinie“? ____",
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
    "q": "Welches Prinzip passt zu: „Ökonomie der Bewegung“? ____",
    "options": [
      "Sensitivity (Chi Sao)",
      "Centerline Theory",
      "Economy of Motion",
      "Simultaneous Attack and Defense"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welches Prinzip passt zu: „Angriff und Abwehr gleichzeitig“? ____",
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
    "q": "Welches Prinzip passt zu: „Sensitivität durch Kontakt“? ____",
    "options": [
      "Simultaneous Attack and Defense",
      "Economy of Motion",
      "Sensitivity (Chi Sao)",
      "Centerline Theory"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welches Prinzip passt zu: „Struktur und Balance“? ____",
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
    "q": "Welcher Begriff passt zu: „Stand & Struktur“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Richtungs-Wechsel"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Stand & Struktur“ ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Stand & Struktur“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Stand & Struktur“? ____",
    "options": [
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Stand & Struktur“: ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Stabilität am Boden“? ____",
    "options": [
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Stabilität am Boden“ ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Stabilität am Boden“? ____",
    "options": [
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Stabilität am Boden“? ____",
    "options": [
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Stabilität am Boden“: ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Kontrolle & Sicherheit“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Kontrolle & Sicherheit“ ____",
    "options": [
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Kontrolle & Sicherheit“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Kontrolle & Sicherheit“? ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Richtungs-Wechsel",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Kontrolle & Sicherheit“: ____",
    "options": [
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Bewegung & Winkel“? ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Richtungs-Wechsel"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Bewegung & Winkel“ ____",
    "options": [
      "Richtungs-Wechsel",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Bewegung & Winkel“? ____",
    "options": [
      "Richtungs-Wechsel",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Bewegung & Winkel“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Bewegung & Winkel“: ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Richtungs-Wechsel"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Schutz & Reset“? ____",
    "options": [
      "Sicherheitsstellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Schutz & Reset“ ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Sicherheitsstellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Schutz & Reset“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Sicherheitsstellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Schutz & Reset“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Sicherheitsstellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Schutz & Reset“: ____",
    "options": [
      "Sicherheitsstellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Basis für Struktur“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Trainingsstand / Adduktorenstand",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Basis für Struktur“ ____",
    "options": [
      "Trainingsstand / Adduktorenstand",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Basis für Struktur“? ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Trainingsstand / Adduktorenstand",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Basis für Struktur“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Trainingsstand / Adduktorenstand",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Basis für Struktur“: ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Trainingsstand / Adduktorenstand",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Fußarbeit“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kreuzschritt",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Fußarbeit“ ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kreuzschritt"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Fußarbeit“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kreuzschritt"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Fußarbeit“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Kreuzschritt",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Fußarbeit“: ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Kreuzschritt",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Vorstufe Chi Sao“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Einarmiges Dan Chi",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Vorstufe Chi Sao“ ____",
    "options": [
      "Einarmiges Dan Chi",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Vorstufe Chi Sao“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Einarmiges Dan Chi",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Vorstufe Chi Sao“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Einarmiges Dan Chi",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Vorstufe Chi Sao“: ____",
    "options": [
      "Einarmiges Dan Chi",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Sensitivität · Reflexe · Gefühl für den Gegner“? ____",
    "options": [
      "Chi Sao („Klebende Hände\")",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Sensitivität · Reflexe · Gefühl für den Gegner“ ____",
    "options": [
      "Chi Sao („Klebende Hände\")",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Sensitivität · Reflexe · Gefühl für den Gegner“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Chi Sao („Klebende Hände\")",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Sensitivität · Reflexe · Gefühl für den Gegner“? ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Chi Sao („Klebende Hände\")"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Sensitivität · Reflexe · Gefühl für den Gegner“: ____",
    "options": [
      "Chi Sao („Klebende Hände\")",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Fook Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“ ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Fook Sao",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Fook Sao",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Fook Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.“: ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Fook Sao",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Pak Sao",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“ ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Pak Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“? ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Pak Sao",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Pak Sao",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).“: ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Pak Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“? ____",
    "options": [
      "Tan Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“ ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Tan Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“? ____",
    "options": [
      "Tan Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Tan Sao",
      "Boden-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).“: ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Tan Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „„Flügelhand“ – schwingend ablenken.“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Bong Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „„Flügelhand“ – schwingend ablenken.“ ____",
    "options": [
      "Bong Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „„Flügelhand“ – schwingend ablenken.“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Bong Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „„Flügelhand“ – schwingend ablenken.“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Bong Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „„Flügelhand“ – schwingend ablenken.“: ____",
    "options": [
      "Bong Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „„offene Hand“ / „Innerer Schwingenarm““? ____",
    "options": [
      "Kao Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „„offene Hand“ / „Innerer Schwingenarm““ ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kao Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „„offene Hand“ / „Innerer Schwingenarm““? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Kao Sao",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „„offene Hand“ / „Innerer Schwingenarm““? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Kao Sao",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „„offene Hand“ / „Innerer Schwingenarm““: ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Kao Sao",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“? ____",
    "options": [
      "Jam Sao",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“ ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Jam Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“? ____",
    "options": [
      "Jam Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Jam Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.“: ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Jam Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „„schneidende Hand“ / „zeichnender Arm““? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Gaun Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „„schneidende Hand“ / „zeichnender Arm““ ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Gaun Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „„schneidende Hand“ / „zeichnender Arm““? ____",
    "options": [
      "Gaun Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „„schneidende Hand“ / „zeichnender Arm““? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Gaun Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „„schneidende Hand“ / „zeichnender Arm““: ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Gaun Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“? ____",
    "options": [
      "Gum Sao",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“ ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Gum Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“? ____",
    "options": [
      "Gum Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“? ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Gum Sao"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.“: ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Gum Sao",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Kombination aus Gaun Sao und hohem Jam Sao.“? ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Scheren-Gaun",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Kombination aus Gaun Sao und hohem Jam Sao.“ ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Scheren-Gaun",
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Kombination aus Gaun Sao und hohem Jam Sao.“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Scheren-Gaun",
      "Kampfstellung / Vorwärts-Stoß-Stellung"
    ],
    "a": 2
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Kombination aus Gaun Sao und hohem Jam Sao.“? ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Scheren-Gaun"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Kombination aus Gaun Sao und hohem Jam Sao.“: ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Scheren-Gaun"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Welcher Begriff passt zu: „Fronttritt.“? ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Jing Gerk"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Begriff gesucht: „Fronttritt.“ ____",
    "options": [
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung",
      "Jing Gerk"
    ],
    "a": 3
  },
  {
    "type": "cloze",
    "q": "Wie heißt die beschriebene Technik: „Fronttritt.“? ____",
    "options": [
      "Boden-Liegend-Kampf-Stellung",
      "Jing Gerk",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung"
    ],
    "a": 1
  },
  {
    "type": "cloze",
    "q": "Welche Technik/Übung wird so beschrieben: „Fronttritt.“? ____",
    "options": [
      "Jing Gerk",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Kampf-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 0
  },
  {
    "type": "cloze",
    "q": "Passender Begriff zu „Fronttritt.“: ____",
    "options": [
      "Boden-Kampf-Stellung",
      "Jing Gerk",
      "Kampfstellung / Vorwärts-Stoß-Stellung",
      "Boden-Liegend-Kampf-Stellung"
    ],
    "a": 1
  }
];
  const WC_QUESTIONS = WC_MCQ.concat(WC_CLOZE);

  window.QUIZ_BANKS = { tkd: TKD_QUESTIONS, wc: WC_QUESTIONS };
  try { var QUIZ_BANKS = window.QUIZ_BANKS; } catch(e) {}
})();
