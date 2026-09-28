"use strict";

const canvas =

  document.getElementById("gameCanvas");

const ctx =

  canvas.getContext(

    "2d",

    { alpha: false }

  );

const scoreEl =

  document.getElementById("score");

const levelEl =

  document.getElementById("level");

const goalsEl =

  document.getElementById("goals");

const savesEl =

  document.getElementById("saves");

const playerSelect =

  document.getElementById("playerSelect");

const keeperSelect =

  document.getElementById("keeperSelect");

const difficultySelect =

  document.getElementById("difficulty");

const cameraSelect =

  document.getElementById("cameraSelect");

const selectedPlayerEl =

  document.getElementById("selectedPlayer");

const selectedKeeperEl =

  document.getElementById("selectedKeeper");

const modeTitleEl =

  document.getElementById("modeTitle");

const messageEl =

  document.getElementById("message");

const distanceEl =

  document.getElementById("distance");

const streakEl =

  document.getElementById("streak");

const tipEl =

  document.getElementById("tip");

const flashEl =

  document.getElementById("flash");

const powerMeterEl =

  document.getElementById("powerMeter");

const powerFillEl =

  document.getElementById("powerFill");

const shootControls =

  document.getElementById("shootControls");

const keeperControls =

  document.getElementById("keeperControls");

const restartButton =

  document.getElementById("restart");

let W = 1200;

let H = 700;

let dpr = 1;

let animationId = 0;

let lastTime = performance.now();

let roundToken = 0;

let pendingTimer = null;

let particles = [];

let confetti = [];

const state = {

  mode: "penalty",

  score: 0,

  goals: 0,

  saves: 0,

  level: 1,

  streak: 0,

  busy: false,

  keeperChallengeActive: false,

  shotStart: 0,

  shotDuration: 760,

  keeperMoveStart: 0,

  keeperMoveDuration: 500,

  incomingZone: "center",

  keeperChoice: null,

  freeKickDistance: 22,

  power: .72,

  powerDirection: 1,

  camera: "broadcast"

};

const difficultySettings = {

  easy: {

    keeperAccuracy: .28,

    keeperSpeed: 330,

    saveRadius: 74,

    reactionMs: 400

  },

  normal: {

    keeperAccuracy: .46,

    keeperSpeed: 390,

    saveRadius: 64,

    reactionMs: 320

  },

  hard: {

    keeperAccuracy: .64,

    keeperSpeed: 455,

    saveRadius: 54,

    reactionMs: 235

  }

};

const playerProfiles = {

  "Hassan Ali": {

    power: 1.00,

    curve: 1.00,

    accuracy: 1.00

  },

  "Ehan Ali": {

    power: .98,

    curve: 1.02,

    accuracy: 1.02

  },

  "Umar Shoaib": {

    power: 1.03,

    curve: 1.06,

    accuracy: .98

  },

  "Cristiano Ronaldo": {

    power: 1.08,

    curve: 1.08,

    accuracy: 1.04

  },

  "Lionel Messi": {

    power: .98,

    curve: 1.15,

    accuracy: 1.10

  },

  "Kylian Mbappé": {

    power: 1.07,

    curve: 1.06,

    accuracy: 1.02

  },

  "Erling Haaland": {

    power: 1.12,

    curve: .96,

    accuracy: 1.00

  },

  "Neymar Jr.": {

    power: 1.00,

    curve: 1.16,

    accuracy: 1.04

  },

  "Mohamed Salah": {

    power: 1.02,

    curve: 1.10,

    accuracy: 1.03

  },

  "Vinícius Júnior": {

    power: 1.04,

    curve: 1.11,

    accuracy: 1.02

  },

  "Jude Bellingham": {

    power: 1.04,

    curve: 1.05,

    accuracy: 1.02

  },

  "Kevin De Bruyne": {

    power: 1.01,

    curve: 1.14,

    accuracy: 1.06

  },

  "Robert Lewandowski": {

    power: 1.06,

    curve: 1.03,

    accuracy: 1.04

  },

  "Lamine Yamal": {

    power: .99,

    curve: 1.15,

    accuracy: 1.04

  }

};

const keeperProfiles = {

  "Ehan Ali": {

    reach: 1.00,

    speed: 1.00

  },

  "Thibaut Courtois": {

    reach: 1.16,

    speed: .98

  },

  "Alisson": {

    reach: 1.06,

    speed: 1.06

  },

  "Manuel Neuer": {

    reach: 1.04,

    speed: 1.09

  },

  "Gianluigi Donnarumma": {

    reach: 1.15,

    speed: 1.00

  },

  "Ederson": {

    reach: 1.01,

    speed: 1.10

  },

  "Jan Oblak": {

    reach: 1.11,

    speed: 1.01

  },

  "Marc-André ter Stegen": {

    reach: 1.07,

    speed: 1.07

  },

  "Emiliano Martínez": {

    reach: 1.08,

    speed: 1.04

  }

};

const ball = {

  x: 0,

  y: 0,

  startX: 0,

  startY: 0,

  targetX: 0,

  targetY: 0,

  curve: 0,

  arc: 0,

  progress: 0,

  radius: 12,

  visible: true

};

const keeper = {

  x: 0,

  y: 0,

  targetX: 0,

  targetY: 0,

  diveX: 0,

  diveY: 0,

  pose: 0,

  scale: 1

};

function clamp(

  value,

  min,

  max

) {

  return Math.max(

    min,

    Math.min(max, value)

  );

}

function lerp(

  a,

  b,

  t

) {

  return a +

    (b - a) * t;

}

function easeInOut(t) {

  return t * t *

    (3 - 2 * t);

}

function randomBetween(

  min,

  max

) {

  return min +

    Math.random() *

    (max - min);

}

function schedule(

  callback,

  delay

) {

  const token =

    roundToken;

  clearTimeout(

    pendingTimer

  );

  pendingTimer =

    setTimeout(

      () => {

        if (

          token ===

          roundToken

        ) {

          callback();

        }

      },

      delay

    );

}

function invalidateTimers() {

  roundToken += 1;

  clearTimeout(

    pendingTimer

  );

  pendingTimer = null;

}

function resizeCanvas() {

  const rect =

    canvas.getBoundingClientRect();

  const width =

    Math.max(

      320,

      Math.floor(rect.width)

    );

  const height =

    Math.max(

      390,

      Math.floor(rect.height)

    );

  W = width;

  H = height;

  dpr =

    Math.min(

      window.devicePixelRatio || 1,

      2

    );

  canvas.width =

    Math.floor(W * dpr);

  canvas.height =

    Math.floor(H * dpr);

  ctx.setTransform(

    dpr,

    0,

    0,

    dpr,

    0,

    0

  );

  positionGameObjects();

}

function goalGeometry() {

  let left = .20;

  let width = .60;

  let top = .12;

  let height = .31;

  if (

    state.camera ===

    "close"

  ) {

    left = .13;

    width = .74;

    top = .10;

    height = .36;

  }

  if (

    state.camera ===

    "wide"

  ) {

    left = .25;

    width = .50;

    top = .14;

    height = .28;

  }

  return {

    x: W * left,

    y: H * top,

    width: W * width,

    height: H * height

  };

}

function penaltyStart() {

  return {

    x: W / 2,

    y: H * .74

  };

}

function freeKickStart() {

  return {

    x: W / 2,

    y: H * .72

  };

}

function keeperLineY() {

  const g =

    goalGeometry();

  return g.y +

    g.height * .80;

}

function fieldCenterY() {

  return H * .54;

}

function positionGameObjects() {

  const g =

    goalGeometry();

  keeper.x =

    W / 2;

  keeper.y =

    g.y +

    g.height * .76;

  keeper.targetX =

    keeper.x;

  keeper.targetY =

    keeper.y;

  keeper.pose = 0;

  if (

    state.mode !==

    "keeper"

  ) {

    const start =

      state.mode === "freekick"

        ? freeKickStart()

        : penaltyStart();

    ball.x =

      start.x;

    ball.y =

      start.y;

    ball.startX =

      start.x;

    ball.startY =

      start.y;

    ball.visible =

      true;

    ball.progress =

      0;

  }

}

function updateHUD() {

  scoreEl.textContent =

    String(state.score);

  levelEl.textContent =

    String(state.level);

  goalsEl.textContent =

    String(state.goals);

  savesEl.textContent =

    String(state.saves);

  streakEl.textContent =

    String(state.streak);

  selectedPlayerEl.textContent =

    playerSelect.value;

  selectedKeeperEl.textContent =

    `vs ${keeperSelect.value}`;

  modeTitleEl.textContent =

    state.mode === "penalty"

      ? "PENALTY"

      : state.mode === "freekick"

        ? "FREE KICK"

        : "GOALKEEPER";

}

function setMessage(

  text

) {

  messageEl.textContent =

    text;

}

function flash() {

  flashEl.classList.remove(

    "show"

  );

  void flashEl.offsetWidth;

  flashEl.classList.add(

    "show"

  );

}

function addParticles(

  x,

  y,

  type = "normal",

  count = 35

) {

  for (

    let i = 0;

    i < count;

    i++

  ) {

    const angle =

      Math.random() *

      Math.PI * 2;

    const speed =

      randomBetween(

        90,

        390

      );

    particles.push({

      x,

      y,

      vx:

        Math.cos(angle) *

        speed,

      vy:

        Math.sin(angle) *

        speed -

        randomBetween(

          20,

          150

        ),

      life: 1,

      size:

        randomBetween(

          2,

          5

        ),

      type

    });

  }

}

function addConfetti(

  count = 90

) {

  for (

    let i = 0;

    i < count;

    i++

  ) {

    confetti.push({

      x:

        W * .5 +

        randomBetween(

          -80,

          80

        ),

      y:

        H * .32,

      vx:

        randomBetween(

          -250,

          250

        ),

      vy:

        randomBetween(

          -420,

          -120

        ),

      life: 1,

      size:

        randomBetween(

          3,

          7

        ),

      rot:

        randomBetween(

          0,

          Math.PI * 2

        ),

      spin:

        randomBetween(

          -7,

          7

        )

    });

  }

}

function updateParticles(dt) {

  for (

    const p of particles

  ) {

    p.x +=

      p.vx * dt;

    p.y +=

      p.vy * dt;

    p.vy +=

      280 * dt;

    p.life -=

      dt * 1.5;

  }

  particles =

    particles.filter(

      p => p.life > 0

    );

  for (

    const c of confetti

  ) {

    c.x +=

      c.vx * dt;

    c.y +=

      c.vy * dt;

    c.vy +=

      420 * dt;

    c.rot +=

      c.spin * dt;

    c.life -=

      dt * .65;

  }

  confetti =

    confetti.filter(

      c => c.life > 0

    );

}

function drawParticles() {

  for (

    const p of particles

  ) {

    ctx.globalAlpha =

      clamp(

        p.life,

        0,

        1

      );

    ctx.fillStyle =

      p.type === "goal"

        ? "#ffe44a"

        : "#f7fff9";

    ctx.beginPath();

    ctx.arc(

      p.x,

      p.y,

      p.size,

      0,

      Math.PI * 2

    );

    ctx.fill();

  }

  ctx.globalAlpha = 1;

  const confettiColors = [

    "#ffef4b",

    "#62e9ff",

    "#ff6d8d",

    "#ffffff",

    "#a9ff6a"

  ];

  for (

    const c of confetti

  ) {

    ctx.save();

    ctx.globalAlpha =

      clamp(

        c.life,

        0,

        1

      );

    ctx.translate(

      c.x,

      c.y

    );

    ctx.rotate(

      c.rot

    );

    ctx.fillStyle =

      confettiColors[

        Math.abs(

          Math.floor(c.x)

        ) %

        confettiColors.length

      ];

    ctx.fillRect(

      -c.size,

      -c.size / 2,

      c.size * 2,

      c.size

    );

    ctx.restore();

  }

  ctx.globalAlpha = 1;

}

function drawBackground() {

  const bg =

    ctx.createLinearGradient(

      0,

      0,

      0,

      H

    );

  bg.addColorStop(

    0,

    "#062b17"

  );

  bg.addColorStop(

    .45,

    "#08752e"

  );

  bg.addColorStop(

    1,

    "#03451e"

  );

  ctx.fillStyle =

    bg;

  ctx.fillRect(

    0,

    0,

    W,

    H

  );

}

function drawStadium() {

  const crowdH =

    H * .16;

  const crowd =

    ctx.createLinearGradient(

      0,

      0,

      0,

      crowdH

    );

  crowd.addColorStop(

    0,

    "#111922"

  );

  crowd.addColorStop(

    1,

    "#24322a"

  );

  ctx.fillStyle =

    crowd;

  ctx.fillRect(

    0,

    0,

    W,

    crowdH

  );

  const lights = [

    .12,

    .29,

    .50,

    .71,

    .88

  ];

  for (

    const lx of lights

  ) {

    ctx.fillStyle =

      "rgba(255,255,220,.85)";

    ctx.shadowColor =

      "rgba(255,255,255,.35)";

    ctx.shadowBlur = 18;

    ctx.beginPath();

    ctx.arc(

      W * lx,

      H * .055,

      7,

      0,

      Math.PI * 2

    );

    ctx.fill();

  }

  ctx.shadowBlur = 0;

  ctx.fillStyle =

    "rgba(0,0,0,.20)";

  ctx.fillRect(

    0,

    crowdH - 8,

    W,

    8

  );

}

function drawField() {

  drawBackground();

  drawStadium();

  const fieldTop =

    H * .15;

  const fieldBottom =

    H * .97;

  const fieldLeft =

    W * .04;

  const fieldRight =

    W * .96;

  const stripes = 14;

  for (

    let i = 0;

    i < stripes;

    i++

  ) {

    ctx.fillStyle =

      i % 2 === 0

        ? "rgba(255,255,255,.035)"

        : "rgba(0,0,0,.035)";

    const y =

      fieldTop +

      (

        fieldBottom -

        fieldTop

      ) *

      i /

      stripes;

    ctx.fillRect(

      fieldLeft,

      y,

      fieldRight -

      fieldLeft,

      (

        fieldBottom -

        fieldTop

      ) /

      stripes +

      1

    );

  }

  ctx.strokeStyle =

    "rgba(255,255,255,.88)";

  ctx.lineWidth =

    Math.max(

      2,

      W / 500

    );

  ctx.strokeRect(

    fieldLeft,

    fieldTop,

    fieldRight -

      fieldLeft,

    fieldBottom -

      fieldTop

  );

  ctx.beginPath();

  ctx.moveTo(

    fieldLeft,

    fieldCenterY()

  );

  ctx.lineTo(

    fieldRight,

    fieldCenterY()

  );

  ctx.stroke();

  ctx.beginPath();

  ctx.arc(

    W / 2,

    fieldCenterY(),

    Math.min(W,H) * .12,

    0,

    Math.PI * 2

  );

  ctx.stroke();

  ctx.beginPath();

  ctx.arc(

    W / 2,

    fieldCenterY(),

    4,

    0,

    Math.PI * 2

  );

  ctx.fillStyle =

    "#ffffff";

  ctx.fill();

  const boxY =

    fieldTop;

  const boxH =

    H * .43;

  ctx.strokeRect(

    W * .11,

    boxY,

    W * .78,

    boxH

  );

  ctx.strokeRect(

    W * .26,

    boxY,

    W * .48,

    H * .23

  );

  ctx.beginPath();

  ctx.arc(

    W / 2,

    H * .52,

    Math.min(W,H) * .065,

    0,

    Math.PI * 2

  );

  ctx.stroke();

  drawGoal();

  if (

    state.mode ===

    "freekick"

  ) {

    drawWall();

  }

}

function drawGoal() {

  const g =

    goalGeometry();

  ctx.save();

  ctx.fillStyle =

    "rgba(255,255,255,.07)";

  ctx.fillRect(

    g.x,

    g.y,

    g.width,

    g.height

  );

  ctx.strokeStyle =

    "rgba(255,255,255,.20)";

  ctx.lineWidth = 1;

  const verticalStep =

    Math.max(

      20,

      g.width / 16

    );

  const horizontalStep =

    Math.max(

      15,

      g.height / 9

    );

  for (

    let x = g.x;

    x <=

      g.x +

      g.width +

      1;

    x += verticalStep

  ) {

    ctx.beginPath();

    ctx.moveTo(

      x,

      g.y

    );

    ctx.lineTo(

      x,

      g.y +

        g.height

    );

    ctx.stroke();

  }

  for (

    let y = g.y;

    y <=

      g.y +

      g.height +

      1;

    y += horizontalStep

  ) {

    ctx.beginPath();

    ctx.moveTo(

      g.x,

      y

    );

    ctx.lineTo(

      g.x +

        g.width,

      y

    );

    ctx.stroke();

  }

  ctx.strokeStyle =

    "#ffffff";

  ctx.lineWidth =

    Math.max(

      6,

      W / 130

    );

  ctx.strokeRect(

    g.x,

    g.y,

    g.width,

    g.height

  );

  ctx.strokeStyle =

    "#d9e7de";

  ctx.lineWidth = 2;

  ctx.strokeRect(

    g.x + 7,

    g.y + 7,

    g.width - 14,

    g.height - 14

  );

  ctx.restore();

}

function drawWall() {

  const wallY =

    H * .48;

  const spacing =

    Math.min(

      W * .055,

      66

    );

  const count =

    clamp(

      4 +

      Math.floor(

        state.level / 3

      ),

      4,

      7

    );

  const start =

    W / 2 -

    (

      count - 1

    ) *

    spacing /

    2;

  for (

    let i = 0;

    i < count;

    i++

  ) {

    drawWallPlayer(

      start +

      i *

      spacing,

      wallY

    );

  }

  ctx.fillStyle =

    "rgba(255,255,255,.86)";

  ctx.font =

    "bold 10px Arial";

  ctx.textAlign =

    "center";

  ctx.fillText(

    "DEFENSIVE WALL",

    W / 2,

    wallY + 41

  );

}

function drawWallPlayer(

  x,

  y

) {

  ctx.save();

  ctx.translate(

    x,

    y

  );

  const s =

    clamp(

      Math.min(W,H) /

        700,

      .65,

      1.25

    );

  ctx.strokeStyle =

    "#131d17";

  ctx.lineWidth =

    7 * s;

  ctx.beginPath();

  ctx.moveTo(

    -5 * s,

    14 * s

  );

  ctx.lineTo(

    -8 * s,

    35 * s

  );

  ctx.moveTo(

    5 * s,

    14 * s

  );

  ctx.lineTo(

    8 * s,

    35 * s

  );

  ctx.stroke();

  ctx.fillStyle =

    "#304fa4";

  ctx.fillRect(

    -12 * s,

    -11 * s,

    24 * s,

    28 * s

  );

  ctx.fillStyle =

    "#c98a65";

  ctx.beginPath();

  ctx.arc(

    0,

    -24 * s,

    8 * s,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.strokeStyle =

    "#304fa4";

  ctx.lineWidth =

    6 * s;

  ctx.beginPath();

  ctx.moveTo(

    -11 * s,

    -2 * s

  );

  ctx.lineTo(

    -18 * s,

    9 * s

  );

  ctx.moveTo(

    11 * s,

    -2 * s

  );

  ctx.lineTo(

    18 * s,

    9 * s

  );

  ctx.stroke();

  ctx.restore();

}

function drawKeeper() {

  ctx.save();

  ctx.translate(

    keeper.x,

    keeper.y

  );

  const s =

    clamp(

      Math.min(W,H) /

        700,

      .65,

      1.20

    );

  ctx.rotate(

    keeper.pose

  );

  ctx.fillStyle =

    "rgba(0,0,0,.25)";

  ctx.beginPath();

  ctx.ellipse(

    0,

    33 * s,

    40 * s,

    9 * s,

    0,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.strokeStyle =

    "#15271b";

  ctx.lineWidth =

    11 * s;

  ctx.beginPath();

  ctx.moveTo(

    -10 * s,

    10 * s

  );

  ctx.lineTo(

    -18 * s,

    44 * s

  );

  ctx.moveTo(

    10 * s,

    10 * s

  );

  ctx.lineTo(

    18 * s,

    44 * s

  );

  ctx.stroke();

  const shirt =

    ctx.createLinearGradient(

      -28 * s,

      -30 * s,

      28 * s,

      25 * s

    );

  shirt.addColorStop(

    0,

    "#ffe72d"

  );

  shirt.addColorStop(

    1,

    "#d88700"

  );

  ctx.fillStyle =

    shirt;

  ctx.fillRect(

    -25 * s,

    -30 * s,

    50 * s,

    50 * s

  );

  ctx.fillStyle =

    "#d69a70";

  ctx.beginPath();

  ctx.arc(

    0,

    -47 * s,

    17 * s,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.fillStyle =

    "#26170e";

  ctx.beginPath();

  ctx.arc(

    0,

    -52 * s,

    16 * s,

    Math.PI,

    Math.PI * 2

  );

  ctx.fill();

  ctx.strokeStyle =

    "#ffcc1b";

  ctx.lineWidth =

    11 * s;

  ctx.beginPath();

  ctx.moveTo(

    -20 * s,

    -14 * s

  );

  ctx.lineTo(

    -45 * s,

    3 * s

  );

  ctx.moveTo(

    20 * s,

    -14 * s

  );

  ctx.lineTo(

    45 * s,

    3 * s

  );

  ctx.stroke();

  ctx.fillStyle =

    "#f9ffff";

  ctx.beginPath();

  ctx.arc(

    -45 * s,

    3 * s,

    9 * s,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.beginPath();

  ctx.arc(

    45 * s,

    3 * s,

    9 * s,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.restore();

}

function drawPlayerFigure() {

  const start =

    state.mode ===

    "freekick"

      ? freeKickStart()

      : penaltyStart();

  ctx.save();

  ctx.translate(

    start.x,

    start.y + 19

  );

  const s =

    clamp(

      Math.min(W,H) /

        700,

      .65,

      1.15

    );

  ctx.fillStyle =

    "rgba(0,0,0,.22)";

  ctx.beginPath();

  ctx.ellipse(

    0,

    21 * s,

    30 * s,

    8 * s,

    0,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.strokeStyle =

    "#ffffff";

  ctx.lineWidth =

    9 * s;

  ctx.beginPath();

  ctx.moveTo(

    -9 * s,

    10 * s

  );

  ctx.lineTo(

    -17 * s,

    35 * s

  );

  ctx.moveTo(

    9 * s,

    10 * s

  );

  ctx.lineTo(

    17 * s,

    35 * s

  );

  ctx.stroke();

  ctx.fillStyle =

    "#e8ecf0";

  ctx.fillRect(

    -22 * s,

    -30 * s,

    44 * s,

    44 * s

  );

  ctx.fillStyle =

    "#c98c67";

  ctx.beginPath();

  ctx.arc(

    0,

    -47 * s,

    15 * s,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.strokeStyle =

    "#202d25";

  ctx.lineWidth =

    7 * s;

  ctx.beginPath();

  ctx.moveTo(

    -17 * s,

    -16 * s

  );

  ctx.lineTo(

    -30 * s,

    2 * s

  );

  ctx.moveTo(

    17 * s,

    -16 * s

  );

  ctx.lineTo(

    29 * s,

    2 * s

  );

  ctx.stroke();

  ctx.restore();

}

function drawBall() {

  if (

    !ball.visible

  ) {

    return;

  }

  ctx.save();

  ctx.shadowColor =

    "rgba(0,0,0,.55)";

  ctx.shadowBlur = 11;

  const r =

    Math.max(

      8,

      ball.radius

    );

  const gradient =

    ctx.createRadialGradient(

      ball.x -

        r * .35,

      ball.y -

        r * .45,

      2,

      ball.x,

      ball.y,

      r

    );

  gradient.addColorStop(

    0,

    "#ffffff"

  );

  gradient.addColorStop(

    1,

    "#b7c2bc"

  );

  ctx.fillStyle =

    gradient;

  ctx.beginPath();

  ctx.arc(

    ball.x,

    ball.y,

    r,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.shadowBlur = 0;

  ctx.fillStyle =

    "#272727";

  ctx.beginPath();

  ctx.arc(

    ball.x - r * .2,

    ball.y - r * .16,

    r * .22,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.beginPath();

  ctx.arc(

    ball.x + r * .32,

    ball.y + r * .19,

    r * .14,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.strokeStyle =

    "#222";

  ctx.lineWidth = 1.5;

  ctx.stroke();

  ctx.restore();

}

function drawAimMarker() {

  if (

    state.busy ||

    state.mode ===

      "keeper"

  ) {

    return;

  }

  const target =

    previewTarget(

      "center"

    );

  ctx.save();

  ctx.strokeStyle =

    "rgba(255,255,255,.75)";

  ctx.lineWidth = 2;

  ctx.setLineDash([

    5,

    5

  ]);

  ctx.beginPath();

  ctx.arc(

    target.x,

    target.y,

    18,

    0,

    Math.PI * 2

  );

  ctx.stroke();

  ctx.setLineDash([]);

  ctx.restore();

}

function drawKeeperPOV() {

  drawBackground();

  const g =

    goalGeometry();

  const glow =

    ctx.createLinearGradient(

      0,

      0,

      0,

      H

    );

  glow.addColorStop(

    0,

    "rgba(19,126,61,.88)"

  );

  glow.addColorStop(

    1,

    "rgba(3,56,27,.98)"

  );

  ctx.fillStyle =

    glow;

  ctx.fillRect(

    0,

    0,

    W,

    H

  );

  ctx.strokeStyle =

    "rgba(255,255,255,.92)";

  ctx.lineWidth =

    Math.max(

      7,

      W / 155

    );

  ctx.strokeRect(

    W * .09,

    H * .09,

    W * .82,

    H * .57

  );

  ctx.strokeStyle =

    "rgba(255,255,255,.22)";

  ctx.lineWidth = 1;

  for (

    let x =

      W * .09;

    x <= W * .91;

    x += Math.max(

      22,

      W / 18

    )

  ) {

    ctx.beginPath();

    ctx.moveTo(

      x,

      H * .09

    );

    ctx.lineTo(

      x,

      H * .66

    );

    ctx.stroke();

  }

  for (

    let y =

      H * .09;

    y <= H * .66;

    y += Math.max(

      18,

      H / 12

    )

  ) {

    ctx.beginPath();

    ctx.moveTo(

      W * .09,

      y

    );

    ctx.lineTo(

      W * .91,

      y

    );

    ctx.stroke();

  }

  if (

    state.keeperChallengeActive

  ) {

    const p =

      clamp(

        ball.progress,

        0,

        1

      );

    const r =

      lerp(

        9,

        28,

        p

      );

    ctx.save();

    ctx.shadowColor =

      "rgba(255,255,255,.8)";

    ctx.shadowBlur = 18;

    ctx.fillStyle =

      "#ffffff";

    ctx.beginPath();

    ctx.arc(

      ball.x,

      ball.y,

      r,

      0,

      Math.PI * 2

    );

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.strokeStyle =

      "#222";

    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.restore();

  }

  ctx.save();

  ctx.fillStyle =

    "rgba(245,250,247,.94)";

  ctx.beginPath();

  ctx.ellipse(

    W * .20,

    H * .90,

    56,

    27,

    -.35,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.beginPath();

  ctx.ellipse(

    W * .80,

    H * .90,

    56,

    27,

    .35,

    0,

    Math.PI * 2

  );

  ctx.fill();

  ctx.strokeStyle =

    "rgba(30,50,38,.35)";

  ctx.lineWidth = 3;

  ctx.stroke();

  ctx.restore();

  ctx.fillStyle =

    "rgba(0,0,0,.34)";

  ctx.fillRect(

    0,

    H - 56,

    W,

    56

  );

  ctx.fillStyle =

    "#ffffff";

  ctx.font =

    "bold 17px Arial";

  ctx.textAlign =

    "center";

  ctx.fillText(

    "GOALKEEPER POV — SAVE IT!",

    W / 2,

    H - 28

  );

}

function previewTarget(

  zone

) {

  const g =

    goalGeometry();

  let x =

    W / 2;

  if (

    zone === "left"

  ) {

    x =

      g.x +

      g.width * .19;

  }

  if (

    zone === "right"

  ) {

    x =

      g.x +

      g.width * .81;

  }

  const y =

    g.y +

    g.height *

    randomTargetHeight();

  return {

    x,

    y

  };

}

function randomTargetHeight() {

  return randomBetween(

    .18,

    .38

  );

}

function actualTarget(

  zone,

  profile

) {

  const g =

    goalGeometry();

  const horizontal =

    zone === "left"

      ? .17

      : zone === "right"

        ? .83

        : .50;

  const spread =

    state.mode ===

      "freekick"

        ? .045

        : .035;

  const x =

    g.x +

    g.width *

    clamp(

      horizontal +

      randomBetween(

        -spread,

        spread

      ) *

      profile.accuracy,

      .06,

      .94

    );

  const y =

    g.y +

    g.height *

    randomBetween(

      .16,

      .50

    );

  return {

    x,

    y

  };

}

function setDistance() {

  if (

    state.mode ===

    "penalty"

  ) {

    distanceEl.textContent =

      "Distance: 11 m";

  }

  else if (

    state.mode ===

    "freekick"

  ) {

    state.freeKickDistance =

      Math.round(

        randomBetween(

          20,

          31

        )

      );

    distanceEl.textContent =

      `Distance: ${

        state.freeKickDistance

      } m`;

  }

  else {

    distanceEl.textContent =

      "Incoming shot";

  }

}

function beginPenaltyOrFreeKick(

  zone

) {

  if (

    state.busy ||

    state.mode ===

      "keeper"

  ) {

    return;

  }

  state.busy = true;

  const player =

    playerProfiles[

      playerSelect.value

    ] ||

    playerProfiles[

      "Hassan Ali"

    ];

  const difficulty =

    difficultySettings[

      difficultySelect.value

    ];

  const keeperProfile =

    keeperProfiles[

      keeperSelect.value

    ] ||

    keeperProfiles[

      "Ehan Ali"

    ];

  const target =

    actualTarget(

      zone,

      player

    );

  const start =

    state.mode ===

      "freekick"

        ? freeKickStart()

        : penaltyStart();

  ball.startX =

    start.x;

  ball.startY =

    start.y;

  ball.x =

    start.x;

  ball.y =

    start.y;

  ball.targetX =

    target.x;

  ball.targetY =

    target.y;

  ball.progress = 0;

  ball.radius =

    state.mode ===

      "freekick"

        ? 11

        : 12;

  ball.curve =

    (

      zone === "left"

        ? -1

        : zone === "right"

          ? 1

          : 0

    ) *

    (

      state.mode ===

        "freekick"

        ? 105

        : 42

    ) *

    player.curve;

  ball.arc =

    state.mode ===

      "freekick"

        ? 38

        : 15;

  state.shotStart =

    performance.now();

  state.shotDuration =

    state.mode ===

      "freekick"

        ? 900

        : 720;

  state.keeperMoveStart =

    performance.now() +

    difficulty.reactionMs;

  const levelBonus =

    clamp(

      (

        state.level - 1

      ) *

      .035,

      0,

      .25

    );

  const readChance =

    clamp(

      difficulty.keeperAccuracy +

      levelBonus,

      .16,

      .88

    );

  const keeperReadsShot =

    Math.random() <

    readChance;

  const zones = [

    "left",

    "center",

    "right"

  ];

  const predictedZone =

    keeperReadsShot

      ? zone

      : zones[

          Math.floor(

            Math.random() *

            zones.length

          )

        ];

  const keeperTarget =

    zoneTargetForKeeper(

      predictedZone

    );

  keeper.targetX =

    keeperTarget.x;

  keeper.targetY =

    keeperTarget.y;

  keeper.pose =

    predictedZone === "left"

      ? -.26

      : predictedZone === "right"

        ? .26

        : 0;

  setMessage(

    state.mode ===

      "freekick"

      ? "BEND IT AROUND THE WALL!"

      : "SHOT! ⚡"

  );

  tipEl.textContent =

    state.mode ===

      "freekick"

      ? "Aim beyond the wall — the curve is stronger here."

      : "Pick a corner. Higher levels make the keeper react faster.";

  powerMeterEl.classList.remove(

    "hidden"

  );

}

function zoneTargetForKeeper(

  zone

) {

  const g =

    goalGeometry();

  const x =

    zone === "left"

      ? g.x +

        g.width * .20

      : zone === "right"

        ? g.x +

          g.width * .80

        : W / 2;

  return {

    x,

    y:

      g.y +

      g.height * .62

  };

}

function finishShot() {

  if (

    !state.busy

  ) {

    return;

  }

  state.busy =

    false;

  powerMeterEl

    .classList

    .add("hidden");

  powerFillEl.style.width =

    "0%";

  const difficulty =

    difficultySettings[

      difficultySelect.value

    ];

  const keeperProfile =

    keeperProfiles[

      keeperSelect.value

    ] ||

    keeperProfiles[

      "Ehan Ali"

    ];

  const distance =

    Math.hypot(

      keeper.x -

        ball.targetX,

      keeper.y -

        ball.targetY

    );

  const levelPenalty =

    Math.max(

      0,

      state.level - 5

    ) * 1.8;

  const effectiveRadius =

    difficulty.saveRadius *

    keeperProfile.reach -

    levelPenalty;

  const saved =

    distance <=

    effectiveRadius;

  if (

    saved

  ) {

    state.streak = 0;

    setMessage(

      "SAVED! 🧤"

    );

    addParticles(

      ball.targetX,

      ball.targetY,

      "normal",

      28

    );

    flash();

    schedule(

      resetRound,

      850

    );

  }

  else {

    state.goals += 1;

    state.score +=

      state.mode ===

        "freekick"

        ? 2

        : 1;

    state.streak += 1;

    updateLevel();

    addParticles(

      ball.targetX,

      ball.targetY,

      "goal",

      42

    );

    if (

      state.streak >= 3

    ) {

      addConfetti(

        100

      );

    }

    setMessage(

      state.streak >= 3

        ? "HAT-TRICK STREAK! 🔥"

        : "GOOOOOAL! ⚽🔥"

    );

    flash();

    updateHUD();

    schedule(

      resetRound,

      1050

    );

  }

  updateHUD();

}

function updateLevel() {

  const nextLevel =

    Math.floor(

      state.goals / 3

    ) + 1;

  if (

    nextLevel >

    state.level

  ) {

    state.level =

      nextLevel;

  }

}

function resetRound() {

  if (

    state.mode ===

    "keeper"

  ) {

    prepareKeeperChallenge(

      true

    );

    return;

  }

  state.busy =

    false;

  ball.visible =

    true;

  ball.progress =

    0;

  ball.radius =

    12;

  powerMeterEl

    .classList

    .add("hidden");

  powerFillEl.style.width =

    "0%";

  const start =

    state.mode ===

      "freekick"

      ? freeKickStart()

      : penaltyStart();

  ball.x =

    start.x;

  ball.y =

    start.y;

  ball.startX =

    start.x;

  ball.startY =

    start.y;

  ball.curve = 0;

  ball.arc = 0;

  keeper.x =

    W / 2;

  keeper.y =

    keeperLineY();

  keeper.targetX =

    keeper.x;

  keeper.targetY =

    keeper.y;

  keeper.pose = 0;

  setDistance();

  setMessage(

    state.mode ===

      "freekick"

      ? "CHOOSE A CURVE"

      : "CHOOSE YOUR SHOT"

  );

  tipEl.textContent =

    state.mode ===

      "freekick"

      ? "The wall is real gameplay: bend the ball around it."

      : "Tap a direction or tap the field.";

}

function prepareKeeperChallenge(

  wait

) {

  state.keeperChallengeActive =

    false;

  state.busy =

    false;

  ball.visible =

    true;

  ball.progress =

    0;

  state.keeperChoice =

    null;

  setDistance();

  const g =

    goalGeometry();

  ball.startX =

    randomBetween(

      g.x +

        g.width *

        .12,

      g.x +

        g.width *

        .88

    );

  ball.startY =

    g.y -

    H * .30;

  ball.x =

    ball.startX;

  ball.y =

    ball.startY;

  const zones = [

    "left",

    "center",

    "right"

  ];

  state.incomingZone =

    zones[

      Math.floor(

        Math.random() *

        zones.length

      )

    ];

  const target =

    zoneTargetForKeeper(

      state.incomingZone

    );

  ball.targetX =

    target.x;

  ball.targetY =

    H * .80;

  ball.curve =

    randomBetween(

      -22,

      22

    );

  ball.radius = 8;

  keeper.x =

    W / 2;

  keeper.y =

    H * .78;

  keeper.pose = 0;

  setMessage(

    wait

      ? "NEXT SHOT..."

      : "GET READY! 🧤"

  );

  tipEl.textContent =

    "Tap left, center or right before the ball reaches you.";

  schedule(

    () => {

      if (

        state.mode !==

        "keeper"

      ) {

        return;

      }

      state.shotStart =

        performance.now();

      state.keeperChallengeActive =

        true;

      setMessage(

        "SAVE IT! 🧤"

      );

    },

    wait

      ? 520

      : 380

  );

}

function goalkeeperSave(

  zone

) {

  if (

    state.mode !==

      "keeper" ||

    !state.keeperChallengeActive

  ) {

    return;

  }

  state.keeperChallengeActive =

    false;

  state.keeperChoice =

    zone;

  const correct =

    zone ===

    state.incomingZone;

  ball.progress = 1;

  if (

    correct

  ) {

    state.saves += 1;

    state.score += 2;

    state.streak += 1;

    addParticles(

      W / 2,

      H * .63,

      "goal",

      34

    );

    setMessage(

      "INCREDIBLE SAVE! 🧤🔥"

    );

    flash();

  }

  else {

    state.streak = 0;

    setMessage(

      "GOAL! 😱"

    );

    addParticles(

      ball.x,

      ball.y,

      "normal",

      30

    );

  }

  updateHUD();

  schedule(

    () => {

      if (

        state.mode ===

        "keeper"

      ) {

        prepareKeeperChallenge(

          true

        );

      }

    },

    900

  );

}

function setMode(

  mode

) {

  if (

    ![

      "penalty",

      "freekick",

      "keeper"

    ].includes(mode)

  ) {

    return;

  }

  invalidateTimers();

  state.mode =

    mode;

  state.busy =

    false;

  state.keeperChallengeActive =

    false;

  particles = [];

  confetti = [];

  document

    .querySelectorAll(

      ".mode"

    )

    .forEach(

      button => {

        button.classList.toggle(

          "active",

          button.dataset.mode ===

            mode

        );

      }

    );

  const keeperMode =

    mode ===

    "keeper";

  shootControls

    .classList

    .toggle(

      "hidden",

      keeperMode

    );

  keeperControls

    .classList

    .toggle(

      "hidden",

      !keeperMode

    );

  powerMeterEl

    .classList

    .add("hidden");

  updateHUD();

  resizeCanvas();

  if (

    keeperMode

  ) {

    prepareKeeperChallenge(

      false

    );

  }

  else {

    resetRound();

  }

}

function restartGame() {

  invalidateTimers();

  state.score = 0;

  state.goals = 0;

  state.saves = 0;

  state.level = 1;

  state.streak = 0;

  state.busy = false;

  state.keeperChallengeActive =

    false;

  particles = [];

  confetti = [];

  powerFillEl.style.width =

    "0%";

  powerMeterEl

    .classList

    .add("hidden");

  updateHUD();

  resizeCanvas();

  if (

    state.mode ===

    "keeper"

  ) {

    prepareKeeperChallenge(

      false

    );

  }

  else {

    resetRound();

  }

  setMessage(

    "GAME RESTARTED! ⚽"

  );

}

function handleShotInput(

  zone

) {

  if (

    state.mode ===

    "keeper"

  ) {

    goalkeeperSave(

      zone

    );

    return;

  }

  beginPenaltyOrFreeKick(

    zone

  );

}

function pointerZoneFromCanvas(

  event

) {

  const rect =

    canvas.getBoundingClientRect();

  const x =

    event.clientX -

    rect.left;

  if (

    x <

    W / 3

  ) {

    return "left";

  }

  if (

    x <

    (W * 2) / 3

  ) {

    return "center";

  }

  return "right";

}

function update(

  dt,

  time

) {

  updateParticles(

    dt

  );

  if (

    state.mode ===

    "keeper"

  ) {

    if (

      !state.keeperChallengeActive

    ) {

      return;

    }

    const elapsed =

      time -

      state.shotStart;

    const total =

      1550 -

      Math.min(

        450,

        (

          state.level -

          1

        ) * 18

      );

    const p =

      clamp(

        elapsed /

          total,

        0,

        1

      );

    state.keeperChallengeActive =

      p < 1;

    ball.progress =

      p;

    const e =

      easeInOut(p);

    ball.x =

      lerp(

        ball.startX,

        ball.targetX +

          Math.sin(

            p * Math.PI

          ) *

          ball.curve,

        e

      );

    ball.y =

      lerp(

        ball.startY,

        ball.targetY,

        e

      );

    ball.radius =

      lerp(

        8,

        27,

        p

      );

    if (

      p >= 1

    ) {

      state.keeperChallengeActive =

        false;

      setMessage(

        "TOO LATE! ⚽"

      );

      state.streak = 0;

      updateHUD();

      schedule(

        () => {

          if (

            state.mode ===

            "keeper"

          ) {

            prepareKeeperChallenge(

              true

            );

          }

        },

        700

      );

    }

    return;

  }

  if (

    !state.busy

  ) {

    return;

  }

  const elapsed =

    time -

    state.shotStart;

  const p =

    clamp(

      elapsed /

        state.shotDuration,

      0,

      1

    );

  const e =

    easeInOut(p);

  ball.progress =

    p;

  const arc =

    Math.sin(

      p * Math.PI

    ) *

    ball.arc;

  ball.x =

    lerp(

      ball.startX,

      ball.targetX,

      e

    ) +

    Math.sin(

      p * Math.PI

    ) *

    ball.curve;

  ball.y =

    lerp(

      ball.startY,

      ball.targetY,

      e

    ) -

    arc;

  ball.radius =

    lerp(

      state.mode ===

        "freekick"

        ? 12

        : 13,

      9,

      p

    );

  if (

    time >=

    state.keeperMoveStart

  ) {

    const moveP =

      clamp(

        (

          time -

          state.keeperMoveStart

        ) /

        430,

        0,

        1

      );

    const moveEase =

      easeInOut(

        moveP

      );

    keeper.x =

      lerp(

        W / 2,

        keeper.targetX,

        moveEase

      );

    keeper.y =

      lerp(

        keeper.y,

        keeper.targetY,

        moveEase * .65

      );

  }

  const powerPct =

    clamp(

      (

        Math.sin(

          p *

          Math.PI *

          3

        ) *

        .25 +

        .75

      ) *

      100,

      0,

      100

    );

  powerFillEl.style.width =

    `${powerPct}%`;

  if (

    p >= 1

  ) {

    finishShot();

  }

}

function draw() {

  if (

    state.mode ===

    "keeper"

  ) {

    drawKeeperPOV();

    drawParticles();

    return;

  }

  drawField();

  drawPlayerFigure();

  drawKeeper();

  drawBall();

  drawAimMarker();

  drawParticles();

}

function loop(

  time

) {

  const dt =

    Math.min(

      .033,

      Math.max(

        0,

        (

          time -

          lastTime

        ) / 1000

      )

    );

  lastTime =

    time;

  update(

    dt,

    time

  );

  draw();

  animationId =

    requestAnimationFrame(

      loop

    );

}

// MODE BUTTONS

document

  .querySelectorAll(".mode")

  .forEach(

    button => {

      button.addEventListener(

        "click",

        () => {

          setMode(

            button.dataset.mode

          );

        }

      );

    }

  );

// CONTROL BUTTONS

document

  .querySelectorAll(

    ".control-btn"

  )

  .forEach(

    button => {

      button.addEventListener(

        "pointerdown",

        event => {

          event.preventDefault();

          button.setPointerCapture?.(

            event.pointerId

          );

          handleShotInput(

            button.dataset.zone

          );

        }

      );

    }

  );

// TAP THE FIELD

canvas.addEventListener(

  "pointerdown",

  event => {

    event.preventDefault();

    const zone =

      pointerZoneFromCanvas(

        event

      );

    handleShotInput(

      zone

    );

  }

);

// DROPDOWNS

playerSelect.addEventListener(

  "change",

  updateHUD

);

keeperSelect.addEventListener(

  "change",

  updateHUD

);

difficultySelect.addEventListener(

  "change",

  () => {

    invalidateTimers();

    state.busy =

      false;

    state.keeperChallengeActive =

      false;

    resetRound();

  }

);

cameraSelect.addEventListener(

  "change",

  () => {

    invalidateTimers();

    state.camera =

      cameraSelect.value;

    resizeCanvas();

    if (

      state.mode ===

      "keeper"

    ) {

      prepareKeeperChallenge(

        false

      );

    }

    else {

      resetRound();

    }

  }

);

// RESTART

restartButton.addEventListener(

  "click",

  restartGame

);

// TOUCH SAFETY

canvas.addEventListener(

  "touchstart",

  event =>

    event.preventDefault(),

  {

    passive: false

  }

);

canvas.addEventListener(

  "touchmove",

  event =>

    event.preventDefault(),

  {

    passive: false

  }

);

// RESIZE

window.addEventListener(

  "resize",

  resizeCanvas

);

window.addEventListener(

  "orientationchange",

  () => {

    setTimeout(

      resizeCanvas,

      120

    );

  }

);

// START

updateHUD();

resizeCanvas();

resetRound();

cancelAnimationFrame(

  animationId

);

animationId =

  requestAnimationFrame(

    loop

);
