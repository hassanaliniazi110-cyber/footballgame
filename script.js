"use strict";

/* =========================================================
   FOOTBALL HERO X
   MAIN GAME ENGINE
   ========================================================= */


/* =========================================================
   PLAYER DATABASE
   ========================================================= */

const players = {

    hassan: {
        name: "Hassan Ali",
        finishing: 99,
        power: 99,
        curve: 99,
        accuracy: 99,
        speed: 99,
        dribbling: 99,
        overall: 99,
        specialty: "Elite All-Rounder"
    },

    ehan: {
        name: "Ehan Ali",
        finishing: 94,
        power: 92,
        curve: 91,
        accuracy: 94,
        speed: 95,
        dribbling: 94,
        overall: 94,
        specialty: "Fast Attacker"
    },

    arham: {
        name: "Muhammad Arham",
        finishing: 90,
        power: 91,
        curve: 88,
        accuracy: 89,
        speed: 90,
        dribbling: 91,
        overall: 90,
        specialty: "Technical Player"
    },

    umar: {
        name: "Umar Shoaib",
        finishing: 89,
        power: 90,
        curve: 87,
        accuracy: 91,
        speed: 92,
        dribbling: 90,
        overall: 90,
        specialty: "Quick Attacker"
    },

    ronaldo: {
        name: "Cristiano Ronaldo",
        finishing: 98,
        power: 97,
        curve: 94,
        accuracy: 96,
        speed: 92,
        dribbling: 93,
        overall: 96,
        specialty: "Power Finisher"
    },

    haaland: {
        name: "Erling Haaland",
        finishing: 99,
        power: 100,
        curve: 84,
        accuracy: 91,
        speed: 90,
        dribbling: 85,
        overall: 95,
        specialty: "Long-Shot Specialist"
    },

    bellingham: {
        name: "Jude Bellingham",
        finishing: 94,
        power: 91,
        curve: 92,
        accuracy: 98,
        speed: 93,
        dribbling: 96,
        overall: 95,
        specialty: "Penalty Specialist"
    },

    yamal: {
        name: "Lamine Yamal",
        finishing: 91,
        power: 86,
        curve: 100,
        accuracy: 99,
        speed: 94,
        dribbling: 99,
        overall: 96,
        specialty: "Free-Kick Specialist"
    },

    messi: {
        name: "Lionel Messi",
        finishing: 97,
        power: 88,
        curve: 99,
        accuracy: 99,
        speed: 91,
        dribbling: 99,
        overall: 97,
        specialty: "Technical Master"
    },

    mbappe: {
        name: "Kylian Mbappé",
        finishing: 96,
        power: 93,
        curve: 90,
        accuracy: 94,
        speed: 100,
        dribbling: 97,
        overall: 96,
        specialty: "Speed Master"
    },

    zayd: {
        name: "Zayd Quadri",
        finishing: 92,
        power: 88,
        curve: 90,
        accuracy: 91,
        speed: 96,
        dribbling: 100,
        overall: 95,
        specialty: "Elite Dribbler"
    }
};


/* =========================================================
   GOALKEEPER DATABASE
   ========================================================= */

const goalkeepers = {

    hassan: {
        name: "Hassan Ali",
        reflexes: 300,
        diving: 300,
        handling: 300,
        positioning: 300,
        overall: 300
    },

    ehan: {
        name: "Ehan Ali",
        reflexes: 95,
        diving: 94,
        handling: 92,
        positioning: 93,
        overall: 94
    },

    courtois: {
        name: "Thibaut Courtois",
        reflexes: 96,
        diving: 95,
        handling: 94,
        positioning: 96,
        overall: 96
    },

    donnarumma: {
        name: "Gianluigi Donnarumma",
        reflexes: 95,
        diving: 96,
        handling: 94,
        positioning: 93,
        overall: 95
    },

    alisson: {
        name: "Alisson",
        reflexes: 94,
        diving: 94,
        handling: 96,
        positioning: 95,
        overall: 95
    },

    neuer: {
        name: "Manuel Neuer",
        reflexes: 91,
        diving: 90,
        handling: 93,
        positioning: 96,
        overall: 93
    },

    oblak: {
        name: "Jan Oblak",
        reflexes: 95,
        diving: 94,
        handling: 95,
        positioning: 96,
        overall: 95
    },

    martinez: {
        name: "Emiliano Martínez",
        reflexes: 94,
        diving: 92,
        handling: 93,
        positioning: 95,
        overall: 94
    },

    ederson: {
        name: "Ederson",
        reflexes: 91,
        diving: 90,
        handling: 94,
        positioning: 94,
        overall: 92
    },

    maignan: {
        name: "Mike Maignan",
        reflexes: 96,
        diving: 95,
        handling: 94,
        positioning: 94,
        overall: 95
    },

    raya: {
        name: "David Raya",
        reflexes: 92,
        diving: 91,
        handling: 94,
        positioning: 93,
        overall: 92
    },

    szczesny: {
        name: "Wojciech Szczęsny",
        reflexes: 93,
        diving: 91,
        handling: 94,
        positioning: 94,
        overall: 93
    },

    casillas: {
        name: "Iker Casillas",
        reflexes: 97,
        diving: 96,
        handling: 95,
        positioning: 97,
        overall: 97
    }
};


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerSelect = document.getElementById("playerSelect");
const keeperSelect = document.getElementById("keeperSelect");
const difficultySelect = document.getElementById("difficultySelect");
const powerSlider = document.getElementById("powerSlider");

const levelValue = document.getElementById("levelValue");
const goalsValue = document.getElementById("goalsValue");
const scoreValue = document.getElementById("scoreValue");
const shotsValue = document.getElementById("shotsValue");

const powerValue = document.getElementById("powerValue");

const playerCard = document.getElementById("playerCard");
const keeperCard = document.getElementById("keeperCard");

const finishingStat = document.getElementById("finishingStat");
const powerStat = document.getElementById("powerStat");
const curveStat = document.getElementById("curveStat");
const accuracyStat = document.getElementById("accuracyStat");
const speedStat = document.getElementById("speedStat");
const dribblingStat = document.getElementById("dribblingStat");
const overallStat = document.getElementById("overallStat");

const reflexStat = document.getElementById("reflexStat");
const divingStat = document.getElementById("divingStat");
const handlingStat = document.getElementById("handlingStat");
const positioningStat = document.getElementById("positioningStat");
const keeperOverallStat = document.getElementById("keeperOverallStat");

const modeTitle = document.getElementById("modeTitle");
const gameMessage = document.getElementById("gameMessage");

const targetInfo = document.getElementById("targetInfo");
const distanceInfo = document.getElementById("distanceInfo");

const bottomPlayer = document.getElementById("bottomPlayer");
const bottomKeeper = document.getElementById("bottomKeeper");
const specialInfo = document.getElementById("specialInfo");

const shootBtn = document.getElementById("shootBtn");
const saveBtn = document.getElementById("saveBtn");
const restartBtn = document.getElementById("restartBtn");

const startOverlay = document.getElementById("startOverlay");
const resultOverlay = document.getElementById("resultOverlay");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const startDescription = document.getElementById("startDescription");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const resultPoints = document.getElementById("resultPoints");


/* =========================================================
   GAME STATE
   ========================================================= */

const game = {

    mode: "penalty",

    level: 1,

    goals: 0,

    score: 0,

    shots: 0,

    power: 75,

    started: false,

    shooting: false,

    shotProgress: 0,

    ballX: 500,

    ballY: 555,

    ballStartX: 500,

    ballStartY: 555,

    ballRadius: 12,

    targetX: 500,

    targetY: 150,

    shotTargetX: 500,

    shotTargetY: 150,

    keeperX: 500,

    keeperY: 145,

    keeperTargetX: 500,

    keeperTargetY: 145,

    keeperMoving: false,

    keeperSaveAttempt: false,

    keeperChallengeActive: false,

    keeperChallengeTimer: 0,

    saved: false,

    goal: false,

    wallBlocked: false,

    resultShown: false,

    lastTimestamp: 0,

    distance: 11,

    messageTimer: 0,

    mouseX: 500,

    mouseY: 150,

    targetSelected: false
};


/* =========================================================
   GAME CONFIGURATION
   ========================================================= */

const modes = {

    penalty: {
        title: "PENALTY",
        distance: 11,
        description: "Choose a corner and beat the goalkeeper!"
    },

    freekick: {
        title: "FREE KICK",
        distance: 24,
        description: "Bend the ball around the defensive wall!"
    },

    longshot: {
        title: "LONG SHOT",
        distance: 30,
        description: "Pick your target and unleash a long shot!"
    },

    goalkeeping: {
        title: "GOALKEEPING",
        distance: 18,
        description: "Move the goalkeeper and stop the shot!"
    }
};


const difficulties = {

    easy: {
        keeperSpeed: 0.55,
        keeperBonus: 0.65,
        accuracyPenalty: 0,
        scoreMultiplier: 1
    },

    normal: {
        keeperSpeed: 0.72,
        keeperBonus: 0.82,
        accuracyPenalty: 0.04,
        scoreMultiplier: 1.25
    },

    hard: {
        keeperSpeed: 0.90,
        keeperBonus: 1,
        accuracyPenalty: 0.08,
        scoreMultiplier: 1.5
    },

    legend: {
        keeperSpeed: 1.08,
        keeperBonus: 1.15,
        accuracyPenalty: 0.12,
        scoreMultiplier: 2
    }
};


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


function lerp(a, b, amount) {
    return a + (b - a) * amount;
}


function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(dx * dx + dy * dy);
}


function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}


function getPlayer() {
    return players[playerSelect.value] || players.hassan;
}


function getKeeper() {
    return goalkeepers[keeperSelect.value] || goalkeepers.hassan;
}


function getDifficulty() {
    return difficulties[difficultySelect.value] || difficulties.normal;
}


function getMode() {
    return modes[game.mode] || modes.penalty;
}


/* =========================================================
   UI UPDATES
   ========================================================= */

function updateTopStats() {

    levelValue.textContent = game.level;
    goalsValue.textContent = game.goals;
    scoreValue.textContent = game.score;
    shotsValue.textContent = game.shots;
}


function updatePlayerStats() {

    const player = getPlayer();

    finishingStat.textContent = player.finishing;
    powerStat.textContent = player.power;
    curveStat.textContent = player.curve;
    accuracyStat.textContent = player.accuracy;
    speedStat.textContent = player.speed;
    dribblingStat.textContent = player.dribbling;
    overallStat.textContent = player.overall;

    playerCard.innerHTML = `
        <div class="mini-card-name">${player.name}</div>
        <div class="mini-card-rating">${player.overall}</div>
        <div class="mini-card-special">${player.specialty}</div>
    `;

    bottomPlayer.textContent = player.name;
    specialInfo.textContent = player.specialty;
}


function updateKeeperStats() {

    const keeper = getKeeper();

    reflexStat.textContent = keeper.reflexes;
    divingStat.textContent = keeper.diving;
    handlingStat.textContent = keeper.handling;
    positioningStat.textContent = keeper.positioning;
    keeperOverallStat.textContent = keeper.overall;

    keeperCard.innerHTML = `
        <div class="mini-card-name">${keeper.name}</div>
        <div class="mini-card-rating">${keeper.overall}</div>
        <div class="mini-card-special">Goalkeeper</div>
    `;

    bottomKeeper.textContent = keeper.name;
}


function updatePower() {

    game.power = Number(powerSlider.value);

    powerValue.textContent = `${game.power}%`;
}


function updateModeUI() {

    const mode = getMode();

    modeTitle.textContent = mode.title;

    distanceInfo.textContent = `${mode.distance} m`;

    startDescription.textContent = mode.description;

    if (game.mode === "goalkeeping") {

        shootBtn.classList.add("hidden");
        saveBtn.classList.remove("hidden");

        gameMessage.textContent =
            "Move your goalkeeper and press SAVE!";

    } else {

        shootBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");

        gameMessage.textContent =
            "Click the pitch to choose your target!";
    }
}


function updateAllUI() {

    updateTopStats();
    updatePlayerStats();
    updateKeeperStats();
    updatePower();
    updateModeUI();
}


/* =========================================================
   MODE SWITCHING
   ========================================================= */

function setMode(mode) {

    if (!modes[mode]) {
        return;
    }

    game.mode = mode;

    resetShot();

    document.querySelectorAll(".mode-btn").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.mode === mode
        );
    });

    updateModeUI();
    updateAllUI();

    if (game.started) {

        if (mode === "goalkeeping") {
            startKeeperChallenge();
        } else {
            prepareAttackingShot();
        }
    }
}


/* =========================================================
   SHOT PREPARATION
   ========================================================= */

function resetShot() {

    game.shooting = false;

    game.shotProgress = 0;

    game.saved = false;

    game.goal = false;

    game.wallBlocked = false;

    game.resultShown = false;

    game.keeperMoving = false;

    game.keeperSaveAttempt = false;

    game.keeperChallengeActive = false;

    game.ballX = 500;

    game.ballY = 555;

    game.ballStartX = 500;

    game.ballStartY = 555;

    game.targetX = 500;

    game.targetY = 150;

    game.shotTargetX = 500;

    game.shotTargetY = 150;

    game.keeperX = 500;

    game.keeperY = 145;

    game.keeperTargetX = 500;

    game.keeperTargetY = 145;

    targetInfo.textContent = "CENTER";
}


function prepareAttackingShot() {

    resetShot();

    const mode = getMode();

    if (game.mode === "penalty") {

        game.distance = 11;

        game.targetX = 500;

        game.targetY = 140;

    } else if (game.mode === "freekick") {

        game.distance = 24;

        game.targetX = 500;

        game.targetY = 135;

    } else if (game.mode === "longshot") {

        game.distance = 30;

        game.targetX = 500;

        game.targetY = 125;
    }

    distanceInfo.textContent = `${mode.distance} m`;

    gameMessage.textContent =
        "Click the pitch to choose where to shoot.";
}


/* =========================================================
   GOALKEEPER CHALLENGE
   ========================================================= */

function startKeeperChallenge() {

    resetShot();

    game.keeperChallengeActive = true;

    game.keeperChallengeTimer = 0;

    game.ballX = 500;

    game.ballY = 555;

    game.targetX = randomBetween(390, 610);

    game.targetY = randomBetween(95, 205);

    game.shotTargetX = game.targetX;

    game.shotTargetY = game.targetY;

    game.keeperTargetX = 500;

    game.keeperTargetY = 145;

    targetInfo.textContent = "KEEPER POV";

    gameMessage.textContent =
        "Move the goalkeeper and press SAVE!";
}


/* =========================================================
   TARGET SELECTION
   ========================================================= */

function setTargetFromCanvas(x, y) {

    if (!game.started || game.shooting) {
        return;
    }

    if (game.mode === "goalkeeping") {
        return;
    }

    const goalLeft = 330;
    const goalRight = 670;

    const goalTop = 75;
    const goalBottom = 210;

    game.targetX = clamp(x, goalLeft, goalRight);
    game.targetY = clamp(y, goalTop, goalBottom);

    game.shotTargetX = game.targetX;
    game.shotTargetY = game.targetY;

    game.targetSelected = true;

    updateTargetLabel();
}


function updateTargetLabel() {

    const x = game.targetX;
    const y = game.targetY;

    let horizontal = "CENTER";

    if (x < 430) {
        horizontal = "LEFT";
    } else if (x > 570) {
        horizontal = "RIGHT";
    }

    let vertical = "CENTER";

    if (y < 115) {
        vertical = "TOP";
    } else if (y > 175) {
        vertical = "LOW";
    }

    targetInfo.textContent = `${vertical} ${horizontal}`;
}


/* =========================================================
   SHOOTING
   ========================================================= */

function shoot() {

    if (!game.started) {
        return;
    }

    if (game.shooting) {
        return;
    }

    if (game.mode === "goalkeeping") {
        return;
    }

    if (game.resultShown) {
        return;
    }

    game.shots++;

    game.shooting = true;

    game.shotProgress = 0;

    game.saved = false;

    game.goal = false;

    game.wallBlocked = false;

    game.shotTargetX = game.targetX;
    game.shotTargetY = game.targetY;

    game.ballStartX = 500;
    game.ballStartY = 555;

    game.ballX = 500;
    game.ballY = 555;

    game.keeperTargetX = chooseKeeperTarget();

    game.keeperMoving = true;

    gameMessage.textContent = "SHOT TAKEN!";

    updateTopStats();
}


function chooseKeeperTarget() {

    const keeper = getKeeper();

    const difficulty = getDifficulty();

    const targetX = game.shotTargetX;

    const targetY = game.shotTargetY;

    const anticipation =
        keeper.positioning / 100 *
        difficulty.keeperBonus;

    const randomFactor =
        randomBetween(-55, 55) *
        (1 - Math.min(anticipation, 1));

    const prediction =
        targetX + randomFactor;

    const keeperReaction =
        keeper.reflexes / 100;

    const reactionOffset =
        randomBetween(-35, 35) *
        (1 - keeperReaction * 0.55);

    return clamp(
        prediction + reactionOffset,
        340,
        660
    );
}


/* =========================================================
   FREE-KICK WALL
   ========================================================= */

function isWallBlockingAt(progress) {

    if (game.mode !== "freekick") {
        return false;
    }

    if (progress < 0.30 || progress > 0.72) {
        return false;
    }

    const wallX = 500;
    const wallY = 300;

    const ballX = lerp(
        game.ballStartX,
        game.shotTargetX,
        progress
    );

    const ballY = lerp(
        game.ballStartY,
        game.shotTargetY,
        progress
    );

    const player = getPlayer();

    const wallAvoidance =
        35 +
        player.curve * 0.15;

    return (
        Math.abs(ballX - wallX) < wallAvoidance &&
        Math.abs(ballY - wallY) < 50
    );
}


/* =========================================================
   GOALKEEPER COLLISION
   ========================================================= */

function keeperHit() {

    const keeper = getKeeper();

    const player = getPlayer();

    const difficulty = getDifficulty();

    const targetX = game.shotTargetX;
    const targetY = game.shotTargetY;

    const keeperFinalX = game.keeperTargetX;

    const keeperFinalY = 145;

    const keeperDistance = distance(
        targetX,
        targetY,
        keeperFinalX,
        keeperFinalY
    );

    let saveRadius =
        45 +
        keeper.reflexes * 0.12 +
        keeper.diving * 0.08;

    saveRadius *= difficulty.keeperBonus;

    /*
       Hassan Ali has the requested 300 stats
       and therefore gets an extremely large
       effective save area.
    */

    if (keeperSelect.value === "hassan") {
        saveRadius = 155;
    }

    /*
       Very accurate shots are slightly harder
       for the goalkeeper.
    */

    const accuracyBonus =
        player.accuracy * 0.12;

    saveRadius -= accuracyBonus;

    saveRadius = Math.max(35, saveRadius);

    if (keeperDistance <= saveRadius) {
        return true;
    }

    /*
       Elite reaction chance when the keeper
       is close to the ball.
    */

    const closeness =
        1 - clamp(
            keeperDistance / 250,
            0,
            1
        );

    const reactionChance =
        (keeper.reflexes / 100) *
        closeness *
        0.38;

    return Math.random() < reactionChance;
}


/* =========================================================
   SHOT RESOLUTION
   ========================================================= */

function resolveShot() {

    if (!game.shooting) {
        return;
    }

    game.shotProgress = 1;

    game.ballX = game.shotTargetX;
    game.ballY = game.shotTargetY;

    game.shooting = false;

    /*
       Check the wall using the shot trajectory,
       not the final progress value.
    */

    if (game.mode === "freekick") {

        const wallCheckSteps = 30;

        for (let i = 0; i <= wallCheckSteps; i++) {

            const progress =
                i / wallCheckSteps;

            if (isWallBlockingAt(progress)) {

                const player = getPlayer();

                const curvePower =
                    player.curve / 100;

                /*
                   High curve can bend around the wall.
                */

                const avoidsWall =
                    curvePower > 0.92 ||
                    Math.random() < curvePower * 0.55;

                if (!avoidsWall) {
                    game.wallBlocked = true;
                    break;
                }
            }
        }
    }

    const targetInsideGoal =
        game.shotTargetX >= 330 &&
        game.shotTargetX <= 670 &&
        game.shotTargetY >= 75 &&
        game.shotTargetY <= 210;

    let saved = false;

    if (targetInsideGoal && !game.wallBlocked) {
        saved = keeperHit();
    }

    game.saved = saved;

    if (game.wallBlocked) {

        game.goal = false;

        showResult(
            "🧱",
            "BLOCKED!",
            "The defensive wall stopped the shot.",
            0
        );

        return;
    }

    if (!targetInsideGoal) {

        game.goal = false;

        showResult(
            "❌",
            "MISS!",
            "The shot missed the target.",
            0
        );

        return;
    }

    if (saved) {

        game.goal = false;

        showResult(
            "🧤",
            "SAVED!",
            `${getKeeper().name} stopped the shot!`,
            0
        );

        return;
    }

    game.goal = true;

    game.goals++;

    const player = getPlayer();

    const difficulty = getDifficulty();

    let basePoints = 100;

    basePoints += player.accuracy;
    basePoints += Math.round(player.power * 0.5);

    if (game.mode === "longshot") {
        basePoints += 60;
    }

    if (game.mode === "freekick") {
        basePoints += 45;
    }

    if (game.mode === "penalty") {
        basePoints += 25;
    }

    basePoints *= difficulty.scoreMultiplier;

    basePoints = Math.round(basePoints);

    game.score += basePoints;

    updateTopStats();

    showResult(
        "⚽",
        "GOAL!",
        `${player.name} found the back of the net!`,
        basePoints
    );
}


/* =========================================================
   RESULT SCREEN
   ========================================================= */

function showResult(icon, title, text, points) {

    game.resultShown = true;

    resultIcon.textContent = icon;

    resultTitle.textContent = title;

    resultText.textContent = text;

    resultPoints.textContent = points;

    resultOverlay.classList.remove("hidden");

    updateTopStats();
}


function hideResult() {

    resultOverlay.classList.add("hidden");

    game.resultShown = false;
}


/* =========================================================
   NEXT SHOT
   ========================================================= */

function nextShot() {

    hideResult();

    /*
       Increase level every five goals.
    */

    game.level =
        Math.floor(game.goals / 5) + 1;

    updateTopStats();

    if (game.mode === "goalkeeping") {
        startKeeperChallenge();
    } else {
        prepareAttackingShot();
    }
}


/* =========================================================
   GOALKEEPER SAVE BUTTON
   ========================================================= */

function saveGoalkeeper() {

    if (!game.started) {
        return;
    }

    if (game.mode !== "goalkeeping") {
        return;
    }

    if (!game.keeperChallengeActive) {
        return;
    }

    if (game.keeperSaveAttempt) {
        return;
    }

    game.keeperSaveAttempt = true;

    const keeper = getKeeper();

    const targetX = game.targetX;
    const targetY = game.targetY;

    const finalX = game.keeperX;

    const finalY = game.keeperY;

    const saveDistance =
        distance(
            targetX,
            targetY,
            finalX,
            finalY
        );

    let radius =
        55 +
        keeper.reflexes * 0.15 +
        keeper.diving * 0.10;

    if (keeperSelect.value === "hassan") {
        radius = 190;
    }

    if (saveDistance <= radius) {

        const points =
            Math.round(
                120 *
                getDifficulty().scoreMultiplier
            );

        game.score += points;

        game.goals++;

        showResult(
            "🧤",
            "GREAT SAVE!",
            `${keeper.name} stopped the shot!`,
            points
        );

    } else {

        showResult(
            "⚽",
            "GOAL!",
            "The shot got past the goalkeeper.",
            0
        );
    }

    game.keeperChallengeActive = false;

    updateTopStats();
}


/* =========================================================
   UPDATE ATTACKING SHOT
   ========================================================= */

function updateShot(delta) {

    if (!game.shooting) {
        return;
    }

    const player = getPlayer();

    const power =
        game.power / 100;

    const speed =
        0.010 +
        power * 0.015 +
        player.power / 10000;

    game.shotProgress += speed * delta;

    game.shotProgress =
        clamp(
            game.shotProgress,
            0,
            1
        );

    const p = game.shotProgress;

    /*
       Smooth ball trajectory.
    */

    game.ballX =
        lerp(
            game.ballStartX,
            game.shotTargetX,
            p
        );

    game.ballY =
        lerp(
            game.ballStartY,
            game.shotTargetY,
            p
        );

    /*
       Curve effect.
    */

    if (game.mode === "freekick") {

        const curve =
            (player.curve / 100) *
            Math.sin(p * Math.PI);

        const direction =
            game.shotTargetX < 500
                ? -1
                : 1;

        game.ballX +=
            direction *
            curve *
            55;
    }

    /*
       Goalkeeper moves toward the predicted
       destination during the shot.
    */

    if (game.keeperMoving) {

        const difficulty =
            getDifficulty();

        const keeperSpeed =
            difficulty.keeperSpeed *
            (getKeeper().reflexes / 100);

        game.keeperX = lerp(
            game.keeperX,
            game.keeperTargetX,
            keeperSpeed * delta * 0.045
        );

        game.keeperY = 145;
    }

    if (p >= 1) {
        resolveShot();
    }
}


/* =========================================================
   UPDATE GOALKEEPING
   ========================================================= */

function updateGoalkeeping(delta) {

    if (!game.keeperChallengeActive) {
        return;
    }

    game.keeperChallengeTimer += delta;

    /*
       Slowly reveal the incoming target.
    */

    const difficulty =
        getDifficulty();

    const keeperSpeed =
        difficulty.keeperSpeed *
        0.045;

    game.keeperX = lerp(
        game.keeperX,
        game.keeperTargetX,
        keeperSpeed * delta
    );

    game.keeperY = lerp(
        game.keeperY,
        145,
        keeperSpeed * delta
    );

    /*
       Ball moves toward target.
    */

    const progress =
        clamp(
            game.keeperChallengeTimer / 80,
            0,
            1
        );

    game.ballX =
        lerp(
            500,
            game.targetX,
            progress
        );

    game.ballY =
        lerp(
            555,
            game.targetY,
            progress
        );
}


/* =========================================================
   CANVAS DRAWING
   ========================================================= */

function drawPitch() {

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    /*
       Grass.
    */

    ctx.fillStyle = "#157a3d";
    ctx.fillRect(0, 0, w, h);

    /*
       Grass stripes.
    */

    for (let i = 0; i < 10; i++) {

        ctx.fillStyle =
            i % 2 === 0
                ? "rgba(255,255,255,0.035)"
                : "rgba(0,0,0,0.035)";

        ctx.fillRect(
            i * 100,
            0,
            100,
            h
        );
    }

    /*
       Pitch border.
    */

    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 4;

    ctx.strokeRect(
        35,
        25,
        w - 70,
        h - 50
    );

    /*
       Center line.
    */

    ctx.beginPath();

    ctx.moveTo(35, 325);
    ctx.lineTo(w - 35, 325);

    ctx.stroke();

    /*
       Center circle.
    */

    ctx.beginPath();

    ctx.arc(
        500,
        325,
        75,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    /*
       Penalty area.
    */

    ctx.strokeRect(
        280,
        25,
        440,
        180
    );

    /*
       Goal box.
    */

    ctx.strokeRect(
        360,
        25,
        280,
        100
    );

    /*
       Goal.
    */

    drawGoal();

    /*
       Penalty spot.
    */

    ctx.fillStyle = "#fff";

    ctx.beginPath();

    ctx.arc(
        500,
        170,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /*
       Pitch markings.
    */

    ctx.beginPath();

    ctx.arc(
        500,
        170,
        70,
        0.15,
        Math.PI - 0.15
    );

    ctx.stroke();
}


function drawGoal() {

    /*
       Goal frame.
    */

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 8;

    ctx.strokeRect(
        325,
        35,
        350,
        130
    );

    /*
       Net.
    */

    ctx.strokeStyle =
        "rgba(255,255,255,0.28)";

    ctx.lineWidth = 1;

    for (let x = 325; x <= 675; x += 25) {

        ctx.beginPath();

        ctx.moveTo(x, 35);
        ctx.lineTo(x, 675 - x, 0);

        ctx.stroke();
    }

    for (let y = 35; y <= 165; y += 20) {

        ctx.beginPath();

        ctx.moveTo(325, y);
        ctx.lineTo(675, y);

        ctx.stroke();
    }
}


/* =========================================================
   DRAW WALL
   ========================================================= */

function drawWall() {

    if (game.mode !== "freekick") {
        return;
    }

    const wallX = 500;
    const wallY = 285;

    const playersInWall = 5;

    for (let i = 0; i < playersInWall; i++) {

        const x =
            wallX +
            (i - 2) * 32;

        drawWallPlayer(
            x,
            wallY
        );
    }
}


function drawWallPlayer(x, y) {

    ctx.fillStyle = "#172033";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 35,
        10,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
        x - 11,
        y - 25,
        22,
        45
    );

    ctx.fillRect(
        x - 16,
        y - 20,
        32,
        8
    );

    ctx.fillRect(
        x - 8,
        y + 20,
        7,
        28
    );

    ctx.fillRect(
        x + 1,
        y + 20,
        7,
        28
    );
}


/* =========================================================
   DRAW GOALKEEPER
   ========================================================= */

function drawKeeper() {

    const x = game.keeperX;
    const y = game.keeperY;

    const keeper = getKeeper();

    /*
       Body.
    */

    ctx.fillStyle =
        keeperSelect.value === "hassan"
            ? "#ffd700"
            : "#2563eb";

    ctx.fillRect(
        x - 18,
        y - 5,
        36,
        48
    );

    /*
       Head.
    */

    ctx.fillStyle = "#f1c27d";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 17,
        14,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /*
       Arms.
    */

    ctx.strokeStyle =
        keeperSelect.value === "hassan"
            ? "#ffd700"
            : "#2563eb";

    ctx.lineWidth = 10;

    ctx.beginPath();

    ctx.moveTo(x - 15, y + 5);

    ctx.lineTo(
        x - 45,
        y + 15
    );

    ctx.moveTo(x + 15, y + 5);

    ctx.lineTo(
        x + 45,
        y + 15
    );

    ctx.stroke();

    /*
       Gloves.
    */

    ctx.fillStyle = "#ffffff";

    ctx.beginPath();

    ctx.arc(
        x - 48,
        y + 16,
        7,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 48,
        y + 16,
        7,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /*
       Legs.
    */

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 10;

    ctx.beginPath();

    ctx.moveTo(x - 8, y + 43);
    ctx.lineTo(x - 13, y + 72);

    ctx.moveTo(x + 8, y + 43);
    ctx.lineTo(x + 13, y + 72);

    ctx.stroke();
}


/* =========================================================
   DRAW PLAYER
   ========================================================= */

function drawPlayer() {

    const x = 500;
    const y = 560;

    const player = getPlayer();

    ctx.fillStyle = "#ef4444";

    ctx.fillRect(
        x - 18,
        y - 10,
        36,
        55
    );

    /*
       Head.
    */

    ctx.fillStyle = "#f1c27d";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 27,
        14,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /*
       Legs.
    */

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 11;

    ctx.beginPath();

    ctx.moveTo(x - 8, y + 45);

    ctx.lineTo(
        x - 18,
        y + 80
    );

    ctx.moveTo(x + 8, y + 45);

    ctx.lineTo(
        x + 18,
        y + 80
    );

    ctx.stroke();

    /*
       Player name.
    */

    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";

    ctx.fillStyle = "#ffffff";

    ctx.fillText(
        player.name,
        x,
        y + 105
    );
}


/* =========================================================
   DRAW BALL
   ========================================================= */

function drawBall() {

    const x = game.ballX;
    const y = game.ballY;

    /*
       Shadow.
    */

    ctx.fillStyle =
        "rgba(0,0,0,0.22)";

    ctx.beginPath();

    ctx.ellipse(
        x,
        y + 12,
        15,
        6,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /*
       Ball.
    */

    ctx.fillStyle = "#ffffff";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        game.ballRadius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2;

    ctx.stroke();

    /*
       Ball pattern.
    */

    ctx.fillStyle = "#111827";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        4,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


/* =========================================================
   DRAW TARGET
   ========================================================= */

function drawTarget() {

    if (!game.started) {
        return;
    }

    if (game.shooting) {
        return;
    }

    if (game.mode === "goalkeeping") {
        return;
    }

    const x = game.targetX;
    const y = game.targetY;

    ctx.strokeStyle =
        "rgba(255,255,255,0.9)";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        20,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(x - 28, y);
    ctx.lineTo(x + 28, y);

    ctx.moveTo(x, y - 28);
    ctx.lineTo(x, y + 28);

    ctx.stroke();

    ctx.fillStyle =
        "rgba(255,255,255,0.85)";

    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "TARGET",
        x,
        y - 32
    );
}


/* =========================================================
   DRAW GOALKEEPING TARGET
   ========================================================= */

function drawKeeperTarget() {

    if (game.mode !== "goalkeeping") {
        return;
    }

    if (!game.keeperChallengeActive) {
        return;
    }

    const x = game.targetX;
    const y = game.targetY;

    ctx.strokeStyle =
        "rgba(255,80,80,0.95)";

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        25,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.font = "bold 14px Arial";

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    ctx.fillText(
        "BALL",
        x,
        y - 35
    );
}


/* =========================================================
   DRAW UI OVERLAY ON CANVAS
   ========================================================= */

function drawModeIndicator() {

    ctx.fillStyle =
        "rgba(0,0,0,0.25)";

    ctx.fillRect(
        20,
        20,
        170,
        42
    );

    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 18px Arial";

    ctx.textAlign = "left";

    ctx.fillText(
        getMode().title,
        35,
        47
    );
}


/* =========================================================
   MAIN DRAW FUNCTION
   ========================================================= */

function draw() {

    drawPitch();

    drawWall();

    drawTarget();

    drawKeeperTarget();

    drawKeeper();

    if (game.mode !== "goalkeeping") {
        drawPlayer();
    }

    drawBall();

    drawModeIndicator();
}


/* =========================================================
   MAIN GAME LOOP
   ========================================================= */

function gameLoop(timestamp) {

    if (!game.lastTimestamp) {
        game.lastTimestamp = timestamp;
    }

    const delta =
        Math.min(
            timestamp - game.lastTimestamp,
            40
        );

    game.lastTimestamp = timestamp;

    if (game.mode === "goalkeeping") {

        updateGoalkeeping(delta);

    } else {

        updateShot(delta);
    }

    draw();

    requestAnimationFrame(gameLoop);
}


/* =========================================================
   START GAME
   ========================================================= */

function startGame() {

    game.started = true;

    startOverlay.classList.add("hidden");

    hideResult();

    updateAllUI();

    if (game.mode === "goalkeeping") {
        startKeeperChallenge();
    } else {
        prepareAttackingShot();
    }

    gameMessage.textContent =
        "Choose your target and shoot!";
}


/* =========================================================
   RESTART GAME
   ========================================================= */

function restartGame() {

    game.level = 1;

    game.goals = 0;

    game.score = 0;

    game.shots = 0;

    game.started = false;

    game.mode = "penalty";

    document
        .querySelectorAll(".mode-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.mode === "penalty"
            );
        });

    playerSelect.value = "hassan";

    keeperSelect.value = "hassan";

    difficultySelect.value = "normal";

    powerSlider.value = 75;

    resetShot();

    updateAllUI();

    resultOverlay.classList.add("hidden");

    startOverlay.classList.remove("hidden");

    gameMessage.textContent =
        "Choose your target and shoot!";
}


/* =========================================================
   CANVAS MOUSE CONTROLS
   ========================================================= */

function canvasPosition(event) {

    const rect =
        canvas.getBoundingClientRect();

    const scaleX =
        canvas.width / rect.width;

    const scaleY =
        canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}


canvas.addEventListener(
    "click",
    event => {

        const position =
            canvasPosition(event);

        setTargetFromCanvas(
            position.x,
            position.y
        );
    }
);


/* =========================================================
   TOUCH CONTROLS
   ========================================================= */

canvas.addEventListener(
    "touchstart",
    event => {

        event.preventDefault();

        if (!event.touches.length) {
            return;
        }

        const touch =
            event.touches[0];

        const rect =
            canvas.getBoundingClientRect();

        const scaleX =
            canvas.width / rect.width;

        const scaleY =
            canvas.height / rect.height;

        const x =
            (touch.clientX - rect.left) *
            scaleX;

        const y =
            (touch.clientY - rect.top) *
            scaleY;

        setTargetFromCanvas(x, y);
    },
    { passive: false }
);


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

document
    .querySelectorAll(".mode-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setMode(
                    button.dataset.mode
                );
            }
        );
    });


shootBtn.addEventListener(
    "click",
    shoot
);


saveBtn.addEventListener(
    "click",
    saveGoalkeeper
);


startBtn.addEventListener(
    "click",
    startGame
);


nextBtn.addEventListener(
    "click",
    nextShot
);


restartBtn.addEventListener(
    "click",
    restartGame
);


/* =========================================================
   SELECT EVENTS
   ========================================================= */

playerSelect.addEventListener(
    "change",
    () => {

        updatePlayerStats();

        if (game.started) {
            gameMessage.textContent =
                `${getPlayer().name} selected!`;
        }
    }
);


keeperSelect.addEventListener(
    "change",
    () => {

        updateKeeperStats();

        if (game.started) {
            gameMessage.textContent =
                `${getKeeper().name} is in goal!`;
        }
    }
);


difficultySelect.addEventListener(
    "change",
    () => {

        if (game.started) {

            gameMessage.textContent =
                `${difficultySelect.options[difficultySelect.selectedIndex].text} difficulty selected.`;
        }
    }
);


powerSlider.addEventListener(
    "input",
    updatePower
);


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.code === "Space") {

            event.preventDefault();

            if (game.mode === "goalkeeping") {
                saveGoalkeeper();
            } else {
                shoot();
            }
        }

        if (event.code === "Enter") {

            if (!game.started) {
                startGame();
            }
        }
    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeGame() {

    game.mode = "penalty";

    resetShot();

    updateAllUI();

    startOverlay.classList.remove("hidden");

    resultOverlay.classList.add("hidden");

    draw();
}


initializeGame();

requestAnimationFrame(gameLoop);
