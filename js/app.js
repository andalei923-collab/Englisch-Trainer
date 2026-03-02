/* ================================================================
   DATA  (werden per buildDataForDifficulty() neu befüllt)
   ================================================================ */
var VERBS      = DATA_EASY.VERBS;
var SENTENCES  = DATA_EASY.SENTENCES;
var VOCAB      = DATA_EASY.VOCAB;
var PRONOUNS   = DATA_EASY.PRONOUNS;
var GRAMMAR_QS = DATA_EASY.GRAMMAR_QS;
var EXAM_QS    = DATA_EASY.EXAM_QS;

/* ================================================================
   DIFFICULTY  –  Konstanten
   ================================================================ */
var DIFF_TIME = { 1: 0,  2: 15, 3: 10, 4: 8 }; /* Sekunden pro Frage (0 = kein Timer) */
var DIFF_OPTS = { 1: 4,  2: 4,  3: 6,  4: 8 }; /* Antwortmöglichkeiten */
var DIFF_KEY  = 'engDiff_v1';

/* ================================================================
   STATE
   ================================================================ */
var S = {
  mode:       null,
  submode:    null,
  q:          0,
  total:      20,
  correct:    0,
  wrong:      0,
  streak:     0,
  bestStreak: 0,
  items:      [],
  answered:   false,
  sound:      true,
  chosen:     [],
  bankItems:  [],
  m3deToEn:   true,
  difficulty: 1
};

/* ================================================================
   AUDIO  (Web Audio API – keine externen Dateien)
   ================================================================ */
var _ctx = null;
function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  return _ctx;
}

function playOk() {
  if (!S.sound) return;
  var c = getCtx(), t = c.currentTime;
  var osc  = c.createOscillator();
  var gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(523, t);
  osc.frequency.setValueAtTime(659, t + 0.1);
  osc.frequency.setValueAtTime(784, t + 0.2);
  gain.gain.setValueAtTime(0.28, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
  osc.start(t); osc.stop(t + 0.55);
}

function playErr() {
  if (!S.sound) return;
  var c = getCtx(), t = c.currentTime;
  var osc  = c.createOscillator();
  var gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(80, t + 0.32);
  gain.gain.setValueAtTime(0.18, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
  osc.start(t); osc.stop(t + 0.38);
}

function toggleSound() {
  S.sound = !S.sound;
  document.getElementById('sndBtn').textContent = S.sound ? '\uD83D\uDD0A' : '\uD83D\uDD07';
}

/* ================================================================
   LOCAL STORAGE
   ================================================================ */
var STORE_KEY = 'engTrainer_v1';

function loadStore() {
  try {
    var raw = localStorage.getItem(STORE_KEY);
    var d   = raw ? JSON.parse(raw) : defStore();
    /* Migration: altes Boolean-Feld hard100 → Array hard100Modes */
    if (!Array.isArray(d.hard100Modes)) {
      d.hard100Modes = (d.hard100 === true) ? [1, 2, 3] : [];
    }
    /* Migration: altes flaches hs {m: null/zahl} → verschachteltes {m: {1..4: null}} */
    if (!d.hs) d.hs = {};
    for (var _m = 1; _m <= 7; _m++) {
      if (d.hs[_m] === null || typeof d.hs[_m] !== 'object') {
        d.hs[_m] = { 1: null, 2: null, 3: null, 4: null };
      }
    }
    return d;
  } catch (e) { return defStore(); }
}

function defStore() {
  var hs = {};
  for (var _m = 1; _m <= 7; _m++) { hs[_m] = { 1: null, 2: null, 3: null, 4: null }; }
  return { total: 0, correct: 0, bestStreak: 0, hs: hs, hard100Modes: [] };
}

/* Freischaltbedingung Meister: 100 % in ≥ 3 verschiedenen Modi auf Stufe 3 */
function isMasterUnlocked(d) {
  return Array.isArray(d.hard100Modes) && d.hard100Modes.length >= 3;
}

/* Highscore für aktuellen Modus + Schwierigkeit lesen */
function hsVal(d, m) {
  var h = d.hs && d.hs[m];
  if (!h || typeof h !== 'object') return null;
  var v = h[S.difficulty];
  return (v !== undefined && v !== null) ? v : null;
}

function saveStore(d) {
  localStorage.setItem(STORE_KEY, JSON.stringify(d));
}

/* ================================================================
   NAVIGATION
   ================================================================ */
function show(id) {
  var screens = document.querySelectorAll('.screen');
  for (var i = 0; i < screens.length; i++) screens[i].classList.remove('active');
  document.getElementById(id).classList.add('active');
  document.getElementById('backBtn').style.display = (id === 's-menu') ? 'none' : 'inline-block';
  if (id === 's-menu') { stopTimer(); setProgress(0); refreshMenu(); }
}

function goMenu()  { S.mode = null; show('s-menu'); }
function goStats() { refreshStats(); show('s-stats'); }

function setProgress(frac) {
  document.getElementById('prog-bar').style.width = (frac * 100) + '%';
}

function updateHeader() {
  document.getElementById('hCorrect').textContent    = S.correct;
  document.getElementById('hWrong').textContent      = S.wrong;
  document.getElementById('streakBadge').textContent = '\uD83D\uDD25 ' + S.streak;
}

/* ================================================================
   MENU / STATS REFRESH
   ================================================================ */
var HS_MAX = { 1: 20, 2: 20, 3: 20, 4: 20, 5: 20, 6: 20, 7: 20 };

function refreshMenu() {
  var d   = loadStore();
  var acc = d.total > 0 ? Math.round(d.correct / d.total * 100) : 0;
  document.getElementById('m-total').textContent = d.total;
  document.getElementById('m-acc').textContent   = acc + '%';
  document.getElementById('m-best').textContent  = d.bestStreak;
  for (var _i = 1; _i <= 7; _i++) {
    var _v = hsVal(d, _i);
    document.getElementById('hs' + _i).textContent = _v !== null ? _v + '/' + HS_MAX[_i] : '\u2014';
  }
  renderDiffPicker();
}

function refreshStats() {
  var d   = loadStore();
  var acc = d.total > 0 ? Math.round(d.correct / d.total * 100) : 0;
  document.getElementById('st-total').textContent = d.total;
  document.getElementById('st-cor').textContent   = d.correct;
  document.getElementById('st-acc').textContent   = acc + '%';
  document.getElementById('st-str').textContent   = d.bestStreak;
  var _diffNames = { 1: 'Leicht', 2: 'Mittel', 3: 'Schwer', 4: 'Meister' };
  var _hsHead = document.getElementById('st-hs-head');
  if (_hsHead) _hsHead.textContent = 'Highscores \u2013 ' + _diffNames[S.difficulty];
  for (var _i = 1; _i <= 7; _i++) {
    var _v = hsVal(d, _i);
    document.getElementById('st-hs' + _i).textContent = _v !== null ? _v + '/' + HS_MAX[_i] : '\u2014';
  }
}

function resetStats() {
  if (!confirm('Alle Statistiken wirklich zur\u00fccksetzen?')) return;
  localStorage.removeItem(STORE_KEY);
  refreshMenu(); refreshStats();
}

/* ================================================================
   ROUND HELPERS
   ================================================================ */
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j   = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function onCorrect() {
  S.correct++; S.streak++;
  if (S.streak > S.bestStreak) S.bestStreak = S.streak;
  updateHeader();
  setProgress((S.q + 1) / S.total);
  playOk();
}

function onWrong() {
  S.wrong++; S.streak = 0;
  updateHeader();
  setProgress((S.q + 1) / S.total);
  playErr();
}

function nextQ() {
  S.q++;
  S.answered = false;
  if (S.q >= S.total) { endRound(); return; }
  if (S.mode === 1) loadM1();
  if (S.mode === 2) loadM2();
  if (S.mode === 3) loadM3();
  if (S.mode === 4) loadM4();
  if (S.mode === 5) loadM5();
  if (S.mode === 6) loadM6();
  if (S.mode === 7) loadM7();
}

function endRound() {
  stopTimer();
  var pct = Math.round(S.correct / S.total * 100);
  var d   = loadStore();
  d.total   += S.total;
  d.correct += S.correct;
  if (S.bestStreak > d.bestStreak) d.bestStreak = S.bestStreak;
  var _diff = S.difficulty;
  if (!d.hs[S.mode] || typeof d.hs[S.mode] !== 'object') d.hs[S.mode] = { 1: null, 2: null, 3: null, 4: null };
  if (d.hs[S.mode][_diff] === null || S.correct > d.hs[S.mode][_diff]) d.hs[S.mode][_diff] = S.correct;

  /* Meister freischalten: 100 % in ≥ 3 verschiedenen Modi auf Stufe 3 */
  if (S.difficulty === 3 && pct >= 100) {
    if (!Array.isArray(d.hard100Modes)) d.hard100Modes = [];
    var _wasUnlocked = d.hard100Modes.length >= 3;
    if (d.hard100Modes.indexOf(S.mode) === -1) d.hard100Modes.push(S.mode);
    if (!_wasUnlocked && d.hard100Modes.length >= 3) {
      setTimeout(function() {
        alert('\uD83C\uDFC6 Meister freigeschaltet! Du hast 100\u202F% in 3 Bereichen auf Stufe\u202F3 erreicht.');
      }, 400);
    }
  }
  saveStore(d);

  var el = document.getElementById('r-pct');
  el.textContent = pct + '%';
  el.className   = 'res-pct ' + (pct >= 80 ? 'ex' : pct >= 50 ? 'ok' : 'lo');

  var msgs = {
    ex: ['Ausgezeichnet! \u2B50', 'Fantastisch! \uD83C\uDF89', 'Perfekt! \uD83C\uDFC6'],
    ok: ['Gut gemacht! \uD83D\uDC4D', 'Weiter so! \uD83D\uDCAA', 'Nicht schlecht! \uD83D\uDE0A'],
    lo: ['Weitermachen! \uD83C\uDFAF', '\u00DCbung macht den Meister! \uD83D\uDCDA', 'Du schaffst das! \uD83D\uDCAB']
  };
  var cat = pct >= 80 ? 'ex' : pct >= 50 ? 'ok' : 'lo';
  document.getElementById('r-msg').textContent = msgs[cat][Math.floor(Math.random() * 3)];
  document.getElementById('r-cor').textContent = S.correct;
  document.getElementById('r-wrg').textContent = S.wrong;
  setProgress(1);
  show('s-results');
}

/* ================================================================
   DIFFICULTY – Datenmix & UI
   ================================================================ */
function buildDataForDifficulty() {
  var d = S.difficulty;
  VERBS      = DATA_EASY.VERBS.slice();
  SENTENCES  = DATA_EASY.SENTENCES.slice();
  VOCAB      = DATA_EASY.VOCAB.slice();
  PRONOUNS   = DATA_EASY.PRONOUNS.slice();
  GRAMMAR_QS = DATA_EASY.GRAMMAR_QS.slice();
  EXAM_QS    = DATA_EASY.EXAM_QS.slice();

  if (d >= 2 && typeof DATA_MEDIUM !== 'undefined') {
    VERBS      = VERBS.concat(DATA_MEDIUM.VERBS      || []);
    SENTENCES  = SENTENCES.concat(DATA_MEDIUM.SENTENCES || []);
    VOCAB      = VOCAB.concat(DATA_MEDIUM.VOCAB      || []);
    PRONOUNS   = PRONOUNS.concat(DATA_MEDIUM.PRONOUNS  || []);
    GRAMMAR_QS = GRAMMAR_QS.concat(DATA_MEDIUM.GRAMMAR_QS || []);
    EXAM_QS    = EXAM_QS.concat(DATA_MEDIUM.EXAM_QS    || []);
  }
  if (d >= 3 && typeof DATA_HARD !== 'undefined') {
    VERBS      = VERBS.concat(DATA_HARD.VERBS      || []);
    SENTENCES  = SENTENCES.concat(DATA_HARD.SENTENCES  || []);
    VOCAB      = VOCAB.concat(DATA_HARD.VOCAB      || []);
    PRONOUNS   = PRONOUNS.concat(DATA_HARD.PRONOUNS   || []);
    GRAMMAR_QS = GRAMMAR_QS.concat(DATA_HARD.GRAMMAR_QS  || []);
    EXAM_QS    = EXAM_QS.concat(DATA_HARD.EXAM_QS    || []);
  }
  if (d >= 4 && typeof DATA_MASTER !== 'undefined') {
    VERBS      = VERBS.concat(DATA_MASTER.VERBS      || []);
    SENTENCES  = SENTENCES.concat(DATA_MASTER.SENTENCES || []);
    VOCAB      = VOCAB.concat(DATA_MASTER.VOCAB      || []);
    PRONOUNS   = PRONOUNS.concat(DATA_MASTER.PRONOUNS  || []);
    GRAMMAR_QS = GRAMMAR_QS.concat(DATA_MASTER.GRAMMAR_QS || []);
    EXAM_QS    = EXAM_QS.concat(DATA_MASTER.EXAM_QS    || []);
  }
}

function loadDifficulty() {
  var saved = parseInt(localStorage.getItem(DIFF_KEY), 10);
  S.difficulty = (saved >= 1 && saved <= 4) ? saved : 1;
  if (S.difficulty === 4) {
    var st = loadStore();
    if (!isMasterUnlocked(st)) S.difficulty = 1;
  }
  buildDataForDifficulty();
}

function setDifficulty(n) {
  if (n === 4) {
    var st = loadStore();
    if (!isMasterUnlocked(st)) {
      var el = document.getElementById('dc4');
      if (el) {
        el.classList.add('shake');
        setTimeout(function() { el.classList.remove('shake'); }, 450);
      }
      return;
    }
  }
  S.difficulty = n;
  localStorage.setItem(DIFF_KEY, n);
  buildDataForDifficulty();
  refreshMenu();
}

function renderDiffPicker() {
  var st = loadStore();
  for (var i = 1; i <= 4; i++) {
    var el = document.getElementById('dc' + i);
    if (!el) continue;
    el.classList.remove('active');
    if (i === 4) el.classList.toggle('locked', !isMasterUnlocked(st));
  }
  var active = document.getElementById('dc' + S.difficulty);
  if (active) active.classList.add('active');

  /* Fortschrittsanzeiger der Meister-Locked-Card */
  var _progEl = document.getElementById('diff-lock-prog');
  if (_progEl) {
    var _prog = Array.isArray(st.hard100Modes) ? Math.min(st.hard100Modes.length, 3) : 0;
    _progEl.textContent = _prog + '/3 Bereiche geschafft';
  }

  /* Badge-Texte der Mode-Karten aktualisieren */
  var b1 = document.getElementById('badge1'); if (b1) b1.textContent = VERBS.length     + ' Verben';
  var b2 = document.getElementById('badge2'); if (b2) b2.textContent = SENTENCES.length + ' S\u00e4tze';
  var b3 = document.getElementById('badge3'); if (b3) b3.textContent = VOCAB.length      + ' W\u00f6rter';
  var b4 = document.getElementById('badge4'); if (b4) b4.textContent = PRONOUNS.length   + ' \u00dcbungen';
  var b7 = document.getElementById('badge7'); if (b7) b7.textContent = SENTENCES.length  + ' S\u00e4tze';
}

/* ================================================================
   TIMER  (Schwierigkeit 2–4)
   ================================================================ */
var _timerTimeout  = null;
var _timerInterval = null;

function startTimer(onExpire, secOverride) {
  var base = DIFF_TIME[S.difficulty] || 0;
  var secs = (base > 0 && secOverride !== undefined) ? secOverride : base;
  stopTimer();
  if (!secs) return;

  var wrap  = document.getElementById('timer-wrap');
  var bar   = document.getElementById('timer-bar');
  var count = document.getElementById('timer-count');

  /* Animationen und Transition zurücksetzen */
  bar.style.animation  = 'none';
  bar.style.transition = 'none';
  bar.style.width      = '100%';
  wrap.style.display   = 'block';
  bar.getBoundingClientRect(); /* force reflow – wichtig für Reset */

  /* Farbanimation (Grün→Orange→Rot) und Breiten-Transition gleichzeitig starten */
  bar.style.animation  = 'timer-color ' + secs + 's linear forwards';
  bar.style.transition = 'width ' + secs + 's linear';
  bar.style.width      = '0%';

  /* Sekunden-Countdown */
  var remaining = secs;
  function updateCount() {
    if (!count) return;
    count.textContent = remaining + 's';
    var ratio = remaining / secs;
    count.style.color = ratio > 0.4 ? '#22c55e' : ratio > 0.3 ? '#f97316' : '#ef4444';
  }
  if (count) { count.style.display = 'block'; updateCount(); }
  _timerInterval = setInterval(function() {
    remaining--;
    if (remaining <= 0) { remaining = 0; }
    updateCount();
  }, 1000);

  _timerTimeout = setTimeout(function() {
    _timerTimeout = null;
    if (!S.answered) onExpire();
  }, secs * 1000);
}

function stopTimer() {
  if (_timerTimeout !== null) {
    clearTimeout(_timerTimeout);
    _timerTimeout = null;
  }
  if (_timerInterval !== null) {
    clearInterval(_timerInterval);
    _timerInterval = null;
  }
  var wrap  = document.getElementById('timer-wrap');
  var bar   = document.getElementById('timer-bar');
  var count = document.getElementById('timer-count');
  if (wrap)  wrap.style.display = 'none';
  if (bar)   { bar.style.animation = 'none'; bar.style.transition = 'none'; }
  if (count) count.style.display = 'none';
}

/* ================================================================
   INIT
   ================================================================ */
function initApp() {
  loadDifficulty();
  refreshMenu();
}
