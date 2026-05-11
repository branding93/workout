(() => {
  // TKD
  const STORAGE_KEY = 'martial-repertoire-html-v1';
  const DONE_KEY = STORAGE_KEY + ':done';
  const TIMER_KEY = STORAGE_KEY + ':timer';

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
  function prettyDateDE(d) {
    let dd = String(d.getDate()).padStart(2, '0');
    let mm = String(d.getMonth() + 1).padStart(2, '0');
    let yyyy = d.getFullYear();
    return dd + '.' + mm + '.' + yyyy;
  }
  function toast(msg) {
    let t = document.getElementById('toast');
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.style.display = 'none'; }, 2200);
  }
  function escapeHtml(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(s) { return escapeHtml(s).replace(/"/g, '&quot;'); }

  function defaultHyongSelection() {
    let v = {}; TKD_VARIATIONS.forEach(function (x) { v[x] = false; });
    return { variations: v, rounds: 1 };
  }
  function defaultFormSelection() {
    let v = {}; WC_VARIATIONS.forEach(function (x) { v[x] = false; });
    return { variations: v, rounds: 1 };
  }
  function mapForStrings(arr) { let m = {}; arr.forEach(function (x) { m[x] = false; }); return m; }
  function mapForItems(arr) { let m = {}; arr.forEach(function (x) { m[x.t] = false; }); return m; }

  function makeInitialState() {
    let tkdHy = {}; HYONGS.forEach(function (h) { tkdHy[h.id] = defaultHyongSelection(); });
    let wcFo = {}; FORMS.forEach(function (f) { wcFo[f.id] = defaultFormSelection(); });
    return {
      tkd: {
        hyongs: tkdHy, combos: mapForStrings(COMBOS), sparring: mapForStrings(SPARRING), basics: (function () {
          let b = {}; Object.keys(BASICS).forEach(function (k) { BASICS[k].forEach(function (i) { b[i] = false; }); }); return b;
        })(), note: ''
      },
      wc: { forms: wcFo, grundlagen: mapForItems(GRUNDLAGEN), armhand: mapForItems(ARM_HAND), beine: mapForItems(BEINE), weitere: mapForItems(WEITERE_HAND), weapon: mapForItems(WEAPON), note: '' },
      other: { kraft: mapForItems(OTHER_KRAFT), boxen: mapForItems(OTHER_BOXEN), sonstiges: mapForItems(OTHER_SONST), note: '' }
    };
  }

  function safeParseJSON(raw, fallback) { try { return JSON.parse(raw); } catch (e) { return fallback; } }
  function mergeBoolMap(baseMap, parsedMap) {
    let out = Object.assign({}, baseMap, parsedMap || {});
    Object.keys(out).forEach(function (k) { if (typeof out[k] !== 'boolean') out[k] = false; });
    return out;
  }
  function safeLoad() {
    let base = makeInitialState();
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    let parsed = safeParseJSON(raw, null);
    if (!parsed || typeof parsed !== 'object') return base;

    let merged = {
      tkd: {
        hyongs: Object.assign({}, base.tkd.hyongs, (parsed.tkd && parsed.tkd.hyongs) || {}),
        combos: mergeBoolMap(base.tkd.combos, parsed.tkd && parsed.tkd.combos),
        sparring: mergeBoolMap(base.tkd.sparring, parsed.tkd && parsed.tkd.sparring),
        basics: mergeBoolMap(base.tkd.basics, parsed.tkd && parsed.tkd.basics),
        note: (parsed.tkd && typeof parsed.tkd.note === 'string') ? parsed.tkd.note : ''
      },
      wc: {
        forms: Object.assign({}, base.wc.forms, (parsed.wc && parsed.wc.forms) || {}),
        grundlagen: mergeBoolMap(base.wc.grundlagen, parsed.wc && parsed.wc.grundlagen),
        armhand: mergeBoolMap(base.wc.armhand, parsed.wc && parsed.wc.armhand),
        beine: mergeBoolMap(base.wc.beine, parsed.wc && parsed.wc.beine),
        weitere: mergeBoolMap(base.wc.weitere, parsed.wc && parsed.wc.weitere),
        weapon: mergeBoolMap(base.wc.weapon, parsed.wc && parsed.wc.weapon),
        note: (parsed.wc && typeof parsed.wc.note === 'string') ? parsed.wc.note : ''
      },
      other: {
        kraft: mergeBoolMap(base.other.kraft, parsed.other && parsed.other.kraft),
        boxen: mergeBoolMap(base.other.boxen, parsed.other && parsed.other.boxen),
        sonstiges: mergeBoolMap(base.other.sonstiges, parsed.other && parsed.other.sonstiges),
        note: (parsed.other && typeof parsed.other.note === 'string') ? parsed.other.note : ''
      }
    };

    HYONGS.forEach(function (h) {
      if (!merged.tkd.hyongs[h.id]) merged.tkd.hyongs[h.id] = defaultHyongSelection();
      if (!merged.tkd.hyongs[h.id].variations) merged.tkd.hyongs[h.id].variations = defaultHyongSelection().variations;
      TKD_VARIATIONS.forEach(function (v) { if (typeof merged.tkd.hyongs[h.id].variations[v] !== 'boolean') merged.tkd.hyongs[h.id].variations[v] = false; });
      if (typeof merged.tkd.hyongs[h.id].rounds !== 'number') merged.tkd.hyongs[h.id].rounds = 1;
      merged.tkd.hyongs[h.id].rounds = clamp(Math.round(merged.tkd.hyongs[h.id].rounds), 1, 20);
    });

    FORMS.forEach(function (f) {
      if (!merged.wc.forms[f.id]) merged.wc.forms[f.id] = defaultFormSelection();
      if (!merged.wc.forms[f.id].variations) merged.wc.forms[f.id].variations = defaultFormSelection().variations;
      WC_VARIATIONS.forEach(function (v) { if (typeof merged.wc.forms[f.id].variations[v] !== 'boolean') merged.wc.forms[f.id].variations[v] = false; });
      if (typeof merged.wc.forms[f.id].rounds !== 'number') merged.wc.forms[f.id].rounds = 1;
      merged.wc.forms[f.id].rounds = clamp(Math.round(merged.wc.forms[f.id].rounds), 1, 20);
    });

    return merged;
  }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { } }

  function getDoneMap() { return safeParseJSON(localStorage.getItem(DONE_KEY) || '{}', {}); }
  function saveDoneMap(m) { try { localStorage.setItem(DONE_KEY, JSON.stringify(m)); } catch (e) { } }
  function ensureDoneKeys(keys) {
    let map = getDoneMap();
    let present = {};
    keys.forEach(function (k) { present[k] = true; });
    Object.keys(map).forEach(function (k) { if (!present[k]) delete map[k]; });
    keys.forEach(function (k) { if (typeof map[k] !== 'boolean') map[k] = false; });
    saveDoneMap(map);
    return map;
  }

  // ========= Glossary =========
  const glossary = {};
  // Standard-Erklärungsbild (wird genutzt, wenn pro Begriff kein anderes Bild gesetzt ist)
  const DEFAULT_INFO_IMAGE = 'https://thumbs.dreamstime.com/b/taekwondo-und-karate-schattenbilder-66648929.jpg?w=576';

  // Optional: pro Begriff individuelles Bild (nur Link)
  // Weitere Bilder können hier analog ergänzt werden: TERM_IMAGES['Begriff'] = 'https://...';
  const TERM_IMAGES = {
    'Fook Sao': 'https://mypassion-wingchun-selfdefense.de/wp-content/uploads/2026/03/ModernSelfdefense__35_-removebg-preview.png',
    'Pak Sao': 'https://mypassion-wingchun-selfdefense.de/wp-content/uploads/2026/03/ModernSelfdefense__36_-removebg-preview1.png',
    'Tan Sao': 'https://mypassion-wingchun-selfdefense.de/wp-content/uploads/2026/03/ModernSelfdefense__38_-removebg-preview1.png',
    'Bong Sao': 'https://mypassion-wingchun-selfdefense.de/wp-content/uploads/2026/03/ModernSelfdefense__39_-removebg-preview1.png',
    'Kao Sao': 'https://mypassion-wingchun-selfdefense.de/wp-content/uploads/2026/03/ModernSelfdefense__41_-removebg-preview1.png',
    'Jam Sao': 'https://mypassion-wingchun-selfdefense.de/wp-content/uploads/2026/03/ModernSelfdefense__40_-removebg-preview1.png',
    'Gaun Sao': 'https://mypassion-wingchun-selfdefense.de/wp-content/uploads/2026/03/ModernSelfdefense__42_-removebg-preview1.png',
    'Gum Sao': 'https://mypassion-wingchun-selfdefense.de/wp-content/uploads/2026/03/ModernSelfdefense__43_-removebg-preview1.png',
    'Chon-Ji Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/e1/1-e1bb1618.avif?src=images/stories/sonstiges/hyong/diagram/1.jpg&type=avif,75&hash=7e757bd5',
    'Tan-Gun Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/24/2-24df60a8.avif?src=images/stories/sonstiges/hyong/diagram/2.jpg&type=avif,75&hash=3c4f00ed',
    'To-San Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/4f/3-4f3ed6c6.avif?src=images/stories/sonstiges/hyong/diagram/3.jpg&type=avif,75&hash=3ecf06e8',
    'Won-Hyo Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/74/4-74cb815a.avif?src=images/stories/sonstiges/hyong/diagram/4.jpg&type=avif,75&hash=c7178f69',
    'Yul-Gok Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/ca/5_korr-caae026b.avif?src=images/stories/sonstiges/hyong/diagram/5_korr.jpg&type=avif,75&hash=1a54afae',
    'Chung-Gun Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/86/6-86f50919.avif?src=images/stories/sonstiges/hyong/diagram/6.jpg&type=avif,75&hash=d3186610',
    'Toi-Gye Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/2c/7-2cabfd37.avif?src=images/stories/sonstiges/hyong/diagram/7.jpg&type=avif,75&hash=43c9f6c4',
    'Hwa-Rang Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/26/8-2608db0e.avif?src=images/stories/sonstiges/hyong/diagram/8.jpg&type=avif,75&hash=e1e438d7',
    'Chung-Mu': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/df/9-dfa0306d.avif?src=images/stories/sonstiges/hyong/diagram/9.jpg&type=avif,75&hash=8489c110',
    'Gwang-Gae Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/de/10_korr-dec0bfad.avif?src=images/stories/sonstiges/hyong/diagram/10_korr.jpg&type=avif,75&hash=f48946ec',
  };

  function normTermKey(s) { return String(s || '').trim(); }

  // NOTE: this avoids ES2018 Unicode codepoint escapes (\u{...}) to prevent syntax errors in some editors/browsers.
  function canonicalTerm(term) {
    let s = String(term || '').trim();

    // Remove leading emoji/symbol (surrogate pair or BMP symbols)
    s = s.replace(/^(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF])\s*/, '');
    s = s.replace(/^[•\-]\s*/, '');

    // Strip leading roman numerals like "I " / "II "
    s = s.replace(/^(?:[IVX]+)\s+/i, '');

    // Strip some trailing meta parentheses (keep romanization parentheses like "(jeongul seogi)")
    let m = s.match(/\s*\(([^)]+)\)\s*$/);
    if (m) {
      let inside = String(m[1] || '').trim();
      let looksCode = /^[A-Z0-9\-]{1,8}$/.test(inside);
      let hasDigits = /[0-9]/.test(inside);
      let hasMetaWords = /(Sätze|Teile|x|—)/i.test(inside);
      let looksLowerRomanization = /^[a-zäöüß\s\-]+$/i.test(inside) && inside.toLowerCase() === inside && inside.indexOf(' ') !== -1;
      if ((looksCode || hasDigits || hasMetaWords) && !looksLowerRomanization) {
        s = s.replace(/\s*\([^)]+\)\s*$/, '').trim();
      }
    }
    return s;
  }


  function termImageUrl(term) {
    const raw = String(term || '').trim();
    const canon = canonicalTerm(raw) || raw;
    // 1) explizit im Entry gesetzt (entry.img) wird in openGlossary geprüft
    // 2) term-spezifische Map
    if (TERM_IMAGES && TERM_IMAGES[canon]) return TERM_IMAGES[canon];
    // 3) Fallback
    return DEFAULT_INFO_IMAGE;
  }

  function addGloss(term, entry) { glossary[canonicalTerm(term)] = entry; }

  addGloss('Chi Sao („Klebende Hände")', {
    ctx: 'Wing Chun',
    t: '„Klebende Hände“ (Partnerdrill)',
    m: 'Kontakt-Drill am Unterarm: Druck/Entlastung fühlen, mit Struktur „kleben“ und reagieren.',
    z: 'Sensitivität, Reflexe, Öffnungen erkennen, Kontrolle der Mittellinie.',
    p: 'Ökonomie + Timing + Struktur (kleine Bewegung, große Wirkung).'
  });

  function tkdKickEntry(term) {
    let t = canonicalTerm(term);
    let map = {
      'Ap Chagui': { t: 'Fronttritt (nach vorn)', m: 'Knie hoch, Fußballen/Spann einsetzen; gerade nach vorn stoßen und sauber zurückziehen.', z: 'Distanz aufbauen, Timing für direkte Treffer, Kontrolle und Schnelligkeit.', p: 'Hüftvorschub, stabile Achse, Recoil – Präzision vor Power.' },
      'Naeryo Chagui': { t: 'Axttritt / Abwärtstritt', m: 'Bein hoch anheben und kontrolliert von oben nach unten „fällen“ (Ferse/Spann je nach Stil).', z: 'Abwärtsdruck, Guard brechen, Reichweite nutzen.', p: 'Balance, kontrollierte Hüfte, gerader Oberkörper – sauberer Winkel.' },
      'Dollyo Chagui': { t: 'Rundtritt', m: 'Knie anheben, Hüfte drehen, rund zur Seite einschlagen (Spann/Rist).', z: 'Treffer aus Winkel, Speed-Power, Hüftrotation trainieren.', p: 'Hüftrotation + Standstabilität + schnelles Recoil.' },
      'Yop Chagui': { t: 'Seittritt', m: 'Knie hoch, Hüfte „einrasten“, Ferse gerade seitlich stoßen.', z: 'Stopp-Kick, Distanz halten, starke Linie.', p: 'Körperlinie/Struktur, Ferse führt, Rumpfspannung.' },
      'Pandae Dollyo Chagui': { t: 'Gegen-Rundtritt / Reverse Roundhouse', m: 'Rundtritt mit Gegenbewegung/anderem Hüftwinkel – trifft oft „von außen“.', z: 'Winkelwechsel, unerwartete Linie, Timing.', p: 'Rotation + Balance; kontrollierter Fußweg.' },
      'Tui Chagui': { t: 'Rückwärtskick / Back Kick', m: 'Drehen, Blick über Schulter, Ferse gerade nach hinten stoßen.', z: 'Konter aus Distanz, starke Gerade, Timing beim Drehen.', p: 'Blick zuerst, Hüfte gerade, stabile Standachse.' },
      'Twio Yop Chagui': { t: 'Sprungseittritt', m: 'Abspringen und Seittritt in der Luft mit Ferse ausstoßen.', z: 'Explosivität, Distanz überbrücken, sauberes Treffen unter Dynamik.', p: 'Timing beim Absprung, Struktur in der Luft, sichere Landung.' }
    };
    return map[t] || null;
  }

  function wcTechEntry(term) {
    let t = canonicalTerm(term);
    let map = {
      'Fook Sao': { t: '„Kontrollierende/leitende Hand“', m: 'Unterarm führt kontrolliert, hält Kontakt und „fühlt“ Druck.', z: 'Kontakt halten, Linie kontrollieren, Übergänge vorbereiten.', p: 'Entspannte Struktur, Ellenbogenlinie, fühlen statt drücken.' },
      'Pak Sao': { t: '„Klatsch-/Schlaghand“', m: 'Kurzes Abklatschen/Abschlagen zur Öffnung, oft mit Gegenhand treffen.', z: 'Linie öffnen, Trefferfenster erzeugen.', p: 'Kurzer Weg, Timing, kein Ausholen.' },
      'Tan Sao': { t: '„Tragende Hand“', m: 'Handfläche oben; lenkt ab und schützt die Mittellinie.', z: 'Umlenken + direkt kontern.', p: 'Ellenbogen tief, Kraft leiten statt blocken.' },
      'Bong Sao': { t: '„Flügelarm“', m: 'Ellbogen als „Flügel“; lenkt Kraft um, schafft Winkel.', z: 'Druck umlenken, Übergang.', p: 'Winkel statt Muskelkraft.' },
      'Jam Sao': { t: '„Sinkender Arm/Ellenbogen“', m: 'Ellenbogen senkt; stabilisiert Struktur und leitet Druck nach unten.', z: 'Struktur unter Druck, Kontrolle.', p: 'Achse, Ellenbogenlinie, Kraft nach unten.' },
      'Lap Sao': { t: '„Ziehende/Greifende Hand“', m: 'Greifen und kurz ziehen, um Linie zu öffnen/Struktur zu brechen.', z: 'Öffnung schaffen, Gegner binden.', p: 'Timing vor Kraft; kurze Aktion.' },
      'Man Sao': { t: '„Frage-/Suchhand“', m: 'Vorderhand tastet Distanz und schützt Zentrum.', z: 'Distanzgefühl, sichere Annäherung.', p: 'Entspannung, Struktur, Timing.' },
      'Wu Sao': { t: '„Schützende Hand“', m: 'Rückhand schützt Zentrum als „Sicherheitsnetz“.', z: 'Zentrum sichern, Übergänge abfangen.', p: 'Ellenbogenlinie, Ökonomie.' },
      'Huen Sao': { t: '„Kreisende Hand“', m: 'Kreisende Ableitung/Öffnung zur Veränderung des Kontakts.', z: 'Linienwechsel, Übergänge.', p: 'Kleine Kreise, Timing.' },
      'Lan Sao': { t: '„Riegelarm/Bar Arm“', m: 'Seitliches Abriegeln/Abfangen, sperrt eine Linie.', z: 'Raum kontrollieren, Konterfenster.', p: 'Struktur + Winkel.' },
      'Jing Gerk': { t: 'Fronttritt', m: 'Kurzer gerader Tritt nach vorn, oft als Stopper.', z: 'Distanz halten, Timing stören.', p: 'Minimaler Weg, Struktur.' },
      'Yap Gerk': { t: '„Abdrückendes Bein“ (nach außen)', m: 'Abwehrbein drückt nach außen, lenkt Linie ab.', z: 'Linie öffnen, stabilisieren.', p: 'Timing, Stand.' },
      'Bong Gerk': { t: '„Schwingenbein“ (nach innen)', m: 'Nach innen abwehrende Beinbewegung zum Umlenken.', z: 'Linie schließen, Distanz.', p: 'Timing, Balance.' },
      'Einarmiges Dan Chi': { t: 'Einarmiger Kontakt-Drill (Vorstufe Chi Sao)', m: 'Ein Arm im Kontakt; Rollen/Wechseln im Rhythmus.', z: 'Kontaktgefühl, Timing, Basisreflexe.', p: 'Entspannung, Ellenbogenlinie.' },
      'Beidarmiges Pon Sao': { t: 'Beidarmiger Kontakt-Drill (Vorstufe Chi Sao)', m: 'Beide Arme im Kontakt; Struktur halten und wechseln.', z: 'Sensitivität, Koordination.', p: 'Struktur, Timing, kurze Wege.' }
    };
    return map[t] || null;
  }

  function looksKorean(term) { return /Chagui|Hyong|seogi|Magki|Palmok|Sudo|Pandae|Twio|Tui/i.test(term); }
  function looksWC(term) { return /\bSao\b|\bGerk\b|\bCuan\b|Siu Nim Tao|Chum Kiu|Biu Tze|Dan Chi|Pon Sao|Mittellinie/i.test(term); }

  function autoEntry(term, ctxHint) {
    let raw = normTermKey(term);
    let canon = canonicalTerm(raw);
    let ctx = ctxHint || (looksWC(canon) ? 'Wing Chun' : (looksKorean(canon) ? 'Taekwondo' : 'Weiteres'));

    if (ctx === 'Taekwondo') {
      let k = tkdKickEntry(canon);
      if (k) return { ctx: 'Taekwondo', t: k.t, m: k.m, z: k.z, p: k.p };

      if (/Vorwärts-Stellung/i.test(canon) || /jeongul seogi/i.test(raw)) {
        return { ctx: 'Taekwondo', t: 'Vorwärts-Stellung (jeongul seogi) – langer Stand nach vorn', m: 'Vorderes Knie beugt, hinteres Bein streckt; Gewicht stabil in Linie nach vorn.', z: 'Stabilität, Reichweite, Kraftübertragung.', p: 'Bodenverbindung, Hüfte ausrichten, saubere Knieachse.' };
      }
      if (/Rückwärts-Stellung/i.test(canon) || /hugul seogi/i.test(raw)) {
        return { ctx: 'Taekwondo', t: 'Rückwärts-Stellung (hugul seogi) – defensiver Stand', m: 'Gewicht eher hinten, vorderes Bein entlastet; schnelle Wechsel möglich.', z: 'Distanzkontrolle, Konter vorbereiten.', p: 'Gewichtsverlagerung, Balance, Timing.' };
      }
      if (/Sudo Daebi Magki/i.test(canon)) {
        return { ctx: 'Taekwondo', t: 'Handkanten-Schutzblock (Sudo Daebi Magki)', m: 'Handkante in Schutzposition; blockt/lenkt mit Struktur.', z: 'Schutz + Öffnung.', p: 'Kurze Wege, stabiler Stand.' };
      }
      if (/Palmok Daebi Magki/i.test(canon)) {
        return { ctx: 'Taekwondo', t: 'Unterarm-Schutzblock (Palmok Daebi Magki)', m: 'Unterarm in Schutzposition; kontrolliert ablenken/stoppen.', z: 'Zentrum schützen, Linie umlenken.', p: 'Kraft leiten, Schulter stabil.' };
      }
      if (/Hyong/i.test(canon)) {
        return { ctx: 'Taekwondo', t: 'Form (Hyong) – festgelegte Bewegungsabfolge', m: 'Abfolge von Blöcken, Schlägen und Ständen in festem Ablauf.', z: 'Koordination, Rhythmus, Präzision, Atmung.', p: 'Timing (langsam → schnell), Hüftarbeit, Stand.' };
      }
      if (/Chagui/i.test(canon)) {
        return { ctx: 'Taekwondo', t: 'Tritt (Chagui)', m: 'Tritttechnik aus Stand/Hüfte, sauber zurückziehen.', z: 'Trefferbild, Balance, Distanzgefühl.', p: 'Hüfte, Stand, Recoil.' };
      }
      if (/Magki/i.test(canon) || /Block/i.test(canon)) {
        return { ctx: 'Taekwondo', t: 'Block / Abwehr', m: 'Angriffslinie schließen, Winkel setzen, Struktur halten.', z: 'Schutz + Gegenangriff vorbereiten.', p: 'Körperachse, kurze Wege.' };
      }
      if (/ilbo daeryeon/i.test(raw) || /Einschrittkampf/i.test(canon)) {
        return { ctx: 'Taekwondo', t: 'Einschrittkampf (ilbo daeryeon)', m: 'Partnerdrill: Angriff/Abwehr in einem Schritt mit Distanzkontrolle.', z: 'Timing, Distanz, klare Technik unter Druck.', p: 'Stand + Atmung + Timing.' };
      }
    }

    if (ctx === 'Wing Chun') {
      let wc = wcTechEntry(canon);
      if (wc) return { ctx: 'Wing Chun', t: wc.t, m: wc.m, z: wc.z, p: wc.p };

      if (/Siu Nim Tao/i.test(canon)) {
        return { ctx: 'Wing Chun', t: '„Kleine Idee Form“', m: 'Grundform im Stand: Struktur, Hände, Ellenbogenlinie.', z: 'Basisstruktur, Kraftlinie, Koordination.', p: 'Ökonomie, Mittellinie, entspannte Stabilität.' };
      }
      if (/Chum Kiu/i.test(canon)) {
        return { ctx: 'Wing Chun', t: '„Arme suchende Form“', m: 'Form mit Körperdrehungen und Schritten; Hand–Körper Verbindung.', z: 'Winkel, Distanz, Rotation.', p: 'Timing + Struktur über Drehung.' };
      }
      if (/Biu Tze/i.test(canon)) {
        return { ctx: 'Wing Chun', t: '„Stoßende Finger“', m: 'Form mit Notfall-/Rettungsbewegungen und kurzen Impulsen.', z: 'Anpassungsfähigkeit, kurze Power.', p: 'Direktheit, Struktur.' };
      }
      if (/\bSao\b/i.test(canon)) {
        return { ctx: 'Wing Chun', t: 'Handform/Technik („Sao“)', m: 'Führen/lenken/kontrollieren entlang der Mittellinie.', z: 'Kontrolle, Öffnungen schaffen.', p: 'Ellenbogen tief, kurze Wege.' };
      }
      if (/\bGerk\b/i.test(canon)) {
        return { ctx: 'Wing Chun', t: 'Beintechnik („Gerk“)', m: 'Kurze, stabile Beinaktion als Stopper/Abwehr.', z: 'Distanz halten, Timing stören.', p: 'Minimaler Weg, Stand.' };
      }
      if (/\bCuan\b/i.test(canon)) {
        return { ctx: 'Wing Chun', t: 'Fausttechnik („Cuan“) / Weapon-Drill', m: 'Geradlinige, strukturierte Ausführung.', z: 'Trefferbild, Linie kontrollieren.', p: 'Linie, Distanz, Timing.' };
      }
      if (/Kampfstellung/i.test(canon)) {
        return { ctx: 'Wing Chun', t: 'Kampfstellung', m: 'Stabiler Stand, Mittellinie geschützt, bereit für Vorwärtsdruck.', z: 'Stabilität + Reaktion.', p: 'Struktur, Balance.' };
      }
      if (/Richtungs-Wechsel/i.test(canon)) {
        return { ctx: 'Wing Chun', t: 'Richtungs-Wechsel', m: 'Winkelwechsel über Schritt/Drehung; Linie neu ausrichten.', z: 'Besserer Winkel, Distanz kontrollieren.', p: 'Timing, Ökonomie.' };
      }
    }

    // Weiteres defaults
    if (ctx === 'Weiteres') {
      if (/Liegestütz/i.test(canon)) return { ctx: 'Weiteres', t: 'Push-up', m: 'Körper gerade, kontrolliert absenken/hochdrücken.', z: 'Brust/Trizeps/Core stärken.', p: 'Rumpfspannung, saubere Linie.' };
      if (/Kniebeuge/i.test(canon)) return { ctx: 'Weiteres', t: 'Squat', m: 'Hüfte nach hinten/unten, Knie stabil, aufrichten.', z: 'Beinkraft, Hüftstabilität.', p: 'Saubere Achse, Kontrolle.' };
      if (/Plank/i.test(canon)) return { ctx: 'Weiteres', t: 'Unterarmstütz', m: 'Halten in gerader Linie, Bauch/Glute aktiv.', z: 'Core-Stabilität.', p: 'Spannung dosieren, ruhig atmen.' };
      if (/Crunches/i.test(canon)) return { ctx: 'Weiteres', t: 'Bauch-Crunch', m: 'Rumpf kurz anheben, kontrolliert absenken.', z: 'Bauchkraft + Kontrolle.', p: 'Keine Schwungbewegung.' };
      if (/Klimmzüge/i.test(canon)) return { ctx: 'Weiteres', t: 'Pull-up', m: 'Hängen → hochziehen, kontrolliert senken.', z: 'Rücken/Griffkraft.', p: 'Saubere Schulterposition.' };
      if (/Jab-Cross/i.test(canon)) return { ctx: 'Weiteres', t: 'Gerade-1-2', m: 'Jab → Cross mit Rotation.', z: 'Rhythmus, Distanzgefühl.', p: 'Rotation aus Hüfte/Stand.' };
      if (/Hook-Hook/i.test(canon)) return { ctx: 'Weiteres', t: 'Hakenkombination', m: 'Seitliche Schläge mit Rotation und stabilem Stand.', z: 'Power aus Rotation.', p: 'Stand, Hüfte, Deckung.' };
      if (/Slip-Roll/i.test(canon)) return { ctx: 'Weiteres', t: 'Ausweichen + Abrollen', m: 'Slip (seitlich) + Roll (unter) – kontrolliert.', z: 'Defensiv-Timing, Konterfenster.', p: 'Kleine Bewegung, Blick.' };
      if (/Shadowboxing/i.test(canon)) return { ctx: 'Weiteres', t: 'Schattenboxen', m: 'Freie Runden: Kombinationen + Footwork ohne Partner.', z: 'Flow, Technikpflege, Kondition.', p: 'Sauberkeit vor Tempo.' };
      if (/Pratzen/i.test(canon)) return { ctx: 'Weiteres', t: 'Padwork', m: 'Schläge/Kicks auf Pratzen mit Timing/Ansage.', z: 'Trefferbild, Reaktion.', p: 'Timing, Distanz.' };
      if (/Seilspringen/i.test(canon)) return { ctx: 'Weiteres', t: 'Rope skipping', m: 'Gleichmäßige Sprünge, Rhythmus halten.', z: 'Warm-up, Fußarbeit, Kondition.', p: 'Leicht, elastisch.' };
      if (/Dehnen/i.test(canon) || /Cooldown/i.test(canon)) return { ctx: 'Weiteres', t: 'Dehnen / Cooldown', m: 'Sanftes Dehnen, Range ohne Schmerz erweitern.', z: 'Regeneration, Beweglichkeit.', p: 'Ruhig atmen, nicht reißen.' };
      if (/Mobility/i.test(canon)) return { ctx: 'Weiteres', t: 'Mobilität', m: 'Kontrollierte Gelenkbewegungen für Hüfte/Schulter.', z: 'Bewegungsqualität, Range.', p: 'Kontrolle, langsam steigern.' };
    }

    return { ctx: ctx, t: '—', m: 'Kurze Übungsbeschreibung.', z: 'Technik, Kontrolle und Wiederholungsqualität verbessern.', p: 'Saubere Struktur, Timing und dosierte Spannung.' };
  }

  function ensureGlossary(term, ctxHint) {
    let raw = normTermKey(term);
    if (!raw) return null;
    let canon = canonicalTerm(raw) || raw;
    if (!glossary[canon]) glossary[canon] = autoEntry(raw, ctxHint);
    return glossary[canon];
  }

  function openGlossary(term, ctxHint) {
    let raw = normTermKey(term);
    if (!raw) return;
    let canon = canonicalTerm(raw) || raw;
    let entry = ensureGlossary(raw, ctxHint);

    let back = document.getElementById('glossaryBack');
    document.getElementById('glossTitle').textContent = raw;
    document.getElementById('glossSub').textContent = 'Kontext: ' + (entry.ctx || ctxHint || '—');
    document.getElementById('glossT').textContent = entry.t || '—';
    document.getElementById('glossM').textContent = entry.m || '—';
    document.getElementById('glossZ').textContent = entry.z || '—';
    document.getElementById('glossP').textContent = entry.p || '—';

    // Erklärungsbild: Default oder pro Begriff überschreibbar
    const imgEl = document.getElementById('glossImg');
    if (imgEl) {
      const src = (entry && entry.img) ? entry.img : termImageUrl(raw);
      imgEl.src = src;
      imgEl.alt = 'Erklärungsbild: ' + raw;
    }

    back.classList.add('show');
    back.setAttribute('aria-hidden', 'false');
    glossary[canon] = entry;
  }
  function closeGlossary() {
    let back = document.getElementById('glossaryBack');
    back.classList.remove('show');
    back.setAttribute('aria-hidden', 'true');
  }
  document.getElementById('glossClose').addEventListener('click', closeGlossary);
  document.getElementById('glossOk').addEventListener('click', closeGlossary);
  document.getElementById('glossaryBack').addEventListener('click', function (e) { if (e.target === this) closeGlossary(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeGlossary(); });

  const makeTermUI = (term, ctxHint, prefixIcon) => {
    const safe = escapeHtml(term);
    const icon = prefixIcon ? `${prefixIcon} ` : '';
    return `
<span class="termWrap">
  <button class="termBtn js-term" type="button" data-term="${escapeAttr(term)}" data-ctx="${escapeAttr(ctxHint || '')}">${icon}${safe}</button>
  <button class="infoBtn js-term" type="button" aria-label="Erklärung" data-term="${escapeAttr(term)}" data-ctx="${escapeAttr(ctxHint || '')}">ⓘ</button>
</span>
`.trim();
  };

  // ========= Router + Swipe =========
  const viewOrder = ['tkd', 'wc', 'other', 'training', 'timer'];
  let currentView = 'tkd';
  function setNavActive(id) {
    ['navTKD', 'navWC', 'navOTHER', 'navTRAIN', 'navTIMER'].forEach(function (b) {
      let el = document.getElementById(b);
      el.classList.toggle('active', b === id);
      el.setAttribute('aria-selected', b === id ? 'true' : 'false');
    });
  }
  function showView(name) {
    currentView = name;
    let _root = document.getElementById('appRoot');
    if (_root) _root.setAttribute('data-theme', (name === 'tkd') ? 'tkd' : ((name === 'wc') ? 'wc' : ''));
    ['tkd', 'wc', 'other', 'training', 'timer'].forEach(function (v) {
      document.getElementById('view-' + v).classList.toggle('active', v === name);
    });
    if (name === 'tkd') setNavActive('navTKD');
    if (name === 'wc') setNavActive('navWC');
    if (name === 'other') setNavActive('navOTHER');
    if (name === 'training') setNavActive('navTRAIN');
    if (name === 'timer') setNavActive('navTIMER');
    if (name === 'training') renderTraining();
    if (name === 'timer') timerUpdate();
    setBadge();
  }
  document.getElementById('navTKD').addEventListener('click', () => { showView('tkd'); });
  document.getElementById('navWC').addEventListener('click', () => { showView('wc'); });
  document.getElementById('navOTHER').addEventListener('click', () => { showView('other'); });
  document.getElementById('navTRAIN').addEventListener('click', () => { showView('training'); });
  document.getElementById('navTIMER').addEventListener('click', () => { showView('timer'); });

  const swipe = { active: false, x0: 0, y0: 0, x1: 0, y1: 0, locked: null, t0: 0 };
  function isInteractiveTarget(t) {
    if (!t) return false;
    let tag = (t.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button' || tag === 'label') return true;
    if (t.closest && t.closest('input,textarea,select,button,label,.chips,.miniBtns,.tabs,.termWrap')) return true;
    return false;
  }
  function canSwipeStart(e) {
    let ae = document.activeElement;
    if (ae && ((ae.tagName || '').toLowerCase() === 'input' || (ae.tagName || '').toLowerCase() === 'textarea')) return false;
    if (isInteractiveTarget(e.target)) return false;
    return true;
  }
  function goNext(dir) {
    let idx = viewOrder.indexOf(currentView);
    if (idx < 0) idx = 0;
    let next = idx + dir;
    if (next < 0 || next >= viewOrder.length) return;
    showView(viewOrder[next]);
  }
  document.addEventListener('touchstart', function (e) {
    if (e.touches && e.touches.length !== 1) return;
    if (!canSwipeStart(e)) return;
    swipe.active = true;
    swipe.locked = null;
    swipe.t0 = Date.now();
    swipe.x0 = e.touches[0].clientX;
    swipe.y0 = e.touches[0].clientY;
    swipe.x1 = swipe.x0;
    swipe.y1 = swipe.y0;
  }, { passive: true });
  document.addEventListener('touchmove', function (e) {
    if (!swipe.active || !e.touches || e.touches.length !== 1) return;
    swipe.x1 = e.touches[0].clientX;
    swipe.y1 = e.touches[0].clientY;
    let dx = swipe.x1 - swipe.x0;
    let dy = swipe.y1 - swipe.y0;
    if (!swipe.locked) {
      if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
        swipe.locked = (Math.abs(dy) > Math.abs(dx)) ? 'scroll' : 'swipe';
      }
    }
    if (swipe.locked === 'scroll') return;
  }, { passive: true });
  document.addEventListener('touchend', function () {
    if (!swipe.active) return;
    swipe.active = false;
    if (swipe.locked !== 'swipe') return;
    let dx = swipe.x1 - swipe.x0;
    let dy = swipe.y1 - swipe.y0;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < 70) return;
    if (Date.now() - swipe.t0 < 80) return;
    if (dx < 0) goNext(+1); else goNext(-1);
  }, { passive: true });
  const wheelLock = { last: 0 };
  document.addEventListener('wheel', function (e) {
    if (Date.now() - wheelLock.last < 650) return;
    if (Math.abs(e.deltaX) < 70) return;
    if (Math.abs(e.deltaY) > 25) return;
    if (isInteractiveTarget(e.target)) return;
    let ae = document.activeElement;
    if (ae && ((ae.tagName || '').toLowerCase() === 'input' || (ae.tagName || '').toLowerCase() === 'textarea')) return;
    wheelLock.last = Date.now();
    if (e.deltaX > 0) goNext(+1); else goNext(-1);
  }, { passive: true });

  // ========= Counts =========
  function countSelectedAll() {
    let tkd = 0, wc = 0, other = 0;

    HYONGS.forEach(function (h) {
      let sel = state.tkd.hyongs[h.id];
      let any = false;
      TKD_VARIATIONS.forEach(function (v) { if (sel && sel.variations && sel.variations[v]) any = true; });
      if (any) tkd += 1;
    });
    Object.keys(state.tkd.combos).forEach(function (k) { if (state.tkd.combos[k]) tkd += 1; });
    Object.keys(state.tkd.sparring).forEach(function (k) { if (state.tkd.sparring[k]) tkd += 1; });
    Object.keys(state.tkd.basics).forEach(function (k) { if (state.tkd.basics[k]) tkd += 1; });

    FORMS.forEach(function (f) {
      let sel = state.wc.forms[f.id];
      let any = false;
      WC_VARIATIONS.forEach(function (v) { if (sel && sel.variations && sel.variations[v]) any = true; });
      if (any) wc += 1;
    });
    function countMap(m) { let c = 0; Object.keys(m).forEach(function (k) { if (m[k]) c += 1; }); return c; }
    wc += countMap(state.wc.grundlagen);
    wc += countMap(state.wc.armhand);
    wc += countMap(state.wc.beine);
    wc += countMap(state.wc.weitere);
    wc += countMap(state.wc.weapon);

    other += countMap(state.other.kraft);
    other += countMap(state.other.boxen);
    other += countMap(state.other.sonstiges);

    return { tkd: tkd, wc: wc, other: other, all: (tkd + wc + other) };
  }
  let _lastBadgeTotal = null;
  function pulseSelectedBadge() {
    let el = document.getElementById('selectedBadge');
    if (!el) return;
    el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse');
    setTimeout(function () { el.classList.remove('pulse'); }, 260);
  }
  function setBadge() {
    let counts = countSelectedAll();
    let total = counts.all; let _changed = (_lastBadgeTotal !== null && total !== _lastBadgeTotal);
    document.getElementById('selectedBadge').textContent = '📋 ' + total + ' Auswahl' + (total === 1 ? '' : 'en');
    document.getElementById('kpi-tkd').textContent = String(counts.tkd);
    document.getElementById('kpi-wc').textContent = String(counts.wc);
    document.getElementById('kpi-other').textContent = String(counts.other);
    document.getElementById('kpi-all').textContent = String(total);
    document.getElementById('train-selectedCount').textContent = String(total); if (_changed) pulseSelectedBadge(); _lastBadgeTotal = total;
  }

  // ========= TKD Tabs =========
  function tkdSetActiveTab(name) {
    Array.prototype.slice.call(document.querySelectorAll('[data-tkd-tab]')).forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tkd-tab') === name);
    });
    ['hyongs', 'kombos', 'ilbo', 'basics'].forEach(function (k) {
      document.getElementById('tkd-tab-' + k).classList.toggle('hidden', k !== name);
    });
  }
  Array.prototype.slice.call(document.querySelectorAll('[data-tkd-tab]')).forEach(function (btn) {
    btn.addEventListener('click', function () { tkdSetActiveTab(btn.getAttribute('data-tkd-tab')); });
  });

  function tkdRenderHyongs(filter) {
    let host = document.getElementById('tkd-hyongList');
    host.innerHTML = '';
    let q = (filter || '').toLowerCase().trim();
    let shown = 0;

    HYONGS.forEach(function (h) {
      let text = (h.id + ' ' + h.name + ' ' + h.moves).toLowerCase();
      if (q && text.indexOf(q) === -1) return;
      shown++;

      let sel = state.tkd.hyongs[h.id];
      let chosen = [];
      TKD_VARIATIONS.forEach(function (v) { if (sel.variations[v]) chosen.push(v); });
      let active = chosen.length > 0;
      let belt = TKD_BELTS[h.belt];

      let el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
<div class="itemTop">
  <div>
    <div class="row" style="gap:8px">
      <div class="title">${makeTermUI(`${h.id} ${h.name}`, 'Taekwondo', '')}</div>
      <span class="pill belt ${belt.cls || ''}">${belt.emoji} ${belt.label}</span>
      <span class="pill">${h.moves}x</span>
      ${active ? `<span class=\"pill on\">aktiv</span>` : `<span class=\"pill\" style=\"color:#64748b\">aus</span>`}
    </div>
    <div class="desc" style="margin-top:4px">Varianten: ${chosen.length ? escapeHtml(chosen.join(' · ')) : '—'}</div>
  </div>
  <div class="meta">
    <div class="miniBtns">
      <button class="mini" data-act="onlyNormal" type="button">Normal</button>
      <button class="mini" data-act="allOn" type="button">Alle</button>
      <button class="mini" data-act="allOff" type="button">Aus</button>
    </div>
    <div class="pill" style="background:#fff">Runden <input class="roundInput" type="number" min="1" max="20" value="${sel.rounds}" style="width:64px;margin-left:8px;border-radius:999px;padding:6px 10px;border:1px solid #e2e8f0" /></div>
  </div>
</div>
<div class="sep" style="margin:10px 0"></div>
<div class="chips" aria-label="Varianten"></div>
`.trim();

      let chips = el.querySelector('.chips');
      TKD_VARIATIONS.forEach(function (v) {
        let c = document.createElement('button');
        c.type = 'button';
        c.className = 'chip' + (sel.variations[v] ? ' on' : '');
        c.textContent = v;
        c.addEventListener('click', function (ev) {
          ev.stopPropagation();
          sel.variations[v] = !sel.variations[v];
          save();
          tkdRenderHyongs(document.getElementById('tkd-searchInput').value);
          setBadge();
        });
        chips.appendChild(c);
      });

      el.addEventListener('click', function (e) {
        let t = e.target;
        if (t && t.classList && t.classList.contains('mini')) {
          let act = t.getAttribute('data-act');
          if (act === 'onlyNormal') TKD_VARIATIONS.forEach(function (v) { sel.variations[v] = (v === 'normal'); });
          else if (act === 'allOff') TKD_VARIATIONS.forEach(function (v) { sel.variations[v] = false; });
          else TKD_VARIATIONS.forEach(function (v) { sel.variations[v] = true; });
          save();
          tkdRenderHyongs(document.getElementById('tkd-searchInput').value);
          setBadge();
        }
      });

      let roundInput = el.querySelector('.roundInput');
      roundInput.addEventListener('change', function () {
        let val = clamp(parseInt(roundInput.value || '1', 10), 1, 20);
        roundInput.value = String(val);
        sel.rounds = val;
        save();
      });

      host.appendChild(el);
    });

    document.getElementById('tkd-hyongEmpty').classList.toggle('hidden', shown !== 0);
  }

  function tkdRenderCombos(filter) {
    let host = document.getElementById('tkd-comboList');
    host.innerHTML = '';
    let q = (filter || '').toLowerCase().trim();
    let shown = 0;

    COMBOS.forEach(function (c) {
      if (q && c.toLowerCase().indexOf(q) === -1) return;
      shown++;
      let el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
<div class="checkRow">
  <label><input type="checkbox" ${state.tkd.combos[c] ? 'checked' : ''}> <span>${makeTermUI(c, 'Taekwondo', '🔁')}</span></label>
  <small>Kombinations-Drill</small>
</div>
`.trim();
      let cb = el.querySelector('input');
      cb.addEventListener('change', function () {
        state.tkd.combos[c] = !!cb.checked;
        save();
        setBadge();
      });
      host.appendChild(el);
    });

    document.getElementById('tkd-comboEmpty').classList.toggle('hidden', shown !== 0);
  }

  function tkdRenderIlbo() {
    let host = document.getElementById('tkd-ilboList');
    host.innerHTML = '';
    SPARRING.forEach(function (s) {
      let el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
<div class="checkRow">
  <label><input type="checkbox" ${state.tkd.sparring[s] ? 'checked' : ''}> <span>${makeTermUI(s, 'Taekwondo', '🛡️')}</span></label>
  <small>Partner & Distanz</small>
</div>
`.trim();
      let cb = el.querySelector('input');
      cb.addEventListener('change', function () {
        state.tkd.sparring[s] = !!cb.checked;
        save();
        setBadge();
      });
      host.appendChild(el);
    });
  }

  function tkdGroupMeta(key) {
    if (key === 'overview') return { title: 'Übersicht', icon: '📋' };
    if (key === 'kicks') return { title: 'Kicks', icon: '👣' };
    if (key === 'blocks') return { title: 'Blöcke', icon: '🛡️' };
    if (key === 'strikes') return { title: 'Schläge', icon: '⚔️' };
    if (key === 'stances') return { title: 'Stellungen', icon: '✨' };
    return { title: key, icon: '✨' };
  }
  function tkdRenderBasics(filter) {
    let host = document.getElementById('tkd-basicsList');
    host.innerHTML = '';
    let q = (filter || '').toLowerCase().trim();
    let anyShown = false;

    Object.keys(BASICS).forEach(function (k) {
      let items = BASICS[k].slice();
      if (q) items = items.filter(function (i) { return i.toLowerCase().indexOf(q) !== -1; });
      if (!items.length) return;
      anyShown = true;

      let meta = tkdGroupMeta(k);
      let allSelected = items.every(function (i) { return !!state.tkd.basics[i]; });
      let anySelected = items.some(function (i) { return !!state.tkd.basics[i]; });

      let el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
<div class="groupHead">
  <div class="groupTitle"><span class="pill">${meta.icon}</span>${meta.title} <span class="pill">${items.length}</span></div>
  <div class="miniBtns">
    <button class="mini" data-gact="all" type="button" ${allSelected ? 'disabled' : ''}>Alle</button>
    <button class="mini" data-gact="none" type="button" ${!anySelected ? 'disabled' : ''}>Keine</button>
  </div>
</div>
<div class="sep" style="margin:10px 0"></div>
<div class="list" style="gap:8px"></div>
`.trim();

      let list = el.querySelector('.list');
      items.forEach(function (i) {
        let row = document.createElement('div');
        row.className = 'checkRow';
        row.innerHTML = `<label><input type="checkbox" ${state.tkd.basics[i] ? 'checked' : ''}> <span>${makeTermUI(i, 'Taekwondo', '')}</span></label>`;
        let cb = row.querySelector('input');
        cb.addEventListener('change', function () {
          state.tkd.basics[i] = !!cb.checked;
          save();
          setBadge();
        });
        list.appendChild(row);
      });

      el.addEventListener('click', function (e) {
        let t = e.target;
        if (!t || !t.getAttribute) return;
        let gact = t.getAttribute('data-gact');
        if (gact === 'all') {
          items.forEach(function (i) { state.tkd.basics[i] = true; });
          save();
          tkdRenderBasics(document.getElementById('tkd-searchInput').value);
          setBadge();
        }
        if (gact === 'none') {
          items.forEach(function (i) { state.tkd.basics[i] = false; });
          save();
          tkdRenderBasics(document.getElementById('tkd-searchInput').value);
          setBadge();
        }
      });

      host.appendChild(el);
    });

    document.getElementById('tkd-basicsEmpty').classList.toggle('hidden', anyShown);
  }

  // ========= WC Tabs =========
  function wcSetActiveTab(name) {
    Array.prototype.slice.call(document.querySelectorAll('[data-wc-tab]')).forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-wc-tab') === name);
    });
    ['forms', 'grundlagen', 'armhand', 'beine', 'weitere', 'weapon'].forEach(function (k) {
      document.getElementById('wc-tab-' + k).classList.toggle('hidden', k !== name);
    });
  }
  Array.prototype.slice.call(document.querySelectorAll('[data-wc-tab]')).forEach(function (btn) {
    btn.addEventListener('click', function () { wcSetActiveTab(btn.getAttribute('data-wc-tab')); });
  });

  function wcRenderForms(filter) {
    let host = document.getElementById('wc-formList');
    host.innerHTML = '';
    let q = (filter || '').toLowerCase().trim();
    let shown = 0;

    FORMS.forEach(function (f) {
      let text = (f.id + ' ' + f.code + ' ' + f.name + ' ' + f.note + ' ' + f.parts).toLowerCase();
      if (q && text.indexOf(q) === -1) return;
      shown++;

      let sel = state.wc.forms[f.id];
      let chosen = [];
      WC_VARIATIONS.forEach(function (v) { if (sel.variations[v]) chosen.push(v); });
      let active = chosen.length > 0;
      let lvl = WC_LEVELS[f.level];

      let el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
<div class="itemTop">
  <div>
    <div class="row" style="gap:8px">
      <div class="title">${makeTermUI(`${f.id} ${f.name}`, 'Wing Chun', '')}</div>
      <span class="pill">${escapeHtml(f.code)}</span>
      <span class="pill level ${lvl.cls || ''}">${lvl.emoji} ${lvl.label}</span>
      <span class="pill">${escapeHtml(f.parts)}</span>
      ${active ? `<span class=\"pill on\">aktiv</span>` : `<span class=\"pill\" style=\"color:#64748b\">aus</span>`}
    </div>
    <div class="desc" style="margin-top:4px">${escapeHtml(f.note)} · Varianten: ${chosen.length ? escapeHtml(chosen.join(' · ')) : '—'}</div>
  </div>
  <div class="meta">
    <div class="miniBtns">
      <button class="mini" data-act="onlyNormal" type="button">Normal</button>
      <button class="mini" data-act="allOn" type="button">Alle</button>
      <button class="mini" data-act="allOff" type="button">Aus</button>
    </div>
    <div class="pill" style="background:#fff">Runden <input class="roundInput" type="number" min="1" max="20" value="${sel.rounds}" style="width:64px;margin-left:8px;border-radius:999px;padding:6px 10px;border:1px solid #e2e8f0" /></div>
  </div>
</div>
<div class="sep" style="margin:10px 0"></div>
<div class="chips" aria-label="Varianten"></div>
`.trim();

      let chips = el.querySelector('.chips');
      WC_VARIATIONS.forEach(function (v) {
        let c = document.createElement('button');
        c.type = 'button';
        c.className = 'chip' + (sel.variations[v] ? ' on' : '');
        c.textContent = v;
        c.addEventListener('click', function (ev) {
          ev.stopPropagation();
          sel.variations[v] = !sel.variations[v];
          save();
          wcRenderForms(document.getElementById('wc-searchInput').value);
          setBadge();
        });
        chips.appendChild(c);
      });

      el.addEventListener('click', function (e) {
        let t = e.target;
        if (t && t.classList && t.classList.contains('mini')) {
          let act = t.getAttribute('data-act');
          if (act === 'onlyNormal') WC_VARIATIONS.forEach(function (v) { sel.variations[v] = (v === 'normal'); });
          else if (act === 'allOff') WC_VARIATIONS.forEach(function (v) { sel.variations[v] = false; });
          else WC_VARIATIONS.forEach(function (v) { sel.variations[v] = true; });
          save();
          wcRenderForms(document.getElementById('wc-searchInput').value);
          setBadge();
        }
      });

      let roundInput = el.querySelector('.roundInput');
      roundInput.addEventListener('change', function () {
        let val = clamp(parseInt(roundInput.value || '1', 10), 1, 20);
        roundInput.value = String(val);
        sel.rounds = val;
        save();
      });

      host.appendChild(el);
    });

    document.getElementById('wc-formEmpty').classList.toggle('hidden', shown !== 0);
  }

  function wcRenderCheckboxList(hostId, emptyId, items, stateMap, filter, icon, defaultSmall) {
    let host = document.getElementById(hostId);
    host.innerHTML = '';
    let q = (filter || '').toLowerCase().trim();
    let shown = 0;

    items.forEach(function (it) {
      let text = (it.t + ' ' + (it.d || '')).toLowerCase();
      if (q && text.indexOf(q) === -1) return;
      shown++;
      let el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
<div class="checkRow">
  <label><input type="checkbox" ${stateMap[it.t] ? 'checked' : ''}> <span>${makeTermUI(it.t, 'Wing Chun', icon)}</span></label>
  <small>${escapeHtml(it.d || defaultSmall || '')}</small>
</div>
`.trim();
      let cb = el.querySelector('input');
      cb.addEventListener('change', function () {
        stateMap[it.t] = !!cb.checked;
        save();
        setBadge();
      });
      host.appendChild(el);
    });

    let empty = document.getElementById(emptyId);
    if (empty) empty.classList.toggle('hidden', shown !== 0);
  }

  // ========= Other Tabs =========
  function otherSetActiveTab(name) {
    Array.prototype.slice.call(document.querySelectorAll('[data-other-tab]')).forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-other-tab') === name);
    });
    ['kraft', 'boxen', 'sonst'].forEach(function (k) {
      document.getElementById('other-tab-' + k).classList.toggle('hidden', k !== name);
    });
  }
  Array.prototype.slice.call(document.querySelectorAll('[data-other-tab]')).forEach(function (btn) {
    btn.addEventListener('click', function () { otherSetActiveTab(btn.getAttribute('data-other-tab')); });
  });

  function otherRenderList(hostId, emptyId, items, stateMap, filter, icon, defaultSmall) {
    let host = document.getElementById(hostId);
    host.innerHTML = '';
    let q = (filter || '').toLowerCase().trim();
    let shown = 0;

    items.forEach(function (it) {
      let text = (it.t + ' ' + (it.d || '')).toLowerCase();
      if (q && text.indexOf(q) === -1) return;
      shown++;
      let el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = `
<div class="checkRow">
  <label><input type="checkbox" ${stateMap[it.t] ? 'checked' : ''}> <span>${makeTermUI(it.t, 'Weiteres', icon)}</span></label>
  <small>${escapeHtml(it.d || defaultSmall || '')}</small>
</div>
`.trim();
      let cb = el.querySelector('input');
      cb.addEventListener('change', function () {
        stateMap[it.t] = !!cb.checked;
        save();
        setBadge();
      });
      host.appendChild(el);
    });

    let empty = document.getElementById(emptyId);
    if (empty) empty.classList.toggle('hidden', shown !== 0);
  }

  // ========= Training Summary (nur Subkategorien mit Auswahl anzeigen) =========
  function sectionCard(title, icon, count, innerHTML) {
    return `
<div class="item">
  <div class="itemTop">
    <div class="row" style="gap:10px">
      <span class="pill">${icon}</span>
      <div class="title">${escapeHtml(title)}</div>
    </div>
    <span class="pill">${count}</span>
  </div>
  <div class="sep" style="margin:10px 0"></div>
  ${innerHTML}
</div>
`.trim();
  }

  function collectTrainingItems() {
    let out = {
      tkd: { hyongs: [], combos: [], sparring: [], basics: [], note: '' },
      wc: { forms: [], grundlagen: [], armhand: [], beine: [], weitere: [], weapon: [], note: '' },
      other: { kraft: [], boxen: [], sonstiges: [], note: '' }
    };

    HYONGS.forEach(function (h) {
      let sel = state.tkd.hyongs[h.id];
      let chosen = [];
      TKD_VARIATIONS.forEach(function (v) { if (sel.variations[v]) chosen.push(v); });
      if (!chosen.length) return;
      out.tkd.hyongs.push({
        key: 'TKD|Hyong|' + h.id,
        title: h.id + ' ' + h.name + ' (' + h.moves + 'x)',
        details: ['Varianten: ' + chosen.join(' · '), 'Runden: ' + sel.rounds]
      });
    });

    Object.keys(state.tkd.combos).forEach(function (c) { if (state.tkd.combos[c]) out.tkd.combos.push({ key: 'TKD|Kombi|' + c, title: c, details: [] }); });
    Object.keys(state.tkd.sparring).forEach(function (s) { if (state.tkd.sparring[s]) out.tkd.sparring.push({ key: 'TKD|Ilbo|' + s, title: s, details: [] }); });
    Object.keys(state.tkd.basics).forEach(function (b) { if (state.tkd.basics[b]) out.tkd.basics.push({ key: 'TKD|Basic|' + b, title: b, details: [] }); });
    out.tkd.note = (state.tkd.note || '').trim();

    FORMS.forEach(function (f) {
      let sel = state.wc.forms[f.id];
      let chosen = [];
      WC_VARIATIONS.forEach(function (v) { if (sel.variations[v]) chosen.push(v); });
      if (!chosen.length) return;
      out.wc.forms.push({
        key: 'WC|Form|' + f.id,
        title: f.id + ' ' + f.name + ' (' + f.code + ')',
        details: [
          'Beschreibung: ' + f.note,
          'Teile/Sätze: ' + f.parts,
          'Varianten: ' + chosen.join(' · '),
          'Runden: ' + sel.rounds
        ]
      });
    });

    function selFromMap(map, prefix, arrOut) {
      Object.keys(map).forEach(function (k) { if (map[k]) arrOut.push({ key: prefix + k, title: k, details: [] }); });
    }
    selFromMap(state.wc.grundlagen, 'WC|Grund|', out.wc.grundlagen);
    selFromMap(state.wc.armhand, 'WC|Arm|', out.wc.armhand);
    selFromMap(state.wc.beine, 'WC|Bein|', out.wc.beine);
    selFromMap(state.wc.weitere, 'WC|Weitere|', out.wc.weitere);
    selFromMap(state.wc.weapon, 'WC|Weapon|', out.wc.weapon);
    out.wc.note = (state.wc.note || '').trim();

    selFromMap(state.other.kraft, 'OTHER|Kraft|', out.other.kraft);
    selFromMap(state.other.boxen, 'OTHER|Boxen|', out.other.boxen);
    selFromMap(state.other.sonstiges, 'OTHER|Sonstiges|', out.other.sonstiges);
    out.other.note = (state.other.note || '').trim();

    return out;
  }

  function pickTrainingMotivation() {
    let c = countSelectedAll();
    let pool = [];
    if (c.tkd > 0) pool = pool.concat(TKD_MOTIVATION);
    if (c.wc > 0) pool = pool.concat(WC_MOTIVATION);
    if (c.other > 0) pool = pool.concat(OTHER_MOTIVATION);
    if (!pool.length) pool = pool.concat(TKD_MOTIVATION).concat(WC_MOTIVATION).concat(OTHER_MOTIVATION);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function updateTrainingProgress(keys, done) {
    let total = keys.length;
    let finished = keys.filter(function (k) { return !!done[k]; }).length;
    let pct = total ? Math.round((finished / total) * 100) : 0;
    document.getElementById('train-progressText').textContent = finished + ' / ' + total + ' erledigt';
    document.getElementById('train-progressBarFill').style.width = pct + '%';
  }

  function renderTraining() {
    document.getElementById('train-dateNow').textContent = prettyDateDE(new Date());

    let data = collectTrainingItems();
    let sections = [];
    let doneKeys = [];

    function listBlock(items, ctxHint) {
      if (!items.length) return '';
      let out = '<div class="list" style="gap:10px">';
      items.forEach(function (it) {
        doneKeys.push(it.key);
        let safeKey = escapeAttr(it.key);
        out += '<div class="summaryBox" style="border-style:solid">' +
          '<div class="doneRow">' +
          '<input type="checkbox" class="doneCb" data-key="' + safeKey + '">' +
          '<div>' +
          '<div class="doneTitle">' + makeTermUI(it.title, ctxHint, '') + '</div>' +
          (it.details && it.details.length ? '<div class="doneDetails">' + escapeHtml(it.details.join(' · ')) + '</div>' : '') +
          '</div>' +
          '</div>' +
          '</div>';
      });
      out += '</div>';
      return out;
    }
    function simpleList(items, ctxHint, icon) {
      if (!items.length) return '';
      let out = '<div class="list" style="gap:8px">';
      items.forEach(function (it) {
        doneKeys.push(it.key);
        let safeKey = escapeAttr(it.key);
        out += '<div class="summaryBox" style="border-style:solid">' +
          '<div class="doneRow">' +
          '<input type="checkbox" class="doneCb" data-key="' + safeKey + '">' +
          '<div class="doneTitle">' + makeTermUI(it.title, ctxHint, icon || '') + '</div>' +
          '</div>' +
          '</div>';
      });
      out += '</div>';
      return out;
    }

    let tkdCount = data.tkd.hyongs.length + data.tkd.combos.length + data.tkd.sparring.length + data.tkd.basics.length;
    if (tkdCount > 0) {
      let inner = '';
      if (data.tkd.hyongs.length) inner += sectionCard('Hyongs', '⚔️', data.tkd.hyongs.length, listBlock(data.tkd.hyongs, 'Taekwondo'));
      if (data.tkd.combos.length) inner += sectionCard('Kombinationen', '🔁', data.tkd.combos.length, simpleList(data.tkd.combos, 'Taekwondo', '🔁'));
      if (data.tkd.sparring.length) inner += sectionCard('Einschrittkampf', '🛡️', data.tkd.sparring.length, simpleList(data.tkd.sparring, 'Taekwondo', '🛡️'));
      if (data.tkd.basics.length) inner += sectionCard('Grundübungen', '👣', data.tkd.basics.length, simpleList(data.tkd.basics, 'Taekwondo', ''));
      if (data.tkd.note) inner += sectionCard('Notiz (TKD)', '📝', 1, '<div class="summaryBox" style="border-style:solid">' + escapeHtml(data.tkd.note) + '</div>');
      sections.push(sectionCard('Taekwondo', '🥋', tkdCount, inner));
    }

    let wcCount = data.wc.forms.length + data.wc.grundlagen.length + data.wc.armhand.length + data.wc.beine.length + data.wc.weitere.length + data.wc.weapon.length;
    if (wcCount > 0) {
      let innerW = '';
      if (data.wc.forms.length) innerW += sectionCard('Formen', '⚔️', data.wc.forms.length, listBlock(data.wc.forms, 'Wing Chun'));
      if (data.wc.grundlagen.length) innerW += sectionCard('Grundlagen', '🧱', data.wc.grundlagen.length, simpleList(data.wc.grundlagen, 'Wing Chun', '🧱'));
      if (data.wc.armhand.length) innerW += sectionCard('Arm- & Handtechniken', '🤲', data.wc.armhand.length, simpleList(data.wc.armhand, 'Wing Chun', '🤲'));
      if (data.wc.beine.length) innerW += sectionCard('Beintechniken', '👣', data.wc.beine.length, simpleList(data.wc.beine, 'Wing Chun', '👣'));
      if (data.wc.weitere.length) innerW += sectionCard('Weiteres', '🧩', data.wc.weitere.length, simpleList(data.wc.weitere, 'Wing Chun', '🧩'));
      if (data.wc.weapon.length) innerW += sectionCard('Weapon Self Defence', '🛡️', data.wc.weapon.length, simpleList(data.wc.weapon, 'Wing Chun', '🛡️'));
      if (data.wc.note) innerW += sectionCard('Notiz (WC)', '📝', 1, '<div class="summaryBox" style="border-style:solid">' + escapeHtml(data.wc.note) + '</div>');
      sections.push(sectionCard('Wing Chun', '🥋', wcCount, innerW));
    }

    let otherCount = data.other.kraft.length + data.other.boxen.length + data.other.sonstiges.length;
    if (otherCount > 0) {
      let innerO = '';
      if (data.other.kraft.length) innerO += sectionCard('Krafttraining', '🏋️', data.other.kraft.length, simpleList(data.other.kraft, 'Weiteres', '🏋️'));
      if (data.other.boxen.length) innerO += sectionCard('Boxen/Drills', '🥊', data.other.boxen.length, simpleList(data.other.boxen, 'Weiteres', '🥊'));
      if (data.other.sonstiges.length) innerO += sectionCard('Sonstiges', '🧘', data.other.sonstiges.length, simpleList(data.other.sonstiges, 'Weiteres', '🧘'));
      if (data.other.note) innerO += sectionCard('Notiz (Weiteres)', '📝', 1, '<div class="summaryBox" style="border-style:solid">' + escapeHtml(data.other.note) + '</div>');
      sections.push(sectionCard('Weiteres', '🏋️', otherCount, innerO));
    }

    if (!sections.length) {
      sections.push('<div class="summaryBox">Noch keine Übungen ausgewählt. Gehe zu TKD / Wing Chun / Weiteres und wähle etwas aus.</div>');
    }

    let host = document.getElementById('train-sections');
    host.innerHTML = sections.join('');

    let done = ensureDoneKeys(doneKeys);
    Array.prototype.slice.call(host.querySelectorAll('.doneCb')).forEach(function (cb) {
      let key = cb.getAttribute('data-key');
      cb.checked = !!done[key]; let box = cb.closest('.summaryBox'); if (box) { box.classList.add('trainingItem'); box.classList.toggle('done', cb.checked); }
      cb.addEventListener('change', function () {
        done[key] = !!cb.checked;
        saveDoneMap(done);
        updateTrainingProgress(doneKeys, done); if (box) box.classList.toggle('done', !!cb.checked);
      });
    });

    updateTrainingProgress(doneKeys, done);
    document.getElementById('train-motivationText').textContent = pickTrainingMotivation();
  }

  function copyTrainingText() {
    let d = new Date();
    let data = collectTrainingItems();
    let lines = [];
    lines.push('Martial Repertoire 🥋 – Heutiges Training (' + prettyDateDE(d) + ')');
    lines.push('');

    function addBlock(title, blocks) {
      lines.push(title + ':');
      blocks.forEach(function (b) {
        lines.push('- ' + b.title);
        (b.details || []).forEach(function (dd) { lines.push(' • ' + dd); });
      });
      lines.push('');
    }
    function addSimple(title, arr) {
      lines.push(title + ':');
      arr.forEach(function (x) { lines.push('- ' + x.title); });
      lines.push('');
    }

    if (data.tkd.hyongs.length || data.tkd.combos.length || data.tkd.sparring.length || data.tkd.basics.length) {
      lines.push('Taekwondo:'); lines.push('');
      if (data.tkd.hyongs.length) addBlock('Hyongs', data.tkd.hyongs);
      if (data.tkd.combos.length) addSimple('Kombinationen', data.tkd.combos);
      if (data.tkd.sparring.length) addSimple('Einschrittkampf', data.tkd.sparring);
      if (data.tkd.basics.length) addSimple('Grundübungen', data.tkd.basics);
      if (data.tkd.note) { lines.push('Notiz:'); lines.push(data.tkd.note); lines.push(''); }
    }
    if (data.wc.forms.length || data.wc.grundlagen.length || data.wc.armhand.length || data.wc.beine.length || data.wc.weitere.length || data.wc.weapon.length) {
      lines.push('Wing Chun:'); lines.push('');
      if (data.wc.forms.length) addBlock('Formen', data.wc.forms);
      if (data.wc.grundlagen.length) addSimple('Grundlagen', data.wc.grundlagen);
      if (data.wc.armhand.length) addSimple('Arm- & Handtechniken', data.wc.armhand);
      if (data.wc.beine.length) addSimple('Beintechniken', data.wc.beine);
      if (data.wc.weitere.length) addSimple('Weiteres', data.wc.weitere);
      if (data.wc.weapon.length) addSimple('Weapon Self Defence', data.wc.weapon);
      if (data.wc.note) { lines.push('Notiz:'); lines.push(data.wc.note); lines.push(''); }
    }
    if (data.other.kraft.length || data.other.boxen.length || data.other.sonstiges.length) {
      lines.push('Weiteres:'); lines.push('');
      if (data.other.kraft.length) addSimple('Krafttraining', data.other.kraft);
      if (data.other.boxen.length) addSimple('Boxen/Drills', data.other.boxen);
      if (data.other.sonstiges.length) addSimple('Sonstiges', data.other.sonstiges);
      if (data.other.note) { lines.push('Notiz:'); lines.push(data.other.note); lines.push(''); }
    }

    let text = lines.join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('📋 Training kopiert'); }).catch(function () { toast('Kopieren nicht möglich'); console.log(text); });
    } else {
      try {
        let ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
        toast('📋 Training kopiert');
      } catch (e) { toast('Kopieren nicht möglich'); console.log(text); }
    }
  }

  // ========= Timer =========
  const _timer = { t: null, mode: 'work', remaining: 0, round: 0, paused: true, total: 0 };
  function fmt(s) {
    s = Math.max(0, Number(s) || 0);
    let m = Math.floor(s / 60), ss = s % 60;
    return String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
  }

  // Timer – Fortschrittsring (visuell)
  const _timerRing = { prog: null, C: 0 };
  function timerRingInit() {
    let prog = document.getElementById('timer-ringProgress');
    if (!prog) return;
    let r = Number(prog.getAttribute('r')) || 52;
    let C = 2 * Math.PI * r;
    _timerRing.prog = prog;
    _timerRing.C = C;
    prog.style.strokeDasharray = String(C);
    // Start: voll
    prog.style.strokeDashoffset = '0';
  }
  function timerRingSet(progress) {
    if (!_timerRing.prog) return;
    let p = Number(progress) || 0;
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    _timerRing.prog.style.strokeDashoffset = String(_timerRing.C * (1 - p));
  }

  function timerLoad() { return safeParseJSON(localStorage.getItem(TIMER_KEY) || '{}', {}); }
  function timerSave() {
    try {
      localStorage.setItem(TIMER_KEY, JSON.stringify({
        work: Number(document.getElementById('timer-workSec').value),
        rest: Number(document.getElementById('timer-restSec').value),
        rounds: Number(document.getElementById('timer-rounds').value)
      }));
    } catch (e) { }
  }
  function timerUpdate() {
    document.getElementById('timer-display').textContent = fmt(_timer.remaining);
    document.getElementById('timer-phase').textContent = _timer.t ? (_timer.mode === 'work' ? 'WORK' : 'PAUSE') : '—';
    let rounds = Number(document.getElementById('timer-rounds').value || 0);
    document.getElementById('timer-round').textContent = (_timer.t ? (_timer.round + 1) : 0) + ' / ' + rounds;

    // Ring-Fortschritt aktualisieren (voll → leer)
    let total = Number(_timer.total) || 0;
    let rem = Number(_timer.remaining) || 0;
    if (!total) {
      // Wenn Timer nicht läuft: orientiere dich am Work-Wert
      total = Number(document.getElementById('timer-workSec').value) || 0;
      rem = Number(_timer.remaining) || total;
    }
    let progress = total > 0 ? (rem / total) : 0;
    timerRingSet(progress);
  }
  function timerStopInternal() {
    if (_timer.t) { clearInterval(_timer.t); _timer.t = null; }
    _timer.paused = true;
    timerUpdate();
  }
  function timerTick() {
    timerUpdate();
    if (_timer.remaining <= 0) {
      if (_timer.mode === 'work') {
        _timer.mode = 'rest';
        _timer.remaining = Number(document.getElementById('timer-restSec').value || 0);
        _timer.total = _timer.remaining;
      } else {
        _timer.round++;
        if (_timer.round >= Number(document.getElementById('timer-rounds').value || 0)) {
          timerStopInternal();
          toast('⏱️ Timer fertig – stark!');
          return;
        }
        _timer.mode = 'work';
        _timer.remaining = Number(document.getElementById('timer-workSec').value || 0);
        _timer.total = _timer.remaining;
      }
      timerUpdate();
    }
    _timer.remaining--;
  }
  function timerStart() {
    timerSave();
    if (_timer.t) return;
    if (_timer.paused && _timer.remaining <= 0) {
      _timer.mode = 'work';
      _timer.round = 0;
      _timer.remaining = Number(document.getElementById('timer-workSec').value || 0);
      _timer.total = _timer.remaining;
    }
    _timer.paused = false;
    _timer.t = setInterval(timerTick, 1000);
    timerUpdate();
  }
  function timerPause() {
    if (!_timer.t) return;
    clearInterval(_timer.t);
    _timer.t = null;
    _timer.paused = true;
    timerUpdate();
  }
  function timerReset() {
    timerStopInternal();
    _timer.mode = 'work';
    _timer.round = 0;
    _timer.remaining = Number(document.getElementById('timer-workSec').value || 0);
    _timer.total = _timer.remaining;
    timerUpdate();
  }
  function timerInit() {
    let conf = timerLoad();
    if (typeof conf.work === 'number') document.getElementById('timer-workSec').value = conf.work;
    if (typeof conf.rest === 'number') document.getElementById('timer-restSec').value = conf.rest;
    if (typeof conf.rounds === 'number') document.getElementById('timer-rounds').value = conf.rounds;

    document.getElementById('timer-start').addEventListener('click', timerStart);
    document.getElementById('timer-pause').addEventListener('click', timerPause);
    document.getElementById('timer-reset').addEventListener('click', timerReset);

    ['timer-workSec', 'timer-restSec', 'timer-rounds'].forEach(function (id) {
      document.getElementById(id).addEventListener('change', function () {
        if (id === 'timer-workSec') this.value = String(clamp(parseInt(this.value || '60', 10), 10, 3600));
        if (id === 'timer-restSec') this.value = String(clamp(parseInt(this.value || '30', 10), 0, 3600));
        if (id === 'timer-rounds') this.value = String(clamp(parseInt(this.value || '8', 10), 1, 200));
        timerSave();
        if (!_timer.t) {
          _timer.remaining = Number(document.getElementById('timer-workSec').value || 0);
          _timer.total = _timer.remaining;
          timerUpdate();
        }
      });
    });

    _timer.remaining = Number(document.getElementById('timer-workSec').value || 0);
    _timer.total = _timer.remaining;
    timerRingInit();
    timerUpdate();
  }

  // ========= Reset =========
  function resetAll() {
    state = makeInitialState();
    save();
    saveDoneMap({});
    document.getElementById('tkd-noteInput').value = '';
    document.getElementById('wc-noteInput').value = '';
    document.getElementById('other-noteInput').value = '';
    document.getElementById('tkd-searchInput').value = '';
    document.getElementById('wc-searchInput').value = '';
    document.getElementById('other-searchInput').value = '';
    rerenderAll();
    toast('↺ Alles zurückgesetzt');
    if (currentView === 'training') renderTraining();
  }

  // ========= Global term click delegation =========
  document.addEventListener('click', function (e) {
    let t = e.target;
    if (!t) return;
    let btn = t.closest ? t.closest('.js-term') : null;
    if (!btn) return;
    e.stopPropagation();
    let term = btn.getAttribute('data-term') || btn.textContent;
    let ctx = btn.getAttribute('data-ctx') || '';
    openGlossary(term, ctx);
  }, true);

  // ========= Init =========
  let state = safeLoad();

  document.getElementById('tkd-noteInput').value = state.tkd.note || '';
  document.getElementById('tkd-noteInput').addEventListener('input', function () { state.tkd.note = this.value; save(); });
  document.getElementById('wc-noteInput').value = state.wc.note || '';
  document.getElementById('wc-noteInput').addEventListener('input', function () { state.wc.note = this.value; save(); });
  document.getElementById('other-noteInput').value = state.other.note || '';
  document.getElementById('other-noteInput').addEventListener('input', function () { state.other.note = this.value; save(); });

  document.getElementById('tkd-searchInput').addEventListener('input', function () {
    let q = this.value;
    tkdRenderHyongs(q);
    tkdRenderCombos(q);
    tkdRenderBasics(q);
  });
  document.getElementById('wc-searchInput').addEventListener('input', function () {
    let q = this.value;
    wcRenderForms(q);
    wcRenderCheckboxList('wc-grundlagenList', 'wc-grundlagenEmpty', GRUNDLAGEN, state.wc.grundlagen, q, '🧱', 'Grundlagen');
    wcRenderCheckboxList('wc-armhandList', 'wc-armhandEmpty', ARM_HAND, state.wc.armhand, q, '🤲', 'Technik');
    wcRenderCheckboxList('wc-beineList', 'wc-beineEmpty', BEINE, state.wc.beine, q, '👣', 'Bein');
    wcRenderCheckboxList('wc-weitereList', 'wc-weitereEmpty', WEITERE_HAND, state.wc.weitere, q, '🧩', 'Hand');
    wcRenderCheckboxList('wc-weaponList', 'wc-weaponEmpty', WEAPON, state.wc.weapon, q, '🛡️', 'Weapon');
  });
  document.getElementById('other-searchInput').addEventListener('input', function () {
    let q = this.value;
    otherRenderList('other-kraftList', 'other-kraftEmpty', OTHER_KRAFT, state.other.kraft, q, '🏋️', 'Kraft');
    otherRenderList('other-boxenList', 'other-boxenEmpty', OTHER_BOXEN, state.other.boxen, q, '🥊', 'Boxen');
    otherRenderList('other-sonstList', 'other-sonstEmpty', OTHER_SONST, state.other.sonstiges, q, '🧘', 'Sonstiges');
  });

  document.getElementById('train-copyBtn').addEventListener('click', copyTrainingText);
  document.getElementById('train-motivationBtn').addEventListener('click', function () {
    let m = pickTrainingMotivation();
    document.getElementById('train-motivationText').textContent = m;
    toast('💪 ' + m);
  });
  document.getElementById('train-newMotivationBtn').addEventListener('click', function () {
    let m = pickTrainingMotivation();
    document.getElementById('train-motivationText').textContent = m;
    toast('✨ ' + m);
  });
  document.getElementById('train-resetDoneBtn').addEventListener('click', function () {
    let host = document.getElementById('train-sections');
    let keys = Array.prototype.slice.call(host.querySelectorAll('.doneCb')).map(function (cb) { return cb.getAttribute('data-key'); });
    let done = getDoneMap();
    keys.forEach(function (k) { done[k] = false; });
    saveDoneMap(done);
    Array.prototype.slice.call(host.querySelectorAll('.doneCb')).forEach(function (cb) { cb.checked = false; });
    updateTrainingProgress(keys, done);
    toast('↺ Fortschritt zurückgesetzt');
  });

  document.getElementById('resetAllBtn').addEventListener('click', resetAll);

  // Prefill glossary so every term has an entry
  (function prefillGlossary() {
    HYONGS.forEach(function (h) { ensureGlossary(h.id + ' ' + h.name, 'Taekwondo'); ensureGlossary(h.name, 'Taekwondo'); });
    COMBOS.forEach(function (c) { ensureGlossary(c, 'Taekwondo'); });
    SPARRING.forEach(function (s) { ensureGlossary(s, 'Taekwondo'); });
    Object.keys(BASICS).forEach(function (k) { BASICS[k].forEach(function (i) { ensureGlossary(i, 'Taekwondo'); }); });

    FORMS.forEach(function (f) {
      ensureGlossary(f.id + ' ' + f.name, 'Wing Chun');
      ensureGlossary(f.name, 'Wing Chun');
      ensureGlossary(f.id + ' ' + f.name + ' (' + f.code + ')', 'Wing Chun');
    });
    GRUNDLAGEN.forEach(function (x) { ensureGlossary(x.t, 'Wing Chun'); });
    ARM_HAND.forEach(function (x) { ensureGlossary(x.t, 'Wing Chun'); });
    BEINE.forEach(function (x) { ensureGlossary(x.t, 'Wing Chun'); });
    WEITERE_HAND.forEach(function (x) { ensureGlossary(x.t, 'Wing Chun'); });
    WEAPON.forEach(function (x) { ensureGlossary(x.t, 'Wing Chun'); });

    OTHER_KRAFT.forEach(function (x) { ensureGlossary(x.t, 'Weiteres'); });
    OTHER_BOXEN.forEach(function (x) { ensureGlossary(x.t, 'Weiteres'); });
    OTHER_SONST.forEach(function (x) { ensureGlossary(x.t, 'Weiteres'); });
  })();

  function rerenderAll() {
    let tq = document.getElementById('tkd-searchInput').value;
    tkdRenderHyongs(tq);
    tkdRenderCombos(tq);
    tkdRenderIlbo();
    tkdRenderBasics(tq);

    let wq = document.getElementById('wc-searchInput').value;
    wcRenderForms(wq);
    wcRenderCheckboxList('wc-grundlagenList', 'wc-grundlagenEmpty', GRUNDLAGEN, state.wc.grundlagen, wq, '🧱', 'Grundlagen');
    wcRenderCheckboxList('wc-armhandList', 'wc-armhandEmpty', ARM_HAND, state.wc.armhand, wq, '🤲', 'Technik');
    wcRenderCheckboxList('wc-beineList', 'wc-beineEmpty', BEINE, state.wc.beine, wq, '👣', 'Bein');
    wcRenderCheckboxList('wc-weitereList', 'wc-weitereEmpty', WEITERE_HAND, state.wc.weitere, wq, '🧩', 'Hand');
    wcRenderCheckboxList('wc-weaponList', 'wc-weaponEmpty', WEAPON, state.wc.weapon, wq, '🛡️', 'Weapon');

    let oq = document.getElementById('other-searchInput').value;
    otherRenderList('other-kraftList', 'other-kraftEmpty', OTHER_KRAFT, state.other.kraft, oq, '🏋️', 'Kraft');
    otherRenderList('other-boxenList', 'other-boxenEmpty', OTHER_BOXEN, state.other.boxen, oq, '🥊', 'Boxen');
    otherRenderList('other-sonstList', 'other-sonstEmpty', OTHER_SONST, state.other.sonstiges, oq, '🧘', 'Sonstiges');

    document.getElementById('train-dateNow').textContent = prettyDateDE(new Date());
    setBadge();
  }

  // Timer init
  timerInit();

  // First render
  rerenderAll();
  showView('tkd');
  setBadge();
  // ========= PWA: Service Worker Registrierung =========
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('Service Worker Registrierung fehlgeschlagen:', err);
      });
    });
  }


})();

