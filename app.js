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
    return { variations: v };
  }
  function defaultFormSelection() {
    let v = {}; WC_VARIATIONS.forEach(function (x) { v[x] = false; });
    return { variations: v };
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
    });

    FORMS.forEach(function (f) {
      if (!merged.wc.forms[f.id]) merged.wc.forms[f.id] = defaultFormSelection();
      if (!merged.wc.forms[f.id].variations) merged.wc.forms[f.id].variations = defaultFormSelection().variations;
      WC_VARIATIONS.forEach(function (v) { if (typeof merged.wc.forms[f.id].variations[v] !== 'boolean') merged.wc.forms[f.id].variations[v] = false; });
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
  const DEFAULT_INFO_IMAGE = './pics/default.png';

  // Optional: pro Begriff individuelles Bild (nur Link)
  // Weitere Bilder können hier analog ergänzt werden: TERM_IMAGES['Begriff'] = 'https://...';
  const TERM_IMAGES = {
    'Chon-Ji Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/e1/1-e1bb1618.avif?src=images/stories/sonstiges/hyong/diagram/1.jpg&type=avif,75&hash=7e757bd5',
    'Tan-Gun Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/24/2-24df60a8.avif?src=images/stories/sonstiges/hyong/diagram/2.jpg&type=avif,75&hash=3c4f00ed',
    'To-San Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/4f/3-4f3ed6c6.avif?src=images/stories/sonstiges/hyong/diagram/3.jpg&type=avif,75&hash=3ecf06e8',
    'Won-Hyo Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/74/4-74cb815a.avif?src=images/stories/sonstiges/hyong/diagram/4.jpg&type=avif,75&hash=c7178f69',
    'Yul-Gok Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/ca/5_korr-caae026b.avif?src=images/stories/sonstiges/hyong/diagram/5_korr.jpg&type=avif,75&hash=1a54afae',
    'Chung-Gun Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/86/6-86f50919.avif?src=images/stories/sonstiges/hyong/diagram/6.jpg&type=avif,75&hash=d3186610',
    'Toi-Gye Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/2c/7-2cabfd37.avif?src=images/stories/sonstiges/hyong/diagram/7.jpg&type=avif,75&hash=43c9f6c4',
    'Hwa-Rang Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/26/8-2608db0e.avif?src=images/stories/sonstiges/hyong/diagram/8.jpg&type=avif,75&hash=e1e438d7',
    'Chung-Mu Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/df/9-dfa0306d.avif?src=images/stories/sonstiges/hyong/diagram/9.jpg&type=avif,75&hash=8489c110',
    'Gwang-Gae Hyong': 'https://taekwon-do-ingolstadt.de/media/yootheme/cache/de/10_korr-dec0bfad.avif?src=images/stories/sonstiges/hyong/diagram/10_korr.jpg&type=avif,75&hash=f48946ec',
  };

  // ========= Glossary Zusatzfelder: Häufige Fehler (f) & Coach Hinweise (c) =========
  // Schlüssel ist canonicalTerm(term). Einträge kurz, aber konkret technikbezogen.
  const ENTRY_EXTRAS = {
    // --- TKD Kicks ---
    'Ap Chagui': { f: 'Knie zu niedrig; Standfuß dreht nicht; Oberkörper kippt; kein Recoil (Bein bleibt draußen).', c: 'Kammer: Knie hoch → strecken → sofort zurück. Standfuß leicht eindrehen, Hüfte schiebt. Gerade Linie.' },
    'Naeryo Chagui': { f: 'Zu früh gestreckt (zu wenig Höhe); Rumpf kippt; Abwärtsweg unkontrolliert; instabile Landung.', c: 'Erst hoch ziehen, dann kontrolliert fällen. Rumpf stabil, Blick vorn. Langsam auf Ziel + saubere Landung.' },
    'Dollyo Chagui': { f: 'Knie nicht sauber hoch; Standfuß bleibt; Hüfte dreht zu wenig; Deckung fällt.', c: 'Knie hoch → Hüfte drehen → treffen → Recoil. Standfuß dreht mit. Deckhand oben.' },
    'Yop Chagui': { f: 'Hüfte nicht eingerastet; Treffer mit Spann; Körperlinie bricht; Rückzug fehlt.', c: 'Knie hoch, Ferse zielt, Hüfte einrasten, dann stoßen. Gerade rein/raus wie auf Schiene.' },
    'Pandae Dollyo Chagui': { f: 'Zu große Rotation; Balanceverlust; Trefferlinie unklar; Fußweg zu lang.', c: 'Kompakt bleiben. Erst langsam Winkel finden, dann Rhythmus/Speed.' },
    'Tui Chagui': { f: 'Blick zu spät; Kick driftet; zu viel Oberkörperdrehung; Standbein instabil.', c: 'Blick über Schulter zuerst. Ferse gerade nach hinten. Übe: drehen → schauen → stoßen.' },
    'Twio Yop Chagui': { f: 'Absprung ohne Kammer; Linie in der Luft verloren; Landung hart; Körper kippt.', c: 'Kammer vor Absprung. In der Luft Linie halten, nach Treffer zurückziehen. Landung weich (Knie federt).' },

    // --- Wing Chun Hand/Arm ---
    'Fook Sao': { f: 'Schulter hoch; Druck statt Gefühl; Ellenbogen driftet; Handgelenk steif.', c: 'Locker, Ellenbogenlinie halten. Kontakt wie Feder: konstant, weich.' },
    'Pak Sao': { f: 'Ausholen; Pak wird gehalten/gedrückt; kein gleichzeitiger Treffer.', c: 'Kurzer Impuls. Pak + Schlag gleichzeitig. Danach Linie übernehmen.' },
    'Tan Sao': { f: 'Ellenbogen steigt; blocken statt leiten; Körper bleibt passiv.', c: 'Ellenbogen tief, Handfläche offen. Druck seitlich leiten und mit Körper nach vorn.' },
    'Bong Sao': { f: 'Bong festgehalten; Ellenbogen zu hoch; Schulter öffnet; kein Übergang.', c: 'Bong ist Übergang. Winkel statt Kraft. Direkt in Tan/Fook/Lap wechseln.' },
    'Jam Sao': { f: 'Zu stark drücken; Zentrum öffnet; Struktur bricht.', c: 'Dosiert sinken, Zentrum bleibt. Danach wieder vorwärts/linie nehmen.' },
    'Lap Sao': { f: 'Zu lange ziehen; nur Arm; Öffnung nicht genutzt.', c: 'Lap kurz: greifen/ziehen und sofort schlagen/linie nehmen.' },
    'Man Sao': { f: 'Überstrecken; hart; Mittellinie offen.', c: 'Leicht, flexibel, zentriert. Als Sensor nutzen.' },
    'Wu Sao': { f: 'Passiv; zu weit hinten/oben; Ellenbogen driftet.', c: 'Zentrum aktiv schützen. Position so, dass Reaktion sofort möglich ist.' },
    'Huen Sao': { f: 'Zu große Kreise; Kontakt verloren.', c: 'Mini-Kreis. Im Kontakt bleiben, nur Linie ändern.' },
    'Lan Sao': { f: 'Arm gestreckt; Schulter arbeitet; ohne Stand/Rotation.', c: 'Aus Struktur + Körper. Winkel halten, Stand/Drehung nutzen, danach kontern.' },

    // --- Wing Chun Beine/Drills ---
    'Jing Gerk': { f: 'Zu groß geschwungen; Balance weg; Ausholen.', c: 'Kurz, stabil, direkt. Stopper: minimaler Weg, sofort zurück.' },
    'Yap Gerk': { f: 'Zu spät; Stand instabil; Linie unklar.', c: 'Früh abdrücken, Stand stabil. Winkel früh setzen.' },
    'Bong Gerk': { f: 'Zu weit geschwungen; Körper kippt.', c: 'Kompakt, Balance halten, Stand sofort herstellen.' },
    'Einarmiges Dan Chi': { f: 'Zu viel Kraft; Rhythmus bricht; Ellenbogenlinie weg.', c: 'Konstanter Rhythmus. Fühlen vor machen. Schultern entspannt.' },
    'Beidarmiges Pon Sao': { f: 'Große Kreise; Schultern hoch; Druck/Entlastung unklar.', c: 'Kleine Wege, klare Struktur. Kontakt konstant ohne Verkrampfen.' },
    'Chi Sao („Klebende Hände")': { f: 'Zu viel Druck; Schultern hoch; Ellenbogenlinie verloren; festhalten.', c: 'Kontakt wie Feder. Fokus: Ellenbogenlinie + Mittellinie. Erst langsam, dann schneller.' },

    // --- Formen (kurz, aber hilfreich) ---
    'Siu Nim Tao': { f: 'Zu viel Spannung; Schultern hoch; Bewegungen zu groß; Atmung fehlt.', c: 'Zeitlupe: Ellenbogenlinie, entspannte Handgelenke, ruhige Atmung. Stopps helfen.' },
    'Chum Kiu': { f: 'Drehung aus Schultern; Stand verliert Struktur; Arme entkoppeln.', c: 'Drehung aus Stand/Hüfte. Arme werden mitgenommen. Langsam mit Stopps üben.' },
    'Biu Tze': { f: 'Hektik; Struktur bricht; große Wege.', c: 'Kompakt und strukturiert. Sequenzen sauber üben, dann verbinden.' },
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


  function slugifyForPic(term) {
    // Robust: entfernt Emojis/Sonderzeichen, normalisiert Umlaute, macht snake_case.
    let s = String(term || '').trim();
    // Entferne führende Bullet/Striche
    s = s.replace(/^[\s•\-–—]+/, '');
    // Entferne gängige Emoji/Symbol-Starts (surrogate pair oder BMP)
    s = s.replace(/^(?:[\u2600-\u27BF]|[\uD83C-\uDBFF][\uDC00-\uDFFF])\s*/, '');
    s = canonicalTerm(s) || s;
    s = s.toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
    // Nur Buchstaben/Zahlen/Leerzeichen behalten
    s = s.replace(/[^a-z0-9\s]/g, ' ');
    // Mehrfachspaces -> underscore
    s = s.trim().replace(/\s+/g, '_');
    return s;
  }

  function termImageUrl(term) {
    const raw = String(term || '').trim();
    const canon = canonicalTerm(raw) || raw;

    // 1) Manuelle Overrides
    if (TERM_IMAGES && TERM_IMAGES[canon]) return TERM_IMAGES[canon];

    // 2) Automatisch: ./pics/<slug>.png
    const slug = slugifyForPic(raw);
    if (slug) return './pics/' + slug + '.png';

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


  // ========= TKD: Einschrittkampf – Unterscheidungen (Popups) =========
  addGloss('Stufe: Ilbo', { ctx: 'Taekwondo', t: 'Ilbo (1 Schritt)', m: 'Ein Angriffsschritt -> Abwehr -> Konter.', z: 'Timing + Distanz.', p: 'Sauber vor schnell.' });
  addGloss('Stufe: Ibo', { ctx: 'Taekwondo', t: 'Ibo (2 Schritte)', m: 'Zwei Schritte/Sequenz, Übergänge halten.', z: 'Rhythmus + zweite Linie.', p: 'Position sichern.' });
  addGloss('Stufe: Sambo', { ctx: 'Taekwondo', t: 'Sambo (3 Schritte)', m: 'Längere Sequenz, dynamisch aber kontrolliert.', z: 'Struktur unter Tempo.', p: 'Stabilität vor Speed.' });
  addGloss('Angriff: Hand', { ctx: 'Taekwondo', t: 'Angriff Hand', m: 'Gerade Linie (Faust/Handkante).', z: 'Linie schließen -> kontern.', p: 'Kurze Wege.' });
  addGloss('Angriff: Fuß', { ctx: 'Taekwondo', t: 'Angriff Fuß', m: 'Kick-Linie (größere Distanz).', z: 'Kick-Timing + Balance.', p: 'Hüfte lesen.' });
  addGloss('Angriff: gemischt', { ctx: 'Taekwondo', t: 'Angriff gemischt', m: 'Hand+Fuß kombiniert (Distanzwechsel).', z: 'Übergänge erkennen.', p: 'Kontrolle.' });
  addGloss('Zielhöhe: tief', { ctx: 'Taekwondo', t: 'Ziel tief', m: 'Unteres Ziel (Bein/Unterkörper).', z: 'Stabilität + Timing.', p: 'Knie beugen statt kippen.' });
  addGloss('Zielhöhe: mittel', { ctx: 'Taekwondo', t: 'Ziel mittel', m: 'Rumpf (Standardlinie).', z: 'Distanz + Hüfte verbinden.', p: 'Treffer aus Stand+Hüfte.' });
  addGloss('Zielhöhe: hoch', { ctx: 'Taekwondo', t: 'Ziel hoch', m: 'Kopf/oben: Präzision + Kontrolle.', z: 'Balance + Recoil.', p: 'Kontrolle vor Power.' });
  addGloss('Verteidigung: Block', { ctx: 'Taekwondo', t: 'Block', m: 'Linie schließen/umlenken.', z: 'Schutz + Konterfenster.', p: 'Kompakt.' });
  addGloss('Verteidigung: Ausweichen', { ctx: 'Taekwondo', t: 'Ausweichen', m: 'Ziel aus Linie nehmen (Winkel/Schritt).', z: 'Timing + Winkel.', p: 'Wenig Bewegung.' });
  addGloss('Verteidigung: Abfangen', { ctx: 'Taekwondo', t: 'Abfangen', m: 'Früh stoppen/lenken.', z: 'Frühes Lesen.', p: 'Impuls statt Kraft.' });
  addGloss('Konter: Hand', { ctx: 'Taekwondo', t: 'Konter Hand', m: 'Direkter Abschluss per Handtechnik.', z: 'Schneller Treffer.', p: 'Kurze Linie.' });
  addGloss('Konter: Fuß', { ctx: 'Taekwondo', t: 'Konter Fuß', m: 'Abschluss per Kick.', z: 'Fenster auf Distanz.', p: 'Balance + Kammer.' });
  addGloss('Konter: Kombi', { ctx: 'Taekwondo', t: 'Konter Kombi', m: '2-3 Aktionen als Abschluss.', z: 'Rhythmuswechsel + Abschluss.', p: 'Sauber verbinden.' });
  addGloss('Struktur: fest', { ctx: 'Taekwondo', t: 'fest', m: 'Vorgegeben (Angriff/Abwehr/Konter).', z: 'Wiederholbarkeit.', p: 'Basics automatisieren.' });
  addGloss('Struktur: semi-free', { ctx: 'Taekwondo', t: 'semi-free', m: 'Teil vorgegeben, Teil variiert.', z: 'Anpassung im Rahmen.', p: 'Erkennen -> wählen -> sauber.' });
  addGloss('Struktur: free-attack', { ctx: 'Taekwondo', t: 'free-attack', m: 'Freier Angriff (kontrolliert) + strukturierte Reaktion.', z: 'Reaktion/Distanzlesen.', p: 'Safety + Reset.' });


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
    let entry = glossary[canon];

    // Zusatzfelder anreichern
    if (typeof ENTRY_EXTRAS !== 'undefined') {
      const extra = ENTRY_EXTRAS[canon] || ENTRY_EXTRAS[raw];
      if (extra) {
        if (!entry.f) entry.f = extra.f;
        if (!entry.c) entry.c = extra.c;
      }
    }

    // Fallbacks (niemals leer lassen)
    if (!entry.f) entry.f = 'Zu viel Tempo vor Struktur; fehlender Reset/Zurückziehen; Atmung anhalten; Guard/Balance vernachlässigen.';
    if (!entry.c) entry.c = 'Starte langsam (sauber → schnell). Setze pro Runde einen Fokus (z.B. Stand/Hüfte/Timing) und wiederhole bewusst.';

    glossary[canon] = entry;
    return entry;
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

    // Zusätzliche Felder: Häufige Fehler & Coach Hinweise
    const _fEl = document.getElementById('glossF');
    if (_fEl) _fEl.textContent = entry.f || '—';
    const _cEl = document.getElementById('glossC');
    if (_cEl) _cEl.textContent = entry.c || '—';


    // Erklärungsbild: Default oder pro Begriff überschreibbar
    const imgEl = document.getElementById('glossImg');
    if (imgEl) {
      const src = (entry && entry.img) ? entry.img : termImageUrl(raw);
      // Fallback, falls Bilddatei nicht existiert
      imgEl.onerror = function () { this.onerror = null; this.src = DEFAULT_INFO_IMAGE; };
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
  const viewOrder = ['tkd', 'wc', 'other', 'training', 'timer', 'quiz'];
  let currentView = 'tkd';

  // ===== Collapsible top navigation (hamburger) =====
  function navLabelFor(view) {
    if (view === 'tkd') return 'TKD';
    if (view === 'wc') return 'Wing Chun';
    if (view === 'other') return 'Weiteres';
    if (view === 'training') return 'Training';
    if (view === 'timer') return 'Timer';
    if (view === 'quiz') return 'Quiz';
    return 'Menü';
  }
  function updateNavCurrentLabel(view) {
    var el = document.getElementById('navCurrentLabel');
    if (!el) return;
    el.textContent = navLabelFor(view || currentView);
  }
  function setMenuOpen(open) {
    var btn = document.getElementById('navMenuBtn');
    var panel = document.getElementById('navMenuPanel');
    if (!btn || !panel) return;
    var isOpen = !panel.classList.contains('hidden');
    var next = (open == null) ? !isOpen : !!open;
    panel.classList.toggle('hidden', !next);
    btn.setAttribute('aria-expanded', next ? 'true' : 'false');
  }
  function initNavMenu() {
    var btn = document.getElementById('navMenuBtn');
    var panel = document.getElementById('navMenuPanel');
    if (!btn || !panel) return;
    panel.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setMenuOpen();
    });
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('hidden')) return;
      var t = e.target;
      if (t === btn || (btn.contains && btn.contains(t))) return;
      if (panel.contains && panel.contains(t)) return;
      setMenuOpen(false);
    }, true);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenuOpen(false);
    });
  }
  function navGo(view) {
    showView(view);
    setMenuOpen(false);
  }
  function setNavActive(id) {
    ['navTKD', 'navWC', 'navOTHER', 'navTRAIN', 'navTIMER', 'navQUIZ'].forEach(function (b) {
      let el = document.getElementById(b);
      el.classList.toggle('active', b === id);
      el.setAttribute('aria-selected', b === id ? 'true' : 'false');
    });
  }
  function showView(name) {
    currentView = name;
    let _root = document.getElementById('appRoot');
    if (_root) _root.setAttribute('data-theme', (name === 'tkd') ? 'tkd' : ((name === 'wc') ? 'wc' : ''));
    ['tkd', 'wc', 'other', 'training', 'timer', 'quiz'].forEach(function (v) {
      document.getElementById('view-' + v).classList.toggle('active', v === name);
    });
    if (name === 'tkd') setNavActive('navTKD');
    if (name === 'wc') setNavActive('navWC');
    if (name === 'other') setNavActive('navOTHER');
    if (name === 'training') setNavActive('navTRAIN');
    if (name === 'timer') setNavActive('navTIMER');
    if (name === 'quiz') setNavActive('navQUIZ');
    if (name === 'training') renderTraining();
    if (name === 'timer') timerUpdate();
    updateNavCurrentLabel(name);
    setBadge();
  }
  document.getElementById('navTKD').addEventListener('click', () => { showView('tkd'); });
  document.getElementById('navWC').addEventListener('click', () => { showView('wc'); });
  document.getElementById('navOTHER').addEventListener('click', () => { showView('other'); });
  document.getElementById('navTRAIN').addEventListener('click', () => { showView('training'); });
  document.getElementById('navTIMER').addEventListener('click', () => { showView('timer'); });
  (function () { const b = document.getElementById('navQUIZ'); if (b) b.addEventListener('click', () => { navGo('quiz'); }); })();

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



  // ========= Quiz =========
  const quizState = { discipline: null, bank: null, questions: [], idx: 0, score: 0, answered: false };

  function pickUniqueQuestions(bank, n) {
    const out = [];
    const seen = new Set();
    const arr = (bank || []).slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    for (const q of arr) {
      const key = (q && q.q) ? String(q.q).trim() : '';
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(q);
      if (out.length >= n) break;
    }
    return out;
  }

  function quizEls() {
    return {
      mode: document.getElementById('quiz-modePill'),
      progress: document.getElementById('quiz-progressPill'),
      score: document.getElementById('quiz-scorePill'),
      setup: document.getElementById('quiz-setup'),
      play: document.getElementById('quiz-play'),
      result: document.getElementById('quiz-result'),
      q: document.getElementById('quiz-question'),
      opts: document.getElementById('quiz-options'),
      next: document.getElementById('quiz-next'),
      feedback: document.getElementById('quiz-feedback'),
      start: document.getElementById('quiz-start'),
      pickTkd: document.getElementById('quiz-pick-tkd'),
      pickWc: document.getElementById('quiz-pick-wc'),
      restart: document.getElementById('quiz-restart'),
      again: document.getElementById('quiz-again'),
      resultText: document.getElementById('quiz-resultText'),
    };
  }

  function quizSetModeLabel() {
    let el = quizEls();
    if (!el.mode) return;
    if (!quizState.discipline) el.mode.textContent = 'Modus: Auswahl';
    else el.mode.textContent = 'Modus: ' + (quizState.discipline === 'tkd' ? 'Taekwondo' : 'Wing Chun');
  }

  function quizUpdateMeta() {
    let el = quizEls();
    if (el.score) el.score.textContent = 'Punkte: ' + quizState.score;
    if (el.progress) el.progress.textContent = 'Frage ' + (quizState.questions.length ? (quizState.idx + 1) : 0) + ' / 10';
    quizSetModeLabel();
  }

  function quizReset(all) {
    quizState.questions = [];
    quizState.idx = 0;
    quizState.score = 0;
    quizState.answered = false;
    if (all) quizState.discipline = null;

    let el = quizEls();
    if (!el.setup) return;
    el.setup.classList.remove('hidden');
    el.play.classList.add('hidden');
    el.result.classList.add('hidden');
    if (el.start) el.start.disabled = !quizState.discipline;
    if (el.feedback) el.feedback.textContent = '—';
    quizUpdateMeta();
  }

  function quizPick(d) {
    quizState.discipline = d;
    quizState.bank = (typeof QUIZ_BANKS !== 'undefined' && QUIZ_BANKS) ? (d === 'tkd' ? QUIZ_BANKS.tkd : QUIZ_BANKS.wc) : [];
    let el = quizEls();
    if (el.start) el.start.disabled = !(quizState.bank && quizState.bank.length >= 10);
    if (el.pickTkd) el.pickTkd.classList.toggle('primary', d === 'tkd');
    if (el.pickWc) el.pickWc.classList.toggle('primary', d === 'wc');
    quizSetModeLabel();
  }

  function quizStart() {
    quizReset(false);
    let bank = quizState.bank || [];
    quizState.questions = pickUniqueQuestions(bank, 10);
    quizState.idx = 0;
    quizState.score = 0;
    let el = quizEls();
    el.setup.classList.add('hidden');
    el.play.classList.remove('hidden');
    el.result.classList.add('hidden');
    quizRender();
  }

  function quizRender() {
    let el = quizEls();
    let qobj = quizState.questions[quizState.idx];
    if (!qobj) { quizFinish(); return; }
    quizState.answered = false;
    if (el.next) el.next.disabled = true;
    if (el.feedback) el.feedback.textContent = '—';
    if (el.q) el.q.textContent = qobj.q;
    if (el.opts) el.opts.innerHTML = '';
    (qobj.options || []).forEach(function (opt, i) {
      let b = document.createElement('button');
      b.type = 'button';
      b.className = 'quizOpt';
      b.textContent = String.fromCharCode(65 + i) + ') ' + opt;
      b.addEventListener('click', function () { quizAnswer(i); });
      el.opts.appendChild(b);
    });
    quizUpdateMeta();
  }

  function quizAnswer(i) {
    if (quizState.answered) return;
    quizState.answered = true;
    let el = quizEls();
    let qobj = quizState.questions[quizState.idx];
    let btns = el.opts ? Array.prototype.slice.call(el.opts.querySelectorAll('.quizOpt')) : [];
    btns.forEach(function (b, idx) {
      if (idx === qobj.a) b.classList.add('correct');
      if (idx === i && i !== qobj.a) b.classList.add('wrong');
      b.disabled = true;
    });
    if (i === qobj.a) {
      quizState.score += 1;
      if (el.feedback) el.feedback.textContent = '✅ Korrekt';
    } else {
      if (el.feedback) el.feedback.textContent = '❌ Falsch – richtig ist ' + String.fromCharCode(65 + qobj.a);
    }
    if (el.score) el.score.textContent = 'Punkte: ' + quizState.score;
    if (el.next) el.next.disabled = false;
  }

  function quizNext() {
    if (!quizState.answered) return;
    quizState.idx += 1;
    if (quizState.idx >= quizState.questions.length) { quizFinish(); return; }
    quizRender();
  }

  function quizFinish() {
    let el = quizEls();
    el.setup.classList.add('hidden');
    el.play.classList.add('hidden');
    el.result.classList.remove('hidden');
    quizUpdateMeta();
    let msg = 'Du hast ' + quizState.score + ' / 10 Punkte erreicht.';
    let extra = '';
    if (quizState.score === 10) extra = ' Perfekt – stark!';
    else if (quizState.score >= 8) extra = ' Sehr gut – weiter so!';
    else if (quizState.score >= 5) extra = ' Solide – mit Wiederholung wird es schnell besser.';
    else extra = ' Tipp: Nutze die Info-Popups (ⓘ) und wiederhole gezielt.';
    if (el.resultText) el.resultText.textContent = msg + extra;
  }

  function quizInit() {
    let el = quizEls();
    if (!el.start) return;
    if (el.pickTkd) el.pickTkd.addEventListener('click', function () { quizPick('tkd'); });
    if (el.pickWc) el.pickWc.addEventListener('click', function () { quizPick('wc'); });
    if (el.start) el.start.addEventListener('click', quizStart);
    if (el.next) el.next.addEventListener('click', quizNext);
    if (el.restart) el.restart.addEventListener('click', function () { quizReset(true); });
    if (el.again) el.again.addEventListener('click', quizStart);
    quizReset(true);
  }

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
    var host = document.getElementById('tkd-ilboList');
    host.innerHTML = '';

    // Gruppen aus data.js (optional)
    var groups = (typeof TKD_SPARRING_GROUPS !== 'undefined' && TKD_SPARRING_GROUPS) ? TKD_SPARRING_GROUPS : null;
    var groupKeys = {};
    if (groups && Array.isArray(groups)) {
      groups.forEach(function (g) {
        (g.items || []).forEach(function (it) {
          var k = String(it && it.key ? it.key : '').trim();
          if (k) groupKeys[k] = true;
        });
      });
    }

    // Basis-Einschrittkampf (alles, was nicht Gruppen-Key ist)
    SPARRING.forEach(function (s) {
      if (groupKeys[String(s)]) return;
      var el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = (
        '<div class="checkRow">' +
        '<label><input type="checkbox" ' + (state.tkd.sparring[s] ? 'checked' : '') + '> ' +
        '<span>' + makeTermUI(s, 'Taekwondo', '🛡️') + '</span>' +
        '</label>' +
        '<small>Partner & Distanz</small>' +
        '</div>'
      );
      var cb = el.querySelector('input');
      cb.addEventListener('change', function () {
        state.tkd.sparring[s] = !!cb.checked;
        save();
        setBadge();
      });
      host.appendChild(el);
    });

    // Unterscheidungen als Obergruppen
    if (!groups || !Array.isArray(groups) || !groups.length) return;

    groups.forEach(function (g) {
      var items = (g.items || []).slice();
      if (!items.length) return;

      // ensure state keys
      items.forEach(function (it) {
        var k = String(it.key || '').trim();
        if (!k) return;
        if (typeof state.tkd.sparring[k] !== 'boolean') state.tkd.sparring[k] = false;
      });

      var allSelected = items.every(function (it) { return !!state.tkd.sparring[String(it.key)]; });
      var anySelected = items.some(function (it) { return !!state.tkd.sparring[String(it.key)]; });

      var box = document.createElement('div');
      box.className = 'item';
      box.innerHTML = (
        '<div class="groupHead">' +
        '<div class="groupTitle">' +
        '<span class="pill">' + escapeHtml(String(g.icon || 'Gruppe')) + '</span>' +
        escapeHtml(String(g.title || 'Gruppe')) +
        ' <span class="pill">' + items.length + '</span>' +
        '</div>' +
        '<div class="miniBtns">' +
        '<button class="mini" data-gact="all" type="button" ' + (allSelected ? 'disabled' : '') + '>Alle</button>' +
        '<button class="mini" data-gact="none" type="button" ' + (!anySelected ? 'disabled' : '') + '>Keine</button>' +
        '</div>' +
        '</div>' +
        '<div class="sep" style="margin:10px 0"></div>' +
        '<div class="list" style="gap:8px"></div>'
      );

      var list = box.querySelector('.list');

      // term UI: label anzeigen, key fürs Popup behalten
      function termUIKeyLabel(key, label, ctxHint) {
        var k = String(key || '').trim();
        var lab = String(label || k).trim();
        return (
          '<span class="termWrap">' +
          '<button class="termBtn js-term" type="button" data-term="' + escapeAttr(k) + '" data-ctx="' + escapeAttr(ctxHint || '') + '">' +
          escapeHtml(lab) +
          '</button>' +
          '<button class="infoBtn js-term" type="button" aria-label="Erklärung" data-term="' + escapeAttr(k) + '" data-ctx="' + escapeAttr(ctxHint || '') + '">i</button>' +
          '</span>'
        );
      }

      items.forEach(function (it) {
        var k = String(it.key || '').trim();
        if (!k) return;
        var label = (it.label != null) ? String(it.label) : k;
        var row = document.createElement('div');
        row.className = 'checkRow';
        row.innerHTML = '<label><input type="checkbox" ' + (state.tkd.sparring[k] ? 'checked' : '') + '> <span>' + termUIKeyLabel(k, label, 'Taekwondo') + '</span></label>';
        var cb = row.querySelector('input');
        cb.addEventListener('change', function () {
          state.tkd.sparring[k] = !!cb.checked;
          save();
          tkdRenderIlbo();
          setBadge();
        });
        list.appendChild(row);
      });

      box.addEventListener('click', function (e) {
        var t = e.target;
        if (!(t && t.classList && t.classList.contains('mini'))) return;
        var act = t.getAttribute('data-gact');
        if (act === 'all') items.forEach(function (it) { state.tkd.sparring[String(it.key)] = true; });
        if (act === 'none') items.forEach(function (it) { state.tkd.sparring[String(it.key)] = false; });
        save();
        tkdRenderIlbo();
        setBadge();
      });

      host.appendChild(box);
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
        details: ['Varianten: ' + chosen.join(' · ')]
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

  // ===== Timer Settings Helpers =====
  function timerGetWorkSec(){
    var v = parseInt((document.getElementById('timer-workSec') || {}).value || '60', 10);
    return clamp(isNaN(v) ? 60 : v, 1, 3600);
  }
  function timerGetRestSec(){
    var v = parseInt((document.getElementById('timer-restSec') || {}).value || '30', 10);
    return clamp(isNaN(v) ? 30 : v, 0, 3600);
  }
  function timerGetRounds(){
    var v = parseInt((document.getElementById('timer-rounds') || {}).value || '8', 10);
    return clamp(isNaN(v) ? 8 : v, 1, 200);
  }
  function timerGetVolume(){
    // Slider 0..100 (%), returns 0..1
    try {
      var el = document.getElementById('timer-volume');
      if (!el) return 0.25;
      var v = parseInt(el.value || '25', 10);
      v = isNaN(v) ? 25 : v;
      v = clamp(v, 0, 100);
      return v / 100;
    } catch(e){ return 0.25; }
  }
  function timerGetSoundMode(){
    try {
      var rText = document.getElementById('timer-mode-text');
      var rSignal = document.getElementById('timer-mode-signal');
      if (rText && rText.checked) return 'text';
      if (rSignal && rSignal.checked) return 'signal';
      return 'signal';
    } catch(e){ return 'signal'; }
  }
  function timerGetTtsWord(){
    try {
      var el = document.getElementById('timer-ttsWord');
      var v = (el && el.value) ? String(el.value) : 'Kick!';
      if (v === 'shadow') {
        var words = ['Kick!','Block!','Step!','Hit!'];
        return words[Math.floor(Math.random() * words.length)];
      }
      return v;
    } catch(e){ return 'Kick!'; }
  }

  // ===== Timer Sounds (WebAudio, no files) =====
  var _timerSound = { ctx: null, master: null };

  function ensureAudio(){
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      if (!_timerSound.ctx) {
        _timerSound.ctx = new Ctx();
        _timerSound.master = _timerSound.ctx.createGain();
        _timerSound.master.gain.value = timerGetVolume();
        _timerSound.master.connect(_timerSound.ctx.destination);
      } else {
        try { _timerSound.master.gain.value = timerGetVolume(); } catch(e){}
      }
      if (_timerSound.ctx.state === 'suspended') {
        _timerSound.ctx.resume().catch(function(){});
      }
      return _timerSound.ctx;
    } catch(e){ return null; }
  }

  function beep(freq, durMs, wave, amp){
    var ctx = ensureAudio();
    if (!ctx) return;
    try {
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = wave || 'sine';
      o.frequency.value = freq || 880;
      var a = (typeof amp === 'number') ? amp : 0.35; // per-beep amplitude
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0001, a), ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (durMs/1000));
      o.connect(g);
      g.connect(_timerSound.master || ctx.destination);
      o.start();
      o.stop(ctx.currentTime + (durMs/1000) + 0.02);
    } catch(e){}
  }

  function playTimerSignal(kind){
    // Only in Signal mode
    if (timerGetSoundMode() !== 'signal') return;
    try {
      if (kind === 'round') { beep(880, 140, 'square', 0.35); return; }
      if (kind === 'pause_start') { beep(330, 120, 'sine', 0.30); beep(330, 120, 'sine', 0.30); return; }
      if (kind === 'pause_end') { beep(660, 120, 'sine', 0.30); beep(660, 120, 'sine', 0.30); return; }
      if (kind === 'finished') { beep(523.25, 900, 'sawtooth', 0.38); return; }
    } catch(e){}
  }

  function speakWord(word){
    try {
      if (!('speechSynthesis' in window)) return;
      var text = String(word || '').trim();
      if (!text) return;
      // prevent queue buildup
      try { window.speechSynthesis.cancel(); } catch(e2){}
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 1.0;
      u.pitch = 1.0;
      u.volume = 1.0;
      window.speechSynthesis.speak(u);
    } catch(e){}
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
        work: Number((document.getElementById('timer-workSec') || {}).value),
        rest: Number((document.getElementById('timer-restSec') || {}).value),
        rounds: Number((document.getElementById('timer-rounds') || {}).value),
        volume: timerGetVolume(),
        soundMode: timerGetSoundMode(),
        ttsWord: (document.getElementById('timer-ttsWord') || {}).value || 'Kick!'
      }));
    } catch (e) { }
  }

  function timerUpdate() {
    document.getElementById('timer-display').textContent = fmt(_timer.remaining);
    document.getElementById('timer-phase').textContent = _timer.t ? (_timer.mode === 'work' ? 'WORK' : 'PAUSE') : '-';
    let rounds = timerGetRounds();
    document.getElementById('timer-round').textContent = (_timer.t ? (_timer.round + 1) : 0) + ' / ' + rounds;

    let total = Number(_timer.total) || 0;
    let rem = Number(_timer.remaining) || 0;
    if (!total) {
      total = timerGetWorkSec();
      rem = Number(_timer.remaining) || total;
    }
    timerRingSet(total > 0 ? (rem / total) : 0);
  }

  function timerStopInternal() {
    if (_timer.t) { clearInterval(_timer.t); _timer.t = null; }
    _timer.paused = true;
    timerUpdate();
  }

  // Round completion:
  // - If restSec > 0, a round completes when PAUSE ends (work + pause)
  // - If restSec == 0, a round completes when WORK ends
  function timerTick() {
    timerUpdate();

    if (_timer.remaining <= 0) {
      var restSec = timerGetRestSec();
      var rounds = timerGetRounds();

      if (_timer.mode === 'work') {
        if (restSec > 0) {
          // Work -> Pause
          _timer.mode = 'rest';
          playTimerSignal('pause_start');
          _timer.remaining = restSec;
          _timer.total = _timer.remaining;
        } else {
          // Pause=0: round completes at end of work
          _timer.round++;
          if (timerGetSoundMode() === 'text') speakWord(timerGetTtsWord()); else playTimerSignal('round');
          if (_timer.round >= rounds) {
            timerStopInternal();
            playTimerSignal('finished');
            toast('⏱️ Timer fertig – stark!');
            return;
          }
          _timer.mode = 'work';
          _timer.remaining = timerGetWorkSec();
          _timer.total = _timer.remaining;
        }
      } else {
        // Pause finished -> round completes
        _timer.round++;
        playTimerSignal('pause_end');
        if (timerGetSoundMode() === 'text') speakWord(timerGetTtsWord()); else playTimerSignal('round');

        if (_timer.round >= rounds) {
          timerStopInternal();
          playTimerSignal('finished');
          toast('⏱️ Timer fertig – stark!');
          return;
        }
        _timer.mode = 'work';
        _timer.remaining = timerGetWorkSec();
        _timer.total = _timer.remaining;
      }

      timerUpdate();
    }

    _timer.remaining--;
  }

  function timerStart() {
    timerSave();
    // Unlock audio/tts on user gesture
    ensureAudio();
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch(e){}

    if (_timer.t) return;

    if (_timer.paused && _timer.remaining <= 0) {
      _timer.mode = 'work';
      _timer.round = 0;
      _timer.remaining = timerGetWorkSec();
      _timer.total = _timer.remaining;
    }

    _timer.paused = false;
    _timer.t = setInterval(timerTick, 1000);
    timerUpdate();
  }

  function timerPause() {
    if (!_timer.t) return;
    ensureAudio();

    clearInterval(_timer.t);
    _timer.t = null;
    _timer.paused = true;
    timerUpdate();
  }

  function timerReset() {
    timerStopInternal();
    _timer.mode = 'work';
    _timer.round = 0;
    _timer.remaining = timerGetWorkSec();
    _timer.total = _timer.remaining;
    timerUpdate();
  }

  function timerInit() {
    let conf = timerLoad();
    if (typeof conf.work === 'number') document.getElementById('timer-workSec').value = conf.work;
    if (typeof conf.rest === 'number') document.getElementById('timer-restSec').value = conf.rest;
    if (typeof conf.rounds === 'number') document.getElementById('timer-rounds').value = conf.rounds;

    // Volume UI
    var volEl = document.getElementById('timer-volume');
    var volValEl = document.getElementById('timer-volumeVal');
    if (volEl) {
      var vv = (typeof conf.volume === 'number') ? conf.volume : timerGetVolume();
      vv = isNaN(vv) ? 0.25 : vv;
      vv = Math.max(0, Math.min(1, vv));
      volEl.value = String(Math.round(vv * 100));
      if (volValEl) volValEl.textContent = String(Math.round(vv * 100)) + '%';

      var updVol = function(){
        var v = parseInt(volEl.value || '25', 10);
        if (isNaN(v)) v = 25;
        v = clamp(v, 0, 100);
        volEl.value = String(v);
        if (volValEl) volValEl.textContent = String(v) + '%';
        try { if (_timerSound.master) _timerSound.master.gain.value = v/100; } catch(e){}
        timerSave();
      };
      volEl.addEventListener('input', updVol);
      volEl.addEventListener('change', updVol);
      updVol();
    }

    // Sound/Text mode UI
    var mSig = document.getElementById('timer-mode-signal');
    var mTxt = document.getElementById('timer-mode-text');
    var ttsWrap = document.getElementById('timer-ttsWrap');
    var ttsSel = document.getElementById('timer-ttsWord');
    if (mSig && mTxt) {
      var sm = (typeof conf.soundMode === 'string') ? conf.soundMode : 'signal';
      sm = (sm === 'text') ? 'text' : 'signal';
      mSig.checked = (sm === 'signal');
      mTxt.checked = (sm === 'text');
    }
    if (ttsSel && typeof conf.ttsWord === 'string') {
      ttsSel.value = conf.ttsWord;
    }

    var applyModeUi = function(){
      var mode = timerGetSoundMode();
      if (ttsWrap) ttsWrap.style.display = (mode === 'text') ? '' : 'none';
      var volWrap = document.getElementById('timer-volWrap');
      if (volWrap) volWrap.style.display = (mode === 'signal') ? '' : 'none';
      timerSave();
    };

    if (mSig) mSig.addEventListener('change', applyModeUi);
    if (mTxt) mTxt.addEventListener('change', applyModeUi);
    if (ttsSel) ttsSel.addEventListener('change', function(){ timerSave(); });
    applyModeUi();

    document.getElementById('timer-start').addEventListener('click', timerStart);
    document.getElementById('timer-pause').addEventListener('click', timerPause);
    document.getElementById('timer-reset').addEventListener('click', timerReset);

    ['timer-workSec', 'timer-restSec', 'timer-rounds'].forEach(function (id) {
      document.getElementById(id).addEventListener('change', function () {
        if (id === 'timer-workSec') this.value = String(clamp(parseInt(this.value || '60', 10), 1, 3600));
        if (id === 'timer-restSec') this.value = String(clamp(parseInt(this.value || '30', 10), 0, 3600));
        if (id === 'timer-rounds') this.value = String(clamp(parseInt(this.value || '8', 10), 1, 200));
        timerSave();
        if (!_timer.t) {
          _timer.remaining = timerGetWorkSec();
          _timer.total = _timer.remaining;
          timerUpdate();
        }
      });
    });

    _timer.remaining = timerGetWorkSec();
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

  initNavMenu();
  quizInit();
  // Timer init
  timerInit();

  // First render
  rerenderAll();
  showView('tkd');
  setBadge();
  // ========= PWA: Service Worker Registrierung =========
  if ((location.protocol === 'http:' || location.protocol === 'https:') && 'serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('Service Worker Registrierung fehlgeschlagen:', err);
      });
    });
  }


})();
