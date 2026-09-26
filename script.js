"use strict";

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

const modeTextEl = document.getElementById("modeText");
const hintEl = document.getElementById("hint");

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
   GAME VARIABLES
========================= */

let W = 1;
let H = 1;
let dpr = 1;

let score = 0;
let level = 1;
let lives = 5;

let mode = "penalty";

/*
  READY:
  Player can start a shot.

  FLIGHT:
  Ball and goalkeeper are moving.

  KEEPER:
  Goalkeeper challenge is active.

  RESULT:
  Result popup is showing.

  GAMEOVER:
  Game has ended.
*/
let state = "ready";

let lastTime = performance.now();

let power = 0.72;
let powerDir = 1;

let particles = [];
let pulse = 0;

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

  duration: 0.45,

  dive: 0
};

/* =========================
   UTILITY
========================= */

function clamp(value, min, max) {
  return Math.max(
    min,
    Math.min(max, value)
  );
}

/*
  Only one scheduled timer can exist.
*/
function schedule(fn, delay) {
  clearTimeout(schedule.id);

  schedule.id = setTimeout(
    fn,
    delay
  );
}

/* =========================
   CANVAS SIZE
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

  dpr = Math.min(
    window.devicePixelRatio || 1,
    2
  );

  canvas.width =
    Math.max(
      1,
      Math.floor(W * dpr)
    );

  canvas.height =
    Math.max(
      1,
      Math.floor(H * dpr)
    );

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

  placePlayers();

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

if ("ResizeObserver" in window) {

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
      120
    );

  }
);

/* =========================
   FIELD GEOMETRY
========================= */

function goalRect() {

  const w =
    Math.min(
      W * 0.78,
      920
    );

  const h =
    Math.min(
      H * 0.34,
      300
    );

  return {
    x: (W - w) / 2,

    y: Math.max(
      42,
      H * 0.085
    ),

    w,
    h
  };
}

function penaltySpot() {

  return {
    x: W / 2,
    y: H * 0.79
  };
}

function keeperHome() {

  const g =
    goalRect();

  return {
    x: W / 2,

    y:
      g.y +
      g.h * 0.67
  };
}

/* =========================
   INITIAL POSITIONS
========================= */

function placePlayers() {

  const home =
    keeperHome();

  keeper.x = home.x;
  keeper.y = home.y;

  keeper.startX = home.x;
  keeper.startY = home.y;

  keeper.targetX = home.x;
  keeper.targetY = home.y;

  keeper.dive = 0;

  const spot =
    penaltySpot();

  ball.x = spot.x;
  ball.y = spot.y;

  ball.startX = spot.x;
  ball.startY = spot.y;

  ball.targetX = spot.x;
  ball.targetY = spot.y;

  ball.t = 0;
}

/* =========================
   STADIUM
========================= */

function drawStadium() {

  ctx.clearRect(
    0,
    0,
    W,
    H
  );

  /* Grass */

  const field =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H
    );

  field.addColorStop(
    0,
    "#18a04d"
  );

  field.addColorStop(
    0.45,
    "#0d853b"
  );

  field.addColorStop(
    1,
    "#075c29"
  );

  ctx.fillStyle = field;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );

  /* Stadium top */

  ctx.fillStyle = "#051109";

  ctx.fillRect(
    0,
    0,
    W,
    H * 0.09
  );

  /* Crowd lights */

  for (let i = 0; i < 90; i++) {

    const x =
      (i / 89) * W;

    const y =
      13 +
      (i % 4) * 8;

    ctx.fillStyle =
      i % 5 === 0
        ? "#ffe77a"
        : "#d9e4dc55";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      2 + (i % 3) * 0.4,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  /* Pitch stripes */

  for (let i = 0; i < 14; i++) {

    ctx.fillStyle =
      i % 2
        ? "#ffffff08"
        : "#0000000a";

    ctx.fillRect(
      0,
      i * H / 14,
      W,
      H / 14
    );
  }

  const g =
    goalRect();

  /* Penalty box */

  ctx.strokeStyle =
    "#ffffffd9";

  ctx.lineWidth = 3;

  ctx.strokeRect(
    W * 0.10,
    g.y + g.h * 0.84,
    W * 0.80,
    H * 0.32
  );

  /* Six-yard box */

  ctx.strokeRect(
    W * 0.26,
    g.y + g.h * 0.84,
    W * 0.48,
    H * 0.20
  );

  /* Penalty arc */

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * 0.79,
    W * 0.14,
    Math.PI,
    Math.PI * 2
  );

  ctx.stroke();

  /* Penalty mark */

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * 0.79,
    5,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#fff";

  ctx.fill();

  drawGoal(g);
}

/* =========================
   GOAL
========================= */

function drawGoal(g) {

  /* Glow */

  const glow =
    ctx.createRadialGradient(
      g.x + g.w / 2,
      g.y + g.h / 2,
      10,

      g.x + g.w / 2,
      g.y + g.h / 2,
      g.w * 0.65
    );

  glow.addColorStop(
    0,
    "#fff3"
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
    "#eaf3ed12";

  ctx.fillRect(
    g.x,
    g.y,
    g.w,
    g.h
  );

  ctx.strokeStyle =
    "#ffffff28";

  ctx.lineWidth = 1;

  const stepX =
    Math.max(
      18,
      g.w / 24
    );

  const stepY =
    Math.max(
      14,
      g.h / 12
    );

  for (
    let x = g.x;
    x <= g.x + g.w + 1;
    x += stepX
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
    y <= g.y + g.h + 1;
    y += stepY
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

  /* Inner posts */

  ctx.strokeStyle =
    "#c8d3cc";

  ctx.lineWidth = 3;

  ctx.strokeRect(
    g.x + 6,
    g.y + 6,
    g.w - 12,
    g.h - 12
  );
}

/* =========================
   GOALKEEPER DRAW
========================= */

function drawKeeper() {

  ctx.save();

  ctx.translate(
    keeper.x,
    keeper.y
  );

  ctx.rotate(
    keeper.dive
  );

  /* Shadow */

  ctx.fillStyle =
    "#0006";

  ctx.beginPath();

  ctx.ellipse(
    0,
    40,
    47,
    10,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* Legs */

  ctx.strokeStyle =
    "#243c2b";

  ctx.lineWidth = 13;
  ctx.lineCap = "round";

  ctx.beginPath();

  ctx.moveTo(
    -9,
    18
  );

  ctx.lineTo(
    -19,
    49
  );

  ctx.moveTo(
    9,
    18
  );

  ctx.lineTo(
    19,
    49
  );

  ctx.stroke();

  /* Body */

  const shirt =
    ctx.createLinearGradient(
      -28,
      -33,
      28,
      30
    );

  shirt.addColorStop(
    0,
    "#ffea3b"
  );

  shirt.addColorStop(
    1,
    "#e69d00"
  );

  ctx.fillStyle = shirt;

  ctx.fillRect(
    -26,
    -30,
    52,
    50
  );

  /* Arms */

  ctx.strokeStyle =
    "#ffd11a";

  ctx.lineWidth = 12;

  ctx.beginPath();

  ctx.moveTo(
    -22,
    -12
  );

  ctx.lineTo(
    -49,
    2
  );

  ctx.moveTo(
    22,
    -12
  );

  ctx.lineTo(
    49,
    2
  );

  ctx.stroke();

  /* Gloves */

  ctx.fillStyle =
    "#f5f7f6";

  ctx.beginPath();

  ctx.arc(
    -51,
    2,
    10,
    0,
    Math.PI * 2
  );

  ctx.fill();

  ctx.beginPath();

  ctx.arc(
    51,
    2,
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
    -37,
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
    "#211610";

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

  ctx.shadowBlur = 12;

  const grad =
    ctx.createRadialGradient(
      ball.x - r * 0.35,
      ball.y - r * 0.4,
      2,

      ball.x,
      ball.y,
      r
    );

  grad.addColorStop(
    0,
    "#fff"
  );

  grad.addColorStop(
    0.72,
    "#e9efec"
  );

  grad.addColorStop(
    1,
    "#9ba8a2"
  );

  ctx.fillStyle = grad;

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
    "#242a27";

  ctx.lineWidth = 1.5;

  ctx.stroke();

  ctx.shadowBlur = 0;

  /* Ball panels */

  ctx.fillStyle =
    "#252b28";

  for (const a of [
    0.2,
    2.3,
    4.4
  ]) {

    ctx.save();

    ctx.translate(
      ball.x +
        Math.cos(a) *
        r *
        0.33,

      ball.y +
        Math.sin(a) *
        r *
        0.33
    );

    ctx.rotate(a);

    ctx.beginPath();

    ctx.moveTo(
      0,
      -3
    );

    ctx.lineTo(
      3,
      -1
    );

    ctx.lineTo(
      2,
      3
    );

    ctx.lineTo(
      -2,
      3
    );

    ctx.lineTo(
      -3,
      -1
    );

    ctx.closePath();

    ctx.fill();

    ctx.restore();
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

  const target =
    targetForZone("center");

  const alpha =
    0.45 +
    Math.sin(pulse * 3) *
    0.18;

  ctx.strokeStyle =
    `rgba(255,255,255,${alpha})`;

  ctx.lineWidth = 2;

  ctx.beginPath();

  ctx.arc(
    target.x,
    target.y,
    18,
    0,
    Math.PI * 2
  );

  ctx.stroke();

  ctx.beginPath();

  ctx.moveTo(
    target.x - 25,
    target.y
  );

  ctx.lineTo(
    target.x + 25,
    target.y
  );

  ctx.moveTo(
    target.x,
    target.y - 25
  );

  ctx.lineTo(
    target.x,
    target.y + 25
  );

  ctx.stroke();
}

/* =========================
   PARTICLES
========================= */

function drawParticles() {

  for (const p of particles) {

    ctx.globalAlpha =
      clamp(
        p.life,
        0,
        1
      );

    ctx.fillStyle =
      p.good
        ? "#ffe34b"
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
   MAIN DRAW
========================= */

function draw() {

  drawStadium();

  drawAim();

  drawKeeper();

  drawBall();

  drawParticles();
}

/* =========================
   TARGETS
========================= */

function targetForZone(zone) {

  const g =
    goalRect();

  const y =
    g.y +
    g.h * 0.28;

  const inset =
    g.w * 0.16;

  if (zone === "left") {

    return {
      x: g.x + inset,
      y
    };

  }

  if (zone === "right") {

    return {
      x:
        g.x +
        g.w -
        inset,

      y
    };

  }

  return {
    x:
      g.x +
      g.w / 2,

    y
  };
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
      reaction: 0.28,
      keeperSpeed: 240,
      flight: 0.62
    };

  }

  if (
    difficultyEl.value ===
    "hard"
  ) {

    return {
      reaction: 0.78,
      keeperSpeed: 390,
      flight: 0.48
    };

  }

  return {
    reaction: 0.53,
    keeperSpeed: 310,
    flight: 0.55
  };
}

/* =========================
   HUD
========================= */

function setMessage(text) {

  messageEl.textContent =
    text;
}

function updateHud() {

  scoreEl.textContent =
    score;

  levelEl.textContent =
    level;

  livesEl.textContent =
    lives;
}

/* =========================
   PARTICLE BURST
========================= */

function createBurst(
  x,
  y,
  good
) {

  for (
    let i = 0;
    i < 38;
    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;

    const speed =
      90 +
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
        0.8 +
        Math.random() *
        0.45,

      size:
        2 +
        Math.random() *
        4,

      good

    });
  }
}

function updateParticles(dt) {

  for (const p of particles) {

    p.x +=
      p.vx * dt;

    p.y +=
      p.vy * dt;

    p.vy +=
      260 * dt;

    p.life -=
      dt;
  }

  particles =
    particles.filter(
      p => p.life > 0
    );
}

/* =========================
   RESET ROUND
========================= */

function resetRoundPositions() {

  const home =
    keeperHome();

  keeper.x = home.x;
  keeper.y = home.y;

  keeper.startX = home.x;
  keeper.startY = home.y;

  keeper.targetX = home.x;
  keeper.targetY = home.y;

  keeper.t = 0;

  keeper.dive = 0;

  const spot =
    penaltySpot();

  ball.x = spot.x;
  ball.y = spot.y;

  ball.startX = spot.x;
  ball.startY = spot.y;

  ball.targetX = spot.x;
  ball.targetY = spot.y;

  ball.t = 0;

  ball.curve = 0;

  ball.radius =
    clamp(
      Math.min(W, H) *
        0.022,
      10,
      15
    );
}

/* =========================
   START MODE
========================= */

function beginCurrentMode() {

  clearTimeout(
    schedule.id
  );

  resultCard.hidden = true;

  state = "ready";

  resetRoundPositions();

  if (mode === "keeper") {

    controlsEl.hidden = true;

    powerWrap.hidden = true;

    diveButton.hidden = true;

    setMessage(
      "GET READY! 🧤"
    );

    hintEl.textContent =
      "Wait for the ball, then tap DIVE NOW";

    schedule(
      startKeeperRound,
      650
    );

  } else {

    controlsEl.hidden = false;

    powerWrap.hidden = false;

    diveButton.hidden = true;

    if (
      mode === "freekick"
    ) {

      setMessage(
        "BEND IT INTO THE NET!"
      );

    } else {

      setMessage(
        "CHOOSE YOUR SHOT"
      );
    }

    hintEl.textContent =
      "Tap LEFT, CENTER or RIGHT to shoot";
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
    goalRect();

  ball.x =
    g.x +
    g.w *
      (
        0.10 +
        Math.random() *
        0.80
      );

  ball.y =
    g.y +
    g.h *
      (
        0.12 +
        Math.random() *
        0.67
      );

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
      0.85;

  } else {

    keeper.duration =
      1.15;
  }

  keeper.dive = 0;

  diveButton.hidden =
    false;

  setMessage(
    "DIVE! STOP THE BALL! 🧤"
  );
}

/* =========================
   START SHOT
========================= */

function startShot(zone) {

  if (
    mode === "keeper" ||
    state !== "ready"
  ) {
    return;
  }

  const target =
    targetForZone(zone);

  const diff =
    difficultyValues();

  const spot =
    penaltySpot();

  const powerBoost =
    0.75 +
    power *
      0.30;

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

  ball.duration =
    diff.flight /
    powerBoost;

  if (
    mode === "freekick"
  ) {

    if (zone === "left") {

      ball.curve =
        1 *
        (25 + power * 30);

    } else if (
      zone === "right"
    ) {

      ball.curve =
        -1 *
        (25 + power * 30);

    } else {

      ball.curve = 0;
    }

  } else {

    ball.curve =
      (Math.random() - 0.5) *
      9;
  }

  ball.radius =
    clamp(
      Math.min(W, H) *
        0.022,
      10,
      15
    );

  /*
    Decide where the goalkeeper dives.
  */

  const reactionChance =
    clamp(
      diff.reaction +
        (level - 1) *
          0.035,
      0.05,
      0.94
    );

  let keeperTarget;

  if (
    Math.random() <
    reactionChance
  ) {

    keeperTarget =
      target;

  } else {

    const zones =
      [
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
    keeperTarget.y + 18;

  keeper.t = 0;

  keeper.duration =
    Math.max(
      0.26,
      diff.flight * 0.90
    );

  keeper.dive = 0;

  if (
    mode === "freekick"
  ) {

    setMessage(
      "FREE KICK! 🎯"
    );

  } else {

    setMessage(
      "SHOT ON THE WAY! ⚡"
    );
  }
}

/* =========================
   FINISH SHOT
========================= */

function finishShot() {

  const dist =
    Math.hypot(
      keeper.x -
        ball.targetX,

      keeper.y -
        ball.targetY
    );

  const saveRange =
    (
      mode === "freekick"
        ? 47
        : 58
    ) +
    level * 2;

  if (
    dist <= saveRange
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

  createBurst(
    ball.targetX,
    ball.targetY,
    true
  );

  if (
    score % 3 === 0
  ) {
    level++;
  }

  updateHud();

  state = "result";

  if (
    score % 3 === 0
  ) {

    resultTitle.textContent =
      `LEVEL ${level}! 🏆`;

    resultSub.textContent =
      "The goalkeeper gets faster.";

    setMessage(
      `LEVEL ${level}!`
    );

  } else {

    resultTitle.textContent =
      "GOAL! ⚽";

    resultSub.textContent =
      "Perfect finish.";

    setMessage(
      "GOAL! ⚽🔥"
    );
  }

  showResult();
}

/* =========================
   LOSE LIFE
========================= */

function loseLife(text) {

  lives--;

  updateHud();

  createBurst(
    ball.targetX || ball.x,
    ball.targetY || ball.y,
    false
  );

  state =
    lives <= 0
      ? "gameover"
      : "result";

  if (
    lives <= 0
  ) {

    resultTitle.textContent =
      "GAME OVER";

    resultSub.textContent =
      `Final score: ${score}`;

    setMessage(
      `GAME OVER — ${score} GOALS`
    );

    continueBtn.textContent =
      "PLAY AGAIN";

  } else {

    if (
      text.includes(
        "MISSED"
      )
    ) {

      resultTitle.textContent =
        "MISS!";

    } else {

      resultTitle.textContent =
        "SAVED!";
    }

    resultSub.textContent =
      `${lives} ${
        lives === 1
          ? "life"
          : "lives"
      } left.`;

    setMessage(text);

    continueBtn.textContent =
      "CONTINUE";
  }

  showResult();
}

/* =========================
   RESULT
========================= */

function showResult() {

  resultCard.hidden =
    false;
}

function continueRound() {

  resultCard.hidden =
    true;

  if (
    state === "gameover"
  ) {

    restartGame();

    return;
  }

  beginCurrentMode();
}

/* =========================
   GOALKEEPER SAVE
========================= */

function handleKeeperSave() {

  if (
    mode !== "keeper" ||
    state !== "keeper"
  ) {
    return;
  }

  const distance =
    Math.hypot(
      keeper.x - ball.x,
      keeper.y - ball.y
    );

  diveButton.hidden =
    true;

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

    createBurst(
      ball.x,
      ball.y,
      true
    );

    state =
      "result";

    if (
      score % 3 === 0
    ) {

      resultTitle.textContent =
        `LEVEL ${level}! 🏆`;

    } else {

      resultTitle.textContent =
        "GREAT SAVE! 🧤";
    }

    resultSub.textContent =
      "Lightning-fast reflexes.";

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

    if (
      lives <= 0
    ) {

      resultTitle.textContent =
        "GAME OVER";

      resultSub.textContent =
        `Final score: ${score}`;

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

      setMessage(
        "MISSED! ⚽"
      );
    }
  }

  continueBtn.textContent =
    state === "gameover"
      ? "PLAY AGAIN"
      : "CONTINUE";

  showResult();
}

/* =========================
   RESTART
========================= */

function restartGame() {

  clearTimeout(
    schedule.id
  );

  score = 0;
  level = 1;
  lives = 5;

  particles = [];

  resultCard.hidden =
    true;

  updateHud();

  beginCurrentMode();
}

/* =========================
   UPDATE
========================= */

function update(dt) {

  pulse += dt;

  updateParticles(dt);

  /* Power meter */

  power +=
    powerDir *
    dt *
    0.62;

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
    displayPower +
    "%";

  powerText.textContent =
    displayPower +
    "%";

  /* BALL FLIGHT */

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

    const arc =
      Math.sin(
        p * Math.PI
      );

    ball.y -=
      arc *
      (
        mode === "freekick"
          ? 50 + power * 35
          : 22
      );

    ball.x +=
      Math.sin(
        p * Math.PI
      ) *
      ball.curve;

    ball.radius =
      clamp(
        Math.min(W, H) *
          (
            0.025 -
            p * 0.008
          ),
        8,
        15
      );

    /* Keeper movement */

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

    keeper.dive =
      (
        keeper.targetX -
        keeper.startX
      ) /
      Math.max(
        1,
        W
      ) *
      1.5;

    if (
      p >= 1
    ) {

      finishShot();
    }
  }

  /* GOALKEEPER CHALLENGE */

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

    keeper.dive =
      (
        keeper.targetX -
        keeper.startX
      ) /
      Math.max(
        1,
        W
      ) *
      1.5;

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

function loop(now) {

  const dt =
    Math.min(
      0.035,
      (
        now -
        lastTime
      ) / 1000
    );

  lastTime =
    now;

  update(dt);

  draw();

  requestAnimationFrame(
    loop
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
          .querySelectorAll(
            ".mode"
          )
          .forEach(b =>
            b.classList.remove(
              "active"
            )
          );

        button.classList.add(
          "active"
        );

        mode =
          button.dataset.mode;

        if (
          mode ===
          "penalty"
        ) {

          modeTextEl.textContent =
            "Penalty Kick";

        } else if (
          mode ===
          "freekick"
        ) {

          modeTextEl.textContent =
            "Free Kick";

        } else {

          modeTextEl.textContent =
            "Goalkeeping";
        }

        beginCurrentMode();
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
   DIVE BUTTON
========================= */

diveButton.addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();

    handleKeeperSave();
  }
);

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

      handleKeeperSave();

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

    let zone;

    if (
      x < W / 3
    ) {

      zone = "left";

    } else if (
      x <
      W * 2 / 3
    ) {

      zone = "center";

    } else {

      zone = "right";
    }

    startShot(zone);
  }
);

/* =========================
   DIFFICULTY
========================= */

difficultyEl.addEventListener(
  "change",
  () => {

    if (
      state === "ready"
    ) {

      beginCurrentMode();
    }
  }
);

/* =========================
   BUTTON EVENTS
========================= */

restartBtn.addEventListener(
  "click",
  restartGame
);

continueBtn.addEventListener(
  "click",
  continueRound
);

/* =========================
   START GAME
========================= */

resetRoundPositions();

queueResize();

updateHud();

beginCurrentMode();

requestAnimationFrame(
  loop
);
