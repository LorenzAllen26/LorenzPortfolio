/* Portfolio chatbot for Lorenz Allen M. Biscocho
   Add before </body>:  <script src="chatbot.js"></script>
   Training: open the bot and type /train (visitors never see the training tools). */
(function () {
  const LS_LEARNED = "lb_bot_learned", LS_MISS = "lb_bot_unanswered";
  const load = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  /* ---------- 1. KNOWLEDGE BASE (edit freely) ---------- */
  const KB = [
    { id: "hi", k: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
      a: "Hi! I'm Lorenz's portfolio assistant. Ask me about his projects, skills, education, certifications, or how to contact him." },
    { id: "about", k: ["who is", "who are", "about", "yourself", "introduce", "summary", "profile"],
      a: "Lorenz Allen M. Biscocho is a fourth-year BS Information Technology student (System Development) at De La Salle Lipa. He has hands-on experience in web development, image recognition APIs, and text similarity algorithms, and is looking for an IT internship." },
    { id: "edu", k: ["school", "university", "college", "education", "study", "studying", "degree", "dlsl", "de la salle", "course", "coursework", "year level", "elementary", "high school", "junior high", "senior high", "stem", "strand", "holy trinity", "padre garcia", "graduate"],
      a: "Lorenz's education:\n• Holy Trinity School of Padre Garcia, Mataasnakahoy Branch (2008–2016)\n• De La Salle Lipa Junior High School (2017–2020)\n• De La Salle Lipa, STEM Strand (2021–2023)\n• De La Salle Lipa, BS Information Technology, System Development (2023–present, 4th year)\nCoursework: Database Systems, Web Development, Systems Integration & Architecture, Networking, and Information Assurance & Security." },
    { id: "skills", k: ["skill", "tech stack", "technolog", "proficien", "good at", "know how", "tools", "stack"],
      a: "Lorenz's skills:\n• Programming: Python, Java, JavaScript, PHP, C++\n• Web: HTML/CSS, React, Node.js, TypeScript\n• Databases: MySQL, PostgreSQL, MongoDB\n• Tools & soft skills: Git/GitHub, Agile/Scrum, problem solving, teamwork" },
    { id: "prog", k: ["programming", "python", "java", "javascript", "php", "c#", "coding", "code in"],
      a: "He programs in Python, Java, JavaScript, PHP, and C++." },
    { id: "web", k: ["react", "node", "typescript", "framework", "frontend", "front end", "html", "css", "full stack", "full-stack"],
      a: "On the web side Lorenz works with HTML/CSS, React, Node.js, and TypeScript, and he builds full-stack systems as part of his System Development track." },
    { id: "db", k: ["database", "mysql", "postgres", "mongo", "sql"],
      a: "Lorenz has worked with MySQL, PostgreSQL, and MongoDB, and he studied Database Systems at De La Salle Lipa." },
    { id: "projects", k: ["project", "portfolio", "built", "build", "made", "developed", "work sample"],
      a: "Featured projects:\n1. BATRACEKO, a lost-and-found web app for BATRASCO Public (capstone, 2025–2026).\n2. Unix Guild Play-To-Earn website, a portal for aspiring Axie Infinity scholars (2022–2023).\nAsk me about either one for details." },
    { id: "batraceko", k: ["batraceko", "batrasco", "lost and found", "lost & found", "capstone", "vision api", "google cloud", "dice", "sorensen", "sørensen", "image recognition", "text similarity"],
      a: "BATRACEKO is Lorenz's capstone (2025–2026): a lost-and-found web app for BATRASCO Public. It uses Google Cloud Vision API to recognize lost items from photos and the Sørensen–Dice coefficient to match lost and found item descriptions. Stack: JavaScript, PHP/MySQL. His role: UI/UX and developer." },
    { id: "unix", k: ["unix", "axie", "guild", "play to earn", "play-to-earn", "scholar", "p2e"],
      a: "The Unix Guild Play-To-Earn website (2022–2023) was a team project that gave aspiring Axie Infinity scholars accessible scholarship info and a way to connect with guild leadership. Lorenz was a team website developer (HTML/CSS, JavaScript, web design). He also served as Team Leader and Promoter in the guild." },
    { id: "ach", k: ["achievement", "award", "top student", "honor", "recognition", "accomplish", "milestone"],
      a: "Highlights:\n• Top Student in Information Assurance and Security 1 at De La Salle Lipa\n• Launched the BATRACEKO system for BATRASCO Public\n• Cisco HTML Essentials and CSS Essentials certifications (Sept 2026)\n• Active JPCS member since 2023" },
    { id: "cert", k: ["certif", "cisco", "html essentials", "css essentials", "credential", "training"],
      a: "Lorenz earned two Cisco Networking Academy certifications in September 2026: HTML Essentials (semantic structure, accessibility, modern layouts) and CSS Essentials (Flexbox, Grid, styling, responsive design)." },
    { id: "exp", k: ["experience", "work history", "job", "employ", "sentinel", "marshall", "promoter", "team leader", "ygg"],
      a: "Experience:\n• Sentinels Marshall, YGG PH (Mar 2026): monitored attendance and coordinated meetings on Discord, Google Meet, and Zoom.\n• Team Leader, Unix Guild (Oct 2021–2022): managed Axie scholarship activities and supported scholars.\n• Unix Promoter, Unix Guild (Oct 2022): promoted the guild on Facebook, X, Instagram, and TikTok." },
    { id: "jpcs", k: ["jpcs", "organization", "society", "leadership", "member", "club", "philippine computer"],
      a: "Since 2023 Lorenz has been a member of the Junior Philippine Computer Society (JPCS), helping plan and manage events, coordinating teams, and overseeing execution of tasks." },
    { id: "contact", k: ["contact", "email", "e-mail", "phone", "number", "mobile", "call", "reach", "message", "get in touch"],
      a: "You can reach Lorenz at:\n• Email: biscocho.lorenz4@gmail.com\n• Phone: +63 906 045 7314\nOr use the contact form at the bottom of this page." },
    { id: "social", k: ["github", "linkedin", "social", "link", "repo"],
      a: "GitHub: https://github.com/LorenzAllen26\nLinkedIn: https://www.linkedin.com/in/lorenz-allen-biscocho-82a962218/" },
    { id: "resume", k: ["resume", "cv", "pdf", "download", "curriculum"],
      a: "Click “View Resume” in the top menu to read Lorenz's CV, or download it from inside the viewer.", act: "resume" },
    { id: "hire", k: ["internship", "intern", "ojt", "hire", "hiring", "available", "opportunit", "looking for", "recruit"],
      a: "Yes. Lorenz is seeking an IT internship where he can apply his technical, analytical, and problem-solving skills to real-world software development. Email biscocho.lorenz4@gmail.com to get in touch." },
    { id: "where", k: ["where", "location", "live", "based", "batangas", "philippines", "city", "address"],
      a: "Lorenz is based in Mataasnakahoy, Batangas, Philippines, and studies in Lipa City." },
    { id: "lang", k: ["speak", "english", "filipino", "tagalog", "spoken language", "languages do"],
      a: "Filipino is his native language, and he has professional proficiency in English." },
    { id: "thanks", k: ["thank", "thanks", "salamat", "appreciate"], a: "You're welcome! Anything else you'd like to know about Lorenz?" },
    { id: "bye", k: ["bye", "goodbye", "see you"], a: "Thanks for visiting! Feel free to reach out to Lorenz anytime." }
  ];
  const CHIPS = ["What projects has Lorenz built?", "What are his skills?", "Is he available for an internship?", "How can I contact him?"];

  /* ---------- 2. MATCHING ---------- */
  const STOP = new Set("a an the is are was were do does did of in on at to for with and or what which who whom how can could you your his her he she it about me my tell please i am be this that there any some".split(" "));
  const norm = (s) => " " + s.toLowerCase().replace(/[^a-z0-9+#øå\s&-]/g, " ").replace(/\s+/g, " ").trim() + " ";
  const toks = (s) => norm(s).trim().split(" ").filter((w) => w && !STOP.has(w));

  let learned = load(LS_LEARNED), remote = [];

  function scoreKeywords(q, kws) {
    let s = 0;
    for (const kw of kws) {
      const n = norm(kw).trimEnd(); // keep leading space => word-start match
      if (kw.length <= 3 ? q.includes(n + " ") : q.includes(n)) s += 2 + kw.split(" ").length;
    }
    return s;
  }
  function answer(text) {
    const q = norm(text);
    // trained answers first
    let best = null, bestScore = 0;
    for (const e of [...learned, ...remote]) {
      let kws = e.k && e.k.length ? e.k : toks(e.q);
      let total = kws.length * 3 || 1, sc = scoreKeywords(q, kws);
      const ratio = sc / total;
      if (sc >= 3 && ratio >= 0.5 && sc > bestScore) { best = e; bestScore = sc; }
    }
    if (best) return best;
    for (const e of KB) {
      const sc = scoreKeywords(q, e.k);
      if (sc > bestScore) { best = e; bestScore = sc; }
    }
    return bestScore >= 2 ? best : null;
  }

  /* ---------- 3. UI ---------- */
  const css = `
  #lb-bot,#lb-bot *{box-sizing:border-box;font-family:Inter,system-ui,sans-serif}
  #lb-fab{position:fixed;right:20px;bottom:20px;z-index:60;width:56px;height:56px;border-radius:16px;border:0;cursor:pointer;
    background:linear-gradient(135deg,#22c55e,#38bdf8);color:#0b0f19;font-size:22px;box-shadow:0 8px 24px rgba(34,197,94,.35);transition:transform .15s}
  #lb-fab:hover{transform:translateY(-2px)} #lb-fab:focus-visible,#lb-bot button:focus-visible,#lb-bot input:focus-visible,#lb-bot textarea:focus-visible{outline:2px solid #4ade80;outline-offset:2px}
  #lb-panel{position:fixed;right:20px;bottom:88px;z-index:60;width:380px;max-width:calc(100vw - 24px);height:560px;max-height:calc(100vh - 110px);
    display:none;flex-direction:column;background:#0f1522;border:1px solid rgba(255,255,255,.1);border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.55);color:#e5e7eb}
  #lb-panel.open{display:flex}
  .lb-head{display:flex;align-items:center;gap:10px;padding:14px 16px;background:#111827;border-bottom:1px solid rgba(255,255,255,.07)}
  .lb-av{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#38bdf8);color:#0b0f19;font-weight:800;display:grid;place-items:center;font-size:14px}
  .lb-head b{display:block;font-size:14px;color:#fff}.lb-head small{font-size:11px;color:#9ca3af}
  .lb-x{margin-left:auto;background:none;border:0;color:#9ca3af;font-size:18px;cursor:pointer;padding:4px 8px;border-radius:8px}.lb-x:hover{color:#fff;background:#1f2937}
  #lb-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}
  .lb-m{max-width:86%;padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
  .lb-m a{color:#4ade80;text-decoration:underline}
  .lb-b{align-self:flex-start;background:#1f2937;border-bottom-left-radius:4px}.lb-u{align-self:flex-end;background:#16a34a;color:#fff;border-bottom-right-radius:4px}
  .lb-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 10px}
  .lb-chip{background:transparent;border:1px solid rgba(74,222,128,.35);color:#4ade80;border-radius:999px;padding:6px 11px;font-size:12px;cursor:pointer}.lb-chip:hover{background:rgba(74,222,128,.12)}
  .lb-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.07);background:#111827}
  .lb-form input,.lb-train input,.lb-train textarea{flex:1;width:100%;background:#0b0f19;border:1px solid #374151;color:#fff;border-radius:10px;padding:10px 12px;font-size:13.5px}
  .lb-send,.lb-btn{background:#22c55e;color:#0b0f19;border:0;border-radius:10px;padding:0 14px;font-weight:700;cursor:pointer;font-size:13px}
  .lb-send{min-height:40px}.lb-btn{min-height:36px}.lb-btn.alt{background:#1f2937;color:#e5e7eb}
  .lb-train{display:none;flex:1;overflow-y:auto;padding:14px;flex-direction:column;gap:10px;font-size:13px}
  .lb-train label{font-size:12px;color:#9ca3af;display:block;margin-bottom:4px}
  .lb-row{display:flex;gap:8px;flex-wrap:wrap}
  .lb-item{background:#111827;border:1px solid #1f2937;border-radius:10px;padding:8px 10px;font-size:12.5px;display:flex;gap:8px;align-items:flex-start}
  .lb-item span{flex:1;word-break:break-word}.lb-item button{background:none;border:0;color:#f87171;cursor:pointer;font-size:12px}.lb-item button.use{color:#4ade80}
  .lb-train h4{margin:6px 0 0;font-size:12.5px;color:#fff}
  #lb-panel.training .lb-train{display:flex}#lb-panel.training #lb-msgs,#lb-panel.training .lb-chips,#lb-panel.training .lb-form{display:none}
  @media (prefers-reduced-motion:reduce){#lb-fab{transition:none}}`;
  document.head.appendChild(Object.assign(document.createElement("style"), { textContent: css }));

  const root = document.createElement("div");
  root.id = "lb-bot";
  root.innerHTML = `
  <button id="lb-fab" aria-label="Chat with Lorenz's assistant"><i class="fa-regular fa-comment-dots"></i></button>
  <section id="lb-panel" role="dialog" aria-label="Portfolio assistant">
    <div class="lb-head"><div class="lb-av">LB</div><div><b>Lorenz's Assistant</b><small id="lb-sub">Ask me about his portfolio</small></div>
      <button class="lb-x" id="lb-close" aria-label="Close chat">&times;</button></div>
    <div id="lb-msgs" aria-live="polite"></div>
    <div class="lb-chips" id="lb-chips"></div>
    <form class="lb-form" id="lb-form"><input id="lb-in" autocomplete="off" placeholder="Ask about projects, skills, contact…" aria-label="Your question"><button class="lb-send" type="submit">Send</button></form>
    <div class="lb-train" id="lb-train">
      <h4>Teach the bot</h4>
      <div><label for="t-q">Question (a visitor might ask)</label><input id="t-q" placeholder="e.g. What is your thesis about?"></div>
      <div><label for="t-k">Keywords (optional, comma-separated)</label><input id="t-k" placeholder="thesis, research, paper"></div>
      <div><label for="t-a">Answer</label><textarea id="t-a" rows="3" placeholder="Write the reply…"></textarea></div>
      <div class="lb-row"><button class="lb-btn" id="t-save">Save answer</button><button class="lb-btn alt" id="t-back">Back to chat</button></div>
      <h4>Questions I couldn't answer</h4><div id="t-miss"></div>
      <h4>Learned answers</h4><div id="t-list"></div>
      <div class="lb-row"><button class="lb-btn alt" id="t-export">Export JSON</button><button class="lb-btn alt" id="t-import">Import JSON</button><input type="file" id="t-file" accept=".json" hidden></div>
      <small style="color:#9ca3af">Saved in this browser. Export as <b>bot-knowledge.json</b> and upload it next to index.html so every visitor gets the answers.</small>
    </div>
  </section>`;
  document.body.appendChild(root);

  const $ = (id) => document.getElementById(id);
  const panel = $("lb-panel"), msgs = $("lb-msgs");
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const linkify = (s) => esc(s).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g, '<a href="mailto:$1">$1</a>');

  function add(text, who) {
    const d = document.createElement("div");
    d.className = "lb-m " + (who === "u" ? "lb-u" : "lb-b");
    d.innerHTML = who === "u" ? esc(text) : linkify(text);
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }
  function reply(text) {
    const t = text.trim(); if (!t) return;
    if (t.toLowerCase() === "/train") { openTrain(); return; }
    add(t, "u");
    const hit = answer(t);
    setTimeout(() => {
      if (hit) { add(hit.a, "b"); if (hit.act === "resume" && window.openResumeModal) window.openResumeModal(); }
      else {
        add("I don't have an answer for that yet. Try asking about Lorenz's projects, skills, education, or certifications, or email him at biscocho.lorenz4@gmail.com.", "b");
        const miss = load(LS_MISS); if (!miss.includes(t)) { miss.push(t); save(LS_MISS, miss.slice(-50)); }
      }
    }, 350);
  }

  /* training view */
  function renderTrain() {
    const miss = load(LS_MISS);
    $("t-miss").innerHTML = miss.length ? "" : '<div class="lb-item"><span>None yet.</span></div>';
    miss.forEach((q, i) => {
      const r = document.createElement("div"); r.className = "lb-item";
      r.innerHTML = `<span>${esc(q)}</span><button class="use">Answer</button><button>Dismiss</button>`;
      r.children[1].onclick = () => { $("t-q").value = q; $("t-a").focus(); };
      r.children[2].onclick = () => { miss.splice(i, 1); save(LS_MISS, miss); renderTrain(); };
      $("t-miss").appendChild(r);
    });
    $("t-list").innerHTML = learned.length ? "" : '<div class="lb-item"><span>Nothing learned yet.</span></div>';
    learned.forEach((e, i) => {
      const r = document.createElement("div"); r.className = "lb-item";
      r.innerHTML = `<span><b>${esc(e.q)}</b><br>${esc(e.a)}</span><button>Delete</button>`;
      r.children[1].onclick = () => { learned.splice(i, 1); save(LS_LEARNED, learned); renderTrain(); };
      $("t-list").appendChild(r);
    });
  }
  function openTrain() { panel.classList.add("training"); $("lb-sub").textContent = "Training mode"; renderTrain(); }
  function closeTrain() { panel.classList.remove("training"); $("lb-sub").textContent = "Ask me about his portfolio"; }

  $("t-save").onclick = () => {
    const q = $("t-q").value.trim(), a = $("t-a").value.trim();
    if (!q || !a) return;
    const k = $("t-k").value.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
    learned.push({ q, a, k }); save(LS_LEARNED, learned);
    const miss = load(LS_MISS).filter((m) => m !== q); save(LS_MISS, miss);
    $("t-q").value = $("t-k").value = $("t-a").value = ""; renderTrain();
  };
  $("t-back").onclick = closeTrain;
  $("t-export").onclick = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(learned, null, 2)], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "bot-knowledge.json" }); a.click(); URL.revokeObjectURL(url);
  };
  $("t-import").onclick = () => $("t-file").click();
  $("t-file").onchange = (ev) => {
    const f = ev.target.files[0]; if (!f) return;
    f.text().then((t) => { try { const d = JSON.parse(t); if (Array.isArray(d)) { learned = learned.concat(d.filter((x) => x.q && x.a)); save(LS_LEARNED, learned); renderTrain(); } } catch (e) {} });
  };

  /* wiring */
  function toggle(open) {
    panel.classList.toggle("open", open);
    if (open && !msgs.children.length) {
      add("Hi! I'm Lorenz's portfolio assistant. What would you like to know?", "b");
      CHIPS.forEach((c) => { const b = document.createElement("button"); b.className = "lb-chip"; b.textContent = c; b.onclick = () => { $("lb-chips").remove(); reply(c); }; $("lb-chips").appendChild(b); });
    }
    if (open) $("lb-in").focus();
  }
  $("lb-fab").onclick = () => toggle(!panel.classList.contains("open"));
  $("lb-close").onclick = () => toggle(false);
  $("lb-form").onsubmit = (e) => { e.preventDefault(); const v = $("lb-in").value; $("lb-in").value = ""; const c = $("lb-chips"); if (c) c.remove(); reply(v); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && panel.classList.contains("open") && document.getElementById("resumeModal").classList.contains("hidden")) toggle(false); });

  // optional published knowledge file (works once the site is hosted)
  fetch("bot-knowledge.json").then((r) => (r.ok ? r.json() : [])).then((d) => { if (Array.isArray(d)) remote = d; }).catch(() => {});
  if (location.hash === "#train") { toggle(true); openTrain(); }
})();