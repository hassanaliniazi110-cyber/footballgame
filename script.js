"use strict";

/* =========================================================
   FOOTBALL HERO X
   STABLE GAME ENGINE
   ========================================================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerSelect = document.getElementById("playerSelect");
const keeperSelect = document.getElementById("keeperSelect");
const difficultySelect = document.getElementById("difficultySelect");
const powerSlider = document.getElementById("powerSlider");

const startOverlay = document.getElementById("startOverlay");
const resultOverlay = document.getElementById("resultOverlay");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const shootButton = document.getElementById("shootButton");
const saveButton = document.getElementById("saveButton");
const restartButton = document.getElementById("restartButton");


/* =========================================================
   PLAYERS
   ========================================================= */

const players = {

    hassan: {
        name: "Hassan Ali",
        avatar: "HA",
        shooting: 98,
        power: 98,
        accuracy: 98,
        speed: 96,
        special: "Complete Specialist"
    },

    ehan: {
        name: "Ehan Ali",
        avatar: "EA",
        shooting: 95,
        power: 94,
        accuracy: 94,
        speed: 96,
        special: "Power Finisher"
    },

    arham: {
        name: "Muhammad Arham",
        avatar: "MA",
        shooting: 91,
        power: 93,
        accuracy: 89,
        speed: 92,
        special: "Power Shooter"
    },

    umar: {
        name: "Umar Shoaib",
        avatar: "US",
        shooting: 90,
        power: 91,
        accuracy: 92,
        speed: 94,
        special: "Fast Finisher"
    },

    ronaldo: {
        name: "Cristiano Ronaldo",
        avatar: "CR",
        shooting: 98,
        power: 99,
        accuracy: 95,
        speed: 93,
        special: "Power & Precision"
    },

    haaland: {
        name: "Erling Haaland",
        avatar: "EH",
        shooting: 97,
        power: 100,
        accuracy: 92,
        speed: 91,
        special: "LONG-SHOT SPECIALIST"
    },

    bellingham: {
        name: "Jude Bellingham",
        avatar: "JB",
        shooting: 94,
        power: 91,
        accuracy: 98,
        speed: 94,
        special: "PENALTY SPECIALIST"
    },

    yamal: {
        name: "Lamine Yamal",
        avatar: "LY",
        shooting: 94,
        power: 90,
        accuracy: 99,
        speed: 96,
        special: "FREE-KICK SPECIALIST"
    },

    messi: {
        name: "Lionel Messi",
        avatar: "LM",
        shooting: 96,
        power: 88,
        accuracy: 100,
        speed: 94,
        special: "Curve Master"
    },

    mbappe: {
        name: "Kylian Mbappé",
        avatar: "KM",
        shooting: 96,
        power: 94,
        accuracy: 93,
        speed: 100,
        special: "Speed Finisher"
    }

};


/* =========================================================
   GOALKEEPERS
   ========================================================= */

const goalkeepers = {

    hassan: {
        name: "Hassan Ali",
        avatar: "HA",
        reflexes: 300,
        diving: 300,
        handling: 300,
        positioning: 300,
        overall: 300
    },

    ehan: {
        name: "Ehan Ali",
        avatar: "EA",
        reflexes: 95,
        diving: 94,
        handling: 92,
        positioning: 93,
        overall: 94
    },

    courtois: {
        name: "Thibaut Courtois",
        avatar: "TC",
        reflexes: 96,
        diving: 95,
        handling: 94,
        positioning: 96,
        overall: 96
    },

    donnarumma: {
        name: "Gianluigi Donnarumma",
        avatar: "GD",
        reflexes: 95,
        diving: 96,
        handling: 94,
        positioning: 93,
        overall: 95
    },

    alisson: {
        name: "Alisson",
        avatar: "AL",
        reflexes: 94,
        diving: 94,
        handling: 96,
        positioning: 95,
        overall: 95
    },

    neuer: {
        name: "Manuel Neuer",
        avatar: "MN",
        reflexes: 91,
        diving: 90,
        handling: 93,
        positioning: 96,
        overall: 93
    },

    oblak: {
        name: "Jan Oblak",
        avatar: "JO",
        reflexes: 95,
        diving: 94,
        handling: 95,
        positioning: 96,
        overall: 95
    },

    martinez: {
        name: "Emiliano Martínez",
        avatar: "EM",
        reflexes: 94,
        diving: 92,
        handling: 93,
        positioning: 95,
        overall: 94
    },

    ederson: {
        name: "Ederson",
        avatar: "ED",
        reflexes: 91,
        diving: 90,
        handling: 94,
        positioning: 94,
        overall: 92
    },

    maignan: {
        name: "Mike Maignan",
        avatar: "MM",
        reflexes: 96,
        diving: 95,
        handling: 94,
        positioning: 94,
        overall: 95
    },

    raya: {
        name: "David Raya",
        avatar: "DR",
        reflexes: 92,
        diving: 91,
        handling: 94,
        positioning: 93,
        overall: 92
    },

    szczesny: {
        name: "Wojciech Szczęsny",
        avatar: "WS",
        reflexes: 93,
        diving: 91,
        handling: 94,
        positioning: 94,
        overall: 93
    },

    casillas: {
        name: "Iker Casillas",
        avatar: "IC",
        reflexes: 97,
        diving: 96,
        handling: 95,
        positioning: 97,
        overall: 97
    }

};


/* =========================================================
   GAME STATE
   ========================================================= */

const game = {

    mode: "penalty",

    level: 1,

    goals: 0,

    score: 0,

    shots: 0,

    combo: 0,

    playing: false,

    shooting: false,

    result: false,

    progress: 0,

    aimX: 0.5,

    aimY: 0.25,

    targetX: 0.5,

    targetY: 0.25,

    ballX: 0.5,

    ballY: 0.82,

    keeperX: 0.5,

    keeperY: 0.25,

    keeperStartX: 0.5,

    keeperTargetX: 0.5,

    wind: 0,

    distance: 12,

    wall: [],

    width: 900,

    height: 600

};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function $(id) {
    return document.getElementById(id);
}


function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


function lerp(a, b, t) {
    return a + (b - a) * t;
}


function distance(x1, y1, x2, y2) {

    const dx = x1 - x2;
    const dy = y1 - y2;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


/* =========================================================
   UPDATE PLAYER
   ========================================================= */

function updatePlayer() {

    const player =
        players[playerSelect.value];

    if (!player) return;

    $("playerName").textContent =
        player.name;

    $("playerAvatar").textContent =
        player.avatar;

    $("playerSpecial").textContent =
        player.special;

    $("playerNameBottom").textContent =
        player.name;

    $("bottomSpecial").textContent =
        player.special;

    $("shootingNumber").textContent =
        player.shooting;

    $("powerNumber").textContent =
        player.power;

    $("accuracyNumber").textContent =
        player.accuracy;

    $("speedNumber").textContent =
        player.speed;

    $("shootingStat").style.width =
        clamp(player.shooting, 0, 100) + "%";

    $("powerStat").style.width =
        clamp(player.power, 0, 100) + "%";

    $("accuracyStat").style.width =
        clamp(player.accuracy, 0, 100) + "%";

    $("speedStat").style.width =
        clamp(player.speed, 0, 100) + "%";

}


/* =========================================================
   UPDATE KEEPER
   ========================================================= */

function updateKeeper() {

    const keeper =
        goalkeepers[keeperSelect.value];

    if (!keeper) return;

    $("keeperName").textContent =
        keeper.name;

    $("keeperAvatar").textContent =
        keeper.avatar;

    $("keeperOverall").textContent =
        "OVERALL " + keeper.overall;

    $("keeperNameBottom").textContent =
        keeper.name;

    $("reflexNumber").textContent =
        keeper.reflexes;

    $("divingNumber").textContent =
        keeper.diving;

    $("handlingNumber").textContent =
        keeper.handling;

    $("positioningNumber").textContent =
        keeper.positioning;

    $("reflexStat").style.width =
        clamp(keeper.reflexes / 3, 0, 100) + "%";

    $("divingStat").style.width =
        clamp(keeper.diving / 3, 0, 100) + "%";

    $("handlingStat").style.width =
        clamp(keeper.handling / 3, 0, 100) + "%";

    $("positioningStat").style.width =
        clamp(keeper.positioning / 3, 0, 100) + "%";

}


/* =========================================================
   UPDATE HUD
   ========================================================= */

function updateHUD() {

    $("levelValue").textContent =
        game.level;

    $("goalsValue").textContent =
        game.goals;

    $("scoreValue").textContent =
        game.score;

    $("shotsValue").textContent =
        game.shots;

    $("comboDisplay").textContent =
        "x" + game.combo;

    $("startPlayer").textContent =
        players[playerSelect.value].name;

    $("startKeeper").textContent =
        goalkeepers[keeperSelect.value].name;

}


/* =========================================================
   MODE
   ========================================================= */

function setMode(mode) {

    game.mode = mode;

    document
        .querySelectorAll(".mode")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.mode === mode
            );

        });


    let title = "PENALTY SHOOTOUT";
    let description = "Aim at the goal and beat the goalkeeper.";
    let display = "PENALTY";
    let distanceValue = 12;

    if (mode === "freekick") {

        title = "FREE KICK";
        description = "Curve the ball around the wall and goalkeeper.";
        display = "FREE KICK";
        distanceValue = 22;

    }

    if (mode === "longshot") {

        title = "LONG SHOT";
        description = "Choose your target and unleash a powerful strike.";
        display = "LONG SHOT";
        distanceValue = 30;

    }

    if (mode === "goalkeeper") {

        title = "GOALKEEPER MODE";
        description = "Move your goalkeeper and make the save.";
        display = "GOALKEEPING";
        distanceValue = 11;

    }

    game.distance = distanceValue;

    $("controlTitle").textContent =
        title;

    $("controlDescription").textContent =
        description;

    $("modeDisplay").textContent =
        display;

    $("distanceDisplay").textContent =
        distanceValue + " YDS";

    $("startMode").textContent =
        display;

    makeWall();

}


/* =========================================================
   WALL
   ========================================================= */

function makeWall() {

    game.wall = [];

    if (game.mode !== "freekick") {
        return;
    }

    const count = 4;

    for (let i = 0; i < count; i++) {

        game.wall.push({

            x:
                0.39 +
                i * 0.073,

            y: 0.40

        });

    }

}


/* =========================================================
   START
   ========================================================= */

function startGame() {

    game.playing = true;
    game.shooting = false;
    game.result = false;

    game.progress = 0;

    game.aimX = 0.5;
    game.aimY = 0.25;

    game.targetX = 0.5;
    game.targetY = 0.25;

    game.ballX = 0.5;
    game.ballY = 0.82;

    game.keeperX = 0.5;
    game.keeperY = 0.25;

    game.keeperStartX = 0.5;
    game.keeperTargetX = 0.5;

    game.wind =
        Math.floor(
            Math.random() * 21
        ) - 10;

    $("windDisplay").textContent =
        game.wind + " km/h";

    startOverlay.classList.add("hidden");
    resultOverlay.classList.add("hidden");

    if (game.mode === "goalkeeper") {

        shootButton.classList.add("hidden");
        saveButton.classList.remove("hidden");

    } else {

        shootButton.classList.remove("hidden");
        saveButton.classList.add("hidden");

    }

}


/* =========================================================
   AIM WITH POINTER
   ========================================================= */

canvas.addEventListener(
    "pointermove",
    function(event) {

        if (
            !game.playing ||
            game.shooting ||
            game.mode === "goalkeeper"
        ) {
            return;
        }

        const rect =
            canvas.getBoundingClientRect();

        game.aimX =
            clamp(
                (event.clientX - rect.left) /
                rect.width,
                0.12,
                0.88
            );

        game.aimY =
            clamp(
                (event.clientY - rect.top) /
                rect.height,
                0.08,
                0.48
            );

    }
);


/* =========================================================
   SHOOT
   ========================================================= */

function shoot() {

    if (
        !game.playing ||
        game.shooting ||
        game.mode === "goalkeeper"
    ) {
        return;
    }

    const player =
        players[playerSelect.value];

    const difficulty =
        difficultySelect.value;

    let error = 0.015;

    if (difficulty === "easy") {
        error = 0.006;
    }

    if (difficulty === "hard") {
        error = 0.030;
    }

    if (difficulty === "legend") {
        error = 0.045;
    }

    error *=
        (100 - player.accuracy) / 100;

    let x =
        game.aimX +
        (Math.random() - 0.5) * error;

    let y =
        game.aimY +
        (Math.random() - 0.5) * error;


    /* Specialist bonuses */

    if (
        game.mode === "longshot" &&
        playerSelect.value === "haaland"
    ) {

        x =
            lerp(
                x,
                game.aimX,
                0.9
            );

    }


    if (
        game.mode === "freekick" &&
        playerSelect.value === "yamal"
    ) {

        x =
            lerp(
                x,
                game.aimX,
                0.94
            );

    }


    if (
        game.mode === "penalty" &&
        playerSelect.value === "bellingham"
    ) {

        x =
            lerp(
                x,
                game.aimX,
                0.94
            );

    }


    x += game.wind * 0.001;


    game.targetX =
        clamp(x, 0.10, 0.90);

    game.targetY =
        clamp(y, 0.07, 0.49);


    game.keeperStartX =
        game.keeperX;


    /*
     * The goalkeeper predicts the shot.
     */

    const keeper =
        goalkeepers[keeperSelect.value];

    let prediction =
        0.25 +
        keeper.positioning / 500;

    prediction =
        clamp(
            prediction,
            0.25,
            0.85
        );

    if (keeperSelect.value === "hassan") {
        prediction = 1;
    }

    game.keeperTargetX =
        lerp(
            0.5,
            game.targetX,
            prediction
        );


    game.progress = 0;

    game.shooting = true;

    game.shots++;

    updateHUD();

}


/* =========================================================
   KEEPER MOVEMENT
   ========================================================= */

function moveKeeper(t) {

    const keeper =
        goalkeepers[keeperSelect.value];

    if (!keeper) return;


    /*
     * Reflexes determine how quickly the dive starts.
     */

    let reaction =
        0.34 -
        keeper.reflexes / 1000;

    reaction =
        clamp(
            reaction,
            0.05,
            0.30
        );


    if (t < reaction) {

        game.keeperX =
            game.keeperStartX;

        game.keeperY =
            0.25;

        return;

    }


    let dive =
        (t - reaction) /
        (1 - reaction);

    dive =
        clamp(
            dive,
            0,
            1
        );


    let reach =
        0.55 +
        keeper.diving / 250;

    reach =
        clamp(
            reach,
            0.55,
            1
        );


    if (keeperSelect.value === "hassan") {
        reach = 1;
    }


    dive *= reach;


    game.keeperX =
        lerp(
            game.keeperStartX,
            game.keeperTargetX,
            dive
        );


    const targetY =
        clamp(
            game.targetY,
            0.13,
            0.42
        );


    game.keeperY =
        lerp(
            0.25,
            targetY,
            dive * 0.7
        );

}


/* =========================================================
   WALL COLLISION
   ========================================================= */

function wallHit() {

    if (
        game.mode !== "freekick" ||
        game.progress < 0.28 ||
        game.progress > 0.72
    ) {
        return false;
    }

    for (const person of game.wall) {

        if (
            distance(
                game.ballX,
                game.ballY,
                person.x,
                person.y
            ) < 0.045
        ) {
            return true;
        }

    }

    return false;

}


/* =========================================================
   KEEPER COLLISION
   ========================================================= */

function keeperHit() {

    const keeper =
        goalkeepers[keeperSelect.value];

    if (!keeper) {
        return false;
    }


    const dx =
        Math.abs(
            game.targetX -
            game.keeperX
        );

    const dy =
        Math.abs(
            game.targetY -
            game.keeperY
        );


    /*
     * THIS IS THE IMPORTANT FIX.
     *
     * We compare the ball target with the goalkeeper's
     * ACTUAL CURRENT position.
     */

    let horizontal =
        0.075 +
        keeper.diving / 1200 +
        keeper.reflexes / 1800;

    let vertical =
        0.075 +
        keeper.diving / 1700 +
        keeper.reflexes / 2200;


    if (keeperSelect.value === "hassan") {

        horizontal = 0.30;
        vertical = 0.25;

    }


    horizontal =
        clamp(
            horizontal,
            0.08,
            0.30
        );

    vertical =
        clamp(
            vertical,
            0.08,
            0.25
        );


    return (
        dx <= horizontal &&
        dy <= vertical
    );

}


/* =========================================================
   RESOLVE SHOOT
   ========================================================= */

function resolveShot() {

    game.shooting = false;

    /*
     * Final keeper position.
     */

    moveKeeper(1);


    const insideGoal =
        game.targetX >= 0.10 &&
        game.targetX <= 0.90 &&
        game.targetY >= 0.07 &&
        game.targetY <= 0.49;


    const blocked =
        wallHit();


    const saved =
        keeperHit();


    if (
        insideGoal &&
        !blocked &&
        !saved
    ) {

        const power =
            Number(powerSlider.value);

        const points =
            100 +
            power +
            game.level * 15 +
            game.combo * 20;

        game.goals++;

        game.combo++;

        game.score += points;

        showResult(
            "GOAL!",
            "⚽",
            "What a finish!",
            points
        );

    } else {

        game.combo = 0;

        if (blocked) {

            showResult(
                "BLOCKED!",
                "🧱",
                "The wall stopped the shot.",
                0
            );

        } else {

            showResult(
                "SAVED!",
                "🧤",
                "The goalkeeper reached the ball!",
                0
            );

        }

    }

    game.level =
        Math.floor(game.goals / 3) + 1;

    updateHUD();

}


/* =========================================================
   GOALKEEPER MODE
   ========================================================= */

function startKeeperChallenge() {

    if (
        !game.playing ||
        game.shooting
    ) {
        return;
    }

    game.targetX =
        0.16 +
        Math.random() * 0.68;

    game.targetY =
        0.12 +
        Math.random() * 0.30;

    game.ballX = 0.5;
    game.ballY = 0.82;

    game.keeperStartX =
        game.keeperX;

    game.keeperTargetX =
        game.targetX;

    game.progress = 0;

    game.shooting = true;

    game.shots++;

    updateHUD();

}


/* =========================================================
   RESOLVE GOALKEEPER MODE
   ========================================================= */

function resolveKeeperChallenge() {

    game.shooting = false;

    moveKeeper(1);

    const keeper =
        goalkeepers[keeperSelect.value];


    let horizontal =
        0.08 +
        keeper.diving / 1200;

    let vertical =
        0.08 +
        keeper.reflexes / 1800;


    if (keeperSelect.value === "hassan") {

        horizontal = 0.30;
        vertical = 0.25;

    }


    const dx =
        Math.abs(
            game.keeperX -
            game.targetX
        );

    const dy =
        Math.abs(
            game.keeperY -
            game.targetY
        );


    if (
        dx <= horizontal &&
        dy <= vertical
    ) {

        game.combo++;

        const points =
            150 +
            game.combo * 30;

        game.score += points;

        showResult(
            "GREAT SAVE!",
            "🧤",
            "You reached the shot!",
            points
        );

    } else {

        game.combo = 0;

        showResult(
            "GOAL!",
            "⚽",
            "The striker found the corner.",
            0
        );

    }

    updateHUD();

}


/* =========================================================
   RESULT
   ========================================================= */

function showResult(
    title,
    icon,
    message,
    points
) {

    game.result = true;

    $("resultTitle").textContent =
        title;

    $("resultIcon").textContent =
        icon;

    $("resultMessage").textContent =
        message;

    $("resultScore").textContent =
        points;

    $("resultCombo").textContent =
        "x" + game.combo;

    resultOverlay.classList.remove("hidden");

}


/* =========================================================
   NEXT
   ========================================================= */

function nextShot() {

    resultOverlay.classList.add("hidden");

    game.result = false;

    game.shooting = false;

    game.progress = 0;

    game.ballX = 0.5;
    game.ballY = 0.82;

    game.keeperX = 0.5;
    game.keeperY = 0.25;

}


/* =========================================================
   RESTART
   ========================================================= */

function restartGame() {

    game.level = 1;
    game.goals = 0;
    game.score = 0;
    game.shots = 0;
    game.combo = 0;

    game.playing = false;
    game.shooting = false;
    game.result = false;

    game.progress = 0;

    game.ballX = 0.5;
    game.ballY = 0.82;

    game.keeperX = 0.5;
    game.keeperY = 0.25;

    resultOverlay.classList.add("hidden");

    startOverlay.classList.remove("hidden");

    updateHUD();

}


/* =========================================================
   UPDATE GAME
   ========================================================= */

function update() {

    if (!game.shooting) {
        return;
    }


    /*
     * Different speed depending on power.
     */

    let speed =
        0.014 +
        Number(powerSlider.value) / 10000;


    if (game.mode === "goalkeeper") {
        speed = 0.018;
    }


    game.progress += speed;


    game.progress =
        clamp(
            game.progress,
            0,
            1
        );


    const t =
        game.progress;


    const smooth =
        t * t * (3 - 2 * t);


    game.ballX =
        lerp(
            0.5,
            game.targetX,
            smooth
        );


    game.ballY =
        lerp(
            0.82,
            game.targetY,
            smooth
        );


    moveKeeper(t);


    if (game.progress >= 1) {

        if (
            game.mode === "goalkeeper"
        ) {

            resolveKeeperChallenge();

        } else {

            resolveShot();

        }

    }

}


/* =========================================================
   RESIZE
   ========================================================= */

function resize() {

    const rect =
        canvas.getBoundingClientRect();

    const width =
        Math.max(
            300,
            rect.width
        );

    const height =
        Math.max(
            400,
            rect.height
        );


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    game.width = width;
    game.height = height;

}


window.addEventListener(
    "resize",
    resize
);


/* =========================================================
   DRAW SKY
   ========================================================= */

function drawSky() {

    const w = game.width;
    const h = game.height;

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            h
        );

    gradient.addColorStop(
        0,
        "#071c36"
    );

    gradient.addColorStop(
        0.4,
        "#08743d"
    );

    gradient.addColorStop(
        1,
        "#045029"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        w,
        h
    );

}


/* =========================================================
   DRAW PITCH
   ========================================================= */

function drawPitch() {

    const w = game.width;
    const h = game.height;

    ctx.fillStyle =
        "#08783a";

    ctx.fillRect(
        0,
        h * 0.20,
        w,
        h * 0.80
    );


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        if (i % 2 === 0) {

            ctx.fillStyle =
                "rgba(255,255,255,0.035)";

            ctx.fillRect(
                0,
                h * 0.20 +
                i * h * 0.10,
                w,
                h * 0.10
            );

        }

    }

}


/* =========================================================
   DRAW PITCH LINES
   ========================================================= */

function drawLines() {

    const w = game.width;
    const h = game.height;

    ctx.strokeStyle =
        "rgba(255,255,255,0.65)";

    ctx.lineWidth = 3;


    ctx.strokeRect(
        w * 0.20,
        h * 0.20,
        w * 0.60,
        h * 0.35
    );


    ctx.strokeRect(
        w * 0.32,
        h * 0.20,
        w * 0.36,
        h * 0.18
    );


    ctx.beginPath();

    ctx.arc(
        w * 0.5,
        h * 0.55,
        w * 0.12,
        Math.PI,
        0
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        0,
        h * 0.70
    );

    ctx.lineTo(
        w,
        h * 0.70
    );

    ctx.stroke();

}


/* =========================================================
   DRAW GOAL
   ========================================================= */

function drawGoal() {

    const w = game.width;
    const h = game.height;

    const x = w * 0.10;
    const y = h * 0.05;
    const width = w * 0.80;
    const height = h * 0.18;


    ctx.fillStyle =
        "rgba(255,255,255,0.13)";

    ctx.fillRect(
        x,
        y,
        width,
        height
    );


    ctx.strokeStyle =
        "rgba(255,255,255,0.25)";

    ctx.lineWidth = 1;


    for (
        let i = 0;
        i <= 16;
        i++
    ) {

        const gx =
            x +
            width * i / 16;

        ctx.beginPath();

        ctx.moveTo(
            gx,
            y
        );

        ctx.lineTo(
            gx,
            y + height
        );

        ctx.stroke();

    }


    for (
        let i = 0;
        i <= 6;
        i++
    ) {

        const gy =
            y +
            height * i / 6;

        ctx.beginPath();

        ctx.moveTo(
            x,
            gy
        );

        ctx.lineTo(
            x + width,
            gy
        );

        ctx.stroke();

    }


    ctx.strokeStyle =
        "#ffffff";

    ctx.lineWidth = 7;

    ctx.strokeRect(
        x,
        y,
        width,
        height
    );

}


/* =========================================================
   DRAW WALL
   ========================================================= */

function drawWall() {

    if (game.mode !== "freekick") {
        return;
    }

    const w = game.width;
    const h = game.height;


    for (const p of game.wall) {

        const x =
            w * p.x;

        const y =
            h * p.y;


        ctx.fillStyle =
            "#26394e";

        ctx.fillRect(
            x - 12,
            y - 25,
            24,
            48
        );


        ctx.fillStyle =
            "#d39a72";

        ctx.beginPath();

        ctx.arc(
            x,
            y - 37,
            9,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.strokeStyle =
            "#111b2a";

        ctx.lineWidth = 7;

        ctx.beginPath();

        ctx.moveTo(
            x - 5,
            y + 22
        );

        ctx.lineTo(
            x - 9,
            y + 42
        );

        ctx.moveTo(
            x + 5,
            y + 22
        );

        ctx.lineTo(
            x + 9,
            y + 42
        );

        ctx.stroke();

    }

}


/* =========================================================
   DRAW KEEPER
   ========================================================= */

function drawKeeper() {

    const w = game.width;
    const h = game.height;

    const x =
        w * game.keeperX;

    const y =
        h * game.keeperY;


    ctx.save();

    ctx.translate(
        x,
        y
    );


    const tilt =
        (game.keeperX - 0.5) *
        1.2;

    ctx.rotate(tilt);


    /* shadow */

    ctx.fillStyle =
        "rgba(0,0,0,0.25)";

    ctx.beginPath();

    ctx.ellipse(
        0,
        65,
        38,
        10,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* body */

    ctx.fillStyle =
        "#ff9418";

    ctx.fillRect(
        -22,
        -10,
        44,
        58
    );


    /* head */

    ctx.fillStyle =
        "#d49a73";

    ctx.beginPath();

    ctx.arc(
        0,
        -31,
        15,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* hair */

    ctx.fillStyle =
        "#222222";

    ctx.beginPath();

    ctx.arc(
        0,
        -37,
        14,
        Math.PI,
        Math.PI * 2
    );

    ctx.fill();


    /* arms */

    ctx.strokeStyle =
        "#ffb14d";

    ctx.lineWidth = 12;

    ctx.lineCap = "round";

    ctx.beginPath();

    ctx.moveTo(
        -17,
        0
    );

    ctx.lineTo(
        -42,
        17
    );

    ctx.moveTo(
        17,
        0
    );

    ctx.lineTo(
        42,
        17
    );

    ctx.stroke();


    /* gloves */

    ctx.fillStyle =
        "#ffffff";

    ctx.beginPath();

    ctx.arc(
        -43,
        18,
        8,
        0,
        Math.PI * 2
    );

    ctx.arc(
        43,
        18,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* legs */

    ctx.strokeStyle =
        "#202c40";

    ctx.lineWidth = 11;

    ctx.beginPath();

    ctx.moveTo(
        -8,
        45
    );

    ctx.lineTo(
        -14,
        70
    );

    ctx.moveTo(
        8,
        45
    );

    ctx.lineTo(
        14,
        70
    );

    ctx.stroke();


    ctx.restore();

}


/* =========================================================
   DRAW BALL
   ========================================================= */

function drawBall() {

    const w = game.width;
    const h = game.height;

    const x =
        w * game.ballX;

    const y =
        h * game.ballY;


    ctx.fillStyle =
        "rgba(0,0,0,0.25)";

    ctx.beginPath();

    ctx.ellipse(
        x,
        y + 10,
        14,
        5,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle =
        "#ffffff";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        11,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.strokeStyle =
        "#111111";

    ctx.lineWidth = 1.5;

    ctx.stroke();


    ctx.fillStyle =
        "#111111";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* =========================================================
   DRAW AIM
   ========================================================= */

function drawAim() {

    if (
        !game.playing ||
        game.shooting ||
        game.mode === "goalkeeper"
    ) {
        return;
    }

    const w = game.width;
    const h = game.height;

    const x =
        w * game.aimX;

    const y =
        h * game.aimY;


    ctx.strokeStyle =
        "rgba(255,255,255,0.9)";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        18,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        x - 28,
        y
    );

    ctx.lineTo(
        x + 28,
        y
    );

    ctx.moveTo(
        x,
        y - 28
    );

    ctx.lineTo(
        x,
        y + 28
    );

    ctx.stroke();

}


/* =========================================================
   DRAW TARGET
   ========================================================= */

function drawTarget() {

    if (
        game.mode !== "goalkeeper" ||
        !game.shooting
    ) {
        return;
    }

    const x =
        game.width *
        game.targetX;

    const y =
        game.height *
        game.targetY;


    ctx.strokeStyle =
        "rgba(255,80,80,0.8)";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        16,
        0,
        Math.PI * 2
    );

    ctx.stroke();

}


/* =========================================================
   DRAW EVERYTHING
   ========================================================= */

function draw() {

    if (
        !game.width ||
        !game.height
    ) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        game.width,
        game.height
    );

    drawSky();
    drawPitch();
    drawLines();
    drawGoal();
    drawWall();
    drawKeeper();
    drawBall();
    drawAim();
    drawTarget();

}


/* =========================================================
   GAME LOOP
   ========================================================= */

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================================
   EVENTS
   ========================================================= */

document
    .querySelectorAll(".mode")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                setMode(
                    this.dataset.mode
                );

                game.playing = false;
                game.shooting = false;

                resultOverlay.classList.add("hidden");
                startOverlay.classList.remove("hidden");

                if (
                    game.mode === "goalkeeper"
                ) {

                    shootButton.classList.add("hidden");
                    saveButton.classList.remove("hidden");

                } else {

                    shootButton.classList.remove("hidden");
                    saveButton.classList.add("hidden");

                }

            }
        );

    });


playerSelect.addEventListener(
    "change",
    updatePlayer
);


keeperSelect.addEventListener(
    "change",
    updateKeeper
);


powerSlider.addEventListener(
    "input",
    function() {

        $("powerValue").textContent =
            this.value + "%";

    }
);


startButton.addEventListener(
    "click",
    startGame
);


nextButton.addEventListener(
    "click",
    nextShot
);


shootButton.addEventListener(
    "click",
    shoot
);


saveButton.addEventListener(
    "click",
    startKeeperChallenge
);


restartButton.addEventListener(
    "click",
    restartGame
);


/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            game.mode === "goalkeeper" &&
            event.code === "Space"
        ) {

            event.preventDefault();

            startKeeperChallenge();

            return;

        }


        if (
            !game.playing ||
            game.shooting ||
            game.mode === "goalkeeper"
        ) {
            return;
        }


        const amount = 0.025;


        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            game.aimX -= amount;

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            game.aimX += amount;

        }


        if (
            event.key === "ArrowUp" ||
            event.key.toLowerCase() === "w"
        ) {

            game.aimY -= amount;

        }


        if (
            event.key === "ArrowDown" ||
            event.key.toLowerCase() === "s"
        ) {

            game.aimY += amount;

        }


        if (event.code === "Space") {

            event.preventDefault();

            shoot();

        }


        game.aimX =
            clamp(
                game.aimX,
                0.12,
                0.88
            );

        game.aimY =
            clamp(
                game.aimY,
                0.08,
                0.48
            );

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function initialize() {

    updatePlayer();

    updateKeeper();

    updateHUD();

    setMode("penalty");

    resize();

    $("powerValue").textContent =
        powerSlider.value + "%";

    gameLoop();

}


/* START THE GAME */

initialize();
