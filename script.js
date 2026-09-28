"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const canvas =
  document.getElementById(
    "gameCanvas"
  );

const ctx =
  canvas.getContext(
    "2d",
    {
      alpha: false
    }
  );


const scoreEl =
  document.getElementById(
    "score"
  );

const levelEl =
  document.getElementById(
    "level"
  );

const goalsEl =
  document.getElementById(
    "goals"
  );

const savesEl =
  document.getElementById(
    "saves"
  );

const streakEl =
  document.getElementById(
    "streak"
  );

const bestStreakEl =
  document.getElementById(
    "bestStreak"
  );


const playerSelect =
  document.getElementById(
    "playerSelect"
  );

const keeperSelect =
  document.getElementById(
    "keeperSelect"
  );

const difficultySelect =
  document.getElementById(
    "difficulty"
  );

const cameraSelect =
  document.getElementById(
    "cameraSelect"
  );


const selectedPlayerEl =
  document.getElementById(
    "selectedPlayer"
  );

const selectedKeeperEl =
  document.getElementById(
    "selectedKeeper"
  );

const modeTitleEl =
  document.getElementById(
    "modeTitle"
  );

const messageEl =
  document.getElementById(
    "message"
  );

const distanceEl =
  document.getElementById(
    "distance"
  );

const tipEl =
  document.getElementById(
    "tip"
  );


const flashEl =
  document.getElementById(
    "flash"
  );


const powerMeter =
  document.getElementById(
    "powerMeter"
  );

const powerFill =
  document.getElementById(
    "powerFill"
  );


const shootControls =
  document.getElementById(
    "shootControls"
  );

const keeperControls =
  document.getElementById(
    "keeperControls"
  );

const longShotButton =
  document.getElementById(
    "longShotButton"
  );

const targetInfo =
  document.getElementById(
    "targetInfo"
  );


const restartButton =
  document.getElementById(
    "restart"
  );


/* =========================================================
   CANVAS
========================================================= */

let W = 1200;

let H = 700;

let DPR = 1;


/* =========================================================
   GAME STATE
========================================================= */

const state = {

  mode:
    "penalty",

  score:
    0,

  goals:
    0,

  saves:
    0,

  level:
    1,

  streak:
    0,

  bestStreak:
    0,

  busy:
    false,

  keeperChallenge:
    false,

  camera:
    "broadcast",

  targetX:
    null,

  targetY:
    null,

  longShotPower:
    .88,

  incomingZone:
    "center",

  roundId:
    0

};


/* =========================================================
   PLAYER STATS
========================================================= */

const players = {

  "Hassan Ali": {

    power:
      1.00,

    curve:
      1.00,

    accuracy:
      1.00,

    penalty:
      1.00,

    freeKick:
      1.00,

    longShot:
      1.00

  },


  "Ehan Ali": {

    power:
      .98,

    curve:
      1.02,

    accuracy:
      1.01,

    penalty:
      .99,

    freeKick:
      1.01,

    longShot:
      .98

  },


  "Umar Shoaib": {

    power:
      1.03,

    curve:
      1.05,

    accuracy:
      .99,

    penalty:
      1.02,

    freeKick:
      1.03,

    longShot:
      1.04

  },


  /*
    JUDE BELLINGHAM
    SPECIAL PENALTY PLAYER
  */

  "Jude Bellingham": {

    power:
      1.04,

    curve:
      1.04,

    accuracy:
      1.08,

    penalty:
      1.18,

    freeKick:
      1.04,

    longShot:
      1.07

  },


  /*
    LAMINE YAMAL
    SPECIAL FREE KICK PLAYER
  */

  "Lamine Yamal": {

    power:
      1.01,

    curve:
      1.20,

    accuracy:
      1.10,

    penalty:
      1.04,

    freeKick:
      1.25,

    longShot:
      1.08

  },


  "Cristiano Ronaldo": {

    power:
      1.09,

    curve:
      1.07,

    accuracy:
      1.05,

    penalty:
      1.08,

    freeKick:
      1.10,

    longShot:
      1.12

  },


  "Lionel Messi": {

    power:
      .99,

    curve:
      1.18,

    accuracy:
      1.12,

    penalty:
      1.12,

    freeKick:
      1.20,

    longShot:
      1.05

  },


  "Kylian Mbappé": {

    power:
      1.08,

    curve:
      1.06,

    accuracy:
      1.03,

    penalty:
      1.04,

    freeKick:
      1.03,

    longShot:
      1.11

  },


  "Erling Haaland": {

    power:
      1.14,

    curve:
      .96,

    accuracy:
      1.01,

    penalty:
      1.07,

    freeKick:
      .94,

    longShot:
      1.22

  },


  "Neymar Jr.": {

    power:
      1.01,

    curve:
      1.19,

    accuracy:
      1.06,

    penalty:
      1.05,

    freeKick:
      1.18,

    longShot:
      1.03

  },


  "Mohamed Salah": {

    power:
      1.03,

    curve:
      1.11,

    accuracy:
      1.04,

    penalty:
      1.05,

    freeKick:
      1.05,

    longShot:
      1.07

  },


  "Vinícius Júnior": {

    power:
      1.04,

    curve:
      1.12,

    accuracy:
      1.02,

    penalty:
      1.00,

    freeKick:
      1.03,

    longShot:
      1.08

  },


  "Kevin De Bruyne": {

    power:
      1.02,

    curve:
      1.16,

    accuracy:
      1.08,

    penalty:
      1.04,

    freeKick:
      1.17,

    longShot:
      1.09

  },


  "Robert Lewandowski": {

    power:
      1.07,

    curve:
      1.02,

    accuracy:
      1.07,

    penalty:
      1.13,

    freeKick:
      .98,

    longShot:
      1.09

  },


  "Harry Kane": {

    power:
      1.08,

    curve:
      1.05,

    accuracy:
      1.08,

    penalty:
      1.14,

    freeKick:
      1.02,

    longShot:
      1.13

  },


  "Son Heung-min": {

    power:
      1.06,

    curve:
      1.09,

    accuracy:
      1.05,

    penalty:
      1.03,

    freeKick:
      1.07,

    longShot:
      1.14

  },


  "Rodri": {

    power:
      1.05,

    curve:
      1.02,

    accuracy:
      1.04,

    penalty:
      1.01,

    freeKick:
      .99,

    longShot:
      1.12

  },


  "Antoine Griezmann": {

    power:
      1.01,

    curve:
      1.13,

    accuracy:
      1.07,

    penalty:
      1.08,

    freeKick:
      1.12,

    longShot:
      1.05

  },


  "Ousmane Dembélé": {

    power:
      1.04,

    curve:
      1.10,

    accuracy:
      1.01,

    penalty:
      .99,

    freeKick:
      1.03,

    longShot:
      1.08

  },


  "Jamal Musiala": {

    power:
      1.00,

    curve:
      1.13,

    accuracy:
      1.05,

    penalty:
      1.02,

    freeKick:
      1.08,

    longShot:
      1.06

  },


  "Phil Foden": {

    power:
      1.00,

    curve:
      1.12,

    accuracy:
      1.06,

    penalty:
      1.03,

    freeKick:
      1.09,

    longShot:
      1.06

  },


  "Raphinha": {

    power:
      1.05,

    curve:
      1.12,

    accuracy:
      1.04,

    penalty:
      1.02,

    freeKick:
      1.09,

    longShot:
      1.09

  }

};


/* =========================================================
   GOALKEEPERS
========================================================= */

const keepers = {

  /*
    HASSAN ALI
    CUSTOM BEST GOALKEEPER
  */

  "Hassan Ali": {

    diving:
      1.35,

    reflexes:
      1.35,

    reach:
      1.30,

    speed:
      1.30,

    reaction:
      1.35

  },


  "Ehan Ali": {

    diving:
      1.00,

    reflexes:
      1.00,

    reach:
      1.00,

    speed:
      1.00,

    reaction:
      1.00

  },


  "Thibaut Courtois": {

    diving:
      1.17,

    reflexes:
      1.04,

    reach:
      1.20,

    speed:
      .98,

    reaction:
      1.05

  },


  "Alisson": {

    diving:
      1.09,

    reflexes:
      1.12,

    reach:
      1.08,

    speed:
      1.08,

    reaction:
      1.10

  },


  "Manuel Neuer": {

    diving:
      1.06,

    reflexes:
      1.08,

    reach:
      1.05,

    speed:
      1.13,

    reaction:
      1.08

  },


  "Gianluigi Donnarumma": {

    diving:
      1.17,

    reflexes:
      1.08,

    reach:
      1.18,

    speed:
      1.00,

    reaction:
      1.08

  },


  "Ederson": {

    diving:
      1.02,

    reflexes:
      1.05,

    reach:
      1.02,

    speed:
      1.12,

    reaction:
      1.05

  },


  "Jan Oblak": {

    diving:
      1.13,

    reflexes:
      1.12,

    reach:
      1.10,

    speed:
      1.01,

    reaction:
      1.12

  },


  "Marc-André ter Stegen": {

    diving:
      1.08,

    reflexes:
      1.12,

    reach:
      1.05,

    speed:
      1.07,

    reaction:
      1.10

  },


  "Emiliano Martínez": {

    diving:
      1.08,

    reflexes:
      1.06,

    reach:
      1.08,

    speed:
      1.05,

    reaction:
      1.08

  }

};


/* =========================================================
   DIFFICULTY
========================================================= */

const difficultyData = {

  easy: {

    accuracy:
      .28,

    radius:
      77,

    reaction:
      420

  },


  normal: {

    accuracy:
      .46,

    radius:
      64,

    reaction:
      315

  },


  hard: {

    accuracy:
      .65,

    radius:
      53,

    reaction:
      235

  },


  legend: {

    accuracy:
      .78,

    radius:
      44,

    reaction:
      165

  }

};


/* =========================================================
   BALL
========================================================= */

const ball = {

  x:
    0,

  y:
    0,

  startX:
    0,

  startY:
    0,

  targetX:
    0,

  targetY:
    0,

  progress:
    0,

  curve:
    0,

  arc:
    0,

  radius:
    12,

  visible:
    true

};


/* =========================================================
   KEEPER
========================================================= */

const keeper = {

  x:
    0,

  y:
    0,

  targetX:
    0,

  targetY:
    0,

  pose:
    0

};


/* =========================================================
   PARTICLES
========================================================= */

let particles = [];

let confetti = [];


/* =========================================================
   HELPERS
========================================================= */

function clamp(
  value,
  min,
  max
) {

  return Math.max(
    min,
    Math.min(
      max,
      value
    )
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


function ease(
  t
) {

  return t * t *
    (3 - 2 * t);

}


function random(
  min,
  max
) {

  return min +
    Math.random() *
    (max - min);

}


/* =========================================================
   GOAL GEOMETRY
========================================================= */

function goalGeometry() {

  if (
    state.camera ===
    "close"
  ) {

    return {

      x:
        W * .13,

      y:
        H * .10,

      width:
        W * .74,

      height:
        H * .37

    };

  }


  if (
    state.camera ===
    "wide"
  ) {

    return {

      x:
        W * .25,

      y:
        H * .14,

      width:
        W * .50,

      height:
        H * .28

    };

  }


  return {

    x:
      W * .20,

    y:
      H * .12,

    width:
      W * .60,

    height:
      H * .31

  };

}


/* =========================================================
   START POSITIONS
========================================================= */

function penaltyStart() {

  return {

    x:
      W / 2,

    y:
      H * .74

  };

}


function freeKickStart() {

  return {

    x:
      W / 2,

    y:
      H * .73

  };

}


function longShotStart() {

  return {

    x:
      W / 2,

    y:
      H * .82

  };

}


/* =========================================================
   RESIZE
========================================================= */

function resizeCanvas() {

  const rect =
    canvas.getBoundingClientRect();


  W =
    Math.max(
      320,
      Math.floor(
        rect.width
      )
    );


  H =
    Math.max(
      390,
      Math.floor(
        rect.height
      )
    );


  DPR =
    Math.min(
      window.devicePixelRatio ||
      1,
      2
    );


  canvas.width =
    W * DPR;

  canvas.height =
    H * DPR;


  ctx.setTransform(
    DPR,
    0,
    0,
    DPR,
    0,
    0
  );


  positionObjects();

}


/* =========================================================
   POSITION OBJECTS
========================================================= */

function positionObjects() {

  const g =
    goalGeometry();


  keeper.x =
    W / 2;

  keeper.y =
    g.y +
    g.height *
    .77;

  keeper.targetX =
    keeper.x;

  keeper.targetY =
    keeper.y;


  if (
    state.mode ===
    "keeper"
  ) {

    return;

  }


  let start;


  if (
    state.mode ===
    "penalty"
  ) {

    start =
      penaltyStart();

  }

  else if (
    state.mode ===
    "freekick"
  ) {

    start =
      freeKickStart();

  }

  else {

    start =
      longShotStart();

  }


  ball.x =
    start.x;

  ball.y =
    start.y;

  ball.startX =
    start.x;

  ball.startY =
    start.y;

}


/* =========================================================
   HUD
========================================================= */

function updateHUD() {

  scoreEl.textContent =
    state.score;

  levelEl.textContent =
    state.level;

  goalsEl.textContent =
    state.goals;

  savesEl.textContent =
    state.saves;

  streakEl.textContent =
    state.streak;

  bestStreakEl.textContent =
    state.bestStreak;


  selectedPlayerEl.textContent =
    playerSelect.value;


  selectedKeeperEl.textContent =
    `vs ${keeperSelect.value}`;


  if (
    state.mode ===
    "penalty"
  ) {

    modeTitleEl.textContent =
      "PENALTY";

  }

  else if (
    state.mode ===
    "freekick"
  ) {

    modeTitleEl.textContent =
      "FREE KICK";

  }

  else if (
    state.mode ===
    "longshot"
  ) {

    modeTitleEl.textContent =
      "LONG SHOT";

  }

  else {

    modeTitleEl.textContent =
      "GOALKEEPER";

  }

}


/* =========================================================
   MESSAGE
========================================================= */

function message(
  text
) {

  messageEl.textContent =
    text;

}


/* =========================================================
   FLASH
========================================================= */

function flash() {

  flashEl.classList.remove(
    "show"
  );

  void flashEl.offsetWidth;

  flashEl.classList.add(
    "show"
  );

}


/* =========================================================
   DISTANCE
========================================================= */

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

    const d =
      Math.round(
        random(
          20,
          31
        )
      );

    distanceEl.textContent =
      `Distance: ${d} m`;

  }

  else if (
    state.mode ===
    "longshot"
  ) {

    const d =
      Math.round(
        random(
          25,
          39
        )
      );

    distanceEl.textContent =
      `Distance: ${d} m`;

  }

  else {

    distanceEl.textContent =
      "INCOMING SHOT";

  }

}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles(
  x,
  y,
  goal = false
) {

  for (
    let i = 0;
    i < 45;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;


    const speed =
      random(
        80,
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
        random(
          20,
          130
        ),

      life:
        1,

      size:
        random(
          2,
          5
        ),

      goal

    });

  }

}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

  for (
    let i = 0;
    i < 110;
    i++
  ) {

    confetti.push({

      x:
        W / 2 +
        random(
          -100,
          100
        ),

      y:
        H * .35,

      vx:
        random(
          -270,
          270
        ),

      vy:
        random(
          -450,
          -130
        ),

      life:
        1,

      size:
        random(
          3,
          7
        ),

      rotation:
        random(
          0,
          Math.PI * 2
        ),

      spin:
        random(
          -7,
          7
        )

    });

  }

}


/* =========================================================
   UPDATE PARTICLES
========================================================= */

function updateParticles(
  dt
) {

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
      p =>
        p.life > 0
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

    c.rotation +=
      c.spin * dt;

    c.life -=
      dt * .65;

  }


  confetti =
    confetti.filter(
      c =>
        c.life > 0
    );

}


/* =========================================================
   DRAW PARTICLES
========================================================= */

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
      p.goal
        ? "#ffe13b"
        : "#ffffff";


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


  ctx.globalAlpha =
    1;


  const colors = [

    "#ffeb45",
    "#65eaff",
    "#ff708d",
    "#ffffff",
    "#9eff67"

  ];


  for (
    const c of confetti
  ) {

    ctx.save();

    ctx.globalAlpha =
      c.life;

    ctx.translate(
      c.x,
      c.y
    );

    ctx.rotate(
      c.rotation
    );


    ctx.fillStyle =
      colors[
        Math.abs(
          Math.floor(
            c.x
          )
        ) %
        colors.length
      ];


    ctx.fillRect(
      -c.size,
      -c.size / 2,
      c.size * 2,
      c.size
    );


    ctx.restore();

  }


  ctx.globalAlpha =
    1;

}


/* =========================================================
   FIELD
========================================================= */

function drawField() {

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H
    );


  gradient.addColorStop(
    0,
    "#159b47"
  );

  gradient.addColorStop(
    .5,
    "#087d35"
  );

  gradient.addColorStop(
    1,
    "#045c28"
  );


  ctx.fillStyle =
    gradient;


  ctx.fillRect(
    0,
    0,
    W,
    H
  );


  /*
    STADIUM
  */

  ctx.fillStyle =
    "#18251e";


  ctx.fillRect(
    0,
    0,
    W,
    H * .15
  );


  /*
    LIGHTS
  */

  const lights = [
    .12,
    .30,
    .50,
    .70,
    .88
  ];


  for (
    const x of lights
  ) {

    ctx.shadowColor =
      "#ffffff";

    ctx.shadowBlur =
      18;


    ctx.fillStyle =
      "#ffffff";


    ctx.beginPath();

    ctx.arc(
      W * x,
      H * .055,
      7,
      0,
      Math.PI * 2
    );

    ctx.fill();

  }


  ctx.shadowBlur =
    0;


  /*
    PITCH STRIPES
  */

  for (
    let i = 0;
    i < 15;
    i++
  ) {

    ctx.fillStyle =
      i % 2 === 0
        ? "rgba(255,255,255,.035)"
        : "rgba(0,0,0,.035)";


    ctx.fillRect(
      W * .04,
      H * .15 +
        i *
        H *
        .82 /
        15,
      W * .92,
      H *
        .82 /
        15 +
        1
    );

  }


  ctx.strokeStyle =
    "#ffffffdd";

  ctx.lineWidth =
    Math.max(
      2,
      W / 500
    );


  /*
    OUTLINE
  */

  ctx.strokeRect(
    W * .04,
    H * .15,
    W * .92,
    H * .82
  );


  /*
    HALF WAY
  */

  ctx.beginPath();

  ctx.moveTo(
    W * .04,
    H * .56
  );

  ctx.lineTo(
    W * .96,
    H * .56
  );

  ctx.stroke();


  /*
    CENTER CIRCLE
  */

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * .56,
    Math.min(
      W,
      H
    ) * .12,
    0,
    Math.PI * 2
  );

  ctx.stroke();


  /*
    PENALTY AREA
  */

  ctx.strokeRect(
    W * .11,
    H * .15,
    W * .78,
    H * .40
  );


  /*
    SIX YARD AREA
  */

  ctx.strokeRect(
    W * .26,
    H * .15,
    W * .48,
    H * .23
  );


  /*
    PENALTY SPOT
  */

  ctx.fillStyle =
    "#ffffff";


  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * .51,
    4,
    0,
    Math.PI * 2
  );

  ctx.fill();


  drawGoal();


  if (
    state.mode ===
    "freekick"
  ) {

    drawWall();

  }

}


/* =========================================================
   GOAL
========================================================= */

function drawGoal() {

  const g =
    goalGeometry();


  ctx.fillStyle =
    "rgba(255,255,255,.07)";


  ctx.fillRect(
    g.x,
    g.y,
    g.width,
    g.height
  );


  ctx.strokeStyle =
    "rgba(255,255,255,.22)";

  ctx.lineWidth =
    1;


  const vertical =
    Math.max(
      20,
      g.width / 16
    );


  const horizontal =
    Math.max(
      15,
      g.height / 9
    );


  for (
    let x = g.x;
    x <=
      g.x +
      g.width;
    x += vertical
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
      g.height;
    y += horizontal
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
    "#d8e4dc";

  ctx.lineWidth =
    3;


  ctx.strokeRect(
    g.x + 7,
    g.y + 7,
    g.width - 14,
    g.height - 14
  );

}


/* =========================================================
   WALL
========================================================= */

function drawWall() {

  const y =
    H * .49;


  const count =
    clamp(
      4 +
      Math.floor(
        state.level / 3
      ),
      4,
      7
    );


  const spacing =
    Math.min(
      W * .055,
      62
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
      i * spacing,
      y
    );

  }


  ctx.fillStyle =
    "#ffffffcc";

  ctx.font =
    "bold 11px Arial";

  ctx.textAlign =
    "center";


  ctx.fillText(
    "DEFENSIVE WALL",
    W / 2,
    y + 43
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


  const scale =
    clamp(
      Math.min(
        W,
        H
      ) /
      700,
      .65,
      1.2
    );


  ctx.strokeStyle =
    "#101b14";

  ctx.lineWidth =
    7 *
    scale;


  ctx.beginPath();

  ctx.moveTo(
    -5 * scale,
    14 * scale
  );

  ctx.lineTo(
    -8 * scale,
    34 * scale
  );

  ctx.moveTo(
    5 * scale,
    14 * scale
  );

  ctx.lineTo(
    8 * scale,
    34 * scale
  );

  ctx.stroke();


  ctx.fillStyle =
    "#304fa3";


  ctx.fillRect(
    -12 * scale,
    -10 * scale,
    24 * scale,
    28 * scale
  );


  ctx.fillStyle =
    "#c98a65";


  ctx.beginPath();

  ctx.arc(
    0,
    -23 * scale,
    8 * scale,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.strokeStyle =
    "#304fa3";

  ctx.lineWidth =
    6 * scale;


  ctx.beginPath();

  ctx.moveTo(
    -10 * scale,
    -2 * scale
  );

  ctx.lineTo(
    -18 * scale,
    9 * scale
  );

  ctx.moveTo(
    10 * scale,
    -2 * scale
  );

  ctx.lineTo(
    18 * scale,
    9 * scale
  );

  ctx.stroke();


  ctx.restore();

}


/* =========================================================
   PLAYER FIGURE
========================================================= */

function drawPlayer() {

  if (
    state.mode ===
    "keeper"
  ) {

    return;

  }


  let start;


  if (
    state.mode ===
    "penalty"
  ) {

    start =
      penaltyStart();

  }

  else if (
    state.mode ===
    "freekick"
  ) {

    start =
      freeKickStart();

  }

  else {

    start =
      longShotStart();

  }


  ctx.save();


  ctx.translate(
    start.x,
    start.y + 15
  );


  const s =
    clamp(
      Math.min(
        W,
        H
      ) /
      700,
      .65,
      1.15
    );


  /*
    SHADOW
  */

  ctx.fillStyle =
    "rgba(0,0,0,.23)";


  ctx.beginPath();

  ctx.ellipse(
    0,
    25 * s,
    30 * s,
    8 * s,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /*
    LEGS
  */

  ctx.strokeStyle =
    "#f5f5f5";

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


  /*
    SHIRT
  */

  ctx.fillStyle =
    "#e9edf0";


  ctx.fillRect(
    -22 * s,
    -30 * s,
    44 * s,
    44 * s
  );


  /*
    HEAD
  */

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


  /*
    ARMS
  */

  ctx.strokeStyle =
    "#25352c";

  ctx.lineWidth =
    7 * s;


  ctx.beginPath();

  ctx.moveTo(
    -17 * s,
    -15 * s
  );

  ctx.lineTo(
    -30 * s,
    2 * s
  );

  ctx.moveTo(
    17 * s,
    -15 * s
  );

  ctx.lineTo(
    30 * s,
    2 * s
  );

  ctx.stroke();


  ctx.restore();

}


/* =========================================================
   KEEPER
========================================================= */

function drawKeeper() {

  ctx.save();


  ctx.translate(
    keeper.x,
    keeper.y
  );


  const s =
    clamp(
      Math.min(
        W,
        H
      ) /
      700,
      .65,
      1.2
    );


  ctx.rotate(
    keeper.pose
  );


  /*
    SHADOW
  */

  ctx.fillStyle =
    "rgba(0,0,0,.27)";


  ctx.beginPath();

  ctx.ellipse(
    0,
    35 * s,
    40 * s,
    9 * s,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /*
    LEGS
  */

  ctx.strokeStyle =
    "#14281b";

  ctx.lineWidth =
    12 * s;


  ctx.beginPath();

  ctx.moveTo(
    -10 * s,
    10 * s
  );

  ctx.lineTo(
    -18 * s,
    43 * s
  );

  ctx.moveTo(
    10 * s,
    10 * s
  );

  ctx.lineTo(
    18 * s,
    43 * s
  );

  ctx.stroke();


  /*
    SHIRT
  */

  const shirt =
    ctx.createLinearGradient(
      -25 * s,
      -30 * s,
      25 * s,
      25 * s
    );


  shirt.addColorStop(
    0,
    "#ffe62b"
  );


  shirt.addColorStop(
    1,
    "#dc8b00"
  );


  ctx.fillStyle =
    shirt;


  ctx.fillRect(
    -25 * s,
    -30 * s,
    50 * s,
    50 * s
  );


  /*
    HEAD
  */

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


  /*
    HAIR
  */

  ctx.fillStyle =
    "#25170f";


  ctx.beginPath();

  ctx.arc(
    0,
    -52 * s,
    16 * s,
    Math.PI,
    Math.PI * 2
  );

  ctx.fill();


  /*
    ARMS
  */

  ctx.strokeStyle =
    "#ffca18";

  ctx.lineWidth =
    12 * s;


  ctx.beginPath();

  ctx.moveTo(
    -20 * s,
    -15 * s
  );

  ctx.lineTo(
    -45 * s,
    3 * s
  );

  ctx.moveTo(
    20 * s,
    -15 * s
  );

  ctx.lineTo(
    45 * s,
    3 * s
  );

  ctx.stroke();


  /*
    GLOVES
  */

  ctx.fillStyle =
    "#ffffff";


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


/* =========================================================
   BALL
========================================================= */

function drawBall() {

  if (
    !ball.visible
  ) {

    return;

  }


  ctx.save();


  ctx.shadowColor =
    "rgba(0,0,0,.55)";

  ctx.shadowBlur =
    12;


  const r =
    ball.radius;


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
    "#b8c3bd"
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


  ctx.shadowBlur =
    0;


  ctx.fillStyle =
    "#252525";


  ctx.beginPath();

  ctx.arc(
    ball.x -
      r * .20,
    ball.y -
      r * .15,
    r * .22,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.beginPath();

  ctx.arc(
    ball.x +
      r * .30,
    ball.y +
      r * .20,
    r * .14,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.strokeStyle =
    "#222";

  ctx.lineWidth =
    1.5;

  ctx.stroke();


  ctx.restore();

}


/* =========================================================
   LONG SHOT TARGET
========================================================= */

function drawLongShotTarget() {

  if (
    state.mode !==
      "longshot" ||
    state.busy ||
    state.targetX === null
  ) {

    return;

  }


  ctx.save();


  ctx.strokeStyle =
    "#ffffff";

  ctx.lineWidth =
    3;


  ctx.shadowColor =
    "#000";

  ctx.shadowBlur =
    8;


  ctx.beginPath();

  ctx.arc(
    state.targetX,
    state.targetY,
    17,
    0,
    Math.PI * 2
  );

  ctx.stroke();


  ctx.beginPath();

  ctx.moveTo(
    state.targetX - 25,
    state.targetY
  );

  ctx.lineTo(
    state.targetX + 25,
    state.targetY
  );

  ctx.moveTo(
    state.targetX,
    state.targetY - 25
  );

  ctx.lineTo(
    state.targetX,
    state.targetY + 25
  );

  ctx.stroke();


  ctx.shadowBlur =
    0;


  ctx.fillStyle =
    "#ff5c36";


  ctx.beginPath();

  ctx.arc(
    state.targetX,
    state.targetY,
    5,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.restore();

}


/* =========================================================
   KEEPER POV
========================================================= */

function drawKeeperPOV() {

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H
    );


  gradient.addColorStop(
    0,
    "#126e34"
  );


  gradient.addColorStop(
    1,
    "#043d20"
  );


  ctx.fillStyle =
    gradient;


  ctx.fillRect(
    0,
    0,
    W,
    H
  );


  const g =
    goalGeometry();


  ctx.strokeStyle =
    "#ffffff";

  ctx.lineWidth =
    Math.max(
      7,
      W / 150
    );


  ctx.strokeRect(
    W * .09,
    H * .09,
    W * .82,
    H * .58
  );


  ctx.strokeStyle =
    "rgba(255,255,255,.22)";

  ctx.lineWidth =
    1;


  for (
    let x =
      W * .09;
    x <=
      W * .91;
    x +=
      Math.max(
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
      H * .67
    );

    ctx.stroke();

  }


  for (
    let y =
      H * .09;
    y <=
      H * .67;
    y +=
      Math.max(
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


  /*
    INCOMING BALL
  */

  if (
    state.keeperChallenge
  ) {

    const p =
      clamp(
        ball.progress,
        0,
        1
      );


    const radius =
      lerp(
        8,
        27,
        p
      );


    ctx.save();


    ctx.shadowColor =
      "#ffffff";

    ctx.shadowBlur =
      18;


    ctx.fillStyle =
      "#ffffff";


    ctx.beginPath();

    ctx.arc(
      ball.x,
      ball.y,
      radius,
      0,
      Math.PI * 2
    );

    ctx.fill();


    ctx.shadowBlur =
      0;


    ctx.strokeStyle =
      "#222";

    ctx.lineWidth =
      2;

    ctx.stroke();


    ctx.restore();

  }


  /*
    GLOVES
  */

  ctx.fillStyle =
    "#ffffff";


  ctx.beginPath();

  ctx.ellipse(
    W * .20,
    H * .90,
    58,
    28,
    -.35,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.beginPath();

  ctx.ellipse(
    W * .80,
    H * .90,
    58,
    28,
    .35,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /*
    BOTTOM HUD
  */

  ctx.fillStyle =
    "rgba(0,0,0,.38)";


  ctx.fillRect(
    0,
    H - 58,
    W,
    58
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
    H - 29
  );

}


/* =========================================================
   SHOT TARGET
========================================================= */

function targetForZone(
  zone
) {

  const g =
    goalGeometry();


  let horizontal;


  if (
    zone ===
    "left"
  ) {

    horizontal =
      .18;

  }

  else if (
    zone ===
    "right"
  ) {

    horizontal =
      .82;

  }

  else {

    horizontal =
      .50;

  }


  return {

    x:
      g.x +
      g.width *
      horizontal,

    y:
      g.y +
      g.height *
      random(
        .17,
        .48
      )

  };

}


/* =========================================================
   NORMAL SHOT
========================================================= */

function startNormalShot(
  zone
) {

  if (
    state.busy ||
    state.mode ===
      "keeper"
  ) {

    return;

  }


  state.busy =
    true;


  const player =
    players[
      playerSelect.value
    ] ||
    players[
      "Hassan Ali"
    ];


  const difficulty =
    difficultyData[
      difficultySelect.value
    ];


  const gk =
    keepers[
      keeperSelect.value
    ] ||
    keepers[
      "Ehan Ali"
    ];


  const target =
    targetForZone(
      zone
    );


  let start;


  if (
    state.mode ===
    "penalty"
  ) {

    start =
      penaltyStart();

  }

  else {

    start =
      freeKickStart();

  }


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


  ball.progress =
    0;


  const specialty =
    state.mode ===
      "penalty"
      ? player.penalty
      : player.freeKick;


  const baseCurve =
    state.mode ===
      "freekick"
      ? 110
      : 42;


  ball.curve =
    (
      zone ===
      "left"
        ? -1
        : zone ===
          "right"
          ? 1
          : 0
    ) *
    baseCurve *
    player.curve *
    specialty;


  ball.arc =
    state.mode ===
      "freekick"
      ? 45
      : 15;


  ball.radius =
    12;


  const accuracy =
    difficulty.accuracy +
    (
      state.level - 1
    ) *
    .025;


  const keeperReads =
    Math.random() <
    clamp(
      accuracy /
      specialty,
      .12,
      .90
    );


  const zones = [
    "left",
    "center",
    "right"
  ];


  const keeperZone =
    keeperReads
      ? zone
      : zones[
          Math.floor(
            Math.random() *
            zones.length
          )
        ];


  const keeperTarget =
    targetForKeeper(
      keeperZone
    );


  keeper.targetX =
    keeperTarget.x;

  keeper.targetY =
    keeperTarget.y;


  keeper.pose =
    keeperZone ===
      "left"
      ? -.28
      : keeperZone ===
        "right"
        ? .28
        : 0;


  state.shotStart =
    performance.now();


  state.shotDuration =
    state.mode ===
      "freekick"
      ? 900
      : 720;


  keeper.moveStart =
    state.shotStart +
    difficulty.reaction;


  message(
    state.mode ===
      "freekick"
      ? "BEND IT! 🎯"
      : "SHOT! ⚡"
  );


  tipEl.textContent =
    state.mode ===
      "freekick"
      ? "Lamine Yamal has the strongest free-kick curve."
      : "Jude Bellingham has the strongest penalty bonus.";


  powerMeter.classList.remove(
    "hidden"
  );

}


/* =========================================================
   KEEPER TARGET
========================================================= */

function targetForKeeper(
  zone
) {

  const g =
    goalGeometry();


  let x;


  if (
    zone ===
    "left"
  ) {

    x =
      g.x +
      g.width *
      .18;

  }

  else if (
    zone ===
    "right"
  ) {

    x =
      g.x +
      g.width *
      .82;

  }

  else {

    x =
      W / 2;

  }


  return {

    x,

    y:
      g.y +
      g.height *
      .65

  };

}


/* =========================================================
   LONG SHOT TARGET
========================================================= */

function selectLongShotTarget(
  event
) {

  if (
    state.mode !==
    "longshot" ||
    state.busy
  ) {

    return;

  }


  const rect =
    canvas.getBoundingClientRect();


  const x =
    event.clientX -
    rect.left;


  const y =
    event.clientY -
    rect.top;


  const g =
    goalGeometry();


  const insideGoal =
    x >= g.x &&
    x <=
      g.x +
      g.width &&
    y >= g.y &&
    y <=
      g.y +
      g.height;


  if (
    !insideGoal
  ) {

    message(
      "TAP INSIDE THE GOAL!"
    );

    return;

  }


  state.targetX =
    x;

  state.targetY =
    y;


  message(
    "TARGET LOCKED 🎯"
  );


  tipEl.textContent =
    "Target selected. Press SHOOT!";


  draw();

}


/* =========================================================
   LONG SHOT
========================================================= */

function takeLongShot() {

  if (
    state.mode !==
      "longshot" ||
    state.busy ||
    state.targetX === null
  ) {

    if (
      state.targetX === null
    ) {

      message(
        "CHOOSE A TARGET FIRST!"
      );

    }

    return;

  }


  state.busy =
    true;


  const player =
    players[
      playerSelect.value
    ] ||
    players[
      "Hassan Ali"
    ];


  const difficulty =
    difficultyData[
      difficultySelect.value
    ];


  const gk =
    keepers[
      keeperSelect.value
    ] ||
    keepers[
      "Ehan Ali"
    ];


  const start =
    longShotStart();


  ball.startX =
    start.x;

  ball.startY =
    start.y;

  ball.x =
    start.x;

  ball.y =
    start.y;


  ball.targetX =
    state.targetX;

  ball.targetY =
    state.targetY;


  ball.progress =
    0;


  ball.curve =
    random(
      -32,
      32
    ) *
    player.curve;


  ball.arc =
    75 *
    player.longShot;


  ball.radius =
    13;


  state.shotStart =
    performance.now();


  state.shotDuration =
    1150;


  /*
    LONG SHOT KEEPER
  */

  const predictedZone =
    ball.targetX <
      W * .38
      ? "left"
      : ball.targetX >
        W * .62
        ? "right"
        : "center";


  const read =
    Math.random() <
    clamp(
      difficulty.accuracy -
      .12,
      .10,
      .82
    );


  const keeperZone =
    read
      ? predictedZone
      : [
          "left",
          "center",
          "right"
        ][
          Math.floor(
            Math.random() * 3
          )
        ];


  const keeperTarget =
    targetForKeeper(
      keeperZone
    );


  keeper.targetX =
    keeperTarget.x;

  keeper.targetY =
    keeperTarget.y;


  keeper.pose =
    keeperZone ===
      "left"
      ? -.35
      : keeperZone ===
        "right"
        ? .35
        : 0;


  keeper.moveStart =
    state.shotStart +
    difficulty.reaction;


  message(
    "LONG SHOT! 💥"
  );


  tipEl.textContent =
    "Haaland has the strongest long-shot power in this game.";


  powerMeter.classList.remove(
    "hidden"
  );

}


/* =========================================================
   FINISH NORMAL SHOT
========================================================= */

function finishNormalShot() {

  if (
    !state.busy
  ) {

    return;

  }


  state.busy =
    false;


  powerMeter.classList.add(
    "hidden"
  );


  powerFill.style.width =
    "0%";


  const difficulty =
    difficultyData[
      difficultySelect.value
    ];


  const gk =
    keepers[
      keeperSelect.value
    ] ||
    keepers[
      "Ehan Ali"
    ];


  const distance =
    Math.hypot(
      keeper.x -
        ball.targetX,
      keeper.y -
        ball.targetY
    );


  const radius =
    difficulty.radius *
    gk.reach *
    gk.reflexes;


  if (
    distance <
    radius
  ) {

    goalkeeperSaved();

  }

  else {

    goalScored(
      state.mode ===
        "freekick"
        ? 2
        : 1
    );

  }

}


/* =========================================================
   FINISH LONG SHOT
========================================================= */

function finishLongShot() {

  if (
    !state.busy
  ) {

    return;

  }


  state.busy =
    false;


  powerMeter.classList.add(
    "hidden"
  );


  powerFill.style.width =
    "0%";


  const difficulty =
    difficultyData[
      difficultySelect.value
    ];


  const gk =
    keepers[
      keeperSelect.value
    ] ||
    keepers[
      "Ehan Ali"
    ];


  const targetDistance =
    Math.hypot(
      keeper.x -
        ball.targetX,
      keeper.y -
        ball.targetY
    );


  const radius =
    difficulty.radius *
    gk.diving *
    gk.reflexes *
    .82;


  if (
    targetDistance <
    radius
  ) {

    goalkeeperSaved();

  }

  else {

    goalScored(
      3
    );

  }

}


/* =========================================================
   GOAL
========================================================= */

function goalScored(
  points
) {

  state.goals +=
    1;

  state.score +=
    points;

  state.streak +=
    1;


  state.bestStreak =
    Math.max(
      state.bestStreak,
      state.streak
    );


  const newLevel =
    Math.floor(
      state.goals / 3
    ) + 1;


  const levelUp =
    newLevel >
    state.level;


  state.level =
    newLevel;


  createParticles(
    ball.targetX,
    ball.targetY,
    true
  );


  if (
    state.streak >= 3
  ) {

    createConfetti();

    message(
      "HAT-TRICK STREAK! 🔥"
    );

  }

  else if (
    levelUp
  ) {

    message(
      `LEVEL ${state.level}! 🏆`
    );

  }

  else {

    message(
      "GOOOOOAL! ⚽🔥"
    );

  }


  flash();


  updateHUD();


  setTimeout(
    resetRound,
    1050
  );

}


/* =========================================================
   SAVE
========================================================= */

function goalkeeperSaved() {

  state.saves +=
    1;

  state.streak =
    0;


  createParticles(
    ball.targetX,
    ball.targetY,
    false
  );


  message(
    "INCREDIBLE SAVE! 🧤🔥"
  );


  flash();


  updateHUD();


  setTimeout(
    resetRound,
    900
  );

}


/* =========================================================
   KEEPER MODE
========================================================= */

function startKeeperMode() {

  state.keeperChallenge =
    false;

  state.busy =
    false;


  state.targetX =
    null;

  state.targetY =
    null;


  const g =
    goalGeometry();


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
    targetForKeeper(
      state.incomingZone
    );


  ball.startX =
    random(
      g.x +
      g.width * .12,
      g.x +
      g.width * .88
    );


  ball.startY =
    g.y -
    H * .30;


  ball.targetX =
    target.x;


  ball.targetY =
    H * .82;


  ball.x =
    ball.startX;

  ball.y =
    ball.startY;


  ball.progress =
    0;


  ball.curve =
    random(
      -22,
      22
    );


  ball.radius =
    8;


  keeper.x =
    W / 2;

  keeper.y =
    H * .79;

  keeper.pose =
    0;


  message(
    "GET READY! 🧤"
  );


  tipEl.textContent =
    "Tap LEFT, CENTER or RIGHT before the ball reaches you.";


  setDistance();


  setTimeout(
    () => {

      if (
        state.mode !==
        "keeper"
      ) {

        return;

      }


      state.keeperChallenge =
        true;


      state.shotStart =
        performance.now();


      message(
        "SAVE IT! 🧤"
      );

    },
    500
  );

}


/* =========================================================
   KEEPER SAVE INPUT
========================================================= */

function keeperSave(
  zone
) {

  if (
    state.mode !==
      "keeper" ||
    !state.keeperChallenge
  ) {

    return;

  }


  state.keeperChallenge =
    false;


  const correct =
    zone ===
    state.incomingZone;


  if (
    correct
  ) {

    state.saves +=
      1;

    state.score +=
      2;

    state.streak +=
      1;


    state.bestStreak =
      Math.max(
        state.bestStreak,
        state.streak
      );


    createParticles(
      W / 2,
      H * .60,
      true
    );


    message(
      "INCREDIBLE SAVE! 🧤🔥"
    );


    flash();

  }

  else {

    state.streak =
      0;


    message(
      "GOAL! 😱"
    );


    createParticles(
      ball.x,
      ball.y,
      false
    );

  }


  updateHUD();


  setTimeout(
    () => {

      if (
        state.mode ===
        "keeper"
      ) {

        startKeeperMode();

      }

    },
    900
  );

}


/* =========================================================
   RESET ROUND
========================================================= */

function resetRound() {

  state.busy =
    false;


  state.keeperChallenge =
    false;


  state.targetX =
    null;

  state.targetY =
    null;


  ball.visible =
    true;


  ball.progress =
    0;


  ball.curve =
    0;

  ball.arc =
    0;

  ball.radius =
    12;


  powerMeter.classList.add(
    "hidden"
  );


  powerFill.style.width =
    "0%";


  keeper.pose =
    0;


  positionObjects();


  setDistance();


  if (
    state.mode ===
    "penalty"
  ) {

    message(
      "CHOOSE YOUR SHOT"
    );


    tipEl.textContent =
      playerSelect.value ===
      "Jude Bellingham"
        ? "⭐ Bellingham penalty boost active."
        : "Pick LEFT, CENTER or RIGHT.";

  }


  else if (
    state.mode ===
    "freekick"
  ) {

    message(
      "BEND IT AROUND THE WALL!"
    );


    tipEl.textContent =
      playerSelect.value ===
      "Lamine Yamal"
        ? "⭐ Lamine Yamal free-kick boost active."
        : "Curve the ball around the defensive wall.";

  }


  else if (
    state.mode ===
    "longshot"
  ) {

    message(
      "CHOOSE YOUR TARGET"
    );


    targetInfo.classList.remove(
      "hidden"
    );


    tipEl.textContent =
      "Tap anywhere inside the goal to choose exactly where to shoot.";


  }


  else {

    targetInfo.classList.add(
      "hidden"
    );

    startKeeperMode();

  }


  updateHUD();

}


/* =========================================================
   SET MODE
========================================================= */

function setMode(
  mode
) {

  state.mode =
    mode;


  state.busy =
    false;

  state.keeperChallenge =
    false;


  state.targetX =
    null;

  state.targetY =
    null;


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


  const keeper =
    mode ===
    "keeper";


  const longShot =
    mode ===
    "longshot";


  shootControls.classList.toggle(
    "hidden",
    keeper ||
    longShot
  );


  keeperControls.classList.toggle(
    "hidden",
    !keeper
  );


  longShotButton.classList.toggle(
    "hidden",
    !longShot
  );


  targetInfo.classList.toggle(
    "hidden",
    !longShot
  );


  if (
    longShot
  ) {

    targetInfo.textContent =
      "TARGET: TAP ANYWHERE IN THE GOAL";


    message(
      "CHOOSE YOUR TARGET"
    );

  }


  if (
    keeper
  ) {

    startKeeperMode();

  }

  else {

    resetRound();

  }


  updateHUD();

}


/* =========================================================
   CANVAS TAP
========================================================= */

canvas.addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();


    if (
      state.mode ===
      "longshot"
    ) {

      selectLongShotTarget(
        event
      );

      return;

    }


    if (
      state.mode ===
      "keeper"
    ) {

      const rect =
        canvas.getBoundingClientRect();


      const x =
        event.clientX -
        rect.left;


      const zone =
        x <
        W / 3
          ? "left"
          : x <
            W * 2 / 3
            ? "center"
            : "right";


      keeperSave(
        zone
      );

      return;

    }


    if (
      state.busy
    ) {

      return;

    }


    const rect =
      canvas.getBoundingClientRect();


    const x =
      event.clientX -
      rect.left;


    const zone =
      x <
      W / 3
        ? "left"
        : x <
          W * 2 / 3
          ? "center"
          : "right";


    startNormalShot(
      zone
    );

  },
  {
    passive:
      false
  }
);


/* =========================================================
   SHOOT BUTTONS
========================================================= */

document
  .querySelectorAll(
    "#shootControls button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "pointerdown",
        event => {

          event.preventDefault();


          if (
            state.mode ===
            "keeper"
          ) {

            return;

          }


          startNormalShot(
            button.dataset.zone
          );

        }
      );

    }
  );


/* =========================================================
   KEEPER BUTTONS
========================================================= */

document
  .querySelectorAll(
    "#keeperControls button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "pointerdown",
        event => {

          event.preventDefault();


          keeperSave(
            button.dataset.zone
          );

        }
      );

    }
  );


/* =========================================================
   LONG SHOT BUTTON
========================================================= */

longShotButton.addEventListener(
  "click",
  takeLongShot
);


/* =========================================================
   MODE BUTTONS
========================================================= */

document
  .querySelectorAll(
    ".mode"
  )
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


/* =========================================================
   PLAYER CHANGE
========================================================= */

playerSelect.addEventListener(
  "change",
  () => {

    updateHUD();


    if (
      state.mode ===
      "penalty"
    ) {

      if (
        playerSelect.value ===
        "Jude Bellingham"
      ) {

        message(
          "⭐ BELLINGHAM PENALTY SPECIALIST"
        );

      }

    }


    if (
      state.mode ===
      "freekick"
    ) {

      if (
        playerSelect.value ===
        "Lamine Yamal"
      ) {

        message(
          "⭐ YAMAL FREE-KICK SPECIALIST"
        );

      }

    }

  }
);


/* =========================================================
   KEEPER CHANGE
========================================================= */

keeperSelect.addEventListener(
  "change",
  () => {

    updateHUD();


    if (
      keeperSelect.value ===
      "Hassan Ali"
    ) {

      message(
        "🧤 HASSAN ALI — ELITE REFLEXES"
      );

    }

  }
);


/* =========================================================
   DIFFICULTY
========================================================= */

difficultySelect.addEventListener(
  "change",
  () => {

    resetRound();

  }
);


/* =========================================================
   CAMERA
========================================================= */

cameraSelect.addEventListener(
  "change",
  () => {

    state.camera =
      cameraSelect.value;


    resizeCanvas();


    resetRound();

  }
);


/* =========================================================
   RESTART
========================================================= */

restartButton.addEventListener(
  "click",
  () => {

    state.score =
      0;

    state.goals =
      0;

    state.saves =
      0;

    state.level =
      1;

    state.streak =
      0;

    state.bestStreak =
      0;


    particles = [];

    confetti = [];


    message(
      "GAME RESTARTED! ⚽"
    );


    resetRound();

  }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
  "resize",
  () => {

    resizeCanvas();

  }
);


window.addEventListener(
  "orientationchange",
  () => {

    setTimeout(
      resizeCanvas,
      150
    );

  }
);


/* =========================================================
   UPDATE
========================================================= */

function update(
  dt,
  time
) {

  updateParticles(
    dt
  );


  /*
    GOALKEEPER MODE
  */

  if (
    state.mode ===
    "keeper"
  ) {

    if (
      !state.keeperChallenge
    ) {

      return;

    }


    const elapsed =
      time -
      state.shotStart;


    const total =
      1500 -
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


    ball.progress =
      p;


    const e =
      ease(p);


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
      p >=
      1
    ) {

      state.keeperChallenge =
        false;


      state.streak =
        0;


      message(
        "TOO LATE! ⚽"
      );


      updateHUD();


      setTimeout(
        () => {

          if (
            state.mode ===
            "keeper"
          ) {

            startKeeperMode();

          }

        },
        750
      );

    }


    return;

  }


  /*
    NORMAL SHOTS
  */

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
    ease(p);


  ball.progress =
    p;


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
    Math.sin(
      p * Math.PI
    ) *
    ball.arc;


  ball.radius =
    lerp(
      13,
      9,
      p
    );


  /*
    KEEPER MOVEMENT
  */

  if (
    time >=
    keeper.moveStart
  ) {

    const moveProgress =
      clamp(
        (
          time -
          keeper.moveStart
        ) /
        430,
        0,
        1
      );


    const moveEase =
      ease(
        moveProgress
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
        moveEase *
        .65
      );

  }


  /*
    POWER
  */

  const power =
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


  powerFill.style.width =
    `${power}%`;


  /*
    FINISH
  */

  if (
    p >=
    1
  ) {

    if (
      state.mode ===
      "longshot"
    ) {

      finishLongShot();

    }

    else {

      finishNormalShot();

    }

  }

}


/* =========================================================
   DRAW
========================================================= */

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

  drawPlayer();

  drawKeeper();

  drawBall();

  drawLongShotTarget();

  drawParticles();

}


/* =========================================================
   GAME LOOP
========================================================= */

let lastTime =
  performance.now();


function gameLoop(
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
        ) /
        1000
      )
    );


  lastTime =
    time;


  update(
    dt,
    time
  );


  draw();


  requestAnimationFrame(
    gameLoop
  );

}


/* =========================================================
   START GAME
========================================================= */

state.camera =
  cameraSelect.value;


updateHUD();

resizeCanvas();

resetRound();

requestAnimationFrame(
  gameLoop
);
