/* quiz.js – Sinnvolle, eindeutige Quiz-Fragen (datengetrieben)
   Export: window.QUIZ_BANKS = { tkd: [...200], wc: [...200] }

   Ziele:
   - exakt 200 Fragen je Disziplin (100 mcq + 100 cloze)
   - jede Frage nur einmal (Dedup über Fragetext)
   - keine generischen/unsinnigen Füllfragen ("Set 35" etc.)
   - Antworten sind eindeutig & aus data.js ableitbar
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

    // Falls zu wenig Distraktoren vorhanden: aus fallback auffüllen
    if (wrong.length < 3) {
      var extra = pick(uniq(asArr(fallbackPool).concat(wrongPool)), 30, [c].concat(wrong));
      while (wrong.length < 3 && extra.length) wrong.push(extra.shift());
    }

    // Letzter Sicherheitsfallback (sollte praktisch nie greifen):
    var emergency = ['Struktur', 'Timing', 'Distanz', 'Balance', 'Mittellinie', 'Deckung', 'Hüfte', 'Atmung'];
    while (wrong.length < 3) {
      var e = pick(emergency, 1, [c].concat(wrong));
      wrong.push(e.length ? e[0] : ('Option ' + (wrong.length + 1)));
    }

    var opts = uniq([c].concat(wrong));
    // exakt 4 Optionen
    if (opts.length > 4) opts = opts.slice(0, 4);
    while (opts.length < 4) {
      var add = pick(uniq(asArr(fallbackPool).concat(wrongPool, emergency)), 1, opts);
      opts.push(add.length ? add[0] : ('Option ' + (opts.length + 1)));
      opts = uniq(opts);
    }

    opts = shuffle(opts);
    var a = opts.indexOf(c);
    if (a < 0) { opts[0] = c; a = 0; }
    // Final unique check
    if (new Set(opts.map(safeStr)).size !== 4) {
      opts = uniq(opts).slice(0, 4);
      while (opts.length < 4) opts.push('Option ' + (opts.length + 1));
      a = opts.indexOf(c);
      if (a < 0) { opts[0] = c; a = 0; }
    }
    return { options: opts, a: a };
  }

  // Fügt Frage hinzu, wenn Fragetext noch nicht existiert
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

  function fillTo(targetList, seenQ, type, desiredCount, genFn) {
    var guard = 0;
    while (targetList.length < desiredCount && guard < 5000) {
      guard++;
      if (!genFn()) break;
    }
  }

  function finalize(mcq, clz) {
    // Erzwinge 100/100
    mcq = mcq.slice(0, 100);
    clz = clz.slice(0, 100);
    return mcq.concat(clz);
  }

  // ---------- data from data.js ----------
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

  // ---------- pools ----------
  var tkdKicks = uniq(asArr(BAS.kicks));
  var tkdBlocks = uniq(asArr(BAS.blocks));
  var tkdStrikes = uniq(asArr(BAS.strikes));
  var tkdStances = uniq(asArr(BAS.stances));
  var tkdOverview = uniq(asArr(BAS.overview));
  var tkdBasicsAll = uniq(tkdKicks.concat(tkdBlocks, tkdStrikes, tkdStances, tkdOverview));

  var hyNames = uniq(HY.map(function (h) { return h && h.name; }));
  var hyIds = uniq(HY.map(function (h) { return h && h.id; }));
  var hyMoves = uniq(HY.map(function (h) { return h && String(h.moves); }));
  var beltLabels = uniq(Object.keys(TKD_BELT_OBJ || {}).map(beltLabel));

  var tkdAllTerms = uniq(tkdBasicsAll.concat(COMB, SPAR, hyNames, hyIds, TKD_VAR, beltLabels));

  function wcTitles(arr) { return uniq(asArr(arr).map(function (x) { return x && x.t; })); }
  function wcDescs(arr) { return uniq(asArr(arr).map(function (x) { return x && x.d; })); }

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
  var formNotes = uniq(FORMS_.map(function (f) { return f && f.note; }));
  var formParts = uniq(FORMS_.map(function (f) { return f && f.parts; }).filter(Boolean));
  var levelLabels = uniq(Object.keys(WC_LEVEL_OBJ || {}).map(levelLabel));

  var wcAllTerms = uniq(wcAllTitles.concat(formNames, formCodes, WC_VAR, levelLabels, wcCatNames));

  // ---------- builders ----------
  function buildTKD() {
    var seenQ = new Set();
    var mcq = [];
    var clz = [];

    // 1) Basics: Kategorie
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

    // 2) Hyongs: Moves, Gürtel, Kennung
    HY.forEach(function (h) {
      if (!h) return;
      var b = beltLabel(h.belt);
      addQ(mcq, seenQ, 'mcq', 'Wie viele Bewegungen hat die Hyong "' + h.name + '"?', String(h.moves), hyMoves, hyMoves);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + h.name + '" hat ____ Bewegungen.', String(h.moves), hyMoves, hyMoves);

      addQ(mcq, seenQ, 'mcq', 'Zu welchem Gürtel gehört die Hyong "' + h.name + '"?', b, beltLabels, beltLabels);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + h.name + '" gehört zum Gürtel _____.', b, beltLabels, beltLabels);

      addQ(mcq, seenQ, 'mcq', 'Welche Hyong hat die Kennung "' + h.id + '"?', h.name, hyNames, hyNames);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): Die Hyong mit der Kennung "' + h.id + '" heißt _____.', h.name, hyNames, hyNames);

      addQ(mcq, seenQ, 'mcq', 'Welche Kennung hat die Hyong "' + h.name + '"?', h.id, hyIds, hyIds);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): Die Kennung der Hyong "' + h.name + '" ist _____.', h.id, hyIds, hyIds);
    });

    HY.forEach(function (h) {
      if (!h) return;
      addQ(mcq, seenQ, 'mcq', 'Welche Hyong hat ' + String(h.moves) + ' Bewegungen?', h.name, hyNames, hyNames);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): Die Hyong mit ' + String(h.moves) + ' Bewegungen heißt _____.', h.name, hyNames, hyNames);
    });

    // Reihenfolge-Fragen aus der App-Liste
    HY.forEach(function (h, i) {
      if (!h) return;
      addQ(mcq, seenQ, 'mcq', 'Welche Hyong steht in der App-Liste an Position ' + (i + 1) + '?', h.name, hyNames, hyNames);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): In der App-Liste steht an Position ' + (i + 1) + ' die Hyong _____.', h.name, hyNames, hyNames);

      if (i > 0 && HY[i - 1]) {
        addQ(mcq, seenQ, 'mcq', 'Welche Hyong steht direkt vor "' + h.name + '"?', HY[i - 1].name, hyNames, hyNames);
        addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): Direkt vor "' + h.name + '" steht _____.', HY[i - 1].name, hyNames, hyNames);
      }
      if (i < HY.length - 1 && HY[i + 1]) {
        addQ(mcq, seenQ, 'mcq', 'Welche Hyong folgt direkt auf "' + h.name + '"?', HY[i + 1].name, hyNames, hyNames);
        addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): Auf "' + h.name + '" folgt direkt _____.', HY[i + 1].name, hyNames, hyNames);
      }
    });

    // 3) Kombos & Sparring: Typ
    COMB.forEach(function (c) {
      addQ(mcq, seenQ, 'mcq', 'Was ist "' + c + '" in der App (TKD)?', 'Kombination', ['Hyong', 'Grundübung', 'Sparring', 'Hyong-Variante'], ['Kombination', 'Hyong', 'Grundübung', 'Sparring', 'Hyong-Variante']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + c + '" ist eine _____.', 'Kombination', ['Hyong', 'Grundübung', 'Sparring', 'Hyong-Variante'], ['Kombination', 'Hyong', 'Grundübung', 'Sparring', 'Hyong-Variante']);
    });
    SPAR.forEach(function (s) {
      addQ(mcq, seenQ, 'mcq', 'Was ist "' + s + '" in der App (TKD)?', 'Sparring', ['Hyong', 'Grundübung', 'Kombination', 'Hyong-Variante'], ['Sparring', 'Hyong', 'Grundübung', 'Kombination', 'Hyong-Variante']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + s + '" ist ein _____.', 'Sparring', ['Hyong', 'Grundübung', 'Kombination', 'Hyong-Variante'], ['Sparring', 'Hyong', 'Grundübung', 'Kombination', 'Hyong-Variante']);
    });

    // 4) Varianten: Typ
    uniq(TKD_VAR).forEach(function (v) {
      addQ(mcq, seenQ, 'mcq', 'Wofür steht "' + v + '" in der TKD-Planung?', 'Hyong-Variante', ['Kombination', 'Grundübung', 'Sparring', 'Hyong'], ['Hyong-Variante', 'Kombination', 'Grundübung', 'Sparring', 'Hyong']);
      addQ(clz, seenQ, 'cloze', 'Lückentext (TKD): "' + v + '" ist eine _____.', 'Hyong-Variante', ['Kombination', 'Grundübung', 'Sparring', 'Hyong'], ['Hyong-Variante', 'Kombination', 'Grundübung', 'Sparring', 'Hyong']);
    });

    // 5) Falls noch nicht genug: objektive Zuordnung
    function tkdKindOf(term) {
      if (tkdKicks.indexOf(term) >= 0) return 'Kick';
      if (tkdBlocks.indexOf(term) >= 0) return 'Block';
      if (tkdStrikes.indexOf(term) >= 0) return 'Schlag';
      if (tkdStances.indexOf(term) >= 0) return 'Stellung';
      if (hyNames.indexOf(term) >= 0 || hyIds.indexOf(term) >= 0) return 'Hyong';
      if (COMB.indexOf(term) >= 0) return 'Kombination';
      if (SPAR.indexOf(term) >= 0) return 'Sparring';
      if (TKD_VAR.indexOf(term) >= 0) return 'Hyong-Variante';
      if (beltLabels.indexOf(term) >= 0) return 'Gürtel';
      return 'Grundübung';
    }
    var tkdTypePool = ['Kick', 'Block', 'Schlag', 'Stellung', 'Hyong', 'Kombination', 'Sparring', 'Hyong-Variante', 'Gürtel', 'Grundübung'];
    var typeFillTerms = shuffle(tkdAllTerms).concat(shuffle(tkdAllTerms));

    fillTo(mcq, seenQ, 'mcq', 100, function () {
      var term = typeFillTerms.length ? typeFillTerms.shift() : null;
      if (!term) return false;
      var corr = tkdKindOf(term);
      return addQ(mcq, seenQ, 'mcq', 'Worum handelt es sich bei "' + term + '" (TKD)?', corr, tkdTypePool, tkdTypePool);
    });
    fillTo(clz, seenQ, 'cloze', 100, function () {
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

    // 1) Formen: Code / Level / Notiz / Teile
    FORMS_.forEach(function (f) {
      if (!f) return;
      var lvl = levelLabel(f.level);
      addQ(mcq, seenQ, 'mcq', 'Welcher Code gehört zur Form "' + f.name + '"?', f.code, formCodes, formCodes);
      addQ(clz, seenQ, 'cloze', 'Lückentext (WC): Form-Code "' + f.code + '" = _____.', f.name, formNames, formNames);

      addQ(mcq, seenQ, 'mcq', 'Zu welchem Level gehört die Form "' + f.name + '"?', lvl, levelLabels, levelLabels);
      addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + f.name + '" gehört zum Level _____.', lvl, levelLabels, levelLabels);

      if (f.note) {
        addQ(mcq, seenQ, 'mcq', 'Welche Kurznotiz gehört zur Form "' + f.name + '"?', f.note, formNotes, formNotes);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): Die Kurznotiz zu "' + f.name + '" lautet _____.', f.note, formNotes, formNotes);
      }
      if (f.parts) {
        addQ(mcq, seenQ, 'mcq', 'Wie viele Teile/Sätze sind bei "' + f.name + '" angegeben?', f.parts, formParts, formParts);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): Bei "' + f.name + '" sind ____ angegeben.', f.parts, formParts, formParts);
      }
    });

    // 2) Technik-Kategorien + Beschreibung
    wcCats.forEach(function (cat) {
      wcTitles(cat.items).forEach(function (t) {
        addQ(mcq, seenQ, 'mcq', 'Zu welcher Kategorie gehört "' + t + '" (Wing Chun)?', cat.key, wcCatNames, wcCatNames);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + t + '" gehört zur Kategorie _____.', cat.key, wcCatNames, wcCatNames);
      });
    });

    wcCats.forEach(function (cat) {
      asArr(cat.items).forEach(function (it) {
        if (!it || !it.t || !it.d) return;
        addQ(mcq, seenQ, 'mcq', 'Welche Kurzbeschreibung passt zu "' + it.t + '"?', it.d, wcAllDescs, wcAllDescs);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + it.t + '" – Beschreibung: _____.', it.d, wcAllDescs, wcAllDescs);

        addQ(mcq, seenQ, 'mcq', 'Welche Technik passt zur Beschreibung: "' + it.d + '"?', it.t, wcAllTitles, wcAllTitles);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): Die Technik mit der Beschreibung "' + it.d + '" heißt _____.', it.t, wcAllTitles, wcAllTitles);
      });
    });

    // 3) Kategorie -> Technik
    wcCats.forEach(function (cat) {
      var titles = wcTitles(cat.items);
      titles.slice(0, 6).forEach(function (t) {
        addQ(mcq, seenQ, 'mcq', 'Welche der folgenden Techniken gehört zur Kategorie "' + cat.key + '"?', t, titles, wcAllTitles);
        addQ(clz, seenQ, 'cloze', 'Lückentext (WC): Zur Kategorie "' + cat.key + '" gehört u.a. _____.', t, titles, wcAllTitles);
      });
    });

    // 4) Varianten
    uniq(WC_VAR).forEach(function (v) {
      addQ(mcq, seenQ, 'mcq', 'Welche Option ist eine Wing-Chun-Variante?', v, WC_VAR.concat(TKD_VAR), wcAllTerms);
      addQ(clz, seenQ, 'cloze', 'Lückentext (WC): "' + v + '" ist eine Trainings-Variante.', v, WC_VAR.concat(TKD_VAR), wcAllTerms);
    });

    // 5) Falls noch nicht genug: Zuordnung
    var wcTypePool = wcCatNames.concat(['Form', 'Variante']);
    function wcKindOf(term) {
      if (formNames.indexOf(term) >= 0 || formCodes.indexOf(term) >= 0) return 'Form';
      if (WC_VAR.indexOf(term) >= 0) return 'Variante';
      for (var i = 0; i < wcCats.length; i++) {
        var titles = wcTitles(wcCats[i].items);
        if (titles.indexOf(term) >= 0) return wcCats[i].key;
      }
      return 'Weiteres';
    }
    var wcFillTerms = shuffle(wcAllTerms).concat(shuffle(wcAllTerms));

    fillTo(mcq, seenQ, 'mcq', 100, function () {
      var term = wcFillTerms.length ? wcFillTerms.shift() : null;
      if (!term) return false;
      var corr = wcKindOf(term);
      return addQ(mcq, seenQ, 'mcq', 'Wozu gehört "' + term + '" im Wing Chun Kontext?', corr, wcTypePool, wcTypePool);
    });
    fillTo(clz, seenQ, 'cloze', 100, function () {
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
  // optional global fallback
  try {
    /* eslint-disable no-undef */
    if (typeof QUIZ_BANKS === 'undefined') { QUIZ_BANKS = banks; }
    /* eslint-enable no-undef */
  } catch (_) { }

})();
