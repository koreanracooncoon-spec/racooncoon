// =====================================================================
//  data_en.js — 영어판 내용 (한국어판은 data.js)
//  ─────────────────────────────────────────────
//  ① TEXTS      : 제목, 버튼 문구, 훈수 멘트, 로딩 멘트 등
//  ② AXES       : 성향 4축 이름
//  ③ QUESTIONS  : 질문 40개 (축마다 10개, 테스트마다 3개씩 랜덤 출제)
//  ④ CHARACTERS : 캐릭터 40명 (그림은 images/en/{id}.png)
//
//  ✏️ 고칠 때 규칙은 data.js 와 같아요.
//   - 따옴표 " " 안의 글자만 바꾸세요. 따옴표와 쉼표(,)는 지우면 안 돼요.
//   - 글 안에 큰따옴표를 쓰고 싶으면 앞에 역슬래시를 붙여 \" 처럼 쓰세요.
// =====================================================================

const EN = {};


// ① 화면 곳곳의 문구 ---------------------------------------------------
EN.TEXTS = {
  title: "What Were You in a Past Life?",
  subtitle: "The History Fate Test",
  intro: "12 questions. One past life. Results are final and we take zero responsibility lol",
  startButton: "Reveal my fate",

  // 진행률 바 옆 멘트 (1번 문제부터 12번 문제까지 순서대로)
  progressComments: [
    "Well begun is half done. That's a lie.",
    "Still warming up",
    "Getting the hang of it?",
    "Not even halfway lol",
    "Too late to quit now",
    "Exactly halfway. For real.",
    "Past halfway. Applause.",
    "Quitting now would be a waste",
    "Almost there (lie)",
    "OK, actually almost there",
    "One left. Wait, two.",
    "Last one. For real this time."
  ],

  // 선택지 고르면 구석에서 튀어나오는 훈수
  kibitz: [
    "You picked THAT?",
    "Hmm… figures",
    "So you.",
    "Your ancestors are watching",
    "Noted.",
    "That's… a choice",
    "Ooh, didn't expect that",
    "Called it",
    "Your fate just shifted",
    "I wouldn't, but OK",
    "Love the honesty",
    "No comment."
  ],

  // 결과 로딩 멘트 (랜덤으로 나옴)
  loading: [
    "Asking your ancestors…",
    "Refueling the time machine…",
    "Calculating your fate… oh no",
    "Digging through the family tree…",
    "Peeking at the history books…",
    "Restoring past-life footage… low quality"
  ],
  loadingStuck: "99%… your ancestors put us on hold",

  // 운 질문이 나올 때만 질문 위에 뜨는 안내 (** ** 로 감싼 부분은 굵게 표시돼요)
  luckNotice: "🍀 This one's a luck question! Don't think about this week — think about **your usual luck**.",

  resultLabel: "In a past life, you were…",
  noImage: "the artist hasn't drawn this one yet lol",
  historyTitle: "📜 Real history",
  matchTitle: "🤝 Best match",
  enemyTitle: "⚔️ Nemesis",
  chartTitle: "📊 Your vibe (brutally honest)",
  tapToSkip: "(tap to skip)",

  jobTitle: "💼 Job",
  moneyTitle: "💰 Net worth",
  dayTitle: "🕰️ Daily routine",
  dangerTitle: "☠️ Death flag risk",

  shareButton: "Spread it to friends (copy)",
  copied: "Copied. Your friends deserve this too",
  copyFailed: "Couldn't copy. Please copy this yourself:",
  retryButton: "I refuse this fate (try again)",
  shareMyResult: "My past life",
  shareDanger: "Death flag",
  shareMatch: "Best match",
  shareEnemy: "Nemesis",
  shareEnding: "Your turn. I'm not suffering alone.",

  footer: "We collect anonymous data for visitor statistics"
};


// ② 성향 4축 (left = -2 쪽, right = +2 쪽) ----------------------------
EN.AXES = {
  conscience: { name: "Conscience", left: "Morals optional",      right: "Does the right thing, even at a loss" },
  action:     { name: "Action",     left: "Reads the room first", right: "Charges in first" },
  desire:     { name: "Desire",     left: "Glory, meaning & art", right: "Money, obviously" },
  luck:       { name: "Luck",       left: "Cursed timing",        right: "Perfect timing" }
};


// ③ 질문 40개 -----------------------------------------------------------
//  axis  : 이 질문이 재는 축 (conscience / action / desire / luck)
//  score : 그 선택지를 고르면 받는 점수 (-2, -1, 1, 2 중 하나, 화면엔 안 보임)
EN.QUESTIONS = [

  // ───────── 1. Conscience (+2 do the right thing ↔ -2 morals optional) ─────────
  { axis: "conscience", q: "You find a $20 bill on the sidewalk.", options: [
    { text: "Hand it in at the closest store, just in case", score: 2 },
    { text: "Leave it. Not my money, not my problem", score: 1 },
    { text: "Quick look around. Pocket.", score: -1 },
    { text: "Scan the ground for a matching wallet", score: -2 }
  ]},
  { axis: "conscience", q: "At self-checkout, the scanner missed your avocado.", options: [
    { text: "Walk back and scan it", score: 2 },
    { text: "Mention it to the attendant on the way out", score: 1 },
    { text: "The machine had its chance", score: -1 },
    { text: "Honestly, at self-checkout everything is \"bananas\"", score: -2 }
  ]},
  { axis: "conscience", q: "Your friend shows you their new haircut. \"Be honest.\"", options: [
    { text: "\"Honestly? It'll grow back.\"", score: 2 },
    { text: "\"The color is really nice…\"", score: 1 },
    { text: "\"OMG, obsessed!\"", score: -1 },
    { text: "\"Send me your barber's number\" (you will never call)", score: -2 }
  ]},
  { axis: "conscience", q: "40 minutes into a coffee line, someone casually cuts in front of you.", options: [
    { text: "\"Hey, the line starts back there.\"", score: 2 },
    { text: "Quietly let the barista know", score: 1 },
    { text: "Stare at the back of their head. Aggressively.", score: -1 },
    { text: "Act like you're with them and cut too", score: -2 }
  ]},
  { axis: "conscience", q: "You broke the office microwave. Nobody saw.", options: [
    { text: "Email the whole office right away", score: 2 },
    { text: "Admit it if someone asks", score: 1 },
    { text: "Tape an \"out of order\" sign on it and walk away", score: -1 },
    { text: "Post in Slack: \"Anyone know who used it last?\"", score: -2 }
  ]},
  { axis: "conscience", q: "You split a Netflix account with three friends. It's payment day.", options: [
    { text: "Venmo my share first, with a cute emoji", score: 2 },
    { text: "Pay as soon as someone reminds me", score: 1 },
    { text: "\"Forget\" for a month and see what happens", score: -1 },
    { text: "I'm the one collecting, so I round everything up in my favor", score: -2 }
  ]},
  { axis: "conscience", q: "A classmate offers you a leaked copy of the exam.", options: [
    { text: "\"No. And maybe don't share that.\"", score: 2 },
    { text: "Politely pass", score: 1 },
    { text: "\"I'll just… glance at it.\"", score: -1 },
    { text: "\"Can you get next semester's too?\"", score: -2 }
  ]},
  { axis: "conscience", q: "One outlet left at the café. The stranger next to you is at 3% battery.", options: [
    { text: "Offer it to them right away", score: 2 },
    { text: "Share if they ask", score: 1 },
    { text: "Plug in fast and avoid eye contact", score: -1 },
    { text: "Spread my stuff around so it looks taken", score: -2 }
  ]},
  { axis: "conscience", q: "The waiter forgot to put your dessert on the bill.", options: [
    { text: "Tell them before paying", score: 2 },
    { text: "Leave a bigger tip to make up for it", score: 1 },
    { text: "Free dessert. The universe provides.", score: -1 },
    { text: "Order another one before they notice", score: -2 }
  ]},
  { axis: "conscience", q: "\"Leave a 5-star review, get a free drink!\" The food was… meh.", options: [
    { text: "Write an honest 3-star review, skip the drink", score: 2 },
    { text: "Four stars, very polite", score: 1 },
    { text: "Five stars. Enjoy the drink.", score: -1 },
    { text: "Five stars from me AND from my mom's account", score: -2 }
  ]},

  // ───────── 2. Action (+2 charge first ↔ -2 read the room) ─────────
  { axis: "action", q: "Everyone left your message in the group chat on read.", options: [
    { text: "Send \"??\" immediately", score: 2 },
    { text: "Drop a meme to revive the chat", score: 1 },
    { text: "Wait it out and see if someone answers", score: -1 },
    { text: "Mute the chat and overthink it for an hour", score: -2 }
  ]},
  { axis: "action", q: "You're at a party where you don't know anyone.", options: [
    { text: "Walk up to the loudest group and introduce myself", score: 2 },
    { text: "Compliment a stranger's shoes to start a chat", score: 1 },
    { text: "Hover near the snacks until someone talks to me", score: -1 },
    { text: "Watch for a while to figure out who's who first", score: -2 }
  ]},
  { axis: "action", q: "You start a new video game.", options: [
    { text: "Skip the tutorial. I'll figure it out.", score: 2 },
    { text: "Jump in, check tips when I get stuck", score: 1 },
    { text: "Do the whole tutorial, properly", score: -1 },
    { text: "Watch a full YouTube guide before pressing Start", score: -2 }
  ]},
  { axis: "action", q: "Your flat-pack furniture just arrived.", options: [
    { text: "Instructions are for the weak", score: 2 },
    { text: "Glance at the pictures and start building", score: 1 },
    { text: "Read the manual first", score: -1 },
    { text: "Count every screw and sort them into little piles", score: -2 }
  ]},
  { axis: "action", q: "You have a crush.", options: [
    { text: "Ask them out this week", score: 2 },
    { text: "Slide into their DMs with a meme", score: 1 },
    { text: "Like their posts for three months", score: -1 },
    { text: "Collect intel from mutual friends first", score: -2 }
  ]},
  { axis: "action", q: "Your boss says something clearly wrong in a meeting.", options: [
    { text: "\"Actually, that's not right.\" Right then and there.", score: 2 },
    { text: "Ask a very innocent \"clarifying question\"", score: 1 },
    { text: "Message them privately after the meeting", score: -1 },
    { text: "Wait and see how it plays out, then decide", score: -2 }
  ]},
  { axis: "action", q: "How do you plan a trip?", options: [
    { text: "Book the flight. Figure out the rest there.", score: 2 },
    { text: "Rough plan, lots of room to improvise", score: 1 },
    { text: "Full itinerary in a spreadsheet", score: -1 },
    { text: "Spreadsheet with backup plans for the backup plans", score: -2 }
  ]},
  { axis: "action", q: "The fire alarm goes off at work. \"Probably a drill.\"", options: [
    { text: "First one out the door", score: 2 },
    { text: "Grab my coffee and head out", score: 1 },
    { text: "Look around to see what everyone else is doing", score: -1 },
    { text: "Wait for an official email to confirm it's real", score: -2 }
  ]},
  { axis: "action", q: "You're lost in a new city and your phone is dead.", options: [
    { text: "Pick a direction and walk confidently", score: 2 },
    { text: "Ask the first person I see", score: 1 },
    { text: "Find a landmark and think it through", score: -1 },
    { text: "Find a café, charge my phone, then plan the route", score: -2 }
  ]},
  { axis: "action", q: "Two friends start arguing right in front of you.", options: [
    { text: "\"OK, both of you, stop.\"", score: 2 },
    { text: "Crack a joke to break the tension", score: 1 },
    { text: "Quietly change the subject later", score: -1 },
    { text: "Stay silent and watch how it plays out", score: -2 }
  ]},

  // ───────── 3. Desire (+2 money ↔ -2 glory & meaning) ─────────
  { axis: "desire", q: "You have two job offers.", options: [
    { text: "Way higher salary, very boring work", score: 2 },
    { text: "Good pay, decent work", score: 1 },
    { text: "Less pay, but genuinely interesting", score: -1 },
    { text: "Half the pay, but it's my dream job", score: -2 }
  ]},
  { axis: "desire", q: "The best birthday gift is…", options: [
    { text: "Cash. Simple. Effective.", score: 2 },
    { text: "A gift card to somewhere I like", score: 1 },
    { text: "Something they made themselves", score: -1 },
    { text: "A heartfelt handwritten letter", score: -2 }
  ]},
  { axis: "desire", q: "Your post goes viral. 1 million views.", options: [
    { text: "Monetize it. Today.", score: 2 },
    { text: "Plug my side hustle in the comments", score: 1 },
    { text: "Screenshot it for the group chat", score: -1 },
    { text: "Just happy people liked it (and hoping it gets me remembered)", score: -2 }
  ]},
  { axis: "desire", q: "You win the lottery jackpot. First move?", options: [
    { text: "Invest it and make it even bigger", score: 2 },
    { text: "Pay off my debts and buy a house", score: 1 },
    { text: "Quit my job and travel the world", score: -1 },
    { text: "Start a foundation with my name on it", score: -2 }
  ]},
  { axis: "desire", q: "What goes on your tombstone?", options: [
    { text: "\"Died rich.\"", score: 2 },
    { text: "\"Never had to check prices.\"", score: 1 },
    { text: "\"Made people laugh.\"", score: -1 },
    { text: "\"They'll write books about this one.\"", score: -2 }
  ]},
  { axis: "desire", q: "A friend says, \"Let's start a business.\" Your first question?", options: [
    { text: "\"What's the profit margin?\"", score: 2 },
    { text: "\"How much do I have to put in?\"", score: 1 },
    { text: "\"Will it be fun?\"", score: -1 },
    { text: "\"Will it change the world?\"", score: -2 }
  ]},
  { axis: "desire", q: "You won a contest and get to pick your prize.", options: [
    { text: "$5,000 cash, no photo needed", score: 2 },
    { text: "$2,000 and a small shout-out", score: 1 },
    { text: "A giant trophy and a press release", score: -1 },
    { text: "No money, but my name on a building forever", score: -2 }
  ]},
  { axis: "desire", q: "The art you make for fun starts selling.", options: [
    { text: "Raise the prices and scale up", score: 2 },
    { text: "Nice side income", score: 1 },
    { text: "Keep prices low so more people can enjoy it", score: -1 },
    { text: "Stop selling. It's art, not a product.", score: -2 }
  ]},
  { axis: "desire", q: "Your 10-year high school reunion. What are you most curious about?", options: [
    { text: "Who's making the most money", score: 2 },
    { text: "Who bought a house", score: 1 },
    { text: "Who's doing something cool", score: -1 },
    { text: "Whether people still talk about my legendary moment", score: -2 }
  ]},
  { axis: "desire", q: "\"If you could only have one thing in life?\"", options: [
    { text: "Unlimited money", score: 2 },
    { text: "Financial security, forever", score: 1 },
    { text: "Doing what I love every day", score: -1 },
    { text: "Being remembered forever", score: -2 }
  ]},

  // ───────── 4. Luck (+2 perfect timing ↔ -2 cursed timing) ─────────
  //  운 질문이 나올 때는 TEXTS.luckNotice 안내 문구가 질문 위에 떠요.
  { axis: "luck", q: "You pick a checkout line at the grocery store.", options: [
    { text: "Mine always moves fastest", score: 2 },
    { text: "Usually fine", score: 1 },
    { text: "I tend to pick the slow one", score: -1 },
    { text: "The second I join, the register breaks", score: -2 }
  ]},
  { axis: "luck", q: "You finally buy something expensive.", options: [
    { text: "The price goes up the next day", score: 2 },
    { text: "Nothing happens. Normal purchase.", score: 1 },
    { text: "It goes on sale a week later", score: -1 },
    { text: "The new model gets announced the next morning", score: -2 }
  ]},
  { axis: "luck", q: "The forecast says rain.", options: [
    { text: "It only rains while I'm indoors", score: 2 },
    { text: "I brought an umbrella and needed it", score: 1 },
    { text: "I forgot my umbrella and got soaked", score: -1 },
    { text: "Umbrella day: sunny. No-umbrella day: storm.", score: -2 }
  ]},
  { axis: "luck", q: "You guess on a multiple-choice test.", options: [
    { text: "My guesses are weirdly always right", score: 2 },
    { text: "About 50/50", score: 1 },
    { text: "I change my answer, and my first one was right", score: -1 },
    { text: "I somehow pick the wrong one every single time", score: -2 }
  ]},
  { axis: "luck", q: "If you've ever bought stocks or crypto…", options: [
    { text: "I sold right at the top", score: 2 },
    { text: "Small profit, no complaints", score: 1 },
    { text: "I bought at the top", score: -1 },
    { text: "The market waits for me to buy, then crashes", score: -2 }
  ]},
  { axis: "luck", q: "You're waiting for a package.", options: [
    { text: "It shows up early, right when I'm home", score: 2 },
    { text: "Arrives on time", score: 1 },
    { text: "\"Sorry we missed you\" — I was home the whole time", score: -1 },
    { text: "\"Delivered\" to a porch that isn't mine", score: -2 }
  ]},
  { axis: "luck", q: "Concert tickets go on sale.", options: [
    { text: "Front row, first try", score: 2 },
    { text: "I got the nosebleed seats", score: 1 },
    { text: "\"You are number 48,000 in the queue\"", score: -1 },
    { text: "Made it to checkout, then the site crashed", score: -2 }
  ]},
  { axis: "luck", q: "You get to the bus stop.", options: [
    { text: "The bus pulls up right as I arrive", score: 2 },
    { text: "A few minutes' wait", score: 1 },
    { text: "I watch it pull away", score: -1 },
    { text: "40 minutes later, two show up at once", score: -2 }
  ]},
  { axis: "luck", q: "You order at a restaurant.", options: [
    { text: "My dish is the best one at the table", score: 2 },
    { text: "It's fine", score: 1 },
    { text: "Instant food envy", score: -1 },
    { text: "They're out of it, and the backup is worse", score: -2 }
  ]},
  { axis: "luck", q: "A deadline is coming up.", options: [
    { text: "It gets extended right as I start to panic", score: 2 },
    { text: "I finish just in time", score: 1 },
    { text: "Something breaks the night before", score: -1 },
    { text: "My laptop dies 5 minutes before I submit", score: -2 }
  ]}
];


// ④ 캐릭터 40명 ---------------------------------------------------------
//  scores    : 성향 4축 점수 (각각 -2 ~ +2)
//  bias      : 결과 쏠림 보정값 (숫자가 클수록 덜 나옴, 작을수록 더 나옴)
//              사람들이 중간·착한 답을 많이 고르는 걸 감안해서 시뮬레이션으로 정한 값이에요.
//              scores 를 바꾸면 이 값도 다시 계산해야 해요.
//  danger    : 사망 플래그 위험도 (별 1~5개)
//  match / enemy : 찰떡 궁합 / 천적 캐릭터의 id 와 이유
EN.CHARACTERS = [

  // ───────── Ancient Egypt ─────────
  {
    id: "egypt_pyramid_builder", era: "Ancient Egypt", name: "Pyramid Builder", emoji: "🧱",
    scores: { conscience: 1, action: 1, desire: 0, luck: -2 }, bias: -0.35,
    signature: "Paid in bread and beer. The block landed on my foot. Again.",
    intro: "Hi, I move 2-ton blocks for a living. No, I'm not a slave, thanks for asking — I get paid. In bread. And beer. The pharaoh gets eternity, I get a sore back and a very specific beer belly.",
    job: "Construction crew member, Giza Pyramid Project",
    money: "Daily rations of bread and beer, plus a spot in the workers' village",
    moneyNow: "Roughly a minimum-wage job with free lunch and unlimited beer (very rough estimate)",
    day: "Sunrise: haul stone. Noon: haul stone. Sunset: beer with the crew, complain about the boss",
    danger: 4, dangerNote: "OSHA did not exist",
    history: "Most historians now think the Giza pyramids were built by paid workers, not slaves. Archaeologists found a whole workers' village nearby, with bakeries, breweries and workers' tombs — some even had their crew names scribbled on the stones.",
    match: { id: "medieval_serf", why: "Both breaking our backs for someone else's monument" },
    enemy: { id: "egypt_tomb_robber", why: "I spend 20 years building it. They break in over a weekend." }
  },
  {
    id: "egypt_tomb_robber", era: "Ancient Egypt", name: "Tomb Robber", emoji: "⚱️",
    scores: { conscience: -2, action: 1, desire: 2, luck: -1 }, bias: -1.1,
    signature: "The curse is just marketing.",
    intro: "Mummy's curse? Please. That's just the pharaoh's PR team. All that gold, sitting in the dark, doing nothing? I'm basically a recycling service. …Why is the ceiling making that noise?",
    job: "Freelance underground \"recovery specialist\"",
    money: "One golden scarab, two stolen vases, zero receipts",
    moneyNow: "On a good night, life-changing money. On a bad night, life-ending.",
    day: "Day: pretend to be a farmer. Night: tunnels, torches, and trying not to sneeze on the mummy",
    danger: 5, dangerNote: "Getting caught = very bad",
    history: "Historians think almost every royal tomb in Egypt was robbed in ancient times. That's why Tutankhamun's tomb, found mostly intact by Howard Carter in 1922, was such a big deal. Ancient court records even describe tomb robbery trials.",
    match: { id: "viking_raider", why: "Treasure is just lying there. It'd be rude not to." },
    enemy: { id: "egypt_pyramid_builder", why: "Keeps adding fake hallways. Rude." }
  },
  {
    id: "egypt_scribe", era: "Ancient Egypt", name: "Royal Scribe", emoji: "📜",
    scores: { conscience: 0, action: -2, desire: 1, luck: 1 }, bias: 1.14,
    signature: "Only ~1% can read. I am the 1%.",
    intro: "While everyone else is hauling rocks, I'm sitting in the shade with a reed pen. I write down the taxes, the grain, the gossip. Knowledge is power. Also my posture is terrible.",
    job: "Royal record-keeper and tax accountant",
    money: "Steady salary, a nice house, and the power to \"accidentally\" misspell your name",
    moneyNow: "A cushy government office job with great job security",
    day: "Count grain, record taxes, judge everyone's handwriting, nap",
    danger: 1, dangerNote: "Worst risk: papyrus cuts",
    history: "Historians estimate that only a tiny share of ancient Egyptians — maybe around 1% — could read and write. Scribes were an elite class. One famous text, the \"Satire of the Trades,\" basically tells students: every other job is awful, so become a scribe.",
    match: { id: "renaissance_banker", why: "Spreadsheets before spreadsheets existed" },
    enemy: { id: "egypt_tomb_robber", why: "I write the inventory. They make it shorter." }
  },

  // ───────── Ancient Greece ─────────
  {
    id: "greece_philosopher", era: "Ancient Greece", name: "Agora Philosopher", emoji: "🏛️",
    scores: { conscience: 2, action: 1, desire: -2, luck: -1 }, bias: -1.05,
    signature: "I'm not annoying, I'm *asking questions*.",
    intro: "You say you know what justice is? Interesting. And what do you mean by \"know\"? And \"is\"? …Hey, where are you going? We were just getting started. Why does everyone keep leaving?",
    job: "Full-time asker of uncomfortable questions",
    money: "One cloak, no shoes, infinite questions",
    moneyNow: "Zero income. Unpaid podcast host, basically.",
    day: "Walk to the market, corner a stranger, ask \"but WHY?\" for six hours",
    danger: 3, dangerNote: "Annoying powerful people",
    history: "Socrates spent his days questioning people in the Athenian agora. In 399 BC, a jury sentenced him to death for \"corrupting the youth\" and impiety, and he drank hemlock. He never wrote anything down — we know him mostly through his student Plato.",
    match: { id: "ww2_codebreaker", why: "Overthinking as a lifestyle" },
    enemy: { id: "greece_spartan", why: "Answers every question with \"we don't talk, we fight\"" }
  },
  {
    id: "greece_spartan", era: "Ancient Greece", name: "Spartan Warrior", emoji: "🛡️",
    scores: { conscience: 1, action: 2, desire: -1, luck: 0 }, bias: -1.0,
    signature: "Come back with your shield or on it. No pressure.",
    intro: "Training since I was seven. Cold baths, tiny meals, constant push-ups. Do I have hobbies? Yes. Standing in a line. Holding a shield. Not dying. Gym bros wish they were me.",
    job: "Professional soldier (no other career options)",
    money: "A shield, a spear, a red cloak, and a farm that other people work on",
    moneyNow: "Money was kind of frowned upon. Iron bars were used as currency to discourage greed.",
    day: "Wake up, train, eat black broth, train, sleep in barracks, repeat for 30 years",
    danger: 5, dangerNote: "That's literally the job",
    history: "Spartan boys entered a harsh military training system called the agoge from around age seven. The Battle of Thermopylae in 480 BC made them legends. \"With your shield or on it\" is a saying ancient writers like Plutarch put in the mouths of Spartan mothers.",
    match: { id: "rome_legionary", why: "Marching buddies. Neither of us has feelings." },
    enemy: { id: "greece_philosopher", why: "Too many questions. Not enough push-ups." }
  },
  {
    id: "greece_olympian", era: "Ancient Greece", name: "Ancient Olympian", emoji: "🏅",
    scores: { conscience: 0, action: 2, desire: -2, luck: 1 }, bias: -0.25,
    signature: "Prize: one olive wreath. Worth it.",
    intro: "Trained for four years, ran naked in front of thousands, and won. My prize? A crown made of leaves. Do I regret it? Absolutely not. My hometown is building me a statue. Hopefully with clothes.",
    job: "Elite athlete, sprint division",
    money: "One olive wreath (organic), plus lifetime hometown bragging rights",
    moneyNow: "The prize itself was worth nothing. The fame, though? Priceless.",
    day: "Run, wrestle, oil up, run again, eat an alarming amount of meat",
    danger: 2, dangerNote: "Unless you sign up for pankration",
    history: "Winners at the ancient Olympics (traditionally said to start in 776 BC) got only an olive wreath. But hometowns often rewarded champions with fame, statues and perks — in Athens, some victors got free meals for life.",
    match: { id: "ww2_riveter", why: "Pure effort, zero complaining" },
    enemy: { id: "rome_gladiator", why: "Both athletes. Mine ends with a wreath. Theirs ends with a lion." }
  },

  // ───────── Ancient Rome ─────────
  {
    id: "rome_legionary", era: "Ancient Rome", name: "Legionary", emoji: "⚔️",
    scores: { conscience: 1, action: 1, desire: 1, luck: 0 }, bias: 1.67,
    signature: "20 more years till retirement. Only 19 to go.",
    intro: "Marched 20 miles today carrying half my body weight. It's fine. In 20 years I get a pension and a little farm. I'm going to grow grapes. …It's 20 years, right? Someone check the contract.",
    job: "Roman infantry soldier",
    money: "225 denarii a year (under Augustus), minus food, gear, and the burial club fee",
    moneyNow: "If a denarius ≈ a day's pay for a worker, it's a modest working salary (very rough, depends on how you compare)",
    day: "Wake at dawn, march all day, dig a fort, build a fence, sleep, repeat",
    danger: 4, dangerNote: "It's in the job description",
    history: "Under Emperor Augustus, a legionary earned about 225 denarii a year and served around 20 years. At the end, they got a retirement bonus — cash or land. Legionaries were also famous for building roads, forts and walls, not just fighting.",
    match: { id: "greece_spartan", why: "Two people who think marching is a personality" },
    enemy: { id: "rome_senator", why: "I fight their wars. They keep \"forgetting\" my pension." }
  },
  {
    id: "rome_senator", era: "Ancient Rome", name: "Senator", emoji: "🍇",
    scores: { conscience: -1, action: -1, desire: 2, luck: 1 }, bias: 0,
    signature: "Real politics happens at dinner.",
    intro: "Speeches in the Senate are for show, darling. The real deals happen over dinner, lying on a couch, eating stuffed dormice. I'm not allowed to run a business, so my freedman does. Wink.",
    job: "Member of the Roman Senate, professional dinner-party schemer",
    money: "At least 1 million sesterces (legally required), several villas, \"business associates\"",
    moneyNow: "Old-money rich. Generational wealth, private estates, the works.",
    day: "Morning: greet clients. Afternoon: Senate, mostly listening. Evening: dinner deals until midnight",
    danger: 3, dangerNote: "Politics in Rome could get stabby",
    history: "Under Augustus, senators had to own property worth at least 1 million sesterces. An old law (218 BC) banned senators from owning big trading ships, so many made money through agents and freed slaves instead.",
    match: { id: "medieval_evil_lord", why: "Fellow fans of taxing other people" },
    enemy: { id: "rome_legionary", why: "Keeps asking about that pension at dinner. So awkward." }
  },
  {
    id: "rome_gladiator", era: "Ancient Rome", name: "Gladiator", emoji: "🗡️",
    scores: { conscience: 0, action: 2, desire: -1, luck: -2 }, bias: 0,
    signature: "The crowd loves me. I'd love to go home.",
    intro: "Fifty thousand people screaming my name. Fans paint my face on walls. Sounds great, right? I just want my freedom and maybe a quiet bakery somewhere. The lion did not get that memo.",
    job: "Arena fighter (fame: high, job security: questionable)",
    money: "Prize money from wins, gifts from fans, but legally owned by my trainer",
    moneyNow: "Celebrity fame, entry-level pay",
    day: "Train, eat barley porridge, get massaged, train, hope there's no show tomorrow",
    danger: 5, dangerNote: "The job is literally fighting",
    history: "Star gladiators were celebrities — fans scratched graffiti of them on walls in Pompeii. A gladiator could win freedom and receive a wooden sword called the rudis. Historians think many fights didn't end in death, since trained gladiators were expensive.",
    match: { id: "industrial_luddite", why: "Both fighting a system we didn't sign up for" },
    enemy: { id: "rome_senator", why: "They paid for the show. I AM the show." }
  },

  // ───────── Viking Age ─────────
  {
    id: "viking_raider", era: "Viking Age", name: "Viking Raider", emoji: "🪓",
    scores: { conscience: -2, action: 2, desire: 1, luck: 1 }, bias: -1.0,
    signature: "Monasteries leave the gold just lying around.",
    intro: "Big boat. Fast boat. We row in, grab the shiny stuff, row out before anyone finds their sword. And no, I don't wear horns on my helmet. That would be ridiculous. Who started that rumor?",
    job: "Seasonal raider, part-time farmer",
    money: "Silver, a few gold cups, and an extremely nice axe",
    moneyNow: "Highly seasonal income. Summers are great.",
    day: "Spring: plant crops. Summer: raid. Autumn: brag. Winter: brag louder",
    danger: 5, dangerNote: "Everyone is mad at you",
    history: "The 793 raid on the monastery at Lindisfarne in England is often treated as the start of the Viking Age. Fun fact: Vikings did not wear horned helmets — that image mostly came from 19th-century opera costumes for Wagner's Ring cycle.",
    match: { id: "egypt_tomb_robber", why: "Same business model, better boat" },
    enemy: { id: "medieval_monk_brewer", why: "Hides the good stuff before we arrive" }
  },
  {
    id: "viking_explorer", era: "Viking Age", name: "Viking Explorer", emoji: "⛵",
    scores: { conscience: 0, action: 1, desire: -2, luck: -2 }, bias: 0,
    signature: "Found a whole new continent. Nobody cared.",
    intro: "So I sailed west, found a whole new continent, named it after the grapes, built some houses. Then we left. Nobody back home really cared. 500 years later, some guy named Columbus gets the credit. Cool. Cool cool cool.",
    job: "Explorer, accidental continent discoverer",
    money: "One longship, some timber, and grapes nobody believes exist",
    moneyNow: "Got basically no money from it. Got a statue 1,000 years later.",
    day: "Sail into fog, hope there's land, find land, nobody claps",
    danger: 4, dangerNote: "The North Atlantic is not friendly",
    history: "Leif Erikson reached North America around the year 1000, calling part of it Vinland. Viking remains at L'Anse aux Meadows in Newfoundland, Canada — discovered in 1960 — proved Norse people really were there about 500 years before Columbus.",
    match: { id: "voyage_sailor", why: "Long trips, bad food, no credit" },
    enemy: { id: "viking_skald", why: "Wrote a poem about my trip. Made himself the hero." }
  },
  {
    id: "viking_skald", era: "Viking Age", name: "Skald", emoji: "🎤",
    scores: { conscience: -1, action: -2, desire: 1, luck: 2 }, bias: -0.4,
    signature: "My epic poems are available for any king. Rates negotiable.",
    intro: "I'm a poet. Kings pay me to make them sound brave and handsome. Is it true? Doesn't matter. Pay me in gold rings and I'll make your little cousin's boat trip sound like a battle against a dragon.",
    job: "Royal court poet / professional hype man",
    money: "Gold arm rings, a seat by the fire, free mead",
    moneyNow: "An influencer with exactly one sponsor: the king",
    day: "Sleep in, write a flattering poem, perform at dinner, collect gold rings",
    danger: 2, dangerNote: "Unless the king hates the poem",
    history: "Skalds were Norse poets who composed verses praising kings and nobles, and they were rewarded with gifts like gold rings. One saga tells how the poet Egil Skallagrímsson saved his own life by composing a praise poem overnight for a king who wanted him dead.",
    match: { id: "french_printer", why: "We both know how to write for whoever's paying" },
    enemy: { id: "viking_explorer", why: "Refuses to pay for their own epic. Cheap." }
  },

  // ───────── Medieval Europe ─────────
  {
    id: "medieval_serf", era: "Medieval Europe", name: "Serf", emoji: "🌾",
    scores: { conscience: 1, action: -1, desire: 0, luck: -2 }, bias: 4.06,
    signature: "I grew this wheat. It is not my wheat.",
    intro: "I work my lord's fields three days a week, for free. Then I pay to use his mill. Then I pay the church. Then it rains on my harvest. I'm not complaining. OK, I'm complaining a little.",
    job: "Peasant farmer, legally tied to the land",
    money: "A small strip of land, one goat, some turnips",
    moneyNow: "Barely survival level. Owed half your life to someone else.",
    day: "Wake up before sunrise, plow, pay a fee, plow more, sleep on a straw bed",
    danger: 3, dangerNote: "Famine, plague, and the lord's mood",
    history: "Under the manorial system, serfs were bound to their lord's land. They owed him unpaid labor, fees to use his mill and oven, and gave a tenth of their produce (the tithe) to the church. Leaving without permission wasn't allowed.",
    match: { id: "ww2_civilian", why: "Not heroes. Just surviving, with vegetables." },
    enemy: { id: "medieval_evil_lord", why: "Invents a new tax every week" }
  },
  {
    id: "medieval_evil_lord", era: "Medieval Europe", name: "Greedy Lord", emoji: "🏰",
    scores: { conscience: -2, action: 1, desire: 2, luck: 1 }, bias: -1.65,
    signature: "New tax just dropped.",
    intro: "Bread tax. Mill tax. Breathing near my castle tax. The peasants say I'm greedy. I say I'm a creative financial thinker. …Why are they holding pitchforks? Is that a tax protest?",
    job: "Feudal landlord, part-time tax inventor",
    money: "One castle, several villages, everyone's wheat",
    moneyNow: "Very rich, but your entire fortune depends on angry farmers",
    day: "Morning: count money. Afternoon: invent a tax. Evening: feast while peasants watch",
    danger: 3, dangerNote: "Peasant revolt incoming",
    history: "In 1381, England's Peasants' Revolt broke out after a series of heavy poll taxes. Rebels marched on London, and for a moment it looked like they might win. The king promised reforms — and then mostly took them back.",
    match: { id: "rome_senator", why: "Fellow fans of taxing other people" },
    enemy: { id: "medieval_serf", why: "Keeps staring at my castle with a pitchfork" }
  },
  {
    id: "medieval_monk_brewer", era: "Medieval Europe", name: "Monk Brewer", emoji: "🍺",
    scores: { conscience: 1, action: -2, desire: -1, luck: 1 }, bias: 1.03,
    signature: "Pray, work, taste-test. For quality control.",
    intro: "I wake up at 3 a.m. to pray, copy books, tend the garden, and brew beer. For the guests, of course. And for quality control. Very serious quality control. Several times a day.",
    job: "Monk, master brewer, very careful taste-tester",
    money: "Owns nothing personally. Has access to the monastery's beer cellar.",
    moneyNow: "Zero salary. Free housing, free food, free beer. Honestly not bad.",
    day: "3am prayer, work, prayer, brew, prayer, \"quality control\", bed at sunset",
    danger: 1, dangerNote: "Low, until the Vikings show up",
    history: "Benedictine monks lived by a rule often summed up as \"pray and work\" (ora et labora). Many monasteries brewed beer for monks and guests. Some Trappist monasteries still brew beer today and sell it to support their community.",
    match: { id: "twenties_bootlegger", why: "Same product. Very different paperwork." },
    enemy: { id: "viking_raider", why: "Keeps showing up uninvited. Doesn't bring snacks." }
  },
  {
    id: "medieval_plague_doctor", era: "Plague Europe", name: "Plague Doctor", emoji: "🧪",
    scores: { conscience: 2, action: 1, desire: 0, luck: -1 }, bias: 0,
    signature: "The beak is full of herbs. It does nothing. I'm still here.",
    intro: "Everyone's running away from the plague, and I'm running toward it. The beak? Stuffed with herbs to block the bad air. Does it work? Absolutely not. But the city hired me, so here I am.",
    job: "City-hired plague doctor",
    money: "A city salary, one terrifying mask, and danger pay",
    moneyNow: "Decent pay — the problem is that you might not live to spend it",
    day: "Visit sick houses, write down who has the plague, avoid everyone else",
    danger: 5, dangerNote: "Walking into the plague. On purpose.",
    history: "The famous beaked mask appears in 17th-century records. Doctors stuffed the beak with herbs and spices, believing disease spread through \"bad air.\" Cities hired plague doctors to treat victims and record deaths — a dangerous job.",
    match: { id: "ww2_resistance", why: "Both show up when everyone else runs" },
    enemy: { id: "west_snake_oil", why: "We both sell cures that don't work. But I at least show up." }
  },

  // ───────── Renaissance ─────────
  {
    id: "renaissance_banker", era: "Renaissance Italy", name: "Florentine Banker", emoji: "💰",
    scores: { conscience: 0, action: -2, desire: 2, luck: 1 }, bias: 2.07,
    signature: "I don't do feelings. I do ledgers.",
    intro: "Popes, kings, painters — everyone needs a loan eventually. I just sit here, write in my ledger, and wait. Sure, I fund art. Art is great. You know what's greater? Interest rates.",
    job: "Banker to the rich, famous and holy",
    money: "Gold florins, branch offices across Europe, a few artists on the payroll",
    moneyNow: "Modern billionaire private banker, with art collector energy",
    day: "Check the books, charm a cardinal, fund a statue, check the books again",
    danger: 2, dangerNote: "Unless rivals plot against you",
    history: "The Medici Bank, founded in 1397 in Florence, managed money for the papacy and had branches across Europe. The Medici family used their wealth to sponsor artists like Botticelli and Michelangelo.",
    match: { id: "egypt_scribe", why: "Spreadsheets before spreadsheets existed" },
    enemy: { id: "renaissance_apprentice", why: "Keeps asking for an \"advance\"" }
  },
  {
    id: "renaissance_apprentice", era: "Renaissance Italy", name: "Genius's Apprentice", emoji: "🎨",
    scores: { conscience: 1, action: 1, desire: -2, luck: -1 }, bias: -0.7,
    signature: "Master started 12 paintings. Finished 2.",
    intro: "My master is a genius. A genius who starts a painting, gets distracted by a bird, sketches a flying machine, and leaves the rest for me. Guess who mixes the paint at 3 a.m.? Me. Guess who gets the credit? Not me.",
    job: "Workshop apprentice / paint grinder / unpaid finisher",
    money: "Room and board, paint stains, and a lot of half-finished canvases",
    moneyNow: "An unpaid intern working for a celebrity",
    day: "Grind pigments, clean brushes, paint the background, watch master start a 13th project",
    danger: 2, dangerNote: "Some of those pigments were toxic",
    history: "Renaissance artists ran workshops where apprentices ground pigments, prepared panels and even painted parts of works. Young Leonardo da Vinci is believed to have painted an angel in his master Verrocchio's \"Baptism of Christ.\" Later, Leonardo himself left many works unfinished.",
    match: { id: "tudor_actor", why: "Art kids. Broke, but passionate." },
    enemy: { id: "renaissance_banker", why: "Pays for art, doesn't get art" }
  },
  {
    id: "renaissance_indulgence_seller", era: "Renaissance Europe", name: "Indulgence Seller", emoji: "📃",
    scores: { conscience: -2, action: 1, desire: 2, luck: -2 }, bias: -1.4,
    signature: "Top salesman of 1516. 1517 was... a year.",
    intro: "Quarterly targets, people! The cathedral won't fund itself. I had a catchy jingle, a great territory, record sales… and then some guy nailed a list to a church door. My numbers have never recovered.",
    job: "Traveling sales rep with very aggressive targets",
    money: "A big strongbox of coins (mostly forwarded to headquarters)",
    moneyNow: "Commission-based salesperson having a great year — right up until they aren't",
    day: "Arrive in town, set up a stage, play the jingle, count coins, move to the next town",
    danger: 2, dangerNote: "Mostly career danger",
    history: "In 1517, Martin Luther posted his 95 Theses criticizing the sale of indulgences — some of the money went toward rebuilding St. Peter's Basilica. Thanks to the printing press, his ideas spread fast and helped start the Protestant Reformation. The salesman Johann Tetzel became infamous for a catchy sales slogan.",
    match: { id: "twenties_stock_speculator", why: "Charter members of the Terrible Timing Club" },
    enemy: { id: "french_printer", why: "Printing presses ruined my business model" }
  },

  // ───────── Tudor England ─────────
  {
    id: "tudor_courtier", era: "Tudor England", name: "Tudor Courtier", emoji: "🪶",
    scores: { conscience: -1, action: -2, desire: 1, luck: -1 }, bias: 0.45,
    signature: "Rule #1 at court: agree with the king. Rule #2: see rule #1.",
    intro: "My job is simple: smile, nod, and agree. The king wants a new wife? Wonderful idea, Your Majesty. A new church? Brilliant. I've changed my opinion six times this year. I'm still alive. That's the win.",
    job: "Court noble, professional agreer",
    money: "A fancy hat, a gold chain, a house near the palace, constant anxiety",
    moneyNow: "Rich on paper, but one wrong word away from losing everything",
    day: "Morning: dress fancy. Afternoon: agree loudly. Evening: check who got arrested today",
    danger: 4, dangerNote: "One wrong opinion and it's the Tower",
    history: "Henry VIII married six times, and his court changed with every marriage and political shift. Powerful nobles and advisors could fall overnight — his chief minister Thomas Cromwell was executed in 1540, just months after arranging one of those marriages.",
    match: { id: "french_aristocrat", why: "Fellow members of the Fancy Clothes, Shaky Future Society" },
    enemy: { id: "tudor_actor", why: "Does impressions of me on stage. Everyone laughs." }
  },
  {
    id: "tudor_actor", era: "Elizabethan England", name: "Playhouse Actor", emoji: "🎭",
    scores: { conscience: -1, action: 1, desire: -2, luck: 1 }, bias: 0.42,
    signature: "I play the queen, the ghost AND the tree.",
    intro: "Tonight I'm playing a ghost, a king, and in Act 4, a tree. The playwright keeps rewriting my lines. The audience keeps throwing fruit. And the theater closes every time the plague comes back. I love this job.",
    job: "Stage actor, multiple roles per show",
    money: "A share of the ticket money, a costume trunk, and a lot of applause",
    moneyNow: "Struggling artist energy, occasional big hit",
    day: "Morning: rehearse. Afternoon: perform. Night: tavern with the cast",
    danger: 2, dangerNote: "Plague closures and flying fruit",
    history: "In Elizabethan theater, women's roles were played by boy actors. London's playhouses were shut down during plague outbreaks. Shakespeare's company built the Globe Theatre in 1599, where crowds stood in the pit for just a penny.",
    match: { id: "renaissance_apprentice", why: "Art kids. Broke, but passionate." },
    enemy: { id: "tudor_courtier", why: "So stiff. Great material, though." }
  },

  // ───────── Age of Sail ─────────
  {
    id: "voyage_sailor", era: "Age of Exploration", name: "Scurvy Sailor", emoji: "🍋",
    scores: { conscience: 1, action: 1, desire: 1, luck: -2 }, bias: 0.34,
    signature: "Rich when I get home. *If* I get home.",
    intro: "We've been at sea for months. My gums are bleeding, the bread has worms, and the captain says we're \"almost there.\" But when we get back, I'm rich. If we get back. Does anyone have a lemon?",
    job: "Deckhand on a long-distance voyage",
    money: "Wages promised at the end of the trip, plus a tiny share of the cargo",
    moneyNow: "Big payout — if you survive",
    day: "Pull ropes, scrub the deck, eat moldy biscuits, count teeth",
    danger: 5, dangerNote: "Scurvy, storms, everything",
    history: "Scurvy, caused by a lack of vitamin C, killed huge numbers of sailors on long voyages. In 1747, Scottish naval surgeon James Lind ran an experiment showing that citrus fruit helped — one of the earliest controlled trials in medicine.",
    match: { id: "viking_explorer", why: "Long trips, bad food, no credit" },
    enemy: { id: "voyage_spice_merchant", why: "I risk my teeth. They get the profits." }
  },
  {
    id: "voyage_spice_merchant", era: "Age of Exploration", name: "Spice Merchant", emoji: "🌶️",
    scores: { conscience: -1, action: 0, desire: 2, luck: 2 }, bias: -0.8,
    signature: "Pepper: worth its weight in silver. Literally.",
    intro: "Pepper. Cinnamon. Cloves. You call it seasoning; I call it a retirement plan. One good ship comes back and I'm set for life. Did ten other ships sink? Yes. But mine didn't. Timing, baby.",
    job: "Spice importer and very lucky investor",
    money: "Warehouses full of pepper, a mansion that smells like cinnamon",
    moneyNow: "Old-school import-export tycoon",
    day: "Check the harbor, check the prices, check the harbor again",
    danger: 2, dangerNote: "Ship sinks = money sinks",
    history: "Spices were extremely expensive in medieval and early modern Europe — \"worth its weight in silver\" is an exaggeration, but not by a ridiculous amount. In 1498, Vasco da Gama reached India by sailing around Africa, opening a direct sea route to the spice trade.",
    match: { id: "west_shovel_seller", why: "Let other people take the risk. Sell them the stuff." },
    enemy: { id: "voyage_pirate", why: "Has a strong interest in my cargo" }
  },
  {
    id: "voyage_pirate", era: "Golden Age of Piracy", name: "Pirate", emoji: "🏴‍☠️",
    scores: { conscience: -1, action: 2, desire: 2, luck: 0 }, bias: -0.7,
    signature: "Our crew has better benefits than your job.",
    intro: "Yes, I'm a pirate. But hear me out: we vote for our captain, everyone gets a fair share of the loot, and if you lose a leg, you get paid for it. Can your boss say that? Exactly.",
    job: "Pirate (elected, with benefits)",
    money: "One share of the loot, a parrot (optional), some very questionable gold",
    moneyNow: "Startup-style income: huge payday or nothing",
    day: "Spot a ship, chase it, negotiate aggressively, divide the loot fairly",
    danger: 5, dangerNote: "Every navy wants you",
    history: "During the Golden Age of Piracy (roughly 1650s–1730s), many pirate crews wrote \"articles\" — rules covering how loot was divided, compensation for injuries, and electing captains. Some historians call these early forms of democracy at sea.",
    match: { id: "twenties_bootlegger", why: "Both run businesses the government hates" },
    enemy: { id: "voyage_spice_merchant", why: "Their cargo, my plans" }
  },

  // ───────── French Revolution ─────────
  {
    id: "french_revolutionary", era: "French Revolution", name: "Revolutionary", emoji: "✊",
    scores: { conscience: 2, action: 2, desire: -1, luck: -1 }, bias: -1.5,
    signature: "Liberty, equality, fraternity, and no sleep.",
    intro: "Haven't slept in three days. Stormed a fortress, wrote a pamphlet, yelled at a noble. Tomorrow? A new constitution. Is this sustainable? No. Is it historic? Absolutely.",
    job: "Full-time revolutionary, part-time pamphlet writer",
    money: "One red cap, some long pants, a strong opinion",
    moneyNow: "Broke, but fighting for everyone",
    day: "March, protest, write, argue in a café, march again",
    danger: 5, dangerNote: "Revolutions eat their own",
    history: "On July 14, 1789, crowds stormed the Bastille in Paris, a symbol of royal power. The sans-culottes — working people who wore long trousers instead of nobles' knee breeches — became the face of the revolution.",
    match: { id: "industrial_luddite", why: "When something's unfair, we act. Immediately." },
    enemy: { id: "french_aristocrat", why: "Still asking about cake" }
  },
  {
    id: "french_aristocrat", era: "French Revolution", name: "Powdered-Wig Aristocrat", emoji: "🍰",
    scores: { conscience: -1, action: -1, desire: 1, luck: -2 }, bias: 0.4,
    signature: "The peasants seem upset. Anyway, more cake?",
    intro: "Lovely weather, isn't it? My wig is two feet tall and my party is fabulous. Someone mentioned a revolution? Oh, I'm sure it's nothing. Pass the pastries, darling. …Why is everyone running?",
    job: "Noble, professional party guest",
    money: "A château, a powdered wig, a lot of silk, a looming problem",
    moneyNow: "Billionaire lifestyle, with terrible timing",
    day: "Wake at noon, powder wig, attend party, ignore the news",
    danger: 4, dangerNote: "1789 was a bad year for you",
    history: "\"Let them eat cake\" is famously linked to Marie Antoinette, but there's no evidence she ever said it. A similar line appears in Rousseau's writing from before she even arrived in France.",
    match: { id: "tudor_courtier", why: "Fellow members of the Fancy Clothes, Shaky Future Society" },
    enemy: { id: "french_revolutionary", why: "Rude. Very rude. And they're at the door." }
  },
  {
    id: "french_printer", era: "French Revolution", name: "Pamphlet Printer", emoji: "🖨️",
    scores: { conscience: 1, action: -2, desire: -1, luck: 2 }, bias: 0.65,
    signature: "I print the news. Both sides of it. Carefully.",
    intro: "Revolution is great for business. Everyone has an opinion, and they all need pamphlets. I print for the radicals on Monday, the moderates on Tuesday. Wednesday, I check which side is winning. It's called survival.",
    job: "Printer, publisher, careful observer",
    money: "A printing press, ink-stained hands, and a lot of orders",
    moneyNow: "A small media company during a news boom",
    day: "Set type, print pamphlets, read the room, hide the pamphlets from last week",
    danger: 3, dangerNote: "Printing the wrong side = bad",
    history: "During the French Revolution, the number of newspapers and pamphlets exploded — historians count hundreds of new newspapers in Paris after 1789. Print shaped public opinion, and printers could be in danger if politics shifted.",
    match: { id: "viking_skald", why: "We both know how to write for whoever's paying" },
    enemy: { id: "renaissance_indulgence_seller", why: "My industry destroyed theirs. Again, sorry." }
  },

  // ───────── Industrial Revolution ─────────
  {
    id: "industrial_luddite", era: "Industrial Britain", name: "Luddite", emoji: "🔨",
    scores: { conscience: 1, action: 2, desire: -1, luck: -1 }, bias: -1.15,
    signature: "The machine took my job. I have a hammer.",
    intro: "I was a skilled weaver for 20 years. Then they brought in a machine and paid kids pennies to run it. So, I picked up a hammer. Is it a solution? Not really. Does it feel good? Very.",
    job: "Weaver (former), machine breaker (current)",
    money: "A hammer, a mask, and a strong sense of injustice",
    moneyNow: "Unemployed due to automation. Relatable.",
    day: "Day: look for work. Night: sneak into factories with friends and hammers",
    danger: 4, dangerNote: "Machine-breaking became a capital crime",
    history: "Around 1811, English textile workers known as Luddites smashed machines they blamed for low wages and lost jobs. They claimed to follow \"General Ned Ludd\" — who almost certainly never existed. Today, \"Luddite\" means someone who resists new technology.",
    match: { id: "rome_gladiator", why: "Both fighting a system we didn't sign up for" },
    enemy: { id: "industrial_investor", why: "They bought the machine. I broke the machine." }
  },
  {
    id: "industrial_investor", era: "Industrial Britain", name: "Steam Investor", emoji: "🚂",
    scores: { conscience: -1, action: 1, desire: 2, luck: 2 }, bias: -0.85,
    signature: "Choo choo is the sound of money.",
    intro: "Steam engines, railways, factories — the future is loud and smoky, and I own a piece of all of it. Some people say I got lucky. I say I bought early. Same thing, really.",
    job: "Railway and factory investor",
    money: "Railway shares, factory stocks, a top hat collection",
    moneyNow: "Early-stage tech investor in the biggest boom of the century",
    day: "Read the stock reports, buy more shares, attend dinner parties, complain about workers",
    danger: 2, dangerNote: "Bubble burst risk",
    history: "James Watt patented his improved steam engine design in 1769. In the 1840s, Britain went through \"Railway Mania\" — a frenzy of railway investments that turned into a bubble and crashed. Some investors got rich; many lost everything.",
    match: { id: "renaissance_banker", why: "Money talks. We listen." },
    enemy: { id: "industrial_luddite", why: "Keeps breaking my investments" }
  },

  // ───────── Wild West ─────────
  {
    id: "west_gold_prospector", era: "Wild West", name: "Gold Prospector", emoji: "⛏️",
    scores: { conscience: 0, action: 2, desire: 1, luck: -2 }, bias: -0.7,
    signature: "Arrived in 1852. The gold arrived in 1849.",
    intro: "I sold everything, crossed a whole continent, and started digging. Found a lot of dirt. Some rocks. A cool-looking beetle. The people who came three years earlier? Rich. Me? Very, very good at digging.",
    job: "Gold miner (late to the party)",
    money: "A pan, a pickaxe, a mule, and a single gold flake",
    moneyNow: "Bought crypto at the top, basically",
    day: "Dig, pan, dig, buy overpriced beans, dig",
    danger: 4, dangerNote: "Dangerous towns and worse luck",
    history: "Gold was found at Sutter's Mill in California in 1848, and about 300,000 people rushed there over the following years. Most who arrived later never got rich — the easy gold was gone fast.",
    match: { id: "voyage_sailor", why: "Rich someday. Probably. Maybe." },
    enemy: { id: "west_shovel_seller", why: "I'm digging for gold. They're digging into my wallet." }
  },
  {
    id: "west_shovel_seller", era: "Wild West", name: "Shovel Seller", emoji: "🛠️",
    scores: { conscience: 0, action: -2, desire: 2, luck: 2 }, bias: 1.73,
    signature: "Gold rush? I'm in the shovel business.",
    intro: "Everyone else is digging for gold. Me? I sell the shovels. And the pans. And the pants. Prices? Let's just say they're… flexible. I never got dirt under my nails, and I'm the richest person in town.",
    job: "Supply store owner, gold rush edition",
    money: "A general store, a warehouse, and every prospector's money",
    moneyNow: "\"Picks and shovels\" investor — profiting from the hype without the risk",
    day: "Open the store, raise prices, count money, close the store",
    danger: 1, dangerNote: "Safest job in the gold rush",
    history: "Many of the people who made the most money in the California gold rush sold supplies rather than digging. Store owner Sam Brannan is often called California's first millionaire, and Levi Strauss built a business selling dry goods — and later, jeans.",
    match: { id: "voyage_spice_merchant", why: "Let other people take the risk. Sell them the stuff." },
    enemy: { id: "west_gold_prospector", why: "Keeps asking for a discount" }
  },
  {
    id: "west_sheriff", era: "Wild West", name: "Small-Town Sheriff", emoji: "⭐",
    scores: { conscience: 2, action: 1, desire: 0, luck: 0 }, bias: 0.25,
    signature: "This town ain't big enough for... actually it's pretty small.",
    intro: "I'm the law around here. Me, a horse, and one deputy who's mostly asleep. Bank robbers, cattle thieves, someone selling fake medicine — I handle it all. Is there backup? No. There's never backup.",
    job: "Sheriff, judge of character, the only one doing paperwork",
    money: "A badge, a horse, a modest salary, and lots of free coffee",
    moneyNow: "Small-town public servant salary",
    day: "Walk the main street, break up a saloon fight, chase a thief, do paperwork",
    danger: 4, dangerNote: "It's the Wild West",
    history: "Frontier sheriffs and marshals often had to cover huge areas with very few people. Much of the \"quick-draw duel\" image comes from movies and dime novels — real frontier law work involved a lot of paperwork, tax collecting and serving court papers.",
    match: { id: "medieval_plague_doctor", why: "The only professionals in town who actually show up" },
    enemy: { id: "west_snake_oil", why: "I keep running them out of town. They keep coming back." }
  },
  {
    id: "west_snake_oil", era: "Wild West", name: "Snake Oil Salesman", emoji: "🐍",
    scores: { conscience: -2, action: 1, desire: 1, luck: 1 }, bias: -0.65,
    signature: "Cures everything. Ingredients: classified.",
    intro: "Step right up! My miracle tonic cures headaches, heartbreak, baldness, and bad luck! Ingredients? Trade secret. Side effects? None I'll admit to. Already packing my wagon for the next town.",
    job: "Traveling medicine salesman (no medical license)",
    money: "A wagon full of bottles, a top hat, and a very fast horse",
    moneyNow: "Scam-ad influencer selling \"miracle\" supplements",
    day: "Arrive in town, put on a show, sell bottles, leave before anyone gets sick",
    danger: 3, dangerNote: "Angry customers chase fast",
    history: "In the 1800s, \"patent medicines\" were sold everywhere, often with no proof they worked. The U.S. Pure Food and Drug Act of 1906 began regulating them. When one famous \"snake oil\" was tested in 1917, it contained mineral oil, beef fat, red pepper and turpentine — no snake.",
    match: { id: "renaissance_indulgence_seller", why: "Fellow \"trust me, it works\" salesman" },
    enemy: { id: "west_sheriff", why: "Always ruins the show" }
  },

  // ───────── Roaring Twenties ─────────
  {
    id: "twenties_flapper", era: "Roaring Twenties", name: "Flapper", emoji: "💃",
    scores: { conscience: 0, action: 2, desire: 0, luck: 1 }, bias: 0,
    signature: "Short hair, short skirt, long night.",
    intro: "Cut my hair short, threw away my corset, and learned the Charleston. Parents are horrified. Jazz is playing. The night is young. Where's the party? Oh, it's wherever I am.",
    job: "Party icon, jazz club regular, style trendsetter",
    money: "A beaded dress, a long necklace, and a very busy social calendar",
    moneyNow: "Living for the weekend",
    day: "Sleep late, shop, dance, jazz club until 3 a.m.",
    danger: 2, dangerNote: "Mostly to the parents' nerves",
    history: "In the 1920s, \"flappers\" were young women who wore short hair and shorter skirts, danced to jazz, and broke the strict social rules of earlier generations. To many older people at the time, they were shocking.",
    match: { id: "twenties_bootlegger", why: "They bring the drinks, I bring the vibes" },
    enemy: { id: "twenties_stock_speculator", why: "Keeps talking about stocks at the party" }
  },
  {
    id: "twenties_bootlegger", era: "Roaring Twenties", name: "Bootlegger", emoji: "🥃",
    scores: { conscience: -2, action: -1, desire: 1, luck: 2 }, bias: -0.45,
    signature: "Alcohol is illegal. Business is booming.",
    intro: "The government banned alcohol. People didn't stop drinking. They just started coming to me. I run a quiet little business — secret door, password, very discreet. You didn't hear it from me.",
    job: "Speakeasy owner, \"beverage distributor\"",
    money: "A secret bar, a warehouse of \"medicine,\" and a cop on the payroll",
    moneyNow: "Running an illegal business during a boom",
    day: "Day: run a \"barbershop.\" Night: run the bar behind the barbershop",
    danger: 4, dangerNote: "Police raids and rival gangs",
    history: "From 1920 to 1933, Prohibition made alcohol illegal in the United States. Instead of stopping drinking, it fueled secret bars called speakeasies and gave organized crime a huge new business.",
    match: { id: "twenties_flapper", why: "They bring the vibes, I bring the drinks" },
    enemy: { id: "west_sheriff", why: "Lawmen. Every era has one." }
  },
  {
    id: "twenties_stock_speculator", era: "Roaring Twenties", name: "Stock Speculator", emoji: "📉",
    scores: { conscience: -1, action: 1, desire: 2, luck: -2 }, bias: -1.1,
    signature: "Stocks only go up. (September 1929)",
    intro: "Everyone's getting rich in the stock market! Even my barber gives me stock tips. I borrowed money to buy more. What could possibly go wrong? The experts say prices have reached a permanent high. It's October. Feeling great.",
    job: "Stock investor, borrowed money edition",
    money: "A huge stock portfolio (bought on borrowed money)",
    moneyNow: "Went all-in at the top. Nuff said.",
    day: "Check stock ticker, buy more, brag, check ticker again",
    danger: 3, dangerNote: "Financially: maximum",
    history: "On October 29, 1929 — \"Black Tuesday\" — the U.S. stock market crashed, helping trigger the Great Depression. Just days earlier, economist Irving Fisher had famously said stock prices had reached \"a permanently high plateau.\"",
    match: { id: "renaissance_indulgence_seller", why: "Charter members of the Terrible Timing Club" },
    enemy: { id: "industrial_investor", why: "They sold before the crash. I didn't." }
  },

  // ───────── World War II ─────────
  {
    id: "ww2_resistance", era: "World War II", name: "Resistance Fighter", emoji: "🥖",
    scores: { conscience: 2, action: 1, desire: -2, luck: 0 }, bias: -0.35,
    signature: "The bread is real. The note inside is classified.",
    intro: "During the day, I bake bread and smile at customers. At night, I pass on secret messages, hide people, and help them escape. Just a baker. Nothing to see here. Would you like a baguette?",
    job: "Baker by day, resistance member by night",
    money: "A small bakery, a radio hidden under the floor",
    moneyNow: "Small business owner, secretly risking everything",
    day: "Bake bread, deliver messages, sabotage the occupiers, act normal",
    danger: 5, dangerNote: "If caught, it's over",
    history: "In occupied France during World War II, resistance networks gathered intelligence, sabotaged railways, and helped Allied airmen escape. Many members kept ordinary jobs as cover, passing messages hidden in everyday items.",
    match: { id: "french_revolutionary", why: "Freedom fighters, separated by 150 years" },
    enemy: { id: "tudor_courtier", why: "\"Just agree with whoever's in charge\"? Hard no." }
  },
  {
    id: "ww2_codebreaker", era: "World War II", name: "Codebreaker", emoji: "🔐",
    scores: { conscience: 1, action: -2, desire: -2, luck: 1 }, bias: 0,
    signature: "I'm just really good at crosswords.",
    intro: "I can't tell you what I do. Officially, I \"work in an office.\" Unofficially, I stare at gibberish for 14 hours a day until it turns into enemy plans. My family thinks I'm a clerk. Fine by me.",
    job: "Top-secret codebreaker",
    money: "A government salary and a secret you can't tell anyone for 30 years",
    moneyNow: "Average government pay, priceless contribution",
    day: "Arrive at the hut, drink tea, break codes, swear secrecy again",
    danger: 1, dangerNote: "Mostly the danger of too much tea",
    history: "At Bletchley Park in England, codebreakers including Alan Turing worked to crack the German Enigma code. In 1942, the Daily Telegraph ran a crossword contest — and some people who solved it fast were quietly recruited for codebreaking work.",
    match: { id: "greece_philosopher", why: "Overthinking as a lifestyle" },
    enemy: { id: "twenties_flapper", why: "Loose lips sink ships. Theirs are very loose." }
  },
  {
    id: "ww2_riveter", era: "World War II", name: "Factory Riveter", emoji: "🔩",
    scores: { conscience: 1, action: 1, desire: 0, luck: 2 }, bias: 0.61,
    signature: "We can do it. We did do it.",
    intro: "Half the town shipped off, so the factory hired me to build warplanes. Turns out I'm REALLY good at riveting. Faster than the old crew, actually. Bandana on, sleeves up, let's build some planes.",
    job: "Aircraft factory worker",
    money: "A real paycheck, a lunch box, and confidence",
    moneyNow: "A good factory wage — many women's first paycheck",
    day: "Clock in, rivet, rivet, lunch, rivet, clock out, feel great",
    danger: 3, dangerNote: "Factory work wasn't safe",
    history: "During World War II, millions of American women went to work in factories and shipyards. The famous \"We Can Do It!\" poster was made in 1943 as a factory poster — it only became a famous symbol decades later, linked to the \"Rosie the Riveter\" icon.",
    match: { id: "greece_olympian", why: "Pure effort, zero complaining" },
    enemy: { id: "french_aristocrat", why: "Has never done a day of work in their life" }
  },
  {
    id: "ww2_civilian", era: "World War II", name: "Home Front Civilian", emoji: "🥕",
    scores: { conscience: 0, action: 0, desire: 0, luck: 0 }, bias: 0.8,
    signature: "Not a hero. Just still here.",
    intro: "I grow carrots in my backyard, use ration coupons for sugar, and listen to the radio every night. I'm not a hero. I'm not a villain. I'm just trying to get through this. And honestly? My carrots are great.",
    job: "Regular person, part-time vegetable gardener",
    money: "A ration book, a vegetable garden, and some savings bonds",
    moneyNow: "Average household budget, very carefully managed",
    day: "Garden, queue for rations, listen to the radio, write letters",
    danger: 2, dangerNote: "Danger varied a lot by country",
    history: "During World War II, many governments encouraged \"victory gardens.\" In the U.S., an estimated 20 million gardens produced a large share of the country's fresh vegetables. Rationing limited food like sugar, meat and butter.",
    match: { id: "medieval_serf", why: "Not heroes. Just surviving, with vegetables." },
    enemy: { id: "twenties_bootlegger", why: "Ration coupons are not a business opportunity" }
  }
];
