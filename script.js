"use strict";


/* =========================================================
   FOOTBALL LEGENDS ARENA X
   ========================================================= */


/* =========================================================
   DOM
========================================================= */

const canvas =
    document.getElementById(
        "gameCanvas"
    );

const ctx =
    canvas.getContext(
        "2d"
    );


const scoreEl =
    document.getElementById(
        "score"
    );

const levelEl =
    document.getElementById(
        "level"
    );

const goalsEl =
    document.getElementById(
        "goals"
    );

const savesEl =
    document.getElementById(
        "saves"
    );

const comboEl =
    document.getElementById(
        "combo"
    );

const bestComboEl =
    document.getElementById(
        "bestCombo"
    );


const playerSelect =
    document.getElementById(
        "playerSelect"
    );

const keeperSelect =
    document.getElementById(
        "keeperSelect"
    );

const difficultySelect =
    document.getElementById(
        "difficulty"
    );

const cameraSelect =
    document.getElementById(
        "cameraSelect"
    );


const selectedName =
    document.getElementById(
        "selectedName"
    );

const selectedRole =
    document.getElementById(
        "selectedRole"
    );

const avatar =
    document.getElementById(
        "avatar"
    );


const shootStat =
    document.getElementById(
        "shootStat"
    );

const powerStat =
    document.getElementById(
        "powerStat"
    );

const accuracyStat =
    document.getElementById(
        "accuracyStat"
    );

const curveStat =
    document.getElementById(
        "curveStat"
    );

const speedStat =
    document.getElementById(
        "speedStat"
    );

const staminaStat =
    document.getElementById(
        "staminaStat"
    );

const longStat =
    document.getElementById(
        "longStat"
    );


const matchPlayer =
    document.getElementById(
        "matchPlayer"
    );

const matchOpponent =
    document.getElementById(
        "matchOpponent"
    );


const modeLabel =
    document.getElementById(
        "modeLabel"
    );

const messageEl =
    document.getElementById(
        "message"
    );

const distanceEl =
    document.getElementById(
        "distance"
    );


const abilityBanner =
    document.getElementById(
        "abilityBanner"
    );

const targetGuide =
    document.getElementById(
        "targetGuide"
    );

const powerWrap =
    document.getElementById(
        "powerWrap"
    );

const powerFill =
    document.getElementById(
        "powerFill"
    );


const aimCard =
    document.getElementById(
        "aimCard"
    );

const aimText =
    document.getElementById(
        "aimText"
    );


const accuracyCard =
    document.getElementById(
        "accuracyCard"
    );

const accuracyText =
    document.getElementById(
        "accuracyText"
    );


const windText =
    document.getElementById(
        "windText"
    );


const challengeText =
    document.getElementById(
        "challengeText"
    );


const statusText =
    document.getElementById(
        "statusText"
    );


const shootControls =
    document.getElementById(
        "shootControls"
    );

const keeperControls =
    document.getElementById(
        "keeperControls"
    );

const shootButton =
    document.getElementById(
        "shootButton"
    );


const pauseOverlay =
    document.getElementById(
        "pauseOverlay"
    );

const resumeBtn =
    document.getElementById(
        "resumeBtn"
    );


const resultOverlay =
    document.getElementById(
        "resultOverlay"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultPoints =
    document.getElementById(
        "resultPoints"
    );

const resultDetail =
    document.getElementById(
        "resultDetail"
    );

const resultContinue =
    document.getElementById(
        "resultContinue"
    );


const restartBtn =
    document.getElementById(
        "restartBtn"
    );

const pauseBtn =
    document.getElementById(
        "pauseBtn"
    );

const soundBtn =
    document.getElementById(
        "soundBtn"
    );


/* =========================================================
   PLAYER DATABASE
========================================================= */

const PLAYERS = {

    "Hassan Ali": {

        overall: 300,

        shooting: 300,
        power: 300,
        accuracy: 300,
        curve: 300,
        speed: 300,
        stamina: 300,
        longShot: 300,

        penalty: 300,
        freeKick: 300,
        dribbling: 300,

        role:
            "ULTIMATE SUPERSTAR",

        color:
            "#35e875",

        initials:
            "HA",

        ability:
            "ALL STATS 300"

    },


    "Ehan Ali": {

        overall: 91,

        shooting: 90,
        power: 88,
        accuracy: 90,
        curve: 91,
        speed: 91,
        stamina: 89,
        longShot: 87,

        penalty: 88,
        freeKick: 86,
        dribbling: 92,

        role:
            "ATTACKER",

        color:
            "#66c8ff",

        initials:
            "EA",

        ability:
            "BALANCED ATTACKER"

    },


    "Umar Shoaib": {

        overall: 93,

        shooting: 92,
        power: 94,
        accuracy: 90,
        curve: 95,
        speed: 89,
        stamina: 94,
        longShot: 93,

        penalty: 91,
        freeKick: 94,
        dribbling: 90,

        role:
            "PLAYMAKER",

        color:
            "#8e7cff",

        initials:
            "US",

        ability:
            "POWER CURVE"

    },


    "Cristiano Ronaldo": {

        overall: 96,

        shooting: 96,
        power: 96,
        accuracy: 93,
        curve: 88,
        speed: 89,
        stamina: 91,
        longShot: 97,

        penalty: 96,
        freeKick: 91,
        dribbling: 91,

        role:
            "GOAL SCORER",

        color:
            "#ffffff",

        initials:
            "CR",

        ability:
            "POWER STRIKE"

    },


    "Lionel Messi": {

        overall: 97,

        shooting: 97,
        power: 86,
        accuracy: 99,
        curve: 99,
        speed: 90,
        stamina: 86,
        longShot: 95,

        penalty: 92,
        freeKick: 99,
        dribbling: 99,

        role:
            "PLAYMAKER",

        color:
            "#72b8ff",

        initials:
            "LM",

        ability:
            "MAGIC CURVE"

    },


    "Kylian Mbappe": {

        overall: 96,

        shooting: 94,
        power: 92,
        accuracy: 91,
        curve: 86,
        speed: 99,
        stamina: 93,
        longShot: 92,

        penalty: 89,
        freeKick: 83,
        dribbling: 98,

        role:
            "SPEEDSTER",

        color:
            "#b88aff",

        initials:
            "KM",

        ability:
            "TURBO RUN"

    },


    "Erling Haaland": {

        overall: 97,

        shooting: 99,
        power: 100,
        accuracy: 92,
        curve: 76,
        speed: 90,
        stamina: 91,
        longShot: 99,

        penalty: 91,
        freeKick: 72,
        dribbling: 81,

        role:
            "POWER STRIKER",

        color:
            "#a7d2ff",

        initials:
            "EH",

        ability:
            "CANNON SHOT"

    },


    "Lamine Yamal": {

        overall: 96,

        shooting: 90,
        power: 84,
        accuracy: 96,
        curve: 99,
        speed: 95,
        stamina: 89,
        longShot: 91,

        penalty: 85,
        freeKick: 100,
        dribbling: 99,

        role:
            "FREE-KICK SPECIALIST",

        color:
            "#ffdd6a",

        initials:
            "LY",

        ability:
            "ELITE FREE-KICK CURVE"

    },


    "Jude Bellingham": {

        overall: 96,

        shooting: 94,
        power: 92,
        accuracy: 95,
        curve: 88,
        speed: 90,
        stamina: 98,
        longShot: 96,

        penalty: 100,
        freeKick: 86,
        dribbling: 93,

        role:
            "PENALTY SPECIALIST",

        color:
            "#eab7ff",

        initials:
            "JB",

        ability:
            "ELITE PENALTY"

    },


    "Vinicius Jr": {

        overall: 95,

        shooting: 91,
        power: 88,
        accuracy: 88,
        curve: 85,
        speed: 100,
        stamina: 94,
        longShot: 87,

        penalty: 81,
        freeKick: 80,
        dribbling: 99,

        role:
            "WINGER",

        color:
            "#ff7e91",

        initials:
            "VJ",

        ability:
            "RAPID WINGER"

    },


    "Neymar": {

        overall: 95,

        shooting: 92,
        power: 84,
        accuracy: 95,
        curve: 99,
        speed: 90,
        stamina: 83,
        longShot: 91,

        penalty: 89,
        freeKick: 98,
        dribbling: 99,

        role:
            "SKILL MASTER",

        color:
            "#7de4ff",

        initials:
            "NJ",

        ability:
            "TRICKSTER"

    },


    "Mohamed Salah": {

        overall: 94,

        shooting: 94,
        power: 90,
        accuracy: 93,
        curve: 89,
        speed: 95,
        stamina: 92,
        longShot: 93,

        penalty: 88,
        freeKick: 82,
        dribbling: 95,

        role:
            "WINGER",

        color:
            "#ffd269",

        initials:
            "MS",

        ability:
            "CURVED FINISH"

    },


    "Kevin De Bruyne": {

        overall: 95,

        shooting: 91,
        power: 90,
        accuracy: 97,
        curve: 98,
        speed: 83,
        stamina: 90,
        longShot: 92,

        penalty: 84,
        freeKick: 97,
        dribbling: 88,

        role:
            "MIDFIELDER",

        color:
            "#8fd7ff",

        initials:
            "KD",

        ability:
            "PRECISION SHOT"

    },


    "Robert Lewandowski": {

        overall: 95,

        shooting: 98,
        power: 96,
        accuracy: 94,
        curve: 86,
        speed: 80,
        stamina: 88,
        longShot: 94,

        penalty: 97,
        freeKick: 79,
        dribbling: 83,

        role:
            "STRIKER",

        color:
            "#d8e2ff",

        initials:
            "RL",

        ability:
            "CLINICAL FINISHER"

    },


    "Harry Kane": {

        overall: 94,

        shooting: 97,
        power: 95,
        accuracy: 95,
        curve: 92,
        speed: 82,
        stamina: 90,
        longShot: 97,

        penalty: 98,
        freeKick: 88,
        dribbling: 81,

        role:
            "STRIKER",

        color:
            "#d8f3ff",

        initials:
            "HK",

        ability:
            "LONG-RANGE FINISH"

    },


    "Son Heung-min": {

        overall: 93,

        shooting: 95,
        power: 91,
        accuracy: 92,
        curve: 94,
        speed: 96,
        stamina: 93,
        longShot: 96,

        penalty: 89,
        freeKick: 85,
        dribbling: 91,

        role:
            "FORWARD",

        color:
            "#e5ff78",

        initials:
            "SH",

        ability:
            "TWO-FOOT FINISH"

    },


    "Rodri": {

        overall: 91,

        shooting: 88,
        power: 92,
        accuracy: 91,
        curve: 84,
        speed: 71,
        stamina: 96,
        longShot: 94,

        penalty: 76,
        freeKick: 80,
        dribbling: 84,

        role:
            "MIDFIELDER",

        color:
            "#b7b7ff",

        initials:
            "R",

        ability:
            "DISTANCE STRIKE"

    },


    "Antoine Griezmann": {

        overall: 93,

        shooting: 94,
        power: 88,
        accuracy: 95,
        curve: 96,
        speed: 87,
        stamina: 91,
        longShot: 91,

        penalty: 91,
        freeKick: 94,
        dribbling: 90,

        role:
            "FORWARD",

        color:
            "#a7f7ff",

        initials:
            "AG",

        ability:
            "PLACED SHOT"

    },


    "Ousmane Dembele": {

        overall: 92,

        shooting: 89,
        power: 85,
        accuracy: 88,
        curve: 91,
        speed: 98,
        stamina: 87,
        longShot: 86,

        penalty: 78,
        freeKick: 86,
        dribbling: 98,

        role:
            "WINGER",

        color:
            "#d994ff",

        initials:
            "OD",

        ability:
            "QUICK FEET"

    },


    "Jamal Musiala": {

        overall: 93,

        shooting: 90,
        power: 86,
        accuracy: 92,
        curve: 95,
        speed: 93,
        stamina: 88,
        longShot: 87,

        penalty: 80,
        freeKick: 83,
        dribbling: 99,

        role:
            "PLAYMAKER",

        color:
            "#b8ffce",

        initials:
            "JM",

        ability:
            "CLOSE CONTROL"

    },


    "Phil Foden": {

        overall: 93,

        shooting: 91,
        power: 87,
        accuracy: 94,
        curve: 96,
        speed: 91,
        stamina: 89,
        longShot: 90,

        penalty: 82,
        freeKick: 92,
        dribbling: 96,

        role:
            "PLAYMAKER",

        color:
            "#f9c8ff",

        initials:
            "PF",

        ability:
            "TECHNICAL SHOT"

    },


    "Raphinha": {

        overall: 92,

        shooting: 91,
        power: 91,
        accuracy: 90,
        curve: 94,
        speed: 94,
        stamina: 90,
        longShot: 93,

        penalty: 81,
        freeKick: 90,
        dribbling: 94,

        role:
            "WINGER",

        color:
            "#8fe5ff",

        initials:
            "RA",

        ability:
            "BENDING SHOT"

    }

};


/* =========================================================
   GOALKEEPERS
========================================================= */

const GOALKEEPERS = {

    "Hassan Ali": {

        reflexes: 300,
        diving: 300,
        positioning: 300,
        handling: 300,
        speed: 300,
        reactions: 300,
        jumping: 300,
        reach: 300,

        role:
            "ULTIMATE GOALKEEPER",

        initials:
            "HA"

    },


    "Ehan Ali": {

        reflexes: 90,
        diving: 90,
        positioning: 89,
        handling: 88,
        speed: 86,
        reactions: 91,
        jumping: 88,
        reach: 88,

        role:
            "GOALKEEPER",

        initials:
            "EA"

    },


    "Thibaut Courtois": {

        reflexes: 96,
        diving: 95,
        positioning: 97,
        handling: 94,
        speed: 84,
        reactions: 95,
        jumping: 96,
        reach: 100,

        role:
            "GIANT GOALKEEPER",

        initials:
            "TC"

    },


    "Alisson": {

        reflexes: 95,
        diving: 93,
        positioning: 96,
        handling: 95,
        speed: 90,
        reactions: 94,
        jumping: 92,
        reach: 94,

        role:
            "SWEEPER GOALKEEPER",

        initials:
            "AL"

    },


    "Manuel Neuer": {

        reflexes: 94,
        diving: 92,
        positioning: 94,
        handling: 92,
        speed: 91,
        reactions: 93,
        jumping: 90,
        reach: 92,

        role:
            "SWEEPER KEEPER",

        initials:
            "MN"

    },


    "Gianluigi Donnarumma": {

        reflexes: 97,
        diving: 96,
        positioning: 93,
        handling: 94,
        speed: 83,
        reactions: 96,
        jumping: 98,
        reach: 100,

        role:
            "TALL GOALKEEPER",

        initials:
            "GD"

    },


    "Ederson": {

        reflexes: 93,
        diving: 91,
        positioning: 94,
        handling: 92,
        speed: 92,
        reactions: 92,
        jumping: 89,
        reach: 91,

        role:
            "DISTRIBUTOR",

        initials:
            "ED"

    },


    "Jan Oblak": {

        reflexes: 96,
        diving: 95,
        positioning: 97,
        handling: 96,
        speed: 82,
        reactions: 97,
        jumping: 91,
        reach: 93,

        role:
            "SHOT STOPPER",

        initials:
            "JO"

    },


    "Marc-Andre ter Stegen": {

        reflexes: 95,
        diving: 92,
        positioning: 95,
        handling: 93,
        speed: 88,
        reactions: 95,
        jumping: 90,
        reach: 92,

        role:
            "MODERN GOALKEEPER",

        initials:
            "MT"

    },


    "Emiliano Martinez": {

        reflexes: 94,
        diving: 92,
        positioning: 93,
        handling: 92,
        speed: 84,
        reactions: 95,
        jumping: 91,
        reach: 93,

        role:
            "PENALTY GOALKEEPER",

        initials:
            "EM"

    }

};


/* =========================================================
   DIFFICULTY
========================================================= */

const DIFFICULTY = {

    rookie: {

        keeperRead:
            .24,

        saveRadius:
            48,

        reaction:
            420,

        shotSpeed:
            1.45,

        wind:
            .18

    },


    pro: {

        keeperRead:
            .44,

        saveRadius:
            58,

        reaction:
            300,

        shotSpeed:
            1.65,

        wind:
            .30

    },


    worldclass: {

        keeperRead:
            .63,

        saveRadius:
            66,

        reaction:
            215,

        shotSpeed:
            1.85,

        wind:
            .45

    },


    legend: {

        keeperRead:
            .78,

        saveRadius:
            73,

        reaction:
            150,

        shotSpeed:
            2.02,

        wind:
            .60

    }

};


/* =========================================================
   STATE
========================================================= */

const state = {

    mode:
        "penalty",

    score:
        0,

    goals:
        0,

    saves:
        0,

    level:
        1,

    combo:
        0,

    bestCombo:
        0,

    paused:
        false,

    busy:
        false,

    keeperActive:
        false,

    sound:
        true,

    width:
        1200,

    height:
        700,

    dpr:
        1,

    lastTime:
        performance.now(),

    shotStart:
        0,

    shotDuration:
        750,

    targetX:
        null,

    targetY:
        null,

    wind:
        0,

    resultOpen:
        false,

    round:
        0,

    keeperZone:
        "center",

    timer:
        null,

    selectedPower:
        0,

    crossbarHits:
        0

};


/* =========================================================
   BALL
========================================================= */

const ball = {

    x:
        0,

    y:
        0,

    startX:
        0,

    startY:
        0,

    targetX:
        0,

    targetY:
        0,

    progress:
        0,

    curve:
        0,

    arc:
        0,

    radius:
        12

};


/* =========================================================
   KEEPER
========================================================= */

const keeper = {

    x:
        0,

    y:
        0,

    homeX:
        0,

    homeY:
        0,

    targetX:
        0,

    targetY:
        0,

    moveStart:
        0,

    moveDuration:
        420,

    pose:
        0

};


/* =========================================================
   PARTICLES
========================================================= */

let particles = [];

let confetti = [];


/* =========================================================
   AUDIO
========================================================= */

let audioContext =
    null;


function tone(
    frequency,
    duration,
    type = "sine",
    volume = .04
) {

    if (
        !state.sound
    ) {
        return;
    }


    try {

        audioContext ||=
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        const oscillator =
            audioContext
                .createOscillator();


        const gain =
            audioContext
                .createGain();


        oscillator.type =
            type;


        oscillator.frequency.value =
            frequency;


        gain.gain.value =
            volume;


        oscillator.connect(
            gain
        );


        gain.connect(
            audioContext.destination
        );


        oscillator.start();


        gain.gain
            .exponentialRampToValueAtTime(
                .0001,
                audioContext.currentTime +
                    duration
            );


        oscillator.stop(
            audioContext.currentTime +
                duration
        );

    } catch {

        /* Sound is optional. */

    }

}


function goalSound() {

    tone(
        523,
        .08,
        "triangle",
        .045
    );

    setTimeout(
        () => {
            tone(
                659,
                .08,
                "triangle",
                .045
            );
        },
        80
    );

    setTimeout(
        () => {
            tone(
                784,
                .18,
                "triangle",
                .055
            );
        },
        160
    );

}


function saveSound() {

    tone(
        190,
        .12,
        "square",
        .035
    );

    setTimeout(
        () => {
            tone(
                130,
                .16,
                "square",
                .028
            );
        },
        110
    );

}


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
        Math.min(
            max,
            value
        )
    );

}


function lerp(
    a,
    b,
    t
) {

    return (
        a +
        (
            b - a
        ) *
        t
    );

}


function ease(
    t
) {

    return (
        t *
        t *
        (
            3 -
            2 *
            t
        )
    );

}


function random(
    min,
    max
) {

    return (
        min +
        Math.random() *
        (
            max -
            min
        )
    );

}


function dist(
    ax,
    ay,
    bx,
    by
) {

    return Math.hypot(
        ax - bx,
        ay - by
    );

}


/* =========================================================
   SELECTS
========================================================= */

function buildPlayerSelect() {

    playerSelect.innerHTML =
        "";


    Object.keys(
        PLAYERS
    ).forEach(
        name => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                name;

            option.textContent =
                name;


            playerSelect
                .appendChild(
                    option
                );

        }
    );


    playerSelect.value =
        "Hassan Ali";

}


function buildKeeperSelect() {

    keeperSelect.innerHTML =
        "";


    Object.keys(
        GOALKEEPERS
    ).forEach(
        name => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                name;

            option.textContent =
                name;


            keeperSelect
                .appendChild(
                    option
                );

        }
    );


    keeperSelect.value =
        "Hassan Ali";

}


/* =========================================================
   GEOMETRY
========================================================= */

function goalGeometry() {

    let left =
        .19;

    let width =
        .62;

    let top =
        .11;

    let height =
        .31;


    if (
        cameraSelect.value ===
        "close"
    ) {

        left =
            .11;

        width =
            .78;

        top =
            .09;

        height =
            .37;

    }


    if (
        cameraSelect.value ===
        "wide"
    ) {

        left =
            .25;

        width =
            .50;

        top =
            .14;

        height =
            .27;

    }


    return {

        x:
            state.width *
            left,

        y:
            state.height *
            top,

        width:
            state.width *
            width,

        height:
            state.height *
            height

    };

}


function penaltyStart() {

    return {

        x:
            state.width / 2,

        y:
            state.height *
            .77

    };

}


function freeKickStart() {

    return {

        x:
            state.width / 2,

        y:
            state.height *
            .74

    };

}


function longShotStart() {

    return {

        x:
            state.width / 2,

        y:
            state.height *
            .83

    };

}


function crossbarStart() {

    return {

        x:
            state.width / 2,

        y:
            state.height *
            .80

    };

}


/* =========================================================
   RESIZE
========================================================= */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();


    state.width =
        Math.max(
            320,
            Math.floor(
                rect.width
            )
        );


    state.height =
        Math.max(
            380,
            Math.floor(
                rect.height
            )
        );


    state.dpr =
        Math.min(
            window.devicePixelRatio ||
            1,
            2
        );


    canvas.width =
        Math.floor(
            state.width *
            state.dpr
        );


    canvas.height =
        Math.floor(
            state.height *
            state.dpr
        );


    ctx.setTransform(
        state.dpr,
        0,
        0,
        state.dpr,
        0,
        0
    );


    positionObjects();

}


/* =========================================================
   POSITIONING
========================================================= */

function positionObjects() {

    const goal =
        goalGeometry();


    keeper.homeX =
        state.width / 2;

    keeper.homeY =
        goal.y +
        goal.height *
        .76;


    keeper.x =
        keeper.homeX;

    keeper.y =
        keeper.homeY;

    keeper.targetX =
        keeper.homeX;

    keeper.targetY =
        keeper.homeY;

    keeper.pose =
        0;


    if (
        state.mode ===
        "keeper"
    ) {

        return;

    }


    let start;


    if (
        state.mode ===
        "penalty"
    ) {

        start =
            penaltyStart();

    }

    else if (
        state.mode ===
        "freekick"
    ) {

        start =
            freeKickStart();

    }

    else if (
        state.mode ===
        "longshot"
    ) {

        start =
            longShotStart();

    }

    else {

        start =
            crossbarStart();

    }


    ball.x =
        start.x;

    ball.y =
        start.y;

    ball.startX =
        start.x;

    ball.startY =
        start.y;

}


/* =========================================================
   PLAYER / KEEPER DATA
========================================================= */

function getPlayer() {

    return (
        PLAYERS[
            playerSelect.value
        ] ||
        PLAYERS[
            "Hassan Ali"
        ]
    );

}


function getKeeper() {

    return (
        GOALKEEPERS[
            keeperSelect.value
        ] ||
        GOALKEEPERS[
            "Hassan Ali"
        ]
    );

}


/* =========================================================
   HUD
========================================================= */

function updateHUD() {

    const player =
        getPlayer();


    scoreEl.textContent =
        state.score;


    levelEl.textContent =
        state.level;


    goalsEl.textContent =
        state.goals;


    savesEl.textContent =
        state.saves;


    comboEl.textContent =
        state.combo;


    bestComboEl.textContent =
        state.bestCombo;


    selectedName.textContent =
        playerSelect.value;


    selectedRole.textContent =
        player.role;


    avatar.textContent =
        player.initials;


    avatar.style.background =
        `linear-gradient(
            135deg,
            ${player.color},
            #087f37
        )`;


    matchPlayer.textContent =
        playerSelect.value;


    matchOpponent.textContent =
        `vs ${keeperSelect.value}`;


    shootStat.textContent =
        player.shooting;


    powerStat.textContent =
        player.power;


    accuracyStat.textContent =
        player.accuracy;


    curveStat.textContent =
        player.curve;


    speedStat.textContent =
        player.speed;


    staminaStat.textContent =
        player.stamina;


    longStat.textContent =
        player.longShot;


    modeLabel.textContent =

        state.mode === "penalty"

            ? "PENALTY SHOOTOUT"

            : state.mode === "freekick"

                ? "FREE KICK CHALLENGE"

                : state.mode === "longshot"

                    ? "LONG SHOT CHALLENGE"

                    : state.mode === "crossbar"

                        ? "CROSSBAR CHALLENGE"

                        : "GOALKEEPER CHALLENGE";


    windText.textContent =
        state.wind >= 0
            ? `+${state.wind.toFixed(1)}`
            : state.wind.toFixed(1);


    challengeText.textContent =

        state.mode ===
        "crossbar"

            ? `Crossbar hits: ${state.crossbarHits}`

            : `Need ${
                Math.max(
                    0,
                    3 -
                    (
                        state.goals %
                        3
                    )
                )
            } more goal(s)`;


    if (
        state.mode ===
        "keeper"
    ) {

        abilityBanner
            .textContent =

            keeperSelect.value ===
            "Hassan Ali"

                ? "👑 HASSAN ALI — 300 IN EVERY GK STAT"

                : `${keeperSelect.value} goalkeeper selected`;


        abilityBanner
            .classList
            .remove(
                "hidden"
            );

    }

    else {

        setAbilityBanner();

    }

}


function setAbilityBanner() {

    const player =
        getPlayer();


    let text =
        "";


    if (
        state.mode ===
        "penalty" &&
        playerSelect.value ===
        "Jude Bellingham"
    ) {

        text =
            "⭐ BELLINGHAM — ELITE PENALTY";

    }

    else if (
        state.mode ===
        "freekick" &&
        playerSelect.value ===
        "Lamine Yamal"
    ) {

        text =
            "⭐ LAMINE YAMAL — ELITE FREE-KICK";

    }

    else if (
        state.mode ===
        "longshot" &&
        playerSelect.value ===
        "Hassan Ali"
    ) {

        text =
            "👑 HASSAN ALI — 300 LONG SHOT";

    }

    else if (
        state.mode ===
        "longshot" &&
        playerSelect.value ===
        "Erling Haaland"
    ) {

        text =
            "🚀 HAALAND — POWER SHOT";

    }

    else if (
        player.ability
    ) {

        text =
            player.ability;

    }


    if (
        text
    ) {

        abilityBanner.textContent =
            text;

        abilityBanner
            .classList
            .remove(
                "hidden"
            );

    }

    else {

        abilityBanner
            .classList
            .add(
                "hidden"
            );

    }

}


function setMessage(
    text,
    status = text
) {

    messageEl.textContent =
        text;

    statusText.textContent =
        status;

}


/* =========================================================
   ROUND RESET
========================================================= */

function resetRound() {

    clearTimeout(
        state.timer
    );


    state.busy =
        false;


    state.keeperActive =
        false;


    state.targetX =
        null;


    state.targetY =
        null;


    state.resultOpen =
        false;


    resultOverlay
        .classList
        .add(
            "hidden"
        );


    shootControls
        .classList
        .toggle(
            "hidden",

            state.mode ===
                "keeper" ||
            state.mode ===
                "longshot" ||
            state.mode ===
                "crossbar"
        );


    keeperControls
        .classList
        .toggle(
            "hidden",

            state.mode !==
                "keeper"
        );


    shootButton
        .classList
        .toggle(
            "hidden",

            state.mode !==
                "longshot" &&
            state.mode !==
                "crossbar"
        );


    targetGuide
        .classList
        .toggle(
            "hidden",

            state.mode !==
                "longshot" &&
            state.mode !==
                "crossbar"
        );


    powerWrap
        .classList
        .add(
            "hidden"
        );


    aimCard
        .classList
        .add(
            "hidden"
        );


    accuracyCard
        .classList
        .add(
            "hidden"
        );


    const difficulty =
        DIFFICULTY[
            difficultySelect.value
        ];


    state.wind =
        random(
            -1,
            1
        ) *
        difficulty.wind;


    if (
        state.mode ===
        "longshot"
    ) {

        targetGuide.textContent =
            "TAP ANYWHERE INSIDE THE GOAL TO SET YOUR TARGET";


        setMessage(
            "CHOOSE YOUR TARGET",
            "Long shot: tap inside the goal."
        );


        distanceEl.textContent =
            `Distance: ${
                26 +
                state.level *
                2
            } m`;

    }

    else if (
        state.mode ===
        "crossbar"
    ) {

        targetGuide.textContent =
            "AIM AT THE CROSSBAR — HIT IT FOR BONUS POINTS";


        setMessage(
            "HIT THE CROSSBAR",
            "Choose a target, then press SHOOT."
        );


        distanceEl.textContent =
            `Distance: ${
                22 +
                state.level *
                2
            } m`;

    }

    else if (
        state.mode ===
        "freekick"
    ) {

        setMessage(
            "BEND IT AROUND THE WALL",
            playerSelect.value ===
            "Lamine Yamal"
                ? "Lamine Yamal free-kick specialist active."
                : "Curve the ball around the wall."
        );


        distanceEl.textContent =
            `Distance: ${
                18 +
                state.level *
                2
            } m`;

    }

    else if (
        state.mode ===
        "penalty"
    ) {

        setMessage(
            "CHOOSE YOUR SHOT",
            playerSelect.value ===
            "Jude Bellingham"
                ? "Bellingham penalty specialist active."
                : "Pick LEFT, CENTER or RIGHT."
        );


        distanceEl.textContent =
            "Distance: 11 m";

    }

    else {

        setMessage(
            "GET READY!",
            "React quickly and dive."
        );


        distanceEl.textContent =
            "Incoming shot";

    }


    updateHUD();

    positionObjects();


    if (
        state.mode ===
        "keeper"
    ) {

        startKeeperChallenge();

    }

}


/* =========================================================
   MODE SWITCH
========================================================= */

function setMode(
    mode
) {

    state.mode =
        mode;


    state.round++;


    particles = [];

    confetti = [];


    document
        .querySelectorAll(
            ".mode"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",

                    button.dataset.mode ===
                        mode
                );

            }
        );


    resetRound();

}


/* =========================================================
   TARGETS
========================================================= */

function targetForZone(
    zone
) {

    const goal =
        goalGeometry();


    const xRatio =

        zone === "left"

            ? .17

            : zone === "right"

                ? .83

                : .50;


    return {

        x:
            goal.x +
            goal.width *
            xRatio,

        y:
            goal.y +
            goal.height *
            random(
                .17,
                .47
            )

    };

}


function keeperTarget(
    zone
) {

    const goal =
        goalGeometry();


    return {

        x:

            zone === "left"

                ? goal.x +
                    goal.width *
                    .18

                : zone === "right"

                    ? goal.x +
                        goal.width *
                        .82

                    : state.width / 2,

        y:
            goal.y +
            goal.height *
            .63

    };

}


/* =========================================================
   NORMAL SHOT
========================================================= */

function startDirectionShot(
    zone
) {

    if (
        state.busy ||
        state.paused ||
        state.resultOpen
    ) {

        return;

    }


    let target =
        targetForZone(
            zone
        );


    if (
        state.mode ===
        "penalty" &&
        playerSelect.value ===
        "Jude Bellingham"
    ) {

        target.y =
            goalGeometry().y +
            goalGeometry().height *
            .18;

    }


    beginShot(
        target,
        state.mode
    );

}


/* =========================================================
   BEGIN SHOT
========================================================= */

function beginShot(
    target,
    mode
) {

    if (
        state.busy
    ) {

        return;

    }


    const player =
        getPlayer();


    const difficulty =
        DIFFICULTY[
            difficultySelect.value
        ];


    const goalkeeper =
        getKeeper();


    state.busy =
        true;


    let start;


    if (
        mode ===
        "penalty"
    ) {

        start =
            penaltyStart();

    }

    else if (
        mode ===
        "freekick"
    ) {

        start =
            freeKickStart();

    }

    else if (
        mode ===
        "longshot"
    ) {

        start =
            longShotStart();

    }

    else {

        start =
            crossbarStart();

    }


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


    ball.progress =
        0;


    const curveBase =

        mode ===
        "freekick"

            ? 150

            : mode ===
              "longshot"

                ? 55

                : 44;


    ball.curve =

        (
            target.x <
            state.width / 2
                ? -1
                : 1
        ) *

        curveBase *

        (
            player.curve /
            100
        );


    if (
        mode ===
        "freekick" &&
        playerSelect.value ===
        "Lamine Yamal"
    ) {

        ball.curve *=
            1.25;

    }


    ball.arc =

        mode ===
        "freekick"

            ? 55

            : mode ===
              "longshot"

                ? 82

                : 18;


    state.selectedPower =

        mode ===
        "longshot"

            ? player.longShot /
                100

            : player.power /
                100;


    state.shotStart =
        performance.now();


    state.shotDuration =

        mode ===
        "longshot"

            ? 1100 /
                difficulty.shotSpeed

            : mode ===
              "freekick"

                ? 840 /
                    difficulty.shotSpeed

                : 720 /
                    difficulty.shotSpeed;


    powerWrap
        .classList
        .remove(
            "hidden"
        );


    if (
        mode ===
            "longshot" ||
        mode ===
            "crossbar"
    ) {

        aimCard
            .classList
            .remove(
                "hidden"
            );


        accuracyCard
            .classList
            .remove(
                "hidden"
            );


        aimText.textContent =
            `${Math.round(
                Math.abs(
                    target.x -
                    state.width / 2
                ) /
                (
                    state.width *
                    .5
                ) *
                100
            )}%`;


        accuracyText.textContent =
            `${Math.round(
                clamp(
                    player.accuracy,
                    1,
                    100
                )
            )}%`;

    }


    const zone =

        target.x <
        state.width *
        .38

            ? "left"

            : target.x >
              state.width *
              .62

                ? "right"

                : "center";


    const readChance =
        clamp(
            difficulty.keeperRead +
            state.level *
            .018 -
            player.accuracy /
            1000,
            .08,
            .94
        );


    const reads =
        Math.random() <
        readChance;


    const guessedZone =
        reads
            ? zone
            : [
                "left",
                "center",
                "right"
              ][
                Math.floor(
                    Math.random() *
                    3
                )
              ];


    const guessedTarget =
        keeperTarget(
            guessedZone
        );


    keeper.targetX =
        guessedTarget.x;

    keeper.targetY =
        guessedTarget.y;


    keeper.moveStart =
        performance.now() +
        difficulty.reaction;


    keeper.moveDuration =
        clamp(
            430 -
            (
                goalkeeper.reactions -
                80
            ) *
            2 -
            state.level *
            8,

            170,

            430
        );


    keeper.pose =

        guessedZone ===
        "left"

            ? -.30

            : guessedZone ===
              "right"

                ? .30

                : 0;


    if (
        mode ===
        "freekick"
    ) {

        setMessage(
            playerSelect.value ===
            "Lamine Yamal"

                ? "YAMAL FREE KICK! 🎯"

                : "FREE KICK! 🎯",

            "Bend the ball around the wall."
        );

    }

    else if (
        mode ===
        "longshot"
    ) {

        setMessage(
            "LONG SHOT! 🚀",
            "Power through the defense."
        );

    }

    else if (
        mode ===
        "crossbar"
    ) {

        setMessage(
            "CROSSBAR ATTEMPT! 🎯",
            "Hit the bar for bonus points."
        );

    }

    else {

        setMessage(
            playerSelect.value ===
            "Jude Bellingham"

                ? "BELLINGHAM PENALTY! ⚽"

                : "SHOT! ⚡",

            "The goalkeeper is reading the target."
        );

    }

}


/* =========================================================
   EXACT AIM
========================================================= */

function selectExactTarget(
    clientX,
    clientY
) {

    if (
        state.busy ||
        state.paused
    ) {

        return;

    }


    const rect =
        canvas.getBoundingClientRect();


    const x =
        clientX -
        rect.left;


    const y =
        clientY -
        rect.top;


    const goal =
        goalGeometry();


    const inside =

        x >= goal.x &&

        x <=
            goal.x +
            goal.width &&

        y >= goal.y &&

        y <=
            goal.y +
            goal.height;


    if (
        !inside
    ) {

        setMessage(
            "TARGET MUST BE INSIDE THE GOAL",
            "Tap the net."
        );

        tone(
            150,
            .08,
            "sawtooth",
            .02
        );

        return;

    }


    state.targetX =
        clamp(
            x,
            goal.x + 10,
            goal.x +
            goal.width -
            10
        );


    state.targetY =
        clamp(
            y,
            goal.y + 10,
            goal.y +
            goal.height -
            10
        );


    tone(
        520,
        .06,
        "triangle",
        .025
    );


    setMessage(
        "TARGET LOCKED 🎯",
        "Press SHOOT."
    );

}


/* =========================================================
   EXACT SHOOT
========================================================= */

function shootExactTarget() {

    if (
        state.targetX ===
            null ||
        state.targetY ===
            null
    ) {

        setMessage(
            "CHOOSE A TARGET FIRST",
            "Tap inside the goal."
        );

        return;

    }


    beginShot(
        {
            x:
                state.targetX,

            y:
                state.targetY
        },

        state.mode
    );

}


/* =========================================================
   FINISH SHOT
========================================================= */

function finishShot() {

    if (
        !state.busy
    ) {

        return;

    }


    state.busy =
        false;


    powerWrap
        .classList
        .add(
            "hidden"
        );


    const goalkeeper =
        getKeeper();


    const difficulty =
        DIFFICULTY[
            difficultySelect.value
        ];


    const shotDistance =
        dist(
            keeper.x,
            keeper.y,
            ball.targetX,
            ball.targetY
        );


    let saveRadius =
        difficulty.saveRadius *
        (
            .75 +
            goalkeeper.reach /
            200
        );


    saveRadius +=
        goalkeeper.reflexes /
        25;


    if (
        keeperSelect.value ===
        "Hassan Ali"
    ) {

        saveRadius +=
            55;

    }


    const saved =
        shotDistance <
        saveRadius;


    if (
        saved
    ) {

        state.combo =
            0;


        state.saves++;


        createParticles(
            ball.targetX,
            ball.targetY,
            "save",
            45
        );


        saveSound();


        setMessage(
            keeperSelect.value ===
            "Hassan Ali"

                ? "HASSAN ALI — 300 REFLEX SAVE! 👑🧤"

                : "SAVED! 🧤",

            "The goalkeeper reached the ball."
        );


        showResult(
            "SAVED",
            "0",
            `${keeperSelect.value} made the save.`
        );


    }

    else {

        resolveGoal();

    }


    updateHUD();

}


/* =========================================================
   GOAL
========================================================= */

function resolveGoal() {

    const player =
        getPlayer();


    let points =
        1;


    if (
        state.mode ===
        "freekick"
    ) {

        points =
            2;

    }


    if (
        state.mode ===
        "longshot"
    ) {

        points =
            3;

    }


    if (
        state.mode ===
        "crossbar"
    ) {

        points =
            4;

    }


    if (
        state.mode ===
        "penalty" &&
        playerSelect.value ===
        "Jude Bellingham"
    ) {

        points +=
            1;

    }


    if (
        state.mode ===
        "freekick" &&
        playerSelect.value ===
        "Lamine Yamal"
    ) {

        points +=
            1;

    }


    state.goals++;


    state.score +=
        points;


    state.combo++;


    state.bestCombo =
        Math.max(
            state.bestCombo,
            state.combo
        );


    const oldLevel =
        state.level;


    state.level =
        Math.floor(
            state.goals /
            3
        ) +
        1;


    createParticles(
        ball.targetX,
        ball.targetY,
        "goal",
        65
    );


    createConfetti();


    goalSound();


    const levelUp =
        state.level >
        oldLevel;


    if (
        levelUp
    ) {

        setMessage(
            `LEVEL ${state.level}! 🏆`,
            `+${points} points`
        );

    }

    else if (
        state.combo >=
        3
    ) {

        setMessage(
            "HOT STREAK! 🔥",
            `+${points} points`
        );

    }

    else {

        setMessage(
            "GOOOOOAL! ⚽🔥",
            `+${points} points`
        );

    }


    showResult(
        "GOAL!",
        `+${points}`,
        `${playerSelect.value} found the net.`
    );


    updateHUD();

}


/* =========================================================
   CROSSBAR
========================================================= */

function checkCrossbar() {

    const goal =
        goalGeometry();


    const nearBar =
        Math.abs(
            ball.targetY -
            goal.y
        ) <
        Math.max(
            14,
            goal.height *
            .045
        );


    const inside =
        ball.targetX >
        goal.x +
        goal.width *
        .08 &&

        ball.targetX <
        goal.x +
        goal.width *
        .92;


    return (
        nearBar &&
        inside
    );

}


/* =========================================================
   GOALKEEPER MODE
========================================================= */

function startKeeperChallenge() {

    clearTimeout(
        state.timer
    );


    state.keeperActive =
        false;


    state.busy =
        false;


    const goal =
        goalGeometry();


    const zones = [
        "left",
        "center",
        "right"
    ];


    const zone =
        zones[
            Math.floor(
                Math.random() *
                zones.length
            )
        ];


    state.keeperZone =
        zone;


    const target =
        keeperTarget(
            zone
        );


    ball.startX =
        random(
            goal.x +
                goal.width *
                .10,

            goal.x +
                goal.width *
                .90
        );


    ball.startY =
        goal.y -
        state.height *
        .32;


    ball.targetX =
        target.x;


    ball.targetY =
        state.height *
        .80;


    ball.x =
        ball.startX;


    ball.y =
        ball.startY;


    ball.progress =
        0;


    ball.curve =
        random(
            -22,
            22
        );


    keeper.x =
        state.width / 2;


    keeper.y =
        state.height *
        .79;


    setMessage(
        "GET READY! 🧤",
        "Choose a diving direction."
    );


    state.timer =
        setTimeout(
            () => {

                if (
                    state.mode !==
                    "keeper" ||
                    state.paused
                ) {

                    return;

                }


                state.keeperActive =
                    true;


                state.shotStart =
                    performance.now();


                setMessage(
                    "SAVE IT! 🧤",
                    "React quickly!"
                );

            },

            520
        );

}


/* =========================================================
   GOALKEEPER INPUT
========================================================= */

function keeperSave(
    zone
) {

    if (
        state.mode !==
            "keeper" ||
        !state.keeperActive ||
        state.paused
    ) {

        return;

    }


    state.keeperActive =
        false;


    const keeper =
        getKeeper();


    const correct =
        zone ===
        state.keeperZone;


    let chance =
        .35 +
        (
            keeper.reflexes /
            250
        ) *
        .25;


    if (
        keeperSelect.value ===
        "Hassan Ali"
    ) {

        chance =
            .999;

    }


    const save =
        correct &&
        Math.random() <
        clamp(
            chance,
            0,
            .999
        );


    if (
        save
    ) {

        state.saves++;


        state.score +=
            2;


        state.combo++;


        state.bestCombo =
            Math.max(
                state.bestCombo,
                state.combo
            );


        createParticles(
            state.width / 2,
            state.height *
                .62,

            "save",

            50
        );


        saveSound();


        setMessage(
            keeperSelect.value ===
            "Hassan Ali"

                ? "HASSAN ALI — 300 GK SAVE! 👑🧤"

                : "INCREDIBLE SAVE! 🧤🔥",

            "+2 points"
        );


        showResult(
            "SAVE!",
            "+2",
            keeperSelect.value ===
            "Hassan Ali"

                ? "300 diving • 300 reflexes • 300 reach"

                : "Excellent goalkeeping"
        );


    }

    else {

        state.combo =
            0;


        setMessage(
            "GOAL! 😱",
            "The striker beat the keeper."
        );


        showResult(
            "GOAL",
            "0",
            "The shot got through."
        );

    }


    updateHUD();

}


/* =========================================================
   RESULT SCREEN
========================================================= */

function showResult(
    title,
    points,
    detail
) {

    resultTitle.textContent =
        title;


    resultPoints.textContent =
        points;


    resultDetail.textContent =
        detail;


    state.resultOpen =
        true;


    resultOverlay
        .classList
        .remove(
            "hidden"
        );

}


function continueResult() {

    state.resultOpen =
        false;


    resultOverlay
        .classList
        .add(
            "hidden"
        );


    resetRound();

}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles(
    x,
    y,
    type = "goal",
    amount = 40
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            random(
                90,
                420
            );


        particles.push({

            x,

            y,

            vx:
                Math.cos(
                    angle
                ) *
                speed,

            vy:
                Math.sin(
                    angle
                ) *
                speed -
                random(
                    20,
                    130
                ),

            life:
                random(
                    .6,
                    1.1
                ),

            size:
                random(
                    2,
                    6
                ),

            type

        });

    }

}


function createConfetti() {

    for (
        let i = 0;
        i < 90;
        i++
    ) {

        confetti.push({

            x:
                state.width /
                    2 +
                random(
                    -100,
                    100
                ),

            y:
                state.height *
                .34,

            vx:
                random(
                    -300,
                    300
                ),

            vy:
                random(
                    -430,
                    -120
                ),

            life:
                1,

            size:
                random(
                    3,
                    7
                ),

            rot:
                random(
                    0,
                    Math.PI *
                    2
                ),

            spin:
                random(
                    -8,
                    8
                )

        });

    }

}


function updateParticles(
    dt
) {

    for (
        const p of particles
    ) {

        p.x +=
            p.vx *
            dt;


        p.y +=
            p.vy *
            dt;


        p.vy +=
            290 *
            dt;


        p.life -=
            dt *
            1.25;

    }


    particles =
        particles.filter(
            p =>
                p.life >
                0
        );


    for (
        const c of confetti
    ) {

        c.x +=
            c.vx *
            dt;


        c.y +=
            c.vy *
            dt;


        c.vy +=
            430 *
            dt;


        c.rot +=
            c.spin *
            dt;


        c.life -=
            dt *
            .75;

    }


    confetti =
        confetti.filter(
            c =>
                c.life >
                0
        );

}


/* =========================================================
   DRAW PARTICLES
========================================================= */

function drawParticles() {

    for (
        const p of particles
    ) {

        ctx.globalAlpha =
            clamp(
                p.life,
                0,
                1
            );


        ctx.fillStyle =

            p.type ===
            "goal"

                ? "#ffe13d"

                : p.type ===
                  "save"

                    ? "#65eaff"

                    : "#ffffff";


        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI *
            2
        );


        ctx.fill();

    }


    ctx.globalAlpha =
        1;


    const colors = [

        "#ffeb45",
        "#65eaff",
        "#ff708d",
        "#ffffff",
        "#9eff67"

    ];


    for (
        const c of confetti
    ) {

        ctx.save();


        ctx.globalAlpha =
            clamp(
                c.life,
                0,
                1
            );


        ctx.translate(
            c.x,
            c.y
        );


        ctx.rotate(
            c.rot
        );


        ctx.fillStyle =
            colors[
                Math.abs(
                    Math.floor(
                        c.x
                    )
                ) %
                colors.length
            ];


        ctx.fillRect(
            -c.size,
            -c.size / 2,
            c.size * 2,
            c.size
        );


        ctx.restore();

    }


    ctx.globalAlpha =
        1;

}


/* =========================================================
   STADIUM
========================================================= */

function drawStadium() {

    ctx.fillStyle =
        "#18251e";


    ctx.fillRect(
        0,
        0,
        state.width,
        state.height *
            .15
    );


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const x =
            state.width *
            (
                .10 +
                i *
                .20
            );


        ctx.shadowColor =
            "#ffffff";


        ctx.shadowBlur =
            18;


        ctx.fillStyle =
            "#ffffff";


        ctx.beginPath();


        ctx.arc(
            x,
            state.height *
                .055,
            7,
            0,
            Math.PI *
            2
        );


        ctx.fill();

    }


    ctx.shadowBlur =
        0;

}


/* =========================================================
   FIELD
========================================================= */

function drawField() {

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            state.height
        );


    gradient.addColorStop(
        0,
        "#159b47"
    );


    gradient.addColorStop(
        .48,
        "#087733"
    );


    gradient.addColorStop(
        1,
        "#045825"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        state.width,
        state.height
    );


    drawStadium();


    /* GRASS STRIPES */

    for (
        let i = 0;
        i < 16;
        i++
    ) {

        ctx.fillStyle =

            i % 2 === 0

                ? "rgba(
                    255,
                    255,
                    255,
                    .035
                )"

                : "rgba(
                    0,
                    0,
                    0,
                    .035
                )";


        ctx.fillRect(
            state.width *
                .035,

            state.height *
                .15 +
                i *
                state.height *
                .82 /
                16,

            state.width *
                .93,

            state.height *
                .82 /
                16 +
                1
        );

    }


    ctx.strokeStyle =
        "rgba(
            255,
            255,
            255,
            .88
        )";


    ctx.lineWidth =
        3;


    /* OUTLINE */

    ctx.strokeRect(
        state.width *
            .035,

        state.height *
            .15,

        state.width *
            .93,

        state.height *
            .82
    );


    /* HALF WAY */

    ctx.beginPath();


    ctx.moveTo(
        state.width *
            .035,

        state.height *
            .56
    );


    ctx.lineTo(
        state.width *
            .965,

        state.height *
            .56
    );


    ctx.stroke();


    /* CENTER CIRCLE */

    ctx.beginPath();


    ctx.arc(
        state.width /
            2,

        state.height *
            .56,

        Math.min(
            state.width,
            state.height
        ) *
            .12,

        0,
        Math.PI *
            2
    );


    ctx.stroke();


    /* BOX */

    ctx.strokeRect(
        state.width *
            .105,

        state.height *
            .15,

        state.width *
            .79,

        state.height *
            .40
    );


    /* SIX YARD */

    ctx.strokeRect(
        state.width *
            .26,

        state.height *
            .15,

        state.width *
            .48,

        state.height *
            .23
    );


    /* PENALTY SPOT */

    ctx.fillStyle =
        "#ffffff";


    ctx.beginPath();


    ctx.arc(
        state.width /
            2,

        state.height *
            .51,

        4,

        0,
        Math.PI *
            2
    );


    ctx.fill();


    drawGoal();


    if (
        state.mode ===
        "freekick"
    ) {

        drawWall();

    }

}


/* =========================================================
   GOAL
========================================================= */

function drawGoal() {

    const goal =
        goalGeometry();


    /* NET BACKGROUND */

    ctx.fillStyle =
        "rgba(
            255,
            255,
            255,
            .065
        )";


    ctx.fillRect(
        goal.x,
        goal.y,
        goal.width,
        goal.height
    );


    /* NET VERTICAL */

    ctx.strokeStyle =
        "rgba(
            255,
            255,
            255,
            .22
        )";


    ctx.lineWidth =
        1;


    const dx =
        Math.max(
            18,
            goal.width /
                16
        );


    const dy =
        Math.max(
            15,
            goal.height /
                9
        );


    for (
        let x =
            goal.x;

        x <=
            goal.x +
            goal.width;

        x +=
            dx
    ) {

        ctx.beginPath();


        ctx.moveTo(
            x,
            goal.y
        );


        ctx.lineTo(
            x,
            goal.y +
                goal.height
        );


        ctx.stroke();

    }


    /* NET HORIZONTAL */

    for (
        let y =
            goal.y;

        y <=
            goal.y +
            goal.height;

        y +=
            dy
    ) {

        ctx.beginPath();


        ctx.moveTo(
            goal.x,
            y
        );


        ctx.lineTo(
            goal.x +
                goal.width,
            y
        );


        ctx.stroke();

    }


    /* GOAL POSTS */

    ctx.strokeStyle =
        "#ffffff";


    ctx.lineWidth =
        Math.max(
            6,
            state.width /
                130
        );


    ctx.strokeRect(
        goal.x,
        goal.y,
        goal.width,
        goal.height
    );


    ctx.strokeStyle =
        "#e0eae3";


    ctx.lineWidth =
        2;


    ctx.strokeRect(
        goal.x + 7,
        goal.y + 7,
        goal.width - 14,
        goal.height - 14
    );


    /* CROSSBAR TARGET */

    if (
        state.mode ===
        "crossbar"
    ) {

        ctx.strokeStyle =
            "#ffe05d";


        ctx.lineWidth =
            5;


        ctx.beginPath();


        ctx.moveTo(
            goal.x +
                goal.width *
                .04,

            goal.y +
                2
        );


        ctx.lineTo(
            goal.x +
                goal.width *
                .96,

            goal.y +
                2
        );


        ctx.stroke();

    }

}


/* =========================================================
   WALL
========================================================= */

function drawWall() {

    const spacing =
        Math.min(
            state.width *
                .052,

            62
        );


    const count =
        Math.min(
            5 +
            Math.floor(
                state.level /
                2
            ),

            9
        );


    const start =
        state.width /
            2 -

        (
            count -
            1
        ) *
        spacing /
        2;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        drawWallPlayer(
            start +
                i *
                spacing,

            state.height *
                .49
        );

    }


    ctx.fillStyle =
        "#ffffffcc";


    ctx.font =
        "bold 10px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(
        "DEFENSIVE WALL",
        state.width /
            2,

        state.height *
            .49 +
            40
    );

}


function drawWallPlayer(
    x,
    y
) {

    const scale =
        clamp(
            Math.min(
                state.width,
                state.height
            ) /
            700,

            .65,

            1.15
        );


    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.strokeStyle =
        "#111a14";


    ctx.lineWidth =
        7 *
        scale;


    ctx.beginPath();


    ctx.moveTo(
        -5 *
            scale,

        14 *
            scale
    );


    ctx.lineTo(
        -8 *
            scale,

        34 *
            scale
    );


    ctx.moveTo(
        5 *
            scale,

        14 *
            scale
    );


    ctx.lineTo(
        8 *
            scale,

        34 *
            scale
    );


    ctx.stroke();


    ctx.fillStyle =
        "#334fa6";


    ctx.fillRect(
        -12 *
            scale,

        -11 *
            scale,

        24 *
            scale,

        29 *
            scale
    );


    ctx.fillStyle =
        "#ca8b66";


    ctx.beginPath();


    ctx.arc(
        0,

        -24 *
            scale,

        8 *
            scale,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    ctx.restore();

}


/* =========================================================
   PLAYER
========================================================= */

function drawPlayer() {

    if (
        state.mode ===
        "keeper"
    ) {

        return;

    }


    let start;


    if (
        state.mode ===
        "penalty"
    ) {

        start =
            penaltyStart();

    }

    else if (
        state.mode ===
        "freekick"
    ) {

        start =
            freeKickStart();

    }

    else if (
        state.mode ===
        "longshot"
    ) {

        start =
            longShotStart();

    }

    else {

        start =
            crossbarStart();

    }


    const scale =
        clamp(
            Math.min(
                state.width,
                state.height
            ) /
            700,

            .65,

            1.15
        );


    ctx.save();


    ctx.translate(
        start.x,
        start.y +
            16
    );


    /* SHADOW */

    ctx.fillStyle =
        "rgba(
            0,
            0,
            0,
            .25
        )";


    ctx.beginPath();


    ctx.ellipse(
        0,

        25 *
            scale,

        31 *
            scale,

        8 *
            scale,

        0,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    /* LEGS */

    ctx.strokeStyle =
        "#f5f5f5";


    ctx.lineWidth =
        9 *
        scale;


    ctx.beginPath();


    ctx.moveTo(
        -9 *
            scale,

        9 *
            scale
    );


    ctx.lineTo(
        -17 *
            scale,

        35 *
            scale
    );


    ctx.moveTo(
        9 *
            scale,

        9 *
            scale
    );


    ctx.lineTo(
        17 *
            scale,

        35 *
            scale
    );


    ctx.stroke();


    /* SHIRT */

    const player =
        getPlayer();


    ctx.fillStyle =
        player.color;


    ctx.fillRect(
        -22 *
            scale,

        -30 *
            scale,

        44 *
            scale,

        44 *
            scale
    );


    /* HEAD */

    ctx.fillStyle =
        "#c98b67";


    ctx.beginPath();


    ctx.arc(
        0,

        -47 *
            scale,

        15 *
            scale,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    /* ARMS */

    ctx.strokeStyle =
        "#26362c";


    ctx.lineWidth =
        7 *
        scale;


    ctx.beginPath();


    ctx.moveTo(
        -17 *
            scale,

        -14 *
            scale
    );


    ctx.lineTo(
        -30 *
            scale,

        2 *
            scale
    );


    ctx.moveTo(
        17 *
            scale,

        -14 *
            scale
    );


    ctx.lineTo(
        30 *
            scale,

        2 *
            scale
    );


    ctx.stroke();


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


    const scale =
        clamp(
            Math.min(
                state.width,
                state.height
            ) /
            700,

            .65,

            1.18
        );


    ctx.rotate(
        keeper.pose
    );


    /* SHADOW */

    ctx.fillStyle =
        "rgba(
            0,
            0,
            0,
            .25
        )";


    ctx.beginPath();


    ctx.ellipse(
        0,

        34 *
            scale,

        40 *
            scale,

        9 *
            scale,

        0,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    /* LEGS */

    ctx.strokeStyle =
        "#15271b";


    ctx.lineWidth =
        12 *
        scale;


    ctx.beginPath();


    ctx.moveTo(
        -10 *
            scale,

        11 *
            scale
    );


    ctx.lineTo(
        -18 *
            scale,

        44 *
            scale
    );


    ctx.moveTo(
        10 *
            scale,

        11 *
            scale
    );


    ctx.lineTo(
        18 *
            scale,

        44 *
            scale
    );


    ctx.stroke();


    /* SHIRT */

    const shirt =
        ctx.createLinearGradient(
            -25 *
                scale,

            -30 *
                scale,

            25 *
                scale,

            30 *
                scale
        );


    shirt.addColorStop(
        0,
        "#ffe62a"
    );


    shirt.addColorStop(
        1,
        "#de8a00"
    );


    ctx.fillStyle =
        shirt;


    ctx.fillRect(
        -25 *
            scale,

        -30 *
            scale,

        50 *
            scale,

        50 *
            scale
    );


    /* HEAD */

    ctx.fillStyle =
        "#d69a70";


    ctx.beginPath();


    ctx.arc(
        0,

        -47 *
            scale,

        17 *
            scale,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    /* HAIR */

    ctx.fillStyle =
        "#24170e";


    ctx.beginPath();


    ctx.arc(
        0,

        -53 *
            scale,

        16 *
            scale,

        Math.PI,

        Math.PI *
            2
    );


    ctx.fill();


    /* ARMS */

    ctx.strokeStyle =
        "#ffcc18";


    ctx.lineWidth =
        12 *
        scale;


    ctx.beginPath();


    ctx.moveTo(
        -20 *
            scale,

        -15 *
            scale
    );


    ctx.lineTo(
        -45 *
            scale,

        3 *
            scale
    );


    ctx.moveTo(
        20 *
            scale,

        -15 *
            scale
    );


    ctx.lineTo(
        45 *
            scale,

        3 *
            scale
    );


    ctx.stroke();


    /* GLOVES */

    ctx.fillStyle =
        "#ffffff";


    ctx.beginPath();


    ctx.arc(
        -45 *
            scale,

        3 *
            scale,

        9 *
            scale,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.arc(
        45 *
            scale,

        3 *
            scale,

        9 *
            scale,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    ctx.restore();

}


/* =========================================================
   BALL
========================================================= */

function drawBall() {

    const radius =
        clamp(
            ball.radius,
            7,
            16
        );


    ctx.save();


    ctx.shadowColor =
        "rgba(
            0,
            0,
            0,
            .55
        )";


    ctx.shadowBlur =
        12;


    const gradient =
        ctx.createRadialGradient(
            ball.x -
                radius *
                .35,

            ball.y -
                radius *
                .45,

            2,

            ball.x,

            ball.y,

            radius
        );


    gradient.addColorStop(
        0,
        "#ffffff"
    );


    gradient.addColorStop(
        1,
        "#b7c1bb"
    );


    ctx.fillStyle =
        gradient;


    ctx.beginPath();


    ctx.arc(
        ball.x,
        ball.y,
        radius,
        0,
        Math.PI *
            2
    );


    ctx.fill();


    ctx.shadowBlur =
        0;


    ctx.fillStyle =
        "#222";


    ctx.beginPath();


    ctx.arc(
        ball.x -
            radius *
            .20,

        ball.y -
            radius *
            .15,

        radius *
            .22,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.arc(
        ball.x +
            radius *
            .27,

        ball.y +
            radius *
            .20,

        radius *
            .14,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    ctx.strokeStyle =
        "#222";


    ctx.lineWidth =
        1.5;


    ctx.stroke();


    ctx.restore();

}


/* =========================================================
   AIM TARGET
========================================================= */

function drawTarget() {

    if (
        state.targetX ===
            null ||
        state.targetY ===
            null
    ) {

        return;

    }


    if (
        state.busy
    ) {

        return;

    }


    if (
        state.mode !==
            "longshot" &&
        state.mode !==
            "crossbar"
    ) {

        return;

    }


    ctx.save();


    ctx.strokeStyle =
        state.mode ===
        "crossbar"

            ? "#ffe05d"

            : "#ffffff";


    ctx.lineWidth =
        2;


    ctx.shadowColor =
        "#000";


    ctx.shadowBlur =
        8;


    ctx.beginPath();


    ctx.arc(
        state.targetX,
        state.targetY,
        18,
        0,
        Math.PI *
            2
    );


    ctx.stroke();


    ctx.beginPath();


    ctx.moveTo(
        state.targetX -
            24,

        state.targetY
    );


    ctx.lineTo(
        state.targetX +
            24,

        state.targetY
    );


    ctx.moveTo(
        state.targetX,

        state.targetY -
            24
    );


    ctx.lineTo(
        state.targetX,

        state.targetY +
            24
    );


    ctx.stroke();


    ctx.fillStyle =
        state.mode ===
        "crossbar"

            ? "#ffe05d"

            : "#ff5c37";


    ctx.beginPath();


    ctx.arc(
        state.targetX,
        state.targetY,
        5,
        0,
        Math.PI *
            2
    );


    ctx.fill();


    ctx.restore();

}


/* =========================================================
   GOALKEEPER POV
========================================================= */

function drawKeeperPOV() {

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            state.height
        );


    gradient.addColorStop(
        0,
        "#166f37"
    );


    gradient.addColorStop(
        1,
        "#043d20"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        state.width,
        state.height
    );


    ctx.strokeStyle =
        "#ffffff";


    ctx.lineWidth =
        Math.max(
            7,
            state.width /
            150
        );


    ctx.strokeRect(
        state.width *
            .09,

        state.height *
            .09,

        state.width *
            .82,

        state.height *
            .58
    );


    ctx.strokeStyle =
        "rgba(
            255,
            255,
            255,
            .22
        )";


    ctx.lineWidth =
        1;


    for (
        let x =
            state.width *
            .09;

        x <=
            state.width *
            .91;

        x +=
            Math.max(
                22,
                state.width /
                    18
            )
    ) {

        ctx.beginPath();


        ctx.moveTo(
            x,
            state.height *
                .09
        );


        ctx.lineTo(
            x,
            state.height *
                .67
        );


        ctx.stroke();

    }


    for (
        let y =
            state.height *
            .09;

        y <=
            state.height *
            .67;

        y +=
            Math.max(
                18,
                state.height /
                    12
            )
    ) {

        ctx.beginPath();


        ctx.moveTo(
            state.width *
                .09,

            y
        );


        ctx.lineTo(
            state.width *
                .91,

            y
        );


        ctx.stroke();

    }


    if (
        state.keeperActive
    ) {

        const p =
            clamp(
                ball.progress,
                0,
                1
            );


        const radius =
            lerp(
                8,
                28,
                p
            );


        ctx.shadowColor =
            "#ffffff";


        ctx.shadowBlur =
            18;


        ctx.fillStyle =
            "#ffffff";


        ctx.beginPath();


        ctx.arc(
            ball.x,
            ball.y,
            radius,
            0,
            Math.PI *
                2
        );


        ctx.fill();


        ctx.shadowBlur =
            0;


        ctx.strokeStyle =
            "#222";


        ctx.lineWidth =
            2;


        ctx.stroke();

    }


    /* GLOVES */

    ctx.fillStyle =
        "rgba(
            255,
            255,
            255,
            .94
        )";


    ctx.beginPath();


    ctx.ellipse(
        state.width *
            .20,

        state.height *
            .90,

        58,

        28,

        -.34,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.ellipse(
        state.width *
            .80,

        state.height *
            .90,

        58,

        28,

        .34,

        0,

        Math.PI *
            2
    );


    ctx.fill();


    ctx.fillStyle =
        "rgba(
            0,
            0,
            0,
            .40
        )";


    ctx.fillRect(
        0,
        state.height -
            58,
        state.width,
        58
    );


    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 18px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(
        keeperSelect.value ===
        "Hassan Ali"

            ? "HASSAN ALI — 300 GK STATS"

            : "GOALKEEPER POV — SAVE IT!",

        state.width /
            2,

        state.height -
            28
    );

}


/* =========================================================
   GAME UPDATE
========================================================= */

function updateGame(
    dt,
    time
) {

    if (
        state.paused ||
        state.resultOpen
    ) {

        return;

    }


    updateParticles(
        dt
    );


    /* KEEPER MODE */

    if (
        state.mode ===
        "keeper"
    ) {

        if (
            !state.keeperActive
        ) {

            return;

        }


        const elapsed =
            time -
            state.shotStart;


        const total =
            1480 -
            Math.min(
                450,
                (
                    state.level -
                    1
                ) *
                18
            );


        const p =
            clamp(
                elapsed /
                total,

                0,
                1
            );


        ball.progress =
            p;


        const e =
            ease(p);


        ball.x =
            lerp(
                ball.startX,
                ball.targetX,
                e
            ) +
            Math.sin(
                p *
                Math.PI
            ) *
            ball.curve;


        ball.y =
            lerp(
                ball.startY,
                ball.targetY,
                e
            );


        ball.radius =
            lerp(
                8,
                28,
                p
            );


        if (
            p >=
            1
        ) {

            state.keeperActive =
                false;


            state.combo =
                0;


            setMessage(
                "TOO LATE! ⚽",
                "The goalkeeper missed the reaction window."
            );


            showResult(
                "TOO LATE",
                "0",
                "Try reacting earlier."
            );


            updateHUD();

        }


        return;

    }


    /* NORMAL MODE */

    if (
        !state.busy
    ) {

        return;

    }


    const elapsed =
        time -
        state.shotStart;


    const p =
        clamp(
            elapsed /
            state.shotDuration,

            0,
            1
        );


    ball.progress =
        p;


    const e =
        ease(p);


    const windOffset =
        state.wind *
        state.width *
        .045 *
        Math.sin(
            p *
            Math.PI
        );


    ball.x =
        lerp(
            ball.startX,
            ball.targetX,
            e
        ) +

        Math.sin(
            p *
            Math.PI
        ) *
        ball.curve +

        windOffset;


    ball.y =
        lerp(
            ball.startY,
            ball.targetY,
            e
        ) -

        Math.sin(
            p *
            Math.PI
        ) *
        ball.arc;


    ball.radius =
        lerp(
            13,
            8,
            p
        );


    /* KEEPER MOVEMENT */

    if (
        time >=
        keeper.moveStart
    ) {

        const keeperP =
            clamp(
                (
                    time -
                    keeper.moveStart
                ) /
                keeper.moveDuration,

                0,
                1
            );


        const keeperEase =
            ease(
                keeperP
            );


        keeper.x =
            lerp(
                keeper.homeX,
                keeper.targetX,
                keeperEase
            );


        keeper.y =
            lerp(
                keeper.homeY,
                keeper.targetY,
                keeperEase *
                .72
            );

    }


    /* POWER METER */

    const power =
        clamp(
            (
                Math.sin(
                    p *
                    Math.PI *
                    3
                ) *
                .25 +
                .75
            ) *
            100,

            0,
            100
        );


    powerFill.style.width =
        `${power}%`;


    /* CROSSBAR */

    if (
        p >=
        1
    ) {

        state.busy =
            false;


        powerWrap
            .classList
            .add(
                "hidden"
            );


        if (
            state.mode ===
                "crossbar" &&
            checkCrossbar()
        ) {

            state.crossbarHits++;


            state.score +=
                5;


            state.combo++;


            state.bestCombo =
                Math.max(
                    state.bestCombo,
                    state.combo
                );


            createParticles(
                ball.targetX,
                ball.targetY,
                "goal",
                70
            );


            goalSound();


            showResult(
                "CROSSBAR HIT!",
                "+5",
                "Perfect accuracy!"
            );


            setMessage(
                "WHAT A HIT! 🎯",
                "+5 points"
            );


            updateHUD();


            return;

        }


        resolveShot();

    }

}


/* =========================================================
   DRAW GAME
========================================================= */

function drawGame() {

    ctx.clearRect(
        0,
        0,
        state.width,
        state.height
    );


    if (
        state.mode ===
        "keeper"
    ) {

        drawKeeperPOV();

        drawParticles();

        return;

    }


    drawField();

    drawPlayer();

    drawKeeper();

    drawBall();

    drawTarget();

    drawParticles();

}


/* =========================================================
   MAIN LOOP
========================================================= */

function gameLoop(
    time
) {

    const dt =
        Math.min(
            .033,

            Math.max(
                0,

                (
                    time -
                    state.lastTime
                ) /
                1000
            )
        );


    state.lastTime =
        time;


    updateGame(
        dt,
        time
    );


    drawGame();


    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================================
   MODE BUTTON EVENTS
========================================================= */

document
    .querySelectorAll(
        ".mode"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    setMode(
                        button.dataset.mode
                    );

                }
            );

        }
    );


/* =========================================================
   SHOOT BUTTON EVENTS
========================================================= */

document
    .querySelectorAll(
        "#shootControls .action-btn"
    )
    .forEach(
        button => {

            button.addEventListener(
                "pointerdown",
                event => {

                    event.preventDefault();


                    startDirectionShot(
                        button.dataset.zone
                    );

                }
            );

        }
    );


/* =========================================================
   KEEPER BUTTON EVENTS
========================================================= */

document
    .querySelectorAll(
        "#keeperControls .action-btn"
    )
    .forEach(
        button => {

            button.addEventListener(
                "pointerdown",
                event => {

                    event.preventDefault();


                    keeperSave(
                        button.dataset.save
                    );

                }
            );

        }
    );


/* =========================================================
   EXACT SHOOT BUTTON
========================================================= */

shootButton.addEventListener(
    "click",
    shootExactTarget
);


/* =========================================================
   CANVAS INPUT
========================================================= */

canvas.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();


        if (
            state.paused ||
            state.resultOpen
        ) {

            return;

        }


        /* EXACT MODES */

        if (
            state.mode ===
                "longshot" ||
            state.mode ===
                "crossbar"
        ) {

            if (
                !state.busy
            ) {

                selectExactTarget(
                    event.clientX,
                    event.clientY
                );

            }

            return;

        }


        /* KEEPER */

        if (
            state.mode ===
            "keeper"
        ) {

            const rect =
                canvas.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const zone =

                x <
                state.width /
                3

                    ? "left"

                    : x <
                      (
                          state.width *
                          2
                      ) /
                      3

                        ? "center"

                        : "right";


            keeperSave(
                zone
            );


            return;

        }


        /* NORMAL */

        if (
            state.busy
        ) {

            return;

        }


        const rect =
            canvas.getBoundingClientRect();


        const x =
            event.clientX -
            rect.left;


        const zone =

            x <
            state.width /
            3

                ? "left"

                : x <
                  (
                      state.width *
                      2
                  ) /
                  3

                    ? "center"

                    : "right";


        startDirectionShot(
            zone
        );

    },
    {
        passive:
            false
    }
);


/* =========================================================
   PLAYER CHANGE
========================================================= */

playerSelect.addEventListener(
    "change",
    () => {

        updateHUD();

        resetRound();

    }
);


/* =========================================================
   KEEPER CHANGE
========================================================= */

keeperSelect.addEventListener(
    "change",
    () => {

        updateHUD();

        resetRound();

    }
);


/* =========================================================
   DIFFICULTY
========================================================= */

difficultySelect.addEventListener(
    "change",
    () => {

        resetRound();

    }
);


/* =========================================================
   CAMERA
========================================================= */

cameraSelect.addEventListener(
    "change",
    () => {

        resizeCanvas();

        resetRound();

    }
);


/* =========================================================
   PAUSE
========================================================= */

function togglePause() {

    state.paused =
        !state.paused;


    pauseOverlay
        .classList
        .toggle(
            "hidden",
            !state.paused
        );


    pauseBtn.textContent =
        state.paused

            ? "▶ RESUME"

            : "⏸ PAUSE";

}


pauseBtn.addEventListener(
    "click",
    togglePause
);


resumeBtn.addEventListener(
    "click",
    togglePause
);


/* =========================================================
   RESTART
========================================================= */

restartBtn.addEventListener(
    "click",
    () => {

        clearTimeout(
            state.timer
        );


        state.score =
            0;


        state.goals =
            0;


        state.saves =
            0;


        state.level =
            1;


        state.combo =
            0;


        state.bestCombo =
            0;


        state.crossbarHits =
            0;


        state.paused =
            false;


        state.resultOpen =
            false;


        particles =
            [];


        confetti =
            [];


        pauseOverlay
            .classList
            .add(
                "hidden"
            );


        resultOverlay
            .classList
            .add(
                "hidden"
            );


        pauseBtn.textContent =
            "⏸ PAUSE";


        setMessage(
            "GAME RESTARTED! ⚽",
            "New match."
        );


        updateHUD();

        resetRound();

    }
);


/* =========================================================
   SOUND
========================================================= */

soundBtn.addEventListener(
    "click",
    () => {

        state.sound =
            !state.sound;


        soundBtn.textContent =
            state.sound

                ? "🔊 SOUND ON"

                : "🔇 SOUND OFF";

    }
);


/* =========================================================
   RESULT CONTINUE
========================================================= */

resultContinue.addEventListener(
    "click",
    continueResult
);


/* =========================================================
   RESIZE
========================================================= */

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


/* =========================================================
   START
========================================================= */

buildPlayerSelect();

buildKeeperSelect();

updateHUD();

resizeCanvas();

resetRound();

requestAnimationFrame(
    gameLoop
);
