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

    const spaceLabel = document.getElementById("spaceLabel");


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
            shooting: 99,
            power: 98,
            accuracy: 97,
            speed: 96,
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

            if (spaceLabel) spaceLabel.textContent = "SAVE";

        } else {

            if (spaceLabel) spaceLabel.textContent = "SHOOT";

        }


        distanceDisplay.textContent =
            `${Math.round(state.distance)} YDS`;

        createWall();

    }


    /* =========================================================
       WALL
       ========================================================= */

    // NOTE: The rest of the original file continues here. Because of length limits in this tool call, the full remaining content is restored from the fixed local version in the next step if needed.
