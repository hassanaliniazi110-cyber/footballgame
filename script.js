const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const livesEl = document.getElementById("lives");
const messageEl = document.getElementById("message");
const difficultyEl = document.getElementById("difficulty");
const modeText = document.getElementById("modeText");
const restartBtn = document.getElementById("restart");
const powerFill = document.getElementById("powerFill");

let W = 1000;
let H = 600;

let score = 0;
let level = 1;
let lives = 5;

let mode = "penalty";
let shooting = false;
let keeperAction = false;

let last = performance.now();

const ball = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  targetX: 0,
  targetY: 0,
  progress: 0
};

const keeper = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  speed: 300,
  dive: 0
};

let particles = [];


// ========================================
// RESIZE
// ========================================

function resize() {

  const rect = canvas.getBoundingClientRect();

  W = rect.width;
  H = rect.height;

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width = W * dpr;
  canvas.height = H * dpr;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  resetPositions();
}

window.addEventListener("resize", resize);


// ========================================
// FIELD
// ========================================

function drawField() {

  ctx.clearRect(0, 0, W, H);

  // Grass

  const grass =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H
    );

  grass.addColorStop(0, "#159344");
  grass.addColorStop(0.5, "#087a32");
  grass.addColorStop(1, "#075c27");

  ctx.fillStyle = grass;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );

  // Grass stripes

  for (let i = 0; i < 14; i++) {

    ctx.fillStyle =
      i % 2 === 0
        ? "#ffffff06"
        : "#00000008";

    ctx.fillRect(
      0,
      i * H / 14,
      W,
      H / 14
    );
  }

  drawPenaltyArea();
  drawGoal();
  drawCrowdLights();
}


function drawPenaltyArea() {

  ctx.strokeStyle = "#ffffffdd";
  ctx.lineWidth = 3;

  ctx.strokeRect(
    W * .10,
    H * .04,
    W * .80,
    H * .68
  );

  // Arc

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * .72,
    W * .13,
    Math.PI,
    Math.PI * 2
  );

  ctx.stroke();

  // Penalty spot

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * .72,
    5,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "white";
  ctx.fill();
}


function drawGoal() {

  const x = W * .18;
  const y = H * .10;
  const w = W * .64;
  const h = H * .34;

  // Glow behind goal

  const glow =
    ctx.createRadialGradient(
      W / 2,
      y + h / 2,
      20,
      W / 2,
      y + h / 2,
      w * .6
    );

  glow.addColorStop(
    0,
    "#ffffff20"
  );

  glow.addColorStop(
    1,
    "#ffffff00"
  );

  ctx.fillStyle = glow;

  ctx.fillRect(
    x - 40,
    y - 30,
    w + 80,
    h + 60
  );

  // Net

  ctx.fillStyle = "#ffffff18";

  ctx.fillRect(
    x,
    y,
    w,
    h
  );

  // Vertical net

  ctx.strokeStyle = "#ffffff35";
  ctx.lineWidth = 1;

  for (
    let gx = x;
    gx <= x + w;
    gx += 22
  ) {

    ctx.beginPath();

    ctx.moveTo(gx, y);
    ctx.lineTo(gx, y + h);

    ctx.stroke();
  }

  // Horizontal net

  for (
    let gy = y;
    gy <= y + h;
    gy += 18
  ) {

    ctx.beginPath();

    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);

    ctx.stroke();
  }

  // Posts

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 9;

  ctx.strokeRect(
    x,
    y,
    w,
    h
  );

  // Inner highlight

  ctx.strokeStyle = "#d8e4dc";
  ctx.lineWidth = 3;

  ctx.strokeRect(
    x + 6,
    y + 6,
    w - 12,
    h - 12
  );
}


function drawCrowdLights() {

  for (let i = 0; i < 20; i++) {

    const x =
      (i / 19) * W;

    ctx.beginPath();

    ctx.arc(
      x,
      12,
      2,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      i % 3 === 0
        ? "#fff3a6"
        : "#ffffff66";

    ctx.fill();
  }
}


// ========================================
// KEEPER
// ========================================

function drawKeeper() {

  ctx.save();

  ctx.translate(
    keeper.x,
    keeper.y
  );

  if (keeper.dive !== 0) {

    ctx.rotate(
      keeper.dive
    );
  }

  // Shadow

  ctx.beginPath();

  ctx.ellipse(
    0,
    28,
    35,
    8,
    0,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#0005";
  ctx.fill();

  // Legs

  ctx.strokeStyle = "#173b25";
  ctx.lineWidth = 12;

  ctx.beginPath();

  ctx.moveTo(-10, 15);
  ctx.lineTo(-18, 42);

  ctx.moveTo(10, 15);
  ctx.lineTo(18, 42);

  ctx.stroke();

  // Body

  const shirt =
    ctx.createLinearGradient(
      -25,
      -30,
      25,
      30
    );

  shirt.addColorStop(
    0,
    "#ffdb24"
  );

  shirt.addColorStop(
    1,
    "#e89b00"
  );

  ctx.fillStyle = shirt;

  ctx.fillRect(
    -24,
    -27,
    48,
    48
  );

  // Head

  ctx.beginPath();

  ctx.arc(
    0,
    -45,
    17,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#d99b72";
  ctx.fill();

  // Hair

  ctx.beginPath();

  ctx.arc(
    0,
    -51,
    16,
    Math.PI,
    Math.PI * 2
  );

  ctx.fillStyle = "#241810";
  ctx.fill();

  // Arms

  ctx.strokeStyle = "#ffca16";
  ctx.lineWidth = 12;

  ctx.beginPath();

  ctx.moveTo(-20, -15);
  ctx.lineTo(-43, 4);

  ctx.moveTo(20, -15);
  ctx.lineTo(43, 4);

  ctx.stroke();

  // Gloves

  ctx.fillStyle = "#f5f5f5";

  ctx.beginPath();
  ctx.arc(-44, 4, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(44, 4, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}


// ========================================
// BALL
// ========================================

function drawBall() {

  ctx.save();

  ctx.shadowColor = "#0009";
  ctx.shadowBlur = 10;

  const gradient =
    ctx.createRadialGradient(
      ball.x - 4,
      ball.y - 5,
      2,
      ball.x,
      ball.y,
      13
    );

  gradient.addColorStop(
    0,
    "#ffffff"
  );

  gradient.addColorStop(
    1,
    "#cbd1cf"
  );

  ctx.beginPath();

  ctx.arc(
    ball.x,
    ball.y,
    12,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.strokeStyle = "#222";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();

  // Black patches

  ctx.fillStyle = "#222";

  ctx.beginPath();

  ctx.arc(
    ball.x - 3,
    ball.y - 3,
    3,
    0,
    Math.PI * 2
  );

  ctx.fill();
}


// ========================================
// PARTICLES
// ========================================

function createParticles(x, y, success) {

  for (let i = 0; i < 35; i++) {

    particles.push({
      x,
      y,

      vx:
        (Math.random() - .5) *
        300,

      vy:
        (Math.random() - .5) *
        300,

      life: 1,

      success
    });
  }
}


function updateParticles(dt) {

  particles.forEach(p => {

    p.x += p.vx * dt;
    p.y += p.vy * dt;

    p.vy += 200 * dt;

    p.life -= dt;
  });

  particles =
    particles.filter(
      p => p.life > 0
    );
}


function drawParticles() {

  particles.forEach(p => {

    ctx.globalAlpha =
      Math.max(0, p.life);

    ctx.fillStyle =
      p.success
        ? "#ffe23b"
        : "#ffffff";

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      4,
      0,
      Math.PI * 2
    );

    ctx.fill();
  });

  ctx.globalAlpha = 1;
}


// ========================================
// TARGET
// ========================================

function targetPosition(zone) {

  const left = W * .18;
  const right = W * .82;
  const top = H * .10;
  const bottom = H * .44;

  if (zone === "left") {

    return {
      x: left + (right - left) * .18,
      y: top + (bottom - top) * .25
    };
  }

  if (zone === "right") {

    return {
      x: left + (right - left) * .82,
      y: top + (bottom - top) * .25
    };
  }

  return {
    x: W / 2,
    y: top + (bottom - top) * .25
  };
}


// ========================================
// SHOOT
// ========================================

function shoot(zone) {

  if (shooting) return;

  shooting = true;

  const target =
    targetPosition(zone);

  ball.startX = W / 2;
  ball.startY = H * .72;

  ball.x = ball.startX;
  ball.y = ball.startY;

  ball.targetX = target.x;
  ball.targetY = target.y;

  ball.progress = 0;

  const difficulty =
    difficultyElement.value;

  let reaction;

  if (difficulty === "easy") {
    reaction = .30;
  }

  else if (difficulty === "hard") {
    reaction = .78;
  }

  else {
    reaction = .52;
  }

  reaction +=
    (level - 1) * .035;

  reaction =
    Math.min(
      reaction,
      .92
    );

  if (Math.random() < reaction) {

    keeper.targetX =
      target.x;

    keeper.targetY =
      target.y;

  } else {

    const randomZone =
      ["left", "center", "right"]
      [Math.floor(Math.random() * 3)];

    const randomTarget =
      targetPosition(
        randomZone
      );

    keeper.targetX =
      randomTarget.x;

    keeper.targetY =
      randomTarget.y;
  }

  messageEl.textContent =
    "SHOT ON THE WAY! ⚡";
}


// ========================================
// FREE KICK
// ========================================

function freeKick(zone) {

  if (shooting) return;

  shooting = true;

  const target =
    targetPosition(zone);

  ball.startX = W / 2;
  ball.startY = H * .78;

  ball.x = ball.startX;
  ball.y = ball.startY;

  ball.targetX =
    target.x;

  ball.targetY =
    target.y - 25;

  ball.progress = 0;

  // Free kicks have a little curve

  keeper.targetX =
    target.x;

  keeper.targetY =
    target.y;

  messageEl.textContent =
    "FREE KICK! 🎯";
}


// ========================================
// GOALKEEPING
// ========================================

function startKeeperChallenge() {

  keeperAction = true;

  const left = W * .18;
  const right = W * .82;
  const top = H * .10;
  const bottom = H * .44;

  ball.x =
    left +
    Math.random() *
    (right - left);

  ball.y =
    top +
    Math.random() *
    (bottom - top);

  keeper.targetX =
    ball.x;

  keeper.targetY =
    ball.y;

  keeper.dive = 0;

  messageEl.textContent =
    "DIVE! TAP THE BALL! 🧤";
}


// ========================================
// GOALKEEPER TAP
// ========================================

function keeperSave() {

  if (!keeperAction) return;

  const distance =
    Math.hypot(
      keeper.x - ball.x,
      keeper.y - ball.y
    );

  keeperAction = false;

  if (distance < 90) {

    score++;

    createParticles(
      ball.x,
      ball.y,
      true
    );

    messageEl.textContent =
      "GREAT SAVE! 🧤🔥";

    checkLevel();

  } else {

    lives--;

    messageEl.textContent =
      "MISSED! ⚽";

    livesEl.textContent =
      lives;

    if (lives <= 0) {
      gameOver();
    }
  }

  setTimeout(
    resetPositions,
    900
  );
}


// ========================================
// RESULT
// ========================================

function goal() {

  score++;

  createParticles(
    ball.targetX,
    ball.targetY,
    true
  );

  messageEl.textContent =
    "GOAL! ⚽🔥";

  checkLevel();

  setTimeout(
    resetPositions,
    900
  );
}


function saved() {

  lives--;

  createParticles(
    ball.targetX,
    ball.targetY,
    false
  );

  livesEl.textContent =
    lives;

  messageEl.textContent =
    "SAVED! 🧤";

  if (lives <= 0) {

    gameOver();

  } else {

    setTimeout(
      resetPositions,
      900
    );
  }
}


function checkLevel() {

  if (
    score > 0 &&
    score % 3 === 0
  ) {

    level++;

    levelEl.textContent =
      level;

    messageEl.textContent =
      `LEVEL ${level}! 🏆`;
  }

  scoreEl.textContent =
    score;
}


function gameOver() {

  shooting = false;
  keeperAction = false;

  messageEl.textContent =
    `GAME OVER — ${score} POINTS`;

  setTimeout(
    restartGame,
    2000
  );
}


// ========================================
// UPDATE
// ========================================

function update(dt) {

  updateParticles(dt);

  if (keeperAction) {

    const dx =
      ball.x - keeper.x;

    const dy =
      ball.y - keeper.y;

    const distance =
      Math.hypot(dx, dy);

    if (distance > 2) {

      keeper.x +=
        (dx / distance) *
        keeper.speed *
        dt;

      keeper.y +=
        (dy / distance) *
        keeper.speed *
        dt;
    }

    return;
  }

  if (!shooting) return;

  ball.progress +=
    dt * (
      mode === "freekick"
        ? 1.35
        : 1.8
    );

  const p =
    Math.min(
      ball.progress,
      1
    );

  // Smooth movement

  const smooth =
    p * p * (3 - 2 * p);

  ball.x =
    ball.startX +
    (ball.targetX - ball.startX) *
    smooth;

  ball.y =
    ball.startY +
    (ball.targetY - ball.startY) *
    smooth;

  // Curve for free kick

  if (mode === "freekick") {

    ball.x +=
      Math.sin(p * Math.PI) *
      45;
  }

  if (p >= 1) {

    shooting = false;

    const distance =
      Math.hypot(
        keeper.x - ball.targetX,
        keeper.y - ball.targetY
      );

    let saveRange =
      mode === "freekick"
        ? 48
        : 60;

    saveRange +=
      level * 2;

    if (distance < saveRange) {

      saved();

    } else {

      goal();
    }
  }
}


// ========================================
// DRAW
// ========================================

function draw() {

  drawField();

  drawKeeper();

  drawBall();

  drawParticles();

  // Aim target

  if (!shooting && !keeperAction) {

    const target =
      targetPosition("center");

    ctx.beginPath();

    ctx.arc(
      target.x,
      target.y,
      17,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle =
      "#ffffff88";

    ctx.lineWidth = 2;

    ctx.stroke();
  }
}


// ========================================
// MODE SWITCH
// ========================================

document
  .querySelectorAll(".mode")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".mode")
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

        if (mode === "penalty") {

          modeText.textContent =
            "Penalty Kick";

          messageEl.textContent =
            "CHOOSE YOUR SHOT";
        }

        if (mode === "freekick") {

          modeText.textContent =
            "Free Kick";

          messageEl.textContent =
            "BEND IT INTO THE NET!";
        }

        if (mode === "keeper") {

          modeText.textContent =
            "Goalkeeping";

          messageEl.textContent =
            "GET READY! 🧤";
        }

        resetPositions();
      }
    );
  });


// ========================================
// BUTTONS
// ========================================

document
  .querySelectorAll(
    "#controls button"
  )
  .forEach(button => {

    button.addEventListener(
      "pointerdown",
      event => {

        event.preventDefault();

        const zone =
          button.dataset.zone;

        if (mode === "penalty") {

          shoot(zone);

        } else if (
          mode === "freekick"
        ) {

          freeKick(zone);

        } else {

          keeperSave();
        }
      }
    );
  });


// ========================================
// CANVAS TOUCH
// ========================================

canvas.addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();

    if (mode === "keeper") {

      keeperSave();

      return;
    }

    if (shooting) return;

    const rect =
      canvas.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    if (x < W / 3) {

      mode === "freekick"
        ? freeKick("left")
        : shoot("left");

    } else if (
      x < W * 2 / 3
    ) {

      mode === "freekick"
        ? freeKick("center")
        : shoot("center");

    } else {

      mode === "freekick"
        ? freeKick("right")
        : shoot("right");
    }
  }
);


// ========================================
// RESTART
// ========================================

function restartGame() {

  score = 0;
  level = 1;
  lives = 5;

  scoreEl.textContent = "0";
  levelEl.textContent = "1";
  livesEl.textContent = "5";

  shooting = false;
  keeperAction = false;

  messageEl.textContent =
    "CHOOSE YOUR SHOT";

  resetPositions();
}

restartBtn.addEventListener(
  "click",
  restartGame
);


// ========================================
// RESET
// ========================================

function resetPositions() {

  const goalLeft =
    W * .18;

  const goalRight =
    W * .82;

  keeper.x =
    (goalLeft + goalRight) / 2;

  keeper.y =
    H * .37;

  keeper.targetX =
    keeper.x;

  keeper.targetY =
    keeper.y;

  const difficulty =
    difficultyElement.value;

  if (difficulty === "easy") {

    keeper.speed = 210;

  } else if (
    difficulty === "hard"
  ) {

    keeper.speed = 390;

  } else {

    keeper.speed = 300;
  }

  keeper.speed +=
    level * 10;

  ball.x =
    W / 2;

  ball.y =
    H * .72;

  if (mode === "keeper") {

    setTimeout(
      startKeeperChallenge,
      400
    );
  }
}


// ========================================
// POWER BAR ANIMATION
// ========================================

let power = 0;
let powerDirection = 1;

function updatePower() {

  power +=
    powerDirection * 0.025;

  if (power >= 1) {
    power = 1;
    powerDirection = -1;
  }

  if (power <= 0) {
    power = 0;
    powerDirection = 1;
  }

  powerFill.style.width =
    `${35 + power * 65}%`;
}


// ========================================
// GAME LOOP
// ========================================

function gameLoop(time) {

  const dt =
    Math.min(
      0.033,
      (time - last) / 1000
    );

  last = time;

  update(dt);
  updatePower();
  draw();

  requestAnimationFrame(
    gameLoop
  );
}


// START

resize();

requestAnimationFrame(
  gameLoop
);
