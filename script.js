const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerSelect = document.getElementById("playerSelect");
const goalkeeperSelect = document.getElementById("goalkeeperSelect");

const levelDisplay = document.getElementById("levelDisplay");
const goalsDisplay = document.getElementById("goalsDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");
const shotsDisplay = document.getElementById("shotsDisplay");

const modeTitle = document.getElementById("modeTitle");
const modeDescription = document.getElementById("modeDescription");
const distanceDisplay = document.getElementById("distanceDisplay");

const powerSlider = document.getElementById("powerSlider");
const powerValue = document.getElementById("powerValue");

const aimSlider = document.getElementById("aimSlider");

const startOverlay = document.getElementById("startOverlay");
const resultOverlay = document.getElementById("resultOverlay");

const startButton = document.getElementById("startButton");
const shootButton = document.getElementById("shootButton");
const saveButton = document.getElementById("saveButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const resultPoints = document.getElementById("resultPoints");

const bottomPlayer = document.getElementById("bottomPlayer");
const bottomKeeper = document.getElementById("bottomKeeper");
const bottomSpecialty = document.getElementById("bottomSpecialty");
const bottomKeeperSpecialty = document.getElementById("bottomKeeperSpecialty");
const bottomLevel = document.getElementById("bottomLevel");

const statElements = {
    finishing: {
        bar: document.getElementById("finishingStat"),
        value: document.getElementById("finishingValue")
    },
    power: {
        bar: document.getElementById("powerStat"),
        value: document.getElementById("powerStatValue")
    },
    curve: {
        bar: document.getElementById("curveStat"),
        value: document.getElementById("curveValue")
    },
    accuracy: {
        bar: document.getElementById("accuracyStat"),
        value: document.getElementById("accuracyValue")
    },
    speed: {
        bar: document.getElementById("speedStat"),
        value: document.getElementById("speedValue")
    },
    dribbling: {
        bar: document.getElementById("dribblingStat"),
        value: document.getElementById("dribblingValue")
    }
};

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
        curve: 93,
        accuracy: 95,
        speed: 96,
        dribbling: 94,
        overall: 95,
        specialty: "Complete Forward"
    },

    arham: {
        name: "Muhammad Arham",
        finishing: 88,
        power: 90,
        curve: 87,
        accuracy: 89,
        speed: 91,
        dribbling: 90,
        overall: 90,
        specialty: "Power Finisher"
    },

    umar: {
        name: "Umar Shoaib",
        finishing: 90,
        power: 89,
        curve: 91,
        accuracy: 90,
        speed: 92,
        dribbling: 91,
        overall: 91,
        specialty: "Technical Player"
    },

    ronaldo: {
        name: "Cristiano Ronaldo",
        finishing: 99,
        power: 99,
        curve: 93,
        accuracy: 97,
        speed: 95,
        dribbling: 94,
        overall: 98,
        specialty: "Power Finisher"
    },

    haaland: {
        name: "Erling Haaland",
        finishing: 98,
        power: 99,
        curve: 84,
        accuracy: 91,
        speed: 94,
        dribbling: 86,
        overall: 96,
        specialty: "Long-Shot Specialist"
    },

    bellingham: {
        name: "Jude Bellingham",
        finishing: 94,
        power: 91,
        curve: 91,
        accuracy: 98,
        speed: 93,
        dribbling: 95,
        overall: 96,
        specialty: "Penalty Specialist"
    },

    yamal: {
        name: "Lamine Yamal",
        finishing: 91,
        power: 84,
        curve: 99,
        accuracy: 98,
        speed: 96,
        dribbling: 99,
        overall: 96,
        specialty: "Free-Kick Specialist"
    },

    messi: {
        name: "Lionel Messi",
        finishing: 97,
        power: 89,
        curve: 99,
        accuracy: 99,
        speed: 94,
        dribbling: 99,
        overall: 98,
        specialty: "Curve Master"
    },

    mbappe: {
        name: "Kylian Mbappé",
        finishing: 96,
        power: 94,
        curve: 88,
        accuracy: 94,
        speed: 99,
        dribbling: 97,
        overall: 97,
        specialty: "Speed Finisher"
    },

    /* ZAYD — NORMAL PLAYER */
    zayd: {
        name: "Zayd Quadri",
        finishing: 92,
        power: 88,
        curve: 90,
        accuracy: 91,
        speed: 96,
        dribbling: 100,
        overall: 95,
        specialty: "Best Dribbler"
    }
};

const goalkeepers = {

    hassan: {
        name: "Hassan Ali",
        diving: 300,
        reflexes: 300,
        positioning: 300,
        handling: 300,
        speed: 300,
        overall: 300,
        specialty: "Ultimate Goalkeeper"
    },

    ehan: {
        name: "Ehan Ali",
        diving: 96,
        reflexes: 97,
        positioning: 94,
        handling: 95,
        speed: 96,
        overall: 96,
        specialty: "Elite Reflexes"
    },

    courtois: {
        name: "Thibaut Courtois",
        diving: 98,
        reflexes: 97,
        positioning: 95,
        handling: 96,
        speed: 88,
        overall: 96,
        specialty: "Huge Reach"
    },

    donnarumma: {
        name: "Gianluigi Donnarumma",
        diving: 97,
        reflexes: 96,
        positioning: 94,
        handling: 96,
        speed: 89,
        overall: 95,
        specialty: "Shot Stopper"
    },

    alisson: {
        name: "Alisson",
        diving: 96,
        reflexes: 95,
        positioning: 96,
        handling: 96,
        speed: 91,
        overall: 95,
        specialty: "Complete Keeper"
    },

    neuer: {
        name: "Manuel Neuer",
        diving: 94,
        reflexes: 94,
        positioning: 95,
        handling: 94,
        speed: 95,
        overall: 94,
        specialty: "Sweeper Keeper"
    },

    oblak: {
        name: "Jan Oblak",
        diving: 97,
        reflexes: 96,
        positioning: 97,
        handling: 95,
        speed: 85,
        overall: 95,
        specialty: "Positioning"
    },

    martinez: {
        name: "Emiliano Martínez",
        diving: 95,
        reflexes: 94,
        positioning: 96,
        handling: 94,
        speed: 87,
        overall: 94,
        specialty: "Penalty Specialist"
    },

    ederson: {
        name: "Ederson",
        diving: 91,
        reflexes: 92,
        positioning: 94,
        handling: 94,
        speed: 95,
        overall: 93,
        specialty: "Sweeper"
    },

    maignan: {
        name: "Mike Maignan",
        diving: 96,
        reflexes: 96,
        positioning: 94,
        handling: 94,
        speed: 93,
        overall: 95,
        specialty: "Reflex Keeper"
    },

    raya: {
        name: "David Raya",
        diving: 91,
        reflexes: 92,
        positioning: 93,
        handling: 94,
        speed: 91,
        overall: 92,
        specialty: "Distribution"
    },

    szczesny: {
        name: "Wojciech Szczęsny",
        diving: 94,
        reflexes: 93,
        positioning: 94,
        handling: 93,
        speed: 84,
        overall: 92,
        specialty: "Experienced Keeper"
    },

    casillas: {
        name: "Iker Casillas",
        diving: 97,
        reflexes: 98,
        positioning: 94,
        handling: 95,
        speed: 90,
        overall: 96,
        specialty: "Reflex Legend"
    }
};

let gameMode = "penalty";
let difficulty = "easy";

let level = 1;
let goals = 0;
let score = 0;
let shots = 0;

let gameStarted = false;
let shotInProgress = false;
let resultShown = false;

let ball = {
    x: 500,
    y: 525,
    radius: 12,
    targetX: 500,
    targetY: 185,
    progress: 0
};

let goalkeeper = {
    x: 500,
    y: 185,
    targetX: 500,
    targetY: 185,
    dive: 0
};

let wallPlayers = [];

const modes = {
    penalty: {
        title: "PENALTY",
        description: "Beat the goalkeeper and score!",
        distance: "12 m"
    },

    freekick: {
        title: "FREE KICK",
        description: "Curve the ball around the wall!",
        distance: "23 m"
    },

    longshot: {
        title: "LONG SHOT",
        description: "Choose your target and unleash it!",
        distance: "30 m"
    },

    goalkeeping: {
        title: "GOALKEEPING",
        description: "Read the shot and make the save!",
        distance: "12 m"
    }
};

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function getPlayer() {
    return players[playerSelect.value];
}

function getKeeper() {
    return goalkeepers[goalkeeperSelect.value];
}

function updatePlayerStats() {

    const player = getPlayer();

    statElements.finishing.bar.style.width =
        clamp(player.finishing, 0, 100) + "%";

    statElements.finishing.value.textContent = player.finishing;

    statElements.power.bar.style.width =
        clamp(player.power, 0, 100) + "%";

    statElements.power.value.textContent = player.power;

    statElements.curve.bar.style.width =
        clamp(player.curve, 0, 100) + "%";

    statElements.curve.value.textContent = player.curve;

    statElements.accuracy.bar.style.width =
        clamp(player.accuracy, 0, 100) + "%";

    statElements.accuracy.value.textContent = player.accuracy;

    statElements.speed.bar.style.width =
        clamp(player.speed, 0, 100) + "%";

    statElements.speed.value.textContent = player.speed;

    statElements.dribbling.bar.style.width =
        clamp(player.dribbling, 0, 100) + "%";

    statElements.dribbling.value.textContent = player.dribbling;

    document.getElementById("overallValue").textContent =
        player.overall;

    bottomPlayer.textContent = player.name;
    bottomSpecialty.textContent = player.specialty;
}

function updateKeeperInfo() {

    const keeper = getKeeper();

    bottomKeeper.textContent = keeper.name;
    bottomKeeperSpecialty.textContent = keeper.specialty;
}

function updateDisplays() {

    levelDisplay.textContent = level;
    goalsDisplay.textContent = goals;
    scoreDisplay.textContent = score;
    shotsDisplay.textContent = shots;
    bottomLevel.textContent = level;

    powerValue.textContent = powerSlider.value + "%";
}

function setMode(mode) {

    gameMode = mode;

    document.querySelectorAll(".mode-button").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.mode === mode
        );
    });

    const data = modes[mode];

    modeTitle.textContent = data.title;
    modeDescription.textContent = data.description;
    distanceDisplay.textContent = data.distance;

    if (mode === "goalkeeping") {

        shootButton.classList.add("hidden");
        saveButton.classList.remove("hidden");

    } else {

        shootButton.classList.remove("hidden");
        saveButton.classList.add("hidden");
    }

    resetShot();
    draw();
}

function setDifficulty(value) {

    difficulty = value;

    document.querySelectorAll(".difficulty").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.difficulty === value
        );
    });
}

function createWall() {

    wallPlayers = [];

    for (let i = 0; i < 5; i++) {

        wallPlayers.push({
            x: 390 + i * 55,
            y: 300,
            jump: Math.random() * 10
        });
    }
}

function resetShot() {

    shotInProgress = false;
    resultShown = false;

    ball.x = 500;
    ball.y = gameMode === "longshot" ? 565 : 525;

    ball.targetX = 500;
    ball.targetY = 185;
    ball.progress = 0;

    goalkeeper.x = 500;
    goalkeeper.y = 185;
    goalkeeper.targetX = 500;
    goalkeeper.targetY = 185;
    goalkeeper.dive = 0;

    createWall();
}

function startGame() {

    gameStarted = true;

    startOverlay.classList.add("hidden");
    resultOverlay.classList.add("hidden");

    resetShot();
    draw();
}

function calculateTarget() {

    const aim = Number(aimSlider.value);

    let targetX = 500 + aim * 2.5;

    targetX = clamp(targetX, 390, 610);

    return targetX;
}

function getDifficultyModifier() {

    if (difficulty === "easy") return 0.70;
    if (difficulty === "normal") return 0.88;

    return 1.05;
}

function shoot() {

    if (!gameStarted || shotInProgress || resultShown) {
        return;
    }

    shots++;
    updateDisplays();

    const player = getPlayer();

    ball.targetX = calculateTarget();

    if (gameMode === "freekick") {
        ball.targetX += (player.curve - 70) * 1.5;
    }

    if (gameMode === "longshot") {
        ball.targetX += (player.power - 70) * 0.8;
    }

    ball.targetX = clamp(ball.targetX, 350, 650);

    ball.targetY =
        gameMode === "longshot"
            ? 190
            : 185;

    shotInProgress = true;

    animateShot();
}

function goalkeeperDecision() {

    const keeper = getKeeper();

    const difficultyModifier = getDifficultyModifier();

    const keeperStrength =
        (keeper.reflexes +
         keeper.diving +
         keeper.positioning) / 3;

    let chance =
        keeperStrength / 150 * difficultyModifier;

    if (gameMode === "penalty") {
        chance *= 0.75;
    }

    if (gameMode === "freekick") {
        chance *= 0.60;
    }

    if (gameMode === "longshot") {
        chance *= 0.55;
    }

    chance = clamp(chance, 0.15, 0.95);

    const random = Math.random();

    if (random < chance) {

        const player = getPlayer();

        const reaction =
            500 - keeperStrength * 3;

        goalkeeper.targetX =
            ball.targetX +
            (Math.random() - 0.5) * reaction;

        goalkeeper.targetX =
            clamp(goalkeeper.targetX, 395, 605);

        goalkeeper.dive = 1;

        return true;
    }

    goalkeeper.dive = 0;

    return false;
}

function resolveShot() {

    const player = getPlayer();

    let accuracyChance =
        player.accuracy / 100;

    if (gameMode === "freekick") {
        accuracyChance +=
            (player.curve - 80) / 500;
    }

    if (gameMode === "longshot") {
        accuracyChance +=
            (player.power - 80) / 500;
    }

    accuracyChance = clamp(
        accuracyChance,
        0.55,
        0.99
    );

    const miss =
        Math.random() > accuracyChance;

    if (miss) {
        showResult(
            false,
            "MISS!",
            "The shot went wide."
        );

        return;
    }

    const saved = goalkeeperDecision();

    if (saved) {

        showResult(
            false,
            "SAVED!",
            `${getKeeper().name} made the save!`
        );

        return;
    }

    goals++;

    let points = 100;

    if (gameMode === "longshot") {
        points += 75;
    }

    if (gameMode === "freekick") {
        points += 50;
    }

    if (gameMode === "penalty") {
        points += 25;
    }

    points += level * 10;

    score += points;

    if (goals % 5 === 0) {
        level++;
    }

    showResult(
        true,
        "GOAL!",
        `${getPlayer().name} scores!`
    );

    resultPoints.textContent = points;

    updateDisplays();
}

function animateShot() {

    let startX = ball.x;
    let startY = ball.y;

    let duration = 650;

    let startTime = performance.now();

    function frame(now) {

        if (!shotInProgress) {
            return;
        }

        const elapsed = now - startTime;

        ball.progress =
            clamp(elapsed / duration, 0, 1);

        const p = ball.progress;

        ball.x =
            startX +
            (ball.targetX - startX) * p;

        ball.y =
            startY +
            (ball.targetY - startY) * p;

        const arc =
            Math.sin(p * Math.PI) *
            (gameMode === "freekick" ? 85 : 45);

        ball.y -= arc;

        if (p >= 1) {

            shotInProgress = false;

            resolveShot();

            return;
        }

        draw();

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function showResult(success, title, message) {

    resultShown = true;

    resultTitle.textContent = title;
    resultText.textContent = message;

    if (!success) {
        resultPoints.textContent = "0";
    }

    resultOverlay.classList.remove("hidden");

    draw();
}

function nextShot() {

    resultOverlay.classList.add("hidden");

    resetShot();

    if (gameMode === "goalkeeping") {
        createGoalkeepingShot();
    }

    draw();
}

function createGoalkeepingShot() {

    ball.x = 500;
    ball.y = 185;

    ball.targetX =
        390 +
        Math.random() * 220;

    ball.targetY =
        525;

    ball.progress = 0;

    goalkeeper.x = 500;
    goalkeeper.y = 515;

    shotInProgress = false;
}

function saveGoal() {

    if (
        !gameStarted ||
        shotInProgress ||
        resultShown
    ) {
        return;
    }

    shots++;

    updateDisplays();

    const keeper = getKeeper();

    const ballTarget =
        400 + Math.random() * 200;

    const keeperAbility =
        (
            keeper.diving +
            keeper.reflexes +
            keeper.positioning
        ) / 3;

    const difficultyModifier =
        getDifficultyModifier();

    const saveChance =
        clamp(
            (keeperAbility / 100) *
            0.65 /
            difficultyModifier,
            0.25,
            0.98
        );

    goalkeeper.targetX = ballTarget;

    const saved =
        Math.random() < saveChance;

    goalkeeper.dive = 1;

    if (saved) {

        score += 150;

        showResult(
            true,
            "SAVE!",
            `${keeper.name} stopped the shot!`
        );

        resultPoints.textContent = "150";

    } else {

        showResult(
            false,
            "GOAL!",
            "The attacker beat the goalkeeper."
        );

        resultPoints.textContent = "0";
    }

    updateDisplays();
}

function drawPitch() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            canvas.height
        );

    gradient.addColorStop(0, "#167c39");
    gradient.addColorStop(1, "#0d5728");

    ctx.fillStyle = gradient;
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let y = 0; y < canvas.height; y += 70) {

        ctx.fillStyle =
            y % 140 === 0
                ? "rgba(255,255,255,0.025)"
                : "rgba(0,0,0,0.025)";

        ctx.fillRect(
            0,
            y,
            canvas.width,
            70
        );
    }

    ctx.strokeStyle =
        "rgba(255,255,255,0.8)";

    ctx.lineWidth = 4;

    ctx.strokeRect(
        70,
        35,
        860,
        580
    );

    ctx.strokeRect(
        270,
        35,
        460,
        190
    );

    ctx.strokeRect(
        355,
        35,
        290,
        105
    );

    ctx.beginPath();

    ctx.arc(
        500,
        175,
        70,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        500,
        175,
        4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#fff";
    ctx.fill();

    drawGoal();

    if (gameMode === "freekick") {
        drawWall();
    }
}

function drawGoal() {

    const goalX = 360;
    const goalY = 35;
    const goalW = 280;
    const goalH = 105;

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 8;

    ctx.strokeRect(
        goalX,
        goalY,
        goalW,
        goalH
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.35)";

    ctx.lineWidth = 2;

    for (let x = goalX; x <= goalX + goalW; x += 20) {

        ctx.beginPath();
        ctx.moveTo(x, goalY);
        ctx.lineTo(x, goalY + goalH);
        ctx.stroke();
    }

    for (let y = goalY; y <= goalY + goalH; y += 20) {

        ctx.beginPath();
        ctx.moveTo(goalX, y);
        ctx.lineTo(goalX + goalW, y);
        ctx.stroke();
    }
}

function drawWall() {

    wallPlayers.forEach(player => {

        ctx.fillStyle = "#283593";

        ctx.beginPath();

        ctx.arc(
            player.x,
            player.y - 45 - player.jump,
            13,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillRect(
            player.x - 12,
            player.y - 32 - player.jump,
            24,
            48
        );

        ctx.fillStyle = "#111";

        ctx.fillRect(
            player.x - 15,
            player.y + 16 - player.jump,
            10,
            35
        );

        ctx.fillRect(
            player.x + 5,
            player.y + 16 - player.jump,
            10,
            35
        );
    });
}

function drawGoalkeeper() {

    const x = goalkeeper.x;
    const y = goalkeeper.y;

    const scale =
        gameMode === "goalkeeping"
            ? 1.05
            : 0.9;

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(scale, scale);

    if (goalkeeper.dive) {

        ctx.rotate(
            goalkeeper.targetX > x
                ? 0.35
                : -0.35
        );
    }

    ctx.fillStyle = "#ffcc99";

    ctx.beginPath();

    ctx.arc(
        0,
        -48,
        15,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "#f4c542";

    ctx.fillRect(
        -20,
        -33,
        40,
        55
    );

    ctx.fillStyle = "#222";

    ctx.fillRect(
        -17,
        22,
        12,
        42
    );

    ctx.fillRect(
        5,
        22,
        12,
        42
    );

    ctx.fillStyle = "#fff";

    ctx.beginPath();

    ctx.arc(
        -31,
        -8,
        9,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.beginPath();

    ctx.arc(
        31,
        -8,
        9,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        getKeeper().name,
        x,
        y + 82
    );
}

function drawPlayer() {

    if (gameMode === "goalkeeping") {
        return;
    }

    const x = 500;
    const y =
        gameMode === "longshot"
            ? 570
            : 535;

    ctx.fillStyle = "#ffcc99";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 60,
        15,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "#e53935";

    ctx.fillRect(
        x - 22,
        y - 45,
        44,
        60
    );

    ctx.fillStyle = "#fff";

    ctx.fillRect(
        x - 20,
        y + 15,
        16,
        45
    );

    ctx.fillRect(
        x + 4,
        y + 15,
        16,
        45
    );

    ctx.fillStyle = "#111";

    ctx.fillRect(
        x - 23,
        y + 60,
        20,
        8
    );

    ctx.fillRect(
        x + 3,
        y + 60,
        20,
        8
    );

    ctx.fillStyle = "#fff";

    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        getPlayer().name,
        x,
        y + 88
    );
}

function drawBall() {

    ctx.save();

    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 10;

    ctx.fillStyle = "#fff";

    ctx.beginPath();

    ctx.arc(
        ball.x,
        ball.y,
        ball.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

    ctx.fillStyle = "#222";

    for (let i = 0; i < 5; i++) {

        const angle =
            i * Math.PI * 2 / 5;

        ctx.beginPath();

        ctx.arc(
            ball.x +
            Math.cos(angle) * 6,
            ball.y +
            Math.sin(angle) * 6,
            2,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

function drawAim() {

    if (
        !gameStarted ||
        shotInProgress ||
        resultShown ||
        gameMode === "goalkeeping"
    ) {
        return;
    }

    const targetX = calculateTarget();

    ctx.strokeStyle =
        "rgba(255,255,255,0.45)";

    ctx.lineWidth = 2;

    ctx.setLineDash([7, 8]);

    ctx.beginPath();

    ctx.moveTo(
        ball.x,
        ball.y
    );

    ctx.lineTo(
        targetX,
        185
    );

    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle = "#fff";

    ctx.beginPath();

    ctx.arc(
        targetX,
        185,
        8,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;

    ctx.stroke();
}

function draw() {

    drawPitch();

    if (gameMode === "goalkeeping") {

        drawGoalkeeper();
        drawBall();

    } else {

        drawGoalkeeper();
        drawPlayer();
        drawBall();
        drawAim();
    }
}

playerSelect.addEventListener(
    "change",
    () => {
        updatePlayerStats();
        draw();
    }
);

goalkeeperSelect.addEventListener(
    "change",
    () => {
        updateKeeperInfo();
        draw();
    }
);

powerSlider.addEventListener(
    "input",
    updateDisplays
);

document.querySelectorAll(".mode-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => setMode(button.dataset.mode)
        );
    });

document.querySelectorAll(".difficulty")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => setDifficulty(
                button.dataset.difficulty
            )
        );
    });

startButton.addEventListener(
    "click",
    startGame
);

shootButton.addEventListener(
    "click",
    shoot
);

saveButton.addEventListener(
    "click",
    saveGoal
);

nextButton.addEventListener(
    "click",
    nextShot
);

restartButton.addEventListener(
    "click",
    () => {

        level = 1;
        goals = 0;
        score = 0;
        shots = 0;

        gameStarted = false;

        startOverlay.classList.remove("hidden");
        resultOverlay.classList.add("hidden");

        updateDisplays();
        resetShot();
        draw();
    }
);

aimSlider.addEventListener(
    "input",
    draw
);

updatePlayerStats();
updateKeeperInfo();
updateDisplays();
setMode("penalty");
draw();
