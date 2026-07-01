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

      // =========================
      // TKD: Glossar – wichtige Begriffe (Dojang)
      // Hinweis: Reine Daten. Darstellung/Logik liegt in app.js (TKD Tab "Glossar").
      // =========================
      const TKD_GLOSSAR = [
        {
          cat: 'Kommandos (Kuryong)',
          items: [
            { k: 'Charyot', u: 'Achtung / Habt acht', d: 'Kommando zum Stillstehen mit geschlossenen Füßen (Fersen zusammen) und den Händen an der Seite. Wird vor der Begrüßung genutzt.' },
            { k: 'Kyong-ne', u: 'Verbeugen', d: 'Aufforderung zum Verbeugen als Zeichen des Respekts vor dem Meister, dem Partner oder den Flaggen.' },
            { k: 'Junbi', u: 'Bereit machen', d: 'Kommando, um die Grundstellung (meist paralleler Stand mit Fäusten vor dem Gürtel) einzunehmen.' },
            { k: 'Sijak', u: 'Los / Start', d: 'Startkommando für eine Übung, einen Formenlauf oder einen Kampf.' },
            { k: 'Kallyo', u: 'Trennen / Unterbrechen', d: 'Kommando des Kampfrichters oder Trainers, um die Kämpfer zu trennen.' },
            { k: 'Kuman', u: 'Ende / Stopp', d: 'Kommando zum Beenden der aktuellen Übung oder des Kampfes.' },
            { k: 'Dwiro-dora', u: 'Umdrehen', d: 'Kommando zum Wechseln der Blickrichtung (180-Grad-Drehung).' },
            { k: 'Swio', u: 'Entspannen / Ausruhen', d: 'Aufforderung, eine lockere Haltung einzunehmen, den Dobok zu richten und sich kurz zu erholen.' },
          ]
        },
        {
          cat: 'Training, Personen & Ausrüstung',
          items: [
            { k: 'Dojang', u: 'Trainingsraum', d: 'Die Halle oder der Raum, in dem das Taekwondo-Training stattfindet. Wörtlich: "Ort des Weges".' },
            { k: 'Dobok', u: 'Taekwondo-Anzug', d: 'Die traditionelle (meist weiße) Trainingskleidung im Taekwondo.' },
            { k: 'Ti', u: 'Gürtel', d: 'Der Gürtel, dessen Farbe den Schüler- (Kup) oder Meistergrad (Dan) anzeigt.' },
            { k: 'Sabum-nim', u: 'Meister / Lehrer', d: 'Respektvolle Anrede für den Taekwondo-Lehrer (meist ab dem 4. Dan).' },
            { k: 'Kyosa-nim', u: 'Trainer', d: 'Anrede für einen Trainer mit einem niedrigeren Dan-Grad (meist 1. bis 3. Dan).' },
            { k: 'Sunbae-nim', u: 'Fortgeschrittener', d: 'Respektvolle Anrede für einen Schüler, der einen höheren Grad hat als man selbst.' },
          ]
        },
        {
          cat: 'Zahlen (Zählen im Training)',
          items: [
            { k: 'Hana', u: 'Eins', d: 'Wird beim gemeinsamen Zählen von Techniken (z. B. Dehnen, Schläge) verwendet.' },
            { k: 'Dul', u: 'Zwei', d: 'Zählwort für 2.' },
            { k: 'Set', u: 'Drei', d: 'Zählwort für 3.' },
            { k: 'Net', u: 'Vier', d: 'Zählwort für 4.' },
            { k: 'Dasot', u: 'Fünf', d: 'Zählwort für 5.' },
            { k: 'Yasot', u: 'Sechs', d: 'Zählwort für 6.' },
            { k: 'Ilgop', u: 'Sieben', d: 'Zählwort für 7.' },
            { k: 'Yodol', u: 'Acht', d: 'Zählwort für 8.' },
            { k: 'Ahop', u: 'Neun', d: 'Zählwort für 9.' },
            { k: 'Yol', u: 'Zehn', d: 'Zählwort für 10.' },
          ]
        },
        {
          cat: 'Körperzonen (Kupso)',
          items: [
            { k: 'Olgul', u: 'Oben / Gesicht', d: 'Zielbereich, der Kopf und Hals umfasst.' },
            { k: 'Momtong', u: 'Mitte / Rumpf', d: 'Zielbereich, der den gesamten Oberkörper vom Hals bis zum Bauchnabel umfasst.' },
            { k: 'Arae', u: 'Unten / Unterleib', d: 'Zielbereich unterhalb des Bauchnabels.' },
          ]
        },
        {
          cat: 'Techniken & Disziplinen',
          items: [
            { k: 'Kihap', u: 'Kampfschrei', d: 'Wörtlich "Vereinigung der Energie". Ein kurzer, lauter Schrei bei Ausführung einer Technik, um die Kraft zu bündeln und Körperspannung aufzubauen.' },
            { k: 'Poomsae', u: 'Formenlauf', d: 'Ein festgelegter Ablauf von Angriffs- und Verteidigungstechniken gegen imaginäre Gegner.' },
            { k: 'Kyorugi', u: 'Freikampf', d: 'Der sportliche Zweikampf nach festgelegten Regeln.' },
            { k: 'Kyokpa', u: 'Bruchtest', d: 'Das Zerschlagen von Brettern oder Steinen zur Demonstration von Technik, Schnelligkeit und Kraft.' },
            { k: 'Chagi', u: 'Tritt', d: 'Allgemeiner Begriff für alle Fußtechniken (z. B. Ap-Chagi = Vorwärtstritt).' },
            { k: 'Makki', u: 'Block', d: 'Allgemeiner Begriff für alle Abwehrtechniken.' },
            { k: 'Jirugi', u: 'Fauststoß', d: 'Gerader Schlag mit der Faust.' },
            { k: 'Chigi', u: 'Schlag', d: 'Kreisförmiger oder peitschender Schlag (oft mit offener Hand oder Handkante).' },
            { k: 'Sogi', u: 'Stellung', d: 'Allgemeiner Begriff für die Fußstellungen (z. B. Ap-Kubi = lange Vorwärtsstellung).' },
          ]
        },
        {
          cat: 'Richtungen & Bewegungsarten',
          items: [
            { k: 'Ap', u: 'Vorwärts', d: 'Bewegung oder Technik direkt nach vorne (z. B. Ap-Chagi).' },
            { k: 'Yop', u: 'Seitwärts', d: 'Bewegung oder Technik zur Seite (z. B. Yop-Chagi).' },
            { k: 'Dwi', u: 'Rückwärts', d: 'Bewegung oder Technik nach hinten (z. B. Dwi-Chagi).' },
            { k: 'Naeryo', u: 'Abwärts', d: 'Bewegung von oben nach unten (z. B. Naeryo-Chagi / Axttritt).' },
            { k: 'Dollyo', u: 'Halbkreisförmig', d: 'Dreh- oder Kreisbewegung (z. B. Dollyo-Chagi / Halbkreisfußtritt).' },
          ]
        }
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
      const OTHER_KICKBOXEN = [
        { t: 'Flow 1', d: 'Front-Kick → High-Roundhouse → Seitenwechsel → Repeat' },
        { t: 'Flow 2', d: 'Jab (links) → Hook (rechts) → Roundhouse (links) → Seitenwechsel → Repeat' },
        { t: 'Flow 3', d: 'Schienbein-Check (links) → Low-kick (links) → Low-kick (rechts) → Jab-Cross-Jab (rechts-links-rechts) → Seitenwechsel → Repeat' }
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
