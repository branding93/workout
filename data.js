/* Daten (Arrays/Objekte) aus der ursprünglichen App ausgelagert.
   Enthält nur Konfiguration & Inhalte – keine Logik. */

const TKD_VARIATIONS = ['normal', 'Rückwärts', 'gespiegelt', 'front', 'gesprungen', 'Gegenbewegung'];
      const TKD_BELTS = {
        white: { label: 'Weiß', emoji: '⚪️', cls: '' },
        yellow: { label: 'Gelb', emoji: '🟡', cls: 'yellow' },
        green: { label: 'Grün', emoji: '🟢', cls: 'green' },
        blue: { label: 'Blau', emoji: '🔵', cls: 'blue' },
        red: { label: 'Rot', emoji: '🔴', cls: 'red' },
        black: { label: 'Schwarz', emoji: '⚫️', cls: 'black' }
      };
      const HYONGS = [
        { id: 'I', name: 'Chon-Ji Hyong', moves: 19, belt: 'white' },
        { id: 'II', name: 'Tan-Gun Hyong', moves: 21, belt: 'yellow' },
        { id: 'III', name: 'To-San Hyong', moves: 23, belt: 'yellow' },
        { id: 'IV', name: 'Won-Hyo Hyong', moves: 28, belt: 'green' },
        { id: 'V', name: 'Yul-Gok Hyong', moves: 38, belt: 'green' },
        { id: 'VI', name: 'Chung-Gun Hyong', moves: 32, belt: 'blue' },
        { id: 'VII', name: 'Toi-Gye Hyong', moves: 37, belt: 'blue' },
        { id: 'VIII', name: 'Hwa-Rang Hyong', moves: 29, belt: 'red' },
        { id: 'IX', name: 'Chung-Mu Hyong', moves: 30, belt: 'red' },
        { id: 'X', name: 'Gwang-Gae Hyong', moves: 39, belt: 'black' }
      ];
      const COMBOS = [
        'Übung 1-8',
        'Kombination 1-8',
        'Kombination 1-14',
        '4 Kicks + 6 Kicks + 6 Kicks mit Sprung',
        'Vierrichtungsstoß 1-4',
        'Vierrichtungs-Handkante mit Block/Schlag/Kick'
      ];
      const SPARRING = ['Einschrittkampf (ilbo daeryeon)'];

// =========================
// TKD: Einschrittkampf – Unterscheidungen als Obergruppen
// UI-Ziel: Unterhalb der Obergruppe (z.B. „Stufe“) stehen die Unterpunkte (Ilbo/Ibo/Sambo).
// Speicherung bleibt kompatibel: Auswahlwerte liegen weiterhin in state.tkd.sparring (Map).
// =========================
const TKD_SPARRING_GROUPS = [
  { title: 'Stufe', icon: 'Stufe', items: [
    { key: 'Stufe: Ilbo', label: 'Ilbo' },
    { key: 'Stufe: Ibo', label: 'Ibo' },
    { key: 'Stufe: Sambo', label: 'Sambo' },
  ]},
  { title: 'Angriff', icon: 'Angriff', items: [
    { key: 'Angriff: Hand', label: 'Hand' },
    { key: 'Angriff: Fuß', label: 'Fuß' },
    { key: 'Angriff: gemischt', label: 'gemischt' },
  ]},
  { title: 'Zielhöhe', icon: 'Ziel', items: [
    { key: 'Zielhöhe: tief', label: 'tief' },
    { key: 'Zielhöhe: mittel', label: 'mittel' },
    { key: 'Zielhöhe: hoch', label: 'hoch' },
  ]},
  { title: 'Verteidigung', icon: 'VTD', items: [
    { key: 'Verteidigung: Block', label: 'Block' },
    { key: 'Verteidigung: Ausweichen', label: 'Ausweichen' },
    { key: 'Verteidigung: Abfangen', label: 'Abfangen' },
  ]},
  { title: 'Konter', icon: 'Konter', items: [
    { key: 'Konter: Hand', label: 'Hand' },
    { key: 'Konter: Fuß', label: 'Fuß' },
    { key: 'Konter: Kombi', label: 'Kombi' },
  ]},
  { title: 'Struktur', icon: 'Struktur', items: [
    { key: 'Struktur: fest', label: 'fest' },
    { key: 'Struktur: semi-free', label: 'semi-free' },
    { key: 'Struktur: free-attack', label: 'free-attack' },
  ]},
];

// Alle Keys in SPARRING ergänzen (ohne Duplikate)
(function ensureSparringGroups(){
  try {
    if (!Array.isArray(SPARRING)) return;
    var seen = {};
    for (var i=0;i<SPARRING.length;i++){ seen[String(SPARRING[i])] = true; }
    for (var g=0; g<TKD_SPARRING_GROUPS.length; g++){
      var items = TKD_SPARRING_GROUPS[g].items || [];
      for (var j=0; j<items.length; j++){
        var k = String(items[j].key || '').trim();
        if (!k) continue;
        if (!seen[k]) { seen[k] = true; SPARRING.push(k); }
      }
    }
  } catch(e){}
})();

      const BASICS = {
        overview: ['15 Grundübungen (5x Blöcke, 5x Schläge, 5x Kicks)'],
        kicks: ['Ap Chagui', 'Naeryo Chagui', 'Dollyo Chagui', 'Yop Chagui', 'Pandae Dollyo Chagui', 'Tui Chagui', 'Twio Yop Chagui'],
        blocks: ['Unteren Block', 'Mittleren Block', 'Oberen Block', 'Sudo Daebi Magki', 'Palmok Daebi Magki'],
        strikes: ['Stich', 'Lang', 'Faust', 'Ballen', 'Ellbogen'],
        stances: ['Vorwärts-Stellung (jeongul seogi)', 'Rückwärts-Stellung (hugul seogi)']
      };
      const TKD_MOTIVATION = [
        'Heute zählt Qualität: sauber → schnell → stark.',
        'Atmung ruhig, Blick klar – Technik gewinnt.',
        'Ein guter Stand macht jeden Kick besser.',
        'Langsam üben ist kein Umweg – es ist der Turbo.',
        'Kontrolle zuerst. Power folgt.',
        'Jede Wiederholung ist ein Upgrade.',
        'Fokus auf Hüfte & Balance – der Rest kommt.',
        'Klein anfangen, groß treffen: Präzision!',
        'Bleib locker in den Schultern – bleib schnell.',
        'Heute 1% besser – reicht völlig.'
      ];

      // WC
      const WC_VARIATIONS = ['normal', 'langsam', 'Struktur', 'Power', 'Mittellinie', 'Timing'];
      const WC_LEVELS = {
        white: { label: 'Basis', emoji: '⚪️', cls: 'white' },
        yellow: { label: 'Aufbau', emoji: '🟡', cls: 'yellow' },
        green: { label: 'Vertiefung', emoji: '🟢', cls: 'green' }
      };
      const FORMS = [
        { id: 'I', code: 'SNT', name: 'Siu Nim Tao', note: 'Kleine Idee Form', parts: '8 Sätze', level: 'white' },
        { id: 'II', code: 'CK', name: 'Chum Kiu', note: 'Arme suchende Form', parts: '3 Teile', level: 'yellow' },
        { id: 'III', code: 'BT', name: 'Biu Tze', note: 'Stossende Finger', parts: '—', level: 'green' }
      ];
      const GRUNDLAGEN = [
        { t: 'Kampfstellung / Vorwärts-Stoß-Stellung', d: 'Stand & Struktur' },
        { t: 'Boden-Kampf-Stellung', d: 'Stabilität am Boden' },
        { t: 'Boden-Liegend-Kampf-Stellung', d: 'Kontrolle & Sicherheit' },
        { t: 'Richtungs-Wechsel', d: 'Bewegung & Winkel' },
        { t: 'Sicherheitsstellung', d: 'Schutz & Reset' },
        { t: 'Trainingsstand / Adduktorenstand', d: 'Basis für Struktur' },
        { t: 'Kreuzschritt', d: 'Fußarbeit' },
        { t: 'Zick-Zack-Schritt', d: 'Fußarbeit' },
        { t: 'Einarmiges Dan Chi', d: 'Vorstufe Chi Sao' },
        { t: 'Beidarmiges Pon Sao', d: 'Vorstufe Chi Sao' },
        { t: 'Chi Sao („Klebende Hände")', d: 'Sensitivität · Reflexe · Gefühl für den Gegner' }
      ];
      const ARM_HAND = [
        { t: 'Fook Sao', d: '„leitende/ kontrollierende/ gebeugte Hand“ – fixieren/fühlen.' },
        { t: 'Pak Sao', d: '„führende/ schlagende Hand“ – ablenkend oder schlagend (Handfläche).' },
        { t: 'Tan Sao', d: '„tragende/ verteilende/ offene Hand“ – ablenkend/abwehrend (Handfläche oben).' },
        { t: 'Bong Sao', d: '„Flügelhand“ – schwingend ablenken.' },
        { t: 'Kao Sao', d: '„offene Hand“ / „Innerer Schwingenarm“' },
        { t: 'Jam Sao', d: '„Sinkender Ellenbogen“ – Struktur stabilisieren, Kraft leiten.' },
        { t: 'Gaun Sao', d: '„schneidende Hand“ / „zeichnender Arm“' },
        { t: 'Gum Sao', d: '„haltende/festnagelnde Hand“ – abwärts gerichtete Kontrolle.' },
        { t: 'Scheren-Gaun', d: 'Kombination aus Gaun Sao und hohem Jam Sao.' }
      ];
      const BEINE = [
        { t: 'Jing Gerk', d: 'Fronttritt.' },
        { t: 'Yap Gerk', d: '„Abdrückendes Bein“ – nach außen abwehrend.' },
        { t: 'Bong Gerk', d: '„Schwingenbein“ – nach innen abwehrend.' }
      ];
      const WEITERE_HAND = [
        { t: 'Lap Sao', d: '„Greifende und ziehende Hand“ – greifen/ziehen, Öffnung schaffen.' },
        { t: 'Man Sao', d: '„Suchende Hand/Fragehand“ – Distanz fühlen, Mittellinie schützen.' },
        { t: 'Wu Sao', d: '„schützende/rückwärtige Hand“ – Schutzposition in der Haltung.' },
        { t: 'Huen Sao', d: '„Zirkelhand“ – zirkelnd ableiten/öffnen.' },
        { t: 'Lan Sao', d: '„Riegelarm/Schildarm“ – abriegeln, seitlich abfangen.' }
      ];
      const WEAPON = [
        { t: 'Kampfstellung', d: 'Grundposition' },
        { t: 'Pak Cuan', d: 'Technik' },
        { t: 'Fook Cuan', d: 'Technik' },
        { t: 'Bong Cuan', d: 'Technik' }
      ];
      const WC_MOTIVATION = [
        'Mittellinie zuerst – der Rest folgt.',
        'Locker bleiben. Struktur halten. Timing finden.',
        'Fühle die Lücke – nicht die Kraft.',
        'Kleine Bewegung, große Wirkung: Ökonomie!',
        'Ellenbogen tief, Haltung klar – Stabilität gewinnt.',
        'Heute zählt Sensitivität: hören mit den Händen.',
        '1% besser: saubere Struktur + sauberes Timing.',
        'Bleib ruhig im Kopf – schnell in der Reaktion.',
        'Kontrolle zuerst. Power kommt aus der Struktur.',
        'Ziel: Präzision. Bonus: Geschwindigkeit.'
      ];

      // OTHER
      const OTHER_KRAFT = [
        { t: 'Liegestütz', d: 'Oberkörper · Rumpfspannung' },
        { t: 'Kniebeuge', d: 'Beine · Hüfte · Stabilität' },
        { t: 'Plank', d: 'Core · Struktur halten' },
        { t: 'Crunches', d: 'Bauch · kontrollierte Wiederholungen' },
        { t: 'Klimmzüge (optional)', d: 'Rücken · Griffkraft' }
      ];
      const OTHER_BOXEN = [
        { t: 'Jab-Cross', d: 'Grundkombination · Rhythmus' },
        { t: 'Hook-Hook', d: 'Rotation · Balance' },
        { t: 'Slip-Roll', d: 'Kopfbewegung · Timing' },
        { t: 'Shadowboxing Runden', d: 'Footwork · Flow' },
        { t: 'Pratzen (optional)', d: 'Trefferbild · Reaktion' }
      ];
      const OTHER_SONST = [
        { t: 'Mobility (Hüfte/Schulter)', d: 'Beweglichkeit · Gelenke' },
        { t: 'Seilspringen', d: 'Warm-up · Kondition' },
        { t: 'Dehnen (Cooldown)', d: 'Regeneration · Range' }
      ];
      const OTHER_MOTIVATION = [
        'Stabiler Körper = bessere Technik.',
        'Kleine Ergänzung, großer Effekt.',
        'Kontrolle vor Tempo – dann beschleunigen.'
      ];

// =========================
// Hinweis: Quiz-Fragen wurden nach quiz.js ausgelagert.
// data.js enthält nur Konfiguration & Inhalte (keine Quiz-Logik).
// =========================
