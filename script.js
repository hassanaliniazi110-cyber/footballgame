"use strict";

/* =========================================================
   FOOTBALL ARENA X
   - Easier goals
   - Real goalkeeper POV
   - Penalty mode
   - Free kick with wall
   - Goalkeeping POV
========================================================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const arena = document.getElementById("arena");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const livesEl = document.getElementById("lives");

const messageEl = document.getElementById("message");
const difficultyEl = document.getElementById("difficulty");

const restartBtn = document.getElementById("restart");
const hintEl = document.getElementById("hint");
const modeTextEl = document.getElementById("modeText");

const controlsEl = document.getElementById("controls");
const diveButton = document.getElementById("diveButton");

const powerWrap = document.getElementById("powerWrap");
const powerFill = document.getElementById("powerFill");
const powerText = document.getElementById("powerText");

const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultSub = document.getElementById("resultSub");
const continueBtn = document.getElementById("continueBtn");


/* =========================================================
   GAME STATE
========================================================= */

let W = 1000;
let H = 600;
let dpr = 1;

let score = 0;
let level = 1;
let lives = 5;

let mode = "penalty";
let state = "ready";

let power = 0.72;
let powerDirection = 1;

let lastTime = performance.now();
let pulse = 0;

let particles = [];
let gameTimer = null;


/* =========================================================
   BALL
========================================================= */

const ball = {
  x: 0,
  y: 0,

  startX: 0,
  startY: 0,

  targetX: 0,
  targetY: 0,

  t: 0,
  duration: 0.6,

  curve: 0,
  arc: 0,

  radius: 13
};


/* =========================================================
   KEEPER
========================================================= */

const keeper = {
  x: 0,
  y: 0,

  startX: 0,
  startY: 0,

  targetX: 0,
  targetY: 0,

  t: 0,
  duration: 1,

  tilt: 0
};


/* =========================================================
   FREE KICK WALL
========================================================= */

const wall = {
  people: 4,
  x: 0,
  y: 0,
  height: 72
};


/* =========================================================
   HELPERS
========================================================= */

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function schedule(callback, delay) {
  clearTimeout(gameTimer);
  gameTimer = setTimeout(callback, delay);
}


/* =========================================================
   CANVAS
========================================================= */

function resizeCanvas() {

  const rect = arena.getBoundingClientRect();

  W = Math.max(320, Math.floor(rect.width));
  H = Math.max(260, Math.floor(rect.height));

  dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);

  canvas.style.width = W + "px";
  canvas.style.height = H + "px";

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  layout();
  draw();
}

window.addEventListener(
  "resize",
  resizeCanvas
);

window.addEventListener(
  "orientationchange",
  () => {
    setTimeout(resizeCanvas, 150);
  }
);


/* =========================================================
   FIELD GEOMETRY
========================================================= */

function getGoal() {

  const width = Math.min(W * 0.78, 920);
  const height = Math.min(H * 0.35, 300);

  return {
    x: (W - width) / 2,
    y: Math.max(38, H * 0.08),
    w: width,
    h: height
  };
}

function getSpot() {

  return {
    x: W / 2,
    y: H * 0.82
  };
}

function getKeeperHome() {

  const g = getGoal();

  return {
    x: W / 2,
    y: g.y + g.h * 0.68
  };
}

function getWallY() {

  return H * 0.59;
}


/* =========================================================
   LAYOUT
========================================================= */

function layout() {

  const home = getKeeperHome();

  keeper.x = home.x;
  keeper.y = home.y;

  keeper.startX = home.x;
  keeper.startY = home.y;

  keeper.targetX = home.x;
  keeper.targetY = home.y;

  keeper.t = 0;
  keeper.tilt = 0;

  const spot = getSpot();

  ball.x = spot.x;
  ball.y = spot.y;

  ball.startX = spot.x;
  ball.startY = spot.y;

  ball.targetX = spot.x;
  ball.targetY = spot.y;

  ball.t = 0;

  ball.curve = 0;
  ball.arc = 0;

  ball.radius = clamp(
    Math.min(W, H) * 0.022,
    10,
    15
  );

  /*
     Easier wall.
     It still grows with level.
  */

  wall.people = clamp(
    3 + Math.floor((level - 1) / 3),
    3,
    6
  );

  wall.height = clamp(
    58 + level * 3,
    58,
    78
  );

  wall.x = W / 2;
  wall.y = getWallY();
}


/* =========================================================
   DRAW
========================================================= */

function draw() {

  if (mode === "keeper") {

    drawGoalkeeperPOV();

  } else {

    drawNormalField();

    if (mode === "freekick") {
      drawWall();
    }

    drawKeeper();
    drawBall();
    drawAim();
  }

  drawParticles();
}


/* =========================================================
   NORMAL FIELD
========================================================= */

function drawNormalField() {

  ctx.clearRect(0, 0, W, H);

  const sky = ctx.createLinearGradient(
    0,
    0,
    0,
    H * 0.3
  );

  sky.addColorStop(0, "#07120c");
  sky.addColorStop(1, "#173824");

  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H * 0.3);

  const grass = ctx.createLinearGradient(
    0,
    H * 0.18,
    0,
    H
  );

  grass.addColorStop(0, "#15974a");
  grass.addColorStop(0.55, "#0d823d");
  grass.addColorStop(1, "#075b29");

  ctx.fillStyle = grass;
  ctx.fillRect(
    0,
    H * 0.18,
    W,
    H * 0.82
  );

  drawStadiumLights();

  for (let i = 0; i < 14; i++) {

    ctx.fillStyle =
      i % 2
        ? "#00000009"
        : "#ffffff07";

    ctx.fillRect(
      0,
      H * 0.18 +
        i * (H * 0.82 / 14),
      W,
      H * 0.82 / 14
    );
  }

  const g = getGoal();

  ctx.strokeStyle = "#ffffffd6";
  ctx.lineWidth = 3;

  /* Penalty box */

  ctx.strokeRect(
    W * 0.08,
    g.y + g.h * 0.82,
    W * 0.84,
    H * 0.30
  );

  /* Six-yard box */

  ctx.strokeRect(
    W * 0.27,
    g.y + g.h * 0.82,
    W * 0.46,
    H * 0.18
  );

  /* Penalty arc */

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * 0.82,
    W * 0.14,
    Math.PI,
    Math.PI * 2
  );

  ctx.stroke();

  /* Spot */

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * 0.82,
    5,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#fff";
  ctx.fill();

  drawGoal(g);
}


/* =========================================================
   STADIUM LIGHTS
========================================================= */

function drawStadiumLights() {

  ctx.fillStyle = "#0a130d";

  ctx.fillRect(
    0,
    0,
    W,
    H * 0.12
  );

  const positions = [
    W * 0.1,
    W * 0.33,
    W * 0.67,
    W * 0.9
  ];

  positions.forEach(x => {

    const glow =
      ctx.createRadialGradient(
        x,
        18,
        2,
        x,
        18,
        90
      );

    glow.addColorStop(
      0,
      "#fff5b0aa"
    );

    glow.addColorStop(
      1,
      "#fff0"
    );

    ctx.fillStyle = glow;

    ctx.fillRect(
      x - 90,
      0,
      180,
      110
    );

    ctx.fillStyle = "#fff1aa";

    ctx.beginPath();

    ctx.arc(
      x,
      18,
      5,
      0,
      Math.PI * 2
    );

    ctx.fill();
  });

  for (let i = 0; i < 80; i++) {

    const x =
      (i / 79) * W;

    const y =
      70 +
      (i % 5) * 7;

    ctx.fillStyle =
      i % 6 === 0
        ? "#ffd96c"
        : "#dce7df55";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      1.8,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}


/* =========================================================
   GOAL
========================================================= */

function drawGoal(g) {

  const glow =
    ctx.createRadialGradient(
      W / 2,
      g.y + g.h * .45,
      10,
      W / 2,
      g.y + g.h * .45,
      g.w * .65
    );

  glow.addColorStop(
    0,
    "#ffffff22"
  );

  glow.addColorStop(
    1,
    "#fff0"
  );

  ctx.fillStyle = glow;

  ctx.fillRect(
    g.x - 60,
    g.y - 50,
    g.w + 120,
    g.h + 100
  );

  ctx.fillStyle = "#f3f7f511";

  ctx.fillRect(
    g.x,
    g.y,
    g.w,
    g.h
  );

  ctx.strokeStyle = "#ffffff2b";
  ctx.lineWidth = 1;

  const sx = Math.max(
    18,
    g.w / 24
  );

  const sy = Math.max(
    14,
    g.h / 12
  );

  for (
    let x = g.x;
    x <= g.x + g.w;
    x += sx
  ) {

    ctx.beginPath();

    ctx.moveTo(
      x,
      g.y
    );

    ctx.lineTo(
      x,
      g.y + g.h
    );

    ctx.stroke();
  }

  for (
    let y = g.y;
    y <= g.y + g.h;
    y += sy
  ) {

    ctx.beginPath();

    ctx.moveTo(
      g.x,
      y
    );

    ctx.lineTo(
      g.x + g.w,
      y
    );

    ctx.stroke();
  }

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 10;

  ctx.strokeRect(
    g.x,
    g.y,
    g.w,
    g.h
  );

  ctx.strokeStyle = "#cbd6cf";
  ctx.lineWidth = 3;

  ctx.strokeRect(
    g.x + 6,
    g.y + 6,
    g.w - 12,
    g.h - 12
  );
}


/* =========================================================
   FREE KICK WALL
========================================================= */

function drawWall() {

  const n = wall.people;

  const spacing =
    42 +
    Math.min(7, level);

  const total =
    (n - 1) * spacing;

  const firstX =
    W / 2 -
    total / 2;

  for (
    let i = 0;
    i < n;
    i++
  ) {

    drawDefender(
      firstX + i * spacing,
      wall.y,
      i
    );
  }
}


function drawDefender(
  x,
  y,
  index
) {

  ctx.save();

  ctx.translate(
    x,
    y
  );

  const bounce =
    Math.sin(
      pulse * 3 +
      index
    ) * 2;

  ctx.translate(
    0,
    bounce
  );

  /* Shadow */

  ctx.fillStyle = "#0007";

  ctx.beginPath();

  ctx.ellipse(
    0,
    42,
    19,
    5,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* Legs */

  ctx.strokeStyle = "#102539";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";

  ctx.beginPath();

  ctx.moveTo(-5, 17);
  ctx.lineTo(-8, 43);

  ctx.moveTo(5, 17);
  ctx.lineTo(8, 43);

  ctx.stroke();

  /* Shirt */

  ctx.fillStyle =
    index % 2
      ? "#24558e"
      : "#1b63a0";

  ctx.fillRect(
    -14,
    -15,
    28,
    34
  );

  /* Arms */

  ctx.strokeStyle = "#173f68";
  ctx.lineWidth = 8;

  ctx.beginPath();

  ctx.moveTo(-12, -7);
  ctx.lineTo(-21, 7);

  ctx.moveTo(12, -7);
  ctx.lineTo(21, 7);

  ctx.stroke();

  /* Head */

  ctx.fillStyle = "#d99b72";

  ctx.beginPath();

  ctx.arc(
    0,
    -29,
    11,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* Hair */

  ctx.fillStyle = "#24170f";

  ctx.beginPath();

  ctx.arc(
    0,
    -32,
    10,
    Math.PI,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}


/* =========================================================
   NORMAL GOALKEEPER
========================================================= */

function drawKeeper() {

  ctx.save();

  ctx.translate(
    keeper.x,
    keeper.y
  );

  ctx.rotate(
    keeper.tilt
  );

  /* Shadow */

  ctx.fillStyle = "#0007";

  ctx.beginPath();

  ctx.ellipse(
    0,
    42,
    48,
    10,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* Legs */

  ctx.strokeStyle = "#213929";
  ctx.lineWidth = 13;
  ctx.lineCap = "round";

  ctx.beginPath();

  ctx.moveTo(-9, 19);
  ctx.lineTo(-20, 50);

  ctx.moveTo(9, 19);
  ctx.lineTo(20, 50);

  ctx.stroke();

  /* Shirt */

  const shirt =
    ctx.createLinearGradient(
      -28,
      -35,
      28,
      25
    );

  shirt.addColorStop(
    0,
    "#ffec42"
  );

  shirt.addColorStop(
    1,
    "#e69b00"
  );

  ctx.fillStyle = shirt;

  ctx.fillRect(
    -26,
    -31,
    52,
    51
  );

  /* Arms */

  ctx.strokeStyle = "#ffd21e";
  ctx.lineWidth = 12;

  ctx.beginPath();

  ctx.moveTo(-22, -12);
  ctx.lineTo(-49, 3);

  ctx.moveTo(22, -12);
  ctx.lineTo(49, 3);

  ctx.stroke();

  /* Gloves */

  ctx.fillStyle = "#f4f6f4";

  ctx.beginPath();

  ctx.arc(
    -51,
    3,
    10,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.beginPath();

  ctx.arc(
    51,
    3,
    10,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* Neck */

  ctx.fillStyle = "#d79b70";

  ctx.fillRect(
    -7,
    -38,
    14,
    9
  );

  /* Head */

  ctx.beginPath();

  ctx.arc(
    0,
    -53,
    18,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* Hair */

  ctx.fillStyle = "#21160f";

  ctx.beginPath();

  ctx.arc(
    0,
    -58,
    17,
    Math.PI,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}


/* =========================================================
   BALL
========================================================= */

function drawBall() {

  const r = ball.radius;

  ctx.save();

  ctx.shadowColor = "#000a";
  ctx.shadowBlur = 14;

  const gradient =
    ctx.createRadialGradient(
      ball.x - r * .35,
      ball.y - r * .4,
      2,
      ball.x,
      ball.y,
      r
    );

  gradient.addColorStop(
    0,
    "#fff"
  );

  gradient.addColorStop(
    .7,
    "#e8efeb"
  );

  gradient.addColorStop(
    1,
    "#9aa7a0"
  );

  ctx.fillStyle = gradient;

  ctx.beginPath();

  ctx.arc(
    ball.x,
    ball.y,
    r,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.strokeStyle = "#222823";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.shadowBlur = 0;

  ctx.fillStyle = "#252a27";

  for (
    const angle of [
      .1,
      2.2,
      4.3
    ]
  ) {

    ctx.beginPath();

    ctx.arc(
      ball.x +
        Math.cos(angle) *
        r *
        .35,

      ball.y +
        Math.sin(angle) *
        r *
        .35,

      3,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();
}


/* =========================================================
   GOALKEEPER POV
========================================================= */

function drawGoalkeeperPOV() {

  ctx.clearRect(
    0,
    0,
    W,
    H
  );

  /*
     Dark stadium background
  */

  const sky =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H
    );

  sky.addColorStop(
    0,
    "#07110c"
  );

  sky.addColorStop(
    .34,
    "#123a21"
  );

  sky.addColorStop(
    .35,
    "#0e8a40"
  );

  sky.addColorStop(
    1,
    "#075b29"
  );

  ctx.fillStyle = sky;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );

  /*
     Stadium lights
  */

  drawPOVLights();

  /*
     Pitch perspective
  */

  ctx.strokeStyle =
    "#ffffff55";

  ctx.lineWidth = 3;

  /* Left perspective line */

  ctx.beginPath();

  ctx.moveTo(
    W * .04,
    H
  );

  ctx.lineTo(
    W * .37,
    H * .37
  );

  ctx.stroke();

  /* Right perspective line */

  ctx.beginPath();

  ctx.moveTo(
    W * .96,
    H
  );

  ctx.lineTo(
    W * .63,
    H * .37
  );

  ctx.stroke();

  /*
     Penalty box ahead
  */

  ctx.beginPath();

  ctx.moveTo(
    W * .20,
    H
  );

  ctx.lineTo(
    W * .37,
    H * .49
  );

  ctx.lineTo(
    W * .63,
    H * .49
  );

  ctx.lineTo(
    W * .80,
    H
  );

  ctx.stroke();

  /*
     Opponent players in distance
  */

  drawPOVOpponents();

  /*
     Goalkeeper hands
  */

  drawGoalkeeperHands();

  /*
     Incoming ball
  */

  if (
    state === "keeper"
  ) {

    drawPOVBall();

  } else {

    drawPOVTargetBall();
  }

  /*
     Goal net / posts at edges
  */

  drawPOVGoalFrame();
}


/* =========================================================
   POV LIGHTS
========================================================= */

function drawPOVLights() {

  const lights = [
    W * .08,
    W * .28,
    W * .5,
    W * .72,
    W * .92
  ];

  lights.forEach(
    (x, index) => {

      const glow =
        ctx.createRadialGradient(
          x,
          30,
          2,
          x,
          30,
          100
        );

      glow.addColorStop(
        0,
        "#fff7b5aa"
      );

      glow.addColorStop(
        1,
        "#fff0"
      );

      ctx.fillStyle =
        glow;

      ctx.fillRect(
        x - 100,
        0,
        200,
        130
      );

      ctx.fillStyle =
        "#fff4a8";

      ctx.beginPath();

      ctx.arc(
        x,
        30,
        5,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }
  );

  for (
    let i = 0;
    i < 90;
    i++
  ) {

    const x =
      (i / 89) * W;

    const y =
      80 +
      (i % 5) * 9;

    ctx.fillStyle =
      "#ffffff77";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      1.5,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}


/* =========================================================
   POV GOAL FRAME
========================================================= */

function drawPOVGoalFrame() {

  /*
     Goal posts appear very close
     to the goalkeeper.
  */

  const postWidth =
    Math.max(
      15,
      W * .025
    );

  /* Left post */

  const leftGradient =
    ctx.createLinearGradient(
      0,
      0,
      postWidth,
      0
    );

  leftGradient.addColorStop(
    0,
    "#c7d0ca"
  );

  leftGradient.addColorStop(
    .5,
    "#fff"
  );

  leftGradient.addColorStop(
    1,
    "#8f9993"
  );

  ctx.fillStyle =
    leftGradient;

  ctx.fillRect(
    0,
    0,
    postWidth,
    H
  );

  /* Right post */

  ctx.fillStyle =
    leftGradient;

  ctx.fillRect(
    W - postWidth,
    0,
    postWidth,
    H
  );

  /*
     Net strands
  */

  ctx.strokeStyle =
    "#ffffff22";

  ctx.lineWidth = 1;

  for (
    let x = 20;
    x < W;
    x += 28
  ) {

    ctx.beginPath();

    ctx.moveTo(
      x,
      0
    );

    ctx.lineTo(
      x + (x - W / 2) * .25,
      H
    );

    ctx.stroke();
  }

  for (
    let y = 40;
    y < H;
    y += 30
  ) {

    ctx.beginPath();

    ctx.moveTo(
      0,
      y
    );

    ctx.lineTo(
      W,
      y
    );

    ctx.stroke();
  }
}


/* =========================================================
   POV OPPONENTS
========================================================= */

function drawPOVOpponents() {

  const positions = [
    .25,
    .39,
    .50,
    .61,
    .75
  ];

  positions.forEach(
    (ratio, index) => {

      const x =
        W * ratio;

      const y =
        H * (
          .39 +
          Math.abs(
            ratio - .5
          ) * .08
        );

      const scale =
        index === 2
          ? 1.15
          : .9;

      ctx.save();

      ctx.translate(
        x,
        y
      );

      ctx.scale(
        scale,
        scale
      );

      /* Body */

      ctx.fillStyle =
        "#233b67";

      ctx.fillRect(
        -12,
        0,
        24,
        40
      );

      /* Legs */

      ctx.strokeStyle =
        "#172338";

      ctx.lineWidth = 8;

      ctx.beginPath();

      ctx.moveTo(
        -5,
        39
      );

      ctx.lineTo(
        -9,
        67
      );

      ctx.moveTo(
        5,
        39
      );

      ctx.lineTo(
        9,
        67
      );

      ctx.stroke();

      /* Head */

      ctx.fillStyle =
        "#d99b72";

      ctx.beginPath();

      ctx.arc(
        0,
        -10,
        10,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.restore();
    }
  );
}


/* =========================================================
   POV GLOVES
========================================================= */

function drawGoalkeeperHands() {

  /*
     Hands are deliberately large
     to make it feel like first person.
  */

  const gloveY =
    H * .84;

  const leftX =
    W * .18;

  const rightX =
    W * .82;

  /* Arms */

  ctx.strokeStyle =
    "#f0c323";

  ctx.lineWidth =
    Math.max(
      24,
      W * .055
    );

  ctx.lineCap =
    "round";

  ctx.beginPath();

  ctx.moveTo(
    W * .02,
    H
  );

  ctx.lineTo(
    leftX,
    gloveY
  );

  ctx.moveTo(
    W * .98,
    H
  );

  ctx.lineTo(
    rightX,
    gloveY
  );

  ctx.stroke();

  /* Left glove */

  drawBigGlove(
    leftX,
    gloveY,
    -1
  );

  /* Right glove */

  drawBigGlove(
    rightX,
    gloveY,
    1
  );
}


function drawBigGlove(
  x,
  y,
  direction
) {

  ctx.save();

  ctx.translate(
    x,
    y
  );

  ctx.rotate(
    direction * -.15
  );

  /* Palm */

  const glove =
    ctx.createRadialGradient(
      0,
      0,
      4,
      0,
      0,
      42
    );

  glove.addColorStop(
    0,
    "#ffffff"
  );

  glove.addColorStop(
    1,
    "#bfc9c3"
  );

  ctx.fillStyle =
    glove;

  ctx.beginPath();

  ctx.ellipse(
    0,
    0,
    37,
    30,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.strokeStyle =
    "#829089";

  ctx.lineWidth = 2;

  ctx.stroke();

  /* Fingers */

  ctx.strokeStyle =
    "#f7faf8";

  ctx.lineWidth = 10;

  ctx.lineCap =
    "round";

  for (
    let i = -1;
    i <= 1;
    i++
  ) {

    ctx.beginPath();

    ctx.moveTo(
      direction * 25,
      i * 9
    );

    ctx.lineTo(
      direction * 50,
      i * 13
    );

    ctx.stroke();
  }

  /* Glove logo */

  ctx.fillStyle =
    "#e5b51b";

  ctx.beginPath();

  ctx.arc(
    -direction * 4,
    0,
    6,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}


/* =========================================================
   POV BALL
========================================================= */

function drawPOVBall() {

  /*
     Ball approaches from the pitch.

     As it gets closer to the
     goalkeeper it grows.
  */

  const targetX =
    ball.x;

  const targetY =
    ball.y;

  const distance =
    Math.abs(
      targetY -
      H * .43
    );

  const size =
    clamp(
      10 +
      (H - distance) * .025,
      13,
      42
    );

  drawLargeBall(
    targetX,
    targetY,
    size
  );
}


function drawPOVTargetBall() {

  drawLargeBall(
    W / 2,
    H * .42,
    20
  );
}


function drawLargeBall(
  x,
  y,
  radius
) {

  ctx.save();

  ctx.shadowColor =
    "#000b";

  ctx.shadowBlur = 22;

  const gradient =
    ctx.createRadialGradient(
      x - radius * .35,
      y - radius * .4,
      2,
      x,
      y,
      radius
    );

  gradient.addColorStop(
    0,
    "#ffffff"
  );

  gradient.addColorStop(
    .72,
    "#e6ede9"
  );

  gradient.addColorStop(
    1,
    "#9ca9a2"
  );

  ctx.fillStyle =
    gradient;

  ctx.beginPath();

  ctx.arc(
    x,
    y,
    radius,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.strokeStyle =
    "#202622";

  ctx.lineWidth = 2;

  ctx.stroke();

  ctx.shadowBlur = 0;

  ctx.fillStyle =
    "#202622";

  const spots = 5;

  for (
    let i = 0;
    i < spots;
    i++
  ) {

    const angle =
      i * 1.256;

    ctx.beginPath();

    ctx.arc(
      x +
        Math.cos(angle) *
        radius *
        .35,

      y +
        Math.sin(angle) *
        radius *
        .35,

      Math.max(
        2,
        radius * .14
      ),

      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();
}


/* =========================================================
   AIM
========================================================= */

function drawAim() {

  if (
    state !== "ready" ||
    mode === "keeper"
  ) {
    return;
  }

  const targets =
    mode === "freekick"
      ? getFreeKickTargets()
      : getPenaltyTargets();

  targets.forEach(
    target => {

      ctx.strokeStyle =
        "#ffffff25";

      ctx.lineWidth = 2;

      ctx.beginPath();

      ctx.arc(
        target.x,
        target.y,
        17,
        0,
        Math.PI * 2
      );

      ctx.stroke();
    }
  );
}


function getPenaltyTargets() {

  const g =
    getGoal();

  const y =
    g.y +
    g.h * .28;

  const inset =
    g.w * .18;

  return [
    {
      zone: "left",
      x: g.x + inset,
      y
    },

    {
      zone: "center",
      x: W / 2,
      y
    },

    {
      zone: "right",
      x: g.x + g.w - inset,
      y
    }
  ];
}


function getFreeKickTargets() {

  const g =
    getGoal();

  const y =
    g.y +
    g.h * .18;

  const inset =
    g.w * .18;

  return [
    {
      zone: "left",
      x: g.x + inset,
      y
    },

    {
      zone: "center",
      x: W / 2,
      y
    },

    {
      zone: "right",
      x: g.x + g.w - inset,
      y
    }
  ];
}


function targetForZone(zone) {

  const targets =
    mode === "freekick"
      ? getFreeKickTargets()
      : getPenaltyTargets();

  return targets.find(
    target =>
      target.zone === zone
  );
}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles(
  x,
  y,
  good
) {

  for (
    let i = 0;
    i < 42;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;

    const speed =
      80 +
      Math.random() *
      300;

    particles.push({

      x,
      y,

      vx:
        Math.cos(angle) *
        speed,

      vy:
        Math.sin(angle) *
        speed,

      life:
        .8 +
        Math.random() * .6,

      size:
        2 +
        Math.random() * 4,

      good
    });
  }
}


function updateParticles(dt) {

  particles.forEach(
    p => {

      p.x +=
        p.vx * dt;

      p.y +=
        p.vy * dt;

      p.vy +=
        250 * dt;

      p.life -= dt;
    }
  );

  particles =
    particles.filter(
      p => p.life > 0
    );
}


function drawParticles() {

  particles.forEach(
    p => {

      ctx.globalAlpha =
        clamp(
          p.life,
          0,
          1
        );

      ctx.fillStyle =
        p.good
          ? "#ffe24a"
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
  );

  ctx.globalAlpha = 1;
}


/* =========================================================
   DIFFICULTY
========================================================= */

function difficultySettings() {

  if (
    difficultyEl.value ===
    "easy"
  ) {

    return {
      keeperSpeed: 190,
      reaction: .18,
      flight: .72
    };
  }

  if (
    difficultyEl.value ===
    "hard"
  ) {

    return {
      keeperSpeed: 300,
      reaction: .60,
      flight: .58
    };
  }

  return {
    keeperSpeed: 240,
    reaction: .38,
    flight: .65
  };
}


/* =========================================================
   HUD
========================================================= */

function updateHUD() {

  scoreEl.textContent =
    score;

  levelEl.textContent =
    level;

  livesEl.textContent =
    lives;
}


function message(text) {

  messageEl.textContent =
    text;
}


/* =========================================================
   START MODE
========================================================= */

function beginMode() {

  clearTimeout(gameTimer);

  resultCard.hidden = true;
  diveButton.hidden = true;

  layout();

  state = "ready";

  if (
    mode === "penalty"
  ) {

    controlsEl.hidden = false;
    powerWrap.hidden = false;

    modeTextEl.textContent =
      "Penalty Kick";

    hintEl.textContent =
      "Pick a corner and shoot!";

    message(
      "CHOOSE YOUR SHOT"
    );

  } else if (
    mode === "freekick"
  ) {

    controlsEl.hidden = false;
    powerWrap.hidden = false;

    modeTextEl.textContent =
      "Free Kick";

    hintEl.textContent =
      `Wall: ${wall.people} defenders • Bend it over the wall!`;

    message(
      "FREE KICK • OVER THE WALL"
    );

  } else {

    /*
       GOALKEEPER POV
    */

    controlsEl.hidden = true;
    powerWrap.hidden = true;

    modeTextEl.textContent =
      "Goalkeeper POV";

    hintEl.textContent =
      "You're inside the goal — dive to save it!";

    message(
      "GET READY, GOALKEEPER! 🧤"
    );

    schedule(
      startKeeperRound,
      900
    );
  }
}


/* =========================================================
   SHOOT
========================================================= */

function shoot(zone) {

  if (
    state !== "ready" ||
    mode === "keeper"
  ) {
    return;
  }

  const target =
    targetForZone(zone);

  const settings =
    difficultySettings();

  const spot =
    getSpot();

  state = "flight";

  ball.startX =
    spot.x;

  ball.startY =
    spot.y;

  ball.x =
    spot.x;

  ball.y =
    spot.y;

  ball.targetX =
    target.x;

  ball.targetY =
    target.y;

  ball.t = 0;

  /*
     POWER
  */

  const powerBoost =
    .82 +
    power * .25;

  ball.duration =
    settings.flight /
    powerBoost;

  /*
     Free kick curve
  */

  if (
    mode === "freekick"
  ) {

    const direction =
      zone === "left"
        ? 1
        : zone === "right"
          ? -1
          : 0;

    ball.curve =
      direction *
      (
        24 +
        power * 28
      );

    ball.arc =
      105 +
      power * 70;

    message(
      "BENDING OVER THE WALL! 🎯"
    );

  } else {

    ball.curve =
      (
        Math.random() -
        .5
      ) * 7;

    ball.arc =
      25 +
      power * 15;

    message(
      "SHOT ON THE WAY! ⚡"
    );
  }

  /*
     EASY GOALS:
     goalkeeper often reacts
     to the wrong direction.
  */

  const correctReaction =
    Math.random() <
    clamp(
      settings.reaction +
      (level - 1) * .02,
      .08,
      .68
    );

  let keeperTarget;

  if (
    correctReaction
  ) {

    keeperTarget =
      target;

  } else {

    const zones = [
      "left",
      "center",
      "right"
    ].filter(
      z => z !== zone
    );

    keeperTarget =
      targetForZone(
        zones[
          Math.floor(
            Math.random() *
            zones.length
          )
        ]
      );
  }

  keeper.startX =
    keeper.x;

  keeper.startY =
    keeper.y;

  keeper.targetX =
    keeperTarget.x;

  keeper.targetY =
    keeperTarget.y + 25;

  keeper.t = 0;

  keeper.duration =
    Math.max(
      .38,
      settings.flight * .95
    );

  keeper.tilt =
    (
      keeperTarget.x -
      keeper.startX
    ) /
    W *
    1.2;
}


/* =========================================================
   FINISH SHOT
========================================================= */

function finishShot() {

  /*
     SMALLER SAVE RANGE = EASIER GOALS.
  */

  let saveRange =
    mode === "freekick"
      ? 32
      : 40;

  /*
     Keep levels from making
     saves ridiculously difficult.
  */

  saveRange +=
    Math.min(
      level * 1.2,
      12
    );

  const distance =
    Math.hypot(
      keeper.x -
      ball.targetX,

      keeper.y -
      ball.targetY
    );

  if (
    distance <= saveRange
  ) {

    loseLife(
      "SAVED! 🧤"
    );

  } else {

    goalScored();
  }
}


/* =========================================================
   GOAL SCORED
========================================================= */

function goalScored() {

  score++;

  const levelUp =
    score % 3 === 0;

  if (
    levelUp
  ) {

    level++;
  }

  updateHUD();

  createParticles(
    ball.targetX,
    ball.targetY,
    true
  );

  state = "result";

  resultCard.hidden = false;

  if (
    levelUp
  ) {

    resultTitle.textContent =
      `LEVEL ${level}! 🏆`;

    resultSub.textContent =
      mode === "freekick"
        ? `The wall now has ${wall.people} defenders.`
        : "The goalkeeper gets slightly faster.";

    message(
      `LEVEL ${level}! 🏆`
    );

  } else {

    resultTitle.textContent =
      "GOAL! ⚽🔥";

    resultSub.textContent =
      mode === "freekick"
        ? "What a free kick!"
        : "Great finish!";
  }

  continueBtn.textContent =
    "CONTINUE";
}


/* =========================================================
   SAVED
========================================================= */

function loseLife(text) {

  lives--;

  updateHUD();

  createParticles(
    ball.targetX || ball.x,
    ball.targetY || ball.y,
    false
  );

  if (
    lives <= 0
  ) {

    state = "gameover";

    resultTitle.textContent =
      "GAME OVER";

    resultSub.textContent =
      `Final score: ${score}`;

    continueBtn.textContent =
      "PLAY AGAIN";

    message(
      `GAME OVER — ${score} GOALS`
    );

  } else {

    state = "result";

    resultTitle.textContent =
      "SAVED! 🧤";

    resultSub.textContent =
      `${lives} ${
        lives === 1
          ? "life"
          : "lives"
      } left.`;

    continueBtn.textContent =
      "CONTINUE";

    message(text);
  }

  resultCard.hidden = false;
}


/* =========================================================
   GOALKEEPER MODE
========================================================= */

function startKeeperRound() {

  if (
    mode !== "keeper" ||
    state === "gameover"
  ) {
    return;
  }

  state = "keeper";

  const g =
    getGoal();

  /*
     Ball appears somewhere
     in the shooting area.
  */

  ball.x =
    W * (
      .12 +
      Math.random() * .76
    );

  ball.y =
    H * (
      .16 +
      Math.random() * .38
    );

  const settings =
    difficultySettings();

  keeper.startX =
    W / 2;

  keeper.startY =
    H * .73;

  keeper.x =
    keeper.startX;

  keeper.y =
    keeper.startY;

  keeper.targetX =
    ball.x;

  keeper.targetY =
    H * .53;

  keeper.t = 0;

  /*
     Goalkeeper POV:
     the keeper moves across
     the screen toward the ball.
  */

  if (
    difficultyEl.value ===
    "easy"
  ) {

    keeper.duration =
      1.65;

  } else if (
    difficultyEl.value ===
    "hard"
  ) {

    keeper.duration =
      1.05;

  } else {

    keeper.duration =
      1.35;
  }

  keeper.tilt =
    (
      ball.x -
      W / 2
    ) /
    W *
    1.3;

  diveButton.hidden = false;

  message(
    "DIVE NOW! 🧤"
  );
}


/* =========================================================
   KEEPER SAVE
========================================================= */

function keeperSave() {

  if (
    mode !== "keeper" ||
    state !== "keeper"
  ) {
    return;
  }

  diveButton.hidden = true;

  /*
     Easier saves.
  */

  const distance =
    Math.hypot(
      keeper.x -
      ball.x,

      keeper.y -
      ball.y
    );

  const saveRange =
    difficultyEl.value === "easy"
      ? 125
      : difficultyEl.value === "hard"
        ? 92
        : 110;

  if (
    distance <= saveRange
  ) {

    score++;

    const levelUp =
      score % 3 === 0;

    if (
      levelUp
    ) {
      level++;
    }

    updateHUD();

    createParticles(
      ball.x,
      ball.y,
      true
    );

    state = "result";

    resultCard.hidden = false;

    resultTitle.textContent =
      levelUp
        ? `LEVEL ${level}! 🏆`
        : "GREAT SAVE! 🧤";

    resultSub.textContent =
      "You stopped the shot!";

    continueBtn.textContent =
      "CONTINUE";

    message(
      "WHAT A SAVE! 🔥🧤"
    );

  } else {

    lives--;

    updateHUD();

    if (
      lives <= 0
    ) {

      state = "gameover";

      resultTitle.textContent =
        "GAME OVER";

      resultSub.textContent =
        `Final score: ${score}`;

      continueBtn.textContent =
        "PLAY AGAIN";

      message(
        `GAME OVER — ${score} SAVES`
      );

    } else {

      state = "result";

      resultTitle.textContent =
        "MISSED!";

      resultSub.textContent =
        `${lives} ${
          lives === 1
            ? "life"
            : "lives"
        } left.`;

      continueBtn.textContent =
        "CONTINUE";

      message(
        "JUST MISSED IT! ⚽"
      );
    }

    resultCard.hidden = false;
  }
}


/* =========================================================
   CONTINUE
========================================================= */

function continueRound() {

  resultCard.hidden = true;

  if (
    state === "gameover"
  ) {

    restartGame();

    return;
  }

  beginMode();
}


/* =========================================================
   RESTART
========================================================= */

function restartGame() {

  clearTimeout(gameTimer);

  score = 0;
  level = 1;
  lives = 5;

  particles = [];

  updateHUD();

  beginMode();
}


/* =========================================================
   UPDATE
========================================================= */

function update(dt) {

  pulse += dt;

  updateParticles(dt);

  /*
     Power bar.
  */

  power +=
    powerDirection *
    dt *
    .62;

  if (
    power >= 1
  ) {

    power = 1;
    powerDirection = -1;
  }

  if (
    power <= 0
  ) {

    power = 0;
    powerDirection = 1;
  }

  const displayPower =
    Math.round(
      35 +
      power * 65
    );

  powerFill.style.width =
    displayPower + "%";

  powerText.textContent =
    displayPower + "%";


  /* =====================================================
     SHOOTING
  ===================================================== */

  if (
    state === "flight"
  ) {

    ball.t +=
      dt /
      ball.duration;

    const p =
      clamp(
        ball.t,
        0,
        1
      );

    const smooth =
      p * p *
      (3 - 2 * p);

    ball.x =
      ball.startX +
      (
        ball.targetX -
        ball.startX
      ) *
      smooth;

    ball.y =
      ball.startY +
      (
        ball.targetY -
        ball.startY
      ) *
      smooth;

    /*
       Free kick curves.
    */

    ball.x +=
      Math.sin(
        p * Math.PI
      ) *
      ball.curve;

    /*
       Ball rises above wall.
    */

    ball.y -=
      Math.sin(
        p * Math.PI
      ) *
      ball.arc;

    ball.radius =
      clamp(
        Math.min(W, H) *
        (
          .025 -
          p * .008
        ),
        8,
        15
      );

    /*
       Keeper moves.
    */

    keeper.t +=
      dt /
      keeper.duration;

    const kp =
      clamp(
        keeper.t,
        0,
        1
      );

    const ks =
      kp * kp *
      (3 - 2 * kp);

    keeper.x =
      keeper.startX +
      (
        keeper.targetX -
        keeper.startX
      ) *
      ks;

    keeper.y =
      keeper.startY +
      (
        keeper.targetY -
        keeper.startY
      ) *
      ks;

    if (
      p >= 1
    ) {

      finishShot();
    }
  }


  /* =====================================================
     GOALKEEPER POV
  ===================================================== */

  if (
    state === "keeper"
  ) {

    keeper.t +=
      dt /
      keeper.duration;

    const p =
      clamp(
        keeper.t,
        0,
        1
      );

    const smooth =
      p * p *
      (3 - 2 * p);

    keeper.x =
      keeper.startX +
      (
        keeper.targetX -
        keeper.startX
      ) *
      smooth;

    keeper.y =
      keeper.startY +
      (
        keeper.targetY -
        keeper.startY
      ) *
      smooth;

    /*
       The ball slowly comes
       toward the goalkeeper.
    */

    ball.y +=
      dt *
      55;

    if (
      p >= 1
    ) {

      diveButton.hidden = true;

      loseLife(
        "MISSED! ⚽"
      );
    }
  }
}


/* =========================================================
   GAME LOOP
========================================================= */

function gameLoop(now) {

  const dt =
    Math.min(
      .035,
      (now - lastTime) / 1000
    );

  lastTime = now;

  update(dt);
  draw();

  requestAnimationFrame(
    gameLoop
  );
}


/* =========================================================
   MODE BUTTONS
========================================================= */

document
  .querySelectorAll(".mode")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".mode")
          .forEach(
            b =>
              b.classList.remove(
                "active"
              )
          );

        button.classList.add(
          "active"
        );

        mode =
          button.dataset.mode;

        beginMode();
      }
    );
  });


/* =========================================================
   SHOT BUTTONS
========================================================= */

document
  .querySelectorAll(
    ".controls button"
  )
  .forEach(button => {

    button.addEventListener(
      "pointerdown",
      event => {

        event.preventDefault();

        shoot(
          button.dataset.zone
        );
      }
    );
  });


/* =========================================================
   CANVAS TOUCH
========================================================= */

canvas.addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();

    if (
      mode === "keeper"
    ) {

      keeperSave();

      return;
    }

    if (
      state !== "ready"
    ) {
      return;
    }

    const rect =
      canvas.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    const zone =
      x < W / 3
        ? "left"
        : x < W * 2 / 3
          ? "center"
          : "right";

    shoot(zone);
  }
);


/* =========================================================
   DIVE BUTTON
========================================================= */

diveButton.addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();

    keeperSave();
  }
);


/* =========================================================
   UI BUTTONS
========================================================= */

restartBtn.addEventListener(
  "click",
  restartGame
);

continueBtn.addEventListener(
  "click",
  continueRound
);

difficultyEl.addEventListener(
  "change",
  () => {

    if (
      state === "ready"
    ) {

      beginMode();
    }
  }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initialize() {

  resizeCanvas();

  updateHUD();

  beginMode();

  requestAnimationFrame(
    gameLoop
  );
}

initialize();
