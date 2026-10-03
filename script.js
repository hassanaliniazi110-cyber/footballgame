"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const canvas = document.getElementById("footballCanvas");
    const ctx = canvas.getContext("2d");

    const startScreen =
        document.getElementById("startScreen");

    const resultScreen =
        document.getElementById("resultScreen");

    const startButton =
        document.getElementById("startButton");

    const nextButton =
        document.getElementById("nextButton");

    const shootButton =
        document.getElementById("shootButton");

    const saveButton =
        document.getElementById("saveButton");

    const restartButton =
        document.getElementById("restartButton");

    const playerSelect =
        document.getElementById("playerSelect");

    const difficultySelect =
        document.getElementById("difficulty");

    const powerSlider =
        document.getElementById("power");

    const powerText =
        document.getElementById("powerText");

    const modeButtons =
        document.querySelectorAll(".mode-btn");

    const resultIcon =
        document.getElementById("resultIcon");

    const resultTitle =
        document.getElementById("resultTitle");

    const resultText =
        document.getElementById("resultText");


    /* =====================================================
       PLAYER DATA
    ===================================================== */

    const PLAYERS = {

        hassan: {
            name: "Hassan Ali",
            initials: "HA",
            role: "Goalkeeper / All-Rounder",
            shooting: 300,
            power: 300,
            accuracy: 300,
            reflex: 300,
            keeper: 300,
            penalty: 300,
            freeKick: 300
        },

        ehan: {
            name: "Ehan Ali",
            initials: "EA",
            role: "Goalkeeper",
            shooting: 270,
            power: 280,
            accuracy: 275,
            reflex: 295,
            keeper: 295,
            penalty: 265,
            freeKick: 260
        },

        umar: {
            name: "Umar Shoaib",
            initials: "US",
            role: "Attacking Player",
            shooting: 240,
            power: 245,
            accuracy: 230,
            reflex: 220,
            keeper: 180,
            penalty: 235,
            freeKick: 220
        },

        arham: {
            name: "Muhammad Arham",
            initials: "MA",
            role: "All-Round Player",
            shooting: 235,
            power: 235,
            accuracy: 240,
            reflex: 225,
            keeper: 210,
            penalty: 230,
            freeKick: 235
        },

        ronaldo: {
            name: "Cristiano Ronaldo",
            initials: "CR",
            role: "Power Forward",
            shooting: 290,
            power: 300,
            accuracy: 280,
            reflex: 265,
            keeper: 100,
            penalty: 295,
            freeKick: 275
        },

        haaland: {
            name: "Erling Haaland",
            initials: "EH",
            role: "Long-Shot Specialist",
            shooting: 290,
            power: 320,
            accuracy: 270,
            reflex: 250,
            keeper: 90,
            penalty: 275,
            freeKick: 250
        },

        bellingham: {
            name: "Jude Bellingham",
            initials: "JB",
            role: "Penalty Specialist",
            shooting: 275,
            power: 270,
            accuracy: 295,
            reflex: 265,
            keeper: 100,
            penalty: 320,
            freeKick: 265
        },

        yamal: {
            name: "Lamine Yamal",
            initials: "LY",
            role: "Free-Kick Specialist",
            shooting: 275,
            power: 255,
            accuracy: 305,
            reflex: 275,
            keeper: 90,
            penalty: 265,
            freeKick: 320
        },

        mbappe: {
            name: "Kylian Mbappé",
            initials: "KM",
            role: "Speed Attacker",
            shooting: 285,
            power: 285,
            accuracy: 280,
            reflex: 295,
            keeper: 95,
            penalty: 280,
            freeKick: 245
        },

        messi: {
            name: "Lionel Messi",
            initials: "LM",
            role: "Precision Specialist",
            shooting: 290,
            power: 250,
            accuracy: 315,
            reflex: 285,
            keeper: 90,
            penalty: 290,
            freeKick: 315
        }

    };


    /* =====================================================
       DIFFICULTY
    ===================================================== */

    const DIFFICULTIES = {

        easy: {
            keeper: 0.25,
            error: 0.045,
            reaction: 0.85
        },

        normal: {
            keeper: 0.40,
            error: 0.060,
            reaction: 1
        },

        hard: {
            keeper: 0.56,
            error: 0.075,
            reaction: 1.15
        },

        legend: {
            keeper: 0.68,
            error: 0.090,
            reaction: 1.30
        }

    };


    /* =====================================================
       STATE
    ===================================================== */

    const game = {

        running: false,

        mode: "penalty",

        phase: "ready",

        player: "hassan",

        difficulty: "normal",

        power: 75,

        level: 1,

        goals: 0,

        saves: 0,

        shots: 0,

        score: 0,

        combo: 0,

        best: 0,

        distance: 11,

        wind: 0,

        aimX: 0.50,

        aimY: 0.30,

        keeperX: 0.50,

        keeperY: 0.35,

        ball: null,

        incomingBall: null,

        wall: [],

        animation: null,

        lastTime: 0,

        width: 900,

        height: 550,

        pointerDown: false,

        round: 0

    };


    /* =====================================================
       BEST SCORE
    ===================================================== */

    try {

        game.best =
            Number(
                localStorage.getItem(
                    "footballHeroBest"
                )
            ) || 0;

    } catch (error) {

        game.best = 0;

    }


    /* =====================================================
       UTILITY
    ===================================================== */

    function clamp(value, min, max) {

        return Math.max(
            min,
            Math.min(max, value)
        );

    }


    function random(min, max) {

        return Math.random() *
            (max - min) +
            min;

    }


    function lerp(a, b, t) {

        return a +
            (b - a) * t;

    }


    function ease(t) {

        return 1 -
            Math.pow(1 - t, 3);

    }


    function distance(x1, y1, x2, y2) {

        return Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2)
        );

    }


    function player() {

        return PLAYERS[game.player];

    }


    function difficulty() {

        return DIFFICULTIES[
            game.difficulty
        ];

    }


    /* =====================================================
       CANVAS RESIZE
    ===================================================== */

    function resizeCanvas() {

        const rect =
            canvas.getBoundingClientRect();

        game.width =
            Math.max(320, rect.width);

        game.height =
            Math.max(350, rect.height);

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        canvas.width =
            Math.round(
                game.width * dpr
            );

        canvas.height =
            Math.round(
                game.height * dpr
            );

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


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =====================================================
       UI UPDATE
    ===================================================== */

    function updateUI() {

        document.getElementById("level")
            .textContent = game.level;

        document.getElementById("goals")
            .textContent = game.goals;

        document.getElementById("score")
            .textContent = game.score;

        document.getElementById("shots")
            .textContent = game.shots;

        document.getElementById("bottomGoals")
            .textContent = game.goals;

        document.getElementById("saves")
            .textContent = game.saves;

        document.getElementById("bottomCombo")
            .textContent = game.combo;

        document.getElementById("combo")
            .textContent = game.combo;

        document.getElementById("best")
            .textContent = game.best;

        document.getElementById("distance")
            .textContent =
            `${game.distance} m`;

        document.getElementById("wind")
            .textContent =
            `${game.wind > 0 ? "+" : ""}${game.wind} km/h`;

        powerText.textContent =
            `${game.power}%`;

    }


    function updatePlayerUI() {

        const p = player();

        document.getElementById(
            "playerInitials"
        ).textContent = p.initials;

        document.getElementById(
            "playerName"
        ).textContent = p.name;

        document.getElementById(
            "playerRole"
        ).textContent = p.role;

        setStat(
            "shootingStat",
            p.shooting
        );

        setStat(
            "powerStat",
            p.power
        );

        setStat(
            "accuracyStat",
            p.accuracy
        );

        setStat(
            "reflexStat",
            p.reflex
        );

        setStat(
            "keeperStat",
            p.keeper
        );

    }


    function setStat(id, value) {

        const element =
            document.getElementById(id);

        const percent =
            clamp(
                value / 3,
                0,
                100
            );

        element.style.width =
            `${percent}%`;

    }


    /* =====================================================
       MODE SETUP
    ===================================================== */

    function setupMode() {

        game.phase = "ready";

        game.ball = null;

        game.incomingBall = null;

        game.wind =
            Math.round(
                random(-8, 9)
            );

        game.aimX = 0.50;
        game.aimY = 0.30;

        if (game.mode === "penalty") {

            game.distance = 11;

            document.getElementById(
                "modeName"
            ).textContent = "PENALTY";

            document.getElementById(
                "instructionText"
            ).textContent =
                "Tap the goal to aim, then SHOOT";

            shootButton.classList.remove(
                "hidden"
            );

            saveButton.classList.add(
                "hidden"
            );

        }


        if (game.mode === "freekick") {

            game.distance =
                Math.round(
                    random(18, 29)
                );

            document.getElementById(
                "modeName"
            ).textContent =
                "FREE KICK";

            document.getElementById(
                "instructionText"
            ).textContent =
                "Aim around the wall, then SHOOT";

            shootButton.classList.remove(
                "hidden"
            );

            saveButton.classList.add(
                "hidden"
            );

            createWall();

        }


        if (game.mode === "longshot") {

            game.distance =
                Math.round(
                    random(28, 40)
                );

            document.getElementById(
                "modeName"
            ).textContent =
                "LONG SHOT";

            document.getElementById(
                "instructionText"
            ).textContent =
                "Pick your target and use the power slider";

            shootButton.classList.remove(
                "hidden"
            );

            saveButton.classList.add(
                "hidden"
            );

        }


        if (game.mode === "goalkeeper") {

            game.distance =
                Math.round(
                    random(15, 25)
                );

            document.getElementById(
                "modeName"
            ).textContent =
                "GOALKEEPER";

            document.getElementById(
                "instructionText"
            ).textContent =
                "Move your gloves to the ball and press SAVE";

            shootButton.classList.add(
                "hidden"
            );

            saveButton.classList.remove(
                "hidden"
            );

            game.keeperX = 0.50;
            game.keeperY = 0.70;

            createIncomingBall();

        }

        updateUI();

        draw();

    }


    /* =====================================================
       WALL
    ===================================================== */

    function createWall() {

        game.wall = [];

        let count = 5;

        if (game.difficulty === "easy") {
            count = 3;
        }

        if (game.difficulty === "hard") {
            count = 6;
        }

        if (game.difficulty === "legend") {
            count = 7;
        }

        const spacing = 0.055;

        const start =
            0.50 -
            ((count - 1) * spacing) / 2;

        for (let i = 0; i < count; i++) {

            game.wall.push({
                x: start + i * spacing,
                y: 0.47
            });

        }

    }


    /* =====================================================
       GOALKEEPER SHOT
    ===================================================== */

    function createIncomingBall() {

        const targets = [

            { x: 0.20, y: 0.28 },
            { x: 0.35, y: 0.25 },
            { x: 0.50, y: 0.30 },
            { x: 0.65, y: 0.25 },
            { x: 0.80, y: 0.28 },
            { x: 0.28, y: 0.48 },
            { x: 0.72, y: 0.48 }

        ];

        const target =
            targets[
                Math.floor(
                    Math.random() *
                    targets.length
                )
            ];

        game.incomingBall = {

            x: 0.50,
            y: 0.95,

            startX: 0.50,
            startY: 0.95,

            targetX: target.x,
            targetY: target.y,

            progress: 0

        };

        game.phase = "keeperReady";

    }


    /* =====================================================
       START
    ===================================================== */

    function startGame() {

        game.running = true;

        game.phase = "ready";

        game.goals = 0;
        game.saves = 0;
        game.shots = 0;
        game.score = 0;
        game.combo = 0;
        game.level = 1;
        game.round = 0;

        startScreen.classList.add(
            "hidden"
        );

        resultScreen.classList.add(
            "hidden"
        );

        setupMode();

    }


    startButton.addEventListener(
        "click",
        startGame
    );


    /* =====================================================
       NEXT ROUND
    ===================================================== */

    function nextRound() {

        resultScreen.classList.add(
            "hidden"
        );

        game.round++;

        game.level =
            Math.floor(
                game.goals / 3
            ) + 1;

        setupMode();

    }


    nextButton.addEventListener(
        "click",
        nextRound
    );


    /* =====================================================
       RESTART
    ===================================================== */

    restartButton.addEventListener(
        "click",
        startGame
    );


    /* =====================================================
       MODE BUTTONS
    ===================================================== */

    modeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    modeButtons.forEach(
                        function (b) {
                            b.classList.remove(
                                "active"
                            );
                        }
                    );

                    button.classList.add(
                        "active"
                    );

                    game.mode =
                        button.dataset.mode;

                    if (!game.running) {
                        return;
                    }

                    setupMode();

                }
            );

        }
    );


    /* =====================================================
       PLAYER
    ===================================================== */

    playerSelect.addEventListener(
        "change",
        function () {

            game.player =
                playerSelect.value;

            updatePlayerUI();

            draw();

        }
    );


    /* =====================================================
       DIFFICULTY
    ===================================================== */

    difficultySelect.addEventListener(
        "change",
        function () {

            game.difficulty =
                difficultySelect.value;

            if (game.running) {
                setupMode();
            }

        }
    );


    /* =====================================================
       POWER
    ===================================================== */

    powerSlider.addEventListener(
        "input",
        function () {

            game.power =
                Number(
                    powerSlider.value
                );

            updateUI();

        }
    );


    /* =====================================================
       AIMING
    ===================================================== */

    function aimFromEvent(event) {

        const rect =
            canvas.getBoundingClientRect();

        let x =
            (
                event.clientX -
                rect.left
            ) / rect.width;

        let y =
            (
                event.clientY -
                rect.top
            ) / rect.height;

        x = clamp(x, 0.08, 0.92);
        y = clamp(y, 0.08, 0.80);

        if (
            game.mode === "goalkeeper"
        ) {

            game.keeperX = x;
            game.keeperY = y;

        } else {

            game.aimX = x;
            game.aimY = y;

        }

        draw();

    }


    canvas.addEventListener(
        "pointerdown",
        function (event) {

            event.preventDefault();

            game.pointerDown = true;

            aimFromEvent(event);

        },
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "pointermove",
        function (event) {

            if (!game.pointerDown) {
                return;
            }

            event.preventDefault();

            aimFromEvent(event);

        },
        {
            passive: false
        }
    );


    window.addEventListener(
        "pointerup",
        function () {

            game.pointerDown = false;

        }
    );


    /* =====================================================
       SHOOT
    ===================================================== */

    shootButton.addEventListener(
        "click",
        function () {

            shootBall();

        }
    );


    function shootBall() {

        if (!game.running) {
            return;
        }

        if (game.phase !== "ready") {
            return;
        }

        if (game.mode === "goalkeeper") {
            return;
        }

        game.phase = "shooting";

        game.shots++;

        const p = player();

        const d = difficulty();

        let error =
            d.error;

        let accuracy =
            p.accuracy / 300;

        if (game.mode === "penalty") {

            accuracy +=
                p.penalty / 1000;

        }

        if (game.mode === "freekick") {

            accuracy +=
                p.freeKick / 1000;

        }

        if (game.mode === "longshot") {

            accuracy +=
                p.power / 1200;

        }

        error =
            Math.max(
                0.006,
                error -
                accuracy * 0.055
            );

        const finalX =
            clamp(
                game.aimX +
                random(-error, error),
                0.08,
                0.92
            );

        const finalY =
            clamp(
                game.aimY +
                random(-error, error),
                0.08,
                0.72
            );

        game.ball = {

            x: 0.50,

            y: 0.86,

            targetX: finalX,

            targetY: finalY,

            progress: 0,

            startTime:
                performance.now()

        };

        animateShot();

    }


    /* =====================================================
       SHOT ANIMATION
    ===================================================== */

    function animateShot() {

        if (
            game.phase !== "shooting"
        ) {
            return;
        }

        const now =
            performance.now();

        const elapsed =
            now -
            game.ball.startTime;

        const duration =
            game.mode === "longshot"
                ? 1250
                : game.mode === "freekick"
                    ? 900
                    : 800;

        let t =
            clamp(
                elapsed / duration,
                0,
                1
            );

        t = ease(t);

        game.ball.progress = t;

        game.ball.x =
            lerp(
                0.50,
                game.ball.targetX,
                t
            );

        game.ball.y =
            lerp(
                0.86,
                game.ball.targetY,
                t
            );

        draw();

        if (t < 1) {

            game.animation =
                requestAnimationFrame(
                    animateShot
                );

        } else {

            resolveShot();

        }

    }


    /* =====================================================
       SHOT RESULT
    ===================================================== */

    function resolveShot() {

        if (!game.ball) {
            return;
        }

        const x =
            game.ball.targetX;

        const y =
            game.ball.targetY;

        const insideGoal =
            x >= 0.17 &&
            x <= 0.83 &&
            y >= 0.12 &&
            y <= 0.55;


        /* FREE KICK WALL */

        if (
            game.mode === "freekick" &&
            insideGoal
        ) {

            const low =
                y > 0.42;

            const wallChance =
                low ? 0.35 : 0.08;

            const specialist =
                player().freeKick >= 300
                    ? 0.18
                    : 0;

            if (
                Math.random() <
                Math.max(
                    0.02,
                    wallChance -
                    specialist
                )
            ) {

                miss(
                    "WALL BLOCKED IT!",
                    "Try bending the ball over the wall."
                );

                return;

            }

        }


        /* GOALKEEPER */

        if (insideGoal) {

            const d =
                difficulty();

            let saveChance =
                d.keeper;

            const keeperDistance =
                Math.abs(
                    x - 0.50
                );

            saveChance -=
                keeperDistance * 0.25;

            saveChance =
                clamp(
                    saveChance,
                    0.05,
                    0.75
                );

            if (
                Math.random() <
                saveChance
            ) {

                miss(
                    "SAVED!",
                    "The goalkeeper stopped your shot.",
                    true
                );

                return;

            }

        }


        if (insideGoal) {

            goal();

        } else {

            miss(
                "MISS!",
                "The ball missed the target."
            );

        }

    }


    /* =====================================================
       GOAL
    ===================================================== */

    function goal() {

        game.phase = "result";

        game.goals++;

        game.combo++;

        const points =
            100 +
            game.power +
            game.distance * 4 +
            game.combo * 25 +
            game.level * 20;

        game.score +=
            Math.round(points);

        game.level =
            Math.floor(
                game.goals / 3
            ) + 1;

        if (
            game.score >
            game.best
        ) {

            game.best =
                game.score;

            try {

                localStorage.setItem(
                    "footballHeroBest",
                    String(game.best)
                );

            } catch (error) {}

        }

        showResult(
            "⚽",
            "GOAL!",
            `+${Math.round(points)} points`
        );

        updateUI();

    }


    /* =====================================================
       MISS / SAVE
    ===================================================== */

    function miss(
        title,
        text,
        isSave = false
    ) {

        game.phase = "result";

        if (isSave) {

            game.saves++;

        }

        game.combo = 0;

        showResult(
            isSave ? "🧤" : "❌",
            title,
            text
        );

        updateUI();

    }


    function showResult(
        icon,
        title,
        text
    ) {

        resultIcon.textContent =
            icon;

        resultTitle.textContent =
            title;

        resultText.textContent =
            text;

        resultScreen.classList.remove(
            "hidden"
        );

    }


    /* =====================================================
       GOALKEEPER MODE
    ===================================================== */

    function goalkeeperSave() {

        if (!game.running) {
            return;
        }

        if (
            game.mode !== "goalkeeper"
        ) {
            return;
        }

        if (
            game.phase !== "keeperReady"
        ) {
            return;
        }

        game.phase = "saving";

        const ball =
            game.incomingBall;

        const p =
            player();

        const keeperBonus =
            p.reflex / 300;

        const saveRange =
            0.105 +
            keeperBonus * 0.035;

        const gap =
            distance(
                game.keeperX,
                game.keeperY,
                ball.targetX,
                ball.targetY
            );

        const saved =
            gap <= saveRange;

        if (saved) {

            game.saves++;

            game.combo++;

            game.score +=
                150 +
                game.combo * 30;

            if (
                game.score >
                game.best
            ) {

                game.best =
                    game.score;

                try {

                    localStorage.setItem(
                        "footballHeroBest",
                        String(game.best)
                    );

                } catch (error) {}

            }

            game.phase =
                "result";

            showResult(
                "🧤",
                "INCREDIBLE SAVE!",
                "You got to the ball!"
            );

            updateUI();

            draw();

            return;

        }


        game.phase =
            "result";

        game.combo = 0;

        showResult(
            "⚽",
            "GOAL!",
            "The shot was out of reach."
        );

        updateUI();

        draw();

    }


    saveButton.addEventListener(
        "click",
        goalkeeperSave
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.code === "Space"
            ) {

                event.preventDefault();

                if (
                    game.mode ===
                    "goalkeeper"
                ) {

                    goalkeeperSave();

                } else {

                    shootBall();

                }

            }


            const amount = 0.035;


            if (
                event.key ===
                "ArrowLeft"
            ) {

                if (
                    game.mode ===
                    "goalkeeper"
                ) {

                    game.keeperX -=
                        amount;

                } else {

                    game.aimX -=
                        amount;

                }

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                if (
                    game.mode ===
                    "goalkeeper"
                ) {

                    game.keeperX +=
                        amount;

                } else {

                    game.aimX +=
                        amount;

                }

            }


            if (
                event.key ===
                "ArrowUp"
            ) {

                if (
                    game.mode ===
                    "goalkeeper"
                ) {

                    game.keeperY -=
                        amount;

                } else {

                    game.aimY -=
                        amount;

                }

            }


            if (
                event.key ===
                "ArrowDown"
            ) {

                if (
                    game.mode ===
                    "goalkeeper"
                ) {

                    game.keeperY +=
                        amount;

                } else {

                    game.aimY +=
                        amount;

                }

            }


            game.aimX =
                clamp(
                    game.aimX,
                    0.05,
                    0.95
                );

            game.aimY =
                clamp(
                    game.aimY,
                    0.08,
                    0.80
                );

            game.keeperX =
                clamp(
                    game.keeperX,
                    0.05,
                    0.95
                );

            game.keeperY =
                clamp(
                    game.keeperY,
                    0.12,
                    0.90
                );

            draw();

        }
    );


    /* =====================================================
       DRAWING
    ===================================================== */

    function clear() {

        ctx.clearRect(
            0,
            0,
            game.width,
            game.height
        );

    }


    function drawBackground() {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                game.height
            );

        gradient.addColorStop(
            0,
            "#07111f"
        );

        gradient.addColorStop(
            1,
            "#020617"
        );

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            0,
            game.width,
            game.height
        );

    }


    function drawPitch() {

        const left =
            game.width * 0.05;

        const right =
            game.width * 0.95;

        const top =
            game.height * 0.05;

        const bottom =
            game.height * 0.95;

        const width =
            right - left;

        const height =
            bottom - top;


        ctx.fillStyle =
            "#16803f";

        ctx.fillRect(
            left,
            top,
            width,
            height
        );


        /* GRASS STRIPES */

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            if (i % 2 === 0) {

                ctx.fillStyle =
                    "rgba(255,255,255,0.035)";

                ctx.fillRect(
                    left +
                    i * width / 12,
                    top,
                    width / 12,
                    height
                );

            }

        }


        /* LINES */

        ctx.strokeStyle =
            "rgba(255,255,255,0.9)";

        ctx.lineWidth = 3;

        ctx.strokeRect(
            left,
            top,
            width,
            height
        );


        /* CENTRE */

        ctx.beginPath();

        ctx.moveTo(
            left,
            top + height / 2
        );

        ctx.lineTo(
            right,
            top + height / 2
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.arc(
            game.width / 2,
            top + height / 2,
            Math.min(
                width,
                height
            ) * 0.12,
            0,
            Math.PI * 2
        );

        ctx.stroke();

    }


    function drawGoal() {

        const left =
            game.width * 0.16;

        const right =
            game.width * 0.84;

        const top =
            game.height * 0.08;

        const bottom =
            game.height * 0.28;


        /* NET */

        ctx.fillStyle =
            "rgba(255,255,255,0.10)";

        ctx.fillRect(
            left,
            top,
            right - left,
            bottom - top
        );


        ctx.strokeStyle =
            "rgba(255,255,255,0.25)";

        ctx.lineWidth = 1;


        for (
            let x = left;
            x <= right;
            x += 18
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
            y += 16
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


        /* POSTS */

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth = 7;

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

    }


    function drawBall(
        x,
        y,
        radius = 10
    ) {

        /* shadow */

        ctx.beginPath();

        ctx.ellipse(
            x,
            y + radius,
            radius * 1.35,
            radius * 0.4,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0,0,0,0.35)";

        ctx.fill();


        /* ball */

        const gradient =
            ctx.createRadialGradient(
                x - 3,
                y - 3,
                1,
                x,
                y,
                radius
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
            radius,
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


        /* black pattern */

        ctx.fillStyle =
            "#111827";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius * 0.25,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    function drawPlayer() {

        const x =
            game.width * 0.50;

        const y =
            game.height * 0.86;


        ctx.fillStyle =
            "rgba(0,0,0,0.3)";

        ctx.beginPath();

        ctx.ellipse(
            x,
            y + 20,
            32,
            8,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* legs */

        ctx.strokeStyle =
            "#111827";

        ctx.lineWidth = 7;

        ctx.beginPath();

        ctx.moveTo(
            x - 7,
            y
        );

        ctx.lineTo(
            x - 15,
            y + 27
        );

        ctx.moveTo(
            x + 7,
            y
        );

        ctx.lineTo(
            x + 15,
            y + 27
        );

        ctx.stroke();


        /* shirt */

        ctx.fillStyle =
            "#2563eb";

        ctx.fillRect(
            x - 18,
            y - 35,
            36,
            42
        );


        /* head */

        ctx.beginPath();

        ctx.arc(
            x,
            y - 50,
            14,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#d6a078";

        ctx.fill();


        /* name */

        ctx.font =
            "bold 12px Arial";

        ctx.textAlign =
            "center";

        ctx.fillStyle =
            "#ffffff";

        ctx.fillText(
            player().initials,
            x,
            y - 75
        );

    }


    function drawAim() {

        if (
            game.phase !== "ready"
        ) {
            return;
        }

        if (
            game.mode === "goalkeeper"
        ) {
            return;
        }

        const x =
            game.aimX *
            game.width;

        const y =
            game.aimY *
            game.height;


        ctx.strokeStyle =
            "#ffffff";

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

        ctx.moveTo(
            x - 29,
            y
        );

        ctx.lineTo(
            x + 29,
            y
        );

        ctx.moveTo(
            x,
            y - 29
        );

        ctx.lineTo(
            x,
            y + 29
        );

        ctx.stroke();


        ctx.fillStyle =
            "#ffffff";

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


    function drawWall() {

        for (
            const person of game.wall
        ) {

            const x =
                person.x *
                game.width;

            const y =
                person.y *
                game.height;


            /* head */

            ctx.beginPath();

            ctx.arc(
                x,
                y - 22,
                9,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#d5a078";

            ctx.fill();


            /* body */

            ctx.fillStyle =
                "#263dff";

            ctx.fillRect(
                x - 11,
                y - 12,
                22,
                30
            );


            /* legs */

            ctx.strokeStyle =
                "#111827";

            ctx.lineWidth = 4;

            ctx.beginPath();

            ctx.moveTo(
                x - 4,
                y + 18
            );

            ctx.lineTo(
                x - 9,
                y + 34
            );

            ctx.moveTo(
                x + 4,
                y + 18
            );

            ctx.lineTo(
                x + 9,
                y + 34
            );

            ctx.stroke();

        }

    }


    /* =====================================================
       GOALKEEPER VIEW
    ===================================================== */

    function drawGoalkeeperView() {

        clear();

        drawBackground();


        /* GOAL AREA */

        const left =
            game.width * 0.07;

        const right =
            game.width * 0.93;

        const top =
            game.height * 0.08;

        const bottom =
            game.height * 0.82;


        ctx.fillStyle =
            "rgba(255,255,255,0.08)";

        ctx.fillRect(
            left,
            top,
            right - left,
            bottom - top
        );


        /* NET */

        ctx.strokeStyle =
            "rgba(255,255,255,0.22)";

        ctx.lineWidth = 1;


        for (
            let x = left;
            x <= right;
            x += 20
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
            y += 18
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


        /* GOAL FRAME */

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


        /* GLOVES */

        const gx =
            game.keeperX *
            game.width;

        const gy =
            game.keeperY *
            game.height;


        drawGlove(
            gx - 28,
            gy
        );

        drawGlove(
            gx + 28,
            gy
        );


        /* BALL */

        if (
            game.incomingBall
        ) {

            const b =
                game.incomingBall;

            const bx =
                b.x *
                game.width;

            const by =
                b.y *
                game.height;

            const size =
                15 -
                b.progress * 5;

            drawBall(
                bx,
                by,
                size
            );

        }


        /* TARGET */

        if (
            game.incomingBall &&
            game.phase === "keeperReady"
        ) {

            const tx =
                game.incomingBall.targetX *
                game.width;

            const ty =
                game.incomingBall.targetY *
                game.height;


            ctx.strokeStyle =
                "rgba(255,80,80,0.7)";

            ctx.lineWidth = 3;

            ctx.beginPath();

            ctx.arc(
                tx,
                ty,
                22,
                0,
                Math.PI * 2
            );

            ctx.stroke();

        }

    }


    function drawGlove(
        x,
        y
    ) {

        ctx.fillStyle =
            "#facc15";

        ctx.strokeStyle =
            "#111827";

        ctx.lineWidth = 3;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            18,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.stroke();


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x - 10 + i * 7,
                y - 8
            );

            ctx.lineTo(
                x - 12 + i * 7,
                y - 24
            );

            ctx.strokeStyle =
                "#facc15";

            ctx.lineWidth = 6;

            ctx.stroke();

        }

    }


    /* =====================================================
       MAIN DRAW
    ===================================================== */

    function draw() {

        if (
            game.mode ===
            "goalkeeper"
        ) {

            drawGoalkeeperView();

            return;

        }


        clear();

        drawBackground();

        drawPitch();

        drawGoal();

        if (
            game.mode ===
            "freekick"
        ) {

            drawWall();

        }


        drawPlayer();

        drawAim();


        if (game.ball) {

            drawBall(
                game.ball.x *
                    game.width,
                game.ball.y *
                    game.height,
                10
            );

        }

    }


    /* =====================================================
       GOALKEEPER BALL ANIMATION
    ===================================================== */

    function animateKeeperShot() {

        if (
            game.phase !==
            "keeperReady"
        ) {
            return;
        }

        if (!game.incomingBall) {
            return;
        }

        if (
            !game.incomingBall.startTime
        ) {

            game.incomingBall.startTime =
                performance.now();

        }

        const elapsed =
            performance.now() -
            game.incomingBall.startTime;

        const duration =
            1400 *
            difficulty().reaction;

        let t =
            clamp(
                elapsed / duration,
                0,
                1
            );

        t = ease(t);

        game.incomingBall.progress =
            t;

        game.incomingBall.x =
            lerp(
                game.incomingBall.startX,
                game.incomingBall.targetX,
                t
            );

        game.incomingBall.y =
            lerp(
                game.incomingBall.startY,
                game.incomingBall.targetY,
                t
            );

        draw();

        if (t < 1) {

            game.animation =
                requestAnimationFrame(
                    animateKeeperShot
                );

        } else {

            game.phase =
                "result";

            game.combo = 0;

            showResult(
                "⚽",
                "GOAL!",
                "You didn't reach the shot."
            );

            updateUI();

        }

    }


    /* =====================================================
       KEEP GAMEKEEPER SHOT MOVING
    ===================================================== */

    const oldSetupMode =
        setupMode;


    setupMode = function () {

        oldSetupMode();

        if (
            game.mode ===
            "goalkeeper"
        ) {

            setTimeout(
                function () {

                    if (
                        game.running &&
                        game.phase ===
                        "keeperReady"
                    ) {

                        animateKeeperShot();

                    }

                },
                650
            );

        }

    };


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    game.player =
        playerSelect.value;

    game.difficulty =
        difficultySelect.value;

    game.power =
        Number(powerSlider.value);


    updatePlayerUI();

    updateUI();

    resizeCanvas();

});
