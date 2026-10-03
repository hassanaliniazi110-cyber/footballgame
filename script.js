"use strict";

/* =====================================================
   FOOTBALL MASTERS
   ADVANCED GAME ENGINE
===================================================== */


/* =====================================================
   PLAYER DATABASE
===================================================== */

const PLAYERS = [

    {
        id: "hassan",
        name: "Hassan Ali",
        role: "Goalkeeper",
        rating: 300,
        power: 300,
        curve: 300,
        accuracy: 300,
        reflex: 300,
        specialty: "Ultimate Goalkeeper",
        icon: "🧤"
    },

    {
        id: "ehan",
        name: "Ehan Ali",
        role: "Goalkeeper",
        rating: 98,
        power: 82,
        curve: 78,
        accuracy: 85,
        reflex: 97,
        specialty: "Reflex Specialist",
        icon: "🧤"
    },

    {
        id: "umar",
        name: "Umar Shoaib",
        role: "Attacker",
        rating: 94,
        power: 93,
        curve: 86,
        accuracy: 91,
        reflex: 78,
        specialty: "Power Finisher",
        icon: "⚡"
    },

    {
        id: "arham",
        name: "Muhammad Arham",
        role: "Midfielder",
        rating: 91,
        power: 84,
        curve: 91,
        accuracy: 95,
        reflex: 80,
        specialty: "Technical Player",
        icon: "🎯"
    },

    {
        id: "ronaldo",
        name: "Cristiano Ronaldo",
        role: "Forward",
        rating: 96,
        power: 97,
        curve: 92,
        accuracy: 95,
        reflex: 86,
        specialty: "Elite Finisher",
        icon: "⭐"
    },

    {
        id: "haaland",
        name: "Erling Haaland",
        role: "Forward",
        rating: 95,
        power: 100,
        curve: 80,
        accuracy: 91,
        reflex: 77,
        specialty: "Long Shot Specialist",
        icon: "💥"
    },

    {
        id: "bellingham",
        name: "Jude Bellingham",
        role: "Midfielder",
        rating: 94,
        power: 88,
        curve: 92,
        accuracy: 99,
        reflex: 88,
        specialty: "Penalty Specialist",
        icon: "🎯"
    },

    {
        id: "yamal",
        name: "Lamine Yamal",
        role: "Winger",
        rating: 94,
        power: 86,
        curve: 99,
        accuracy: 97,
        reflex: 94,
        specialty: "Free Kick Specialist",
        icon: "🌀"
    }

];


/* =====================================================
   GAME CONFIG
===================================================== */

const CONFIG = {

    maxAttempts: 5,

    startingCoins: 100,

    freeKickBaseDistance: 22,

    penaltyDistance: 11,

    goalWidthRatio: 0.52,

    goalHeight: 0.18,

    wallPlayers: 5,

    animationTime: 850

};


/* =====================================================
   GAME STATE
===================================================== */

const game = {

    screen: "homeScreen",

    mode: "freeKick",

    difficulty: "normal",

    level: 1,

    score: 0,

    coins: CONFIG.startingCoins,

    xp: 0,

    attempt: 1,

    distance: CONFIG.freeKickBaseDistance,

    selectedPlayer: PLAYERS[0],

    aimX: 0.5,

    aimY: 0.27,

    power: 0,

    powerDirection: 1,

    powerTimer: null,

    shotActive: false,

    animationId: null,

    currentShot: null,

    sound: true,

    longShot: false,

    modalPlayer: null,

    goalkeeperTarget: null,

    lastShotWasGoal: false

};


/* =====================================================
   DOM REFERENCES
===================================================== */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    Array.from(document.querySelectorAll(selector));


const canvas = $("#gameCanvas");

const ctx =
    canvas.getContext("2d");


/* =====================================================
   SCREEN MANAGEMENT
===================================================== */

function showScreen(id) {

    $$(".screen").forEach(screen => {

        screen.classList.remove("active");

    });

    const target =
        document.getElementById(id);

    if (!target) {
        return;
    }

    target.classList.add("active");

    game.screen = id;

    if (id === "gameScreen") {

        requestAnimationFrame(() => {

            resizeCanvas();

            drawScene();

        });

    }

}


/* =====================================================
   INITIALIZATION
===================================================== */

function init() {

    loadSave();

    renderPlayers();

    bindEvents();

    updateAllUI();

    resizeCanvas();

    showScreen("homeScreen");

}


document.addEventListener(
    "DOMContentLoaded",
    init
);


/* =====================================================
   EVENT BINDING
===================================================== */

function bindEvents() {

    $$(".mode-card").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                startMode(
                    button.dataset.mode
                );

            }
        );

    });


    $("#playersButton").addEventListener(
        "click",
        () => showScreen("playersScreen")
    );


    $("#settingsButton").addEventListener(
        "click",
        () => showScreen("settingsScreen")
    );


    $$("[data-screen]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showScreen(
                    button.dataset.screen
                );

            }
        );

    });


    $("#exitGameButton").addEventListener(
        "click",
        exitGame
    );


    /*
       IMPORTANT:
       There is now only ONE shoot event.
       The old broken pointerdown/pointerup
       combination has been removed.
    */

    $("#shootButton").addEventListener(
        "click",
        shoot
    );


    $("#leftAim").addEventListener(
        "click",
        () => moveAim(-0.05, 0)
    );


    $("#rightAim").addEventListener(
        "click",
        () => moveAim(0.05, 0)
    );


    $("#upAim").addEventListener(
        "click",
        () => moveAim(0, -0.05)
    );


    $("#downAim").addEventListener(
        "click",
        () => moveAim(0, 0.05)
    );


    $("#longShotButton").addEventListener(
        "click",
        activateLongShot
    );


    $("#gameCanvas").addEventListener(
        "pointerdown",
        handlePitchTap
    );


    $$(".dive-button").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                goalkeeperDive(
                    button.dataset.dive
                );

            }
        );

    });


    $("#nextButton").addEventListener(
        "click",
        nextAttempt
    );


    $("#resultHomeButton").addEventListener(
        "click",
        () => showScreen("homeScreen")
    );


    $("#closeModal").addEventListener(
        "click",
        closeModal
    );


    $("#selectPlayerButton").addEventListener(
        "click",
        selectModalPlayer
    );


    $("#soundToggle").addEventListener(
        "click",
        toggleSound
    );


    $("#difficultyButton").addEventListener(
        "click",
        cycleDifficulty
    );


    $("#resetButton").addEventListener(
        "click",
        resetProgress
    );


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    document.addEventListener(
        "keydown",
        handleKeyboard
    );

}


/* =====================================================
   PLAYER SYSTEM
===================================================== */

function renderPlayers() {

    const grid =
        $("#playersGrid");

    grid.innerHTML = "";

    PLAYERS.forEach(player => {

        const card =
            document.createElement("button");

        card.className =
            "player-card";

        card.innerHTML = `

            <div class="player-icon">
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

                <div class="player-specialty">
                    ${player.specialty}
                </div>
            </div>

        `;

        card.addEventListener(
            "click",
            () => openPlayerModal(player)
        );

        grid.appendChild(card);

    });

}


/* =====================================================
   PLAYER MODAL
===================================================== */

function openPlayerModal(player) {

    game.modalPlayer = player;

    $("#modalIcon").textContent =
        player.icon;

    $("#modalName").textContent =
        player.name;

    $("#modalRole").textContent =
        player.role;

    $("#modalSpecialty").textContent =
        player.specialty;

    const stats = [

        ["POWER", player.power],
        ["CURVE", player.curve],
        ["ACCURACY", player.accuracy],
        ["REFLEXES", player.reflex]

    ];

    $("#modalStats").innerHTML =
        stats.map(
            ([name, value]) => {

                const width =
                    Math.min(
                        100,
                        (value / 300) * 100
                    );

                return `

                    <div class="stat-row">

                        <span>
                            ${name}
                        </span>

                        <div class="stat-track">

                            <div
                                class="stat-fill"
                                style="
                                    width:${width}%;
                                "
                            ></div>

                        </div>

                        <b class="stat-number">
                            ${value}
                        </b>

                    </div>

                `;

            }
        ).join("");

    $("#playerModal")
        .classList
        .remove("hidden");

}


function closeModal() {

    $("#playerModal")
        .classList
        .add("hidden");

}


function selectModalPlayer() {

    if (!game.modalPlayer) {
        return;
    }

    game.selectedPlayer =
        game.modalPlayer;

    closeModal();

    updateAllUI();

    notify(
        `${game.selectedPlayer.name} selected`
    );

}


/* =====================================================
   START MODE
===================================================== */

function startMode(mode) {

    game.mode = mode;

    game.attempt = 1;

    game.longShot = false;

    game.shotActive = false;

    game.power = 0;

    game.distance =
        getStartingDistance();

    game.aimX = 0.5;

    game.aimY =
        mode === "penalty"
            ? 0.25
            : 0.30;

    game.goalkeeperTarget =
        null;

    $("#gameMode").textContent =
        modeName(mode);

    $("#gameDifficulty").textContent =
        game.difficulty.toUpperCase();

    $("#shootControls")
        .classList
        .toggle(
            "hidden",
            mode === "goalkeeping"
        );

    $("#keeperControls")
        .classList
        .toggle(
            "hidden",
            mode !== "goalkeeping"
        );

    $("#powerContainer")
        .classList
        .toggle(
            "hidden",
            mode === "goalkeeping"
        );

    showScreen("gameScreen");

    updateAimPoint();

    updateAllUI();

    drawScene();

}


/* =====================================================
   MODE HELPERS
===================================================== */

function modeName(mode) {

    if (mode === "freeKick") {
        return "FREE KICK";
    }

    if (mode === "penalty") {
        return "PENALTY";
    }

    return "GOALKEEPING";

}


function getStartingDistance() {

    if (game.mode === "penalty") {
        return CONFIG.penaltyDistance;
    }

    if (game.mode === "goalkeeping") {
        return CONFIG.penaltyDistance;
    }

    return CONFIG.freeKickBaseDistance +
        ((game.level - 1) * 2);

}


/* =====================================================
   CANVAS RESIZE
===================================================== */

function resizeCanvas() {

    if (!canvas) {
        return;
    }

    const rect =
        canvas.getBoundingClientRect();

    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {
        return;
    }

    const ratio =
        Math.max(
            1,
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );

    canvas.width =
        Math.round(
            rect.width * ratio
        );

    canvas.height =
        Math.round(
            rect.height * ratio
        );

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );

    drawScene();

}


/* =====================================================
   DRAW ENTIRE SCENE
===================================================== */

function drawScene() {

    if (
        game.screen !== "gameScreen"
    ) {
        return;
    }

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    if (!width || !height) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    drawField(
        width,
        height
    );

    if (
        game.mode === "freeKick"
    ) {

        drawWall(
            width,
            height
        );

    }

    if (
        game.mode === "penalty"
    ) {

        drawPenaltyKeeper(
            width,
            height
        );

    }

    if (
        game.mode === "goalkeeping"
    ) {

        drawGoalkeeperPerspective(
            width,
            height
        );

    }

    drawGoal(
        width,
        height
    );

}


/* =====================================================
   FIELD
===================================================== */

function drawField(width, height) {

    ctx.save();

    const stripe =
        Math.max(
            50,
            width / 12
        );

    for (
        let x = 0;
        x < width;
        x += stripe
    ) {

        ctx.fillStyle =
            Math.floor(x / stripe) % 2 === 0
                ? "#157b3e"
                : "#117139";

        ctx.fillRect(
            x,
            0,
            stripe + 1,
            height
        );

    }

    ctx.strokeStyle =
        "rgba(255,255,255,0.7)";

    ctx.lineWidth = 2;

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
        65,
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
        centerX - 90,
        0,
        180,
        70
    );

    ctx.restore();

}


/* =====================================================
   GOAL
===================================================== */

function drawGoal(width, height) {

    const goalWidth =
        Math.min(
            width * CONFIG.goalWidthRatio,
            430
        );

    const goalHeight =
        Math.min(
            120,
            height * 0.20
        );

    const x =
        (width - goalWidth) / 2;

    const y = 5;

    ctx.save();

    ctx.strokeStyle = "#ffffff";

    ctx.lineWidth = 6;

    ctx.strokeRect(
        x,
        y,
        goalWidth,
        goalHeight
    );

    ctx.strokeStyle =
        "rgba(255,255,255,0.28)";

    ctx.lineWidth = 1;

    const verticalLines = 12;

    const horizontalLines = 5;

    for (
        let i = 1;
        i < verticalLines;
        i++
    ) {

        const gx =
            x +
            (goalWidth / verticalLines) * i;

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
        let i = 1;
        i < horizontalLines;
        i++
    ) {

        const gy =
            y +
            (goalHeight / horizontalLines) * i;

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


/* =====================================================
   FREE-KICK WALL
===================================================== */

function drawWall(width, height) {

    const y =
        height * 0.39;

    const wallWidth =
        Math.min(
            width * 0.55,
            420
        );

    const start =
        (width - wallWidth) / 2;

    for (
        let i = 0;
        i < CONFIG.wallPlayers;
        i++
    ) {

        const x =
            start +
            (wallWidth /
                (CONFIG.wallPlayers - 1)) *
            i;

        drawWallPlayer(
            x,
            y
        );

    }

}


function drawWallPlayer(x, y) {

    ctx.save();

    ctx.fillStyle =
        "#1d281f";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 29,
        12,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
        x - 12,
        y - 17,
        24,
        38
    );

    ctx.fillRect(
        x - 19,
        y - 10,
        7,
        30
    );

    ctx.fillRect(
        x + 12,
        y - 10,
        7,
        30
    );

    ctx.fillRect(
        x - 9,
        y + 21,
        7,
        28
    );

    ctx.fillRect(
        x + 2,
        y + 21,
        7,
        28
    );

    ctx.restore();

}


/* =====================================================
   PENALTY KEEPER
===================================================== */

function drawPenaltyKeeper(width, height) {

    const x =
        width / 2;

    const y = 70;

    const dive =
        game.currentShot?.keeperDirection;

    let offset = 0;

    if (dive === "left") {
        offset = -70;
    }

    if (dive === "right") {
        offset = 70;
    }

    ctx.save();

    ctx.fillStyle =
        "#ffbf38";

    ctx.beginPath();

    ctx.arc(
        x + offset,
        y - 28,
        13,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
        x + offset - 17,
        y - 14,
        34,
        45
    );

    ctx.strokeStyle =
        "#ffbf38";

    ctx.lineWidth = 9;

    ctx.beginPath();

    ctx.moveTo(
        x + offset - 14,
        y
    );

    ctx.lineTo(
        x + offset - 55,
        y - 16
    );

    ctx.moveTo(
        x + offset + 14,
        y
    );

    ctx.lineTo(
        x + offset + 55,
        y - 16
    );

    ctx.stroke();

    ctx.restore();

}


/* =====================================================
   GOALKEEPER VIEW
===================================================== */

function drawGoalkeeperPerspective(
    width,
    height
) {

    ctx.save();

    const gradient =
        ctx.createRadialGradient(
            width / 2,
            height * 0.43,
            20,
            width / 2,
            height * 0.43,
            height
        );

    gradient.addColorStop(
        0,
        "rgba(0,0,0,0)"
    );

    gradient.addColorStop(
        0.65,
        "rgba(0,0,0,0.08)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0.5)"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    /*
       Goalkeeper gloves / arms
       are drawn near the bottom
       to create a simple GK POV.
    */

    ctx.strokeStyle =
        "rgba(255,190,50,0.9)";

    ctx.lineWidth = 18;

    ctx.beginPath();

    ctx.moveTo(
        width * 0.15,
        height
    );

    ctx.lineTo(
        width * 0.28,
        height * 0.75
    );

    ctx.moveTo(
        width * 0.85,
        height
    );

    ctx.lineTo(
        width * 0.72,
        height * 0.75
    );

    ctx.stroke();

    ctx.restore();

}


/* =====================================================
   AIM POINT
===================================================== */

function updateAimPoint() {

    const point =
        $("#aimPoint");

    point.style.left =
        `${game.aimX * 100}%`;

    point.style.top =
        `${game.aimY * 100}%`;

}


/* =====================================================
   MOVE AIM
===================================================== */

function moveAim(dx, dy) {

    if (
        game.shotActive ||
        game.mode === "goalkeeping"
    ) {
        return;
    }

    game.aimX += dx;

    game.aimY += dy;

    game.aimX =
        clamp(
            game.aimX,
            0.04,
            0.96
        );

    game.aimY =
        clamp(
            game.aimY,
            0.05,
            0.72
        );

    updateAimPoint();

    $("#shotMessage").textContent =
        "TARGET LOCKED";

}


/* =====================================================
   PITCH TAP
===================================================== */

function handlePitchTap(event) {

    if (
        game.shotActive ||
        game.mode === "goalkeeping"
    ) {
        return;
    }

    const rect =
        canvas.getBoundingClientRect();

    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {
        return;
    }

    game.aimX =
        (event.clientX - rect.left) /
        rect.width;

    game.aimY =
        (event.clientY - rect.top) /
        rect.height;

    game.aimX =
        clamp(
            game.aimX,
            0.04,
            0.96
        );

    game.aimY =
        clamp(
            game.aimY,
            0.05,
            0.72
        );

    updateAimPoint();

    $("#shotMessage").textContent =
        "TARGET LOCKED";

}


/* =====================================================
   LONG SHOT
===================================================== */

function activateLongShot() {

    if (
        game.shotActive ||
        game.mode !== "freeKick"
    ) {
        return;
    }

    game.longShot =
        !game.longShot;

    if (game.longShot) {

        game.distance += 10;

        notify(
            "💥 LONG SHOT ACTIVATED"
        );

        $("#longShotButton").textContent =
            "💥 LONG SHOT ON";

    } else {

        game.distance =
            getStartingDistance();

        $("#longShotButton").textContent =
            "💥 LONG SHOT";

    }

    updateAllUI();

}


/* =====================================================
   POWER CALCULATION
===================================================== */

function getShotPower() {

    if (game.mode === "penalty") {
        return 72;
    }

    if (game.mode === "freeKick") {

        let power =
            game.selectedPlayer.power;

        if (
            game.selectedPlayer.id ===
            "haaland"
        ) {
            power += 25;
        }

        if (game.longShot) {
            power += 15;
        }

        return clamp(
            power,
            25,
            100
        );

    }

    return 0;

}


/* =====================================================
   SHOOT
===================================================== */

function shoot() {

    /*
       THIS FUNCTION IS NOW THE ONLY PLACE
       WHERE A SHOOTING ATTEMPT STARTS.

       No pointerdown state conflict.
    */

    if (
        game.shotActive ||
        game.mode === "goalkeeping"
    ) {
        return;
    }

    game.shotActive = true;

    const power =
        getShotPower();

    game.power = power;

    updatePowerUI();

    const result =
        calculateShotResult();

    game.currentShot =
        result;

    animateShot(
        result,
        power
    );

}


/* =====================================================
   SHOT RESULT CALCULATION
===================================================== */

function calculateShotResult() {

    const targetQuality =
        calculateTargetQuality();

    const player =
        game.selectedPlayer;

    const difficulty =
        difficultyPenalty();

    let chance =
        0.40;

    chance +=
        (normalizeStat(
            player.accuracy
        ) * 0.28);

    chance +=
        targetQuality * 0.28;

    chance -=
        difficulty;

    if (
        game.mode === "freeKick" &&
        player.id === "yamal"
    ) {

        chance += 0.20;

    }

    if (
        game.mode === "penalty" &&
        player.id === "bellingham"
    ) {

        chance += 0.20;

    }

    if (
        player.id === "haaland" &&
        game.longShot
    ) {

        chance += 0.16;

    }

    const keeperStrength =
        getKeeperStrength();

    chance -=
        keeperStrength;

    chance =
        clamp(
            chance,
            0.08,
            0.97
        );

    const goal =
        Math.random() < chance;

    const keeperDirection =
        chooseKeeperDirection();

    return {

        goal,

        chance,

        targetX:
            game.aimX,

        targetY:
            game.aimY,

        keeperDirection

    };

}


/* =====================================================
   TARGET QUALITY
===================================================== */

function calculateTargetQuality() {

    const dx =
        game.aimX - 0.5;

    const dy =
        game.aimY - 0.22;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    /*
       Slightly farther from the center
       gives a better target bonus.
    */

    const cornerBonus =
        Math.min(
            1,
            distance * 1.5
        );

    return clamp(
        0.35 + cornerBonus,
        0,
        1
    );

}


/* =====================================================
   KEEPER STRENGTH
===================================================== */

function getKeeperStrength() {

    if (
        game.mode === "freeKick"
    ) {

        return (
            0.04 +
            game.level * 0.006
        );

    }

    if (
        game.mode === "penalty"
    ) {

        if (
            game.difficulty ===
            "easy"
        ) {
            return 0.04;
        }

        if (
            game.difficulty ===
            "hard"
        ) {
            return 0.13;
        }

        if (
            game.difficulty ===
            "expert"
        ) {
            return 0.20;
        }

        return 0.09;

    }

    return 0;

}


/* =====================================================
   KEEPER DIRECTION
===================================================== */

function chooseKeeperDirection() {

    const random =
        Math.random();

    if (random < 0.34) {
        return "left";
    }

    if (random < 0.68) {
        return "center";
    }

    return "right";

}


/* =====================================================
   SHOT ANIMATION
===================================================== */

function animateShot(
    result,
    power
) {

    cancelAnimationFrame(
        game.animationId
    );

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    const startX =
        width / 2;

    const startY =
        height * 0.84;

    const targetX =
        result.targetX * width;

    const targetY =
        result.targetY * height;

    const startTime =
        performance.now();

    const duration =
        clamp(
            CONFIG.animationTime -
            power * 2.2,
            420,
            900
        );

    function frame(now) {

        const elapsed =
            now - startTime;

        const progress =
            clamp(
                elapsed / duration,
                0,
                1
            );

        drawScene();

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        let curve =
            0;

        if (
            game.mode === "freeKick"
        ) {

            curve =
                Math.sin(
                    progress * Math.PI
                ) *
                normalizeStat(
                    game.selectedPlayer.curve
                ) *
                90;

        }

        const x =
            startX +
            (targetX - startX) *
            eased +
            curve;

        const y =
            startY +
            (targetY - startY) *
            eased;

        drawBall(
            x,
            y,
            progress
        );

        if (
            progress < 1
        ) {

            game.animationId =
                requestAnimationFrame(
                    frame
                );

        } else {

            finishShot(
                result
            );

        }

    }

    game.animationId =
        requestAnimationFrame(
            frame
        );

}


/* =====================================================
   BALL
===================================================== */

function drawBall(
    x,
    y,
    progress
) {

    const radius =
        Math.max(
            6,
            17 -
            progress * 10
        );

    ctx.save();

    ctx.shadowColor =
        "rgba(0,0,0,0.55)";

    ctx.shadowBlur = 13;

    ctx.fillStyle =
        "#ffffff";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.strokeStyle =
        "#111111";

    ctx.lineWidth = 2;

    ctx.stroke();

    /*
       Simple ball pattern.
    */

    ctx.fillStyle =
        "#171717";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        radius * 0.25,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

}


/* =====================================================
   FINISH SHOT
===================================================== */

function finishShot(result) {

    game.shotActive = false;

    game.lastShotWasGoal =
        result.goal;

    if (
        result.goal
    ) {

        const points =
            calculatePoints();

        game.score +=
            points;

        const earnedXP =
            Math.round(
                points * 0.3
            );

        const earnedCoins =
            Math.max(
                5,
                Math.round(
                    points / 15
                )
            );

        game.xp +=
            earnedXP;

        game.coins +=
            earnedCoins;

        showResult(
            true,
            points,
            earnedXP,
            earnedCoins
        );

    } else {

        showResult(
            false,
            0,
            10,
            0
        );

    }

    saveProgress();

    updateAllUI();

}


/* =====================================================
   POINT CALCULATION
===================================================== */

function calculatePoints() {

    let points = 100;

    points +=
        game.distance * 4;

    points +=
        Math.round(
            normalizeStat(
                game.selectedPlayer.power
            ) * 40
        );

    points +=
        Math.round(
            calculateTargetQuality() * 70
        );

    if (game.longShot) {
        points += 80;
    }

    if (
        game.mode === "penalty"
    ) {
        points += 25;
    }

    if (
        game.mode === "freeKick" &&
        game.selectedPlayer.id ===
        "yamal"
    ) {
        points += 75;
    }

    if (
        game.mode === "penalty" &&
        game.selectedPlayer.id ===
        "bellingham"
    ) {
        points += 75;
    }

    return Math.round(points);

}


/* =====================================================
   RESULT SCREEN
===================================================== */

function showResult(
    goal,
    points,
    xp,
    coins
) {

    if (goal) {

        $("#resultIcon").textContent =
            "⚽";

        $("#resultTitle").textContent =
            "GOAL!";

        $("#resultMessage").textContent =
            getGoalMessage();

    } else {

        $("#resultIcon").textContent =
            "🧤";

        $("#resultTitle").textContent =
            "SAVED!";

        $("#resultMessage").textContent =
            getSaveMessage();

    }

    $("#resultPoints").textContent =
        points;

    $("#resultXP").textContent =
        xp;

    $("#resultCoins").textContent =
        coins;

    if (
        game.attempt >=
        CONFIG.maxAttempts
    ) {

        $("#nextButton").textContent =
            "FINISH LEVEL";

    } else {

        $("#nextButton").textContent =
            "NEXT ATTEMPT";

    }

    showScreen("resultScreen");

}


/* =====================================================
   RESULT MESSAGES
===================================================== */

function getGoalMessage() {

    if (
        game.selectedPlayer.id ===
        "yamal" &&
        game.mode === "freeKick"
    ) {
        return "The free-kick specialist bends it perfectly!";
    }

    if (
        game.selectedPlayer.id ===
        "bellingham" &&
        game.mode === "penalty"
    ) {
        return "Ice-cold from the penalty spot!";
    }

    if (
        game.selectedPlayer.id ===
        "haaland" &&
        game.longShot
    ) {
        return "An absolute rocket from distance!";
    }

    if (
        game.longShot
    ) {
        return "What a long-range strike!";
    }

    return "Brilliant finish!";
}


function getSaveMessage() {

    const messages = [

        "The goalkeeper read the shot.",

        "So close! Try another target.",

        "The keeper got a hand to it.",

        "The shot was stopped!",

        "That one didn't beat the goalkeeper."

    ];

    return messages[
        Math.floor(
            Math.random() *
            messages.length
        )
    ];

}


/* =====================================================
   NEXT ATTEMPT
===================================================== */

function nextAttempt() {

    if (
        game.attempt >=
        CONFIG.maxAttempts
    ) {

        finishLevel();

        return;

    }

    game.attempt++;

    game.shotActive = false;

    game.currentShot = null;

    game.longShot = false;

    game.power = 0;

    game.distance =
        getStartingDistance();

    game.aimX =
        0.5;

    game.aimY =
        game.mode === "penalty"
            ? 0.25
            : 0.30;

    $("#longShotButton").textContent =
        "💥 LONG SHOT";

    showScreen("gameScreen");

    updateAimPoint();

    updateAllUI();

    drawScene();

}


/* =====================================================
   LEVEL UP
===================================================== */

function finishLevel() {

    game.level++;

    game.attempt = 1;

    game.distance =
        getStartingDistance();

    game.coins +=
        50 +
        game.level * 10;

    game.xp += 100;

    saveProgress();

    updateAllUI();

    showScreen("homeScreen");

    notify(
        `LEVEL ${game.level} UNLOCKED!`
    );

}


/* =====================================================
   GOALKEEPING MODE
===================================================== */

function goalkeeperDive(direction) {

    if (
        game.shotActive ||
        game.mode !== "goalkeeping"
    ) {
        return;
    }

    game.shotActive = true;

    const ballDirection =
        chooseKeeperBallDirection();

    const correct =
        ballDirection === direction;

    const reflex =
        normalizeStat(
            game.selectedPlayer.reflex
        );

    let saveChance =
        correct
            ? 0.72
            : 0.08;

    saveChance +=
        reflex * 0.18;

    if (
        game.selectedPlayer.id ===
        "hassan"
    ) {

        saveChance += 0.35;

    }

    saveChance -=
        difficultyPenalty();

    saveChance =
        clamp(
            saveChance,
            0.05,
            0.99
        );

    const saved =
        Math.random() <
        saveChance;

    animateKeeperDive(
        direction,
        ballDirection,
        saved
    );

}


function chooseKeeperBallDirection() {

    const random =
        Math.random();

    if (random < 0.33) {
        return "left";
    }

    if (random < 0.66) {
        return "center";
    }

    return "right";

}


/* =====================================================
   GOALKEEPER ANIMATION
===================================================== */

function animateKeeperDive(
    direction,
    ballDirection,
    saved
) {

    const start =
        performance.now();

    const duration =
        650;

    function frame(now) {

        const progress =
            clamp(
                (now - start) /
                duration,
                0,
                1
            );

        drawScene();

        drawIncomingBall(
            ballDirection,
            progress
        );

        drawDivingKeeper(
            direction,
            progress
        );

        if (
            progress < 1
        ) {

            game.animationId =
                requestAnimationFrame(
                    frame
                );

        } else {

            finishKeeperAttempt(
                saved
            );

        }

    }

    game.animationId =
        requestAnimationFrame(
            frame
        );

}


function drawIncomingBall(
    direction,
    progress
) {

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    let x =
        width / 2;

    if (direction === "left") {
        x = width * 0.25;
    }

    if (direction === "right") {
        x = width * 0.75;
    }

    const y =
        height * 0.18 +
        progress *
        height *
        0.40;

    drawBall(
        x,
        y,
        progress
    );

}


function drawDivingKeeper(
    direction,
    progress
) {

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    const center =
        width / 2;

    let offset = 0;

    if (direction === "left") {
        offset =
            -progress * 120;
    }

    if (direction === "right") {
        offset =
            progress * 120;
    }

    const x =
        center + offset;

    const y =
        height * 0.70;

    ctx.save();

    ctx.fillStyle =
        "#ffbd38";

    ctx.beginPath();

    ctx.arc(
        x,
        y - 32,
        14,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillRect(
        x - 18,
        y - 18,
        36,
        48
    );

    ctx.strokeStyle =
        "#ffbd38";

    ctx.lineWidth = 11;

    ctx.beginPath();

    ctx.moveTo(
        x - 15,
        y
    );

    ctx.lineTo(
        x - 75,
        y - 25
    );

    ctx.moveTo(
        x + 15,
        y
    );

    ctx.lineTo(
        x + 75,
        y - 25
    );

    ctx.stroke();

    ctx.restore();

}


/* =====================================================
   FINISH GOALKEEPER ATTEMPT
===================================================== */

function finishKeeperAttempt(saved) {

    game.shotActive = false;

    if (saved) {

        const points =
            180 +
            Math.round(
                normalizeStat(
                    game.selectedPlayer.reflex
                ) * 100
            );

        game.score +=
            points;

        const xp =
            Math.round(
                points * 0.35
            );

        const coins =
            Math.round(
                points / 15
            );

        game.xp += xp;

        game.coins += coins;

        showResult(
            true,
            points,
            xp,
            coins
        );

    } else {

        showResult(
            false,
            0,
            8,
            0
        );

    }

    saveProgress();

    updateAllUI();

}


/* =====================================================
   POWER UI
===================================================== */

function updatePowerUI() {

    $("#powerFill").style.width =
        `${game.power}%`;

    $("#powerValue").textContent =
        Math.round(game.power);

}


/* =====================================================
   DIFFICULTY
===================================================== */

function difficultyPenalty() {

    switch (
        game.difficulty
    ) {

        case "easy":
            return 0;

        case "hard":
            return 0.12;

        case "expert":
            return 0.22;

        default:
            return 0.06;

    }

}


function cycleDifficulty() {

    const list = [
        "easy",
        "normal",
        "hard",
        "expert"
    ];

    const index =
        list.indexOf(
            game.difficulty
        );

    game.difficulty =
        list[
            (index + 1) %
            list.length
        ];

    updateAllUI();

    saveProgress();

    notify(
        `Difficulty: ${capitalize(
            game.difficulty
        )}`
    );

}


/* =====================================================
   SOUND
===================================================== */

function toggleSound() {

    game.sound =
        !game.sound;

    updateAllUI();

    saveProgress();

}


/* =====================================================
   RESET
===================================================== */

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

    game.level = 1;

    game.score = 0;

    game.coins =
        CONFIG.startingCoins;

    game.xp = 0;

    game.difficulty =
        "normal";

    game.sound = true;

    game.selectedPlayer =
        PLAYERS[0];

    updateAllUI();

    notify(
        "Progress reset"
    );

}


/* =====================================================
   UI
===================================================== */

function updateAllUI() {

    $("#levelValue").textContent =
        game.level;

    $("#scoreValue").textContent =
        game.score;

    $("#coinsValue").textContent =
        game.coins;

    $("#gameScore").textContent =
        game.score;

    $("#distanceValue").textContent =
        `${game.distance}m`;

    $("#attemptValue").textContent =
        `${game.attempt} / ${CONFIG.maxAttempts}`;

    $("#playerValue").textContent =
        game.selectedPlayer.name;

    $("#gameDifficulty").textContent =
        game.difficulty.toUpperCase();

    $("#difficultyText").textContent =
        capitalize(
            game.difficulty
        );

    $("#soundToggle").textContent =
        game.sound
            ? "ON"
            : "OFF";

    $("#soundToggle")
        .classList
        .toggle(
            "active",
            game.sound
        );

    updatePowerUI();

    updateAimPoint();

}


/* =====================================================
   SAVE SYSTEM
===================================================== */

function saveProgress() {

    const data = {

        level: game.level,

        score: game.score,

        coins: game.coins,

        xp: game.xp,

        difficulty:
            game.difficulty,

        sound:
            game.sound,

        playerId:
            game.selectedPlayer.id

    };

    localStorage.setItem(
        "footballMastersSave",
        JSON.stringify(data)
    );

}


/* =====================================================
   LOAD SYSTEM
===================================================== */

function loadSave() {

    const raw =
        localStorage.getItem(
            "footballMastersSave"
        );

    if (!raw) {
        return;
    }

    try {

        const data =
            JSON.parse(raw);

        if (
            Number.isFinite(
                Number(data.level)
            )
        ) {
            game.level =
                Math.max(
                    1,
                    Number(data.level)
                );
        }

        if (
            Number.isFinite(
                Number(data.score)
            )
        ) {
            game.score =
                Math.max(
                    0,
                    Number(data.score)
                );
        }

        if (
            Number.isFinite(
                Number(data.coins)
            )
        ) {
            game.coins =
                Math.max(
                    0,
                    Number(data.coins)
                );
        }

        if (
            Number.isFinite(
                Number(data.xp)
            )
        ) {
            game.xp =
                Math.max(
                    0,
                    Number(data.xp)
                );
        }

        if (
            [
                "easy",
                "normal",
                "hard",
                "expert"
            ].includes(
                data.difficulty
            )
        ) {

            game.difficulty =
                data.difficulty;

        }

        game.sound =
            data.sound !== false;

        const player =
            PLAYERS.find(
                item =>
                    item.id ===
                    data.playerId
            );

        if (player) {

            game.selectedPlayer =
                player;

        }

    } catch (error) {

        console.error(
            "Could not load save:",
            error
        );

    }

}


/* =====================================================
   EXIT
===================================================== */

function exitGame() {

    cancelAnimationFrame(
        game.animationId
    );

    game.shotActive = false;

    game.currentShot = null;

    showScreen("homeScreen");

}


/* =====================================================
   NOTIFICATION
===================================================== */

let notificationTimer = null;


function notify(message) {

    const element =
        $("#notification");

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


/* =====================================================
   KEYBOARD
===================================================== */

function handleKeyboard(event) {

    if (
        game.screen !==
        "gameScreen"
    ) {
        return;
    }

    if (
        game.mode ===
        "goalkeeping"
    ) {

        if (
            event.key ===
            "ArrowLeft"
        ) {
            goalkeeperDive("left");
        }

        if (
            event.key ===
            "ArrowDown"
        ) {
            goalkeeperDive("center");
        }

        if (
            event.key ===
            "ArrowRight"
        ) {
            goalkeeperDive("right");
        }

        return;

    }

    if (
        event.key ===
        "ArrowLeft"
    ) {

        moveAim(-0.04,0);

    }

    if (
        event.key ===
        "ArrowRight"
    ) {

        moveAim(0.04,0);

    }

    if (
        event.key ===
        "ArrowUp"
    ) {

        moveAim(0,-0.04);

    }

    if (
        event.key ===
        "ArrowDown"
    ) {

        moveAim(0,0.04);

    }

    if (
        event.code ===
        "Space"
    ) {

        event.preventDefault();

        shoot();

    }

}


/* =====================================================
   UTILITIES
===================================================== */

function clamp(
    value,
    minimum,
    maximum
) {

    return Math.min(
        maximum,
        Math.max(
            minimum,
            value
        )
    );

}


function normalizeStat(value) {

    return clamp(
        value / 100,
        0,
        1
    );

}


function capitalize(value) {

    if (!value) {
        return "";
    }

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );

}


/* =====================================================
   STARTUP SAFETY
===================================================== */

window.addEventListener(
    "error",
    event => {

        console.error(
            "Football Masters error:",
            event.error
        );

    }
);
