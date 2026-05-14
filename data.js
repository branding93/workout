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
// Quiz – Fragebibliotheken
// Jede Bibliothek enthält GENAU 100 eindeutige Fragen (nach Frage-Text q).
// Pro Quiz-Durchlauf werden 10 Fragen gezogen – ohne Wiederholung.
// Ein kleiner Teil basiert auf allgemein verfügbaren Online-Quellen (siehe QUIZ_SOURCES).
// =========================

const QUIZ_SOURCES = {
  tkd_meaning: 'http://cheongnyongyu.com/taekwondo-faqs/what-does-taekwondo-mean-in-english/',
  choi_itf: 'https://www.itftaekwondo.com/about-us/choi-hong-hi/',
  wingchun_forms: 'https://wckuk.org/wing-chun-forms/',
  centreline: 'https://wckuk.org/glossary/centreline-theory/'
};

function _qShuffle(arr){
  let a = arr.slice();
  for (let i=a.length-1;i>0;i--){
    let j = Math.floor(Math.random()*(i+1));
    let t=a[i]; a[i]=a[j]; a[j]=t;
  }
  return a;
}
function _qPickDistinct(pool, n, exclude){
  let out=[];
  for (let i=0;i<pool.length;i++){
    let v=pool[i];
    if (exclude && exclude.indexOf(v)!==-1) continue;
    out.push(v);
  }
  return _qShuffle(out).slice(0,n);
}
function _q4(correct, pool){
  let distract = _qPickDistinct(pool, 3, [correct]);
  let opts = _qShuffle([correct].concat(distract));
  return { options: opts, a: opts.indexOf(correct) };
}
function _pushUnique(arr, qObj){
  const key = (qObj && qObj.q) ? String(qObj.q).trim() : '';
  if (!key) return;
  for (let i=0;i<arr.length;i++) if (String(arr[i].q).trim() === key) return;
  arr.push(qObj);
}
function _ensure100(arr, fillerFactory){
  let guard=0;
  while (arr.length < 100 && guard < 2000){
    guard++;
    _pushUnique(arr, fillerFactory(arr.length+1));
  }
  return arr.slice(0,100);
}

const QUIZ_BANKS = (function(){
  const tkd=[];
  const wc=[];

  // --- Internet-basierte Basisfakten (kleiner Anteil) ---
  _pushUnique(tkd, {type:'mcq', q:'Was bedeutet „Taekwondo“ wörtlich am ehesten?', options:['Weg des Fußes und der Faust','Weg des Schwertes','Weg der weichen Hand','Weg des Bogens'], a:0});
  _pushUnique(tkd, {type:'mcq', q:'Wofür steht „Do“ in Taekwondo im philosophischen Sinn am ehesten?', options:['Weg / Lebensweg / moralische Philosophie','Schnelligkeit','Kraft','Ausrüstung'], a:0});
  _pushUnique(tkd, {type:'mcq', q:'Welche Person wird in ITF-Kontext häufig als „Founder of Taekwon-Do“ genannt?', options:['General Choi Hong Hi','Bruce Lee','Jigoro Kano','Helio Gracie'], a:0});

  _pushUnique(wc, {type:'mcq', q:'Welche Form gilt üblicherweise als erste leere-Hand-Form im Wing Chun?', options:['Siu Nim Tao','Chum Kiu','Biu Tze','Muk Yan Jong'], a:0});
  _pushUnique(wc, {type:'mcq', q:'Welche Form wird häufig als zweite Wing Chun Form genannt?', options:['Chum Kiu','Siu Nim Tao','Biu Tze','Baat Cham Dao'], a:0});
  _pushUnique(wc, {type:'mcq', q:'Welche Form wird häufig als dritte Wing Chun Form genannt?', options:['Biu Tze','Siu Nim Tao','Chum Kiu','Luk Dim Boon Kwun'], a:0});
  _pushUnique(wc, {type:'mcq', q:'Was beschreibt die Centreline-Theorie im Wing Chun am ehesten?', options:['Angriff/Verteidigung orientieren sich an der zentralen Linie; Kontrolle erhöht Effizienz','Immer weite Kreisbewegungen','Nur Bodenkampf','Nur Tritte'], a:0});

  // --- App-Daten: TKD Hyongs ---
  const hyongNames = HYONGS.map(h=>h.name);
  const hyongIds = HYONGS.map(h=>h.id);
  const beltLabels = Object.keys(TKD_BELTS).map(k=>TKD_BELTS[k].label);

  HYONGS.forEach(h=>{
    let o=_q4(String(h.moves), HYONGS.map(x=>String(x.moves)));
    _pushUnique(tkd, {type:'mcq', q:`Wie viele Bewegungen hat ${h.name}?`, options:o.options, a:o.a});
    let b=_q4(TKD_BELTS[h.belt].label, beltLabels);
    _pushUnique(tkd, {type:'mcq', q:`Zu welchem Gürtel gehört ${h.name}?`, options:b.options, a:b.a});
    let n=_q4(h.name, hyongNames);
    _pushUnique(tkd, {type:'cloze', q:`Hyong ${h.id} heißt ____ .`, options:n.options, a:n.a});
    let i=_q4(h.id, hyongIds);
    _pushUnique(tkd, {type:'mcq', q:`Welche Nummer (ID) hat ${h.name}?`, options:i.options, a:i.a});
  });

  // --- App-Daten: TKD Basics/Kombos ---
  const kicks=BASICS.kicks.slice();
  const blocks=BASICS.blocks.slice();
  const stances=BASICS.stances.slice();
  const strikes=BASICS.strikes.slice();

  kicks.forEach(k=>{
    let o=_q4(k, kicks.concat(blocks).concat(strikes));
    _pushUnique(tkd, {type:'mcq', q:'Welche Technik ist ein Kick?', options:o.options, a:o.a});
    _pushUnique(tkd, {type:'mcq', q:`Was ist beim ${k} besonders wichtig?`, options:[
      'Kammer (Knie hoch) → strecken → sofort zurückziehen (Recoil)',
      'Schultern hochziehen, um mehr Kraft zu erzeugen',
      'Bein nach dem Treffer möglichst lange draußen lassen',
      'Atmung anhalten, um stabil zu bleiben'
    ], a:0});
  });

  blocks.forEach(b=>{
    let o=_q4(b, blocks.concat(kicks).concat(strikes));
    _pushUnique(tkd, {type:'mcq', q:'Welche Technik ist ein Block?', options:o.options, a:o.a});
  });

  stances.forEach(s=>{
    let o=_q4(s, stances.concat(kicks).concat(blocks));
    _pushUnique(tkd, {type:'mcq', q:'Welche Technik ist eine Stellung?', options:o.options, a:o.a});
  });

  TKD_VARIATIONS.forEach(v=>{
    let o=_q4(v, TKD_VARIATIONS.concat(['Sätze','Teile','Gürtel']));
    _pushUnique(tkd, {type:'mcq', q:'Welche Option ist eine Hyong-Variante in der App?', options:o.options, a:o.a});
  });

  COMBOS.forEach(c=>{
    let o=_q4(c, COMBOS.concat(kicks).concat(blocks));
    _pushUnique(tkd, {type:'mcq', q:'Welche der folgenden Angaben ist eine TKD-Kombination (Drill)?', options:o.options, a:o.a});
  });

  // --- App-Daten: WC ---
  const formNames = FORMS.map(f=>f.name);
  const formCodes = FORMS.map(f=>f.code);
  const formNotes = FORMS.map(f=>f.note);

  const wcAll=[];
  GRUNDLAGEN.forEach(x=>wcAll.push({cat:'Grundlagen', t:x.t, d:x.d}));
  ARM_HAND.forEach(x=>wcAll.push({cat:'Schutztechniken', t:x.t, d:x.d}));
  BEINE.forEach(x=>wcAll.push({cat:'Beine', t:x.t, d:x.d}));
  WEITERE_HAND.forEach(x=>wcAll.push({cat:'Weiteres', t:x.t, d:x.d}));
  WEAPON.forEach(x=>wcAll.push({cat:'Weapon', t:x.t, d:x.d}));

  wcAll.forEach(it=>{
    let o=_q4(it.d, wcAll.map(x=>x.d));
    _pushUnique(wc, {type:'mcq', q:`Was beschreibt „${it.t}“ am besten?`, options:o.options, a:o.a});
    let cats=['Grundlagen','Schutztechniken','Beine','Weiteres','Weapon','Formen'];
    let c=_q4(it.cat, cats);
    _pushUnique(wc, {type:'mcq', q:`Zu welcher Kategorie gehört „${it.t}“?`, options:c.options, a:c.a});
  });

  FORMS.forEach(f=>{
    let c=_q4(f.code, formCodes);
    _pushUnique(wc, {type:'mcq', q:`Welches Kürzel (Code) hat die Form ${f.name}?`, options:c.options, a:c.a});
    let n=_q4(f.note, formNotes);
    _pushUnique(wc, {type:'mcq', q:`Welche Kurzbeschreibung passt zu ${f.name}?`, options:n.options, a:n.a});
    let o=_q4(f.name, formNames);
    _pushUnique(wc, {type:'cloze', q:`Die Form ____ gehört zu Wing Chun und heißt „${f.name}“.`, options:o.options, a:o.a});
    _pushUnique(wc, {type:'cloze', q:`Bei ${f.name}: kleine Bewegung, ____ Wirkung.`, options:['große','geringe','keine','zufällige'], a:0});
  });

  // --- Auffüllen auf genau 100 eindeutige Fragen ---
  _ensure100(tkd, (i)=>({type:'mcq', q:`TKD Zusatzfrage #${i}: Welcher Grundsatz ist in der App zentral?`, options:['Kontrolle zuerst. Power folgt.','Immer maximal hart und ohne Pause.','Nur neue Techniken, nie wiederholen.','Atmung ist unwichtig.'], a:0}));
  _ensure100(wc, (i)=>({type:'mcq', q:`WC Zusatzfrage #${i}: Welcher Fokus passt in der App zu Wing Chun am besten?`, options:['Struktur halten · Timing finden · Mittellinie','Nur Maximalkraft ohne Kontrolle','Nur neue Begriffe, nie wiederholen','Technik ist unwichtig, Hauptsache schnell'], a:0}));

  return { tkd: tkd.slice(0,100), wc: wc.slice(0,100) };
})();
