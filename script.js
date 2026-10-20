// =====================================================================
//  script.js — 사이트가 움직이는 방식 (보통은 고칠 필요 없어요)
//  내용(질문, 대사, 문구)은 한국어판 data.js, 영어판 data_en.js 에 있어요.
//  한국어판은 index.html, 영어판은 en/index.html (주소 끝 /en/)
// =====================================================================

const AXIS_KEYS = ["conscience", "action", "desire", "luck"];

// 그림 등 파일 위치 기준 (en/index.html 은 한 칸 위 폴더를 봐야 해서 "../")
const ASSET_BASE = window.ASSET_BASE || "";

// 언어별 내용 묶음 (페이지에 불러온 데이터 파일만 들어가요)
const LANG_DATA = {};
if (typeof TEXTS !== "undefined") LANG_DATA.ko = { TEXTS, AXES, QUESTIONS, CHARACTERS, imageDir: ASSET_BASE + "images/" };
if (typeof EN !== "undefined") LANG_DATA.en = { ...EN, imageDir: ASSET_BASE + "images/en/" };
let lang, D;   // 지금 쓰는 언어와 그 내용
function setLang(l) {
  lang = LANG_DATA[l] ? l : Object.keys(LANG_DATA)[0];
  D = LANG_DATA[lang];
}
// 페이지 언어는 <html lang="ko"> / <html lang="en"> 으로 정해져요
setLang(document.documentElement.lang);

// ---------------------------------------------------------------------
//  점수 계산 (test.html 에서도 같은 함수를 써요)
// ---------------------------------------------------------------------

// 고른 답들 [{ axis, score }, ...] → 축별 점수 (-2 ~ +2)
function computeAxes(picks) {
  const sum = {}, count = {};
  AXIS_KEYS.forEach((k) => { sum[k] = 0; count[k] = 0; });
  picks.forEach((p) => {
    sum[p.axis] += p.score;
    count[p.axis] += 1;
  });
  // 축별 평균 × 2 를 -2 ~ +2 로 잘라서(clamp) 사용
  // (그냥 3으로 나누면 대부분 0 근처로 몰려서 '평범한 시민'만 자주 나옴)
  const result = {};
  AXIS_KEYS.forEach((k) => {
    const avg = count[k] ? sum[k] / count[k] : 0;
    result[k] = Math.max(-2, Math.min(2, avg * 2));
  });
  return result;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 이번 판 문제 만들기: 축마다 3문제씩 랜덤 → 축이 번갈아 나오게 배치 → 선택지 순서도 섞기
const PER_AXIS = 3;
function buildQuiz() {
  const pools = {};
  AXIS_KEYS.forEach((k) => {
    pools[k] = shuffle(D.QUESTIONS.filter((q) => q.axis === k)).slice(0, PER_AXIS);
  });
  const quiz = [];
  for (let round = 0; round < PER_AXIS; round++) {
    let order = shuffle(AXIS_KEYS);
    // 라운드가 바뀌는 곳에서 같은 축이 두 번 연속 나오지 않게
    if (quiz.length && order[0] === quiz[quiz.length - 1].axis) order.push(order.shift());
    order.forEach((k) => {
      const q = pools[k][round];
      if (q) quiz.push({ axis: q.axis, q: q.q, options: shuffle(q.options) });
    });
  }
  return quiz;
}

// 축별 점수 → 가장 가까운 캐릭터
// bias: 캐릭터별 쏠림 보정값 (거리에 더해짐. 영어판만 있고, 없으면 0)
function findCharacter(user) {
  let best = null, bestDist = Infinity, bestExtreme = -1;
  D.CHARACTERS.forEach((c) => {
    let dist = c.bias || 0, extreme = 0;
    AXIS_KEYS.forEach((k) => {
      const d = user[k] - c.scores[k];
      dist += d * d;
      // 동점 처리용: 캐릭터의 극단 축(±2)과 내 점수(반올림)가 일치하는 개수
      if (Math.abs(c.scores[k]) === 2 && Math.round(user[k]) === c.scores[k]) extreme++;
    });
    const closer = dist < bestDist - 1e-9;
    const tie = Math.abs(dist - bestDist) < 1e-9;
    if (closer || (tie && extreme > bestExtreme)) {
      best = c; bestDist = dist; bestExtreme = extreme;
    }
  });
  return best;
}

function getCharacter(id) {
  return D.CHARACTERS.find((c) => c.id === id);
}

// test.html 에서 쓸 수 있게 내보내기
window.PastLife = { computeAxes, findCharacter, getCharacter, buildQuiz, AXIS_KEYS, setLang, data: () => D };


// ---------------------------------------------------------------------
//  화면 동작 (index.html 에서만 실행)
// ---------------------------------------------------------------------
if (document.getElementById("app")) {

  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // 구글 애널리틱스 이벤트 기록 (광고 차단 등으로 gtag 가 없거나 오류가 나도 사이트는 계속 작동)
  // 모든 이벤트에 language(ko/en) 를 같이 보내요
  function track(name, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, Object.assign({ language: lang, site_language: lang }, params));
      }
    } catch (err) { /* 기록 실패는 무시 */ }
  }

  let current = 0;
  let quiz = [];      // 이번 판에 뽑힌 12문제
  let answers = [];   // 고른 답 [{ axis, score }, ...]
  let busy = false;
  let lastKibitz = "";
  let shareText = "";
  let resultChar = null;  // 이번 결과 캐릭터 (공유 이벤트 기록용)
  let typingTimer = null;
  let typingFull = "";

  // ---------- 캐릭터 그림 (없으면 "작가가 아직 안 그림ㅋ") ----------
  function makePortrait(c, small) {
    const box = document.createElement("div");
    box.className = "portrait" + (small ? " small" : "");
    const img = document.createElement("img");
    img.src = D.imageDir + c.id + ".png";
    img.alt = c.name;
    img.onerror = () => {
      box.innerHTML = "";
      box.classList.add("empty");
      const emoji = document.createElement("span");
      emoji.className = "ph-emoji";
      emoji.textContent = c.emoji;
      box.appendChild(emoji);
      if (!small) {
        const t = document.createElement("span");
        t.className = "ph-text";
        t.textContent = D.TEXTS.noImage;
        box.appendChild(t);
      }
    };
    box.appendChild(img);
    return box;
  }

  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
    $(id).classList.remove("hidden");
    window.scrollTo(0, 0);
  }

  // ---------- 언어 (한국어 / English) ----------
  // 위쪽 버튼은 그냥 링크라서 누르면 다른 언어판 주소로 이동해요 (index.html, en/index.html 에 있음)
  function applyTexts() {
    $("info-job-title").textContent = D.TEXTS.jobTitle;
    $("info-money-title").textContent = D.TEXTS.moneyTitle;
    $("info-day-title").textContent = D.TEXTS.dayTitle;
    $("info-danger-title").textContent = D.TEXTS.dangerTitle;
    $("footer").textContent = D.TEXTS.footer;
  }

  document.querySelectorAll("a.lang-btn:not(.active), #en-hint a").forEach((a) => {
    a.addEventListener("click", () => track("language_switch", { to: a.getAttribute("hreflang") }));
  });

  // 한국어판에 브라우저 언어가 한국어가 아닌 사람이 오면 "English version →" 안내만 띄우기 (자동 이동 X)
  const hint = $("en-hint");
  if (hint) {
    const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""])
      .map((l) => String(l).toLowerCase());
    let closed = false;
    try { closed = sessionStorage.getItem("enHintClosed") === "1"; } catch (err) { /* 무시 */ }
    if (!closed && !langs.some((l) => l.startsWith("ko"))) hint.classList.remove("hidden");
    $("en-hint-close").addEventListener("click", () => {
      hint.classList.add("hidden");
      try { sessionStorage.setItem("enHintClosed", "1"); } catch (err) { /* 무시 */ }
    });
  }

  // ---------- 시작 화면 ----------
  function setupStart() {
    document.title = D.TEXTS.title + " — " + D.TEXTS.subtitle;
    $("title").textContent = D.TEXTS.title;
    $("subtitle").textContent = D.TEXTS.subtitle;
    $("intro").textContent = D.TEXTS.intro;
    $("start-btn").textContent = D.TEXTS.startButton;

    // 캐릭터 5명을 랜덤으로 골라 비뚤게 모아 두기
    const collage = $("collage");
    collage.innerHTML = "";
    const shuffled = [...D.CHARACTERS].sort(() => Math.random() - 0.5).slice(0, 5);
    shuffled.forEach((c, i) => {
      const p = makePortrait(c, true);
      p.classList.add("collage-item", "pos" + i);
      collage.appendChild(p);
    });
  }

  $("start-btn").addEventListener("click", () => {
    track("test_start");
    startQuiz();
  });

  // ---------- 질문 화면 ----------
  function startQuiz() {
    current = 0;
    quiz = buildQuiz();
    answers = [];
    busy = false;
    showScreen("screen-quiz");
    showQuestion();
  }

  // "**굵게**" 표시를 <strong> 으로 바꿔서 넣기
  function setRichText(el, text) {
    el.innerHTML = "";
    text.split("**").forEach((part, i) => {
      const node = i % 2 ? document.createElement("strong") : document.createTextNode(part);
      if (i % 2) node.textContent = part;
      el.appendChild(node);
    });
  }

  function showQuestion() {
    const q = quiz[current];
    const total = quiz.length;
    const notice = $("luck-notice");
    if (q.axis === "luck") setRichText(notice, D.TEXTS.luckNotice);
    notice.classList.toggle("hidden", q.axis !== "luck");
    $("progress-fill").style.width = (current / total) * 100 + "%";
    $("progress-count").textContent = `${current + 1} / ${total}`;
    $("progress-comment").textContent = D.TEXTS.progressComments[current] || "";
    $("question-num").textContent = "Q" + (current + 1);
    $("question-text").textContent = q.q;

    const box = $("options");
    box.innerHTML = "";
    q.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = "option";
      b.style.setProperty("--tilt", (Math.random() * 2.4 - 1.2).toFixed(2) + "deg");
      b.innerHTML = `<span class="opt-num">${"①②③④"[i]}</span><span></span>`;
      b.lastChild.textContent = opt.text;
      b.onclick = () => choose(opt, b);
      box.appendChild(b);
    });

    const card = $("quiz-card");
    card.classList.remove("pop");
    void card.offsetWidth;
    card.classList.add("pop");
  }

  async function choose(opt, btn) {
    if (busy) return;
    busy = true;
    answers[current] = { axis: quiz[current].axis, score: opt.score };
    btn.classList.add("picked");
    showKibitz();
    await wait(550);
    current++;
    busy = false;
    if (current < quiz.length) showQuestion();
    else startLoading();
  }

  // 구석에서 튀어나오는 훈수
  let kibitzTimer = null;
  function showKibitz() {
    let line;
    do { line = pick(D.TEXTS.kibitz); } while (line === lastKibitz && D.TEXTS.kibitz.length > 1);
    lastKibitz = line;
    $("kibitz-text").textContent = line;
    const k = $("kibitz");
    k.classList.remove("show");
    void k.offsetWidth;
    k.classList.add("show");
    clearTimeout(kibitzTimer);
    kibitzTimer = setTimeout(() => k.classList.remove("show"), 1600);
  }

  // ---------- 로딩 화면 (99%에서 멈칫) ----------
  async function startLoading() {
    $("kibitz").classList.remove("show");
    showScreen("screen-loading");
    $("loading-text").textContent = pick(D.TEXTS.loading);
    const fill = $("loading-fill"), pct = $("loading-pct");
    for (let p = 0; p <= 99; p += 3) {
      fill.style.width = p + "%";
      pct.textContent = p + "%";
      await wait(45);
    }
    fill.style.width = "99%";
    pct.textContent = "99%";
    $("loading-text").textContent = D.TEXTS.loadingStuck;
    await wait(1400);
    fill.style.width = "100%";
    pct.textContent = "100%";
    await wait(350);
    showResult();
  }

  // ---------- 결과 화면 ----------
  function showResult() {
    const user = computeAxes(answers);
    const c = findCharacter(user);
    resultChar = c;
    track("test_complete", {
      character: c.id, era: c.era,
      conscience_score: +user.conscience.toFixed(2),
      action_score: +user.action.toFixed(2),
      desire_score: +user.desire.toFixed(2),
      luck_score: +user.luck.toFixed(2)
    });
    const match = getCharacter(c.match.id);
    const enemy = getCharacter(c.enemy.id);

    $("result-label").textContent = D.TEXTS.resultLabel;
    $("result-era").textContent = c.era;
    $("result-name").textContent = c.name;
    $("result-signature").textContent = "“" + c.signature + "”";

    const pw = $("result-portrait");
    pw.innerHTML = "";
    pw.appendChild(makePortrait(c, false));

    $("info-job").textContent = c.job;
    $("info-money").textContent = c.money;
    $("info-money-now").textContent = "👉 " + c.moneyNow;
    $("info-day").textContent = c.day;
    $("info-danger").textContent = stars(c.danger);
    $("info-danger-note").textContent = c.dangerNote || "";

    $("history-title").textContent = D.TEXTS.historyTitle;
    $("history-text").textContent = c.history;

    fillRelation("match", D.TEXTS.matchTitle, match, c.match.why);
    fillRelation("enemy", D.TEXTS.enemyTitle, enemy, c.enemy.why);

    $("chart-title").textContent = D.TEXTS.chartTitle;
    drawChart(user);

    $("share-btn").textContent = D.TEXTS.shareButton;
    $("retry-btn").textContent = D.TEXTS.retryButton;

    shareText =
      `🔮 ${D.TEXTS.title} — ${D.TEXTS.subtitle}\n\n` +
      `${D.TEXTS.shareMyResult}: [${c.era}] ${c.name}\n` +
      `"${c.signature}"\n` +
      `${D.TEXTS.shareDanger}: ${stars(c.danger)}\n` +
      `🤝 ${D.TEXTS.shareMatch}: ${match ? match.name : "-"}\n` +
      `⚔️ ${D.TEXTS.shareEnemy}: ${enemy ? enemy.name : "-"}\n\n` +
      D.TEXTS.shareEnding;
    // 인터넷에 올라간 사이트에서 하면 사이트 주소도 같이 복사 (내 컴퓨터에서 파일로 열면 생략)
    // 한국어판은 지금 주소, 영어판은 /en/ 주소가 복사돼요
    if (location.protocol.startsWith("http")) {
      shareText += "\n👉 " + location.origin + location.pathname.replace(/index\.html$/, "");
    }

    showScreen("screen-result");
    typeText(c.intro);
  }

  function stars(n) {
    return "★".repeat(n) + "☆".repeat(5 - n);
  }

  function fillRelation(kind, title, other, why) {
    const box = $(kind + "-box");
    box.innerHTML = "";
    if (!other) return;
    const h = document.createElement("p");
    h.className = "rel-title";
    h.textContent = title;
    const row = document.createElement("div");
    row.className = "rel-row";
    const txt = document.createElement("div");
    txt.innerHTML = `<p class="rel-era"></p><p class="rel-name"></p><p class="rel-why"></p>`;
    txt.children[0].textContent = other.era;
    txt.children[1].textContent = other.name;
    txt.children[2].textContent = why;
    row.appendChild(makePortrait(other, true));
    row.appendChild(txt);
    box.appendChild(h);
    box.appendChild(row);
  }

  // 성향 4축 막대 그래프
  function drawChart(user) {
    const chart = $("chart");
    chart.innerHTML = "";
    AXIS_KEYS.forEach((k, i) => {
      const v = user[k];
      const ax = D.AXES[k];
      const row = document.createElement("div");
      row.className = "axis";
      row.innerHTML = `
        <div class="axis-head"><span class="axis-name"></span><span class="axis-val"></span></div>
        <div class="axis-track" style="--tilt:${i % 2 ? 0.6 : -0.6}deg">
          <div class="axis-mid"></div>
          <div class="axis-bar ${v >= 0 ? "pos" : "neg"}"></div>
        </div>
        <div class="axis-ends"><span></span><span></span></div>`;
      row.querySelector(".axis-name").textContent = ax.name;
      row.querySelector(".axis-val").textContent = (v > 0 ? "+" : "") + v.toFixed(1);
      row.querySelector(".axis-ends").children[0].textContent = "◀ " + ax.left;
      row.querySelector(".axis-ends").children[1].textContent = ax.right + " ▶";
      const bar = row.querySelector(".axis-bar");
      const width = (Math.abs(v) / 2) * 50; // 한쪽 절반이 최대
      bar.style.width = "0%";
      if (v >= 0) bar.style.left = "50%";
      else bar.style.right = "50%";
      chart.appendChild(row);
      setTimeout(() => { bar.style.width = width + "%"; }, reduceMotion ? 0 : 200 + i * 150);
    });
  }

  // 타자기 효과 (화면 누르면 바로 전체 표시)
  function typeText(text) {
    clearInterval(typingTimer);
    typingFull = text;
    const el = $("bubble-text");
    $("bubble-skip").textContent = D.TEXTS.tapToSkip;
    $("bubble-skip").classList.remove("hidden");
    if (reduceMotion) { finishTyping(); return; }
    el.textContent = "";
    let i = 0;
    typingTimer = setInterval(() => {
      i++;
      el.textContent = text.slice(0, i);
      if (i >= text.length) finishTyping();
    }, 40);
  }
  function finishTyping() {
    clearInterval(typingTimer);
    typingTimer = null;
    $("bubble-text").textContent = typingFull;
    $("bubble-skip").classList.add("hidden");
  }
  $("screen-result").addEventListener("click", () => { if (typingTimer) finishTyping(); });

  // ---------- 공유 / 다시 하기 ----------
  $("share-btn").onclick = (e) => {
    e.stopPropagation();
    track("share_click", { character: resultChar ? resultChar.id : "" });
    copyText(shareText).then(() => toast(D.TEXTS.copied))
      .catch(() => alert(D.TEXTS.copyFailed + "\n\n" + shareText));
  };

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    }
    return legacyCopy(text);
  }
  function legacyCopy(text) {
    return new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
  }

  $("retry-btn").onclick = (e) => {
    e.stopPropagation();
    track("retry_click");
    setupStart();
    showScreen("screen-start");
  };

  applyTexts();
  setupStart();
}
