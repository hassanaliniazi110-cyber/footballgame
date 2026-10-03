"use strict";

/* =========================================
   FOOTBALL MASTERS
   GAME ENGINE
========================================= */


/* =========================================
   PLAYER DATABASE
========================================= */

const players = [

    {
        id: "hassan",
        name: "Hassan Ali",
        role: "Goalkeeper",
        rating: 300,
        power: 300,
        curve: 300,
        accuracy: 300,
        reflex: 300,
        icon: "🧤",
        specialty: "Elite Goalkeeper"
    },

    {
        id: "ehan",
        name: "Ehan Ali",
        role: "Goalkeeper",
        rating: 98,
        power: 82,
        curve: 78,
        accuracy: 84,
        reflex: 96,
        icon: "🧤",
        specialty: "Reflex Specialist"
    },

    {
        id: "umar",
        name: "Umar Shoaib",
        role: "Attacker",
        rating: 94,
        power: 92,
        curve: 86,
        accuracy: 90,
        reflex: 70,
        icon: "⚡",
        specialty: "Power Finisher"
    },

    {
        id: "arham",
        name: "Muhammad Arham",
        role: "Midfielder",
        rating: 91,
        power: 84,
        curve: 90,
        accuracy: 94,
        reflex: 75,
        icon: "🎯",
        specialty: "Technical Player"
    },

    {
        id: "ronaldo",
        name: "Cristiano Ronaldo",
        role: "Forward",
        rating: 96,
        power: 96,
        curve: 91,
        accuracy: 94,
        reflex: 82,
        icon: "⭐",
        specialty: "Power & Finishing"
    },

    {
        id: "haaland",
        name: "Erling Haaland",
        role: "Forward",
        rating: 95,
        power: 100,
        curve: 80,
        accuracy: 91,
        reflex: 76,
        icon: "💥",
        specialty: "Long Shot Specialist"
    },

    {
        id: "bellingham",
        name: "Jude Bellingham",
        role: "Midfielder",
        rating: 94,
        power: 88,
        curve: 92,
        accuracy: 99,
        reflex: 86,
        icon: "🎯",
        specialty: "Penalty Specialist"
    },

    {
        id: "yamal",
        name: "Lamine Yamal",
        role: "Winger",
        rating: 94,
        power: 85,
        curve: 99,
        accuracy: 97,
        reflex: 93,
        icon: "🌀",
        specialty: "Free Kick Specialist"
    }

];


/* =========================================
   GAME STATE
========================================= */

const state = {

    screen: "homeScreen",

    mode: "freeKick",

    difficulty: "normal",

    level: 1,

    score: 0,

    coins: 100,

    xp: 0,

    attempt: 1,

    maxAttempts: 5,

    distance: 22,

    selectedPlayer: players[0],

    selectedTarget: {
        x: 0.5,
        y: 0.35
    },

    power: 0,

    shooting: false,

    powerDirection: 1,

    sound: true,

    goalkeeperDive: null

};


/* =========================================
   DOM
========================================= */

const screens = {

    homeScreen:
        document.getElementById("homeScreen"),

    playerScreen:
        document.getElementById("playerScreen"),

    gameScreen:
        document.getElementById("gameScreen"),

    resultScreen:
        document.getElementById("resultScreen"),

    settingsScreen:
        document.getElementById("settingsScreen")

};


const canvas =
    document.getElementById("footballCanvas");

const ctx =
    canvas.getContext("2d");


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeGame
);


function initializeGame() {

    loadProgress();

    renderPlayers();

    setupEvents();

    resizeCanvas();

    updateUI();

    showScreen("homeScreen");

}


/* =========================================
   SCREEN MANAGEMENT
========================================= */

function showScreen(screenName) {

    Object.values(screens).forEach(
        screen => screen.classList.remove("active")
    );

    if (screens[screenName]) {
        screens[screenName].classList.add("active");
        state.screen = screenName;
    }

    if (screenName === "gameScreen") {
        requestAnimationFrame(
            resizeCanvas
        );
    }

}


/* =========================================
   EVENTS
========================================= */

function setupEvents() {

    document.querySelectorAll(
        ".mode-card"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                state.mode =
                    button.dataset.mode;

                startGame();

            }
        );

    });


    document.getElementById(
        "playersButton"
    ).addEventListener(
        "click",
        () => showScreen("playerScreen")
    );


    document.getElementById(
        "settingsButton"
    ).addEventListener(
        "click",
        () => showScreen("settingsScreen")
    );


    document.querySelectorAll(
        "[data-back]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showScreen(
                    button.dataset.back
                );

            }
        );

    });


    document.getElementById(
        "gameBackButton"
    ).addEventListener(
        "click",
        () => {

            state.shooting = false;
            showScreen("homeScreen");

        }
    );


    document.getElementById(
        "shootButton"
    ).addEventListener(
        "click",
        shoot
    );


    document.getElementById(
        "longShotButton"
    ).addEventListener(
        "click",
        activateLongShot
    );


    document.getElementById(
        "leftButton"
    ).addEventListener(
        "click",
        () => moveAim(-0.06, 0)
    );


    document.getElementById(
        "rightButton"
    ).addEventListener(
        "click",
        () => moveAim(0.06, 0)
    );


    document.getElementById(
        "nextAttemptButton"
    ).addEventListener(
        "click",
        nextAttempt
    );


    document.getElementById(
        "resultHomeButton"
    ).addEventListener(
        "click",
        () => showScreen("homeScreen")
    );


    document.getElementById(
        "closePlayerModal"
    ).addEventListener(
        "click",
        closePlayerModal
    );


    document.getElementById(
        "selectPlayerButton"
    ).addEventListener(
        "click",
        selectModalPlayer
    );


    document.getElementById(
        "difficultyButton"
    ).addEventListener(
        "click",
        cycleDifficulty
    );


    document.getElementById(
        "resetButton"
    ).addEventListener(
        "click",
        resetProgress
    );


    document.querySelector(
        ".toggle"
    ).addEventListener(
        "click",
        toggleSound
    );


    document.querySelectorAll(
        ".keeper-buttons button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                state.goalkeeperDive =
                    button.dataset.dive;

                showNotification(
                    "Dive: " +
                    button.dataset.dive.toUpperCase()
                );

            }
        );

    });


    canvas.addEventListener(
        "pointerdown",
        handlePitchPointer
    );


    window.addEventListener(
        "resize",
        resizeCanvas
    );

}


/* =========================================
   PLAYER RENDERING
========================================= */

function renderPlayers() {

    const grid =
        document.getElementById("playerGrid");

    grid.innerHTML = "";

    players.forEach(player => {

        const card =
            document.createElement("button");

        card.className = "player-card";

        card.innerHTML = `

            <div class="player-avatar">
                ${player.icon}
            </div>

            <div>
                <div class="player-name">
                    ${player.name}
                </div>

                <div class="player-role">
                    ${player.role}
                </div>
            </div>

            <div>
                <div class="player-rating">
                    ${player.rating}
                </div>

                <small>
                    ${player.specialty}
                </small>
            </div>
        `;

        card.addEventListener(
            "click",
            () => openPlayerModal(player)
        );

        grid.appendChild(card);

    });

}


/* =========================================
   PLAYER MODAL
========================================= */

let modalPlayer = null;


function openPlayerModal(player) {

    modalPlayer = player;

    document.getElementById(
        "modalPlayerIcon"
    ).textContent = player.icon;

    document.getElementById(
        "modalPlayerName"
    ).textContent = player.name;

    document.getElementById(
        "modalPlayerRole"
    ).textContent =
        player.role +
        " • " +
        player.specialty;

    setStat(
        "Power",
        player.power
    );

    setStat(
        "Curve",
        player.curve
    );

    setStat(
        "Accuracy",
        player.accuracy
    );

    setStat(
        "Reflex",
        player.reflex
    );

    document.getElementById(
        "playerModal"
    ).classList.remove("hidden");

}


function setStat(name, value) {

    const bar =
        document.getElementById(
            "modal" + name
        );

    const text =
        document.getElementById(
            "modal" + name + "Text"
        );

    const percent =
        Math.min(
            100,
            Math.max(
                0,
                value / 3
            )
        );

    bar.style.width =
        percent + "%";

    text.textContent = value;

}


function closePlayerModal() {

    document.getElementById(
        "playerModal"
    ).classList.add("hidden");

}


function selectModalPlayer() {

    if (!modalPlayer) {
        return;
    }

    state.selectedPlayer =
        modalPlayer;

    closePlayerModal();

    showNotification(
        modalPlayer.name +
        " selected!"
    );

}


/* =========================================
   START GAME
========================================= */

function startGame() {

    state.attempt = 1;

    state.distance =
        getStartingDistance();

    state.power = 0;

    state.shooting = false;

    state.goalkeeperDive = null;

    document.getElementById(
        "gameModeLabel"
    ).textContent =
        getModeName();

    document.getElementById(
        "difficultyLabel"
    ).textContent =
        state.difficulty.toUpperCase();

    document.getElementById(
        "keeperControls"
    ).classList.toggle(
        "hidden",
        state.mode !== "goalkeeping"
    );

    document.getElementById(
        "shootControls"
    ).classList.toggle(
        "hidden",
        state.mode === "goalkeeping"
    );

    showScreen("gameScreen");

    resetAim();

    drawPitch();

    updateUI();

}


/* =========================================
   MODE NAMES
========================================= */

function getModeName() {

    if (state.mode === "freeKick") {
        return "FREE KICK";
    }

    if (state.mode === "penalty") {
        return "PENALTY";
    }

    return "GOALKEEPING";

}


/* =========================================
   DISTANCE
========================================= */

function getStartingDistance() {

    if (state.mode === "penalty") {
        return 11;
    }

    if (state.mode === "goalkeeping") {
        return 11;
    }

    return 22 + state.level * 2;

}


/* =========================================
   CANVAS
========================================= */

function resizeCanvas() {

    if (!canvas) {
        return;
    }

    const rect =
        canvas.getBoundingClientRect();

    const ratio =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * ratio;

    canvas.height =
        rect.height * ratio;

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    drawPitch();

}


/* =========================================
   DRAW PITCH
========================================= */

function drawPitch() {

    if (!canvas) {
        return;
    }

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    drawFieldLines(
        width,
        height
    );

    if (
        state.mode === "freeKick"
    ) {
        drawWall(
            width,
            height
        );
    }

    drawGoal(
        width,
        height
    );

    if (
        state.mode === "penalty"
    ) {
        drawGoalkeeper(
            width,
            height
        );
    }

    if (
        state.mode === "goalkeeping"
    ) {
        drawKeeperView(
            width,
            height
        );
    }

}


/* =========================================
   FIELD LINES
========================================= */

function drawFieldLines(width, height) {

    ctx.save();

    ctx.strokeStyle =
        "rgba(255,255,255,0.75)";

    ctx.lineWidth = 3;

    const centerX =
        width / 2;

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        0
    );

    ctx.lineTo(
        centerX,
        height
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        centerX,
        height / 2,
        75,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.strokeRect(
        centerX - 170,
        0,
        340,
        150
    );

    ctx.strokeRect(
        centerX - 95,
        0,
        190,
        70
    );

    ctx.restore();

}


/* =========================================
   GOAL
========================================= */

function drawGoal(width, height) {

    const goalWidth =
        Math.min(
            390,
            width * 0.52
        );

    const goalHeight =
        115;

    const x =
        (width - goalWidth) / 2;

    const y = 5;

    ctx.save();

    ctx.strokeStyle =
        "#ffffff";

    ctx.lineWidth = 7;

    ctx.strokeRect(
        x,
        y,
        goalWidth,
        goalHeight
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.3)";

    ctx.lineWidth = 1;

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const gx =
            x +
            (goalWidth / 12) * i;

        ctx.beginPath();

        ctx.moveTo(
            gx,
            y
        );

        ctx.lineTo(
            gx,
            y + goalHeight
        );

        ctx.stroke();

    }

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const gy =
            y +
            (goalHeight / 5) * i;

        ctx.beginPath();

        ctx.moveTo(
            x,
            gy
        );

        ctx.lineTo(
            x + goalWidth,
            gy
        );

        ctx.stroke();

    }

    ctx.restore();

}


/* =========================================
   WALL
========================================= */

function drawWall(width, height) {

    const wallY =
        height * 0.35;

    const wallWidth =
        Math.min(
            width * 0.55,
            400
        );

    const startX =
        (width - wallWidth) / 2;

    ctx.save();

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const x =
            startX +
            i * (wallWidth / 5);

        drawWallPlayer(
            x + 20,
            wallY
        );

    }

    ctx.restore();

}


function drawWallPlayer(x, y) {

    ctx.fillStyle =
        "#17241d";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 23,
        12,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
        x - 11,
        y - 10,
        22,
        43
    );

    ctx.fillRect(
        x - 17,
        y,
        6,
        32
    );

    ctx.fillRect(
        x + 11,
        y,
        6,
        32
    );

    ctx.fillRect(
        x - 9,
        y + 32,
        7,
        27
    );

    ctx.fillRect(
        x + 2,
        y + 32,
        7,
        27
    );

}


/* =========================================
   GOALKEEPER
========================================= */

function drawGoalkeeper(width, height) {

    const x =
        width / 2;

    const y =
        78;

    ctx.save();

    ctx.fillStyle =
        "#ffb733";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 24,
        13,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
        x - 16,
        y - 10,
        32,
        45
    );

    ctx.strokeStyle =
        "#ffb733";

    ctx.lineWidth = 9;

    ctx.beginPath();

    ctx.moveTo(
        x - 15,
        y
    );

    ctx.lineTo(
        x - 55,
        y - 15
    );

    ctx.moveTo(
        x + 15,
        y
    );

    ctx.lineTo(
        x + 55,
        y - 15
    );

    ctx.stroke();

    ctx.restore();

}


/* =========================================
   GOALKEEPER POV
========================================= */

function drawKeeperView(width, height) {

    ctx.save();

    const gradient =
        ctx.createRadialGradient(
            width / 2,
            height / 2,
            20,
            width / 2,
            height / 2,
            height
        );

    gradient.addColorStop(
        0,
        "rgba(0,0,0,0)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0.45)"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    ctx.restore();

}


/* =========================================
   AIM
========================================= */

function resetAim() {

    state.selectedTarget = {
        x: 0.5,
        y: 0.25
    };

    updateAimMarker();

}


function moveAim(dx, dy) {

    state.selectedTarget.x += dx;
    state.selectedTarget.y += dy;

    state.selectedTarget.x =
        Math.max(
            0.08,
            Math.min(
                0.92,
                state.selectedTarget.x
            )
        );

    state.selectedTarget.y =
        Math.max(
            0.08,
            Math.min(
                0.65,
                state.selectedTarget.y
            )
        );

    updateAimMarker();

}


function updateAimMarker() {

    const marker =
        document.getElementById(
            "aimMarker"
        );

    if (!marker) {
        return;
    }

    marker.style.left =
        state.selectedTarget.x * 100 +
        "%";

    marker.style.top =
        state.selectedTarget.y * 100 +
        "%";

}


/* =========================================
   PITCH POINTER
========================================= */

function handlePitchPointer(event) {

    if (
        state.shooting ||
        state.mode === "goalkeeping"
    ) {
        return;
    }

    const rect =
        canvas.getBoundingClientRect();

    state.selectedTarget.x =
        (event.clientX - rect.left) /
        rect.width;

    state.selectedTarget.y =
        (event.clientY - rect.top) /
        rect.height;

    state.selectedTarget.x =
        Math.max(
            0.05,
            Math.min(
                0.95,
                state.selectedTarget.x
            )
        );

    state.selectedTarget.y =
        Math.max(
            0.05,
            Math.min(
                0.65,
                state.selectedTarget.y
            )
        );

    updateAimMarker();

    document.getElementById(
        "pitchMessage"
    ).textContent =
        "TARGET LOCKED";

}


/* =========================================
   POWER
========================================= */

function startPowerMeter() {

    state.power = 0;
    state.powerDirection = 1;

    const interval =
        setInterval(() => {

            if (!state.shooting) {
                clearInterval(interval);
                return;
            }

            state.power +=
                state.powerDirection * 2.5;

            if (state.power >= 100) {
                state.power = 100;
                state.powerDirection = -1;
            }

            if (state.power <= 0) {
                state.power = 0;
                state.powerDirection = 1;
            }

            updatePower();

        }, 30);

}


function updatePower() {

    document.getElementById(
        "powerFill"
    ).style.width =
        state.power + "%";

    document.getElementById(
        "powerDisplay"
    ).textContent =
        Math.round(state.power) + "%";

}


/* =========================================
   SHOOT
========================================= */

function shoot() {

    if (state.shooting) {
        return;
    }

    state.shooting = true;

    state.power =
        Math.max(
            25,
            state.power
        );

    const power =
        state.power;

    const accuracy =
        state.selectedPlayer.accuracy;

    const curve =
        state.selectedPlayer.curve;

    const targetQuality =
        calculateTargetQuality();

    const difficultyPenalty =
        getDifficultyPenalty();

    let chance =
        0.35 +
        (accuracy / 100) * 0.25 +
        (targetQuality * 0.35) +
        (power / 100) * 0.15 -
        difficultyPenalty;

    if (
        state.mode === "freeKick" &&
        state.selectedPlayer.id === "yamal"
    ) {
        chance += 0.18;
    }

    if (
        state.mode === "penalty" &&
        state.selectedPlayer.id === "bellingham"
    ) {
        chance += 0.18;
    }

    if (
        state.selectedPlayer.id === "haaland" &&
        power >= 85
    ) {
        chance += 0.18;
    }

    chance =
        Math.max(
            0.05,
            Math.min(
                0.98,
                chance
            )
        );

    animateBall(
        power,
        curve,
        chance
    );

}


/* =========================================
   TARGET QUALITY
========================================= */

function calculateTargetQuality() {

    const x =
        state.selectedTarget.x;

    const y =
        state.selectedTarget.y;

    const centerDistance =
        Math.sqrt(
            Math.pow(
                x - 0.5,
                2
            ) +
            Math.pow(
                y - 0.25,
                2
            )
        );

    return Math.max(
        0,
        1 - centerDistance * 1.6
    );

}


/* =========================================
   DIFFICULTY
========================================= */

function getDifficultyPenalty() {

    if (state.difficulty === "easy") {
        return 0;
    }

    if (state.difficulty === "hard") {
        return 0.14;
    }

    if (state.difficulty === "expert") {
        return 0.24;
    }

    return 0.07;

}


/* =========================================
   BALL ANIMATION
========================================= */

function animateBall(
    power,
    curve,
    chance
) {

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    const startX =
        width / 2;

    const startY =
        height * 0.82;

    const targetX =
        state.selectedTarget.x *
        width;

    const targetY =
        state.selectedTarget.y *
        height;

    const duration =
        Math.max(
            400,
            1000 -
            power * 3
        );

    const startTime =
        performance.now();

    const scored =
        Math.random() < chance;

    function frame(now) {

        const elapsed =
            now - startTime;

        const progress =
            Math.min(
                1,
                elapsed / duration
            );

        drawPitch();

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        const curveAmount =
            Math.sin(
                progress * Math.PI
            ) *
            (curve / 100) *
            70;

        const x =
            startX +
            (targetX - startX) *
            eased +
            curveAmount;

        const y =
            startY +
            (targetY - startY) *
            eased;

        drawBall(
            x,
            y,
            progress
        );

        if (progress < 1) {

            requestAnimationFrame(
                frame
            );

        } else {

            finishShot(
                scored
            );

        }

    }

    requestAnimationFrame(
        frame
    );

}


/* =========================================
   BALL
========================================= */

function drawBall(
    x,
    y,
    progress
) {

    const size =
        Math.max(
            7,
            18 -
            progress * 10
        );

    ctx.save();

    ctx.shadowColor =
        "rgba(0,0,0,0.5)";

    ctx.shadowBlur = 12;

    ctx.fillStyle =
        "#ffffff";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        size,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.strokeStyle =
        "#1c1c1c";

    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.restore();

}


/* =========================================
   FINISH SHOT
========================================= */

function finishShot(scored) {

    state.shooting = false;

    if (scored) {

        const basePoints =
            state.mode === "penalty"
                ? 100
                : 120;

        const distanceBonus =
            Math.round(
                state.distance * 3
            );

        const powerBonus =
            Math.round(
                state.power
            );

        const points =
            basePoints +
            distanceBonus +
            powerBonus;

        state.score += points;

        state.coins +=
            Math.round(points / 10);

        state.xp +=
            Math.round(points / 4);

        showResult(
            true,
            points
        );

    } else {

        showResult(
            false,
            0
        );

    }

    saveProgress();

    updateUI();

}


/* =========================================
   RESULT
========================================= */

function showResult(
    success,
    points
) {

    const icon =
        document.getElementById(
            "resultIcon"
        );

    const title =
        document.getElementById(
            "resultTitle"
        );

    const message =
        document.getElementById(
            "resultMessage"
        );

    if (success) {

        icon.textContent = "⚽";

        title.textContent = "GOAL!";

        message.textContent =
            getGoalMessage();

    } else {

        icon.textContent = "🧤";

        title.textContent = "SAVED!";

        message.textContent =
            getMissMessage();

    }

    document.getElementById(
        "resultScore"
    ).textContent =
        points;

    document.getElementById(
        "resultXP"
    ).textContent =
        success
            ? Math.round(points / 4)
            : 10;

    document.getElementById(
        "resultCoins"
    ).textContent =
        success
            ? Math.round(points / 10)
            : 0;

    document.getElementById(
        "nextAttemptButton"
    ).textContent =
        state.attempt >= state.maxAttempts
            ? "FINISH LEVEL"
            : "NEXT ATTEMPT";

    showScreen("resultScreen");

}


/* =========================================
   MESSAGES
========================================= */

function getGoalMessage() {

    if (
        state.mode === "freeKick"
    ) {

        if (
            state.selectedPlayer.id ===
            "yamal"
        ) {
            return "What a free kick! The specialist delivers.";
        }

        return "Beautiful free kick into the net!";
    }

    if (
        state.mode === "penalty"
    ) {

        if (
            state.selectedPlayer.id ===
            "bellingham"
        ) {
            return "Ice-cold from the penalty spot!";
        }

        return "Perfect penalty!";
    }

    return "Brilliant save!";

}


function getMissMessage() {

    const messages = [

        "The goalkeeper read it perfectly.",

        "So close! Try another corner.",

        "The shot missed the target.",

        "The defence survived this time."

    ];

    return messages[
        Math.floor(
            Math.random() *
            messages.length
        )
    ];

}


/* =========================================
   NEXT ATTEMPT
========================================= */

function nextAttempt() {

    if (
        state.attempt >=
        state.maxAttempts
    ) {

        finishLevel();

        return;

    }

    state.attempt++;

    state.distance =
        getStartingDistance() +
        Math.floor(
            Math.random() * 5
        );

    state.power = 0;

    state.shooting = false;

    resetAim();

    showScreen("gameScreen");

    updateUI();

    drawPitch();

}


/* =========================================
   LEVEL
========================================= */

function finishLevel() {

    state.level++;

    state.coins +=
        50 +
        state.level * 10;

    state.xp +=
        100;

    state.attempt = 1;

    state.distance =
        getStartingDistance();

    showNotification(
        "LEVEL " +
        state.level +
        " UNLOCKED!"
    );

    showScreen("homeScreen");

    saveProgress();

    updateUI();

}


/* =========================================
   LONG SHOT
========================================= */

function activateLongShot() {

    if (
        state.shooting ||
        state.mode !== "freeKick"
    ) {
        return;
    }

    state.distance += 10;

    state.selectedTarget.y =
        Math.min(
            0.5,
            state.selectedTarget.y + 0.05
        );

    updateAimMarker();

    showNotification(
        "💥 LONG SHOT MODE!"
    );

    updateUI();

}


/* =========================================
   DIFFICULTY
========================================= */

function cycleDifficulty() {

    const levels = [
        "easy",
        "normal",
        "hard",
        "expert"
    ];

    const current =
        levels.indexOf(
            state.difficulty
        );

    state.difficulty =
        levels[
            (current + 1) %
            levels.length
        ];

    document.getElementById(
        "difficultySetting"
    ).textContent =
        capitalize(
            state.difficulty
        );

    document.getElementById(
        "difficultyLabel"
    ).textContent =
        state.difficulty.toUpperCase();

    saveProgress();

}


/* =========================================
   SOUND
========================================= */

function toggleSound() {

    state.sound =
        !state.sound;

    const button =
        document.querySelector(
            ".toggle"
        );

    button.classList.toggle(
        "active",
        state.sound
    );

    button.textContent =
        state.sound
            ? "ON"
            : "OFF";

    saveProgress();

}


/* =========================================
   UI
========================================= */

function updateUI() {

    document.getElementById(
        "levelDisplay"
    ).textContent =
        state.level;

    document.getElementById(
        "scoreDisplay"
    ).textContent =
        state.score;

    document.getElementById(
        "coinsDisplay"
    ).textContent =
        state.coins;

    document.getElementById(
        "gameScore"
    ).textContent =
        state.score;

    document.getElementById(
        "distanceDisplay"
    ).textContent =
        state.distance +
        "m";

    document.getElementById(
        "attemptDisplay"
    ).textContent =
        state.attempt +
        " / " +
        state.maxAttempts;

    document.getElementById(
        "difficultySetting"
    ).textContent =
        capitalize(
            state.difficulty
        );

    updatePower();

}


/* =========================================
   NOTIFICATION
========================================= */

let notificationTimer = null;


function showNotification(message) {

    const element =
        document.getElementById(
            "notification"
        );

    element.textContent =
        message;

    element.classList.add(
        "show"
    );

    clearTimeout(
        notificationTimer
    );

    notificationTimer =
        setTimeout(
            () => {

                element.classList.remove(
                    "show"
                );

            },
            1800
        );

}


/* =========================================
   SAVE
========================================= */

function saveProgress() {

    const data = {

        level: state.level,

        score: state.score,

        coins: state.coins,

        xp: state.xp,

        difficulty:
            state.difficulty,

        sound:
            state.sound,

        playerId:
            state.selectedPlayer.id

    };

    localStorage.setItem(
        "footballMastersSave",
        JSON.stringify(data)
    );

}


/* =========================================
   LOAD
========================================= */

function loadProgress() {

    const saved =
        localStorage.getItem(
            "footballMastersSave"
        );

    if (!saved) {
        return;
    }

    try {

        const data =
            JSON.parse(saved);

        state.level =
            Number(data.level) || 1;

        state.score =
            Number(data.score) || 0;

        state.coins =
            Number(data.coins) || 100;

        state.xp =
            Number(data.xp) || 0;

        state.difficulty =
            data.difficulty ||
            "normal";

        state.sound =
            data.sound !== false;

        const player =
            players.find(
                p =>
                    p.id ===
                    data.playerId
            );

        if (player) {
            state.selectedPlayer =
                player;
        }

    } catch (error) {

        console.warn(
            "Save data could not be loaded.",
            error
        );

    }

}


/* =========================================
   RESET
========================================= */

function resetProgress() {

    const confirmed =
        window.confirm(
            "Reset all Football Masters progress?"
        );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        "footballMastersSave"
    );

    state.level = 1;
    state.score = 0;
    state.coins = 100;
    state.xp = 0;
    state.difficulty = "normal";
    state.selectedPlayer =
        players[0];

    updateUI();

    showNotification(
        "Progress reset."
    );

}


/* =========================================
   UTILITY
========================================= */

function capitalize(value) {

    return value.charAt(0).toUpperCase() +
           value.slice(1);

}


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            state.screen !==
            "gameScreen"
        ) {
            return;
        }

        if (event.key === "ArrowLeft") {

            moveAim(-0.04, 0);

        }

        if (event.key === "ArrowRight") {

            moveAim(0.04, 0);

        }

        if (event.key === "ArrowUp") {

            moveAim(0, -0.04);

        }

        if (event.key === "ArrowDown") {

            moveAim(0, 0.04);

        }

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            shoot();

        }

    }
);


/* =========================================
   POWER METER START
========================================= */

document.getElementById(
    "shootButton"
).addEventListener(
    "pointerdown",
    () => {

        if (
            state.shooting
        ) {
            return;
        }

        state.shooting = true;

        startPowerMeter();

    }
);


/* =========================================
   SAFETY RELEASE
========================================= */

window.addEventListener(
    "pointerup",
    () => {

        if (
            state.shooting &&
            state.power > 5
        ) {

            shoot();

        }

    }
);


/* =========================================
   GAME LOOP
========================================= */

function gameLoop() {

    if (
        state.screen ===
        "gameScreen"
    ) {

        updateAimMarker();

    }

    requestAnimationFrame(
        gameLoop
    );

}

gameLoop();
