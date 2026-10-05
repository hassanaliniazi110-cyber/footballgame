document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =========================================================
       FOOTBALL HERO X
       COMPLETE GAME ENGINE
       ========================================================= */


    /* =========================================================
       ELEMENTS
       ========================================================= */

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const playerSelect = document.getElementById("playerSelect");
    const keeperSelect = document.getElementById("keeperSelect");
    const difficultySelect = document.getElementById("difficultySelect");
    const powerSlider = document.getElementById("powerSlider");

    const powerValue = document.getElementById("powerValue");

    const startOverlay = document.getElementById("startOverlay");
    const resultOverlay = document.getElementById("resultOverlay");

    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const shootButton = document.getElementById("shootButton");
    const saveButton = document.getElementById("saveButton");
    const restartButton = document.getElementById("restartButton");

    const levelValue = document.getElementById("levelValue");
    const goalsValue = document.getElementById("goalsValue");
    const scoreValue = document.getElementById("scoreValue");
    const shotsValue = document.getElementById("shotsValue");

    const modeDisplay = document.getElementById("modeDisplay");
    const distanceDisplay = document.getElementById("distanceDisplay");
    const windDisplay = document.getElementById("windDisplay");
    const comboDisplay = document.getElementById("comboDisplay");

    const playerName = document.getElementById("playerName");
    const playerAvatar = document.getElementById("playerAvatar");
    const playerSpecial = document.getElementById("playerSpecial");

    const keeperName = document.getElementById("keeperName");
    const keeperAvatar = document.getElementById("keeperAvatar");
    const keeperOverall = document.getElementById("keeperOverall");

    const startPlayer = document.getElementById("startPlayer");
    const startKeeper = document.getElementById("startKeeper");
    const startMode = document.getElementById("startMode");

    const playerNameBottom = document.getElementById("playerNameBottom");
    const keeperNameBottom = document.getElementById("keeperNameBottom");

    const bottomPlayer = document.getElementById("bottomPlayer");
    const bottomKeeper = document.getElementById("bottomKeeper");
    const bottomSpecial = document.getElementById("bottomSpecial");

    const controlTitle = document.getElementById("controlTitle");
    const controlDescription = document.getElementById("controlDescription");

    const resultIcon = document.getElementById("resultIcon");
    const resultTitle = document.getElementById("resultTitle");
    const resultMessage = document.getElementById("resultMessage");
    const resultScore = document.getElementById("resultScore");
    const resultCombo = document.getElementById("resultCombo");

    const shootingStat = document.getElementById("shootingStat");
    const powerStat = document.getElementById("powerStat");
    const accuracyStat = document.getElementById("accuracyStat");
    const speedStat = document.getElementById("speedStat");

    const shootingNumber = document.getElementById("shootingNumber");
    const powerNumber = document.getElementById("powerNumber");
    const accuracyNumber = document.getElementById("accuracyNumber");
    const speedNumber = document.getElementById("speedNumber");

    const reflexStat = document.getElementById("reflexStat");
    const divingStat = document.getElementById("divingStat");
    const handlingStat = document.getElementById("handlingStat");
    const positioningStat = document.getElementById("positioningStat");

    const reflexNumber = document.getElementById("reflexNumber");
    const divingNumber = document.getElementById("divingNumber");
    const handlingNumber = document.getElementById("handlingNumber");
    const positioningNumber = document.getElementById("positioningNumber");


    /* =========================================================
       GAME DATABASE
       ========================================================= */

    const players = {

        hassan: {
            name: "Hassan Ali",
            avatar: "HA",
            shooting: 300,
            power: 300,
            accuracy: 300,
            speed: 300,
            special: "Legend Specialist"
        },

        ehan: {
            name: "Ehan Ali",
            avatar: "EA",
            shooting: 90,
            power: 110,
            accuracy: 95,
            speed: 100,
            special: "Power Master"
        },

        arham: {
            name: "Muhammad Arham",
            avatar: "MA",
            shooting: 91,
            power: 93,
            accuracy: 89,
            speed: 92,
            special: "Free Kick Master"
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
            avatar: "CR7",
            shooting: 1000000000000000000,
            power: 999999999999999,
            accuracy: 999999999999,
            speed: 10000000000000000,
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
        },

        zayd: {
            name: "Zayd Quadri",
            avatar: "ZQ",
            shooting: 93,
            power: 90,
            accuracy: 97,
            speed: 98,
            special: "Dribbler Master"
        }

    };
    

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
            reflexes: 100,
            diving: 100,
            handling: 100,
            positioning: 100,
            overall: 100,
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
        },
                
        arham: {
            name: "Muhammad Arham",
            avatar: "MA",
            reflexes: 110,
            diving: 108,
            handling: 98,
            positioning: 99,
            overall: 106
        },
                
        yashin: {
            name: "Lev Yashin",
            avatar: "LY",
            reflexes: 110,
            diving: 108,
            handling: 300,
            positioning: 99,
            overall: 106
        }

    };


    const difficulties = {

        easy: {
            label: "Easy",
            aimError: 0.01,
            keeperReaction: 0.70
        },

        normal: {
            label: "Normal",
            aimError: 0.025,
            keeperReaction: 0.82
        },

        hard: {
            label: "Hard",
            aimError: 0.045,
            keeperReaction: 0.91
        },

        legend: {
            label: "Legend",
            aimError: 0.065,
            keeperReaction: 1.00
        }

    };


    /* =========================================================
       STATE
       ========================================================= */

    const state = {

        mode: "penalty",

        level: 1,

        goals: 0,

        score: 0,

        shots: 0,

        combo: 0,

        playing: false,

        shooting: false,

        resultShown: false,

        shotProgress: 0,

        ballX: 0.50,

        ballY: 0.82,

        ballStartX: 0.50,

        ballStartY: 0.82,

        shotTargetX: 0.50,

        shotTargetY: 0.25,

        keeperX: 0.50,

        keeperY: 0.25,

        keeperStartX: 0.50,

        keeperTargetX: 0.50,

        keeperDiveProgress: 0,

        keeperReacted: false,

        aimX: 0.50,

        aimY: 0.25,

        power: 75,

        wind: 0,

        distance: 12,

        wallPlayers: [],

        lastResult: null,

        mouseDown: false,

        pointerInside: false

    };


    /* =========================================================
       UTILITY FUNCTIONS
       ========================================================= */

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }


    function lerp(a, b, t) {
        return a + (b - a) * t;
    }


    function distance(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }


    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }


    function round(value) {
        return Math.round(value);
    }


    function capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }


    /* =========================================================
       CANVAS
       ========================================================= */

    let canvasWidth = 900;
    let canvasHeight = 620;
    let dpr = window.devicePixelRatio || 1;


    function resizeCanvas() {

        const rect = canvas.getBoundingClientRect();

        canvasWidth = Math.max(320, rect.width);
        canvasHeight = Math.max(420, rect.height);

        dpr = window.devicePixelRatio || 1;

        canvas.width = Math.floor(canvasWidth * dpr);
        canvas.height = Math.floor(canvasHeight * dpr);

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        draw();

    }


    window.addEventListener("resize", resizeCanvas);


    /* =========================================================
       PLAYER UI
       ========================================================= */

    function updatePlayerUI() {

        const player = players[playerSelect.value];

        if (!player) return;

        playerName.textContent = player.name;
        playerAvatar.textContent = player.avatar;
        playerSpecial.textContent = player.special;

        playerNameBottom.textContent = player.name;
        bottomPlayer.textContent = player.avatar;
        bottomSpecial.textContent = player.special;

        shootingNumber.textContent = player.shooting;
        powerNumber.textContent = player.power;
        accuracyNumber.textContent = player.accuracy;
        speedNumber.textContent = player.speed;

        shootingStat.style.width =
            `${clamp(player.shooting, 0, 100)}%`;

        powerStat.style.width =
            `${clamp(player.power, 0, 100)}%`;

        accuracyStat.style.width =
            `${clamp(player.accuracy, 0, 100)}%`;

        speedStat.style.width =
            `${clamp(player.speed, 0, 100)}%`;

    }


    /* =========================================================
       GOALKEEPER UI
       ========================================================= */

    function updateKeeperUI() {

        const keeper = goalkeepers[keeperSelect.value];

        if (!keeper) return;

        keeperName.textContent = keeper.name;
        keeperAvatar.textContent = keeper.avatar;
        keeperOverall.textContent =
            `OVERALL ${keeper.overall}`;

        keeperNameBottom.textContent = keeper.name;
        bottomKeeper.textContent = keeper.avatar;

        reflexNumber.textContent = keeper.reflexes;
        divingNumber.textContent = keeper.diving;
        handlingNumber.textContent = keeper.handling;
        positioningNumber.textContent = keeper.positioning;

        /*
         * 300 is intentionally allowed for Hassan.
         * The visual bar is capped at 100% because CSS bars
         * cannot visually show 300% usefully.
         */

        reflexStat.style.width =
            `${clamp(keeper.reflexes / 3, 0, 100)}%`;

        divingStat.style.width =
            `${clamp(keeper.diving / 3, 0, 100)}%`;

        handlingStat.style.width =
            `${clamp(keeper.handling / 3, 0, 100)}%`;

        positioningStat.style.width =
            `${clamp(keeper.positioning / 3, 0, 100)}%`;

    }


    /* =========================================================
       MODE SETUP
       ========================================================= */

    function setupMode() {

        const mode = state.mode;

        modeDisplay.textContent =
            mode === "freekick"
                ? "FREE KICK"
                : mode === "longshot"
                    ? "LONG SHOT"
                    : mode === "goalkeeper"
                        ? "GOALKEEPING"
                        : "PENALTY";

        startMode.textContent = capitalize(
            mode === "freekick"
                ? "Free Kick"
                : mode === "longshot"
                    ? "Long Shot"
                    : mode === "goalkeeper"
                        ? "Goalkeeping"
                        : "Penalty"
        );


        if (mode === "penalty") {

            state.distance = 12;

            controlTitle.textContent =
                "PENALTY SHOOTOUT";

            controlDescription.textContent =
                "Aim at the goal and beat the goalkeeper.";

        }


        if (mode === "freekick") {

            state.distance = randomBetween(18, 27);

            controlTitle.textContent =
                "FREE KICK";

            controlDescription.textContent =
                "Curve the ball around the wall and goalkeeper.";

        }


        if (mode === "longshot") {

            state.distance = randomBetween(25, 35);

            controlTitle.textContent =
                "LONG SHOT";

            controlDescription.textContent =
                "Choose your target and unleash a powerful strike.";

        }


        if (mode === "goalkeeper") {

            state.distance = 11;

            controlTitle.textContent =
                "GOALKEEPER MODE";

            controlDescription.textContent =
                "Watch the striker and move into the shot.";

        }


        distanceDisplay.textContent =
            `${Math.round(state.distance)} YDS`;

        createWall();

    }


    /* =========================================================
       WALL
       ========================================================= */

    function createWall() {

        state.wallPlayers = [];

        if (state.mode !== "freekick") {
            return;
        }

        const count =
            state.level >= 8
                ? 5
                : state.level >= 5
                    ? 4
                    : 3;

        const center = 0.50;

        for (let i = 0; i < count; i++) {

            const offset =
                (i - (count - 1) / 2) * 0.055;

            state.wallPlayers.push({
                x: center + offset,
                y: 0.39
            });

        }

    }


    /* =========================================================
       NEW SHOT
       ========================================================= */

    function prepareShot() {

        state.playing = true;
        state.shooting = false;
        state.resultShown = false;

        state.shotProgress = 0;

        state.ballStartX = 0.50;
        state.ballStartY =
            state.mode === "longshot"
                ? 0.90
                : 0.82;

        state.ballX = state.ballStartX;
        state.ballY = state.ballStartY;

        state.aimX = 0.50;
        state.aimY = 0.24;

        state.shotTargetX = 0.50;
        state.shotTargetY = 0.24;

        state.keeperX = 0.50;
        state.keeperY = 0.25;

        state.keeperStartX = 0.50;
        state.keeperTargetX = 0.50;

        state.keeperDiveProgress = 0;
        state.keeperReacted = false;

        state.wind =
            Math.round(
                randomBetween(-12, 13)
            );

        windDisplay.textContent =
            `${state.wind > 0 ? "+" : ""}${state.wind} km/h`;

        comboDisplay.textContent =
            `x${state.combo}`;

        createWall();

        startOverlay.classList.add("hidden");
        resultOverlay.classList.add("hidden");

        if (state.mode === "goalkeeper") {

            shootButton.classList.add("hidden");
            saveButton.classList.remove("hidden");

        } else {

            shootButton.classList.remove("hidden");
            saveButton.classList.add("hidden");

        }

        updateUI();

    }


    /* =========================================================
       AIMING
       ========================================================= */

    function aimToPointer(event) {

        if (!state.playing || state.shooting) {
            return;
        }

        const rect = canvas.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;

        if (state.mode === "goalkeeper") {
            return;
        }

        state.aimX =
            clamp(x, 0.13, 0.87);

        state.aimY =
            clamp(y, 0.10, 0.47);

        draw();

    }


    function aimKeyboard(dx, dy) {

        if (!state.playing || state.shooting) {
            return;
        }

        if (state.mode === "goalkeeper") {
            return;
        }

        state.aimX =
            clamp(state.aimX + dx, 0.13, 0.87);

        state.aimY =
            clamp(state.aimY + dy, 0.10, 0.47);

        draw();

    }


    /* =========================================================
       SHOOT
       ========================================================= */

    function shoot() {

        if (!state.playing) {
            return;
        }

        if (state.shooting) {
            return;
        }

        if (state.mode === "goalkeeper") {
            return;
        }

        const player =
            players[playerSelect.value];

        const difficulty =
            difficulties[difficultySelect.value];

        let targetX = state.aimX;
        let targetY = state.aimY;

        /*
         * Accuracy error.
         * Better accuracy = smaller error.
         */

        const accuracyFactor =
            1 - player.accuracy / 100;

        const error =
            difficulty.aimError *
            accuracyFactor;

        targetX += randomBetween(-error, error);
        targetY += randomBetween(-error, error);

        /*
         * Wind affects the horizontal trajectory.
         */

        targetX +=
            state.wind * 0.0015;

        /*
         * Specialists get a small bonus.
         */

        if (
            state.mode === "longshot" &&
            playerSelect.value === "haaland"
        ) {
            targetX =
                lerp(targetX, state.aimX, 0.80);
        }

        if (
            state.mode === "freekick" &&
            playerSelect.value === "yamal"
        ) {
            targetX =
                lerp(targetX, state.aimX, 0.88);
        }

        if (
            state.mode === "penalty" &&
            playerSelect.value === "bellingham"
        ) {
            targetX =
                lerp(targetX, state.aimX, 0.90);
        }

        state.shotTargetX =
            clamp(targetX, 0.08, 0.92);

        state.shotTargetY =
            clamp(targetY, 0.07, 0.49);

        state.power =
            Number(powerSlider.value);

        state.shotProgress = 0;
        state.shooting = true;

        state.shots++;

        state.keeperTargetX =
            calculateKeeperTarget();

        updateUI();

    }


    /* =========================================================
       GOALKEEPER TARGET
       ========================================================= */

    function calculateKeeperTarget() {

        const keeper =
            goalkeepers[keeperSelect.value];

        /*
         * The goalkeeper reacts to the shot target.
         *
         * A stronger goalkeeper predicts closer to the
         * actual target.
         */

        const positioning =
            clamp(keeper.positioning / 100, 0, 3);

        const prediction =
            clamp(
                0.18 +
                positioning * 0.13,
                0.18,
                0.60
            );

        const predicted =
            lerp(
                0.50,
                state.shotTargetX,
                prediction
            );

        return clamp(
            predicted,
            0.10,
            0.90
        );

    }


    /* =========================================================
       KEEPER ANIMATION
       ========================================================= */

    function updateKeeperMovement(progress) {

        const keeper =
            goalkeepers[keeperSelect.value];

        if (!keeper) {
            return;
        }

        const reactionBase =
            0.42 -
            keeper.reflexes / 900;

        const reaction =
            clamp(
                reactionBase,
                0.05,
                0.34
            );

        if (progress < reaction) {

            state.keeperDiveProgress = 0;

            state.keeperX =
                state.keeperStartX;

            state.keeperY =
                0.25;

            state.keeperReacted = false;

            return;
        }

        state.keeperReacted = true;

        const diveT =
            clamp(
                (progress - reaction) /
                (1 - reaction),
                0,
                1
            );

        /*
         * Diving stat controls how far the keeper can move.
         *
         * Hassan has 300 in every stat, so he gets
         * exceptional reach.
         */

        let reach =
            0.55 +
            keeper.diving / 180;

        reach =
            clamp(reach, 0.55, 1.0);

        if (keeperSelect.value === "hassan") {
            reach = 1.0;
        }

        const movement =
            clamp(
                diveT * reach,
                0,
                1
            );

        state.keeperDiveProgress =
            movement;

        state.keeperX =
            lerp(
                state.keeperStartX,
                state.keeperTargetX,
                movement
            );

        /*
         * The goalkeeper also moves vertically.
         * This is mostly visual, but collision uses the same
         * normalized vertical position.
         */

        const verticalTarget =
            clamp(
                state.shotTargetY,
                0.13,
                0.40
            );

        state.keeperY =
            lerp(
                0.25,
                verticalTarget,
                movement * 0.65
            );

    }


    /* =========================================================
       WALL COLLISION
       ========================================================= */

    function checkWallCollision() {

        if (state.mode !== "freekick") {
            return false;
        }

        const progress = state.shotProgress;

        /*
         * Wall is encountered around the middle of the flight.
         */

        if (progress < 0.34 || progress > 0.70) {
            return false;
        }

        for (const wallPlayer of state.wallPlayers) {

            const d =
                distance(
                    state.ballX,
                    state.ballY,
                    wallPlayer.x,
                    wallPlayer.y
                );

            const radius =
                0.035 +
                state.power / 5000;

            if (d < radius) {
                return true;
            }

        }

        return false;

    }


    /* =========================================================
       GOALKEEPER COLLISION
       ========================================================= */

    function checkGoalkeeperCollision() {

        const keeper =
            goalkeepers[keeperSelect.value];

        if (!keeper) {
            return false;
        }

        /*
         * Only check near the goal.
         */

        if (state.shotProgress < 0.72) {
            return false;
        }

        /*
         * IMPORTANT FIX:
         *
         * Collision is calculated from the SAME goalkeeper
         * coordinates used to draw the goalkeeper.
         *
         * Therefore:
         *
         * goalkeeper visually reaches ball
         *             =
         * goalkeeper actually saves ball
         */

        const dx =
            Math.abs(
                state.shotTargetX -
                state.keeperX
            );

        const dy =
            Math.abs(
                state.shotTargetY -
                state.keeperY
            );

        /*
         * Goalkeeper reach.
         */

        let horizontalReach =
            0.075 +
            keeper.diving / 1100 +
            keeper.reflexes / 1500;

        let verticalReach =
            0.075 +
            keeper.diving / 1600 +
            keeper.reflexes / 2200;

        /*
         * Hassan's 300 stats make his reach huge.
         */

        if (keeperSelect.value === "hassan") {

            horizontalReach = 0.32;
            verticalReach = 0.24;

        }

        horizontalReach =
            clamp(
                horizontalReach,
                0.08,
                0.32
            );

        verticalReach =
            clamp(
                verticalReach,
                0.08,
                0.24
            );

        /*
         * The main deterministic save condition.
         */

        if (
            dx <= horizontalReach &&
            dy <= verticalReach
        ) {

            return true;

        }

        /*
         * Secondary collision:
         * near misses can still be saved by elite keepers.
         */

        const combined =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        const combinedReach =
            Math.sqrt(
                horizontalReach * horizontalReach +
                verticalReach * verticalReach
            );

        if (
            combined <=
            combinedReach * 1.08
        ) {

            const quality =
                clamp(
                    (
                        keeper.reflexes +
                        keeper.diving +
                        keeper.positioning
                    ) / 300,
                    0,
                    3
                );

            if (
                quality >= 2.75 ||
                keeperSelect.value === "hassan"
            ) {

                return true;

            }

        }

        return false;

    }


    /* =========================================================
       GOAL AREA
       ========================================================= */

    function isInsideGoal() {

        return (
            state.shotTargetX >= 0.11 &&
            state.shotTargetX <= 0.89 &&
            state.shotTargetY >= 0.08 &&
            state.shotTargetY <= 0.49
        );

    }


    /* =========================================================
       RESOLVE SHOT
       ========================================================= */

    function resolveShot() {

        state.shooting = false;

        /*
         * Make sure the goalkeeper reaches the exact same
         * final visual position used for the collision check.
         */

        updateKeeperMovement(1);

        const insideGoal =
            isInsideGoal();

        const wallBlock =
            checkWallCollision();

        const keeperSave =
            checkGoalkeeperCollision();

        let saved = false;
        let goal = false;

        /*
         * Wall gets priority.
         */

        if (wallBlock) {

            saved = true;

        } else if (
            insideGoal &&
            keeperSave
        ) {

            /*
             * FIXED:
             * If keeper reaches the shot, it is a save.
             */

            saved = true;

        } else if (insideGoal) {

            goal = true;

        } else {

            saved = true;

        }


        if (goal) {

            state.goals++;

            state.combo++;

            const baseScore =
                100 +
                Math.round(state.power) +
                state.level * 15;

            const comboBonus =
                state.combo * 25;

            const finalScore =
                baseScore +
                comboBonus;

            state.score += finalScore;

            state.lastResult = {
                type: "goal",
                score: finalScore
            };

            showResult(
                "goal",
                finalScore
            );

        } else {

            state.combo = 0;

            state.lastResult = {
                type: "save",
                score: 0
            };

            showResult(
                wallBlock
                    ? "wall"
                    : "save",
                0
            );

        }

        updateUI();

    }


    /* =========================================================
       GOALKEEPER MODE
       ========================================================= */

    function startGoalkeeperShot() {

        if (!state.playing || state.shooting) {
            return;
        }

        state.shots++;

        state.shooting = true;

        state.shotProgress = 0;

        /*
         * The striker shoots toward a random target.
         */

        state.shotTargetX =
            randomBetween(0.18, 0.82);

        state.shotTargetY =
            randomBetween(0.12, 0.43);

        state.ballStartX = 0.50;
        state.ballStartY = 0.82;

        state.ballX =
            state.ballStartX;

        state.ballY =
            state.ballStartY;

        state.keeperStartX =
            state.keeperX;

        state.keeperTargetX =
            state.keeperX;

        state.keeperDiveProgress = 0;

        state.keeperReacted = false;

    }


    function goalkeeperSave() {

        if (!state.playing || state.shooting) {
            return;
        }

        startGoalkeeperShot();

    }


    function resolveGoalkeeperMode() {

        const keeper =
            goalkeepers[keeperSelect.value];

        const dx =
            Math.abs(
                state.keeperX -
                state.shotTargetX
            );

        const dy =
            Math.abs(
                state.keeperY -
                state.shotTargetY
            );

        let reachX =
            0.08 +
            keeper.diving / 1100;

        let reachY =
            0.08 +
            keeper.reflexes / 1800;

        if (keeperSelect.value === "hassan") {

            reachX = 0.32;
            reachY = 0.25;

        }

        const saved =
            dx <= reachX &&
            dy <= reachY;

        state.shooting = false;

        if (saved) {

            state.goals++;
            state.combo++;

            const points =
                150 +
                state.combo * 30;

            state.score += points;

            showResult(
                "goalkeeper-save",
                points
            );

        } else {

            state.combo = 0;

            showResult(
                "goalkeeper-goal",
                0
            );

        }

        updateUI();

    }


    /* =========================================================
       RESULT
       ========================================================= */

    function showResult(type, points) {

        state.resultShown = true;

        resultOverlay.classList.remove("hidden");

        if (type === "goal") {

            resultIcon.textContent = "⚽";
            resultTitle.textContent = "GOAL!";
            resultMessage.textContent =
                "What a finish! The goalkeeper could not reach it.";

        }

        if (type === "save") {

            resultIcon.textContent = "🧤";
            resultTitle.textContent = "SAVED!";

            resultMessage.textContent =
                "The goalkeeper got there.";

        }

        if (type === "wall") {

            resultIcon.textContent = "🧱";
            resultTitle.textContent = "BLOCKED!";

            resultMessage.textContent =
                "The wall stopped the free kick.";

        }

        if (type === "goalkeeper-save") {

            resultIcon.textContent = "🧤";
            resultTitle.textContent = "GREAT SAVE!";

            resultMessage.textContent =
                "You reached the ball!";

        }

        if (type === "goalkeeper-goal") {

            resultIcon.textContent = "⚽";
            resultTitle.textContent = "GOAL!";

            resultMessage.textContent =
                "The striker found the corner.";

        }

        resultScore.textContent =
            points;

        resultCombo.textContent =
            `x${state.combo}`;

        state.level =
            Math.max(
                1,
                Math.floor(state.goals / 3) + 1
            );

        levelValue.textContent =
            state.level;

    }


    /* =========================================================
       NEXT SHOT
       ========================================================= */

    function nextShot() {

        resultOverlay.classList.add("hidden");

        prepareShot();

    }


    /* =========================================================
       RESTART
       ========================================================= */

    function restartGame() {

        state.level = 1;
        state.goals = 0;
        state.score = 0;
        state.shots = 0;
        state.combo = 0;

        state.playing = false;
        state.shooting = false;
        state.resultShown = false;

        state.ballX = 0.50;
        state.ballY = 0.82;

        state.keeperX = 0.50;
        state.keeperY = 0.25;

        setupMode();

        resultOverlay.classList.add("hidden");
        startOverlay.classList.remove("hidden");

        shootButton.classList.remove("hidden");
        saveButton.classList.add("hidden");

        updateUI();
        draw();

    }


    /* =========================================================
       UI
       ========================================================= */

    function updateUI() {

        updatePlayerUI();
        updateKeeperUI();

        levelValue.textContent =
            state.level;

        goalsValue.textContent =
            state.goals;

        scoreValue.textContent =
            state.score;

        shotsValue.textContent =
            state.shots;

        comboDisplay.textContent =
            `x${state.combo}`;

        startPlayer.textContent =
            players[playerSelect.value].name;

        startKeeper.textContent =
            goalkeepers[keeperSelect.value].name;

        playerNameBottom.textContent =
            players[playerSelect.value].name;

        keeperNameBottom.textContent =
            goalkeepers[keeperSelect.value].name;

    }


    /* =========================================================
       DRAWING
       ========================================================= */

    function draw() {

        const w = canvasWidth;
        const h = canvasHeight;

        ctx.clearRect(0, 0, w, h);

        drawSky(w, h);

        drawPitch(w, h);

        drawPitchLines(w, h);

        drawGoal(w, h);

        drawWall(w, h);

        if (state.mode !== "goalkeeper") {
            drawKeeper(w, h);
        } else {
            drawKeeper(w, h);
            drawStriker(w, h);
        }

        drawBall(w, h);

        if (
            state.playing &&
            !state.shooting &&
            state.mode !== "goalkeeper"
        ) {

            drawAim(w, h);

        }

        if (
            state.playing &&
            state.mode === "goalkeeper"
        ) {

            drawKeeperTarget(w, h);

        }

    }


    /* =========================================================
       SKY
       ========================================================= */

    function drawSky(w, h) {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                h
            );

        gradient.addColorStop(
            0,
            "#0b2447"
        );

        gradient.addColorStop(
            0.45,
            "#176b42"
        );

        gradient.addColorStop(
            1,
            "#063b24"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            w,
            h
        );

        /*
         * Stadium lights.
         */

        ctx.fillStyle =
            "rgba(255,255,255,0.15)";

        for (let i = 0; i < 8; i++) {

            const x =
                (i + 0.5) *
                (w / 8);

            ctx.beginPath();

            ctx.arc(
                x,
                h * 0.07,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }

    }


    /* =========================================================
       PITCH
       ========================================================= */

    function drawPitch(w, h) {

        const gradient =
            ctx.createLinearGradient(
                0,
                h * 0.25,
                0,
                h
            );

        gradient.addColorStop(
            0,
            "#159447"
        );

        gradient.addColorStop(
            1,
            "#087334"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            h * 0.20,
            w,
            h * 0.80
        );

        /*
         * Pitch stripes.
         */

        const stripeHeight =
            h * 0.10;

        for (
            let y = h * 0.20, i = 0;
            y < h;
            y += stripeHeight, i++
        ) {

            if (i % 2 === 0) {

                ctx.fillStyle =
                    "rgba(255,255,255,0.035)";

                ctx.fillRect(
                    0,
                    y,
                    w,
                    stripeHeight
                );

            }

        }

    }


    /* =========================================================
       PITCH LINES
       ========================================================= */

    function drawPitchLines(w, h) {

        ctx.strokeStyle =
            "rgba(255,255,255,0.65)";

        ctx.lineWidth = 3;

        /*
         * Penalty box.
         */

        ctx.strokeRect(
            w * 0.20,
            h * 0.20,
            w * 0.60,
            h * 0.35
        );

        /*
         * Six-yard box.
         */

        ctx.strokeRect(
            w * 0.32,
            h * 0.20,
            w * 0.36,
            h * 0.18
        );

        /*
         * Penalty arc.
         */

        ctx.beginPath();

        ctx.arc(
            w * 0.50,
            h * 0.55,
            w * 0.12,
            Math.PI,
            0
        );

        ctx.stroke();

        /*
         * Center field line.
         */

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
       GOAL
       ========================================================= */

    function drawGoal(w, h) {

        const goalX =
            w * 0.10;

        const goalY =
            h * 0.055;

        const goalW =
            w * 0.80;

        const goalH =
            h * 0.18;

        /*
         * Net.
         */

        ctx.fillStyle =
            "rgba(245,245,245,0.16)";

        ctx.fillRect(
            goalX,
            goalY,
            goalW,
            goalH
        );

        /*
         * Net lines.
         */

        ctx.strokeStyle =
            "rgba(255,255,255,0.24)";

        ctx.lineWidth = 1;

        for (
            let x = goalX;
            x <= goalX + goalW;
            x += goalW / 18
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x,
                goalY
            );

            ctx.lineTo(
                x,
                goalY + goalH
            );

            ctx.stroke();

        }

        for (
            let y = goalY;
            y <= goalY + goalH;
            y += goalH / 6
        ) {

            ctx.beginPath();

            ctx.moveTo(
                goalX,
                y
            );

            ctx.lineTo(
                goalX + goalW,
                y
            );

            ctx.stroke();

        }

        /*
         * Goal frame.
         */

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth = 8;

        ctx.strokeRect(
            goalX,
            goalY,
            goalW,
            goalH
        );

    }


    /* =========================================================
       WALL
       ========================================================= */

    function drawWall(w, h) {

        if (
            state.mode !== "freekick" ||
            state.wallPlayers.length === 0
        ) {
            return;
        }

        for (const person of state.wallPlayers) {

            const x =
                w * person.x;

            const y =
                h * person.y;

            /*
             * Body.
             */

            ctx.fillStyle =
                "#26384d";

            ctx.fillRect(
                x - 13,
                y - 25,
                26,
                48
            );

            /*
             * Head.
             */

            ctx.fillStyle =
                "#d49a72";

            ctx.beginPath();

            ctx.arc(
                x,
                y - 38,
                10,
                0,
                Math.PI * 2
            );

            ctx.fill();

            /*
             * Legs.
             */

            ctx.strokeStyle =
                "#172335";

            ctx.lineWidth = 7;

            ctx.beginPath();

            ctx.moveTo(
                x - 6,
                y + 22
            );

            ctx.lineTo(
                x - 9,
                y + 43
            );

            ctx.moveTo(
                x + 6,
                y + 22
            );

            ctx.lineTo(
                x + 9,
                y + 43
            );

            ctx.stroke();

        }

    }


    /* =========================================================
       GOALKEEPER
       ========================================================= */

    function drawKeeper(w, h) {

        const x =
            w * state.keeperX;

        const y =
            h * state.keeperY;

        const keeper =
            goalkeepers[keeperSelect.value];

        if (!keeper) return;

        const diving =
            Math.abs(
                state.keeperX -
                0.50
            );

        /*
         * Shadow.
         */

        ctx.fillStyle =
            "rgba(0,0,0,0.22)";

        ctx.beginPath();

        ctx.ellipse(
            x,
            y + h * 0.075,
            w * 0.055,
            h * 0.018,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        /*
         * Body.
         */

        ctx.save();

        ctx.translate(
            x,
            y
        );

        if (diving > 0.10) {

            ctx.rotate(
                (state.keeperX - 0.50) *
                1.5
            );

        }

        /*
         * Jersey.
         */

        ctx.fillStyle =
            "#ff9f1c";

        ctx.beginPath();

        ctx.roundRect(
            -22,
            -10,
            44,
            55,
            10
        );

        ctx.fill();

        /*
         * Head.
         */

        ctx.fillStyle =
            "#d69b76";

        ctx.beginPath();

        ctx.arc(
            0,
            -32,
            15,
            0,
            Math.PI * 2
        );

        ctx.fill();

        /*
         * Hair.
         */

        ctx.fillStyle =
            "#202020";

        ctx.beginPath();

        ctx.arc(
            0,
            -39,
            14,
            Math.PI,
            Math.PI * 2
        );

        ctx.fill();

        /*
         * Arms.
         */

        ctx.strokeStyle =
            "#ffb347";

        ctx.lineWidth = 13;

        ctx.lineCap = "round";

        ctx.beginPath();

        ctx.moveTo(
            -17,
            2
        );

        ctx.lineTo(
            -38,
            18
        );

        ctx.moveTo(
            17,
            2
        );

        ctx.lineTo(
            38,
            18
        );

        ctx.stroke();

        /*
         * Gloves.
         */

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            -40,
            19,
            8,
            0,
            Math.PI * 2
        );

        ctx.arc(
            40,
            19,
            8,
            0,
            Math.PI * 2
        );

        ctx.fill();

        /*
         * Legs.
         */

        ctx.strokeStyle =
            "#202b3c";

        ctx.lineWidth = 11;

        ctx.beginPath();

        ctx.moveTo(
            -8,
            44
        );

        ctx.lineTo(
            -14,
            70
        );

        ctx.moveTo(
            8,
            44
        );

        ctx.lineTo(
            14,
            70
        );

        ctx.stroke();

        ctx.restore();

    }


    /* =========================================================
       STRIKER
       ========================================================= */

    function drawStriker(w, h) {

        const x =
            w * 0.50;

        const y =
            h * 0.75;

        ctx.save();

        ctx.translate(
            x,
            y
        );

        ctx.fillStyle =
            "#1e3a8a";

        ctx.fillRect(
            -19,
            -30,
            38,
            60
        );

        ctx.fillStyle =
            "#d49a72";

        ctx.beginPath();

        ctx.arc(
            0,
            -48,
            14,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.strokeStyle =
            "#111827";

        ctx.lineWidth = 10;

        ctx.beginPath();

        ctx.moveTo(
            -8,
            28
        );

        ctx.lineTo(
            -14,
            60
        );

        ctx.moveTo(
            8,
            28
        );

        ctx.lineTo(
            14,
            60
        );

        ctx.stroke();

        ctx.restore();

    }


    /* =========================================================
       BALL
       ========================================================= */

    function drawBall(w, h) {

        const x =
            w * state.ballX;

        const y =
            h * state.ballY;

        let radius = 11;

        if (state.shooting) {

            radius =
                lerp(
                    13,
                    7,
                    state.shotProgress
                );

        }

        /*
         * Ball shadow.
         */

        ctx.fillStyle =
            "rgba(0,0,0,0.25)";

        ctx.beginPath();

        ctx.ellipse(
            x,
            y + radius * 1.1,
            radius * 1.2,
            radius * 0.45,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        /*
         * Ball.
         */

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

        ctx.strokeStyle =
            "#111111";

        ctx.lineWidth = 1.5;

        ctx.stroke();

        /*
         * Ball pattern.
         */

        ctx.fillStyle =
            "#111111";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius * 0.30,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.beginPath();

        ctx.arc(
            x - radius * 0.62,
            y - radius * 0.28,
            radius * 0.14,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + radius * 0.60,
            y - radius * 0.25,
            radius * 0.14,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x - radius * 0.30,
            y + radius * 0.60,
            radius * 0.14,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + radius * 0.35,
            y + radius * 0.55,
            radius * 0.14,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    /* =========================================================
       AIM
       ========================================================= */

    function drawAim(w, h) {

        const x =
            w * state.aimX;

        const y =
            h * state.aimY;

        ctx.save();

        ctx.strokeStyle =
            "rgba(255,255,255,0.85)";

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

        ctx.fillStyle =
            "rgba(255,255,255,0.9)";

        ctx.font =
            "bold 12px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            "AIM",
            x,
            y - 32
        );

        ctx.restore();

    }


    /* =========================================================
       KEEPER TARGET
       ========================================================= */

    function drawKeeperTarget(w, h) {

        const x =
            w * state.shotTargetX;

        const y =
            h * state.shotTargetY;

        ctx.strokeStyle =
            "rgba(255,80,80,0.8)";

        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            14,
            0,
            Math.PI * 2
        );

        ctx.stroke();

    }


    /* =========================================================
       ANIMATION UPDATE
       ========================================================= */

    function update() {

        if (!state.shooting) {
            return;
        }

        /*
         * Goalkeeper mode.
         */

        if (state.mode === "goalkeeper") {

            state.shotProgress +=
                0.017;

        } else {

            const power =
                Number(powerSlider.value);

            const speed =
                0.010 +
                power / 9000;

            state.shotProgress += speed;

        }

        state.shotProgress =
            clamp(
                state.shotProgress,
                0,
                1
            );


        /*
         * Ball trajectory.
         */

        const t =
            state.shotProgress;

        const eased =
            t * t * (3 - 2 * t);

        state.ballX =
            lerp(
                state.ballStartX,
                state.shotTargetX,
                eased
            );

        state.ballY =
            lerp(
                state.ballStartY,
                state.shotTargetY,
                eased
            );


        /*
         * Slight curve.
         */

        if (
            state.mode === "freekick" &&
            !checkWallCollision()
        ) {

            const curve =
                Math.sin(
                    t * Math.PI
                ) *
                (
                    state.wind * 0.001 +
                    (
                        playerSelect.value === "yamal"
                            ? 0.012
                            : 0.004
                    )
                );

            state.ballX += curve;

        }


        /*
         * Move goalkeeper using the exact same state
         * coordinates used for collision detection.
         */

        updateKeeperMovement(t);


        /*
         * Wall collision happens during flight.
         */

        if (
            state.mode === "freekick" &&
            checkWallCollision()
        ) {

            state.ballX =
                state.ballX;

        }


        if (state.shotProgress >= 1) {

            if (state.mode === "goalkeeper") {

                resolveGoalkeeperMode();

            } else {

                resolveShot();

            }

        }

    }


    /* =========================================================
       GAME LOOP
       ========================================================= */

    function loop() {

        update();

        draw();

        requestAnimationFrame(loop);

    }


    /* =========================================================
       MODE BUTTONS
       ========================================================= */

    document
        .querySelectorAll(".mode-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".mode-button")
                        .forEach(btn => {
                            btn.classList.remove("active");
                        });

                    button.classList.add("active");

                    state.mode =
                        button.dataset.mode;

                    setupMode();

                    state.playing = false;
                    state.shooting = false;

                    resultOverlay.classList.add("hidden");
                    startOverlay.classList.remove("hidden");

                    shootButton.classList.remove("hidden");
                    saveButton.classList.add("hidden");

                    if (
                        state.mode === "goalkeeper"
                    ) {

                        shootButton.classList.add("hidden");
                        saveButton.classList.remove("hidden");

                    }

                    updateUI();
                    draw();

                }
            );

        });


    /* =========================================================
       SELECT EVENTS
       ========================================================= */

    playerSelect.addEventListener(
        "change",
        () => {

            updatePlayerUI();
            draw();

        }
    );


    keeperSelect.addEventListener(
        "change",
        () => {

            updateKeeperUI();
            draw();

        }
    );


    difficultySelect.addEventListener(
        "change",
        () => {

            draw();

        }
    );


    powerSlider.addEventListener(
        "input",
        () => {

            state.power =
                Number(powerSlider.value);

            powerValue.textContent =
                `${state.power}%`;

        }
    );


    /* =========================================================
       BUTTON EVENTS
       ========================================================= */

    startButton.addEventListener(
        "click",
        () => {

            prepareShot();

        }
    );


    nextButton.addEventListener(
        "click",
        () => {

            nextShot();

        }
    );


    shootButton.addEventListener(
        "click",
        () => {

            shoot();

        }
    );


    saveButton.addEventListener(
        "click",
        () => {

            goalkeeperSave();

        }
    );


    restartButton.addEventListener(
        "click",
        () => {

            restartGame();

        }
    );


    /* =========================================================
       POINTER AIM
       ========================================================= */

    canvas.addEventListener(
        "pointermove",
        event => {

            aimToPointer(event);

        }
    );


    canvas.addEventListener(
        "pointerenter",
        () => {

            state.pointerInside = true;

        }
    );


    canvas.addEventListener(
        "pointerleave",
        () => {

            state.pointerInside = false;

        }
    );


    /* =========================================================
       KEYBOARD CONTROLS
       ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            const key =
                event.key.toLowerCase();

            if (
                key === "arrowleft" ||
                key === "a"
            ) {

                aimKeyboard(
                    -0.025,
                    0
                );

                event.preventDefault();

            }

            if (
                key === "arrowright" ||
                key === "d"
            ) {

                aimKeyboard(
                    0.025,
                    0
                );

                event.preventDefault();

            }

            if (
                key === "arrowup" ||
                key === "w"
            ) {

                aimKeyboard(
                    0,
                    -0.025
                );

                event.preventDefault();

            }

            if (
                key === "arrowdown" ||
                key === "s"
            ) {

                aimKeyboard(
                    0,
                    0.025
                );

                event.preventDefault();

            }

            if (key === " ") {

                event.preventDefault();

                if (state.mode === "goalkeeper") {

                    goalkeeperSave();

                } else {

                    shoot();

                }

            }

        }
    );


    /* =========================================================
       INITIALIZATION
       ========================================================= */

    function initialize() {

        setupMode();

        updateUI();

        powerValue.textContent =
            `${powerSlider.value}%`;

        resizeCanvas();

        draw();

        requestAnimationFrame(loop);

    }


    initialize();

});
