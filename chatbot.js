/*!
 * LorenzBot — portfolio chatbot for Lorenz Allen M. Biscocho
 * Usage: add  <script src="chatbot.js" defer></script>  just before </body> in index.html
 * Training mode: open your site with ?train=1 (or type /train in the chat) to see the Train tab.
 * No server or API key needed: it runs fully in the browser.
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------------ *
   * 1. KNOWLEDGE BASE  (edit / add entries here, or use the Train tab)
   *    q = sample questions, k = keywords, a = answer
   * ------------------------------------------------------------------ */
  const BASE_KB = [
    { id: "greet", q: ["hi", "hello", "hey", "good morning"], k: ["hi", "hello", "hey", "greetings", "morning", "afternoon", "evening"],
      a: "Hi there! 👋 I'm LorenzBot, Lorenz's portfolio assistant. Ask me about his education, skills, projects, certifications, experience, or how to contact him." },
    { id: "about", q: ["who is lorenz", "tell me about lorenz", "who are you", "introduce yourself", "about him"], k: ["who", "about", "introduce", "summary", "profile", "lorenz", "biscocho"],
      a: "Lorenz Allen M. Biscocho is a fourth-year BS Information Technology student at De La Salle Lipa, specializing in System Development. He has hands-on experience in web development, image recognition APIs, and text similarity algorithms, and is currently seeking an IT internship." },
    { id: "education", q: ["where does he study", "what is his course", "education background", "what school"], k: ["education", "school", "university", "college", "study", "course", "degree", "dlsl", "de la salle", "lipa", "bsit", "bs it", "information technology", "student", "year"],
      a: "Lorenz is a fourth-year student taking a Bachelor of Science in Information Technology (System Development specialization) at De La Salle Lipa in Lipa City, Batangas. He is also a DLSL STEM graduate." },
    { id: "coursework", q: ["what subjects has he taken", "relevant coursework"], k: ["coursework", "subjects", "courses", "classes", "database systems", "networking", "systems integration", "architecture", "information assurance", "security"],
      a: "Relevant coursework: Database Systems, Web Development, Systems Integration & Architecture, Networking, and Information Assurance & Security." },
    { id: "skills", q: ["what are his skills", "what can he do", "tech stack", "technologies he knows"], k: ["skills", "skill", "tech", "stack", "technologies", "proficiency", "know", "can", "abilities", "competencies"],
      a: "Skills overview:\n• Programming: Python, Java, JavaScript, PHP, C#\n• Web & Frameworks: HTML/CSS, React, Node.js, TypeScript\n• Databases: MySQL, PostgreSQL, MongoDB\n• Tools & soft skills: Git/GitHub, Agile/Scrum, problem solving, teamwork" },
    { id: "programming", q: ["what programming languages does he know"], k: ["programming", "languages", "python", "java", "javascript", "php", "c#", "code", "coding"],
      a: "He programs in Python, Java, JavaScript, PHP, and C#." },
    { id: "web", q: ["what web frameworks does he use", "does he know react"], k: ["web", "frontend", "front-end", "framework", "react", "node", "nodejs", "typescript", "html", "css", "full-stack", "fullstack"],
      a: "On the web side he works with HTML/CSS, React, Node.js, and TypeScript, and is aiming at full-stack system development." },
    { id: "databases", q: ["what databases does he use"], k: ["database", "databases", "sql", "mysql", "postgresql", "postgres", "mongodb", "data"],
      a: "He has worked with MySQL, PostgreSQL, and MongoDB." },
    { id: "tools", q: ["what tools does he use", "does he know git"], k: ["tools", "git", "github", "agile", "scrum", "teamwork", "soft", "problem solving"],
      a: "Tools & soft skills: Git/GitHub, Agile/Scrum, problem solving, and teamwork." },
    { id: "projects", q: ["what projects has he made", "show me his projects", "portfolio projects"], k: ["projects", "project", "portfolio", "built", "made", "developed", "work", "showcase"],
      a: "Two featured projects:\n1) BATRACEKO — a lost-and-found web app for BATRASCO Public (capstone, 2025–2026) using Google Cloud Vision API and Sørensen–Dice matching.\n2) Unix Guild Play-To-Earn website (2022–2023) — a web portal supporting aspiring Axie Infinity scholars.\nAsk me about either one for details!" },
    { id: "batraceko", q: ["what is batraceko", "tell me about the capstone", "lost and found app"], k: ["batraceko", "capstone", "lost", "found", "lost-and-found", "batrasco", "thesis"],
      a: "BATRACEKO is Lorenz's capstone (2025–2026): a lost-and-found web application for BATRASCO Public. It uses Google Cloud Vision API to recognize lost items from images and the Sørensen–Dice coefficient to match lost and found item descriptions. His role: UI/UX & developer. Stack: JavaScript, PHP/MySQL." },
    { id: "vision", q: ["how does the image recognition work", "what is google vision api"], k: ["vision", "google", "image", "recognition", "classification", "api", "cloud"],
      a: "In BATRACEKO, uploaded photos of items are analyzed with Google Cloud Vision API to identify what the item is, which helps automate classification and matching of lost and found reports." },
    { id: "dice", q: ["what is sorensen dice", "how does text matching work", "text similarity"], k: ["sorensen", "sørensen", "dice", "similarity", "matching", "coefficient", "text", "algorithm", "compare", "descriptions"],
      a: "The Sørensen–Dice coefficient measures how similar two pieces of text are (2 × shared elements ÷ total elements). BATRACEKO uses it to compare lost-item and found-item descriptions and surface likely matches." },
    { id: "unix", q: ["what is unix guild", "tell me about the play to earn website", "axie infinity"], k: ["unix", "guild", "axie", "infinity", "play", "earn", "p2e", "scholar", "scholars", "scholarship", "website"],
      a: "The Unix Guild Play-To-Earn website (2022–2023) was a team project where Lorenz helped design and develop a web portal for aspiring Axie Infinity scholars, giving accessible guild, scholarship, and community resources and connecting applicants with guild leadership. Stack: HTML/CSS, JavaScript, web design." },
    { id: "achievements", q: ["what are his achievements", "any awards", "honors"], k: ["achievements", "achievement", "award", "awards", "honors", "honor", "milestones", "recognition", "accomplishments"],
      a: "Highlights:\n🏆 Top Student in Information Assurance and Security 1 (DLSL)\n🚀 BATRACEKO system launch (2025–2026)\n📜 Cisco Networking Academy HTML Essentials & CSS Essentials certifications\n👥 Active JPCS member since 2023" },
    { id: "topstudent", q: ["what is the top student award"], k: ["top", "student", "information assurance", "iais", "security 1"],
      a: "Lorenz was named Top Student in Information Assurance and Security 1 at De La Salle Lipa, recognizing exceptional academic standing and mastery of security fundamentals." },
    { id: "certs", q: ["what certifications does he have", "any certificates"], k: ["certification", "certifications", "certificate", "certificates", "cisco", "networking academy", "credentials", "training", "essentials"],
      a: "He holds two Cisco Networking Academy certifications (September 2026):\n• HTML Essentials — semantic structure, accessibility, modern layouts\n• CSS Essentials — Flexbox, Grid, visual styling, responsive design" },
    { id: "experience", q: ["what experience does he have", "work experience", "jobs"], k: ["experience", "job", "jobs", "work", "worked", "volunteer", "employment", "history", "role", "roles"],
      a: "Experience:\n• Sentinels Marshall, YGG PH (March 2026) — verified attendance and coordinated meetings via Discord, Google Meet, Zoom\n• Team Leader, Unix Guild (Oct 2021–2022) — managed scholarship activities and coordinated members\n• Unix Promoter, Unix Guild (Oct 2022) — promoted the guild on Facebook, X, Instagram, and TikTok" },
    { id: "sentinels", q: ["what did he do at ygg ph", "sentinels marshall"], k: ["sentinels", "marshall", "ygg", "yield guild", "attendance"],
      a: "As a Sentinels Marshall at YGG PH (March 2026), Lorenz monitored and verified attendance at meetings and community activities, using Discord, Google Meet, and Zoom to coordinate with members." },
    { id: "teamlead", q: ["was he a team leader", "unix guild team leader"], k: ["team leader", "leader", "leadership", "lead", "manage", "managed", "qr"],
      a: "Lorenz was Team Leader at Unix Guild (Oct 2021–2022): he managed Axie Infinity scholarship-related activities, helped scholars with QR code access, and coordinated with members via Discord and Sky Mavis platforms." },
    { id: "promoter", q: ["what did the unix promoter do"], k: ["promoter", "promote", "promoted", "social", "media", "facebook", "twitter", "instagram", "tiktok", "marketing"],
      a: "As Unix Promoter (Oct 2022), he promoted Unix Guild on Facebook, X (Twitter), Instagram, and TikTok to share updates and grow community engagement." },
    { id: "jpcs", q: ["is he in any organization", "what is jpcs"], k: ["jpcs", "junior philippine computer society", "organization", "organizations", "org", "society", "member", "activities", "club"],
      a: "Lorenz has been a member of the Junior Philippine Computer Society (JPCS) since 2023. He supports planning and managing events and student activities, coordinates teams, and oversees event execution so tasks finish on time." },
    { id: "languages", q: ["what languages does he speak", "is he fluent in english"], k: ["speak", "spoken", "english", "filipino", "tagalog", "fluent", "language", "proficiency", "native"],
      a: "He speaks Filipino (native) and English (professional proficiency)." },
    { id: "internship", q: ["is he available for internship", "can i hire him", "is he looking for work"], k: ["internship", "intern", "hire", "hiring", "available", "availability", "opportunity", "opportunities", "looking", "open", "recruit", "job offer", "ojt"],
      a: "Yes! Lorenz is seeking an IT internship and web development opportunities where he can apply his technical, analytical, and problem-solving skills on real-world software projects. Reach him at biscocho.lorenz4@gmail.com or +63 906 045 7314." },
    { id: "contact", q: ["how can i contact him", "how do i reach lorenz"], k: ["contact", "reach", "connect", "touch", "message", "talk", "get in touch"],
      a: "You can reach Lorenz via:\n📧 biscocho.lorenz4@gmail.com\n📱 +63 906 045 7314\n🐙 https://github.com/LorenzAllen26\n💼 LinkedIn (see the link in the site header)\nOr use the contact form at the bottom of this page." },
    { id: "email", q: ["what is his email"], k: ["email", "e-mail", "gmail", "mail"],
      a: "His email is biscocho.lorenz4@gmail.com" },
    { id: "phone", q: ["what is his phone number"], k: ["phone", "number", "mobile", "call", "cellphone", "contact number", "text"],
      a: "His mobile number is +63 906 045 7314." },
    { id: "location", q: ["where is he from", "where does he live"], k: ["location", "live", "lives", "based", "address", "city", "from", "batangas", "mataasnakahoy", "philippines"],
      a: "Lorenz is based in Mataasnakahoy, Batangas, Philippines, and studies in Lipa City, Batangas." },
    { id: "github", q: ["what is his github"], k: ["github", "repo", "repository", "repositories", "source code", "git"],
      a: "His GitHub is https://github.com/LorenzAllen26" },
    { id: "linkedin", q: ["what is his linkedin"], k: ["linkedin", "network", "professional profile"],
      a: "You can find him on LinkedIn — use the LinkedIn icon in the site header or footer. https://www.linkedin.com/in/lorenz-allen-biscocho-82a962218/" },
    { id: "resume", q: ["where can i see his resume", "download cv"], k: ["resume", "cv", "curriculum", "vitae", "pdf", "download"],
      a: "Click “View Resume” in the top navigation to preview his resume (PDF) and download it from there." },
    { id: "thanks", q: ["thank you", "thanks"], k: ["thanks", "thank", "salamat", "appreciate"],
      a: "You're welcome! 😊 Anything else you'd like to know about Lorenz?" },
    { id: "bye", q: ["bye", "goodbye"], k: ["bye", "goodbye", "see", "later", "cya"],
      a: "Goodbye! Thanks for visiting Lorenz's portfolio. 👋" },
    { id: "bot", q: ["who made you", "how do you work", "are you ai"], k: ["bot", "chatbot", "ai", "made", "built", "created", "powered", "work", "lorenzbot"],
      a: "I'm LorenzBot, a lightweight chatbot built for this portfolio. I match your question against a knowledge base about Lorenz — so I only know what he's taught me!" }
  ];

  const SUGGESTIONS = ["Tell me about Lorenz", "What are his skills?", "Show his projects", "Is he available for internship?", "How can I contact him?"];
  const FALLBACKS = [
    "Hmm, I'm not sure about that yet. Try asking about Lorenz's education, skills, projects, certifications, experience, or contact details.",
    "I haven't learned that one yet! You can ask me about his projects, skills, or how to reach him.",
  ];

  /* ------------------------------------------------------------------ *
   * 2. STORAGE (learned answers + unanswered questions, per browser)
   * ------------------------------------------------------------------ */
  const LS_LEARNED = "lorenzbot_learned";
  const LS_UNANS = "lorenzbot_unanswered";
  const LS_TRAIN = "lorenzbot_train";
  const load = (key, dflt) => { try { return JSON.parse(localStorage.getItem(key)) || dflt; } catch (e) { return dflt; } };
  const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} };

  let learned = load(LS_LEARNED, []);
  let unanswered = load(LS_UNANS, []);

  /* ------------------------------------------------------------------ *
   * 3. MATCHING ENGINE
   * ------------------------------------------------------------------ */
  const STOP = new Set("a an the is are was were be been am do does did of for to in on at by with and or but if so as it its this that these those i you he she his her him they them we our your my me what whats which who whom how can could would should will shall may might about tell please any some there here from into up out has have had get got give show more also very just".split(" "));
  const stem = (w) => {
    if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
    if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
    if (w.length > 3 && w.endsWith("es")) return w.slice(0, -2);
    if (w.length > 3 && w.endsWith("s")) return w.slice(0, -1);
    return w;
  };
  const norm = (s) => s.toLowerCase().replace(/ø/g, "o").replace(/ä|å/g, "a");
  const tokens = (s) => norm(s).replace(/[^a-z0-9#+\s-]/g, " ").split(/\s+/).filter((w) => w && !STOP.has(w)).map(stem);

  function prepare(entry) {
    const kwPhrases = (entry.k || []).map(norm);
    const kwTokens = new Set(kwPhrases.flatMap((p) => tokens(p)));
    const qTokens = new Set((entry.q || []).flatMap((q) => tokens(q)));
    return { entry, kwPhrases, kwTokens, qTokens };
  }

  function buildIndex() {
    const learnedEntries = learned.map((l) => ({
      id: l.id, q: [l.q], k: (l.k || []).concat(tokens(l.q)), a: l.a, learned: true,
    }));
    return BASE_KB.concat(learnedEntries).map(prepare);
  }
  let index = buildIndex();

  function findAnswer(query) {
    const qn = norm(query);
    const qt = tokens(query);
    if (!qt.length) return null;
    let best = null, bestScore = 0;
    for (const p of index) {
      let score = 0;
      for (const t of qt) {
        if (p.kwTokens.has(t)) score += 3;
        else if (p.qTokens.has(t)) score += 1.5;
      }
      for (const ph of p.kwPhrases) if (ph.includes(" ") && qn.includes(ph)) score += 3;
      // normalise lightly so long entries don't always win
      score = score / Math.sqrt(1 + qt.length * 0.15);
      if (p.entry.learned) score += 0.5; // trained answers win ties
      if (score > bestScore) { bestScore = score; best = p.entry; }
    }
    return bestScore >= 2.5 ? best : null;
  }

  /* ------------------------------------------------------------------ *
   * 4. UI
   * ------------------------------------------------------------------ */
  const css = `
  .lb-fab{position:fixed;right:20px;bottom:20px;z-index:9998;width:60px;height:60px;border-radius:50%;border:0;cursor:pointer;
    background:linear-gradient(135deg,#22c55e,#38bdf8);color:#0b0f19;font-size:26px;box-shadow:0 10px 30px rgba(34,197,94,.35);transition:transform .2s}
  .lb-fab:hover{transform:scale(1.08)}
  .lb-win{position:fixed;right:20px;bottom:92px;z-index:9999;width:370px;max-width:calc(100vw - 24px);height:560px;max-height:calc(100vh - 110px);
    display:none;flex-direction:column;border-radius:18px;overflow:hidden;background:#0b0f19;color:#e5e7eb;border:1px solid rgba(255,255,255,.1);
    box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:Inter,system-ui,sans-serif;font-size:14px}
  .lb-win.lb-open{display:flex}
  .lb-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#111827;border-bottom:1px solid rgba(255,255,255,.08)}
  .lb-avatar{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#22c55e,#38bdf8);display:flex;align-items:center;justify-content:center;font-weight:700;color:#0b0f19;font-size:13px}
  .lb-title{font-weight:700;color:#fff;line-height:1.1}
  .lb-sub{font-size:11px;color:#4ade80;font-family:'Fira Code',monospace}
  .lb-spacer{flex:1}
  .lb-x{background:none;border:0;color:#9ca3af;font-size:20px;cursor:pointer}
  .lb-x:hover{color:#fff}
  .lb-tabs{display:none;background:#111827;border-bottom:1px solid rgba(255,255,255,.08)}
  .lb-tabs.lb-show{display:flex}
  .lb-tab{flex:1;padding:8px;background:none;border:0;color:#9ca3af;cursor:pointer;font-size:12px;font-family:'Fira Code',monospace}
  .lb-tab.lb-active{color:#4ade80;border-bottom:2px solid #22c55e}
  .lb-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
  .lb-body::-webkit-scrollbar{width:6px}.lb-body::-webkit-scrollbar-thumb{background:#1f2937;border-radius:3px}
  .lb-msg{max-width:86%;padding:9px 12px;border-radius:14px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}
  .lb-bot{background:#1f2937;border-bottom-left-radius:4px;align-self:flex-start}
  .lb-user{background:linear-gradient(135deg,#22c55e,#16a34a);color:#0b0f19;font-weight:500;border-bottom-right-radius:4px;align-self:flex-end}
  .lb-msg a{color:#38bdf8;text-decoration:underline}
  .lb-user a{color:#0b0f19}
  .lb-chips{display:flex;flex-wrap:wrap;gap:6px}
  .lb-chip{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);color:#4ade80;border-radius:999px;padding:5px 10px;font-size:12px;cursor:pointer}
  .lb-chip:hover{background:#22c55e;color:#0b0f19}
  .lb-typing span{display:inline-block;width:6px;height:6px;margin:0 2px;border-radius:50%;background:#9ca3af;animation:lbb 1s infinite}
  .lb-typing span:nth-child(2){animation-delay:.15s}.lb-typing span:nth-child(3){animation-delay:.3s}
  @keyframes lbb{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
  .lb-form{display:flex;gap:8px;padding:10px;border-top:1px solid rgba(255,255,255,.08);background:#111827}
  .lb-in,.lb-ta{flex:1;background:#0b0f19;border:1px solid #374151;border-radius:10px;color:#fff;padding:9px 11px;font:inherit;outline:none}
  .lb-in:focus,.lb-ta:focus{border-color:#22c55e}
  .lb-send,.lb-btn{background:linear-gradient(135deg,#22c55e,#16a34a);border:0;color:#0b0f19;font-weight:700;border-radius:10px;padding:0 14px;cursor:pointer}
  .lb-btn{padding:9px 14px}
  .lb-btn.lb-alt{background:#1f2937;color:#e5e7eb;font-weight:500}
  .lb-label{font-size:11px;color:#9ca3af;font-family:'Fira Code',monospace;margin:6px 0 3px;display:block}
  .lb-card{background:#111827;border:1px solid #1f2937;border-radius:10px;padding:9px 11px;font-size:12.5px}
  .lb-card b{color:#fff}
  .lb-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
  .lb-small{font-size:11px;color:#9ca3af}
  .lb-del{color:#f87171;cursor:pointer;background:none;border:0;font-size:12px}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  const fab = el("button", "lb-fab", "💬");
  fab.setAttribute("aria-label", "Open chat");
  const win = el("div", "lb-win");
  win.setAttribute("role", "dialog");

  // header
  const head = el("div", "lb-head");
  const avatar = el("div", "lb-avatar", "LB");
  const ttl = el("div"); ttl.append(el("div", "lb-title", "LorenzBot"), el("div", "lb-sub", "● ask me about Lorenz"));
  const closeBtn = el("button", "lb-x", "✕"); closeBtn.setAttribute("aria-label", "Close chat");
  head.append(avatar, ttl, el("div", "lb-spacer"), closeBtn);

  // tabs (trainer only)
  const tabs = el("div", "lb-tabs");
  const tabChat = el("button", "lb-tab lb-active", "CHAT");
  const tabTrain = el("button", "lb-tab", "TRAIN");
  tabs.append(tabChat, tabTrain);

  // chat view
  const chatBody = el("div", "lb-body");
  const chatForm = el("form", "lb-form");
  const chatInput = el("input", "lb-in"); chatInput.placeholder = "Ask about Lorenz…"; chatInput.autocomplete = "off";
  chatForm.append(chatInput, el("button", "lb-send", "Send"));

  // train view
  const trainBody = el("div", "lb-body"); trainBody.style.display = "none";

  win.append(head, tabs, chatBody, chatForm, trainBody);
  document.body.append(fab, win);

  function linkify(parent, text) {
    const re = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g;
    let last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) parent.append(document.createTextNode(text.slice(last, m.index)));
      const a = document.createElement("a");
      const val = m[0];
      a.href = val.includes("@") && !val.startsWith("http") ? "mailto:" + val : val;
      a.textContent = val; a.target = "_blank"; a.rel = "noopener noreferrer";
      parent.append(a);
      last = m.index + val.length;
    }
    if (last < text.length) parent.append(document.createTextNode(text.slice(last)));
  }

  function addMsg(text, who) {
    const m = el("div", "lb-msg " + (who === "user" ? "lb-user" : "lb-bot"));
    linkify(m, text);
    chatBody.append(m);
    chatBody.scrollTop = chatBody.scrollHeight;
    return m;
  }

  function addChips() {
    const wrap = el("div", "lb-chips");
    SUGGESTIONS.forEach((s) => {
      const c = el("button", "lb-chip", s);
      c.type = "button";
      c.onclick = () => { wrap.remove(); ask(s); };
      wrap.append(c);
    });
    chatBody.append(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function ask(text) {
    text = text.trim();
    if (!text) return;
    if (text.toLowerCase() === "/train") {
      localStorage.setItem(LS_TRAIN, "1");
      tabs.classList.add("lb-show");
      addMsg(text, "user");
      addMsg("Training mode unlocked ✅ Use the TRAIN tab to add answers, review unanswered questions, and export your knowledge.", "bot");
      return;
    }
    addMsg(text, "user");
    const typing = el("div", "lb-msg lb-bot lb-typing"); typing.innerHTML = "<span></span><span></span><span></span>";
    chatBody.append(typing); chatBody.scrollTop = chatBody.scrollHeight;
    setTimeout(() => {
      typing.remove();
      const hit = findAnswer(text);
      if (hit) {
        addMsg(hit.a, "bot");
      } else {
        addMsg(FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)], "bot");
        if (!unanswered.includes(text)) { unanswered.unshift(text); unanswered = unanswered.slice(0, 50); save(LS_UNANS, unanswered); renderTrain(); }
      }
    }, 450);
  }

  chatForm.addEventListener("submit", (e) => { e.preventDefault(); const v = chatInput.value; chatInput.value = ""; ask(v); });

  /* ---------------- TRAIN TAB ---------------- */
  let prefillQ = "";
  function renderTrain() {
    trainBody.innerHTML = "";

    const intro = el("div", "lb-small", "Teach LorenzBot new answers. Entries are saved in this browser. Export them and paste into BASE_KB in chatbot.js to make them permanent for everyone.");
    trainBody.append(intro);

    // add form
    const f = el("div", "lb-card");
    f.append(el("span", "lb-label", "QUESTION"));
    const qIn = el("input", "lb-in"); qIn.style.width = "100%"; qIn.placeholder = "e.g. Does he know Laravel?"; qIn.value = prefillQ; f.append(qIn);
    f.append(el("span", "lb-label", "KEYWORDS (comma-separated, optional)"));
    const kIn = el("input", "lb-in"); kIn.style.width = "100%"; kIn.placeholder = "laravel, php framework"; f.append(kIn);
    f.append(el("span", "lb-label", "ANSWER"));
    const aIn = el("textarea", "lb-ta"); aIn.rows = 3; aIn.style.width = "100%"; aIn.placeholder = "Type the answer the bot should give…"; f.append(aIn);
    const row = el("div", "lb-row");
    const addBtn = el("button", "lb-btn", "Save answer");
    const testBtn = el("button", "lb-btn lb-alt", "Test question");
    row.append(addBtn, testBtn); f.append(row);
    trainBody.append(f);

    addBtn.onclick = () => {
      const q = qIn.value.trim(), a = aIn.value.trim();
      if (!q || !a) { alert("Please enter both a question and an answer."); return; }
      learned.unshift({ id: "l" + Date.now(), q, a, k: kIn.value.split(",").map((s) => s.trim()).filter(Boolean) });
      save(LS_LEARNED, learned);
      unanswered = unanswered.filter((u) => u !== q); save(LS_UNANS, unanswered);
      index = buildIndex(); prefillQ = ""; renderTrain();
    };
    testBtn.onclick = () => {
      const q = qIn.value.trim(); if (!q) return;
      const hit = findAnswer(q);
      alert(hit ? "Bot would answer:\n\n" + hit.a : "No match yet — the bot wouldn't know this one.");
    };

    // unanswered
    trainBody.append(el("span", "lb-label", `UNANSWERED QUESTIONS (${unanswered.length})`));
    if (!unanswered.length) trainBody.append(el("div", "lb-small", "None yet. Questions the bot can't answer will show up here."));
    unanswered.forEach((u) => {
      const c = el("div", "lb-card"); c.append(el("div", null, u));
      const r = el("div", "lb-row");
      const ans = el("button", "lb-btn lb-alt", "Answer this"); ans.onclick = () => { prefillQ = u; renderTrain(); trainBody.scrollTop = 0; };
      const dis = el("button", "lb-del", "Dismiss"); dis.onclick = () => { unanswered = unanswered.filter((x) => x !== u); save(LS_UNANS, unanswered); renderTrain(); };
      r.append(ans, dis); c.append(r); trainBody.append(c);
    });

    // learned
    trainBody.append(el("span", "lb-label", `LEARNED ANSWERS (${learned.length})`));
    learned.forEach((l) => {
      const c = el("div", "lb-card");
      const b = el("b", null, l.q); c.append(b, el("div", "lb-small", l.a));
      const del = el("button", "lb-del", "Delete"); del.onclick = () => { learned = learned.filter((x) => x.id !== l.id); save(LS_LEARNED, learned); index = buildIndex(); renderTrain(); };
      c.append(del); trainBody.append(c);
    });

    // export / import
    const io = el("div", "lb-row");
    const exp = el("button", "lb-btn", "Export JSON");
    exp.onclick = () => {
      const blob = new Blob([JSON.stringify(learned.map((l) => ({ q: [l.q], k: l.k, a: l.a })), null, 2)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "lorenzbot-learned.json"; a.click();
    };
    const imp = el("button", "lb-btn lb-alt", "Import JSON");
    imp.onclick = () => {
      const inp = document.createElement("input"); inp.type = "file"; inp.accept = "application/json";
      inp.onchange = () => {
        const r = new FileReader();
        r.onload = () => {
          try {
            const arr = JSON.parse(r.result);
            arr.forEach((x) => learned.push({ id: "l" + Math.random().toString(36).slice(2), q: Array.isArray(x.q) ? x.q[0] : x.q, k: x.k || [], a: x.a }));
            save(LS_LEARNED, learned); index = buildIndex(); renderTrain();
          } catch (e) { alert("Invalid JSON file."); }
        };
        r.readAsText(inp.files[0]);
      };
      inp.click();
    };
    const clr = el("button", "lb-del", "Clear all learned");
    clr.onclick = () => { if (confirm("Delete all learned answers in this browser?")) { learned = []; save(LS_LEARNED, learned); index = buildIndex(); renderTrain(); } };
    io.append(exp, imp, clr); trainBody.append(io);
  }

  function showTab(which) {
    const isChat = which === "chat";
    chatBody.style.display = isChat ? "flex" : "none";
    chatForm.style.display = isChat ? "flex" : "none";
    trainBody.style.display = isChat ? "none" : "flex";
    tabChat.classList.toggle("lb-active", isChat);
    tabTrain.classList.toggle("lb-active", !isChat);
    if (!isChat) renderTrain();
  }
  tabChat.onclick = () => showTab("chat");
  tabTrain.onclick = () => showTab("train");

  /* ---------------- open / close ---------------- */
  let greeted = false;
  function toggle(open) {
    win.classList.toggle("lb-open", open);
    fab.textContent = open ? "✕" : "💬";
    if (open && !greeted) {
      greeted = true;
      addMsg("Hi! 👋 I'm LorenzBot. Ask me anything about Lorenz's education, skills, projects, or how to hire him.", "bot");
      addChips();
    }
    if (open) setTimeout(() => chatInput.focus(), 50);
  }
  fab.onclick = () => toggle(!win.classList.contains("lb-open"));
  closeBtn.onclick = () => toggle(false);

  // reveal trainer tab
  if (/[?&]train(=1)?\b/.test(location.search) || localStorage.getItem(LS_TRAIN) === "1") {
    try { localStorage.setItem(LS_TRAIN, "1"); } catch (e) {}
    tabs.classList.add("lb-show");
  }
})();
