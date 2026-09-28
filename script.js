"use strict";

/* =========================================================
   ELEMENTS
========================================================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const arena = document.getElementById("arena");

const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const livesEl = document.getElementById("lives");

const messageEl = document.getElementById("message");
const distanceEl = document.getElementById("distance");

const difficultyEl =
  document.getElementById("difficulty");

const playerSelect =
  document.getElementById("playerSelect");

const restartBtn =
  document.getElementById("restart");

const hintEl =
  document.getElementById("hint");

const modeTextEl =
  document.getElementById("modeText");

const footerText =
  document.getElementById("footerText");

const controls =
  document.getElementById("controls");

const diveButton =
  document.getElementById("diveButton");

const powerWrap =
  document.getElementById("powerWrap");

const powerFill =
  document.getElementById("powerFill");

const powerText =
  document.getElementById("powerText");

const resultCard =
  document.getElementById("resultCard");

const resultTitle =
  document.getElementById("resultTitle");

const resultSub =
  document.getElementById("resultSub");

const continueBtn =
  document.getElementById("continueBtn");


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

let pulse = 0;
let lastTime = performance.now();

let particles = [];

let timer = null;

let selectedPlayer =
  "Cristiano Ronaldo";


/* =========================================================
   PLAYER DATA
========================================================= */

const players = {

  "Cristiano Ronaldo": {
    color: "#151515",
    accent: "#d71920",
    number: "7"
  },

  "Lionel Messi": {
    color: "#1c3f92",
    accent: "#78a9e8",
    number: "10"
  },

  "Kylian Mbappe": {
    color: "#14286f",
    accent: "#eeeeee",
    number: "9"
  },

  "Erling Haaland": {
    color: "#6a9bdd",
    accent: "#ffffff",
    number: "9"
  },

  "Mohamed Salah": {
    color: "#e3212d",
    accent: "#ffffff",
    number: "11"
  },

  "Neymar Jr": {
    color: "#1c7e3c",
    accent: "#f1d441",
    number: "10"
  }
  
};


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

  duration: 0.65,

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
   WALL
========================================================= */

const wall = {

  people: 4,

  x: 0,

  y: 0,

  height: 70

};


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
    Math.min(max, value)
  );
}


function schedule(
  callback,
  delay
) {

  clearTimeout(timer);

  timer =
    setTimeout(
      callback,
      delay
    );
}


/* =========================================================
   FIELD GEOMETRY
========================================================= */

function getGoal() {

  const width =
    Math.min(
      W * 0.76,
      900
    );

  const height =
    Math.min(
      H * 0.31,
      280
    );

  return {

    x:
      (W - width) / 2,

    y:
      Math.max(
        34,
        H * 0.07
      ),

    w: width,
    h: height

  };
}


function getGoalMouthY() {

  const g =
    getGoal();

  return (
    g.y +
    g.h *
    0.72
  );
}


function getKeeperHome() {

  return {

    x:
      W / 2,

    y:
      getGoalMouthY() -
      12

  };
}


function getPenaltySpot() {

  return {

    x:
      W / 2,

    y:
      H * 0.81

  };
}


function metersFromY(y) {

  const distance =
    10 +
    (
      (
        H * 0.82 -
        y
      ) /
      (
        H * 0.82 -
        H * 0.30
      )
    ) *
    35;

  return clamp(
    Math.round(distance),
    10,
    45
  );
}


function currentDistance() {

  if (
    mode === "penalty"
  ) {

    return 12;
  }

  if (
    mode === "freekick"
  ) {

    return (
      20 +
      Math.min(
        10,
        level * 1.2
      )
    );
  }

  if (
    mode === "longshot"
  ) {

    return metersFromY(
      ball.y
    );
  }

  return 0;
}


function updateDistance() {

  if (
    mode === "keeper"
  ) {

    distanceEl.textContent =
      "POV • GOALKEEPER";

  } else {

    distanceEl.textContent =
      `DISTANCE: ${
        currentDistance()
      } m`;

  }

}


/* =========================================================
   CANVAS SIZE
========================================================= */

function resizeCanvas() {

  const rect =
    arena.getBoundingClientRect();

  W =
    Math.max(
      320,
      Math.floor(
        rect.width
      )
    );

  H =
    Math.max(
      260,
      Math.floor(
        rect.height
      )
    );

  dpr =
    Math.min(
      window.devicePixelRatio ||
      1,
      2
    );

  canvas.width =
    Math.floor(
      W * dpr
    );

  canvas.height =
    Math.floor(
      H * dpr
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

    setTimeout(
      resizeCanvas,
      150
    );

  }
);


if (
  "ResizeObserver" in window
) {

  const observer =
    new ResizeObserver(
      resizeCanvas
    );

  observer.observe(
    arena
  );

}


/* =========================================================
   LAYOUT
========================================================= */

function layout() {

  const home =
    getKeeperHome();

  keeper.x =
    home.x;

  keeper.y =
    home.y;

  keeper.startX =
    home.x;

  keeper.startY =
    home.y;

  keeper.targetX =
    home.x;

  keeper.targetY =
    home.y;

  keeper.t =
    0;

  keeper.tilt =
    0;


  const spot =
    getPenaltySpot();

  ball.x =
    spot.x;

  ball.y =
    spot.y;

  ball.startX =
    spot.x;

  ball.startY =
    spot.y;

  ball.targetX =
    spot.x;

  ball.targetY =
    spot.y;

  ball.t =
    0;

  ball.curve =
    0;

  ball.arc =
    0;

  ball.radius =
    clamp(
      Math.min(W, H) *
      0.022,
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
      6
    );

  wall.height =
    clamp(
      58 +
      level * 3,
      58,
      78
    );

  wall.x =
    W / 2;

  wall.y =
    H * 0.59;

  updateDistance();
}


/* =========================================================
   MAIN DRAW
========================================================= */

function draw() {

  if (
    mode === "keeper"
  ) {

    drawKeeperPOV();

  } else {

    drawPitch();

    drawPlayersOnPitch();

    if (
      mode === "freekick"
    ) {

      drawWall();

    }

    drawKeeper();
    drawBall();
    drawAim();

  }

  drawParticles();
}


/* =========================================================
   FULL FOOTBALL PITCH
========================================================= */

function drawPitch() {

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
      H * 0.20
    );

  sky.addColorStop(
    0,
    "#07110b"
  );

  sky.addColorStop(
    1,
    "#183d25"
  );

  ctx.fillStyle =
    sky;

  ctx.fillRect(
    0,
    0,
    W,
    H * 0.20
  );


  /* Grass */

  const grass =
    ctx.createLinearGradient(
      0,
      H * 0.14,
      0,
      H
    );

  grass.addColorStop(
    0,
    "#19a552"
  );

  grass.addColorStop(
    .55,
    "#0e843e"
  );

  grass.addColorStop(
    1,
    "#075b29"
  );

  ctx.fillStyle =
    grass;

  ctx.fillRect(
    0,
    H * 0.14,
    W,
    H * 0.86
  );


  /* Grass stripes */

  for (
    let i = 0;
    i < 16;
    i++
  ) {

    ctx.fillStyle =
      i % 2
        ? "#ffffff08"
        : "#00000009";

    ctx.fillRect(
      0,
      H * 0.14 +
      i *
      H * 0.86 /
      16,

      W,
      H * 0.86 /
      16
    );
  }


  drawStadiumLights();


  const g =
    getGoal();


  /* Entire pitch outline */

  ctx.strokeStyle =
    "#ffffffdd";

  ctx.lineWidth =
    3;

  ctx.strokeRect(
    W * 0.05,
    H * 0.22,
    W * 0.90,
    H * 0.70
  );


  /* Halfway line */

  ctx.beginPath();

  ctx.moveTo(
    0,
    H * 0.57
  );

  ctx.lineTo(
    W,
    H * 0.57
  );

  ctx.stroke();


  /* Center circle */

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * 0.57,
    Math.min(
      W,
      H
    ) * .105,
    0,
    Math.PI * 2
  );

  ctx.stroke();


  /* Top penalty box */

  ctx.strokeRect(
    W * .17,
    g.y +
    g.h * .80,

    W * .66,
    H * .29
  );


  /* Small box */

  ctx.strokeRect(
    W * .28,
    g.y +
    g.h * .80,

    W * .44,
    H * .17
  );


  /* Penalty arc */

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * .81,
    W * .14,
    Math.PI,
    Math.PI * 2
  );

  ctx.stroke();


  /* Center spot */

  ctx.beginPath();

  ctx.arc(
    W / 2,
    H * .81,
    5,
    0,
    Math.PI * 2
  );

  ctx.fillStyle =
    "#fff";

  ctx.fill();


  drawGoal(g);
}


/* =========================================================
   STADIUM LIGHTS
========================================================= */

function drawStadiumLights() {

  const positions = [
    W * .08,
    W * .30,
    W * .50,
    W * .70,
    W * .92
  ];

  positions.forEach(
    x => {

      const glow =
        ctx.createRadialGradient(
          x,
          22,
          2,
          x,
          22,
          100
        );

      glow.addColorStop(
        0,
        "#fff4ac99"
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
        120
      );

      ctx.fillStyle =
        "#fff1a5";

      ctx.beginPath();

      ctx.arc(
        x,
        22,
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
      i / 89 * W;

    const y =
      62 +
      (i % 5) * 8;

    ctx.fillStyle =
      i % 7 === 0
        ? "#ffd66c"
        : "#ffffff55";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      1.7,
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

  ctx.fillStyle =
    "#ffffff10";

  ctx.fillRect(
    g.x,
    g.y,
    g.w,
    g.h
  );


  ctx.strokeStyle =
    "#ffffff22";

  ctx.lineWidth =
    1;


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


  ctx.strokeStyle =
    "#fff";

  ctx.lineWidth =
    10;

  ctx.strokeRect(
    g.x,
    g.y,
    g.w,
    g.h
  );


  ctx.strokeStyle =
    "#cbd6cf";

  ctx.lineWidth =
    3;

  ctx.strokeRect(
    g.x + 6,
    g.y + 6,
    g.w - 12,
    g.h - 12
  );
}


/* =========================================================
   PLAYERS
========================================================= */

function drawPlayersOnPitch() {

  const player =
    players[selectedPlayer];


  /*
     For long shots, the selected
     player stands at the ball.
  */

  let mainX =
    W / 2;

  let mainY =
    H * .74;

  if (
    mode === "longshot"
  ) {

    mainX =
      ball.x;

    mainY =
      ball.y;
  }


  drawGamePlayer(
    mainX,
    mainY,
    player,
    1.12,
    true
  );


  const teammates = [

    [
      W * .23,
      H * .45,
      "Lionel Messi"
    ],

    [
      W * .43,
      H * .49,
      "Kylian Mbappe"
    ],

    [
      W * .68,
      H * .43,
      "Erling Haaland"
    ],

    [
      W * .79,
      H * .57,
      "Mohamed Salah"
    ],

    [
      W * .18,
      H * .64,
      "Neymar"
    ]

  ];


  teammates.forEach(
    (p, index) => {

      /*
         Don't draw the selected player twice.
      */

      if (
        p[2] === selectedPlayer
      ) {
        return;
      }

      drawGamePlayer(
        p[0],
        p[1],
        players[p[2]],
        .70 + index * .02,
        false
      );
    }
  );


  ctx.fillStyle =
    "#fff";

  ctx.font =
    "900 12px Arial";

  ctx.textAlign =
    "center";

  ctx.fillText(
    selectedPlayer,
    mainX,
    mainY + 67
  );
}


function drawGamePlayer(
  x,
  y,
  kit,
  scale,
  main
) {

  ctx.save();

  ctx.translate(
    x,
    y
  );

  ctx.scale(
    scale,
    scale
  );


  /* Shadow */

  ctx.fillStyle =
    "#0006";

  ctx.beginPath();

  ctx.ellipse(
    0,
    28,
    22,
    7,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* Legs */

  ctx.strokeStyle =
    "#182a20";

  ctx.lineWidth =
    9;

  ctx.lineCap =
    "round";

  ctx.beginPath();

  ctx.moveTo(
    -5,
    14
  );

  ctx.lineTo(
    -8,
    42
  );

  ctx.moveTo(
    5,
    14
  );

  ctx.lineTo(
    8,
    42
  );

  ctx.stroke();


  /* Shirt */

  ctx.fillStyle =
    kit.color;

  ctx.fillRect(
    -16,
    -16,
    32,
    34
  );


  /* Accent */

  ctx.fillStyle =
    kit.accent;

  ctx.fillRect(
    -16,
    -2,
    32,
    5
  );


  /* Head */

  ctx.fillStyle =
    "#d59a72";

  ctx.beginPath();

  ctx.arc(
    0,
    -28,
    12,
    0,
    Math.PI * 2
  );

  ctx.fill();


  /* Hair */

  ctx.fillStyle =
    "#21150e";

  ctx.beginPath();

  ctx.arc(
    0,
    -31,
    11,
    Math.PI,
    Math.PI * 2
  );

  ctx.fill();


  /* Number */

  ctx.fillStyle =
    "#fff";

  ctx.font =
    "900 10px Arial";

  ctx.textAlign =
    "center";

  ctx.fillText(
    kit.number,
    0,
    5
  );


  if (
    main
  ) {

    ctx.strokeStyle =
      "#fff7";

    ctx.lineWidth =
      2;

    ctx.strokeRect(
      -20,
      -21,
      40,
      40
    );
  }


  ctx.restore();
}


/* =========================================================
   WALL
========================================================= */

function drawWall() {

  const spacing =
    42 +
    Math.min(
      7,
      level
    );

  const total =
    (
      wall.people -
      1
    ) *
    spacing;

  const firstX =
    W / 2 -
    total / 2;


  for (
    let i = 0;
    i < wall.people;
    i++
  ) {

    drawDefender(
      firstX +
      i * spacing,

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
    y +
    Math.sin(
      pulse * 3 +
      index
    ) * 2
  );


  ctx.fillStyle =
    "#0007";

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


  ctx.strokeStyle =
    "#15243a";

  ctx.lineWidth =
    9;

  ctx.lineCap =
    "round";

  ctx.beginPath();

  ctx.moveTo(-5,17);
  ctx.lineTo(-8,43);

  ctx.moveTo(5,17);
  ctx.lineTo(8,43);

  ctx.stroke();


  ctx.fillStyle =
    index % 2
      ? "#24588f"
      : "#1d6aa7";

  ctx.fillRect(
    -14,
    -15,
    28,
    34
  );


  ctx.strokeStyle =
    "#173e67";

  ctx.lineWidth =
    8;

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


/* =========================================================
   KEEPER
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


  ctx.fillStyle =
    "#0007";

  ctx.beginPath();

  ctx.ellipse(
    0,
    42,
    46,
    10,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.strokeStyle =
    "#213929";

  ctx.lineWidth =
    13;

  ctx.lineCap =
    "round";

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

  ctx.fillStyle =
    shirt;

  ctx.fillRect(
    -26,
    -31,
    52,
    51
  );


  ctx.strokeStyle =
    "#ffd21e";

  ctx.lineWidth =
    12;

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


  ctx.fillStyle =
    "#d79b70";

  ctx.fillRect(
    -7,
    -38,
    14,
    9
  );


  ctx.beginPath();

  ctx.arc(
    0,
    -53,
    18,
    0,
    Math.PI * 2
  );

  ctx.fill();


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


  ctx.restore();
}


/* =========================================================
   BALL
========================================================= */

function drawBall() {

  const r =
    ball.radius;

  ctx.save();

  ctx.shadowColor =
    "#000a";

  ctx.shadowBlur =
    14;


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

  ctx.lineWidth =
    1.5;

  ctx.stroke();


  ctx.shadowBlur =
    0;


  ctx.fillStyle =
    "#252a27";

  [
    .1,
    2.2,
    4.3
  ].forEach(
    angle => {

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
  );


  ctx.restore();
}


/* =========================================================
   AIM
========================================================= */

function drawAim() {

  if (
    state !== "ready"
  ) {
    return;
  }


  if (
    mode === "longshot"
  ) {

    ctx.strokeStyle =
      "#ffffff44";

    ctx.lineWidth =
      2;

    ctx.setLineDash([
      7,
      7
    ]);

    ctx.beginPath();

    ctx.moveTo(
      ball.x,
      ball.y
    );

    ctx.lineTo(
      W / 2,
      getGoalMouthY()
    );

    ctx.stroke();

    ctx.setLineDash([]);

    return;
  }


  const targets =
    mode === "freekick"
      ? getFreeKickTargets()
      : getPenaltyTargets();


  targets.forEach(
    target => {

      ctx.strokeStyle =
        "#ffffff35";

      ctx.lineWidth =
        2;

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
    g.h * .27;

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
      ? getFreeKickTargets()
      : getPenaltyTargets();

  return list.find(
    target =>
      target.zone === zone
  );
}


/* =========================================================
   KEEPER POV
========================================================= */

function drawKeeperPOV() {

  ctx.clearRect(
    0,
    0,
    W,
    H
  );


  const bg =
    ctx.createLinearGradient(
      0,
      0,
      0,
      H
    );

  bg.addColorStop(
    0,
    "#07110c"
  );

  bg.addColorStop(
    .42,
    "#143a23"
  );

  bg.addColorStop(
    .43,
    "#10853e"
  );

  bg.addColorStop(
    1,
    "#075b29"
  );

  ctx.fillStyle =
    bg;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );


  drawStadiumLights();


  /* Perspective */

  ctx.strokeStyle =
    "#ffffff44";

  ctx.lineWidth =
    3;

  ctx.beginPath();

  ctx.moveTo(
    0,
    H
  );

  ctx.lineTo(
    W * .37,
    H * .43
  );

  ctx.moveTo(
    W,
    H
  );

  ctx.lineTo(
    W * .63,
    H * .43
  );

  ctx.stroke();


  /* Penalty box */

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


  drawPOVOpponents();

  drawGoalkeeperHands();

  drawPOVBall();


  /*
     Goal net at the edges.
  */

  ctx.strokeStyle =
    "#ffffff22";

  ctx.lineWidth =
    1;

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
      x +
      (x - W / 2) *
      .25,

      H
    );

    ctx.stroke();
  }


  ctx.strokeStyle =
    "#fff";

  ctx.lineWidth =
    12;

  ctx.beginPath();

  ctx.moveTo(
    6,
    0
  );

  ctx.lineTo(
    6,
    H
  );

  ctx.moveTo(
    W - 6,
    0
  );

  ctx.lineTo(
    W - 6,
    H
  );

  ctx.stroke();
}


function drawPOVOpponents() {

  const positions = [

    [.25, .42],
    [.38, .36],
    [.50, .33],
    [.62, .36],
    [.75, .42]

  ];


  positions.forEach(
    (p, index) => {

      const x =
        W * p[0];

      const y =
        H * p[1];

      const scale =
        index === 2
          ? 1.18
          : .95;


      ctx.save();

      ctx.translate(
        x,
        y
      );

      ctx.scale(
        scale,
        scale
      );


      ctx.fillStyle =
        "#24558e";

      ctx.fillRect(
        -13,
        0,
        26,
        38
      );


      ctx.strokeStyle =
        "#172338";

      ctx.lineWidth =
        8;

      ctx.beginPath();

      ctx.moveTo(
        -5,
        37
      );

      ctx.lineTo(
        -9,
        66
      );

      ctx.moveTo(
        5,
        37
      );

      ctx.lineTo(
        9,
        66
      );

      ctx.stroke();


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

  const y =
    H * .86;


  drawBigGlove(
    W * .16,
    y,
    -1
  );


  drawBigGlove(
    W * .84,
    y,
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
    -direction * .13
  );


  ctx.fillStyle =
    "#eef2ef";

  ctx.beginPath();

  ctx.ellipse(
    0,
    0,
    39,
    31,
    0,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.strokeStyle =
    "#8b9790";

  ctx.lineWidth =
    2;

  ctx.stroke();


  ctx.strokeStyle =
    "#fff";

  ctx.lineWidth =
    10;

  ctx.lineCap =
    "round";


  for (
    let i = -1;
    i <= 1;
    i++
  ) {

    ctx.beginPath();

    ctx.moveTo(
      direction * 23,
      i * 9
    );

    ctx.lineTo(
      direction * 51,
      i * 13
    );

    ctx.stroke();
  }


  ctx.restore();
}


/* =========================================================
   POV BALL
========================================================= */

function drawPOVBall() {

  if (
    state !== "keeper"
  ) {
    return;
  }


  const x =
    ball.x;

  const y =
    ball.y;


  const r =
    clamp(
      13 +
      (y / H) * 45,
      15,
      45
    );


  ctx.save();

  ctx.shadowColor =
    "#000b";

  ctx.shadowBlur =
    22;


  const gradient =
    ctx.createRadialGradient(
      x - r * .3,
      y - r * .4,
      2,
      x,
      y,
      r
    );

  gradient.addColorStop(
    0,
    "#fff"
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
    r,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.strokeStyle =
    "#202622";

  ctx.lineWidth =
    2;

  ctx.stroke();


  ctx.restore();
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
        Math.random() *
        .6,

      size:
        2 +
        Math.random() *
        4,

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

      p.life -=
        dt;
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
  );

  ctx.globalAlpha =
    1;
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
      reaction: .16,
      flight: .76
    };
  }


  if (
    difficultyEl.value ===
    "hard"
  ) {

    return {
      reaction: .58,
      flight: .58
    };
  }


  return {
    reaction: .34,
    flight: .66
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

  updateDistance();
}


function setMessage(text) {

  messageEl.textContent =
    text;
}


/* =========================================================
   BEGIN MODE
========================================================= */

function beginMode() {

  clearTimeout(timer);

  resultCard.hidden =
    true;

  diveButton.hidden =
    true;

  layout();

  state =
    "ready";


  if (
    mode === "keeper"
  ) {

    controls.hidden =
      true;

    powerWrap.hidden =
      true;

    modeTextEl.textContent =
      "Goalkeeper POV";

    footerText.textContent =
      "Dive into the ball to make the save";

    hintEl.textContent =
      "You're inside the goal — time your dive!";

    setMessage(
      "GET READY, GOALKEEPER! 🧤"
    );

    schedule(
      startKeeperRound,
      800
    );

    return;
  }


  controls.hidden =
    false;

  powerWrap.hidden =
    false;


  if (
    mode === "penalty"
  ) {

    modeTextEl.textContent =
      "Penalty Kick";

    footerText.textContent =
      "3 goals = next level";

    hintEl.textContent =
      "Pick a corner and shoot!";

    setMessage(
      "CHOOSE YOUR SHOT"
    );

  } else if (
    mode === "freekick"
  ) {

    modeTextEl.textContent =
      "Free Kick";

    footerText.textContent =
      "Beat the defensive wall";

    hintEl.textContent =
      `Wall: ${
        wall.people
      } defenders • Bend it over them!`;

    setMessage(
      "FREE KICK • BEAT THE WALL"
    );

  } else {

    modeTextEl.textContent =
      "Long Shot";

    footerText.textContent =
      "Tap the pitch to choose your distance";

    hintEl.textContent =
      "Tap anywhere on the pitch to set your distance!";

    setMessage(
      "CHOOSE SHOOTING DISTANCE"
    );
  }
}


/* =========================================================
   SHOOT
========================================================= */

function shoot(
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

  if (!target) {
    return;
  }


  const settings =
    difficultySettings();


  let start;


  if (
    mode === "longshot"
  ) {

    start = {

      x: ball.x,

      y: ball.y

    };

  } else if (
    mode === "freekick"
  ) {

    start = {

      x: W / 2,

      y: H * .66

    };

  } else {

    start =
      getPenaltySpot();

  }


  state =
    "flight";


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

  ball.t =
    0;


  const powerBoost =
    .82 +
    power * .24;


  ball.duration =
    settings.flight /
    powerBoost;


  /*
     Different ball physics
     for different game modes.
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
        22 +
        power * 28
      );


    ball.arc =
      105 +
      power * 65;


    setMessage(
      "OVER THE WALL! 🎯"
    );

  } else if (
    mode === "longshot"
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
        18 +
        power * 22
      );


    ball.arc =
      75 +
      power * 55;


    setMessage(
      `LONG SHOT • ${
        currentDistance()
      } m! 🚀`
    );

  } else {

    ball.curve =
      (
        Math.random() -
        .5
      ) * 6;


    ball.arc =
      28 +
      power * 15;


    setMessage(
      "SHOT ON THE WAY! ⚡"
    );
  }


  /*
     Easier goalkeeper behavior.
  */

  const correct =
    Math.random() <
    clamp(
      settings.reaction +
      (level - 1) * .018,
      .05,
      .64
    );


  let keeperTarget;


  if (
    correct
  ) {

    keeperTarget =
      target;

  } else {

    const zones = [
      "left",
      "center",
      "right"
    ].filter(
      z =>
        z !== zone
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
    keeperTarget.y +
    20;

  keeper.t =
    0;


  keeper.duration =
    Math.max(
      .40,
      settings.flight *
      .95
    );


  keeper.tilt =
    (
      keeperTarget.x -
      keeper.startX
    ) /
    W *
    1.1;
}


/* =========================================================
   LONG SHOT DISTANCE TAP
========================================================= */

function handleLongshotTap(
  x,
  y
) {

  if (
    state !== "ready" ||
    mode !== "longshot"
  ) {
    return;
  }


  const minY =
    H * .34;

  const maxY =
    H * .82;


  ball.x =
    clamp(
      x,
      W * .15,
      W * .85
    );


  ball.y =
    clamp(
      y,
      minY,
      maxY
    );


  ball.startX =
    ball.x;

  ball.startY =
    ball.y;


  updateDistance();


  setMessage(
    `${
      currentDistance()
    } m — NOW AIM! 🚀`
  );
}


/* =========================================================
   SHOT FINISH
========================================================= */

function finishShot() {

  /*
     Smaller range keeps goals
     easier for the player.
  */

  let saveRange =
    mode === "freekick"
      ? 34
      : mode === "longshot"
        ? 31
        : 36;


  saveRange +=
    Math.min(
      level * 1.1,
      10
    );


  const distance =
    Math.hypot(
      keeper.x -
        ball.targetX,

      keeper.y -
        ball.targetY
    );


  if (
    distance <=
    saveRange
  ) {

    loseLife(
      "SAVED! 🧤"
    );

  } else {

    goalScored();
  }
}


/* =========================================================
   GOAL
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


  state =
    "result";


  resultCard.hidden =
    false;


  if (
    levelUp
  ) {

    resultTitle.textContent =
      `LEVEL ${
        level
      }! 🏆`;


    resultSub.textContent =
      mode === "freekick"

        ? `The wall now has ${
            wall.people
          } defenders.`

        : mode === "longshot"

          ? "The long-shot challenge gets harder."

          : "The goalkeeper gets slightly faster.";


    setMessage(
      `LEVEL ${
        level
      }! 🏆`
    );

  } else {

    resultTitle.textContent =
      "GOAL! ⚽🔥";


    if (
      mode === "longshot"
    ) {

      resultSub.textContent =
        `Goal from ${
          currentDistance()
        } m!`;

    } else if (
      mode === "freekick"
    ) {

      resultSub.textContent =
        "Beautiful free kick over the wall.";

    } else {

      resultSub.textContent =
        "Great finish!";
    }
  }


  continueBtn.textContent =
    "CONTINUE";
}


/* =========================================================
   LOSE LIFE
========================================================= */

function loseLife(
  text
) {

  lives--;

  updateHUD();


  createParticles(
    ball.targetX ||
      ball.x,

    ball.targetY ||
      ball.y,

    false
  );


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
      `GAME OVER — ${
        score
      } GOALS`
    );

  } else {

    resultTitle.textContent =
      "SAVED! 🧤";


    resultSub.textContent =
      `${
        lives
      } ${
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


/* =========================================================
   GOALKEEPER ROUND
========================================================= */

function startKeeperRound() {

  if (
    mode !== "keeper" ||
    state === "gameover"
  ) {
    return;
  }


  state =
    "keeper";


  ball.x =
    W * (
      .15 +
      Math.random() *
      .70
    );


  ball.y =
    H * (
      .18 +
      Math.random() *
      .37
    );


  keeper.startX =
    W / 2;

  keeper.startY =
    H * .78;


  keeper.x =
    keeper.startX;

  keeper.y =
    keeper.startY;


  keeper.targetX =
    ball.x;

  keeper.targetY =
    H * .53;


  keeper.t =
    0;


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


  diveButton.hidden =
    false;


  setMessage(
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


  diveButton.hidden =
    true;


  const distance =
    Math.hypot(
      keeper.x -
        ball.x,

      keeper.y -
        ball.y
    );


  const saveRange =
    difficultyEl.value ===
      "easy"

      ? 125

      : difficultyEl.value ===
        "hard"

        ? 92

        : 108;


  if (
    distance <=
    saveRange
  ) {

    score++;


    if (
      score % 3 === 0
    ) {

      level++;
    }


    updateHUD();


    createParticles(
      ball.x,
      ball.y,
      true
    );


    state =
      "result";


    resultCard.hidden =
      false;


    resultTitle.textContent =
      score % 3 === 0

        ? `LEVEL ${
            level
          }! 🏆`

        : "GREAT SAVE! 🧤";


    resultSub.textContent =
      "Perfect goalkeeping!";


    continueBtn.textContent =
      "CONTINUE";


    setMessage(
      "WHAT A SAVE! 🔥"
    );

  } else {

    lives--;


    updateHUD();


    if (
      lives <= 0
    ) {

      state =
        "gameover";


      resultTitle.textContent =
        "GAME OVER";


      resultSub.textContent =
        `Final score: ${score}`;


      continueBtn.textContent =
        "PLAY AGAIN";


      setMessage(
        `GAME OVER — ${
          score
        } SAVES`
      );

    } else {

      state =
        "result";


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
        "JUST MISSED IT! ⚽"
      );
    }


    resultCard.hidden =
      false;
  }
}


/* =========================================================
   CONTINUE
========================================================= */

function continueRound() {

  resultCard.hidden =
    true;


  if (
    state === "gameover"
  ) {

    restartGame();

  } else {

    beginMode();
  }
}


/* =========================================================
   RESTART
========================================================= */

function restartGame() {

  clearTimeout(
    timer
  );


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

function update(
  dt
) {

  pulse += dt;


  updateParticles(
    dt
  );


  /* Power meter */

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


  const powerPercent =
    Math.round(
      35 +
      power *
      65
    );


  powerFill.style.width =
    powerPercent +
    "%";


  powerText.textContent =
    powerPercent +
    "%";


  /* ====================================
     SHOT IN FLIGHT
  ==================================== */

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
      (
        3 -
        2 * p
      );


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


    ball.x +=
      Math.sin(
        p * Math.PI
      ) *
      ball.curve;


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


    /* Keeper */

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
      (
        3 -
        2 * kp
      );


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


  /* ====================================
     GOALKEEPER MODE
  ==================================== */

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
      (
        3 -
        2 * p
      );


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


    ball.y +=
      dt *
      55;


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


  updateDistance();
}


/* =========================================================
   EVENT HANDLERS
========================================================= */

document
  .querySelectorAll(".mode")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".mode"
            )
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
    }
  );


/* Shot buttons */

controls
  .querySelectorAll(
    "button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "pointerdown",
        event => {

          event.preventDefault();

          shoot(
            button.dataset.zone
          );
        }
      );
    }
  );


/* Canvas */

canvas.addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();


    const rect =
      canvas.getBoundingClientRect();


    const x =
      event.clientX -
      rect.left;


    const y =
      event.clientY -
      rect.top;


    if (
      mode === "keeper"
    ) {

      keeperSave();

      return;
    }


    if (
      mode === "longshot"
    ) {

      handleLongshotTap(
        x,
        y
      );

      return;
    }


    if (
      state !== "ready"
    ) {
      return;
    }


    const zone =
      x <
      W / 3

        ? "left"

        : x <
          W * 2 / 3

          ? "center"

          : "right";


    shoot(zone);
  }
);


/* Dive */

diveButton.addEventListener(
  "pointerdown",
  event => {

    event.preventDefault();

    keeperSave();
  }
);


/* Player */

playerSelect.addEventListener(
  "change",
  () => {

    selectedPlayer =
      playerSelect.value;

    draw();
  }
);


/* Difficulty */

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


/* Restart */

restartBtn.addEventListener(
  "click",
  restartGame
);


/* Continue */

continueBtn.addEventListener(
  "click",
  continueRound
);


/* =========================================================
   START
========================================================= */

resizeCanvas();

updateHUD();

beginMode();

requestAnimationFrame(
  function gameLoop(now) {

    const dt =
      Math.min(
        .035,
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
      gameLoop
    );
  }
);
