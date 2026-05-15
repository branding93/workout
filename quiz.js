/* quiz.js – Quiz-Fragen (TKD & Wing Chun) – Mix aus App-Inhalten + allgemeinen Grundlagen
   Export: window.QUIZ_BANKS = { tkd: [...200], wc: [...200] }

   Designziele (gemäß Anforderung):
   - genau 200 Fragen je Disziplin (100 mcq + 100 cloze)
   - deutlich weniger "Hyong-Nummer/Position"-Fragen, dafür mehr allgemeine & interessante TKD/WC-Fragen
   - jede Frage nur einmal (Dedup über Fragetext)
   - eindeutig & sinnvoll, keine Platzhalter/"Set XX"-Fragen

   Hinweis: Die allgemeinen Fragen sind offline im Code hinterlegt (kein Internetzugriff zur Laufzeit nötig).
*/
(function () {
  'use strict';

  // ---------- helpers ----------
  function asArr(x) { return Array.isArray(x) ? x : []; }
  function safeStr(x) { return String(x == null ? '' : x); }

  function uniq(arr) {
    var out = [];
    var seen = new Set();
    asArr(arr).forEach(function (v) {
      var s = safeStr(v).trim();
      if (!s) return;
      if (!seen.has(s)) { seen.add(s); out.push(s); }
    });
    return out;
  }

  function shuffle(arr) {
    var a = asArr(arr).slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pick(pool, n, exclude) {
    var ex = new Set(asArr(exclude).map(function (x) { return safeStr(x); }));
    var p = uniq(pool).filter(function (x) { return !ex.has(safeStr(x)); });
    return shuffle(p).slice(0, n);
  }

  // Erzeugt 4 Antwortoptionen (1 korrekt + 3 Distraktoren), garantiert unique.
  function makeOptions(correct, wrongPool, fallbackPool) {
    var c = safeStr(correct).trim();
    var wrong = pick(wrongPool, 3, [c]);

    if (wrong.length < 3) {
      var extra = pick(uniq(asArr(fallbackPool).concat(wrongPool)), 40, [c].concat(wrong));
      while (wrong.length < 3 && extra.length) wrong.push(extra.shift());
    }

    var emergency = ['Struktur', 'Timing', 'Distanz', 'Balance', 'Mittellinie', 'Deckung', 'Hüfte', 'Atmung'];
    while (wrong.length < 3) {
      var e = pick(emergency, 1, [c].concat(wrong));
      wrong.push(e.length ? e[0] : ('Option ' + (wrong.length + 1)));
    }

    var opts = uniq([c].concat(wrong));
    if (opts.length > 4) opts = opts.slice(0, 4);
    while (opts.length < 4) {
      var add = pick(uniq(asArr(fallbackPool).concat(wrongPool, emergency)), 1, opts);
      opts.push(add.length ? add[0] : ('Option ' + (opts.length + 1)));
      opts = uniq(opts);
    }

    opts = shuffle(opts);
    var a = opts.indexOf(c);
    if (a < 0) { opts[0] = c; a = 0; }

    if (new Set(opts.map(safeStr)).size !== 4) {
      opts = uniq(opts).slice(0, 4);
      while (opts.length < 4) opts.push('Option ' + (opts.length + 1));
      a = opts.indexOf(c);
      if (a < 0) { opts[0] = c; a = 0; }
    }
    return { options: opts, a: a };
  }

  function addQ(targetList, seenQ, type, q, correct, wrongPool, fallbackPool) {
    q = safeStr(q).trim();
    if (!q || seenQ.has(q)) return false;
    var o = makeOptions(correct, wrongPool, fallbackPool);
    if (!o || !o.options || o.options.length !== 4) return false;
    if (new Set(o.options.map(safeStr)).size !== 4) return false;
    targetList.push({ type: type, q: q, options: o.options, a: o.a });
    seenQ.add(q);
    return true;
  }

  function fillTo(targetList, seenQ, desiredCount, genFn) {
    var guard = 0;
    while (targetList.length < desiredCount && guard < 8000) {
      guard++;
      if (!genFn()) break;
    }
  }

  function finalize(mcq, clz) {
    mcq = mcq.slice(0, 100);
    clz = clz.slice(0, 100);
    return mcq.concat(clz);
  }

  // ---------- data from data.js (falls vorhanden) ----------
  var HY = (typeof HYONGS !== 'undefined') ? asArr(HYONGS) : [];
  var BAS = (typeof BASICS !== 'undefined' && BASICS) ? BASICS : { kicks: [], blocks: [], strikes: [], stances: [], overview: [] };
  var COMB = (typeof COMBOS !== 'undefined') ? asArr(COMBOS) : [];
  var SPAR = (typeof SPARRING !== 'undefined') ? asArr(SPARRING) : [];
  var TKD_VAR = (typeof TKD_VARIATIONS !== 'undefined') ? asArr(TKD_VARIATIONS) : [];
  var TKD_BELT_OBJ = (typeof TKD_BELTS !== 'undefined' && TKD_BELTS) ? TKD_BELTS : {};

  var FORMS_ = (typeof FORMS !== 'undefined') ? asArr(FORMS) : [];
  var WC_VAR = (typeof WC_VARIATIONS !== 'undefined') ? asArr(WC_VARIATIONS) : [];
  var WC_LEVEL_OBJ = (typeof WC_LEVELS !== 'undefined' && WC_LEVELS) ? WC_LEVELS : {};

  var GR = (typeof GRUNDLAGEN !== 'undefined') ? asArr(GRUNDLAGEN) : [];
  var AH = (typeof ARM_HAND !== 'undefined') ? asArr(ARM_HAND) : [];
  var BN = (typeof BEINE !== 'undefined') ? asArr(BEINE) : [];
  var WH = (typeof WEITERE_HAND !== 'undefined') ? asArr(WEITERE_HAND) : [];
  var WP = (typeof WEAPON !== 'undefined') ? asArr(WEAPON) : [];

  function beltLabel(key) {
    key = safeStr(key);
    try { return (TKD_BELT_OBJ[key] && TKD_BELT_OBJ[key].label) ? TKD_BELT_OBJ[key].label : key; }
    catch (_) { return key; }
  }
  function levelLabel(key) {
    key = safeStr(key);
    try { return (WC_LEVEL_OBJ[key] && WC_LEVEL_OBJ[key].label) ? WC_LEVEL_OBJ[key].label : key; }
    catch (_) { return key; }
  }

  function wcTitles(arr) { return uniq(asArr(arr).map(function (x) { return x && x.t; })); }
  function wcDescs(arr) { return uniq(asArr(arr).map(function (x) { return x && x.d; })); }

  var tkdKicks = uniq(asArr(BAS.kicks));
  var tkdBlocks = uniq(asArr(BAS.blocks));
  var tkdStrikes = uniq(asArr(BAS.strikes));
  var tkdStances = uniq(asArr(BAS.stances));
  var hyNames = uniq(HY.map(function (h) { return h && h.name; }));
  var hyMoves = uniq(HY.map(function (h) { return h && String(h.moves); }));
  var beltLabels = uniq(Object.keys(TKD_BELT_OBJ || {}).map(beltLabel));

  var wcCats = [
    { key: 'Grundlagen', items: GR },
    { key: 'Schutztechniken', items: AH },
    { key: 'Beine', items: BN },
    { key: 'Weiteres', items: WH },
    { key: 'Weapon', items: WP }
  ];
  var wcCatNames = wcCats.map(function (c) { return c.key; });
  var wcAllTitles = uniq(wcCats.reduce(function (acc, c) { return acc.concat(wcTitles(c.items)); }, []));
  var wcAllDescs = uniq(wcCats.reduce(function (acc, c) { return acc.concat(wcDescs(c.items)); }, []));
  var formNames = uniq(FORMS_.map(function (f) { return f && f.name; }));
  var formCodes = uniq(FORMS_.map(function (f) { return f && f.code; }));
  var levelLabels = uniq(Object.keys(WC_LEVEL_OBJ || {}).map(levelLabel));

  // ---------- Allgemeine ("Internet"-)Wissensfragen: Taekwondo ----------
  // Fokus: Prinzipien, Training, Technik-Qualität, bekannte Begriffe – ohne Verbands-/Regel-Detailstreit.
  var TKD_TENETS = ['Courtesy', 'Integrity', 'Perseverance', 'Self-Control', 'Indomitable Spirit'];
  var TKD_GENERAL_CONCEPTS = [
    'Stand', 'Balance', 'Hüftrotation', 'Atmung', 'Deckung', 'Timing', 'Distanz', 'Präzision', 'Kontrolle',
    'Kammer (Knie hoch)', 'Recoil (Zurückziehen)', 'Blickführung', 'Spannung dosieren', 'Explosivität'
  ];
  var TKD_TARGETS = ['Kopf', 'Rumpf', 'Solarplexus', 'Kinn', 'Oberschenkel (Low)', 'Rippen'];

  var TKD_GENERAL = [
    // Tenets
    { type:'mcq', q:'Welche Kombination entspricht den fünf Grundsätzen (Tenets) im Taekwondo?', correct:'Courtesy · Integrity · Perseverance · Self-Control · Indomitable Spirit', wrong:['Respekt · Kraft · Schnelligkeit · Sieg · Ehre','Mut · Technik · Ausdauer · Tradition · Ruhm','Balance · Timing · Distanz · Reaktion · Härte'] },
    { type:'cloze', q:'Lückentext (TKD): Einer der fünf Tenets heißt _____.', correct:'Integrity', wrong:TKD_GENERAL_CONCEPTS },
    { type:'cloze', q:'Lückentext (TKD): Einer der fünf Tenets heißt _____.', correct:'Perseverance', wrong:TKD_GENERAL_CONCEPTS },
    { type:'cloze', q:'Lückentext (TKD): Einer der fünf Tenets heißt _____.', correct:'Self-Control', wrong:TKD_GENERAL_CONCEPTS },
    { type:'cloze', q:'Lückentext (TKD): Einer der fünf Tenets heißt _____.', correct:'Courtesy', wrong:TKD_GENERAL_CONCEPTS },
    { type:'cloze', q:'Lückentext (TKD): Einer der fünf Tenets heißt _____.', correct:'Indomitable Spirit', wrong:TKD_GENERAL_CONCEPTS },

    // Technik-Qualität
    { type:'mcq', q:'Was ist beim Kicken meist der wichtigste erste Schritt für saubere Technik?', correct:'Kammer (Knie hoch)', wrong:['Arme fallen lassen','Oberkörper nach vorn kippen','Mit maximaler Kraft sofort durchdrücken'] },
    { type:'mcq', q:'Warum zieht man den Kick nach dem Treffer schnell zurück (Recoil)?', correct:'Kontrolle und schneller Folgeschritt (keine offene Linie)', wrong:['Damit der Kick leiser ist','Damit man weiter nach vorne fällt','Damit die Hüfte nicht arbeitet'] },
    { type:'mcq', q:'Welche Trefferfläche ist beim klassischen Seittritt typischerweise vorgesehen?', correct:'Ferse', wrong:['Zehenspitzen','Handkante','Ellenbogen'] },
    { type:'mcq', q:'Welche Aussage passt am besten zu „Präzision vor Power“?', correct:'Erst sauber treffen – dann Geschwindigkeit und Kraft steigern', wrong:['Immer maximal hart treten','Nur möglichst hoch kicken','Niemals langsam üben'] },

    // Training & Sicherheit
    { type:'mcq', q:'Welche Eigenschaft ist im Sparring besonders wichtig, um sicher zu trainieren?', correct:'Selbstkontrolle', wrong:['Aggressivität','Unberechenbarkeit','Schmerz ignorieren'] },
    { type:'mcq', q:'Was hilft am stärksten gegen wackelige Kicks?', correct:'Balance + stabiler Standfuß', wrong:['Nur Armkraft','Nur schneller werden','Augen schließen'] },

    // Begriffe
    { type:'mcq', q:'Taekwondo ist weltweit besonders bekannt für …', correct:'Kicks (Fußtechniken)', wrong:['Ausschließlich Bodenkampf','Waffenformen als Hauptfokus','Nur Würfe/Griffe'] },
    { type:'mcq', q:'Welche Kombination beschreibt gutes Techniktraining am besten?', correct:'langsam sauber → dann schneller', wrong:['schnell unsauber → dann stoppen','nur Kraft → ohne Kontrolle','nur Dehnen → keine Wiederholungen'] },

    // Lückentexte – Konzepte
    { type:'cloze', q:'Lückentext (TKD): Ein stabiler ____ macht jeden Kick besser.', correct:'Stand', wrong:['Ellenbogen','Schulter','Zirkel'] },
    { type:'cloze', q:'Lückentext (TKD): Ohne ____ leidet die Kick-Höhe und Kontrolle.', correct:'Balance', wrong:['Lautstärke','Schmerz','Zufall'] },
    { type:'cloze', q:'Lückentext (TKD): Gute Kicks kommen oft aus der _____.', correct:'Hüftrotation', wrong:['Nackenmuskulatur','Handgelenk','Zehenspitze'] },

    // Zielzonen (allgemein, ohne Verbandsregeln)
    { type:'mcq', q:'Welche Zielzone ist bei vielen Kampfsportarten (je nach Situation) ein klassischer Bereich für Kicks?', correct:'Rumpf', wrong:['Hinterkopf','Finger','Ellenbogenspitze'] },
    { type:'cloze', q:'Lückentext (TKD): Für saubere Technik ist kontrollierte ____ wichtiger als blindes Tempo.', correct:'Präzision', wrong:['Lautstärke','Wut','Zufall'] }
  ];

  // Wir erzeugen daraus zusätzliche (unique) Fragen, indem wir Variationen erstellen.
  function expandTKDGeneral(){
    var out = [];
    var ten = TKD_TENETS.slice();
    // MCQ: "Welcher Begriff gehört zu den Tenets?" je Tenet
    ten.forEach(function(t){
      out.push({ type:'mcq', q:'Welcher Begriff gehört zu den fünf Tenets im Taekwondo?', correct:t, wrong:['Flexibilität','Reichweite','Kata','Grappling','Schattenboxen','K.O.'] });
    });
    // MCQ: Konzepte -> Definition
    var defs = [
      {k:'Kammer (Knie hoch)', d:'Knie anheben und Kick vorbereiten'},
      {k:'Recoil (Zurückziehen)', d:'Nach dem Treffer zügig zurück in die Ausgangsposition'},
      {k:'Timing', d:'Richtiger Moment für Angriff/Abwehr'},
      {k:'Distanz', d:'Abstand so wählen, dass Technik sauber trifft'},
      {k:'Deckung', d:'Schutzposition der Hände/Arme'},
      {k:'Balance', d:'Stabilität auf dem Standbein'}
    ];
    var defTexts = defs.map(function(x){return x.d;});
    defs.forEach(function(x){
      out.push({ type:'mcq', q:'Welche Beschreibung passt am besten zu „'+x.k+'“?', correct:x.d, wrong:defTexts });
      out.push({ type:'cloze', q:'Lückentext (TKD): „'+x.k+'“ bedeutet: _____.', correct:x.d, wrong:defTexts });
    });

    // MCQ: Trefferflächen
    var surfaces = [
      {kick:'Fronttritt', s:'Ballen/Footballen'},
      {kick:'Rundtritt', s:'Spann/Rist oder Ballen (je nach Stil)'},
      {kick:'Seittritt', s:'Ferse'}
    ];
    var surfacePool = surfaces.map(function(x){return x.s;}).concat(['Schienbein','Handkante','Ellenbogen']);
    surfaces.forEach(function(x){
      out.push({ type:'mcq', q:'Welche Trefferfläche passt typischerweise zum '+x.kick+'?', correct:x.s, wrong:surfacePool });
      out.push({ type:'cloze', q:'Lückentext (TKD): Beim '+x.kick+' trifft man typischerweise mit _____.', correct:x.s, wrong:surfacePool });
    });

    // Lückentext: Trainings-Pattern
    var patterns = [
      {q:'Gute Technik entsteht durch ____ Üben.', a:'langsam'},
      {q:'Ein Kick wird stabiler, wenn der ____ sicher steht.', a:'Standfuß'},
      {q:'Saubere Kicks brauchen: Kammer → ____ → Recoil.', a:'Treffer'}
    ];
    patterns.forEach(function(p){
      out.push({ type:'cloze', q:'Lückentext (TKD): '+p.q, correct:p.a, wrong:['laut','wild','zufällig','hart','ohne'] });
    });

    return out;
  }

  // ---------- Allgemeine ("Internet"-)Wissensfragen: Wing Chun ----------
  var WC_PRINCIPLES = [
    'Centerline Theory',
    'Economy of Motion',
    'Simultaneous Attack and Defense',
    'Sensitivity (Chi Sao)',
    'Structure & Balance'
  ];

  var WC_GENERAL = [
    { type:'mcq', q:'Was beschreibt die „Centerline“-Idee im Wing Chun am besten?', correct:'Angriff & Schutz entlang der zentralen Linie (kürzester Weg)', wrong:['Nur hohe Kicks','Nur große Kreisbewegungen','Nur Bodenkampf'] },
    { type:'mcq', q:'Was bedeutet „Economy of Motion“ im Wing Chun?', correct:'So kurz und direkt wie möglich bewegen', wrong:['Extra große Ausholbewegungen','Nur mit Kraft arbeiten','Immer zurückweichen'] },
    { type:'mcq', q:'Was ist das Hauptziel von Chi Sao (Sticky Hands)?', correct:'Sensitivität/Reflexe durch Kontakt entwickeln', wrong:['Ausdauerlauf trainieren','Waffenwechsel üben','Kicks auf Distanz üben'] },
    { type:'mcq', q:'Was bedeutet „Simultaneous Attack and Defense“ im Wing Chun?', correct:'Angriff und Abwehr in einer Aktion verbinden', wrong:['Erst blocken, dann lange warten','Nur ausweichen ohne Treffer','Nur harte Blocks'] },

    { type:'cloze', q:'Lückentext (WC): Chi Sao heißt wörtlich „_____ Hands“.', correct:'Sticky', wrong:['Flying','Open','Cold','Fast'] },
    { type:'cloze', q:'Lückentext (WC): Das Prinzip „Economy of Motion“ meint kurze, ____ Bewegungen.', correct:'direkte', wrong:['weite','komplizierte','zufällige','laute'] },
    { type:'cloze', q:'Lückentext (WC): Die „Centerline“ ist eine gedachte ____ Linie durch den Körper.', correct:'vertikale', wrong:['diagonale','horizontale','kreisförmige'] },

    // Formen (allgemein)
    { type:'mcq', q:'Welche Aussage passt am besten zur ersten Wing-Chun-Form „Siu Nim Tao“?', correct:'Grundlage: Struktur, Handpositionen, Ruhe/Entspannung', wrong:['Nur Sprünge und Kicks','Waffenform','Nur Bodenkampf'] },
    { type:'mcq', q:'Welche Aussage passt am besten zur zweiten Form „Chum Kiu“?', correct:'Bewegung/Footwork und „Bridge“ (Kontakt finden)', wrong:['Nur Meditation','Nur Waffen','Nur Grappling'] },
    { type:'mcq', q:'„Biu Jee“ wird häufig beschrieben als …', correct:'fortgeschrittene/Notfall- & Recovery-Ideen', wrong:['reine Anfängerform','nur Stand ohne Hände','ausschließlich Kick-Form'] },

    { type:'cloze', q:'Lückentext (WC): „Siu Nim Tao“ wird oft als ____-Form (Foundation) beschrieben.', correct:'Basis', wrong:['Sprung','Waffen','Akrobatik'] },
    { type:'cloze', q:'Lückentext (WC): „Chum Kiu“ betont Körperbewegung und ____.', correct:'Schritte', wrong:['Kopfsprünge','Rollen','Dehnen'] }
  ];

  function expandWCGeneral(){
    var out=[];
    // MCQ: Welches Prinzip gehört dazu?
    WC_PRINCIPLES.forEach(function(p){
      out.push({ type:'mcq', q:'Welches der folgenden Elemente ist ein Kernprinzip im Wing Chun?', correct:p, wrong:['Kata (Karate)','Grappling-only','Aikido-Würfe','Freestyle Akrobatik','Powerlifting'] });
    });
    // Def-Checks
    var defs=[
      {k:'Centerline Theory', d:'Fokus auf die zentrale Linie (kürzester Weg) für Angriff und Schutz'},
      {k:'Economy of Motion', d:'Unnötige Bewegungen vermeiden – direkt und effizient'},
      {k:'Simultaneous Attack and Defense', d:'Gleichzeitig abwehren und treffen'},
      {k:'Chi Sao', d:'Kontakt-Drill zur Sensitivitäts- und Reflexschulung'}
    ];
    var defPool = defs.map(function(x){return x.d;}).concat(['Sehr große Ausholer','Nur Distanzkicks','Nur Konditionstraining']);
    defs.forEach(function(x){
      out.push({ type:'mcq', q:'Welche Beschreibung passt zu „'+x.k+'“?', correct:x.d, wrong:defPool });
      out.push({ type:'cloze', q:'Lückentext (WC): „'+x.k+'“ bedeutet: _____.', correct:x.d, wrong:defPool });
    });
    return out;
  }

  // ---------- Builders ----------
  function buildTKD() {
    var seenQ = new Set();
    var mcq = [];
    var clz = [];

    // A) Allgemeine Fragen (priorisiert)
    var gen = TKD_GENERAL.concat(expandTKDGeneral());
    gen.forEach(function(it){
      if(it.type==='mcq') addQ(mcq, seenQ, 'mcq', it.q, it.correct, it.wrong || [], (it.wrong || []).concat(TKD_GENERAL_CONCEPTS, TKD_TENETS));
      else addQ(clz, seenQ, 'cloze', it.q, it.correct, it.wrong || [], (it.wrong || []).concat(TKD_GENERAL_CONCEPTS, TKD_TENETS));
    });

    // B) App-Daten – aber reduziert (keine Positions-/ID-Orgie)
    // Basics Kategorien
    tkdKicks.forEach(function (t) {
      addQ(mcq, seenQ, 'mcq', 'Zu welcher Kategorie gehört "' + t + '" (TKD)?', 'Kick', ['Block', 'Schlag', 'Stellung'], ['Kick', 'Block', 'Schlag', 'Stellung']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + t + '" ist ein _____.', 'Kick', ['Block', 'Schlag', 'Stellung'], ['Kick', 'Block', 'Schlag', 'Stellung']);
    });
    tkdBlocks.forEach(function (t) {
      addQ(mcq, seenQ, 'mcq', 'Zu welcher Kategorie gehört "' + t + '" (TKD)?', 'Block', ['Kick', 'Schlag', 'Stellung'], ['Kick', 'Block', 'Schlag', 'Stellung']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + t + '" ist ein _____.', 'Block', ['Kick', 'Schlag', 'Stellung'], ['Kick', 'Block', 'Schlag', 'Stellung']);
    });
    tkdStrikes.forEach(function (t) {
      addQ(mcq, seenQ, 'mcq', 'Zu welcher Kategorie gehört "' + t + '" (TKD)?', 'Schlag', ['Kick', 'Block', 'Stellung'], ['Kick', 'Block', 'Schlag', 'Stellung']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + t + '" ist ein _____.', 'Schlag', ['Kick', 'Block', 'Stellung'], ['Kick', 'Block', 'Schlag', 'Stellung']);
    });
    tkdStances.forEach(function (t) {
      addQ(mcq, seenQ, 'mcq', 'Zu welcher Kategorie gehört "' + t + '" (TKD)?', 'Stellung', ['Kick', 'Block', 'Schlag'], ['Kick', 'Block', 'Schlag', 'Stellung']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + t + '" ist eine _____.', 'Stellung', ['Kick', 'Block', 'Schlag'], ['Kick', 'Block', 'Schlag', 'Stellung']);
    });

    // Hyongs: nur Moves + Gürtel (max. 1-2 Fragen pro Hyong je Typ)
    HY.forEach(function (h) {
      if (!h || !h.name) return;
      var b = beltLabel(h.belt);
      addQ(mcq, seenQ, 'mcq', 'Wie viele Bewegungen hat die Hyong "' + h.name + '"?', String(h.moves), hyMoves, hyMoves);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + h.name + '" hat ____ Bewegungen.', String(h.moves), hyMoves, hyMoves);

      if (b) {
        addQ(mcq, seenQ, 'mcq', 'Zu welchem Gürtel gehört die Hyong "' + h.name + '"?', b, beltLabels, beltLabels);
        addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + h.name + '" gehört zum Gürtel _____.', b, beltLabels, beltLabels);
      }
    });

    // Kombos/Sparring – Typ
    COMB.forEach(function (c) {
      addQ(mcq, seenQ, 'mcq', 'Was ist "' + c + '" in der App (TKD)?', 'Kombination', ['Hyong', 'Grundübung', 'Sparring', 'Hyong-Variante'], ['Kombination', 'Hyong', 'Grundübung', 'Sparring', 'Hyong-Variante']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + c + '" ist eine _____.', 'Kombination', ['Hyong', 'Grundübung', 'Sparring', 'Hyong-Variante'], ['Kombination', 'Hyong', 'Grundübung', 'Sparring', 'Hyong-Variante']);
    });
    SPAR.forEach(function (s) {
      addQ(mcq, seenQ, 'mcq', 'Was ist "' + s + '" in der App (TKD)?', 'Sparring', ['Hyong', 'Grundübung', 'Kombination', 'Hyong-Variante'], ['Sparring', 'Hyong', 'Grundübung', 'Kombination', 'Hyong-Variante']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + s + '" ist ein _____.', 'Sparring', ['Hyong', 'Grundübung', 'Kombination', 'Hyong-Variante'], ['Sparring', 'Hyong', 'Grundübung', 'Kombination', 'Hyong-Variante']);
    });

    // C) Fillers: falls noch nicht voll – inhaltlich sauber (keine Hyong-Nummer-Serien)
    var tkdTypePool = ['Kick', 'Block', 'Schlag', 'Stellung', 'Hyong', 'Kombination', 'Sparring', 'Hyong-Variante', 'Gürtel', 'Grundübung'];
    var tkdAllTerms = uniq(tkdKicks.concat(tkdBlocks, tkdStrikes, tkdStances, hyNames, COMB, SPAR, TKD_VAR, beltLabels));
    var typeFillTerms = shuffle(tkdAllTerms).concat(shuffle(tkdAllTerms));

    function tkdKindOf(term) {
      if (tkdKicks.indexOf(term) >= 0) return 'Kick';
      if (tkdBlocks.indexOf(term) >= 0) return 'Block';
      if (tkdStrikes.indexOf(term) >= 0) return 'Schlag';
      if (tkdStances.indexOf(term) >= 0) return 'Stellung';
      if (hyNames.indexOf(term) >= 0) return 'Hyong';
      if (COMB.indexOf(term) >= 0) return 'Kombination';
      if (SPAR.indexOf(term) >= 0) return 'Sparring';
      if (TKD_VAR.indexOf(term) >= 0) return 'Hyong-Variante';
      if (beltLabels.indexOf(term) >= 0) return 'Gürtel';
      return 'Grundübung';
    }

    fillTo(mcq, seenQ, 100, function () {
      var term = typeFillTerms.length ? typeFillTerms.shift() : null;
      if (!term) return false;
      var corr = tkdKindOf(term);
      return addQ(mcq, seenQ, 'mcq', 'Worum handelt es sich bei "' + term + '" (TKD)?', corr, tkdTypePool, tkdTypePool);
    });

    fillTo(clz, seenQ, 100, function () {
      var term = typeFillTerms.length ? typeFillTerms.shift() : null;
      if (!term) return false;
      var corr = tkdKindOf(term);
      return addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + term + '" ist ein/e _____.', corr, tkdTypePool, tkdTypePool);
    });

    return finalize(mcq, clz);
  }

  function buildWC() {
    var seenQ = new Set();
    var mcq = [];
    var clz = [];

    // A) Allgemeine Fragen (priorisiert)
    var gen = WC_GENERAL.concat(expandWCGeneral());
    gen.forEach(function(it){
      if(it.type==='mcq') addQ(mcq, seenQ, 'mcq', it.q, it.correct, it.wrong || [], (it.wrong || []).concat(WC_PRINCIPLES));
      else addQ(clz, seenQ, 'cloze', it.q, it.correct, it.wrong || [], (it.wrong || []).concat(WC_PRINCIPLES));
    });

    // B) App-Daten: Formen + Techniken + Beschreibungen
    FORMS_.forEach(function (f) {
      if (!f || !f.name) return;
      var lvl = levelLabel(f.level);
      if (f.code) {
        addQ(mcq, seenQ, 'mcq', 'Welcher Code gehört zur Form "' + f.name + '"?', f.code, formCodes, formCodes);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): Form-Code "' + f.code + '" = _____.', f.name, formNames, formNames);
      }
      if (lvl) {
        addQ(mcq, seenQ, 'mcq', 'Zu welchem Level gehört die Form "' + f.name + '"?', lvl, levelLabels, levelLabels);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + f.name + '" gehört zum Level _____.', lvl, levelLabels, levelLabels);
      }
    });

    // Kategorien
    wcCats.forEach(function (cat) {
      wcTitles(cat.items).forEach(function (t) {
        addQ(mcq, seenQ, 'mcq', 'Zu welcher Kategorie gehört "' + t + '" (Wing Chun)?', cat.key, wcCatNames, wcCatNames);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + t + '" gehört zur Kategorie _____.', cat.key, wcCatNames, wcCatNames);
      });
    });

    // Beschreibungen (aus data.js) – sehr „sinnvolle“ Fragen
    wcCats.forEach(function (cat) {
      asArr(cat.items).forEach(function (it) {
        if (!it || !it.t || !it.d) return;
        addQ(mcq, seenQ, 'mcq', 'Welche Kurzbeschreibung passt zu "' + it.t + '"?', it.d, wcAllDescs, wcAllDescs);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + it.t + '" – Beschreibung: _____.', it.d, wcAllDescs, wcAllDescs);

        addQ(mcq, seenQ, 'mcq', 'Welche Technik passt zur Beschreibung: "' + it.d + '"?', it.t, wcAllTitles, wcAllTitles);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): Die Technik mit der Beschreibung "' + it.d + '" heißt _____.', it.t, wcAllTitles, wcAllTitles);
      });
    });

    // Varianten
    uniq(WC_VAR).forEach(function (v) {
      addQ(mcq, seenQ, 'mcq', 'Welche Option ist eine Wing-Chun-Variante?', v, WC_VAR.concat(TKD_VAR), wcAllTitles.concat(formNames, formCodes, wcCatNames));
      addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + v + '" ist eine Trainings-Variante.', v, WC_VAR.concat(TKD_VAR), wcAllTitles.concat(formNames, formCodes, wcCatNames));
    });

    // C) Fillers: falls noch nicht voll – kategorische Einordnung
    var wcTypePool = wcCatNames.concat(['Form', 'Variante']);
    var wcAllTerms = uniq(wcAllTitles.concat(formNames, formCodes, WC_VAR, levelLabels, wcCatNames));
    var wcFillTerms = shuffle(wcAllTerms).concat(shuffle(wcAllTerms));

    function wcKindOf(term) {
      if (formNames.indexOf(term) >= 0 || formCodes.indexOf(term) >= 0) return 'Form';
      if (WC_VAR.indexOf(term) >= 0) return 'Variante';
      for (var i = 0; i < wcCats.length; i++) {
        var titles = wcTitles(wcCats[i].items);
        if (titles.indexOf(term) >= 0) return wcCats[i].key;
      }
      return 'Weiteres';
    }

    fillTo(mcq, seenQ, 100, function () {
      var term = wcFillTerms.length ? wcFillTerms.shift() : null;
      if (!term) return false;
      var corr = wcKindOf(term);
      return addQ(mcq, seenQ, 'mcq', 'Wozu gehört "' + term + '" im Wing-Chun-Kontext?', corr, wcTypePool, wcTypePool);
    });

    fillTo(clz, seenQ, 100, function () {
      var term = wcFillTerms.length ? wcFillTerms.shift() : null;
      if (!term) return false;
      var corr = wcKindOf(term);
      return addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + term + '" gehört zu _____.', corr, wcTypePool, wcTypePool);
    });

    return finalize(mcq, clz);
  }

  // ---------- export ----------
  var banks = { tkd: [], wc: [] };
  try {
    banks.tkd = buildTKD();
  } catch (e) {
    banks.tkd = [];
    if (console && console.warn) console.warn('TKD quiz build failed', e);
  }
  try {
    banks.wc = buildWC();
  } catch (e) {
    banks.wc = [];
    if (console && console.warn) console.warn('WC quiz build failed', e);
  }

  if (typeof window !== 'undefined') window.QUIZ_BANKS = banks;
  try {
    /* eslint-disable no-undef */
    if (typeof QUIZ_BANKS === 'undefined') { QUIZ_BANKS = banks; }
    /* eslint-enable no-undef */
  } catch (_) { }

})();
