/* ================================================================
   FEEDBACK HELPERS
   ================================================================ */
function showFb(id, ok, html, showNext) {
    var el = document.getElementById(id);
    el.className = 'fb show ' + (ok ? 'ok' : 'err');
    el.innerHTML = html +
        (showNext ? '<div><button class="btn-next" onclick="nextQ()">Weiter \u2192</button></div>' : '');
}

function hideFb(id) {
    var el = document.getElementById(id);
    el.className = 'fb';
    el.innerHTML = '';
}

/* ================================================================
   TIMER EXPIRE – SHARED HELPER  (button-grid modes)
   ================================================================ */
function onTimerExpire(gridSel, correct, fbId) {
    if (S.answered) return;
    S.answered = true;
    var btns = document.querySelectorAll(gridSel + ' .ans-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].textContent === correct) btns[i].classList.add('correct');
    }
    onWrong();
    showFb(fbId, false,
        '\u23F0 Zeit abgelaufen! Richtig: <strong>' + correct + '</strong>', true);
}

/* ================================================================
   MODE ENTRY
   ================================================================ */
function startMode(m) {
    S.mode = m;
    S.q = 0;
    S.correct = 0;
    S.wrong = 0;
    S.total = 20;
    S.streak = 0;
    S.bestStreak = 0;
    S.answered = false;
    updateHeader();

    if (m === 1) {
        S.items = shuffle(VERBS).slice(0, S.total);
        show('s-m1');
        loadM1();
    } else if (m === 2) {
        S.items = shuffle(SENTENCES).slice(0, S.total);
        show('s-m2');
        loadM2();
    } else if (m === 3) {
        S.items = shuffle(VOCAB).slice(0, S.total);
        show('s-m3');
        loadM3();
    } else if (m === 4) {
        S.items = shuffle(PRONOUNS).slice(0, S.total);
        show('s-m4');
        loadM4();
    } else if (m === 5) {
        show('s-m5');
    } else if (m === 6) {
        show('s-m6');
    } else if (m === 7) {
        S.items = shuffle(SENTENCES).slice(0, S.total);
        show('s-m7');
        loadM7();
    } else if (m === 8) {
        var allMixed = [];
        VOCAB.forEach(function(v) { allMixed.push({ en: v.en, de: v.de, pron: v.pron || '' }); });
        VERBS.forEach(function(v) { allMixed.push({ en: v.inf, de: v.de, pron: '' }); });
        S.items = shuffle(allMixed).slice(0, S.total).map(function(v) {
            var deToEn = Math.random() < 0.5;
            return {
                displayWord: deToEn ? v.de : v.en,
                correctAns:  deToEn ? v.en : v.de,
                tip:         deToEn ? v.en : v.de,
                deToEn:      deToEn,
                de:          v.de,
                en:          v.en
            };
        });
        show('s-m8');
        loadM8();
    }
}

function playAgain() {
    if (S.mode === 5 && S.submode) {
        startM5sub(S.submode);
        return;
    }
    if (S.mode === 6 && S.submode) {
        startM6sub(S.submode);
        return;
    }
    if (S.mode === 8) {
        startMode(8);
        return;
    }
    startMode(S.mode);
}

/* ================================================================
   MODE 1 – PAST SIMPLE QUIZ
   ================================================================ */
function loadM1() {
    var item = S.items[S.q];
    var nOpts = DIFF_OPTS[S.difficulty] || 4;

    document.getElementById('m1-cnt').textContent = 'Frage ' + (S.q + 1) + ' von ' + S.total;
    document.getElementById('m1-verb').textContent = item.inf;
    document.getElementById('m1-tip').textContent = '\uD83C\uDDE9\uD83C\uDDEA ' + item.de;

    var wrongs = shuffle(VERBS.filter(function (v) {
        return v.past !== item.past && v.inf !== item.inf;
    })).slice(0, nOpts - 1).map(function (v) {
        return v.past;
    });

    var opts = shuffle([item.past].concat(wrongs));
    var grid = document.getElementById('m1-grid');
    grid.className = 'ans-grid' + (nOpts >= 8 ? ' cols4' : nOpts >= 6 ? ' cols3' : '');
    grid.innerHTML = '';
    opts.forEach(function (ans) {
        var b = document.createElement('button');
        b.className = 'ans-btn';
        b.textContent = ans;
        b.addEventListener('click', (function (btn, a) {
            return function () {
                m1Pick(btn, a, item);
            };
        })(b, ans));
        grid.appendChild(b);
    });
    hideFb('m1-fb');
    startTimer(function () {
        onTimerExpire('#m1-grid', item.past, 'm1-fb');
    });
}

function m1Pick(btn, chosen, item) {
    if (S.answered) return;
    S.answered = true;
    stopTimer();

    var correct = item.past;
    var btns = document.querySelectorAll('#m1-grid .ans-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].textContent === correct) btns[i].classList.add('correct');
    }

    if (chosen === correct) {
        btn.classList.add('correct');
        onCorrect();
        showFb('m1-fb', true,
            '\u2713 Richtig! &nbsp;<span style="opacity:.7">\u201E' + item.inf + '\u201C \u2192 \u201E' + correct + '\u201C &nbsp;(' + item.de + ')</span>');
        setTimeout(nextQ, 1500);
    } else {
        btn.classList.add('wrong');
        onWrong();
        showFb('m1-fb', false,
            '\u274C Du hast \u201E' + chosen + '\u201C gew\u00e4hlt. Das Verb \u201E' + item.inf + '\u201C (' + item.de +
            ') ist unregelm\u00e4\u00dfig \u2013 die richtige Past Simple Form ist <strong>' + correct + '</strong>.', true);
    }
}

/* ================================================================
   MODE 2 – SENTENCE BUILDER
   ================================================================ */
function loadM2() {
    var item = S.items[S.q];
    S.chosen = [];
    S.bankItems = shuffle(item.words.map(function (w, i) {
        return {word: w, origIdx: i};
    }));
    document.getElementById('m2-cnt').textContent = 'Frage ' + (S.q + 1) + ' von ' + S.total;
    document.getElementById('m2-de').textContent = item.de;
    renderBank();
    renderArea();
    hideFb('m2-fb');
    document.getElementById('m2-area').className = 'sent-area';
    startTimer(function () {
        m2TimerExpire(item);
    }, 20);
}

function m2TimerExpire(item) {
    if (S.answered) return;
    S.answered = true;
    var correct = item.words.join(' ');
    document.getElementById('m2-area').classList.add('flash-err');
    onWrong();
    showFb('m2-fb', false,
        '\u23F0 Zeit abgelaufen! Richtig: <strong>' + correct + '</strong>' +
        ' &nbsp;<span style="opacity:.7">(' + item.de + ')</span>', true);
}

function renderBank() {
    var el = document.getElementById('m2-bank');
    el.innerHTML = '';
    S.bankItems.forEach(function (item) {
        var used = S.chosen.some(function (c) {
            return c.origIdx === item.origIdx;
        });
        var ch = document.createElement('button');
        ch.className = 'wchip' + (used ? ' used' : '');
        ch.textContent = item.word;
        if (!used) {
            ch.addEventListener('click', (function (it) {
                return function () {
                    m2Select(it);
                };
            })(item));
        }
        el.appendChild(ch);
    });
}

function renderArea() {
    var el = document.getElementById('m2-area');
    el.innerHTML = '';
    S.chosen.forEach(function (item, i) {
        var ch = document.createElement('button');
        ch.className = 'schip';
        ch.textContent = item.word;
        ch.addEventListener('click', (function (idx) {
            return function () {
                m2Remove(idx);
            };
        })(i));
        el.appendChild(ch);
    });
}

function m2Select(item) {
    if (S.answered) return;
    S.chosen.push(item);
    renderBank();
    renderArea();
}

function m2Remove(idx) {
    if (S.answered) return;
    S.chosen.splice(idx, 1);
    renderBank();
    renderArea();
}

function m2Clear() {
    if (S.answered) return;
    S.chosen = [];
    renderBank();
    renderArea();
}

function m2Check() {
    if (S.answered || S.chosen.length === 0) return;
    S.answered = true;
    stopTimer();

    var item = S.items[S.q];
    var correct = item.words.join(' ');
    var given = S.chosen.map(function (c) {
        return c.word;
    }).join(' ');
    var area = document.getElementById('m2-area');

    if (given === correct) {
        area.classList.add('flash-ok');
        onCorrect();
        showFb('m2-fb', true,
            '\u2713 Richtig! &nbsp;<span style="opacity:.7">' + item.de + '</span>');
        setTimeout(nextQ, 1500);
    } else {
        area.classList.add('flash-err');
        onWrong();
        showFb('m2-fb', false,
            '\u274C Dein Satz: \u201E' + given + '\u201C<br>' +
            'Im Englischen gilt: Subjekt \u2013 Verb \u2013 Objekt. ' +
            'Richtig: <strong>' + correct + '</strong> &nbsp;<span style="opacity:.7">(' + item.de + ')</span>', true);
    }
}

/* ================================================================
   MODE 3 – ALLTAGSVOKABELN  (DE→EN oder EN→DE, zufällig)
   ================================================================ */
function loadM3() {
    var item = S.items[S.q];
    var deToEn = (Math.random() < 0.5);
    S.m3deToEn = deToEn;
    var nOpts = DIFF_OPTS[S.difficulty] || 4;

    document.getElementById('m3-cnt').textContent = 'Frage ' + (S.q + 1) + ' von ' + S.total;
    document.getElementById('m3-topic').textContent = item.t;
    document.getElementById('m3-dir').textContent = deToEn ? 'Deutsch \u2192 Englisch' : 'Englisch \u2192 Deutsch';

    var displayWord = deToEn ? item.de : item.en;
    var tipText = deToEn ? 'Englisch: ' + item.en + '  ' + item.pron : item.pron;

    document.getElementById('m3-word').textContent = displayWord;
    document.getElementById('m3-tip').textContent = tipText;

    var correctAns = deToEn ? item.en : item.de;
    var distractors = shuffle(VOCAB.filter(function (v) {
        return v.en !== item.en;
    })).slice(0, nOpts - 1).map(function (v) {
        return deToEn ? v.en : v.de;
    });

    var opts = shuffle([correctAns].concat(distractors));
    var grid = document.getElementById('m3-grid');
    grid.className = 'ans-grid' + (nOpts >= 8 ? ' cols4' : nOpts >= 6 ? ' cols3' : '');
    grid.innerHTML = '';
    opts.forEach(function (ans) {
        var b = document.createElement('button');
        b.className = 'ans-btn';
        b.textContent = ans;
        b.addEventListener('click', (function (btn, a) {
            return function () {
                m3Pick(btn, a, correctAns, item, deToEn);
            };
        })(b, ans));
        grid.appendChild(b);
    });
    hideFb('m3-fb');
    startTimer(function () {
        onTimerExpire('#m3-grid', correctAns, 'm3-fb');
    });
}

function m3Pick(btn, chosen, correct, item, deToEn) {
    if (S.answered) return;
    S.answered = true;
    stopTimer();

    var btns = document.querySelectorAll('#m3-grid .ans-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].textContent === correct) btns[i].classList.add('correct');
    }

    if (chosen === correct) {
        btn.classList.add('correct');
        onCorrect();
        var pron = item.pron ? ' &nbsp;<span style="opacity:.6">' + item.pron + '</span>' : '';
        showFb('m3-fb', true,
            '\u2713 Richtig! &nbsp;<span style="opacity:.7">' + item.de + ' = ' + item.en + pron + '</span>');
        setTimeout(nextQ, 1500);
    } else {
        btn.classList.add('wrong');
        onWrong();
        var errMsg = deToEn
            ? '\u274C \u201E' + item.de + '\u201C hei\u00dft auf Englisch <strong>' + correct + '</strong>, nicht \u201E' + chosen + '\u201C.'
            : '\u274C \u201E' + item.en + '\u201C bedeutet auf Deutsch <strong>' + correct + '</strong>, nicht \u201E' + chosen + '\u201C.';
        showFb('m3-fb', false, errMsg, true);
    }
}

/* ================================================================
   MODE 4 – PERSONAL PRONOUNS (Lückentext)
   ================================================================ */
var PRON_POOLS = {
    subject: ['I', 'you', 'he', 'she', 'it', 'we', 'they'],
    object: ['me', 'you', 'him', 'her', 'it', 'us', 'them'],
    possessive: ['my', 'your', 'his', 'her', 'its', 'our', 'their'],
    reflexive: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves'],
    reciprocal: ['each other', 'one another']
};

function loadM4() {
    var item = S.items[S.q];
    var nOpts = DIFF_OPTS[S.difficulty] || 4;

    document.getElementById('m4-cnt').textContent = 'Frage ' + (S.q + 1) + ' von ' + S.total;

    var typeLabels = {
        subject: 'Subjektpronomen',
        object: 'Objektpronomen',
        possessive: 'Possessivpronomen',
        reflexive: 'Reflexivpronomen',
        reciprocal: 'Reziprokpronomen'
    };
    document.getElementById('m4-type').textContent = typeLabels[item.type] || item.type;

    var gap = document.getElementById('m4-gap');
    gap.innerHTML =
        (item.pre ? '<span>' + item.pre + ' </span>' : '') +
        '<span class="gap-blank">___</span>' +
        (item.post ? '<span>' + item.post + '</span>' : '');

    var pool = PRON_POOLS[item.type] || PRON_POOLS.subject;
    var distractors = shuffle(pool.filter(function (p) {
        return p !== item.ans;
    }));

    /* Wenn Pool zu klein: mit Pronomen aus anderen Pools auffüllen */
    if (distractors.length < nOpts - 1) {
        var extras = [];
        var allPools = Object.keys(PRON_POOLS);
        for (var pi = 0; pi < allPools.length; pi++) {
            if (allPools[pi] === item.type) continue;
            var p2 = PRON_POOLS[allPools[pi]];
            for (var pj = 0; pj < p2.length; pj++) {
                if (p2[pj] !== item.ans && distractors.indexOf(p2[pj]) < 0) extras.push(p2[pj]);
            }
        }
        distractors = distractors.concat(shuffle(extras));
    }
    distractors = distractors.slice(0, nOpts - 1);

    var opts = shuffle([item.ans].concat(distractors));
    var grid = document.getElementById('m4-grid');
    grid.className = 'ans-grid' + (nOpts >= 8 ? ' cols4' : nOpts >= 6 ? ' cols3' : '');
    grid.innerHTML = '';
    opts.forEach(function (ans) {
        var b = document.createElement('button');
        b.className = 'ans-btn';
        b.textContent = ans;
        b.addEventListener('click', (function (btn, a) {
            return function () {
                m4Pick(btn, a, item.ans, item.pre, item.post, item.de, item.type);
            };
        })(b, ans));
        grid.appendChild(b);
    });
    hideFb('m4-fb');
    startTimer(function () {
        onTimerExpire('#m4-grid', item.ans, 'm4-fb');
    });
}

function m4Pick(btn, chosen, correct, pre, post, de, type) {
    if (S.answered) return;
    S.answered = true;
    stopTimer();

    var gap = document.getElementById('m4-gap');
    gap.innerHTML =
        (pre ? '<span>' + pre + ' </span>' : '') +
        '<span class="gap-blank" style="color:' + (chosen === correct ? 'var(--green)' : 'var(--red)') +
        ';border-color:' + (chosen === correct ? 'var(--green)' : 'var(--red)') + '">' + chosen + '</span>' +
        (post ? '<span>' + post + '</span>' : '');

    var btns = document.querySelectorAll('#m4-grid .ans-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].textContent === correct) btns[i].classList.add('correct');
    }

    if (chosen === correct) {
        btn.classList.add('correct');
        onCorrect();
        showFb('m4-fb', true, '\u2713 Richtig! &nbsp;<span style="opacity:.7">' + de + '</span>');
        setTimeout(nextQ, 1500);
    } else {
        btn.classList.add('wrong');
        onWrong();
        var typeHints = {
            subject: 'Hier braucht man ein Subjektpronomen (Wer handelt?).',
            object: 'Hier braucht man ein Objektpronomen \u2013 es steht nach dem Verb oder einer Pr\u00e4position.',
            possessive: 'Hier braucht man ein Possessivpronomen (wessen? \u2013 zeigt Zugeh\u00f6rigkeit an).',
            reflexive: 'Hier braucht man ein Reflexivpronomen (myself, yourself, himself \u2026).',
            reciprocal: 'Hier braucht man ein Reziprokpronomen (each other / one another).'
        };
        showFb('m4-fb', false,
            '\u274C ' + (typeHints[type] || '') + ' \u2013 <strong>' + correct + '</strong> ist richtig.' +
            '<br><span style="opacity:.8">' + de + '</span>', true);
    }
}

/* ================================================================
   MODE 5 – GRAMMATIK
   ================================================================ */
var M5_TITLES = {
    satzbau: 'Satzbau',
    tenses: 'Present vs. Past Simple',
    tobe: 'To be',
    short: 'Kurzantworten'
};

function startM5sub(sub) {
    S.submode = sub;
    S.q = 0;
    S.correct = 0;
    S.wrong = 0;
    S.total = 20;
    S.streak = 0;
    S.bestStreak = 0;
    S.answered = false;
    updateHeader();
    S.items = shuffle(GRAMMAR_QS.filter(function (q) {
        return q.sub === sub;
    })).slice(0, S.total);
    S.total = S.items.length;
    document.getElementById('m5-title').textContent = '\uD83D\uDCD6 Grammatik \u2013 ' + (M5_TITLES[sub] || sub);
    show('s-m5q');
    loadM5();
}

function loadM5() {
    var item = S.items[S.q];
    var correct = item.opts[item.ans];
    var shuffled = shuffle(item.opts.slice());
    var isLong = shuffled.some(function (o) {
        return o.length > 22;
    });

    document.getElementById('m5-cnt').textContent = 'Frage ' + (S.q + 1) + ' von ' + S.total;
    document.getElementById('m5-q').innerHTML = item.q.replace(/\n/g, '<br>');

    var grid = document.getElementById('m5-grid');
    grid.className = 'ans-grid' + (isLong ? ' cols1' : '');
    grid.innerHTML = '';
    shuffled.forEach(function (opt) {
        var b = document.createElement('button');
        b.className = 'ans-btn' + (isLong ? ' long' : '');
        b.textContent = opt;
        b.addEventListener('click', (function (btn, chosen) {
            return function () {
                m5Pick(btn, chosen, correct, item.rule || '');
            };
        })(b, opt));
        grid.appendChild(b);
    });
    hideFb('m5-fb');
    startTimer(function () {
        onTimerExpire('#m5-grid', correct, 'm5-fb');
    });
}

function m5Pick(btn, chosen, correct, rule) {
    if (S.answered) return;
    S.answered = true;
    stopTimer();

    var btns = document.querySelectorAll('#m5-grid .ans-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].textContent === correct) btns[i].classList.add('correct');
    }

    if (chosen === correct) {
        btn.classList.add('correct');
        onCorrect();
        showFb('m5-fb', true,
            '\u2713 Richtig! &nbsp;<span style="opacity:.75;font-size:.85em">' + rule + '</span>');
        setTimeout(nextQ, 1500);
    } else {
        btn.classList.add('wrong');
        onWrong();
        showFb('m5-fb', false,
            '\u274C Falsch! Richtig: <strong>' + correct + '</strong>' +
            (rule ? '<br><span style="font-size:.87em;display:block;margin-top:5px">\uD83D\uDCA1 ' + rule + '</span>' : ''), true);
    }
}

/* ================================================================
   MODE 6 – PRÜFUNGSVORBEREITUNG
   ================================================================ */
var M6_TITLES = {
    intro: 'Sich vorstellen',
    family: 'Familie',
    home: 'Wohnort',
    directions: 'Wegbeschreibung'
};

function startM6sub(sub) {
    S.submode = sub;
    S.q = 0;
    S.correct = 0;
    S.wrong = 0;
    S.total = 20;
    S.streak = 0;
    S.bestStreak = 0;
    S.answered = false;
    updateHeader();
    S.items = shuffle(EXAM_QS.filter(function (q) {
        return q.sub === sub;
    })).slice(0, S.total);
    S.total = S.items.length;
    document.getElementById('m6-title').textContent = '\uD83D\uDDD2\uFE0F Pr\u00fcfung \u2013 ' + (M6_TITLES[sub] || sub);
    show('s-m6q');
    loadM6();
}

function loadM6() {
    var item = S.items[S.q];
    var correct = item.opts[item.ans];
    var shuffled = shuffle(item.opts.slice());
    var isLong = shuffled.some(function (o) {
        return o.length > 22;
    });

    document.getElementById('m6-cnt').textContent = 'Frage ' + (S.q + 1) + ' von ' + S.total;
    document.getElementById('m6-q').innerHTML = item.q.replace(/\n/g, '<br>');

    var grid = document.getElementById('m6-grid');
    grid.className = 'ans-grid' + (isLong ? ' cols1' : '');
    grid.innerHTML = '';
    shuffled.forEach(function (opt) {
        var b = document.createElement('button');
        b.className = 'ans-btn' + (isLong ? ' long' : '');
        b.textContent = opt;
        b.addEventListener('click', (function (btn, chosen) {
            return function () {
                m6Pick(btn, chosen, correct, item.rule || '');
            };
        })(b, opt));
        grid.appendChild(b);
    });
    hideFb('m6-fb');
    startTimer(function () {
        onTimerExpire('#m6-grid', correct, 'm6-fb');
    });
}

function m6Pick(btn, chosen, correct, rule) {
    if (S.answered) return;
    S.answered = true;
    stopTimer();

    var btns = document.querySelectorAll('#m6-grid .ans-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].textContent === correct) btns[i].classList.add('correct');
    }

    if (chosen === correct) {
        btn.classList.add('correct');
        onCorrect();
        showFb('m6-fb', true,
            '\u2713 Richtig! &nbsp;<span style="opacity:.75;font-size:.85em">' + rule + '</span>');
        setTimeout(nextQ, 1500);
    } else {
        btn.classList.add('wrong');
        onWrong();
        showFb('m6-fb', false,
            '\u274C Falsch! Richtig: <strong>' + correct + '</strong>' +
            (rule ? '<br><span style="font-size:.87em;display:block;margin-top:5px">\uD83D\uDCA1 ' + rule + '</span>' : ''), true);
    }
}

/* ================================================================
   MODE 7 – WORTSALAT (Freitext-Eingabe)
   ================================================================ */
function loadM7() {
    var item = S.items[S.q];
    document.getElementById('m7-cnt').textContent = 'Frage ' + (S.q + 1) + ' von ' + S.total;
    document.getElementById('m7-de').textContent = item.de;

    var shuffledWords = shuffle(item.words.slice());
    var hintsEl = document.getElementById('m7-hints');
    hintsEl.innerHTML = '';
    shuffledWords.forEach(function (word) {
        var chip = document.createElement('span');
        chip.className = 'm7-hint-chip';
        chip.textContent = word;
        hintsEl.appendChild(chip);
    });

    var input = document.getElementById('m7-input');
    input.value = '';
    input.disabled = false;
    input.style.borderColor = '';
    hideFb('m7-fb');
    setTimeout(function () {
        input.focus();
    }, 80);
    startTimer(function () {
        m7TimerExpire(item);
    }, 20);
}

function m7TimerExpire(item) {
    if (S.answered) return;
    S.answered = true;
    var input = document.getElementById('m7-input');
    input.disabled = true;
    input.style.borderColor = 'var(--red)';
    var correct = item.words.join(' ');
    onWrong();
    showFb('m7-fb', false,
        '\u23F0 Zeit abgelaufen! Richtig: <strong>' + correct + '</strong>' +
        '<br><span style="opacity:.8;font-size:.88em">' + item.de + '</span>', true);
}

function m7Clear() {
    if (S.answered) return;
    var input = document.getElementById('m7-input');
    input.value = '';
    input.focus();
}

function m7Check() {
    if (S.answered) return;
    var input = document.getElementById('m7-input');
    var given = input.value.trim();
    if (!given) return;

    S.answered = true;
    stopTimer();
    input.disabled = true;

    var item = S.items[S.q];
    var correct = item.words.join(' ');

    if (given.toLowerCase() === correct.toLowerCase()) {
        input.style.borderColor = 'var(--green)';
        onCorrect();
        showFb('m7-fb', true,
            '\u2713 Richtig! &nbsp;<span style="opacity:.7">' + item.de + '</span>');
        setTimeout(nextQ, 1500);
    } else {
        input.style.borderColor = 'var(--red)';
        onWrong();
        showFb('m7-fb', false,
            '\u274C Deine Antwort: \u201E' + given + '\u201C<br>' +
            'Richtig w\u00e4re: <strong>' + correct + '</strong> \u2013 Achte auf die Wortstellung!' +
            '<br><span style="opacity:.8;font-size:.88em">' + item.de + '</span>', true);
    }
}

/* ================================================================
   MODE 8 – VOKABEL-MIX  (VOCAB + VERBS, DE↔EN zufällig)
   ================================================================ */
function loadM8() {
    var item = S.items[S.q];
    var nOpts = DIFF_OPTS[S.difficulty] || 4;

    document.getElementById('m8-cnt').textContent = 'Frage ' + (S.q + 1) + ' von ' + S.total;
    document.getElementById('m8-type').textContent = item.deToEn ? 'Deutsch \u2192 Englisch' : 'Englisch \u2192 Deutsch';
    document.getElementById('m8-word').textContent = item.displayWord;
    document.getElementById('m8-tip').textContent = item.tip;

    var allPool = [];
    VOCAB.forEach(function(v) { allPool.push({ en: v.en, de: v.de }); });
    VERBS.forEach(function(v) { allPool.push({ en: v.inf, de: v.de }); });

    var distractors = shuffle(allPool.filter(function(v) {
        return (item.deToEn ? v.en : v.de) !== item.correctAns;
    })).slice(0, nOpts - 1).map(function(v) {
        return item.deToEn ? v.en : v.de;
    });

    var opts = shuffle([item.correctAns].concat(distractors));
    var grid = document.getElementById('m8-grid');
    grid.className = 'ans-grid' + (nOpts >= 8 ? ' cols4' : nOpts >= 6 ? ' cols3' : '');
    grid.innerHTML = '';
    opts.forEach(function(ans) {
        var b = document.createElement('button');
        b.className = 'ans-btn';
        b.textContent = ans;
        b.addEventListener('click', (function(btn, a) {
            return function() { m8Pick(btn, a, item); };
        })(b, ans));
        grid.appendChild(b);
    });
    hideFb('m8-fb');
    startTimer(function() {
        onTimerExpire('#m8-grid', item.correctAns, 'm8-fb');
    }, 20);
}

function m8Pick(btn, chosen, item) {
    if (S.answered) return;
    S.answered = true;
    stopTimer();

    var correct = item.correctAns;
    var btns = document.querySelectorAll('#m8-grid .ans-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        if (btns[i].textContent === correct) btns[i].classList.add('correct');
    }

    if (chosen === correct) {
        btn.classList.add('correct');
        onCorrect();
        showFb('m8-fb', true,
            '\u2713 Richtig! &nbsp;<span style="opacity:.7">' + item.de + ' = ' + item.en + '</span>');
        setTimeout(nextQ, 1500);
    } else {
        btn.classList.add('wrong');
        onWrong();
        var errMsg = item.deToEn
            ? '\u274C \u201E' + item.de + '\u201C hei\u00dft auf Englisch <strong>' + correct + '</strong>, nicht \u201E' + chosen + '\u201C.'
            : '\u274C \u201E' + item.en + '\u201C bedeutet auf Deutsch <strong>' + correct + '</strong>, nicht \u201E' + chosen + '\u201C.';
        showFb('m8-fb', false, errMsg, true);
    }
}

/* ================================================================
   INIT
   ================================================================ */
initApp();
