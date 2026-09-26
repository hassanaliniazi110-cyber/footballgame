"use strict";

/* =========================
   ELEMENTS
========================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", {
  alpha: false
});

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

/* =========================
   MAIN STATE
========================= */

let W = 1;
let H = 1;
let dpr = 1;

let score = 0;
let level = 1;
let lives = 5;

let mode = "penalty";

let state = "ready";

let power = 0.72;
let powerDir = 1;

let last = performance.now();
let pulse = 0;

let particles = [];
let timer = null;
let resizeQueued = false;

/* =========================
   BALL
========================= */

const ball = {
  x: 0,
  y: 0,

  startX: 0,
  startY: 0,

  targetX: 0,
  targetY: 0,

  t: 0,
  duration: 0.55,

  curve: 0,
  arc: 0,

  radius: 13
};

/* =========================
   GOALKEEPER
========================= */

const keeper = {
  x: 0,
  y: 0,

  startX: 0,
  startY: 0,

  targetX: 0,
  targetY: 0,

  t: 0,
  duration: 0.5,

  tilt: 0
};

/* =========================
   FREE KICK WALL
========================= */

const wall = {
  people: 4,
  x: 0,
  y: 0,
  height: 70
};

/* =========================
   UTILS
========================= */

function clamp(value, min, max) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

function schedule(fn, delay) {
  clearTimeout(timer);

  timer = setTimeout(
    fn,
    delay
  );
}

/* =========================
   CANVAS
========================= */

function resizeCanvas() {

  const rect =
    arena.getBoundingClientRect();

  W = Math.max(
    320,
    Math.floor(rect.width)
  );

  H = Math.max(
    260,
    Math.floor(rect.height)
  );

  dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width =
    Math.floor(W * dpr);

  canvas.height =
    Math.floor(H * dpr);

  canvas.style.width =
    W + "px";

  canvas.style.height =
    H + "px";

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

function queueResize() {

  if (resizeQueued) {
    return;
  }

  resizeQueued = true;

  requestAnimationFrame(() => {

    resizeQueued = false;

    resizeCanvas();
  });
}

if (
  "ResizeObserver" in window
) {

  new ResizeObserver(
    queueResize
  ).observe(arena);

} else {

  window.addEventListener(
    "resize",
    queueResize
  );
}

window.addEventListener(
  "orientationchange",
  () => {

    setTimeout(
      queueResize,
      150
    );
  }
);

/* =========================
   FIELD GEOMETRY
========================= */

function goal() {

  const gw =
    Math.min(
      W * 0.78,
      920
    );

  const gh =
    Math.min(
      H * 0.35,
      300
    );

  return {
    x: (W - gw) / 2,
    y: Math.max(
      38,
      H * 0.08
    ),
    w: gw,
    h: gh
  };
}

function spot() {

  return {
    x: W / 2,
    y: H * 0.82
  };
}

function keeperHome() {

  const g =
    goal();

  return {
    x: W / 2,

    y:
      g.y +
      g.h * 0.68
  };
}

function wallY() {

  const s =
    spot();

  return (
    s.y -
    H * 0.20
  );
}

/* =========================
   LAYOUT
========================= */

function layout() {

  const home =
    keeperHome();

  keeper.x = home.x;
  keeper.y = home.y;

  keeper.startX = home.x;
  keeper.startY = home.y;

  keeper.targetX = home.x;
  keeper.targetY = home.y;

  keeper.t = 0;
  keeper.tilt = 0;

  const s =
    spot();

  ball.x = s.x;
  ball.y = s.y;

  ball.startX = s.x;
  ball.startY = s.y;

  ball.targetX = s.x;
  ball.targetY = s.y;

  ball.t = 0;
  ball.curve = 0;
  ball.arc = 0;

  ball.radius =
    clamp(
      Math.min(W, H) * 0.022,
      10,
      15
    );

  wall.people =
    clamp(
      3 +
      Math.floor(
        (level - 1) / 2
      ),
      3,
      7
    );

  wall.height =
    clamp(
      58 +
      level * 4,
      58,
      90
    );

  wall.x = W / 2;
  wall.y = wallY();
}

/* =========================
   DRAW EVERYTHING
========================= */

function draw() {

  drawField();

  if (
    mode === "freekick"
  ) {
    drawWall();
  }

  drawKeeper();
  drawBall();
  drawAim();
  drawParticles();
}

/* =========================
   FIELD
========================= */

function drawField() {

  ctx.clearRect(
    0,
    0,
    W,
    H
  );

  /* Stadium */

  const sky =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H * 0.28
    );

  sky.addColorStop(
    0,
    "#07120c"
  );

  sky.addColorStop(
    1,
    "#173824"
  );

  ctx.fillStyle = sky;

  ctx.fillRect(
    0,
    0,
    W,
    H * 0.30
  );

  /* Grass */

  const grass =
    ctx.createLinearGradient(
      0,
      H * 0.18,
      0,
      H
    );

  grass.addColorStop(
    0,
    "#15974a"
  );

  grass.addColorStop(
    0.55,
    "#0d823d"
  );

  grass.addColorStop(
    1,
    "#075b29"
  );

  ctx.fillStyle = grass;

  ctx.fillRect(
    0,
    H * 0.18,
    W,
    H * 0.82
  );

  drawStadiumLights();

  /* Field stripes */

  for (
    let i = 0;
    i < 14;
    i++
  ) {

    ctx.fillStyle =
      i % 2
        ? "#00000009"
        : "#ffffff07";

    ctx.fillRect(
      0,
      H * 0.18 +
        i *
        (H * 0.82 / 14),

      W,
      H * 0.82 / 14
    );
  }

  const g =
    goal();

  /* Penalty area */

  ctx.strokeStyle =
    "#ffffffd6";

  ctx.lineWidth = 3;

  ctx.strokeRect(
    W * 0.08,
    g.y + g.h * 0.82,
    W * 0.84,
    H * 0.30
  );

  /* Six yard box */

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

  /* Penalty point */

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

  if (
    mode === "freekick"
  ) {
    drawFreeKickLine();
  }
}

/* =========================
   STADIUM LIGHTS
========================= */

function drawStadiumLights() {

  ctx.fillStyle =
    "#0a130d";

  ctx.fillRect(
    0,
    0,
    W,
    H * 0.12
  );

  const lights = [
    W * 0.12,
    W * 0.34,
    W * 0.66,
    W * 0.88
  ];

  for (
    const x of lights
  ) {

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

    ctx.fillStyle =
      "#fff1aa";

    ctx.beginPath();

    ctx.arc(
      x,
      18,
      5,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  for (
    let i = 0;
    i < 80;
    i++
  ) {

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
      1.8 +
        (i % 3) * .4,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}

/* =========================
   GOAL
========================= */

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

  /* Net */

  ctx.fillStyle =
    "#f3f7f511";

  ctx.fillRect(
    g.x,
    g.y,
    g.w,
    g.h
  );

  ctx.strokeStyle =
    "#ffffff2b";

  ctx.lineWidth = 1;

  const sx =
    Math.max(
      18,
      g.w / 24
    );

  const sy =
    Math.max(
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

  /* Posts */

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 10;

  ctx.strokeRect(
    g.x,
    g.y,
    g.w,
    g.h
  );

  ctx.strokeStyle =
    "#cbd6cf";

  ctx.lineWidth = 3;

  ctx.strokeRect(
    g.x + 6,
    g.y + 6,
    g.w - 12,
    g.h - 12
  );
}

/* =========================
   FREE KICK LINE
========================= */

function drawFreeKickLine() {

  const s =
    spot();

  const y =
    wall.y +
    wall.height * .76;

  ctx.strokeStyle =
    "#ffffff40";

  ctx.lineWidth = 2;

  ctx.setLineDash([
    8,
    8
  ]);

  ctx.beginPath();

  ctx.moveTo(
    s.x,
    s.y - 10
  );

  ctx.lineTo(
    s.x,
    y
  );

  ctx.stroke();

  ctx.setLineDash([]);
}

/* =========================
   DEFENSIVE WALL
========================= */

function drawWall() {

  const n =
    wall.people;

  const spacing =
    42 +
    Math.min(
      8,
      level
    );

  const total =
    (n - 1) *
    spacing;

  const firstX =
    wall.x -
    total / 2;

  for (
    let i = 0;
    i < n;
    i++
  ) {

    const x =
      firstX +
      i * spacing;

    const y =
      wall.y +
      6 *
      Math.sin(
        pulse * 3 +
        i * .6
      );

    drawDefender(
      x,
      y,
      i % 2 === 0
    );
  }
}

/* =========================
   DEFENDER
========================= */

function drawDefender(
  x,
  y,
  alternate
) {

  ctx.save();

  ctx.translate(
    x,
    y
  );

  /* Shadow */

  ctx.fillStyle =
    "#0007";

  ctx.beginPath();

  ctx.ellipse(
    0,
    wall.height * .40,
    18,
    5,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* Legs */

  ctx.strokeStyle =
    "#102539";

  ctx.lineWidth = 9;
  ctx.lineCap = "round";

  ctx.beginPath();

  ctx.moveTo(
    -5,
    17
  );

  ctx.lineTo(
    -8,
    43
  );

  ctx.moveTo(
    5,
    17
  );

  ctx.lineTo(
    8,
    43
  );

  ctx.stroke();

  /* Body */

  ctx.fillStyle =
    alternate
      ? "#1b63a0"
      : "#244f86";

  ctx.fillRect(
    -14,
    -15,
    28,
    34
  );

  /* Arms */

  ctx.strokeStyle =
    "#1b3f68";

  ctx.lineWidth = 8;

  ctx.beginPath();

  ctx.moveTo(
    -12,
    -7
  );

  ctx.lineTo(
    -21,
    7
  );

  ctx.moveTo(
    12,
    -7
  );

  ctx.lineTo(
    21,
    7
  );

  ctx.stroke();

  /* Head */

  ctx.fillStyle =
    "#d99b72";

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

  ctx.fillStyle =
    "#24170f";

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

/* =========================
   GOALKEEPER
========================= */

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

  ctx.fillStyle =
    "#0007";

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

  ctx.strokeStyle =
    "#213929";

  ctx.lineWidth = 13;
  ctx.lineCap = "round";

  ctx.beginPath();

  ctx.moveTo(
    -9,
    19
  );

  ctx.lineTo(
    -20,
    50
  );

  ctx.moveTo(
    9,
    19
  );

  ctx.lineTo(
    20,
    50
  );

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

  ctx.strokeStyle =
    "#ffd21e";

  ctx.lineWidth = 12;

  ctx.beginPath();

  ctx.moveTo(
    -22,
    -12
  );

  ctx.lineTo(
    -49,
    3
  );

  ctx.moveTo(
    22,
    -12
  );

  ctx.lineTo(
    49,
    3
  );

  ctx.stroke();

  /* Gloves */

  ctx.fillStyle =
    "#f4f6f4";

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

  ctx.fillStyle =
    "#d79b70";

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

  ctx.fillStyle =
    "#21160f";

  ctx.beginPath();

  ctx.arc(
    0,
    -58,
    17,
    Math.PI,
    Math.PI * 2
  );

  ctx.fill();

  /* Eyes */

  ctx.fillStyle =
    "#1a1a1a";

  ctx.beginPath();

  ctx.arc(
    -6,
    -52,
    2,
    0,
    Math.PI * 2
  );

  ctx.arc(
    6,
    -52,
    2,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.restore();
}

/* =========================
   BALL
========================= */

function drawBall() {

  const r =
    ball.radius;

  ctx.save();

  ctx.shadowColor =
    "#000a";

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
    .72,
    "#e8efeb"
  );

  gradient.addColorStop(
    1,
    "#9aa7a0"
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

  ctx.strokeStyle =
    "#222823";

  ctx.lineWidth = 1.5;

  ctx.stroke();

  ctx.shadowBlur = 0;

  ctx.fillStyle =
    "#252a27";

  for (
    const a of [
      .1,
      2.2,
      4.3
    ]
  ) {

    ctx.beginPath();

    const cx =
      ball.x +
      Math.cos(a) *
      r *
      .35;

    const cy =
      ball.y +
      Math.sin(a) *
      r *
      .35;

    ctx.arc(
      cx,
      cy,
      3,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  ctx.restore();
}

/* =========================
   AIM
========================= */

function drawAim() {

  if (
    state !== "ready" ||
    mode === "keeper"
  ) {
    return;
  }

  const targets =
    mode === "freekick"
      ? freeKickTargets()
      : penaltyTargets();

  for (
    const target of targets
  ) {

    ctx.strokeStyle =
      target.zone === "center"
        ? "#ffffff2d"
        : "#ffffff16";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
      target.x,
      target.y,
      mode === "freekick"
        ? 18
        : 15,
      0,
      Math.PI * 2
    );

    ctx.stroke();
  }
}

function penaltyTargets() {

  const g =
    goal();

  const y =
    g.y +
    g.h * .28;

  const inset =
    g.w * .17;

  return [
    {
      zone: "left",
      x: g.x + inset,
      y
    },
    {
      zone: "center",
      x: g.x + g.w / 2,
      y
    },
    {
      zone: "right",
      x: g.x + g.w - inset,
      y
    }
  ];
}

function freeKickTargets() {

  const g =
    goal();

  const y =
    g.y +
    g.h * .20;

  const inset =
    g.w * .17;

  return [
    {
      zone: "left",
      x: g.x + inset,
      y
    },
    {
      zone: "center",
      x: g.x + g.w / 2,
      y
    },
    {
      zone: "right",
      x: g.x + g.w - inset,
      y
    }
  ];
}

function targetForZone(
  zone
) {

  const list =
    mode === "freekick"
      ? freeKickTargets()
      : penaltyTargets();

  return list.find(
    item =>
      item.zone === zone
  );
}

/* =========================
   PARTICLES
========================= */

function burst(
  x,
  y,
  good
) {

  for (
    let i = 0;
    i < 40;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;

    const speed =
      80 +
      Math.random() *
      310;

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
        Math.random() *
        .5,

      size:
        2 +
        Math.random() *
        4,

      good
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
      260 * dt;

    p.life -= dt;
  }

  particles =
    particles.filter(
      p => p.life > 0
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
      p.good
        ? "#ffe24a"
        : "#fff";

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
}

/* =========================
   DIFFICULTY
========================= */

function difficultyValues() {

  if (
    difficultyEl.value ===
    "easy"
  ) {

    return {
      keeperSpeed: 245,
      flight: .68,
      reaction: .28
    };
  }

  if (
    difficultyEl.value ===
    "hard"
  ) {

    return {
      keeperSpeed: 405,
      flight: .48,
      reaction: .79
    };
  }

  return {
    keeperSpeed: 320,
    flight: .57,
    reaction: .54
  };
}

/* =========================
   HUD
========================= */

function updateHud() {

  scoreEl.textContent =
    score;

  levelEl.textContent =
    level;

  livesEl.textContent =
    lives;
}

function setMessage(text) {
  messageEl.textContent =
    text;
}

/* =========================
   BEGIN MODE
========================= */

function beginMode() {

  clearTimeout(timer);

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

    setMessage(
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

    setMessage(
      `FREE KICK • WALL OF ${wall.people}`
    );

  } else {

    controlsEl.hidden = true;
    powerWrap.hidden = true;

    modeTextEl.textContent =
      "Goalkeeping";

    hintEl.textContent =
      "Wait for the shot, then dive!";

    setMessage(
      "GET READY! 🧤"
    );

    schedule(
      startKeeperRound,
      700
    );
  }
}

/* =========================
   START SHOT
========================= */

function startShot(
  zone
) {

  if (
    state !== "ready" ||
    mode === "keeper"
  ) {
    return;
  }

  const target =
    targetForZone(zone);

  const diff =
    difficultyValues();

  const s =
    spot();

  state = "flight";

  ball.startX = s.x;
  ball.startY = s.y;

  ball.x = s.x;
  ball.y = s.y;

  ball.targetX =
    target.x;

  ball.targetY =
    target.y;

  ball.t = 0;

  const powerBoost =
    .78 +
    power * .33;

  ball.duration =
    diff.flight /
    powerBoost;

  ball.curve = 0;
  ball.arc = 0;

  /* =====================
     FREE KICK PHYSICS
  ===================== */

  if (
    mode === "freekick"
  ) {

    const sign =
      zone === "left"
        ? 1
        : zone === "right"
          ? -1
          : 0;

    ball.curve =
      sign *
      (
        26 +
        power * 36
      );

    ball.arc =
      110 +
      power * 75 +
      level * 3;

    setMessage(
      "OVER THE WALL! 🎯"
    );

  } else {

    ball.curve =
      (
        Math.random() -
        .5
      ) * 9;

    ball.arc =
      35 +
      power * 15;

    setMessage(
      "SHOT ON THE WAY! ⚡"
    );
  }

  /* =====================
     GOALKEEPER DECISION
  ===================== */

  const aimedKeeper =
    Math.random() <
    clamp(
      diff.reaction +
      (level - 1) * .035,
      .05,
      .94
    );

  let keeperTarget;

  if (
    aimedKeeper
  ) {

    keeperTarget =
      target;

  } else {

    const otherZones =
      [
        "left",
        "center",
        "right"
      ].filter(
        z => z !== zone
      );

    keeperTarget =
      targetForZone(
        otherZones[
          Math.floor(
            Math.random() *
            otherZones.length
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
    keeperTarget.y + 22;

  keeper.t = 0;

  keeper.duration =
    Math.max(
      .24,
      diff.flight * .88
    );

  keeper.tilt =
    (
      keeperTarget.x -
      keeper.startX
    ) /
    Math.max(
      1,
      W
    ) *
    1.55;
}

/* =========================
   FINISH SHOT
========================= */

function finishShot() {

  const distance =
    Math.hypot(
      keeper.x -
      ball.targetX,

      keeper.y -
      ball.targetY
    );

  let saveRange =
    mode === "freekick"
      ? 48
      : 58;

  saveRange +=
    level * 1.8;

  if (
    mode === "freekick" &&
    ball.targetY >
    wall.y - 35
  ) {

    saveRange += 8;
  }

  if (
    distance <=
    saveRange
  ) {

    loseLife(
      "SAVED! 🧤"
    );

  } else {

    scoreGoal();
  }
}

/* =========================
   GOAL
========================= */

function scoreGoal() {

  score++;

  if (
    score % 3 === 0
  ) {

    level++;
  }

  updateHud();

  burst(
    ball.targetX,
    ball.targetY,
    true
  );

  state = "result";

  diveButton.hidden =
    true;

  resultCard.hidden =
    false;

  if (
    score % 3 === 0
  ) {

    resultTitle.textContent =
      `LEVEL ${level}! 🏆`;

    if (
      mode === "freekick"
    ) {

      const defenders =
        clamp(
          3 +
          Math.floor(
            (level - 1) / 2
          ),
          3,
          7
        );

      resultSub.textContent =
        `The wall grows stronger: ${defenders} defenders.`;

    } else {

      resultSub.textContent =
        "The goalkeeper gets faster.";
    }

    setMessage(
      `LEVEL ${level}! 🏆`
    );

  } else {

    resultTitle.textContent =
      "GOAL! ⚽";

    resultSub.textContent =
      mode === "freekick"
        ? "Beautiful free kick over the wall."
        : "Perfect finish.";

    setMessage(
      "GOAL! ⚽🔥"
    );
  }

  continueBtn.textContent =
    "CONTINUE";
}

/* =========================
   LOSE LIFE
========================= */

function loseLife(text) {

  lives--;

  updateHud();

  burst(
    ball.targetX || ball.x,
    ball.targetY || ball.y,
    false
  );

  state =
    lives <= 0
      ? "gameover"
      : "result";

  resultCard.hidden =
    false;

  diveButton.hidden =
    true;

  if (
    lives <= 0
  ) {

    resultTitle.textContent =
      "GAME OVER";

    resultSub.textContent =
      `Final score: ${score}`;

    continueBtn.textContent =
      "PLAY AGAIN";

    setMessage(
      `GAME OVER — ${score} GOALS`
    );

  } else {

    resultTitle.textContent =
      text.includes("SAVED")
        ? "SAVED!"
        : "MISS!";

    resultSub.textContent =
      `${lives} ${
        lives === 1
          ? "life"
          : "lives"
      } left.`;

    continueBtn.textContent =
      "CONTINUE";

    setMessage(
      text
    );
  }
}

/* =========================
   GOALKEEPER MODE
========================= */

function startKeeperRound() {

  if (
    mode !== "keeper" ||
    state === "gameover"
  ) {
    return;
  }

  state = "keeper";

  const g =
    goal();

  ball.x =
    g.x +
    g.w *
    (
      .12 +
      Math.random() *
      .76
    );

  ball.y =
    g.y +
    g.h *
    (
      .10 +
      Math.random() *
      .68
    );

  const diff =
    difficultyValues();

  keeper.startX =
    keeper.x;

  keeper.startY =
    keeper.y;

  keeper.targetX =
    ball.x;

  keeper.targetY =
    ball.y;

  keeper.t = 0;

  if (
    difficultyEl.value ===
    "easy"
  ) {

    keeper.duration =
      1.45;

  } else if (
    difficultyEl.value ===
    "hard"
  ) {

    keeper.duration =
      .82;

  } else {

    keeper.duration =
      1.12;
  }

  keeper.tilt =
    (
      ball.x -
      keeper.startX
    ) /
    Math.max(
      1,
      W
    ) *
    1.5;

  diveButton.hidden =
    false;

  setMessage(
    "DIVE! STOP THE SHOT! 🧤"
  );
}

/* =========================
   KEEPER SAVE
========================= */

function keeperSave() {

  if (
    mode !== "keeper" ||
    state !== "keeper"
  ) {
    return;
  }

  diveButton.hidden =
    true;

  const distance =
    Math.hypot(
      keeper.x -
      ball.x,

      keeper.y -
      ball.y
    );

  if (
    distance < 92
  ) {

    score++;

    if (
      score % 3 === 0
    ) {

      level++;
    }

    updateHud();

    burst(
      ball.x,
      ball.y,
      true
    );

    state = "result";

    resultCard.hidden =
      false;

    resultTitle.textContent =
      score % 3 === 0
        ? `LEVEL ${level}! 🏆`
        : "GREAT SAVE! 🧤";

    resultSub.textContent =
      "Lightning-fast reflexes.";

    continueBtn.textContent =
      "CONTINUE";

    setMessage(
      "GREAT SAVE! 🔥"
    );

  } else {

    lives--;

    updateHud();

    state =
      lives <= 0
        ? "gameover"
        : "result";

    resultCard.hidden =
      false;

    if (
      lives <= 0
    ) {

      resultTitle.textContent =
        "GAME OVER";

      resultSub.textContent =
        `Final score: ${score}`;

      continueBtn.textContent =
        "PLAY AGAIN";

      setMessage(
        `GAME OVER — ${score} GOALS`
      );

    } else {

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

      setMessage(
        "MISSED! ⚽"
      );
    }
  }
}

/* =========================
   CONTINUE
========================= */

function continueRound() {

  resultCard.hidden =
    true;

  if (
    state === "gameover"
  ) {

    restartGame();

    return;
  }

  beginMode();
}

/* =========================
   RESTART
========================= */

function restartGame() {

  clearTimeout(timer);

  score = 0;
  level = 1;
  lives = 5;

  particles = [];

  hud();

  beginMode();
}

/* =========================
   UPDATE LOOP
========================= */

function update(dt) {

  pulse += dt;

  updateParticles(dt);

  /* Power meter */

  power +=
    powerDir *
    dt *
    .62;

  if (
    power >= 1
  ) {

    power = 1;
    powerDir = -1;
  }

  if (
    power <= 0
  ) {

    power = 0;
    powerDir = 1;
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

  /* =====================
     BALL FLIGHT
  ===================== */

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
      Huge arc for free kicks,
      smaller arc for penalties.
    */

    ball.y -=
      Math.sin(
        p * Math.PI
      ) *
      ball.arc;

    ball.x +=
      Math.sin(
        p * Math.PI
      ) *
      ball.curve;

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

    /* Goalkeeper */

    keeper.t +=
      dt /
      keeper.duration;

    const kp =
      clamp(
        keeper.t,
        0,
        1
      );

    const keeperSmooth =
      kp * kp *
      (3 - 2 * kp);

    keeper.x =
      keeper.startX +
      (
        keeper.targetX -
        keeper.startX
      ) *
      keeperSmooth;

    keeper.y =
      keeper.startY +
      (
        keeper.targetY -
        keeper.startY
      ) *
      keeperSmooth;

    if (
      p >= 1
    ) {

      finishShot();
    }
  }

  /* =====================
     KEEPER CHALLENGE
  ===================== */

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

    if (
      p >= 1
    ) {

      diveButton.hidden =
        true;

      loseLife(
        "MISSED! ⚽"
      );
    }
  }
}

/* =========================
   GAME LOOP
========================= */

function gameLoop(now) {

  const dt =
    Math.min(
      .035,
      (now - last) / 1000
    );

  last = now;

  update(dt);
  draw();

  requestAnimationFrame(
    gameLoop
  );
}

/* =========================
   MODE BUTTONS
========================= */

document
  .querySelectorAll(".mode")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".mode")
          .forEach(btn =>
            btn.classList.remove(
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

/* =========================
   SHOT BUTTONS
========================= */

document
  .querySelectorAll(
    ".controls button"
  )
  .forEach(button => {

    button.addEventListener(
      "pointerdown",
      event => {

        event.preventDefault();

        startShot(
          button.dataset.zone
        );
      }
    );
  });

/* =========================
   CANVAS TOUCH
========================= */

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

    startShot(zone);
  }
);

/* =========================
   DIVE
========================= */

diveButton.addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();

    keeperSave();
  }
);

/* =========================
   BUTTONS
========================= */

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

/* =========================
   START
========================= */

resizeCanvas();

updateHud();

beginMode();

requestAnimationFrame(
  gameLoop
);
