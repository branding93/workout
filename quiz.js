/* quiz.js – separat gepflegte Quiz-Fragenbibliothek
Abhängigkeit: data.js (HYONGS, BASICS, FORMS, GRUNDLAGEN, ARM_HAND, BEINE, WEITERE_HAND, WEAPON, TKD_VARIATIONS, WC_VARIATIONS, TKD_BELTS, WC_LEVELS, COMBOS)
Export: global QUIZ_BANKS (oder window.QUIZ_BANKS) = { tkd: [...200], wc: [...200] }

Regeln:
- Jede Frage ist eindeutig über q (Fragetext)
- Jede Frage hat genau 4 Antwortoptionen (options) und den Index der richtigen Antwort (a)
- Mischung: ca. 50/50 Multiple-Choice & Lückentext (type: 'mcq' | 'cloze')
- Keine externen Abhängigkeiten oder Web-Requests

Hinweis:
- Wenn Datenpools (z.B. nur 3 Wing-Chun-Formen) weniger als 4 Einträge enthalten,
  werden neutrale Zusatz-Distraktoren ergänzt, damit jede Frage exakt 4 Optionen hat.
*/

(function () {
  'use strict';

  // ---------- Helpers ----------
  function asArr(x, fallback) { return Array.isArray(x) ? x : (fallback || []); }
  function objKeys(o) { return (o && typeof o === 'object') ? Object.keys(o) : []; }
  function uniq(arr) {
    var out = [];
    var seen = new Set();
    for (var i = 0; i < (arr || []).length; i++) {
      var v = String(arr[i]);
      if (!seen.has(v)) { seen.add(v); out.push(arr[i]); }
    }
    return out;
  }
  function shuffle(arr) {
    var a = (arr || []).slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pickDistinct(pool, n, exclude) {
    var ex = new Set((exclude || []).map(String));
    var out = [];
    for (var i = 0; i < (pool || []).length; i++) {
      var v = pool[i];
      if (!ex.has(String(v))) out.push(v);
    }
    return shuffle(out).slice(0, n);
  }
  function poolAtLeast4(pool, extras) {
    var p = uniq(asArr(pool, []).concat(asArr(extras, [])));
    // If still <4, pad with generic placeholders
    var pad = ['(keine Angabe)', '(Variante)', '(Übung)', '(Begriff)'];
    for (var i = 0; p.length < 4 && i < pad.length; i++) p.push(pad[i]);
    return p;
  }
  function ensure4Options(correct, pool, extras) {
    var p = poolAtLeast4(pool, extras);
    var distract = pickDistinct(p, 3, [correct]);
    var opts = shuffle([correct].concat(distract));
    return { options: opts, a: opts.indexOf(correct) };
  }
  function keyOf(qObj) {
    return (qObj && qObj.q) ? String(qObj.q).trim() : '';
  }
  function pushUnique(arr, seen, qObj) {
    var k = keyOf(qObj);
    if (!k) return;
    if (seen.has(k)) return;
    if (!qObj.options || qObj.options.length !== 4) return;
    if (typeof qObj.a !== 'number' || qObj.a < 0 || qObj.a > 3) return;
    if (qObj.type !== 'mcq' && qObj.type !== 'cloze') return;
    seen.add(k);
    arr.push(qObj);
  }
  function ensureCount(arr, seen, n, factories) {
    var guard = 0;
    var f = asArr(factories, []);
    while (arr.length < n && guard < 25000) {
      guard++;
      var idx = arr.length;
      var factory = f[idx % f.length];
      if (typeof factory === 'function') {
        var qObj = factory(idx);
        if (qObj) pushUnique(arr, seen, qObj);
      } else {
        break;
      }
    }
    return arr.slice(0, n);
  }
  function splitHalf(arr, n) {
    var mcq = arr.filter(function (x) { return x.type === 'mcq'; });
    var clz = arr.filter(function (x) { return x.type === 'cloze'; });
    var half = Math.floor(n / 2);
    var out = mcq.slice(0, half).concat(clz.slice(0, half));
    if (out.length < n) {
      var rest = mcq.slice(half).concat(clz.slice(half));
      for (var i = 0; i < rest.length && out.length < n; i++) out.push(rest[i]);
    }
    return shuffle(out).slice(0, n);
  }
  function safeStr(x) { return String(x == null ? '' : x); }

  // ---------- Data from data.js (safe fallbacks) ----------
  var HY = (typeof HYONGS !== 'undefined') ? asArr(HYONGS, []) : [];
  var B = (typeof BASICS !== 'undefined') ? (BASICS || { kicks: [], blocks: [], strikes: [], stances: [], overview: [] }) : { kicks: [], blocks: [], strikes: [], stances: [], overview: [] };
  var TKD_VAR = (typeof TKD_VARIATIONS !== 'undefined') ? asArr(TKD_VARIATIONS, []) : [];
  var TKD_BELT = (typeof TKD_BELTS !== 'undefined') ? (TKD_BELTS || {}) : {};
  var TKD_BELT_LABELS = objKeys(TKD_BELT).map(function (k) { return TKD_BELT[k].label; });
  var COM = (typeof COMBOS !== 'undefined') ? asArr(COMBOS, []) : [];

  var FOR = (typeof FORMS !== 'undefined') ? asArr(FORMS, []) : [];
  var WC_VAR = (typeof WC_VARIATIONS !== 'undefined') ? asArr(WC_VARIATIONS, []) : [];
  var WC_LVL = (typeof WC_LEVELS !== 'undefined') ? (WC_LEVELS || {}) : {};

  var GR = (typeof GRUNDLAGEN !== 'undefined') ? asArr(GRUNDLAGEN, []) : [];
  var AH = (typeof ARM_HAND !== 'undefined') ? asArr(ARM_HAND, []) : [];
  var BN = (typeof BEINE !== 'undefined') ? asArr(BEINE, []) : [];
  var WH = (typeof WEITERE_HAND !== 'undefined') ? asArr(WEITERE_HAND, []) : [];
  var WP = (typeof WEAPON !== 'undefined') ? asArr(WEAPON, []) : [];

  // Pools
  var tkdKicks = asArr(B.kicks, []);
  var tkdBlocks = asArr(B.blocks, []);
  var tkdStrikes = asArr(B.strikes, []);
  var tkdStances = asArr(B.stances, []);

  var wcAllItems = [];
  function pushCat(arr, cat, items) {
    for (var i = 0; i < items.length; i++) {
      wcAllItems.push({ cat: cat, t: items[i].t, d: items[i].d });
      arr.push(items[i].t);
    }
  }
  var wcTerms = [];
  pushCat(wcTerms, 'Grundlagen', GR);
  pushCat(wcTerms, 'Schutztechniken', AH);
  pushCat(wcTerms, 'Beine', BN);
  pushCat(wcTerms, 'Weiteres', WH);
  pushCat(wcTerms, 'Weapon', WP);

  // ---------- Creative templates ----------
  var principlePairs = [
    { good: 'Kontrolle zuerst – Power folgt.', bad: 'Immer maximal hart, egal ob sauber.' },
    { good: 'Sauber → schnell → stark.', bad: 'Schnell → unsauber → hoffen.' },
    { good: 'Atmung ruhig, Blick klar.', bad: 'Atmung anhalten, Schultern hoch.' },
    { good: 'Kurze Wege, klare Linie.', bad: 'Große Ausholbewegungen für alles.' },
    { good: 'Balance & Struktur halten.', bad: 'Balance ignorieren – Hauptsache Treffer.' },
    { good: 'Recoil/Reset nach dem Treffer.', bad: 'Bein/Arm nach Treffer draußen lassen.' },
    { good: 'Timing schlägt rohe Kraft.', bad: 'Nur Kraft zählt, Timing ist egal.' },
    { good: 'Wiederholung mit Fokus.', bad: 'Nie wiederholen – immer Neues.' }
  ];

  function makePrincipleMCQ(prefix, i) {
    var p = principlePairs[i % principlePairs.length];
    var opts = shuffle([p.good, p.bad, 'Nur Ausdauer zählt; Technik ist zweitrangig.', 'Wenn es weh tut, ist es richtig.']);
    return { type: 'mcq', q: prefix + ' Welcher Satz passt am besten als Trainingsprinzip?', options: opts, a: opts.indexOf(p.good) };
  }

  function makePrincipleCloze(prefix, i) {
    var targets = [
      { word: 'Kontrolle', sentence: '____ zuerst – Power folgt.' },
      { word: 'sauber', sentence: '____ üben ist kein Umweg – es ist der Turbo.' },
      { word: 'Timing', sentence: '____ schlägt rohe Kraft (fast immer).' },
      { word: 'Balance', sentence: '____ ist die Basis für Präzision.' },
      { word: 'Recoil', sentence: 'Nach dem Treffer: ____ (zurückziehen/reset).' },
    ];
    var t = targets[i % targets.length];
    var o = ensure4Options(t.word, ['Kontrolle', 'Timing', 'Balance', 'Recoil', 'Härte', 'Zufall', 'Hektik', 'Spannung']);
    return { type: 'cloze', q: prefix + ' Ergänze: ' + t.sentence, options: o.options, a: o.a };
  }

  // ---------- TKD bank (200) ----------
  function buildTKD() {
    var out = [];
    var seen = new Set();

    var hyongNames = HY.map(function (h) { return h.name; });
    var hyongIds = HY.map(function (h) { return h.id; });
    var hyongMoves = HY.map(function (h) { return String(h.moves); });

    // Hyong questions
    HY.forEach(function (h, idx) {
      var oMoves = ensure4Options(String(h.moves), hyongMoves, ['24', '32', '36', '40']);
      pushUnique(out, seen, { type: 'mcq', q: 'TKD: Wie viele Bewegungen hat ' + h.name + '?', options: oMoves.options, a: oMoves.a });

      if (TKD_BELT && TKD_BELT[h.belt]) {
        var oBelt = ensure4Options(TKD_BELT[h.belt].label, TKD_BELT_LABELS, ['Weiß', 'Gelb', 'Grün', 'Blau', 'Rot', 'Schwarz']);
        pushUnique(out, seen, { type: 'mcq', q: 'TKD: Zu welchem Gürtel gehört ' + h.name + '?', options: oBelt.options, a: oBelt.a });
      }

      var oId = ensure4Options(h.id, hyongIds, ['XI', 'XII', 'XIII', 'XIV']);
      pushUnique(out, seen, { type: 'cloze', q: 'TKD: Hyong ____ heißt „' + h.name + '“.', options: oId.options, a: oId.a });

      var oName = ensure4Options(h.name, hyongNames, ['Dan-Gun Hyong', 'Do-San Hyong', 'Kwang-Gae Hyong', 'Choong-Moo Hyong']);
      pushUnique(out, seen, { type: 'cloze', q: 'TKD: Hyong ' + h.id + ' heißt ____ .', options: oName.options, a: oName.a });

      if (HY.length >= 4) {
        var prev = (idx > 0) ? HY[idx - 1].name : null;
        var next = (idx < HY.length - 1) ? HY[idx + 1].name : null;
        if (next) {
          var oNext = ensure4Options(next, hyongNames, ['(keine)', '(Ende)', '(Start)', '(Pause)']);
          pushUnique(out, seen, { type: 'mcq', q: 'TKD: Welche Hyong folgt in der Liste direkt auf ' + h.name + '?', options: oNext.options, a: oNext.a });
        }
        if (prev) {
          var oPrev = ensure4Options(prev, hyongNames, ['(keine)', '(Ende)', '(Start)', '(Pause)']);
          pushUnique(out, seen, { type: 'mcq', q: 'TKD: Welche Hyong steht in der Liste direkt vor ' + h.name + '?', options: oPrev.options, a: oPrev.a });
        }
      }
    });

    // Identify technique type (Kick/Block/Stellung)
    var poolAllTech = tkdKicks.concat(tkdBlocks).concat(tkdStrikes).concat(tkdStances);
    poolAllTech = poolAtLeast4(poolAllTech, ['Pak Sao', 'Tan Sao', 'Siu Nim Tao', 'Plank']);

    tkdKicks.forEach(function (k) {
      var o = ensure4Options(k, poolAllTech);
      pushUnique(out, seen, { type: 'mcq', q: 'TKD: Welche Technik ist ein Kick?', options: o.options, a: o.a });
    });
    tkdBlocks.forEach(function (b) {
      var o = ensure4Options(b, poolAllTech);
      pushUnique(out, seen, { type: 'mcq', q: 'TKD: Welche Technik ist ein Block?', options: o.options, a: o.a });
    });
    tkdStances.forEach(function (s) {
      var o = ensure4Options(s, poolAllTech);
      pushUnique(out, seen, { type: 'mcq', q: 'TKD: Welche Technik ist eine Stellung?', options: o.options, a: o.a });
    });

    // Variations & drills
    TKD_VAR.forEach(function (v) {
      var o = ensure4Options(v, TKD_VAR, ['normal', 'langsam', 'Timing', 'Struktur']);
      pushUnique(out, seen, { type: 'mcq', q: 'TKD: Welche Option ist eine Hyong-Variante (in der App)?', options: o.options, a: o.a });
      pushUnique(out, seen, { type: 'cloze', q: 'TKD: Eine Hyong-Variante lautet ____ .', options: o.options, a: o.a });
    });

    COM.forEach(function (c) {
      var o = ensure4Options(c, COM, ['Kombination 1-20', 'Drill 9-12', 'Freikampf', 'Stretching']);
      pushUnique(out, seen, { type: 'mcq', q: 'TKD: Welche der folgenden Angaben ist eine Kombination (Drill)?', options: o.options, a: o.a });
    });

    // Coaching-cues for kicks
    var cueKick = [
      { cue: 'Kammer (Knie hoch) → strecken → sofort zurückziehen (Recoil).', wrong: ['Bein nach dem Treffer draußen lassen.', 'Schultern hochziehen, um mehr Kraft zu erzeugen.', 'Atmung anhalten, um stabil zu bleiben.'] },
      { cue: 'Standfuß mitdrehen und Hüfte aktiv einsetzen.', wrong: ['Standfuß festkleben, Hüfte bleibt neutral.', 'Oberkörper nach hinten werfen.', 'Arme komplett fallen lassen.'] },
      { cue: 'Balance vor Power: erst sauber, dann schnell.', wrong: ['Schnell starten, Sauberkeit kommt später.', 'Nur Kraft zählt.', 'Immer maximaler Schwung.'] }
    ];

    tkdKicks.forEach(function (k, i) {
      var c = cueKick[i % cueKick.length];
      var opts = shuffle([c.cue].concat(c.wrong));
      pushUnique(out, seen, { type: 'mcq', q: 'TKD: Was ist beim ' + k + ' als Coaching-Hinweis am sinnvollsten?', options: opts, a: opts.indexOf(c.cue) });

      var cl = [
        { word: 'Kammer', sentence: 'Der Kick beginnt mit der ____: Knie hoch.' },
        { word: 'Recoil', sentence: 'Nach dem Treffer folgt der ____ (sofort zurückziehen).' },
        { word: 'Standfuß', sentence: 'Der ____ dreht mit, damit die Hüfte arbeiten kann.' },
        { word: 'Balance', sentence: '____ halten: Trefferbild bleibt stabil.' }
      ];
      var t = cl[i % cl.length];
      var o = ensure4Options(t.word, ['Kammer', 'Recoil', 'Standfuß', 'Balance', 'Hektik', 'Zufall', 'Spannung', 'Schmerz']);
      pushUnique(out, seen, { type: 'cloze', q: 'TKD: Ergänze: ' + t.sentence + ' (' + k + ')', options: o.options, a: o.a });
    });

    // Principles
    for (var i = 0; i < 50; i++) {
      pushUnique(out, seen, makePrincipleMCQ('TKD:', i));
      pushUnique(out, seen, makePrincipleCloze('TKD:', i));
    }

    // Fillers to 220 then balance
    var fillerFactories = [];

    fillerFactories.push(function (i) {
      var groups = [
        { name: 'Kick', pool: tkdKicks, other: tkdBlocks.concat(tkdStrikes).concat(tkdStances) },
        { name: 'Block', pool: tkdBlocks, other: tkdKicks.concat(tkdStrikes).concat(tkdStances) },
        { name: 'Stellung', pool: tkdStances, other: tkdKicks.concat(tkdBlocks).concat(tkdStrikes) }
      ];
      var g = groups[i % groups.length];
      if (g.pool.length < 1) return null;
      var correct = g.pool[i % g.pool.length];
      var opts = shuffle([correct].concat(pickDistinct(poolAtLeast4(g.other, ['Siu Nim Tao','Tan Sao','Pak Sao']), 3, [])));
      return { type: (i % 2 === 0 ? 'mcq' : 'cloze'), q: 'TKD: Welche Option ist ein(e) ' + g.name + '?', options: opts, a: opts.indexOf(correct) };
    });

    fillerFactories.push(function (i) {
      if (HY.length < 1) return null;
      var h = HY[i % HY.length];
      var o = ensure4Options(String(h.moves), hyongMoves, ['24','32','36','40']);
      return { type: 'cloze', q: 'TKD: ' + h.name + ' hat ____ Bewegungen.', options: o.options, a: o.a };
    });

    fillerFactories.push(function (i) {
      var topics = ['Stand', 'Hüfte', 'Deckung', 'Atmung', 'Tempo', 'Blick', 'Distanz', 'Recoil'];
      var t = topics[i % topics.length];
      var good = 'Fokus: ' + t + ' – langsam starten und bewusst wiederholen.';
      var opts = shuffle([good, 'Fokus: alles gleichzeitig, ohne Pause.', 'Fokus: nur Kraft, Technik egal.', 'Fokus: Zufall – einfach machen.']);
      return { type: 'mcq', q: 'TKD: Was ist der beste Ansatz für eine „1%-besser“-Runde?', options: opts, a: opts.indexOf(good) };
    });

    fillerFactories.push(function (i) {
      var pick = ['Kammer', 'Standfuß', 'Hüfte', 'Blick', 'Recoil', 'Deckung'];
      var w = pick[i % pick.length];
      var o = ensure4Options(w, pick.concat(['Timing','Balance','Kraft']));
      return { type: 'cloze', q: 'TKD: Technik-Check: Der wichtigste Fokus in dieser Mini-Runde ist ____ .', options: o.options, a: o.a };
    });

    ensureCount(out, seen, 220, fillerFactories);
    out = splitHalf(out, 200);
    return out;
  }

  // ---------- WC bank (200) ----------
  function buildWC() {
    var out = [];
    var seen = new Set();

    var formNames = FOR.map(function (f) { return f.name; });
    var formCodes = FOR.map(function (f) { return f.code; });
    var formNotes = FOR.map(function (f) { return f.note; });
    var formParts = FOR.map(function (f) { return safeStr(f.parts); });

    // Fallback distractors (neutral, common terms; used only as answer options)
    var extraFormNames = ['Muk Yan Jong', 'Baat Cham Dao', 'Luk Dim Boon Kwun', 'Chi Sao'];
    var extraFormCodes = ['MYJ', 'BCD', 'LDBK', 'CS'];
    var extraFormNotes = ['Holzpuppe / Dummy-Training', 'Doppelmesser (Waffen)', 'Langstock (Waffen)', 'Partnerdrill (Kontakt)'];
    var extraParts = ['1 Teil', '2 Teile', '3 Teile', '8 Sätze'];

    // 1) Forms questions (always possible via fallback pools)
    FOR.forEach(function (f, idx) {
      var o1 = ensure4Options(f.code, formCodes, extraFormCodes);
      pushUnique(out, seen, { type: 'mcq', q: 'WC: Welches Kürzel (Code) hat die Form ' + f.name + '?', options: o1.options, a: o1.a });

      var o2 = ensure4Options(f.note, formNotes, extraFormNotes);
      pushUnique(out, seen, { type: 'mcq', q: 'WC: Welche Kurzbeschreibung passt zu ' + f.name + '?', options: o2.options, a: o2.a });

      var o3 = ensure4Options(f.name, formNames, extraFormNames);
      pushUnique(out, seen, { type: 'cloze', q: 'WC: Die Form ____ gehört zu Wing Chun (Code: ' + f.code + ').', options: o3.options, a: o3.a });

      var o4 = ensure4Options(safeStr(f.parts), formParts, extraParts);
      pushUnique(out, seen, { type: 'cloze', q: 'WC: ' + f.name + ' besteht aus ____ (' + safeStr(f.parts) + ').', options: o4.options, a: o4.a });

      // Level question (if available)
      if (WC_LVL && f.level && WC_LVL[f.level] && objKeys(WC_LVL).length >= 2) {
        var lvlLabels = objKeys(WC_LVL).map(function (k) { return WC_LVL[k].label; });
        var oL = ensure4Options(WC_LVL[f.level].label, lvlLabels, ['Basis','Aufbau','Vertiefung','Fortgeschritten']);
        pushUnique(out, seen, { type: 'mcq', q: 'WC: Welches Level hat ' + f.name + ' (in der App)?', options: oL.options, a: oL.a });
      }

      if (FOR.length >= 2) {
        var next = (idx < FOR.length - 1) ? FOR[idx + 1].name : null;
        var prev = (idx > 0) ? FOR[idx - 1].name : null;
        if (next) {
          var oN = ensure4Options(next, formNames, extraFormNames);
          pushUnique(out, seen, { type: 'mcq', q: 'WC: Welche Form folgt in der Liste direkt auf ' + f.name + '?', options: oN.options, a: oN.a });
        }
        if (prev) {
          var oP = ensure4Options(prev, formNames, extraFormNames);
          pushUnique(out, seen, { type: 'mcq', q: 'WC: Welche Form steht in der Liste direkt vor ' + f.name + '?', options: oP.options, a: oP.a });
        }
      }
    });

    // 2) Term definitions & categories
    var cats = ['Grundlagen', 'Schutztechniken', 'Beine', 'Weiteres', 'Weapon', 'Formen'];
    var extraDefs = ['Struktur halten', 'Timing finden', 'Mittellinie kontrollieren', 'Ökonomie der Bewegung'];

    if (wcAllItems.length) {
      wcAllItems.forEach(function (it, i) {
        var defs = wcAllItems.map(function (x) { return x.d; });
        var o1 = ensure4Options(it.d, defs, extraDefs);
        pushUnique(out, seen, { type: 'mcq', q: 'WC: Was beschreibt „' + it.t + '“ am besten?', options: o1.options, a: o1.a });

        var o2 = ensure4Options(it.cat, cats, ['Technik', 'Drill', 'Form', 'Waffe']);
        pushUnique(out, seen, { type: 'mcq', q: 'WC: Zu welcher Kategorie gehört „' + it.t + '“?', options: o2.options, a: o2.a });

        // cloze: choose a key word from definition
        var words = safeStr(it.d).split(/\s+/).map(function (w) { return w.replace(/[.,;:()"'“”]/g, ''); })
          .filter(function (w) { return w.length >= 6 && !/\d/.test(w); });
        if (words.length) {
          var w = words[i % words.length];
          var pool = poolAtLeast4(words, ['Struktur', 'Timing', 'Mittellinie', 'Ökonomie']);
          var o3 = ensure4Options(w, pool);
          pushUnique(out, seen, { type: 'cloze', q: 'WC: Ergänze ein Schlüsselwort: „' + it.d.replace(w, '____') + '“ (' + it.t + ')', options: o3.options, a: o3.a });
        }
      });
    }

    // 3) Core principles (creative)
    var wcPrinciples = [
      { good: 'Mittellinie schützen und übernehmen.', bad: 'Große Kreisbewegungen für jede Situation.' },
      { good: 'Ellenbogenlinie stabil, Schultern entspannt.', bad: 'Schultern hochziehen, um "stärker" zu sein.' },
      { good: 'Fühlen statt drücken (Sensitivität).', bad: 'Dauerhaft drücken, egal was passiert.' },
      { good: 'Kleine Bewegung, große Wirkung (Ökonomie).', bad: 'Ausholen, damit es spektakulär aussieht.' },
      { good: 'Timing + Struktur → kurze Power.', bad: 'Nur Tempo ohne Struktur.' },
      { good: 'Übergänge statt Festhalten (Tan/Fook/Bong).', bad: 'Position festhalten, auch wenn sie nicht passt.' }
    ];

    for (var i = 0; i < 50; i++) {
      var p = wcPrinciples[i % wcPrinciples.length];
      var opts = shuffle([p.good, p.bad, 'Distanz ignorieren und hoffen.', 'Immer rückwärts gehen, nie Linie nehmen.']);
      pushUnique(out, seen, { type: 'mcq', q: 'WC: Welcher Satz passt am besten zu Wing-Chun-Prinzipien?', options: opts, a: opts.indexOf(p.good) });

      var cl = [
        { word: 'Mittellinie', sentence: '____ zuerst – dann öffnen sich Optionen.' },
        { word: 'Struktur', sentence: 'Ohne ____ wird Timing schwer.' },
        { word: 'Timing', sentence: '____ schlägt Kraft, wenn die Struktur stimmt.' },
        { word: 'Ökonomie', sentence: '____: kurze Wege, klare Linie.' },
        { word: 'Ellenbogen', sentence: '____ tief und zentriert – Schulter locker.' }
      ];
      var t = cl[i % cl.length];
      var o = ensure4Options(t.word, ['Mittellinie', 'Timing', 'Ökonomie', 'Struktur', 'Ellenbogen', 'Hektik', 'Zufall', 'Spannung']);
      pushUnique(out, seen, { type: 'cloze', q: 'WC: Ergänze: ' + t.sentence, options: o.options, a: o.a });
    }

    // 4) Variations (always via fallbacks)
    WC_VAR.forEach(function (v) {
      var o = ensure4Options(v, WC_VAR, ['normal', 'langsam', 'Power', 'Timing']);
      pushUnique(out, seen, { type: 'mcq', q: 'WC: Welche Option ist eine Form-Variante (in der App)?', options: o.options, a: o.a });
      pushUnique(out, seen, { type: 'cloze', q: 'WC: Eine mögliche Übungs-Variante lautet ____ .', options: o.options, a: o.a });
    });

    // 5) Fillers until 220, then balance
    var fillerFactories = [];

    fillerFactories.push(function (i) {
      var base = poolAtLeast4(wcTerms, ['Tan Sao', 'Pak Sao', 'Bong Sao', 'Lap Sao']);
      var correct = base[i % base.length];
      var o = ensure4Options(correct, base);
      return { type: (i % 2 === 0 ? 'mcq' : 'cloze'), q: 'WC: Welche Option ist ein Wing-Chun-Begriff aus der App?', options: o.options, a: o.a };
    });

    fillerFactories.push(function (i) {
      var it = wcAllItems.length ? wcAllItems[i % wcAllItems.length] : { t: 'Chi Sao („Klebende Hände")', cat: 'Weiteres' };
      var o = ensure4Options(it.cat, cats, ['Technik', 'Drill', 'Form', 'Waffe']);
      return { type: 'cloze', q: 'WC: „' + it.t + '“ gehört zur Kategorie ____ .', options: o.options, a: o.a };
    });

    fillerFactories.push(function (i) {
      // Mini-scenarios: Chi Sao / Dan Chi / Struktur
      var good = [
        'Kontakt wie Feder: konstant, weich – nicht drücken.',
        'Ellenbogenlinie halten, dann Übergänge sauber wählen.',
        'Tempo reduzieren, Struktur prüfen, dann wieder beschleunigen.',
        'Vorwärtsdruck dosiert – nicht fallen, nicht verkrampfen.'
      ][i % 4];
      var opts = shuffle([good, 'Mehr Druck = immer besser.', 'Große Kreise, damit man sicher ist.', 'Atmung anhalten, damit es stabil bleibt.']);
      return { type: 'mcq', q: 'WC: Was ist der beste Coaching-Hinweis für Sensitivitäts-Drills?', options: opts, a: opts.indexOf(good) };
    });

    fillerFactories.push(function (i) {
      // Form knowledge cloze using fallback pools
      var f = FOR.length ? FOR[i % FOR.length] : { name: 'Siu Nim Tao', code: 'SNT', note: 'Kleine Idee Form', parts: '8 Sätze' };
      var o = ensure4Options(f.name, formNames, extraFormNames);
      return { type: 'cloze', q: 'WC: Die Grundform (aus der App) heißt ____ .', options: o.options, a: o.a };
    });

    ensureCount(out, seen, 220, fillerFactories);
    out = splitHalf(out, 200);
    return out;
  }

  // ---------- Export ----------
  var banks = { tkd: buildTKD(), wc: buildWC() };

  if (typeof window !== 'undefined') window.QUIZ_BANKS = banks;
  try { if (typeof QUIZ_BANKS === 'undefined') { /* eslint-disable no-undef */ QUIZ_BANKS = banks; /* eslint-enable no-undef */ } } catch (e) { }

})();
