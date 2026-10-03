"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /*
        FOOTBALL HERO X
        ----------------
        Main game engine.

        Important architecture:
        - Canvas = aiming / drawing only.
        - Shoot button = shooting only.
        - Dive button = goalkeeper action only.
        - No pointerup shooting.
        - No mixed touch/click shooting.
        - Everything starts after DOMContentLoaded.
    */


    /* =========================================================
       DOM
    ========================================================= */

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const modeButtons = document.querySelectorAll(".mode-button");

    const playerSelect = document.getElementById("playerSelect");
    const difficultySelect = document.getElementById("difficultySelect");

    const powerSlider = document.getElementById("powerSlider");
    const powerValue = document.getElementById("powerValue");

    const shootButton = document.getElementById("shootButton");
    const diveButton = document.getElementById("diveButton");

    const resetButton = document.getElementById("resetButton");

    const overlay = document.getElementById("messageOverlay");
    const overlayButton = document.getElementById("overlayButton");

    const messageIcon = document.getElementById("messageIcon");
    const messageTitle = document.getElementById("messageTitle");
    const messageText = document.getElementById("messageText");

    const modeTitle = document.getElementById("modeTitle");
    const distanceValue = document.getElementById("distanceValue");
    const windValue = document.getElementById("windValue");

    const levelValue = document.getElementById("levelValue");
    const scoreValue = document.getElementById("scoreValue");
    const shotsValue = document.getElementById("shotsValue");

    const goalsValue = document.getElementById("goalsValue");
    const savesValue = document.getElementById("savesValue");
    const comboValue = document.getElementById("comboValue");
    const bestValue = document.getElementById("bestValue");

    const playerAvatar = document.getElementById("playerAvatar");
    const playerName = document.getElementById("playerName");
    const playerRole = document.getElementById("playerRole");

    const controlText = document.getElementById("controlText");

    const toast = document.getElementById("toast");


    /* =========================================================
       SAFETY CHECK
    ========================================================= */

    if (!canvas || !ctx) {
        document.body.innerHTML = `
            <div style="
                padding:40px;
                font-family:Arial;
                text-align:center;
            ">
                <h1>Game could not start.</h1>
                <p>The game canvas was not found.</p>
            </div>
        `;
        return;
    }


    /* =========================================================
       PLAYER DATA
    ========================================================= */

    const players = {

        hassan: {
            name: "Hassan Ali",
            initials: "HA",
            role: "Goalkeeper / All-Rounder",
            shooting: 300,
            power: 300,
            accuracy: 300,
            reflex: 300,
            keeper: 300,
            freeKick: 300,
            penalty: 300
        },

        ehan: {
            name: "Ehan Ali",
            initials: "EA",
            role: "Goalkeeper",
            shooting: 270,
            power: 280,
            accuracy: 275,
            reflex: 290,
            keeper: 295,
            freeKick: 260,
            penalty: 265
        },

        umar: {
            name: "Umar Shoaib",
            initials: "US",
            role: "Attacking Player",
            shooting: 235,
            power: 240,
            accuracy: 225,
            reflex: 210,
            keeper: 180,
            freeKick: 220,
            penalty: 230
        },

        arham: {
            name: "Muhammad Arham",
            initials: "MA",
            role: "All-Round Player",
            shooting: 230,
            power: 225,
            accuracy: 235,
            reflex: 220,
            keeper: 210,
            freeKick: 230,
            penalty: 225
        },

        ronaldo: {
            name: "Cristiano Ronaldo",
            initials: "CR",
            role: "Power Forward",
            shooting: 290,
            power: 300,
            accuracy: 275,
            reflex: 260,
            keeper: 100,
            freeKick: 270,
            penalty: 290
        },

        haaland: {
            name: "Erling Haaland",
            initials: "EH",
            role: "Long-Shot Specialist",
            shooting: 285,
            power: 320,
            accuracy: 265,
            reflex: 250,
            keeper: 90,
            freeKick: 245,
            penalty: 275
        },

        bellingham: {
            name: "Jude Bellingham",
            initials: "JB",
            role: "Penalty Specialist",
            shooting: 275,
            power: 265,
            accuracy: 290,
            reflex: 255,
            keeper: 100,
            freeKick: 260,
            penalty: 310
        },

        yamal: {
            name: "Lamine Yamal",
            initials: "LY",
            role: "Free-Kick Specialist",
            shooting: 270,
            power: 255,
            accuracy: 300,
            reflex: 270,
            keeper: 90,
            freeKick: 315,
            penalty: 260
        },

        mbappe: {
            name: "Kylian Mbappé",
            initials: "KM",
            role: "Speed Attacker",
            shooting: 285,
            power: 280,
            accuracy: 275,
            reflex: 290,
            keeper: 95,
            freeKick: 235,
            penalty: 280
        },

        messi: {
            name: "Lionel Messi",
            initials: "LM",
            role: "Precision Specialist",
            shooting: 290,
            power: 245,
            accuracy: 315,
            reflex: 280,
            keeper: 90,
            freeKick: 305,
            penalty: 285
        }

    };


    /* =========================================================
       DIFFICULTY
    ========================================================= */

    const difficultyData = {

        easy: {
            keeperSpeed: 0.62,
            keeperAccuracy: 0.35,
            targetSize: 1.18,
            reaction: 1.15,
            label: "Easy"
        },

        normal: {
            keeperSpeed: 0.82,
            keeperAccuracy: 0.50,
            targetSize: 1,
            reaction: 1,
            label: "Normal"
        },

        hard: {
            keeperSpeed: 1.04,
            keeperAccuracy: 0.66,
            targetSize: 0.84,
            reaction: 0.86,
            label: "Hard"
        },

        legend: {
            keeperSpeed: 1.28,
            keeperAccuracy: 0.79,
            targetSize: 0.70,
            reaction: 0.70,
            label: "Legend"
        }

    };


    /* =========================================================
       GAME STATE
    ========================================================= */

    const state = {

        mode: "penalty",

        phase: "menu",

        level: 1,

        score: 0,

        shots: 0,

        goals: 0,

        saves: 0,

        combo: 0,

        best: Number(localStorage.getItem("footballHeroBest") || 0),

        distance: 11,

        wind: 0,

        power: 75,

        selectedPlayer: "hassan",

        difficulty: "normal",

        aimX: 0.50,

        aimY: 0.42,

        targetX: 0.50,

        targetY: 0.42,

        ball: null,

        keeper: null,

        wall: [],

        animationStart: 0,

        lastTime: 0,

        animationFrame: null,

        roundNumber: 0,

        goalkeeperTarget: null,

        gloveX: 0.50,

        gloveY: 0.72,

        diveX: 0.50,

        diveY: 0.72,

        canDive: false,

        inputPointer: false,

        resultTimer: null,

        resizeTimer: null

    };


    /* =========================================================
       CANVAS SIZE
    ========================================================= */

    let viewWidth = 900;
    let viewHeight = 540;
    let deviceScale = 1;


    function resizeCanvas() {

        const rect = canvas.getBoundingClientRect();

        viewWidth = Math.max(320, rect.width);
        viewHeight = Math.max(320, rect.height);

        deviceScale = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(viewWidth * deviceScale);
        canvas.height = Math.round(viewHeight * deviceScale);

        ctx.setTransform(
            deviceScale,
            0,
            0,
            deviceScale,
            0,
            0
        );

        drawScene();

    }


    window.addEventListener("resize", () => {

        clearTimeout(state.resizeTimer);

        state.resizeTimer = setTimeout(() => {
            resizeCanvas();
        }, 100);

    });


    /* =========================================================
       HELPERS
    ========================================================= */

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }


    function random(min, max) {
        return Math.random() * (max - min) + min;
    }


    function lerp(a, b, amount) {
        return a + (b - a) * amount;
    }


    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }


    function distanceBetween(x1, y1, x2, y2) {

        return Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2)
        );

    }


    function getPlayer() {
        return players[state.selectedPlayer];
    }


    function getDifficulty() {
        return difficultyData[state.difficulty];
    }


    function showToast(text) {

        toast.textContent = text;

        toast.classList.add("visible");

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(() => {
            toast.classList.remove("visible");
        }, 1800);

    }


    function updateHUD() {

        levelValue.textContent = state.level;
        scoreValue.textContent = state.score;
        shotsValue.textContent = state.shots;

        goalsValue.textContent = state.goals;
        savesValue.textContent = state.saves;
        comboValue.textContent = state.combo;
        bestValue.textContent = state.best;

        distanceValue.textContent =
            `${Math.round(state.distance)} m`;

        windValue.textContent =
            `${state.wind > 0 ? "+" : ""}${Math.round(state.wind)} km/h`;

    }


    function updatePlayerCard() {

        const player = getPlayer();

        playerAvatar.textContent = player.initials;
        playerName.textContent = player.name;
        playerRole.textContent = player.role;

    }


    function updatePower() {

        state.power = Number(powerSlider.value);

        powerValue.textContent =
            `${state.power}%`;

    }


    /* =========================================================
       MODE CONFIG
    ========================================================= */

    function configureMode() {

        state.phase = "ready";

        state.ball = null;

        state.wall = [];

        state.wind = Math.round(random(-7, 7));

        if (state.mode === "penalty") {

            state.distance = 11;

            modeTitle.textContent = "PENALTY";

            controlText.textContent =
                "Tap the pitch to aim • then press SHOOT";

            shootButton.classList.remove("hidden");
            diveButton.classList.add("hidden");

        }

        else if (state.mode === "freekick") {

            state.distance = Math.round(random(19, 29));

            modeTitle.textContent = "FREE KICK";

            controlText.textContent =
                "Aim around the wall • then press SHOOT";

            createWall();

            shootButton.classList.remove("hidden");
            diveButton.classList.add("hidden");

        }

        else if (state.mode === "longshot") {

            state.distance = Math.round(random(27, 39));

            modeTitle.textContent = "LONG SHOT";

            controlText.textContent =
                "Choose a corner • power matters";

            shootButton.classList.remove("hidden");
            diveButton.classList.add("hidden");

        }

        else if (state.mode === "goalkeeper") {

            state.distance = Math.round(random(16, 24));

            modeTitle.textContent = "GOALKEEPER";

            controlText.textContent =
                "Move your gloves to the ball • then DIVE";

            shootButton.classList.add("hidden");
            diveButton.classList.remove("hidden");

            state.gloveX = 0.50;
            state.gloveY = 0.72;

            createGoalkeeperShot();

        }

        updateHUD();
        drawScene();

    }


    /* =========================================================
       WALL
    ========================================================= */

    function createWall() {

        const count =
            state.difficulty === "easy"
                ? 4
                : state.difficulty === "normal"
                    ? 5
                    : state.difficulty === "hard"
                        ? 6
                        : 7;

        state.wall = [];

        const startX = 0.35;
        const spacing = 0.06;

        for (let i = 0; i < count; i++) {

            state.wall.push({
                x: startX + i * spacing,
                y: 0.42,
                height: random(0.10, 0.125),
                jump: false
            });

        }

    }


    /* =========================================================
       GOALKEEPER ROUND
    ========================================================= */

    function createGoalkeeperShot() {

        const corners = [
            { x: 0.20, y: 0.30 },
            { x: 0.80, y: 0.30 },
            { x: 0.28, y: 0.48 },
            { x: 0.72, y: 0.48 },
            { x: 0.50, y: 0.36 }
        ];

        const choice =
            corners[Math.floor(Math.random() * corners.length)];

        state.goalkeeperTarget = {
            x: choice.x,
            y: choice.y
        };

        state.ball = {
            x: 0.50,
            y: 0.92,
            startX: 0.50,
            startY: 0.92,
            targetX: choice.x,
            targetY: choice.y,
            progress: 0,
            speed: 0.00052
        };

        state.canDive = false;

        setTimeout(() => {

            if (state.mode !== "goalkeeper") {
                return;
            }

            if (state.phase !== "ready") {
                return;
            }

            state.phase = "keeperShot";

            state.canDive = true;

            showToast("SHOT COMING!");

            startAnimation();

        }, 700);

    }


    /* =========================================================
       OVERLAY
    ========================================================= */

    function showOverlay(
        icon,
        title,
        text,
        buttonText
    ) {

        messageIcon.textContent = icon;
        messageTitle.textContent = title;
        messageText.textContent = text;
        overlayButton.textContent = buttonText;

        overlay.classList.remove("hidden");

    }


    function hideOverlay() {

        overlay.classList.add("hidden");

    }


    /* =========================================================
       START GAME
    ========================================================= */

    function startGame() {

        state.score = 0;
        state.shots = 0;
        state.goals = 0;
        state.saves = 0;
        state.combo = 0;
        state.level = 1;
        state.roundNumber = 0;

        hideOverlay();

        configureMode();

        showToast("Game started!");

    }


    /* =========================================================
       NEW ROUND
    ========================================================= */

    function newRound() {

        state.roundNumber++;

        state.phase = "ready";

        state.ball = null;

        state.wind = Math.round(random(-7, 7));

        if (state.mode === "freekick") {
            state.distance = Math.round(random(19, 29));
            createWall();
        }

        else if (state.mode === "longshot") {
            state.distance = Math.round(random(27, 39));
        }

        else if (state.mode === "penalty") {
            state.distance = 11;
        }

        else if (state.mode === "goalkeeper") {

            state.distance = Math.round(random(16, 24));

            state.gloveX = 0.50;
            state.gloveY = 0.72;

            createGoalkeeperShot();

        }

        state.aimX = 0.50;
        state.aimY = 0.42;

        state.targetX = 0.50;
        state.targetY = 0.42;

        updateHUD();

        drawScene();

    }


    /* =========================================================
       LEVEL
    ========================================================= */

    function checkLevel() {

        const newLevel =
            Math.floor(state.goals / 3) + 1;

        if (newLevel > state.level) {

            state.level = newLevel;

            showToast(
                `LEVEL ${state.level} UNLOCKED!`
            );

        }

    }


    /* =========================================================
       AIMING
    ========================================================= */

    function updateAimFromPointer(event) {

        if (state.mode === "goalkeeper") {

            if (
                state.phase !== "keeperShot" &&
                state.phase !== "ready"
            ) {
                return;
            }

        }
        else {

            if (state.phase !== "ready") {
                return;
            }

        }

        const rect = canvas.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        const normalizedX = clamp(x, 0, 1);
        const normalizedY = clamp(y, 0, 1);

        if (state.mode === "goalkeeper") {

            state.gloveX = normalizedX;
            state.gloveY = normalizedY;

        }
        else {

            state.aimX = normalizedX;
            state.aimY = normalizedY;

            state.targetX = normalizedX;
            state.targetY = normalizedY;

        }

        drawScene();

    }


    canvas.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            state.inputPointer = true;

            if (
                canvas.setPointerCapture &&
                event.pointerId !== undefined
            ) {
                try {
                    canvas.setPointerCapture(event.pointerId);
                }
                catch (_) {}
            }

            updateAimFromPointer(event);

        },
        { passive: false }
    );


    canvas.addEventListener(
        "pointermove",
        event => {

            if (!state.inputPointer) {
                return;
            }

            event.preventDefault();

            updateAimFromPointer(event);

        },
        { passive: false }
    );


    canvas.addEventListener(
        "pointerup",
        event => {

            event.preventDefault();

            state.inputPointer = false;

        },
        { passive: false }
    );


    canvas.addEventListener(
        "pointercancel",
        () => {
            state.inputPointer = false;
        }
    );


    /* =========================================================
       SHOOT
    ========================================================= */

    function shoot() {

        if (state.mode === "goalkeeper") {
            return;
        }

        if (state.phase !== "ready") {
            return;
        }

        state.phase = "shooting";

        state.shots++;

        const player = getPlayer();

        const difficulty = getDifficulty();

        let accuracyBonus =
            player.accuracy / 400;

        if (state.mode === "penalty") {
            accuracyBonus += player.penalty / 1200;
        }

        if (state.mode === "freekick") {
            accuracyBonus += player.freeKick / 1200;
        }

        if (state.mode === "longshot") {
            accuracyBonus += player.power / 1500;
        }

        const powerFactor =
            state.power / 100;

        let finalX = state.aimX;
        let finalY = state.aimY;

        const errorBase =
            0.075 -
            Math.min(accuracyBonus, 0.35);

        const error =
            Math.max(
                0.008,
                errorBase *
                (1.15 - powerFactor * 0.35)
            );

        finalX += random(-error, error);
        finalY += random(-error, error);

        finalX = clamp(finalX, 0.08, 0.92);
        finalY = clamp(finalY, 0.13, 0.73);

        state.ball = {

            x: 0.50,
            y: 0.88,

            startX: 0.50,
            startY: 0.88,

            targetX: finalX,
            targetY: finalY,

            progress: 0,

            speed:
                0.0008 +
                powerFactor * 0.00045

        };

        startAnimation();

    }


    /* =========================================================
       SHOT RESULT
    ========================================================= */

    function resolveShot() {

        if (!state.ball) {
            return;
        }

        const ballX = state.ball.targetX;
        const ballY = state.ball.targetY;

        const goalLeft = 0.18;
        const goalRight = 0.82;

        const goalTop = 0.16;
        const goalBottom = 0.58;

        const insideGoal =
            ballX >= goalLeft &&
            ballX <= goalRight &&
            ballY >= goalTop &&
            ballY <= goalBottom;

        let scored = insideGoal;

        /* ---------------------------------------------
           FREE KICK WALL
        --------------------------------------------- */

        if (
            state.mode === "freekick" &&
            scored
        ) {

            const wallHeight =
                state.wall.length * 0.012 + 0.08;

            const lowShot =
                ballY > 0.45;

            const wallChance =
                lowShot
                    ? 0.52
                    : 0.12;

            const player = getPlayer();

            const specialistBonus =
                player.freeKick >= 300
                    ? 0.18
                    : 0;

            if (
                Math.random() <
                Math.max(
                    0,
                    wallChance -
                    specialistBonus
                )
            ) {

                scored = false;

                state.combo = 0;

                finishShot(
                    false,
                    "WALL BLOCK!",
                    "The wall stopped the shot."
                );

                return;

            }

            if (wallHeight < 0) {
                scored = false;
            }

        }


        /* ---------------------------------------------
           GOALKEEPER SAVE
        --------------------------------------------- */

        if (scored) {

            const difficulty = getDifficulty();

            const player = getPlayer();

            let saveChance =
                difficulty.keeperAccuracy;

            const keeperBonus =
                player.keeper / 1500;

            saveChance += keeperBonus;

            const keeperDistance =
                Math.abs(ballX - 0.50);

            saveChance +=
                Math.max(
                    0,
                    0.20 - keeperDistance
                );

            if (
                Math.random() <
                clamp(saveChance, 0.05, 0.90)
            ) {

                scored = false;

                finishShot(
                    false,
                    "SAVED!",
                    "The goalkeeper got to it."
                );

                return;

            }

        }


        if (scored) {

            state.goals++;

            state.combo++;

            const basePoints = 100;

            const powerPoints =
                Math.round(state.power * 1.5);

            const distancePoints =
                Math.round(state.distance * 4);

            const comboPoints =
                state.combo * 20;

            const levelMultiplier =
                state.level * 0.25;

            const points = Math.round(
                (
                    basePoints +
                    powerPoints +
                    distancePoints +
                    comboPoints
                ) *
                (1 + levelMultiplier)
            );

            state.score += points;

            if (state.score > state.best) {

                state.best = state.score;

                localStorage.setItem(
                    "footballHeroBest",
                    String(state.best)
                );

            }

            checkLevel();

            finishShot(
                true,
                "GOAL!",
                `+${points} points`
            );

        }
        else {

            state.combo = 0;

            finishShot(
                false,
                "MISS!",
                "Aim more precisely."
            );

        }

    }


    function finishShot(
        success,
        title,
        text
    ) {

        state.phase = "result";

        updateHUD();

        if (success) {

            showOverlay(
                "⚽",
                title,
                text,
                "NEXT SHOT"
            );

            showToast("GOAL!");

        }
        else {

            showOverlay(
                title === "SAVED!"
                    ? "🧤"
                    : "❌",
                title,
                text,
                "TRY AGAIN"
            );

        }

        drawScene();

    }


    /* =========================================================
       GOALKEEPER DIVE
    ========================================================= */

    function dive() {

        if (state.mode !== "goalkeeper") {
            return;
        }

        if (state.phase !== "keeperShot") {
            return;
        }

        if (!state.ball) {
            return;
        }

        state.phase = "diving";

        state.diveX = state.gloveX;
        state.diveY = state.gloveY;

        const player = getPlayer();

        const distance =
            distanceBetween(
                state.diveX,
                state.diveY,
                state.ball.targetX,
                state.ball.targetY
            );

        let saveRadius =
            0.115;

        saveRadius +=
            player.reflex / 5000;

        saveRadius =
            clamp(
                saveRadius,
                0.08,
                0.22
            );

        const saved =
            distance <= saveRadius;

        if (saved) {

            state.saves++;
            state.combo++;

            const points =
                150 +
                state.level * 30;

            state.score += points;

            if (state.score > state.best) {

                state.best = state.score;

                localStorage.setItem(
                    "footballHeroBest",
                    String(state.best)
                );

            }

            state.phase = "result";

            showOverlay(
                "🧤",
                "INCREDIBLE SAVE!",
                `+${points} points`,
                "NEXT SHOT"
            );

            showToast("WHAT A SAVE!");

        }
        else {

            state.combo = 0;

            state.phase = "result";

            showOverlay(
                "⚽",
                "GOAL!",
                "The shot was too far away.",
                "TRY AGAIN"
            );

        }

        updateHUD();
        drawScene();

    }


    /* =========================================================
       BUTTONS
    ========================================================= */

    shootButton.addEventListener("click", () => {
        shoot();
    });


    diveButton.addEventListener("click", () => {
        dive();
    });


    overlayButton.addEventListener("click", () => {

        if (state.phase === "menu") {
            startGame();
            return;
        }

        if (state.phase === "result") {

            hideOverlay();

            newRound();

        }

    });


    resetButton.addEventListener("click", () => {

        hideOverlay();

        startGame();

        showToast("Game reset.");

    });


    /* =========================================================
       MODE BUTTONS
    ========================================================= */

    modeButtons.forEach(button => {

        button.addEventListener("click", () => {

            modeButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            state.mode =
                button.dataset.mode;

            configureMode();

            showToast(
                button.textContent.trim()
            );

        });

    });


    /* =========================================================
       PLAYER SELECT
    ========================================================= */

    playerSelect.addEventListener(
        "change",
        () => {

            state.selectedPlayer =
                playerSelect.value;

            updatePlayerCard();

            showToast(
                `${getPlayer().name} selected`
            );

            drawScene();

        }
    );


    /* =========================================================
       DIFFICULTY
    ========================================================= */

    difficultySelect.addEventListener(
        "change",
        () => {

            state.difficulty =
                difficultySelect.value;

            configureMode();

            showToast(
                `${getDifficulty().label} difficulty`
            );

        }
    );


    /* =========================================================
       POWER
    ========================================================= */

    powerSlider.addEventListener(
        "input",
        updatePower
    );


    /* =========================================================
       KEYBOARD
    ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.code === "Space") {

                event.preventDefault();

                if (
                    state.mode === "goalkeeper"
                ) {
                    dive();
                }
                else {
                    shoot();
                }

            }

            if (event.key === "ArrowLeft") {

                if (
                    state.mode === "goalkeeper"
                ) {
                    state.gloveX -= 0.035;
                }
                else {
                    state.aimX -= 0.035;
                }

            }

            if (event.key === "ArrowRight") {

                if (
                    state.mode === "goalkeeper"
                ) {
                    state.gloveX += 0.035;
                }
                else {
                    state.aimX += 0.035;
                }

            }

            if (event.key === "ArrowUp") {

                if (
                    state.mode === "goalkeeper"
                ) {
                    state.gloveY -= 0.035;
                }
                else {
                    state.aimY -= 0.035;
                }

            }

            if (event.key === "ArrowDown") {

                if (
                    state.mode === "goalkeeper"
                ) {
                    state.gloveY += 0.035;
                }
                else {
                    state.aimY += 0.035;
                }

            }

            state.aimX =
                clamp(state.aimX, 0.05, 0.95);

            state.aimY =
                clamp(state.aimY, 0.10, 0.80);

            state.gloveX =
                clamp(state.gloveX, 0.05, 0.95);

            state.gloveY =
                clamp(state.gloveY, 0.12, 0.90);

            drawScene();

        }
    );


    /* =========================================================
       ANIMATION
    ========================================================= */

    function startAnimation() {

        cancelAnimationFrame(
            state.animationFrame
        );

        state.animationStart =
            performance.now();

        state.lastTime =
            state.animationStart;

        state.animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    function animate(time) {

        const elapsed =
            time - state.animationStart;

        if (
            state.ball &&
            (
                state.phase === "shooting" ||
                state.phase === "keeperShot"
            )
        ) {

            const duration =
                state.mode === "longshot"
                    ? 1450
                    : state.mode === "freekick"
                        ? 1050
                        : 900;

            const progress =
                clamp(
                    elapsed / duration,
                    0,
                    1
                );

            state.ball.progress =
                easeOutCubic(progress);

            if (
                state.phase === "keeperShot"
            ) {

                state.ball.progress =
                    clamp(
                        elapsed /
                        (
                            1250 *
                            getDifficulty().reaction
                        ),
                        0,
                        1
                    );

            }

            state.ball.x =
                lerp(
                    state.ball.startX,
                    state.ball.targetX,
                    state.ball.progress
                );

            state.ball.y =
                lerp(
                    state.ball.startY,
                    state.ball.targetY,
                    state.ball.progress
                );

            drawScene();

            if (progress >= 1) {

                if (
                    state.phase === "shooting"
                ) {

                    resolveShot();

                }
                else if (
                    state.phase === "keeperShot"
                ) {

                    state.phase = "result";

                    state.combo = 0;

                    showOverlay(
                        "⚽",
                        "GOAL!",
                        "You did not reach the ball.",
                        "TRY AGAIN"
                    );

                    drawScene();

                }

                return;

            }

            state.animationFrame =
                requestAnimationFrame(
                    animate
                );

        }

    }


    /* =========================================================
       DRAWING HELPERS
    ========================================================= */

    function clearCanvas() {

        ctx.clearRect(
            0,
            0,
            viewWidth,
            viewHeight
        );

    }


    function drawBackground() {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                viewHeight
            );

        gradient.addColorStop(
            0,
            "#123c24"
        );

        gradient.addColorStop(
            1,
            "#061d12"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            viewWidth,
            viewHeight
        );

    }


    function drawStadiumLights() {

        for (let i = 0; i < 12; i++) {

            const x =
                (i / 11) *
                viewWidth;

            ctx.beginPath();

            ctx.arc(
                x,
                22,
                4,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(255,255,255,0.8)";

            ctx.fill();

        }

    }


    function drawPitch() {

        const left = viewWidth * 0.06;
        const right = viewWidth * 0.94;

        const top = viewHeight * 0.06;
        const bottom = viewHeight * 0.95;

        ctx.save();

        ctx.fillStyle = "#168347";

        ctx.fillRect(
            left,
            top,
            right - left,
            bottom - top
        );

        /* stripes */

        const stripeWidth =
            (right - left) / 12;

        for (let i = 0; i < 12; i++) {

            if (i % 2 === 0) {

                ctx.fillStyle =
                    "rgba(255,255,255,0.035)";

                ctx.fillRect(
                    left + i * stripeWidth,
                    top,
                    stripeWidth,
                    bottom - top
                );

            }

        }

        /* outer lines */

        ctx.strokeStyle =
            "rgba(255,255,255,0.9)";

        ctx.lineWidth = 3;

        ctx.strokeRect(
            left,
            top,
            right - left,
            bottom - top
        );

        /* halfway line */

        ctx.beginPath();

        ctx.moveTo(
            left,
            (top + bottom) / 2
        );

        ctx.lineTo(
            right,
            (top + bottom) / 2
        );

        ctx.stroke();

        /* centre circle */

        ctx.beginPath();

        ctx.arc(
            viewWidth / 2,
            (top + bottom) / 2,
            Math.min(
                viewWidth,
                viewHeight
            ) * 0.12,
            0,
            Math.PI * 2
        );

        ctx.stroke();

        ctx.restore();

    }


    function drawGoal() {

        const goalLeft =
            viewWidth * 0.16;

        const goalRight =
            viewWidth * 0.84;

        const goalTop =
            viewHeight * 0.10;

        const goalBottom =
            viewHeight * 0.30;

        /* net */

        ctx.save();

        ctx.fillStyle =
            "rgba(235,245,255,0.12)";

        ctx.fillRect(
            goalLeft,
            goalTop,
            goalRight - goalLeft,
            goalBottom - goalTop
        );

        ctx.strokeStyle =
            "rgba(255,255,255,0.28)";

        ctx.lineWidth = 1;

        for (
            let x = goalLeft;
            x <= goalRight;
            x += 18
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x,
                goalTop
            );

            ctx.lineTo(
                x,
                goalBottom
            );

            ctx.stroke();

        }

        for (
            let y = goalTop;
            y <= goalBottom;
            y += 16
        ) {

            ctx.beginPath();

            ctx.moveTo(
                goalLeft,
                y
            );

            ctx.lineTo(
                goalRight,
                y
            );

            ctx.stroke();

        }

        /* posts */

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth = 7;

        ctx.beginPath();

        ctx.moveTo(
            goalLeft,
            goalBottom
        );

        ctx.lineTo(
            goalLeft,
            goalTop
        );

        ctx.lineTo(
            goalRight,
            goalTop
        );

        ctx.lineTo(
            goalRight,
            goalBottom
        );

        ctx.stroke();

        ctx.restore();

    }


    function drawPenaltySpot() {

        const x =
            viewWidth * 0.50;

        const y =
            viewHeight * 0.72;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#ffffff";

        ctx.fill();

    }


    function drawWall() {

        for (const person of state.wall) {

            const x =
                person.x * viewWidth;

            const y =
                person.y * viewHeight;

            const h =
                person.height * viewHeight;

            ctx.save();

            /* head */

            ctx.beginPath();

            ctx.arc(
                x,
                y - h * 0.48,
                h * 0.18,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#f1c39b";

            ctx.fill();

            /* body */

            ctx.fillStyle =
                "#243dff";

            ctx.fillRect(
                x - h * 0.22,
                y - h * 0.28,
                h * 0.44,
                h * 0.55
            );

            /* legs */

            ctx.strokeStyle =
                "#111827";

            ctx.lineWidth = 4;

            ctx.beginPath();

            ctx.moveTo(
                x - h * 0.08,
                y + h * 0.27
            );

            ctx.lineTo(
                x - h * 0.15,
                y + h * 0.52
            );

            ctx.moveTo(
                x + h * 0.08,
                y + h * 0.27
            );

            ctx.lineTo(
                x + h * 0.15,
                y + h * 0.52
            );

            ctx.stroke();

            ctx.restore();

        }

    }


    function drawAimTarget() {

        if (
            state.phase !== "ready"
        ) {
            return;
        }

        if (
            state.mode === "goalkeeper"
        ) {
            return;
        }

        const x =
            state.aimX * viewWidth;

        const y =
            state.aimY * viewHeight;

        const radius = 22;

        ctx.save();

        ctx.strokeStyle =
            "rgba(255,255,255,0.95)";

        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(
            x - radius - 8,
            y
        );

        ctx.lineTo(
            x + radius + 8,
            y
        );

        ctx.moveTo(
            x,
            y - radius - 8
        );

        ctx.lineTo(
            x,
            y + radius + 8
        );

        ctx.stroke();

        ctx.fillStyle =
            "rgba(255,255,255,0.9)";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }


    function drawBall() {

        if (!state.ball) {
            return;
        }

        const x =
            state.ball.x * viewWidth;

        const y =
            state.ball.y * viewHeight;

        const progress =
            state.ball.progress;

        const size =
            11 -
            progress * 2;

        /* shadow */

        ctx.beginPath();

        ctx.ellipse(
            x,
            y + 9,
            size * 1.3,
            size * 0.45,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0,0,0,0.30)";

        ctx.fill();

        /* ball */

        const gradient =
            ctx.createRadialGradient(
                x - 3,
                y - 3,
                1,
                x,
                y,
                size
            );

        gradient.addColorStop(
            0,
            "#ffffff"
        );

        gradient.addColorStop(
            1,
            "#cbd5e1"
        );

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            gradient;

        ctx.fill();

        ctx.strokeStyle =
            "#111827";

        ctx.lineWidth = 1;

        ctx.stroke();

    }


    function drawPlayer() {

        if (
            state.mode === "goalkeeper"
        ) {
            return;
        }

        const x =
            viewWidth * 0.50;

        const y =
            viewHeight * 0.86;

        ctx.save();

        /* shadow */

        ctx.beginPath();

        ctx.ellipse(
            x,
            y + 15,
            30,
            9,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0,0,0,0.25)";

        ctx.fill();

        /* legs */

        ctx.strokeStyle =
            "#101827";

        ctx.lineWidth = 7;

        ctx.beginPath();

        ctx.moveTo(
            x - 7,
            y + 4
        );

        ctx.lineTo(
            x - 15,
            y + 28
        );

        ctx.moveTo(
            x + 7,
            y + 4
        );

        ctx.lineTo(
            x + 15,
            y + 28
        );

        ctx.stroke();

        /* body */

        ctx.fillStyle =
            "#2563eb";

        ctx.fillRect(
            x - 18,
            y - 32,
            36,
            40
        );

        /* head */

        ctx.beginPath();

        ctx.arc(
            x,
            y - 48,
            13,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#dca77d";

        ctx.fill();

        /* name */

        ctx.font =
            "bold 12px Arial";

        ctx.textAlign =
            "center";

        ctx.fillStyle =
            "#ffffff";

        ctx.fillText(
            getPlayer().initials,
            x,
            y - 75
        );

        ctx.restore();

    }


    /* =========================================================
       GOALKEEPER POV
    ========================================================= */

    function drawGoalkeeperScene() {

        clearCanvas();

        drawBackground();

        /* stadium */

        ctx.fillStyle =
            "#111827";

        ctx.fillRect(
            0,
            0,
            viewWidth,
            viewHeight * 0.25
        );

        /* goal frame */

        const left =
            viewWidth * 0.08;

        const right =
            viewWidth * 0.92;

        const top =
            viewHeight * 0.10;

        const bottom =
            viewHeight * 0.82;

        ctx.fillStyle =
            "rgba(255,255,255,0.08)";

        ctx.fillRect(
            left,
            top,
            right - left,
            bottom - top
        );

        /* net */

        ctx.strokeStyle =
            "rgba(255,255,255,0.22)";

        ctx.lineWidth = 1;

        for (
            let x = left;
            x <= right;
            x += 22
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x,
                top
            );

            ctx.lineTo(
                x,
                bottom
            );

            ctx.stroke();

        }

        for (
            let y = top;
            y <= bottom;
            y += 20
        ) {

            ctx.beginPath();

            ctx.moveTo(
                left,
                y
            );

            ctx.lineTo(
                right,
                y
            );

            ctx.stroke();

        }

        /* posts */

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth = 9;

        ctx.beginPath();

        ctx.moveTo(
            left,
            bottom
        );

        ctx.lineTo(
            left,
            top
        );

        ctx.lineTo(
            right,
            top
        );

        ctx.lineTo(
            right,
            bottom
        );

        ctx.stroke();

        /* keeper gloves */

        drawGloves();

        /* incoming ball */

        drawBall();

        /* target indicator */

        if (
            state.goalkeeperTarget &&
            state.phase === "keeperShot"
        ) {

            const tx =
                state.goalkeeperTarget.x *
                viewWidth;

            const ty =
                state.goalkeeperTarget.y *
                viewHeight;

            ctx.save();

            ctx.strokeStyle =
                "rgba(255,80,80,0.7)";

            ctx.lineWidth = 3;

            ctx.beginPath();

            ctx.arc(
                tx,
                ty,
                24,
                0,
                Math.PI * 2
            );

            ctx.stroke();

            ctx.restore();

        }

    }


    function drawGloves() {

        const x =
            state.gloveX * viewWidth;

        const y =
            state.gloveY * viewHeight;

        ctx.save();

        /* left glove */

        drawSingleGlove(
            x - 28,
            y
        );

        /* right glove */

        drawSingleGlove(
            x + 28,
            y
        );

        ctx.restore();

    }


    function drawSingleGlove(
        x,
        y
    ) {

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            19,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#facc15";

        ctx.fill();

        ctx.strokeStyle =
            "#111827";

        ctx.lineWidth = 3;

        ctx.stroke();

        for (let i = 0; i < 4; i++) {

            ctx.beginPath();

            ctx.moveTo(
                x - 10 + i * 7,
                y - 10
            );

            ctx.lineTo(
                x - 12 + i * 8,
                y - 25
            );

            ctx.strokeStyle =
                "#facc15";

            ctx.lineWidth = 6;

            ctx.stroke();

        }

    }


    /* =========================================================
       NORMAL SCENE
    ========================================================= */

    function drawNormalScene() {

        clearCanvas();

        drawBackground();

        drawStadiumLights();

        drawPitch();

        drawGoal();

        drawPenaltySpot();

        if (
            state.mode === "freekick"
        ) {
            drawWall();
        }

        drawPlayer();

        drawAimTarget();

        drawBall();

        /* distance marker */

        ctx.save();

        ctx.fillStyle =
            "rgba(0,0,0,0.35)";

        ctx.fillRect(
            viewWidth * 0.04,
            viewHeight * 0.84,
            105,
            30
        );

        ctx.font =
            "bold 13px Arial";

        ctx.fillStyle =
            "#ffffff";

        ctx.textAlign =
            "center";

        ctx.fillText(
            `${Math.round(state.distance)}m`,
            viewWidth * 0.04 + 52,
            viewHeight * 0.84 + 20
        );

        ctx.restore();

    }


    /* =========================================================
       MAIN DRAW
    ========================================================= */

    function drawScene() {

        if (
            state.mode === "goalkeeper"
        ) {
            drawGoalkeeperScene();
        }
        else {
            drawNormalScene();
        }

    }


    /* =========================================================
       INITIALIZATION
    ========================================================= */

    updatePlayerCard();

    updatePower();

    updateHUD();

    resizeCanvas();

    showOverlay(
        "⚽",
        "FOOTBALL HERO X",
        "Choose your mode, aim your shot, and score.",
        "PLAY"
    );

    drawScene();

});
