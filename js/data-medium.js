/* ================================================================
   DATA_MEDIUM  –  B1-Niveau (Stufe 2)
   Ergänzt DATA_EASY, wird bei Schwierigkeit >= 2 dazugeladen.
   Verben: 47  |  Sätze: 44  |  Vokabeln: 65  |  Pronouns: 8
   Grammar: 15  |  Exam: 13
   ================================================================ */
var DATA_MEDIUM = {

/* ================================================================
   VERBS – 47 Verben (B1)
   Hinweis: bend, bite, blow, hide, hit, lay, lead, lend, rise,
   shake, steal, throw sind bereits in data-easy.js enthalten
   und werden hier nicht wiederholt (keine Duplikate).
   ================================================================ */
VERBS: [
  /* ── Aus Nutzerliste: 23 Verben (nicht in data-easy.js) ── */
  {inf:'awake',    past:'awoke',    de:'aufwachen / erwachen'},
  {inf:'bleed',    past:'bled',     de:'bluten'},
  {inf:'dig',      past:'dug',      de:'graben'},
  {inf:'feed',     past:'fed',      de:'füttern / ernähren'},
  {inf:'flee',     past:'fled',     de:'fliehen / flüchten'},
  {inf:'freeze',   past:'froze',    de:'frieren / einfrieren'},
  {inf:'hang',     past:'hung',     de:'hängen / aufhängen'},
  {inf:'kneel',    past:'knelt',    de:'knien'},
  {inf:'lean',     past:'leant',    de:'sich lehnen / anlehnen'},
  {inf:'light',    past:'lit',      de:'anzünden / beleuchten'},
  {inf:'seek',     past:'sought',   de:'suchen / anstreben'},
  {inf:'shine',    past:'shone',    de:'scheinen / leuchten'},
  {inf:'shoot',    past:'shot',     de:'schießen'},
  {inf:'sink',     past:'sank',     de:'sinken / versinken'},
  {inf:'slide',    past:'slid',     de:'rutschen / gleiten'},
  {inf:'stick',    past:'stuck',    de:'kleben / stecken bleiben'},
  {inf:'sting',    past:'stung',    de:'stechen / brennen'},
  {inf:'strike',   past:'struck',   de:'schlagen / treffen / streiken'},
  {inf:'sweep',    past:'swept',    de:'fegen / kehren'},
  {inf:'swing',    past:'swung',    de:'schwingen / schaukeln'},
  {inf:'tear',     past:'tore',     de:'reißen / zerreißen'},
  {inf:'weep',     past:'wept',     de:'weinen / klagen'},
  {inf:'wind',     past:'wound',    de:'aufziehen / sich winden'},
  /* ── Weitere B1-Verben ── */
  {inf:'arise',    past:'arose',    de:'entstehen / auftreten'},
  {inf:'bind',     past:'bound',    de:'binden / verpflichten'},
  {inf:'breed',    past:'bred',     de:'züchten / aufziehen'},
  {inf:'burst',    past:'burst',    de:'platzen / bersten'},
  {inf:'cast',     past:'cast',     de:'werfen / besetzen (Rolle)'},
  {inf:'cling',    past:'clung',    de:'sich klammern / haften'},
  {inf:'creep',    past:'crept',    de:'kriechen / schleichen'},
  {inf:'deal',     past:'dealt',    de:'handeln / verteilen'},
  {inf:'forbid',   past:'forbade',  de:'verbieten'},
  {inf:'forgive',  past:'forgave',  de:'vergeben'},
  {inf:'grind',    past:'ground',   de:'mahlen / schleifen'},
  {inf:'overcome', past:'overcame', de:'überwinden'},
  {inf:'shed',     past:'shed',     de:'vergießen / abwerfen'},
  {inf:'shrink',   past:'shrank',   de:'schrumpfen / einlaufen'},
  {inf:'spread',   past:'spread',   de:'verbreiten / ausbreiten'},
  {inf:'swear',    past:'swore',    de:'schwören / fluchen'},
  {inf:'withdraw', past:'withdrew', de:'zurückziehen / abheben'},
  {inf:'bet',      past:'bet',      de:'wetten'},
  {inf:'mislead',  past:'misled',   de:'irreführen / täuschen'},
  {inf:'quit',     past:'quit',     de:'aufhören / kündigen'},
  {inf:'spell',    past:'spelt',    de:'buchstabieren'},
  {inf:'speed',    past:'sped',     de:'rasen / beschleunigen'},
  {inf:'spit',     past:'spat',     de:'spucken'},
  {inf:'upset',    past:'upset',    de:'aufregen / umwerfen / verstimmen'}
],

/* ================================================================
   SENTENCES – 44 Sätze (B1, komplexere Strukturen)
   ================================================================ */
SENTENCES: [
  /* Present Perfect & Perfect Continuous */
  {words:['She','has','been','studying','for','three','hours.'],                   de:'Sie lernt seit drei Stunden.'},
  {words:['Have','you','ever','been','to','London?'],                              de:'Bist du je in London gewesen?'},
  {words:['I','have','been','waiting','for','an','hour','already.'],               de:'Ich warte schon seit einer Stunde.'},
  {words:['They','have','been','living','in','Germany','for','five','years.'],     de:'Sie wohnen seit fünf Jahren in Deutschland.'},
  {words:['He','has','already','left','when','I','arrived.'],                     de:'Er war bereits gegangen, als ich ankam.'},
  /* Passive Voice */
  {words:['The','book','was','written','by','a','famous','author.'],               de:'Das Buch wurde von einem berühmten Autor geschrieben.'},
  {words:['The','package','was','delivered','to','the','wrong','address.'],        de:'Das Paket wurde an die falsche Adresse geliefert.'},
  {words:['The','windows','were','cleaned','yesterday','morning.'],                de:'Die Fenster wurden gestern Morgen geputzt.'},
  {words:['The','match','was','postponed','because','of','the','heavy','rain.'],   de:'Das Spiel wurde wegen des starken Regens verschoben.'},
  {words:['The','car','was','repaired','at','the','local','garage.'],              de:'Das Auto wurde in der örtlichen Werkstatt repariert.'},
  {words:['The','new','shopping','centre','is','being','built','in','the','town','centre.'], de:'Das neue Einkaufszentrum wird im Stadtzentrum gebaut.'},
  {words:['The','film','was','directed','by','a','well-known','producer.'],        de:'Der Film wurde von einem bekannten Produzenten gedreht.'},
  /* Conditional Sentences */
  {words:['If','you','study','hard,','you','will','pass','the','exam.'],           de:'Wenn du fleißig lernst, wirst du die Prüfung bestehen.'},
  {words:['If','I','had','more','time,','I','would','read','more','books.'],       de:'Wenn ich mehr Zeit hätte, würde ich mehr Bücher lesen.'},
  {words:['If','I','were','you,','I','would','apologize.'],                       de:'An deiner Stelle würde ich mich entschuldigen.'},
  {words:['Unless','you','hurry,','you','will','miss','the','bus.'],               de:'Wenn du dich nicht beeilst, verpasst du den Bus.'},
  {words:['I','wish','I','had','studied','harder','for','the','exam.'],            de:'Ich wünschte, ich hätte mehr für die Prüfung gelernt.'},
  /* Reported Speech & Indirect Questions */
  {words:['She','said','that','she','would','call','me','back','later.'],          de:'Sie sagte, dass sie mich später zurückrufen würde.'},
  {words:['He','asked','her','if','she','had','ever','been','to','Spain.'],        de:'Er fragte sie, ob sie jemals in Spanien gewesen sei.'},
  {words:['He','asked','me','where','I','had','been.'],                           de:'Er fragte mich, wo ich gewesen sei.'},
  {words:['The','manager','announced','that','the','meeting','would','be','postponed.'], de:'Der Manager gab bekannt, dass das Meeting verschoben würde.'},
  /* Relative Clauses */
  {words:['The','book','I','borrowed','from','the','library','was','really','interesting.'], de:'Das Buch, das ich aus der Bibliothek ausgeliehen habe, war wirklich interessant.'},
  {words:['She','is','the','most','talented','student','I','have','ever','taught.'], de:'Sie ist die begabteste Schülerin, die ich je unterrichtet habe.'},
  {words:['The','teacher','who','taught','us','maths','has','retired','this','year.'], de:'Der Lehrer, der uns Mathematik unterrichtete, ist dieses Jahr in Rente gegangen.'},
  /* Subordinate Clauses & Complex Structures */
  {words:['Despite','the','rain,','they','went','for','a','walk.'],                de:'Trotz des Regens gingen sie spazieren.'},
  {words:['Although','she','was','nervous,','she','gave','an','excellent','presentation.'], de:'Obwohl sie nervös war, hielt sie eine ausgezeichnete Präsentation.'},
  {words:['Although','it','was','raining,','the','match','was','not','cancelled.'], de:'Obwohl es regnete, wurde das Spiel nicht abgesagt.'},
  {words:['After','finishing','school,','she','went','to','university','in','Munich.'], de:'Nachdem sie die Schule abgeschlossen hatte, ging sie nach München an die Universität.'},
  {words:['By','the','time','we','arrived,','the','film','had','already','started.'], de:'Als wir ankamen, hatte der Film bereits begonnen.'},
  {words:['Having','finished','his','homework,','he','went','for','a','walk.'],    de:'Nachdem er seine Hausaufgaben erledigt hatte, machte er einen Spaziergang.'},
  {words:['We','need','to','make','a','decision','before','tomorrow','morning.'],  de:'Wir müssen eine Entscheidung vor morgen früh treffen.'},
  {words:['She','suggested','that','we','should','leave','early.'],                de:'Sie schlug vor, dass wir früh aufbrechen sollten.'},
  {words:['She','used','to','play','the','piano','every','day.'],                  de:'Früher spielte sie täglich Klavier.'},
  {words:['He','is','not','used','to','waking','up','early.'],                    de:'Er ist nicht daran gewöhnt, früh aufzustehen.'},
  {words:['She','would','rather','stay','at','home','than','go','to','the','party.'], de:'Sie würde lieber zu Hause bleiben als auf die Party gehen.'},
  {words:['The','more','you','practise,','the','better','you','become.'],          de:'Je mehr du übst, desto besser wirst du.'},
  /* Miscellaneous B1 */
  {words:['It','is','the','most','interesting','book','I','have','ever','read.'],  de:'Es ist das interessanteste Buch, das ich je gelesen habe.'},
  {words:['It','is','reported','that','the','company','will','close','next','year.'], de:'Es wird berichtet, dass das Unternehmen nächstes Jahr schließen wird.'},
  {words:['The','project','must','be','completed','by','Friday.'],                 de:'Das Projekt muss bis Freitag fertig sein.'},
  {words:['He','has','been','living','in','this','city','since','he','was','born.'], de:'Er wohnt seit seiner Geburt in dieser Stadt.'},
  {words:['He','hasn\'t','decided','yet','whether','to','go','or','stay.'],        de:'Er hat noch nicht entschieden, ob er gehen oder bleiben soll.'},
  {words:['She','has','just','finished','her','homework.'],                        de:'Sie hat gerade ihre Hausaufgaben fertig gemacht.'},
  {words:['He','hasn\'t','seen','his','brother','for','three','years.'],           de:'Er hat seinen Bruder seit drei Jahren nicht gesehen.'},
  {words:['I','wish','I','could','speak','English','without','making','mistakes.'],de:'Ich wünschte, ich könnte Englisch sprechen ohne Fehler zu machen.'}
],

/* ================================================================
   VOCAB – 65 Wörter (Beruf, Reisen, Gesundheit + B1-Allgemein)
   ================================================================ */
VOCAB: [
  /* B1-Allgemein (35 – aus vorheriger Version) */
  {en:'accomplish',    de:'vollbringen / leisten',           pron:'[əˈkɒmplɪʃ]',       t:'Verben'},
  {en:'adequate',      de:'angemessen / ausreichend',        pron:'[ˈædɪkwət]',         t:'Adjektive'},
  {en:'ambitious',     de:'ehrgeizig / ambitioniert',        pron:'[æmˈbɪʃəs]',         t:'Adjektive'},
  {en:'analysis',      de:'Analyse / Untersuchung',          pron:'[əˈnæləsɪs]',        t:'Nomen'},
  {en:'appreciate',    de:'schätzen / anerkennen',           pron:'[əˈpriːʃieɪt]',      t:'Verben'},
  {en:'appropriate',   de:'angemessen / passend',            pron:'[əˈprəʊpriɪt]',      t:'Adjektive'},
  {en:'assumption',    de:'Annahme / Voraussetzung',         pron:'[əˈsʌmpʃən]',        t:'Nomen'},
  {en:'attitude',      de:'Einstellung / Haltung',           pron:'[ˈætɪtjuːd]',        t:'Nomen'},
  {en:'authority',     de:'Autorität / Behörde',             pron:'[ɔːˈθɒrɪti]',        t:'Nomen'},
  {en:'awareness',     de:'Bewusstsein / Aufmerksamkeit',    pron:'[əˈweənəs]',          t:'Nomen'},
  {en:'beneficial',    de:'vorteilhaft / nützlich',          pron:'[ˌbenɪˈfɪʃəl]',      t:'Adjektive'},
  {en:'capable',       de:'fähig / imstande',                pron:'[ˈkeɪpəbəl]',        t:'Adjektive'},
  {en:'challenge',     de:'Herausforderung / herausfordern', pron:'[ˈtʃælɪndʒ]',        t:'Nomen'},
  {en:'colleague',     de:'Kollege / Mitarbeiterin',         pron:'[ˈkɒliːɡ]',          t:'Beruf'},
  {en:'communicate',   de:'kommunizieren / mitteilen',       pron:'[kəˈmjuːnɪkeɪt]',    t:'Verben'},
  {en:'community',     de:'Gemeinschaft / Gemeinde',         pron:'[kəˈmjuːnɪti]',      t:'Nomen'},
  {en:'concentrate',   de:'sich konzentrieren',              pron:'[ˈkɒnsəntreɪt]',     t:'Verben'},
  {en:'confident',     de:'selbstbewusst / zuversichtlich',  pron:'[ˈkɒnfɪdənt]',       t:'Adjektive'},
  {en:'consequence',   de:'Folge / Konsequenz',              pron:'[ˈkɒnsɪkwəns]',      t:'Nomen'},
  {en:'contribute',    de:'beitragen / spenden',             pron:'[kənˈtrɪbjuːt]',     t:'Verben'},
  {en:'convince',      de:'überzeugen / überreden',          pron:'[kənˈvɪns]',         t:'Verben'},
  {en:'crucial',       de:'entscheidend / wesentlich',       pron:'[ˈkruːʃəl]',         t:'Adjektive'},
  {en:'deadline',      de:'Frist / Abgabetermin',            pron:'[ˈdedlaɪn]',         t:'Beruf'},
  {en:'demonstrate',   de:'demonstrieren / zeigen',          pron:'[ˈdemənstreɪt]',     t:'Verben'},
  {en:'deserve',       de:'verdienen / wert sein',           pron:'[dɪˈzɜːv]',          t:'Verben'},
  {en:'diverse',       de:'vielfältig / verschieden',        pron:'[daɪˈvɜːs]',         t:'Adjektive'},
  {en:'effective',     de:'effektiv / wirksam',              pron:'[ɪˈfektɪv]',         t:'Adjektive'},
  {en:'encourage',     de:'ermutigen / fördern',             pron:'[ɪnˈkʌrɪdʒ]',        t:'Verben'},
  {en:'enthusiasm',    de:'Begeisterung / Enthusiasmus',     pron:'[ɪnˈθjuːziæzəm]',    t:'Nomen'},
  {en:'flexible',      de:'flexibel / anpassungsfähig',      pron:'[ˈfleksɪbəl]',       t:'Adjektive'},
  {en:'influence',     de:'Einfluss / beeinflussen',         pron:'[ˈɪnfluəns]',        t:'Nomen'},
  {en:'opportunity',   de:'Gelegenheit / Möglichkeit',       pron:'[ˌɒpəˈtjuːnɪti]',    t:'Nomen'},
  {en:'responsibility',de:'Verantwortung / Pflicht',         pron:'[rɪˌspɒnsɪˈbɪlɪti]', t:'Nomen'},
  {en:'significant',   de:'bedeutend / wesentlich',          pron:'[sɪɡˈnɪfɪkənt]',     t:'Adjektive'},
  {en:'enormous',      de:'riesig / enorm',                  pron:'[ɪˈnɔːməs]',         t:'Adjektive'},
  /* Beruf (10) */
  {en:'appointment',   de:'Termin',                          pron:'[əˈpɔɪntmənt]',      t:'Beruf'},
  {en:'interview',     de:'Vorstellungsgespräch',            pron:'[ˈɪntəvjuː]',        t:'Beruf'},
  {en:'salary',        de:'Gehalt / Lohn',                   pron:'[ˈsæləri]',          t:'Beruf'},
  {en:'contract',      de:'Vertrag',                         pron:'[ˈkɒntrækt]',        t:'Beruf'},
  {en:'employer',      de:'Arbeitgeber',                     pron:'[ɪmˈplɔɪər]',        t:'Beruf'},
  {en:'employee',      de:'Arbeitnehmer / Angestellter',     pron:'[ɪmˈplɔɪiː]',        t:'Beruf'},
  {en:'profession',    de:'Beruf / Profession',              pron:'[prəˈfɛʃən]',        t:'Beruf'},
  {en:'application',   de:'Bewerbung / Antrag',              pron:'[ˌæplɪˈkeɪʃən]',     t:'Beruf'},
  {en:'promotion',     de:'Beförderung',                     pron:'[prəˈməʊʃən]',       t:'Beruf'},
  {en:'resign',        de:'kündigen / zurücktreten',         pron:'[rɪˈzaɪn]',          t:'Beruf'},
  /* Reisen (10) */
  {en:'passenger',     de:'Fahrgast / Passagier',            pron:'[ˈpæsɪndʒər]',       t:'Reisen'},
  {en:'luggage',       de:'Gepäck',                          pron:'[ˈlʌɡɪdʒ]',          t:'Reisen'},
  {en:'destination',   de:'Reiseziel / Zielort',             pron:'[ˌdestɪˈneɪʃən]',    t:'Reisen'},
  {en:'departure',     de:'Abfahrt / Abflug',                pron:'[dɪˈpɑːtʃər]',       t:'Reisen'},
  {en:'arrival',       de:'Ankunft',                         pron:'[əˈraɪvəl]',         t:'Reisen'},
  {en:'reservation',   de:'Reservierung / Buchung',          pron:'[ˌrezəˈveɪʃən]',     t:'Reisen'},
  {en:'suitcase',      de:'Koffer',                          pron:'[ˈsuːtkeɪs]',        t:'Reisen'},
  {en:'passport',      de:'Reisepass',                       pron:'[ˈpɑːspɔːt]',        t:'Reisen'},
  {en:'customs',       de:'Zoll',                            pron:'[ˈkʌstəmz]',         t:'Reisen'},
  {en:'platform',      de:'Bahnsteig',                       pron:'[ˈplætfɔːm]',        t:'Reisen'},
  /* Gesundheit (10) */
  {en:'symptom',       de:'Symptom / Anzeichen',             pron:'[ˈsɪmptəm]',         t:'Gesundheit'},
  {en:'treatment',     de:'Behandlung / Therapie',           pron:'[ˈtriːtmənt]',       t:'Gesundheit'},
  {en:'medicine',      de:'Medizin / Medikament',            pron:'[ˈmɛdɪsɪn]',         t:'Gesundheit'},
  {en:'temperature',   de:'Temperatur / Fieber',             pron:'[ˈtɛmprɪtʃər]',      t:'Gesundheit'},
  {en:'prescription',  de:'Rezept / Verschreibung',          pron:'[prɪˈskrɪpʃən]',     t:'Gesundheit'},
  {en:'allergy',       de:'Allergie',                        pron:'[ˈælədʒi]',          t:'Gesundheit'},
  {en:'surgery',       de:'Operation / Eingriff',            pron:'[ˈsɜːdʒəri]',        t:'Gesundheit'},
  {en:'recovery',      de:'Genesung / Erholung',             pron:'[rɪˈkʌvəri]',        t:'Gesundheit'},
  {en:'pharmacy',      de:'Apotheke',                        pron:'[ˈfɑːməsi]',         t:'Gesundheit'},
  {en:'emergency',     de:'Notfall',                         pron:'[ɪˈmɜːdʒənsi]',      t:'Gesundheit'}
],

/* ================================================================
   PRONOUNS – 8 Reflexivpronomen
   ================================================================ */
PRONOUNS: [
  {pre:'She hurt',              post:'when she fell.',         ans:'herself',    type:'reflexive', de:'Sie hat sich verletzt, als sie fiel.'},
  {pre:'He introduced',        post:'to the class.',          ans:'himself',    type:'reflexive', de:'Er stellte sich der Klasse vor.'},
  {pre:'They enjoyed',         post:'at the party.',          ans:'themselves', type:'reflexive', de:'Sie haben sich auf der Party amüsiert.'},
  {pre:'I taught',             post:'how to play guitar.',    ans:'myself',     type:'reflexive', de:'Ich habe mir selbst Gitarre beigebracht.'},
  {pre:'Can you do it',        post:'?',                      ans:'yourself',   type:'reflexive', de:'Kannst du es selbst machen?'},
  {pre:'The cat cleaned',      post:'after eating.',          ans:'itself',     type:'reflexive', de:'Die Katze putzte sich nach dem Fressen.'},
  {pre:'We should be proud of',post:'.',                      ans:'ourselves',  type:'reflexive', de:'Wir sollten stolz auf uns sein.'},
  {pre:'The children dressed', post:'this morning.',          ans:'themselves', type:'reflexive', de:'Die Kinder haben sich heute Morgen angezogen.'}
],

/* ================================================================
   GRAMMAR_QS – 15 Fragen (B1: Present Perfect, Passive, Conditionals)
   ================================================================ */
GRAMMAR_QS: [
  {sub:'tenses', q:'Present Perfect:\n"She ___ to Paris three times."',
   opts:['has been','have been','was','is been'], ans:0,
   rule:"Present Perfect mit 'she' → 'has been'. Für Erfahrungen im Leben."},
  {sub:'tenses', q:'Present Perfect:\n"I ___ this film before."',
   opts:['have seen','saw','had seen','see'], ans:0,
   rule:"Present Perfect: have/has + Past Participle. 'Seen' = Partizip von 'see'."},
  {sub:'tenses', q:'Present Perfect vs. Simple Past:\n"I ___ him last Monday."',
   opts:['saw','have seen','had seen','see'], ans:0,
   rule:"'Last Monday' = definiter Vergangenheitspunkt → Simple Past, nicht Present Perfect."},
  {sub:'tenses', q:'Since oder for?\n"I have known her ___ 2018."',
   opts:['since','for','from','during'], ans:0,
   rule:"'since' + Zeitpunkt (since 2018). 'for' + Zeitdauer (for three years)."},
  {sub:'tenses', q:'Present Perfect Continuous:\n"How long ___ learning English?"',
   opts:['have you been','are you','have you','did you'], ans:0,
   rule:"Present Perfect Continuous: have/has + been + Verb-ing. Für anhaltende Aktivitäten."},
  {sub:'tenses', q:'First Conditional:\n"If it ___ tomorrow, we will cancel the trip."',
   opts:['rains','will rain','rained','is raining'], ans:0,
   rule:"First Conditional: If + Present Simple, will + Infinitiv. Im if-Satz kein 'will'!"},
  {sub:'tenses', q:'Second Conditional:\n"If I ___ rich, I would travel the world."',
   opts:['were','was','am','will be'], ans:0,
   rule:"Second Conditional: If + Past Simple ('were' für alle Personen), would + Infinitiv."},
  {sub:'tenses', q:'Third Conditional:\n"If she had studied, she ___ the exam."',
   opts:['would have passed','would pass','will have passed','had passed'], ans:0,
   rule:"Third Conditional: If + Past Perfect, would have + Past Participle."},
  {sub:'satzbau', q:'Passive Voice – Simple Past:\n"They built the bridge in 1990."',
   opts:['The bridge was built in 1990.','The bridge were built in 1990.','The bridge is built in 1990.','The bridge builds in 1990.'], ans:0,
   rule:"Passive Simple Past: was/were + Past Participle. 'bridge' Singular → 'was built'."},
  {sub:'satzbau', q:'Passive Voice – Simple Present:\n"They deliver the letters every morning."',
   opts:['The letters are delivered every morning.','The letters is delivered every morning.','The letters were delivered every morning.','The letters deliver every morning.'], ans:0,
   rule:"Passive Simple Present (Plural): are + Past Participle. 'Letters' → 'are delivered'."},
  {sub:'satzbau', q:'Relativsatz:\n"The woman ___ lives next door is a doctor."',
   opts:['who','which','whose','whom'], ans:0,
   rule:"'who' für Personen, 'which' für Sachen/Tiere. 'whose' = wessen."},
  {sub:'satzbau', q:'Reported Speech:\n"She said: \'I am tired.\'" → She said that she ___.',
   opts:['was tired','is tired','were tired','has been tired'], ans:0,
   rule:"Reported Speech: Präsens → Präteritum ('is' → 'was'). Backshift nennt man das."},
  {sub:'satzbau', q:'Gerundium oder Infinitiv:\n"She enjoys ___ to music."',
   opts:['listening','to listen','listen','listened'], ans:0,
   rule:"Nach 'enjoy' folgt immer das Gerundium (-ing): enjoy listening, enjoy playing..."},
  {sub:'tenses', q:'Ergänze das richtige Passiv:\n"The windows ___ cleaned yesterday."',
   opts:['were','are','have been','was'], ans:0,
   rule:"Passive Simple Past (Plural): were + Past Participle. 'Windows' → Plural → 'were cleaned'."},
  {sub:'satzbau', q:'Passiv – Frage:\n"___ the concert cancelled?"',
   opts:['Was','Were','Is','Has'], ans:0,
   rule:"Passive Frage Simple Past (Singular): Was + Subjekt + Partizip? 'Concert' → singular → 'Was the concert cancelled?'"}
],

/* ================================================================
   EXAM_QS – 13 Prüfungsfragen (B1)
   ================================================================ */
EXAM_QS: [
  {sub:'intro', q:'Wie drückst du höflich deine Meinung aus?',
   opts:['In my opinion, ...','I am thinking that ...','My opinion is ...','I think so that ...'], ans:0,
   rule:"'In my opinion' ist eine feste Redewendung für höfliche Meinungsäußerung."},
  {sub:'intro', q:'Vollende höflich:\n"I ___ that renewable energy is the future."',
   opts:['believe','am believing','belive','believes'], ans:0,
   rule:"'Believe' ist ein Stativverb – kein Continuous! Richtig: 'I believe that...'"},
  {sub:'intro', q:'Vervollständige:\n"I have been interested in photography ___ I was twelve."',
   opts:['since','for','from','during'], ans:0,
   rule:"'since' + Zeitpunkt (since I was twelve). 'for' + Zeitdauer (for five years)."},
  {sub:'intro', q:'Höfliche Ablehnung:\n"I\'m sorry, but I ___ make it to the meeting tomorrow."',
   opts:["won't be able to","can't to","am not able","don't can"], ans:0,
   rule:"Verneinung von 'can' für die Zukunft: won't be able to. 'Can't to' ist falsch."},
  {sub:'family', q:'Vergleichssatz:\n"London is ___ than Munich."',
   opts:['bigger','more big','biger','most big'], ans:0,
   rule:"Einsilbige Adjektive: Komparativ mit -er (bigger). Nicht 'more big'."},
  {sub:'family', q:'Superlativ:\n"It was ___ film I\'ve ever seen."',
   opts:['the most boring','the more boring','the borringest','most boring'], ans:0,
   rule:"Mehrsilbige Adjektive: Superlativ mit 'the most'. 'Boring' → the most boring."},
  {sub:'family', q:'Beschreibe ein Familienmitglied:\n"My sister ___ as a nurse for ten years."',
   opts:['has worked','is working','works','worked'], ans:0,
   rule:"Present Perfect für Erfahrungen mit Zeitdauer: has worked for ten years."},
  {sub:'family', q:'Beziehung beschreiben:\n"My parents ___ married for 30 years."',
   opts:['have been','are','were','had been'], ans:0,
   rule:"Anhaltender Zustand bis heute → Present Perfect: have been married for 30 years."},
  {sub:'home', q:'Wohnbeschreibung:\n"The flat ___ two bedrooms and a large living room."',
   opts:['consists of','is consisting of','consists with','consisting of'], ans:0,
   rule:"'consist of' ist ein Stativverb – kein Continuous. Richtig: 'consists of'."},
  {sub:'home', q:'Gegensatz:\n"The flat is small. ___, the location is perfect."',
   opts:['However','Despite','Although','Because'], ans:0,
   rule:"'However' verbindet zwei gegensätzliche Hauptsätze. 'Despite/Although' brauchen andere Struktur."},
  {sub:'home', q:'Lage beschreiben:\n"My house ___ between the park and the school."',
   opts:['is situated','situated','is situating','situates'], ans:0,
   rule:"'be situated' = gelegen sein. Passiv-Konstruktion: is situated between..."},
  {sub:'directions', q:'Wegbeschreibung:\n"Keep ___ until you reach the crossroads."',
   opts:['going straight','to go straight','go straight','going straightly'], ans:0,
   rule:"Nach 'keep' folgt das Gerundium: keep going, keep walking, keep trying."},
  {sub:'directions', q:'Entfernung ausdrücken:\n"The station is ___ ten minutes on foot."',
   opts:['about','around','approximately','roughly'], ans:0,
   rule:"Alle vier sind korrekt, aber 'about' ist die häufigste und natürlichste Variante im gesprochenen Englisch."}
]

}; // END DATA_MEDIUM
