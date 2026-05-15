/* quiz.js – separat gepflegte Quiz-Fragenbibliothek
   Abhängigkeit: data.js (HYONGS, BASICS, FORMS, ...)
   Export: window.QUIZ_BANKS = { tkd: [...100], wc: [...100] }
   Regeln:
   - Jede Frage ist UNIQUE über q (Fragetext)
   - Ziel: pro Disziplin 100 Fragen, ca. 50/50 mcq & cloze
*/

(function(){
  'use strict';

  function shuffle(arr){
    const a = (arr||[]).slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      const t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }
  function pickDistinct(pool, n, exclude){
    const ex = new Set(exclude||[]);
    const out = [];
    for(const v of (pool||[])) if(!ex.has(v)) out.push(v);
    return shuffle(out).slice(0,n);
  }
  function q4(correct, pool){
    const distract = pickDistinct(pool, 3, [correct]);
    const opts = shuffle([correct].concat(distract));
    return { options: opts, a: opts.indexOf(correct) };
  }
  function keyOf(q){ return (q && q.q) ? String(q.q).trim() : ''; }
  function pushUnique(arr, q){
    const k = keyOf(q);
    if(!k) return;
    if(arr._seen.has(k)) return;
    arr._seen.add(k);
    arr.push(q);
  }
  function ensureCount(arr, n){
    const seen = new Set();
    const out = [];
    for(const q of arr){
      const k = keyOf(q);
      if(!k || seen.has(k)) continue;
      seen.add(k);
      out.push(q);
      if(out.length >= n) break;
    }
    return out;
  }
  function balance50_50(arr){
    const mcq = arr.filter(x=>x.type==='mcq');
    const clz = arr.filter(x=>x.type==='cloze');
    const out = mcq.slice(0,50).concat(clz.slice(0,50));
    return shuffle(out);
  }

  function buildTKD(){
    const out=[]; out._seen = new Set();
    const HY=(typeof HYONGS!=='undefined')?HYONGS:[];
    const B=(typeof BASICS!=='undefined')?BASICS:{kicks:[],blocks:[],strikes:[],stances:[]};
    const VARS=(typeof TKD_VARIATIONS!=='undefined')?TKD_VARIATIONS:[];
    const COM=(typeof COMBOS!=='undefined')?COMBOS:[];

    const hyongNames=HY.map(h=>h.name);
    const hyongIds=HY.map(h=>h.id);
    const hyongMoves=HY.map(h=>String(h.moves));
    const beltLabels=(typeof TKD_BELTS!=='undefined')?Object.keys(TKD_BELTS).map(k=>TKD_BELTS[k].label):[];

    // Hyongs: 40 (20 mcq + 20 cloze)
    HY.forEach(h=>{
      const o1 = q4(String(h.moves), hyongMoves);
      pushUnique(out,{type:'mcq', q:`Wie viele Bewegungen hat ${h.name}?`, options:o1.options, a:o1.a});
      const bl = (typeof TKD_BELTS!=='undefined' && TKD_BELTS[h.belt]) ? TKD_BELTS[h.belt].label : '';
      const o2 = q4(bl, beltLabels.length?beltLabels:[bl]);
      pushUnique(out,{type:'mcq', q:`Zu welchem Gürtel gehört ${h.name}?`, options:o2.options, a:o2.a});
      const c1 = q4(h.name, hyongNames);
      pushUnique(out,{type:'cloze', q:`Hyong ${h.id} heißt ____ .`, options:c1.options, a:c1.a});
      const c2 = q4(h.id, hyongIds);
      pushUnique(out,{type:'cloze', q:`${h.name} ist Hyong ____ .`, options:c2.options, a:c2.a});
    });

    // Kicks: 14 (7/7)
    (B.kicks||[]).forEach(k=>{
      pushUnique(out,{type:'mcq', q:`Was ist beim ${k} (Kick) der beste Technik-Fokus?`, options:[
        'Kammer (Knie hoch) → strecken → sofort zurückziehen (Recoil)',
        'Schultern hochziehen für mehr Kraft',
        'Bein nach Treffer lange draußen lassen',
        'Atmung anhalten'
      ], a:0});
      const c = q4('Strecken',['Strecken','Hüpfen','Ausholen','Anhalten']);
      pushUnique(out,{type:'cloze', q:`Beim ${k}: Kammer → ____ → Recoil.`, options:c.options, a:c.a});
    });

    // Blocks: 10 (5/5)
    (B.blocks||[]).forEach(b=>{
      const o = q4(b,(B.blocks||[]).concat(B.kicks||[]).concat(B.strikes||[]));
      pushUnique(out,{type:'mcq', q:`Welche Technik ist ein Block? (Bezug: ${b})`, options:o.options, a:o.a});
      const c = q4('Block',['Block','Kick','Hyong','Kombination']);
      pushUnique(out,{type:'cloze', q:`In der App ist „${b}“ ein ____ .`, options:c.options, a:c.a});
    });

    // Strikes: 10 (5/5)
    (B.strikes||[]).forEach(s=>{
      const o = q4(s,(B.strikes||[]).concat(B.blocks||[]).concat(B.kicks||[]));
      pushUnique(out,{type:'mcq', q:`Welche Technik ist ein Schlag? (Bezug: ${s})`, options:o.options, a:o.a});
      const c = q4('Schlägen',['Schlägen','Kicks','Hyongs','Stellungen']);
      pushUnique(out,{type:'cloze', q:`„${s}“ zählt zu den ____ .`, options:c.options, a:c.a});
    });

    // Kombos: 12 (6/6)
    (COM||[]).forEach(cmb=>{
      const o = q4(cmb,(COM||[]).concat(B.kicks||[]).concat(B.blocks||[]));
      pushUnique(out,{type:'mcq', q:`Welche Angabe ist eine TKD-Kombination? (Bezug: ${cmb})`, options:o.options, a:o.a});
      const m = String(cmb).match(/(\d+)(?!.*\d)/);
      if(m){
        const n = m[1];
        const opts = shuffle([n,String(Number(n)+1),'1','0']);
        pushUnique(out,{type:'cloze', q:`In „${cmb}“ ist die letzte Zahl ____ .`, options:opts, a:opts.indexOf(n)});
      } else {
        const c = q4('Kombinations',['Kombinations','Sparring','Hyong','Stellungs']);
        pushUnique(out,{type:'cloze', q:`„${cmb}“ ist ein ____-Drill.`, options:c.options, a:c.a});
      }
    });

    // Variationen: 6 (3/3)
    (VARS||[]).slice(0,3).forEach(v=>{
      const o = q4(v,(VARS||[]).concat(['Sätze','Teile','Gürtel']));
      pushUnique(out,{type:'mcq', q:`Welche Option ist eine Hyong-Variante? (Bezug: ${v})`, options:o.options, a:o.a});
    });
    (VARS||[]).slice(3,6).forEach(v=>{
      const c = q4('anders',['anders','nie','falsch','zufällig']);
      pushUnique(out,{type:'cloze', q:`Variante „${v}“ heißt: dieselbe Form, aber ____ geübt.`, options:c.options, a:c.a});
    });

    // Prinzipien (füllt auf 50/50 aus)
    pushUnique(out,{type:'mcq', q:'Welcher Satz passt am besten zum App-Fokus „Qualität zuerst“?', options:[
      'Langsam üben ist kein Umweg – es ist der Turbo.',
      'Nur Geschwindigkeit zählt, egal wie unsauber.',
      'Wiederholen ist Zeitverschwendung.',
      'Atmung ist unwichtig.'
    ], a:0});
    pushUnique(out,{type:'mcq', q:'Welche Aussage passt zur App-Logik?', options:[
      'Timer läuft unabhängig von der gewählten Hauptseite.',
      'Timer ist an jede Übung gekoppelt.',
      'Timer kann nur im Training gestartet werden.',
      'Timer-Einstellungen werden nie gespeichert.'
    ], a:0});
    pushUnique(out,{type:'cloze', q:'Im Training gilt: sauber → ____ → stark.', options:q4('schnell',['schnell','laut','chaotisch','müde']).options, a:q4('schnell',['schnell','laut','chaotisch','müde']).a});
    pushUnique(out,{type:'cloze', q:'Im Intervall-Timer wechseln Work und ____ ab.', options:q4('Pause',['Pause','Hyong','Gürtel','Ausholen']).options, a:q4('Pause',['Pause','Hyong','Gürtel','Ausholen']).a});

    const bank = balance50_50(out);
    return ensureCount(bank, 100);
  }

  function buildWC(){
    const out=[]; out._seen = new Set();
    const forms=(typeof FORMS!=='undefined')?FORMS:[];
    const VARS=(typeof WC_VARIATIONS!=='undefined')?WC_VARIATIONS:[];

    const formNames=forms.map(f=>f.name);
    const formCodes=forms.map(f=>f.code);
    const formNotes=forms.map(f=>f.note);

    // Formen (6/6)
    forms.forEach(f=>{
      const o1=q4(f.code,formCodes);
      pushUnique(out,{type:'mcq', q:`Welches Kürzel (Code) hat die Form ${f.name}?`, options:o1.options, a:o1.a});
      const o2=q4(f.note,formNotes);
      pushUnique(out,{type:'mcq', q:`Welche Kurzbeschreibung passt zu ${f.name}?`, options:o2.options, a:o2.a});
      const c1=q4(f.name,formNames);
      pushUnique(out,{type:'cloze', q:`Die Form ____ gehört zu Wing Chun (Bezug: ${f.name}).`, options:c1.options, a:c1.a});
      const c2=q4('große',['große','keine','zufällige','geringe']);
      pushUnique(out,{type:'cloze', q:`Bei ${f.name}: kleine Bewegung, ____ Wirkung.`, options:c2.options, a:c2.a});
    });

    // Techniken 64 (32/32)
    const bucket=[];
    function pushList(arr,cat){ (arr||[]).forEach(x=>bucket.push({cat,t:x.t,d:x.d})); }
    pushList((typeof GRUNDLAGEN!=='undefined'?GRUNDLAGEN:[]),'Grundlagen');
    pushList((typeof ARM_HAND!=='undefined'?ARM_HAND:[]),'Schutztechniken');
    pushList((typeof BEINE!=='undefined'?BEINE:[]),'Beine');
    pushList((typeof WEITERE_HAND!=='undefined'?WEITERE_HAND:[]),'Weiteres');
    pushList((typeof WEAPON!=='undefined'?WEAPON:[]),'Weapon');

    const cats=['Grundlagen','Schutztechniken','Beine','Weiteres','Weapon','Formen'];
    const descPool=bucket.map(x=>x.d);

    bucket.forEach(it=>{
      const o=q4(it.d,descPool);
      pushUnique(out,{type:'mcq', q:`Was beschreibt „${it.t}“ am besten?`, options:o.options, a:o.a});
      const c=q4(it.cat,cats);
      pushUnique(out,{type:'cloze', q:`„${it.t}“ gehört zur Kategorie ____ .`, options:c.options, a:c.a});
    });

    // Variationen: 6 (3/3)
    (VARS||[]).slice(0,3).forEach(v=>{
      const o=q4(v,(VARS||[]).concat(['Gürtel','Runden','Sätze']));
      pushUnique(out,{type:'mcq', q:`Welche Option ist eine Form-Variante? (Bezug: ${v})`, options:o.options, a:o.a});
    });
    (VARS||[]).slice(3,6).forEach(v=>{
      const c=q4('mit anderem Fokus',['mit anderem Fokus','mit anderer Gürtelstufe','ohne Struktur','ohne Atmung']);
      pushUnique(out,{type:'cloze', q:`Variante „${v}“ bedeutet: dieselbe Form, aber ____ geübt.`, options:c.options, a:c.a});
    });

    // Prinzipien
    pushUnique(out,{type:'mcq', q:'Was beschreibt die Mittellinie im Wing Chun am ehesten?', options:[
      'Zentrale Linie; Kontrolle erhöht Effizienz in Angriff/Verteidigung',
      'Nur weite Kreisbewegungen',
      'Nur Bodenkampf',
      'Nur Tritte'
    ], a:0});
    pushUnique(out,{type:'mcq', q:'Welche Aussage passt zum App-Fokus für Wing Chun?', options:[
      'Struktur halten · Timing finden · Mittellinie',
      'Nur Maximalkraft ohne Kontrolle',
      'Nur neue Begriffe, nie wiederholen',
      'Technik ist unwichtig – Hauptsache schnell'
    ], a:0});
    pushUnique(out,{type:'cloze', q:'Wing Chun Prinzip: Ellenbogen ____ , Haltung klar.', options:q4('tief',['tief','hoch','weit außen','zufällig']).options, a:q4('tief',['tief','hoch','weit außen','zufällig']).a});
    pushUnique(out,{type:'cloze', q:'Beim Üben gilt: locker bleiben, Struktur halten, ____ finden.', options:q4('Timing',['Timing','Chaos','Ausholen','Ablenkung']).options, a:q4('Timing',['Timing','Chaos','Ausholen','Ablenkung']).a});

    const bank = balance50_50(out);
    return ensureCount(bank, 100);
  }

  window.QUIZ_BANKS = { tkd: buildTKD(), wc: buildWC() };
})();
