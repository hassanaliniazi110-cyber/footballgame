"use strict";


/* ============================================================
   FOOTBALL LEGENDS ARENA X7
   ============================================================
   This version deliberately uses SVG for the visual stadium,
   goal, goalkeeper, player and ball instead of relying on
   canvas rendering for the main scene.

   Hassan Ali:
   - 300 shooting
   - 300 power
   - 300 accuracy
   - 300 curve
   - 300 speed
   - 300 stamina
   - 300 long shot
   - 300 penalty
   - 300 free kick

   Goalkeeper Hassan Ali:
   - 300 diving
   - 300 reflexes
   - 300 positioning
   - 300 handling
   - 300 speed
   - 300 kicking
   - 300 reactions
   - 300 reach
============================================================ */


/* ============================================================
   ELEMENTS
============================================================ */

const gameArea =
    document.getElementById(
        "gameArea"
    );


const pitchSvg =
    document.getElementById(
        "pitchSvg"
    );


const keeperSvg =
    document.getElementById(
        "keeperSvg"
    );


const ballElement =
    document.getElementById(
        "ball"
    );


const keeperBallElement =
    document.getElementById(
        "keeperBall"
    );


const fieldKeeper =
    document.getElementById(
        "fieldKeeper"
    );


const wallGroup =
    document.getElementById(
        "wallGroup"
    );


const aimTarget =
    document.getElementById(
        "aimTarget"
    );


/* HUD */

const scoreElement =
    document.getElementById(
        "score"
    );


const levelElement =
    document.getElementById(
        "level"
    );


const goalsElement =
    document.getElementById(
        "goals"
    );


const savesElement =
    document.getElementById(
        "saves"
    );


const comboElement =
    document.getElementById(
        "combo"
    );


const bestElement =
    document.getElementById(
        "best"
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
        "camera"
    );


const playerNameElement =
    document.getElementById(
        "playerName"
    );


const playerRoleElement =
    document.getElementById(
        "playerRole"
    );


const avatarElement =
    document.getElementById(
        "avatar"
    );


const statShoot =
    document.getElementById(
        "sShoot"
    );


const statPower =
    document.getElementById(
        "sPower"
    );


const statAccuracy =
    document.getElementById(
        "sAccuracy"
    );


const statCurve =
    document.getElementById(
        "sCurve"
    );


const statSpeed =
    document.getElementById(
        "sSpeed"
    );


const statStamina =
    document.getElementById(
        "sStamina"
    );


const statLong =
    document.getElementById(
        "sLong"
    );


const hudPlayer =
    document.getElementById(
        "hudPlayer"
    );


const hudKeeper =
    document.getElementById(
        "hudKeeper"
    );


const hudBest =
    document.getElementById(
        "hudBest"
    );


const hudMode =
    document.getElementById(
        "hudMode"
    );


const messageElement =
    document.getElementById(
        "message"
    );


const distanceElement =
    document.getElementById(
        "distance"
    );


const abilityElement =
    document.getElementById(
        "ability"
    );


const windElement =
    document.getElementById(
        "wind"
    );


const challengeElement =
    document.getElementById(
        "challenge"
    );


const precisionCard =
    document.getElementById(
        "precisionCard"
    );


const precisionElement =
    document.getElementById(
        "precision"
    );


const powerBox =
    document.getElementById(
        "powerBox"
    );


const powerFill =
    document.getElementById(
        "powerFill"
    );


const shotButtons =
    document.getElementById(
        "shotButtons"
    );


const saveButtons =
    document.getElementById(
        "saveButtons"
    );


const exactButton =
    document.getElementById(
        "exactButton"
    );


const broadcastScene =
    document.getElementById(
        "broadcastScene"
    );


const keeperScene =
    document.getElementById(
        "keeperScene"
    );


const pauseOverlay =
    document.getElementById(
        "pauseOverlay"
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


const statusElement =
    document.getElementById(
        "status"
    );


/* ============================================================
   PLAYER DATABASE
============================================================ */

const PLAYER_DATA = {


    "Hassan Ali": {

        shoot:
            300,

        power:
            300,

        accuracy:
            300,

        curve:
            300,

        speed:
            300,

        stamina:
            300,

        long:
            300,

        penalty:
            300,

        freeKick:
            300,

        role:
            "300 ALL-STATS MASTER",

        initials:
            "HA",

        color:
            "#35e978"

    },


    "Muhammad Arham": {

        shoot:
            94,

        power:
            92,

        accuracy:
            94,

        curve:
            91,

        speed:
            92,

        stamina:
            96,

        long:
            95,

        penalty:
            92,

        freeKick:
            90,

        role:
            "ELITE ATTACKER",

        initials:
            "MA",

        color:
            "#70bbff"

    },


    "Ehan Ali": {

        shoot:
            90,

        power:
            88,

        accuracy:
            90,

        curve:
            91,

        speed:
            91,

        stamina:
            89,

        long:
            87,

        penalty:
            88,

        freeKick:
            86,

        role:
            "ATTACKER",

        initials:
            "EA",

        color:
            "#64d1ff"

    },


    "Umar Shoaib": {

        shoot:
            92,

        power:
            94,

        accuracy:
            91,

        curve:
            95,

        speed:
            89,

        stamina:
            94,

        long:
            93,

        penalty:
            91,

        freeKick:
            94,

        role:
            "PLAYMAKER",

        initials:
            "US",

        color:
            "#9c82ff"

    },


    "Cristiano Ronaldo": {

        shoot:
            96,

        power:
            96,

        accuracy:
            93,

        curve:
            88,

        speed:
            89,

        stamina:
            91,

        long:
            97,

        penalty:
            96,

        freeKick:
            91,

        role:
            "GOAL SCORER",

        initials:
            "CR",

        color:
            "#ffffff"

    },


    "Lionel Messi": {

        shoot:
            97,

        power:
            86,

        accuracy:
            99,

        curve:
            99,

        speed:
            90,

        stamina:
            86,

        long:
            95,

        penalty:
            92,

        freeKick:
            99,

        role:
            "PLAYMAKER",

        initials:
            "LM",

        color:
            "#79b8ff"

    },


    "Kylian Mbappe": {

        shoot:
            94,

        power:
            92,

        accuracy:
            91,

        curve:
            86,

        speed:
            99,

        stamina:
            94,

        long:
            92,

        penalty:
            89,

        freeKick:
            83,

        role:
            "SPEEDSTER",

        initials:
            "KM",

        color:
            "#aa82ff"

    },


    /* ========================================================
       LONG SHOT SPECIALIST
    ========================================================= */

    "Erling Haaland": {

        shoot:
            99,

        power:
            100,

        accuracy:
            93,

        curve:
            78,

        speed:
            90,

        stamina:
            92,

        long:
            100,

        penalty:
            92,

        freeKick:
            72,

        role:
            "LONG SHOT SPECIALIST",

        initials:
            "EH",

        color:
            "#acd9ff"

    },


    /* ========================================================
       FREE KICK SPECIALIST
    ========================================================= */

    "Lamine Yamal": {

        shoot:
            91,

        power:
            85,

        accuracy:
            97,

        curve:
            100,

        speed:
            95,

        stamina:
            90,

        long:
            92,

        penalty:
            86,

        freeKick:
            100,

        role:
            "FREE KICK SPECIALIST",

        initials:
            "LY",

        color:
            "#ffe16b"

    },


    /* ========================================================
       PENALTY SPECIALIST
    ========================================================= */

    "Jude Bellingham": {

        shoot:
            95,

        power:
            93,

        accuracy:
            96,

        curve:
            89,

        speed:
            90,

        stamina:
            98,

        long:
            96,

        penalty:
            100,

        freeKick:
            86,

        role:
            "PENALTY SPECIALIST",

        initials:
            "JB",

        color:
            "#e2b3ff"

    },


    "Vinicius Jr": {

        shoot:
            91,

        power:
            88,

        accuracy:
            89,

        curve:
            86,

        speed:
            100,

        stamina:
            94,

        long:
            87,

        penalty:
            81,

        freeKick:
            80,

        role:
            "WINGER",

        initials:
            "VJ",

        color:
            "#ff8297"

    },


    "Neymar": {

        shoot:
            92,

        power:
            84,

        accuracy:
            95,

        curve:
            99,

        speed:
            90,

        stamina:
            83,

        long:
            91,

        penalty:
            89,

        freeKick:
            98,

        role:
            "SKILL MASTER",

        initials:
            "NJ",

        color:
            "#7de6ff"

    },


    "Mohamed Salah": {

        shoot:
            94,

        power:
            90,

        accuracy:
            93,

        curve:
            90,

        speed:
            95,

        stamina:
            92,

        long:
            93,

        penalty:
            88,

        freeKick:
            82,

        role:
            "WINGER",

        initials:
            "MS",

        color:
            "#ffd36a"

    },


    "Kevin De Bruyne": {

        shoot:
            92,

        power:
            91,

        accuracy:
            97,

        curve:
            98,

        speed:
            83,

        stamina:
            90,

        long:
            93,

        penalty:
            84,

        freeKick:
            97,

        role:
            "PRECISION PLAYMAKER",

        initials:
            "KD",

        color:
            "#91dcff"

    },


    "Robert Lewandowski": {

        shoot:
            98,

        power:
            96,

        accuracy:
            95,

        curve:
            87,

        speed:
            80,

        stamina:
            89,

        long:
            94,

        penalty:
            97,

        freeKick:
            79,

        role:
            "CLINICAL STRIKER",

        initials:
            "RL",

        color:
            "#d9e4ff"

    },


    "Harry Kane": {

        shoot:
            97,

        power:
            95,

        accuracy:
            95,

        curve:
            92,

        speed:
            82,

        stamina:
            90,

        long:
            98,

        penalty:
            98,

        freeKick:
            88,

        role:
            "LONG RANGE STRIKER",

        initials:
            "HK",

        color:
            "#dbf3ff"

    },


    "Son Heung-min": {

        shoot:
            95,

        power:
            91,

        accuracy:
            92,

        curve:
            95,

        speed:
            96,

        stamina:
            93,

        long:
            96,

        penalty:
            89,

        freeKick:
            85,

        role:
            "FORWARD",

        initials:
            "SH",

        color:
            "#e7ff78"

    },


    "Rodri": {

        shoot:
            88,

        power:
            92,

        accuracy:
            91,

        curve:
            84,

        speed:
            71,

        stamina:
            96,

        long:
            95,

        penalty:
            76,

        freeKick:
            80,

        role:
            "MIDFIELDER",

        initials:
            "R",

        color:
            "#b9baff"

    },


    "Antoine Griezmann": {

        shoot:
            94,

        power:
            88,

        accuracy:
            95,

        curve:
            96,

        speed:
            87,

        stamina:
            91,

        long:
            92,

        penalty:
            91,

        freeKick:
            94,

        role:
            "FORWARD",

        initials:
            "AG",

        color:
            "#9defff"

    },


    "Ousmane Dembele": {

        shoot:
            89,

        power:
            85,

        accuracy:
            89,

        curve:
            91,

        speed:
            98,

        stamina:
            88,

        long:
            87,

        penalty:
            78,

        freeKick:
            86,

        role:
            "WINGER",

        initials:
            "OD",

        color:
            "#d995ff"

    },


    "Jamal Musiala": {

        shoot:
            90,

        power:
            85,

        accuracy:
            93,

        curve:
            95,

        speed:
            94,

        stamina:
            89,

        long:
            87,

        penalty:
            80,

        freeKick:
            84,

        role:
            "PLAYMAKER",

        initials:
            "JM",

        color:
            "#b7ffd0"

    },


    "Phil Foden": {

        shoot:
            91,

        power:
            87,

        accuracy:
            95,

        curve:
            96,

        speed:
            91,

        stamina:
            89,

        long:
            90,

        penalty:
            82,

        freeKick:
            92,

        role:
            "PLAYMAKER",

        initials:
            "PF",

        color:
            "#f1c8ff"

    },


    "Raphinha": {

        shoot:
            91,

        power:
            91,

        accuracy:
            91,

        curve:
            95,

        speed:
            94,

        stamina:
            91,

        long:
            94,

        penalty:
            81,

        freeKick:
            91,

        role:
            "WINGER",

        initials:
            "RA",

        color:
            "#90e9ff"

    }

};


/* ============================================================
   GOALKEEPERS
============================================================ */

const GK_DATA = {


    "Hassan Ali": {

        diving:
            300,

        reflexes:
            300,

        positioning:
            300,

        handling:
            300,

        speed:
            300,

        kicking:
            300,

        reactions:
            300,

        reach:
            300,

        role:
            "ULTIMATE GK"

    },


    "Muhammad Arham": {

        diving:
            92,

        reflexes:
            93,

        positioning:
            91,

        handling:
            91,

        speed:
            90,

        kicking:
            89,

        reactions:
            93,

        reach:
            90,

        role:
            "GOALKEEPER"

    },


    "Ehan Ali": {

        diving:
            90,

        reflexes:
            91,

        positioning:
            89,

        handling:
            90,

        speed:
            90,

        kicking:
            88,

        reactions:
            91,

        reach:
            88,

        role:
            "GOALKEEPER"

    },


    "Thibaut Courtois": {

        diving:
            98,

        reflexes:
            97,

        positioning:
            98,

        handling:
            95,

        speed:
            83,

        kicking:
            88,

        reactions:
            97,

        reach:
            100,

        role:
            "GIANT GK"

    },


    "Alisson": {

        diving:
            95,

        reflexes:
            95,

        positioning:
            96,

        handling:
            96,

        speed:
            91,

        kicking:
            97,

        reactions:
            95,

        reach:
            94,

        role:
            "COMPLETE GK"

    },


    "Manuel Neuer": {

        diving:
            93,

        reflexes:
            95,

        positioning:
            94,

        handling:
            92,

        speed:
            95,

        kicking:
            96,

        reactions:
            94,

        reach:
            93,

        role:
            "SWEEPER GK"

    },


    "Gianluigi Donnarumma": {

        diving:
            97,

        reflexes:
            97,

        positioning:
            94,

        handling:
            95,

        speed:
            86,

        kicking:
            87,

        reactions:
            97,

        reach:
            100,

        role:
            "TALL GK"

    },


    "Ederson": {

        diving:
            91,

        reflexes:
            93,

        positioning:
            95,

        handling:
            91,

        speed:
            93,

        kicking:
            100,

        reactions:
            92,

        reach:
            91,

        role:
            "DISTRIBUTOR GK"

    },


    "Jan Oblak": {

        diving:
            96,

        reflexes:
            97,

        positioning:
            98,

        handling:
            96,

        speed:
            80,

        kicking:
            86,

        reactions:
            97,

        reach:
            94,

        role:
            "SHOT STOPPER"

    },


    "Marc-Andre ter Stegen": {

        diving:
            93,

        reflexes:
            95,

        positioning:
            95,

        handling:
            93,

        speed:
            89,

        kicking:
            97,

        reactions:
            95,

        reach:
            92,

        role:
            "MODERN GK"

    },


    "Emiliano Martinez": {

        diving:
            94,

        reflexes:
            95,

        positioning:
            92,

        handling:
            92,

        speed:
            87,

        kicking:
            90,

        reactions:
            96,

        reach:
            93,

        role:
            "PENALTY GK"

    }

};


/* ============================================================
   DIFFICULTIES
============================================================ */

const DIFFICULTIES = {

    easy: {

        reaction:
            420,

        read:
            .22,

        save:
            42,

        shot:
            1.10,

        wind:
            .10

    },


    normal: {

        reaction:
            300,

        read:
            .43,

        save:
            54,

        shot:
            1.00,

        wind:
            .25

    },


    hard: {

        reaction:
            210,

        read:
            .65,

        save:
            65,

        shot:
            .88,

        wind:
            .40

    },


    legend: {

        reaction:
            145,

        read:
            .80,

        save:
            75,

        shot:
            .76,

        wind:
            .58

    }

};


/* ============================================================
   GAME STATE
============================================================ */

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

    best:
        0,

    crossbarHits:
        0,

    busy:
        false,

    paused:
        false,

    result:
        false,

    sound:
        true,

    wind:
        0,

    exactTarget:
        null,

    keeperZone:
        "center",

    keeperActive:
        false,

    timer:
        null,

    shotStart:
        0,

    shotDuration:
        0,

    keeperMoveStart:
        0,

    keeperMoveDuration:
        400,

    roundId:
        0,

    lastTime:
        performance.now()

};


/* ============================================================
   BALL
============================================================ */

const ball = {

    x:
        600,

    y:
        565,

    startX:
        600,

    startY:
        565,

    targetX:
        600,

    targetY:
        172,

    curve:
        0,

    arc:
        50,

    progress:
        0,

    radius:
        13

};


/* ============================================================
   KEEPER
============================================================ */

const keeper = {

    homeX:
        600,

    homeY:
        265,

    x:
        600,

    y:
        265,

    targetX:
        600,

    targetY:
        265,

    rotation:
        0

};


/* ============================================================
   PARTICLE STATE
============================================================ */

let particles = [];


/* ============================================================
   HELPERS
============================================================ */

function clamp(
    value,
    minimum,
    maximum
){

    return Math.max(
        minimum,
        Math.min(
            maximum,
            value
        )
    );

}


function lerp(
    start,
    end,
    amount
){

    return start+
        (
            end-start
        )*
        amount;

}


function smooth(
    amount
){

    return amount*
        amount*
        (
            3-
            2*
            amount
        );

}


function random(
    minimum,
    maximum
){

    return minimum+
        Math.random()*
        (
            maximum-
            minimum
        );

}


function player(){

    return (
        PLAYER_DATA[
            playerSelect.value
        ] ||
        PLAYER_DATA[
            "Hassan Ali"
        ]
    );

}


function goalkeeper(){

    return (
        GK_DATA[
            keeperSelect.value
        ] ||
        GK_DATA[
            "Hassan Ali"
        ]
    );

}


function difficulty(){

    return (
        DIFFICULTIES[
            difficultySelect.value
        ] ||
        DIFFICULTIES.normal
    );

}


function cancelTimer(){

    if(
        state.timer !== null
    ){

        clearTimeout(
            state.timer
        );

        state.timer =
            null;

    }

}


/* ============================================================
   SVG HELPERS
============================================================ */

function setCircle(
    element,
    x,
    y,
    radius
){

    if(!element)return;

    element.setAttribute(
        "cx",
        String(x)
    );

    element.setAttribute(
        "cy",
        String(y)
    );

    if(
        typeof radius ===
        "number"
    ){

        element.setAttribute(
            "r",
            String(radius)
        );

    }

}


function moveKeeper(
    x,
    y,
    rotation
){

    fieldKeeper.setAttribute(
        "transform",
        "translate("+
        (
            x-
            600
        )+
        ","+
        (
            y-
            265
        )+
        ") rotate("+
        rotation+
        ")"
    );

}


/* ============================================================
   SCENE SWITCH
============================================================ */

function updateScene(){

    const keeperMode =
        state.mode===
        "keeper";


    broadcastScene
        .classList
        .toggle(
            "hidden",
            keeperMode
        );


    keeperScene
        .classList
        .toggle(
            "hidden",
            !keeperMode
        );

}


/* ============================================================
   FIELD CAMERA
============================================================ */

function updateCamera(){

    let scale =
        1;


    if(
        cameraSelect.value===
        "close"
    ){

        scale=
            1.10;

    }


    if(
        cameraSelect.value===
        "wide"
    ){

        scale=
            .94;

    }


    pitchSvg.style.transform =
        "scale("+
        scale+
        ")";

}


/* ============================================================
   HUD
============================================================ */

function updateHUD(){

    const p =
        player();


    scoreElement.textContent =
        state.score;


    levelElement.textContent =
        state.level;


    goalsElement.textContent =
        state.goals;


    savesElement.textContent =
        state.saves;


    comboElement.textContent =
        state.combo;


    bestElement.textContent =
        state.best;


    hudBest.textContent =
        state.best;


    playerNameElement.textContent =
        playerSelect.value;


    playerRoleElement.textContent =
        p.role;


    avatarElement.textContent =
        p.initials;


    avatarElement.style.background =
        "linear-gradient("+
        "135deg,"+
        p.color+
        ",#087f37)";


    hudPlayer.textContent =
        playerSelect.value;


    hudKeeper.textContent =
        "vs "+
        keeperSelect.value;


    statShoot.textContent =
        p.shoot;


    statPower.textContent =
        p.power;


    statAccuracy.textContent =
        p.accuracy;


    statCurve.textContent =
        p.curve;


    statSpeed.textContent =
        p.speed;


    statStamina.textContent =
        p.stamina;


    statLong.textContent =
        p.long;


    hudMode.textContent =

        state.mode===
        "penalty"

            ? "PENALTY SHOOTOUT"

            :
            state.mode===
            "freekick"

                ? "FREE KICK"

                :
                state.mode===
                "longshot"

                    ? "LONG SHOT"

                    :
                    state.mode===
                    "keeper"

                        ? "GOALKEEPER POV"

                        :
                        "CROSSBAR CHALLENGE";


    windElement.textContent =

        state.wind>=0

            ? "+"+
                state.wind.toFixed(1)

            :
                state.wind.toFixed(1);


    const remaining =
        state.goals%3===0
            ? 3
            :
                3-
                state.goals%3;


    challengeElement.textContent =

        state.mode===
        "crossbar"

            ? "Crossbar hits: "+
                state.crossbarHits

            :
                remaining+
                " more goal"+
                (
                    remaining===1
                        ? ""
                        : "s"
                )+
                " to level up";


    updateAbility();

}


/* ============================================================
   ABILITY
============================================================ */

function updateAbility(){

    const p =
        player();


    if(
        state.mode===
        "keeper"
    ){

        abilityElement.textContent =

            keeperSelect.value===
            "Hassan Ali"

                ? "👑 HASSAN ALI — 300 IN EVERY GK STAT"

                :
                    keeperSelect.value+
                    " — "+
                    goalkeeper().role;

        return;
    }


    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        abilityElement.textContent =
            "👑 HASSAN ALI — 300 IN EVERY STAT";

        return;
    }


    if(
        state.mode===
            "longshot" &&
        playerSelect.value===
            "Erling Haaland"
    ){

        abilityElement.textContent =
            "🚀 HAALAND — LONG SHOT SPECIALIST";

        return;
    }


    if(
        state.mode===
            "freekick" &&
        playerSelect.value===
            "Lamine Yamal"
    ){

        abilityElement.textContent =
            "🎯 LAMINE YAMAL — FREE KICK SPECIALIST";

        return;
    }


    if(
        state.mode===
            "penalty" &&
        playerSelect.value===
            "Jude Bellingham"
    ){

        abilityElement.textContent =
            "⚽ JUDE BELLINGHAM — PENALTY SPECIALIST";

        return;
    }


    abilityElement.textContent =
        p.role;

}


/* ============================================================
   MESSAGE
============================================================ */

function setMessage(
    main,
    sub
){

    messageElement.textContent =
        main;


    statusElement.textContent =
        sub||
        main;

}


/* ============================================================
   TARGET POSITIONS
============================================================ */

function targetForZone(
    zone
){

    if(
        zone===
        "left"
    ){

        return {

            x:
                435,

            y:
                random(
                    145,
                    205
                )

        };

    }


    if(
        zone===
        "right"
    ){

        return {

            x:
                765,

            y:
                random(
                    145,
                    205
                )

        };

    }


    return {

        x:
            600,

        y:
            random(
                145,
                205
            )

    };

}


/* ============================================================
   ZONE FROM TARGET
============================================================ */

function zoneFromX(
    x
){

    if(
        x<
        480
    ){

        return "left";

    }


    if(
        x>
        720
    ){

        return "right";

    }


    return "center";

}


/* ============================================================
   START DIRECTION SHOT
============================================================ */

function startDirectionShot(
    zone
){

    if(
        state.busy ||
        state.paused ||
        state.result ||
        state.mode===
            "keeper" ||
        state.mode===
            "longshot" ||
        state.mode===
            "crossbar"
    ){

        return;

    }


    let target =
        targetForZone(
            zone
        );


    /*
      Bellingham gets
      special penalty targeting.
    */

    if(
        state.mode===
            "penalty" &&
        playerSelect.value===
            "Jude Bellingham"
    ){

        target.y=
            random(
                142,
                175
            );

    }


    startShot(
        target
    );


    if(
        state.mode===
        "freekick"
    ){

        setMessage(

            playerSelect.value===
            "Lamine Yamal"

                ? "YAMAL FREE KICK! 🎯"

                : "FREE KICK! 🎯",

            "Bend the ball around the wall."
        );

    }


    else{

        setMessage(

            playerSelect.value===
            "Jude Bellingham"

                ? "BELLINGHAM PENALTY! ⚽"

                : "SHOT! ⚡",

            "The goalkeeper is moving."
        );

    }

}


/* ============================================================
   START SHOT ENGINE
============================================================ */

function startShot(
    target
){

    if(
        state.busy
    ){

        return;

    }


    const p =
        player();


    const d =
        difficulty();


    const k =
        goalkeeper();


    state.busy=
        true;


    state.shotStart =
        performance.now();


    ball.startX=
        600;


    ball.startY=
        565;


    ball.x=
        600;


    ball.y=
        565;


    ball.targetX=
        target.x;


    ball.targetY=
        target.y;


    ball.progress=
        0;


    /*
      Curve.
    */

    let curveStrength =

        state.mode===
        "freekick"

            ? 1.55

            : .42;


    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        curveStrength*=
            1.28;

    }


    if(
        state.mode===
        "freekick"&&
        playerSelect.value===
        "Lamine Yamal"
    ){

        curveStrength*=
            1.30;

    }


    let curve =
        p.curve*
        curveStrength;


    if(
        target.x<
        600
    ){

        curve*=
            -0.55;

    }else{

        curve*=
            0.55;

    }


    ball.curve=
        curve;


    /*
      Arc.
    */

    ball.arc =

        state.mode===
        "freekick"

            ? 65

            :
            state.mode===
            "longshot"

                ? 105

                : 25;


    /*
      Power.
    */

    const powerFactor =
        clamp(
            p.power/
            100,
            .5,
            3
        );


    state.shotDuration =

        state.mode===
        "longshot"

            ? 1200/
                (
                    d.shot*
                    powerFactor
                )

            :
            state.mode===
            "freekick"

                ? 930/
                    (
                        d.shot*
                        powerFactor
                    )

                :
                    800/
                    (
                        d.shot*
                        powerFactor
                    );


    /*
      Keeper prediction.
    */

    const shotZone =
        zoneFromX(
            target.x
        );


    let keeperRead =
        d.read+
        state.level*
        .015-
        p.accuracy/
        1000;


    /*
      300 accuracy makes
      Hassan's shots harder
      to predict.
    */

    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        keeperRead-=
            .38;

    }


    keeperRead=
        clamp(
            keeperRead,
            .02,
            .93
        );


    let predictedZone;


    if(
        Math.random()<
        keeperRead
    ){

        predictedZone=
            shotZone;

    }

    else{

        const zones=[
            "left",
            "center",
            "right"
        ];


        predictedZone=
            zones[
                Math.floor(
                    Math.random()*
                    zones.length
                )
            ];

    }


    const predicted =
        targetForZone(
            predictedZone
        );


    keeper.targetX =
        predicted.x;


    keeper.targetY =
        265;


    keeper.rotation =

        predictedZone===
        "left"

            ? -18

            :
            predictedZone===
            "right"

                ? 18

                : 0;


    state.keeperMoveStart =
        state.shotStart+
        d.reaction;


    state.keeperMoveDuration =
        clamp(
            460-
            (
                k.reactions-
                80
            )*
            1.6-
            state.level*
            7,

            150,

            460
        );


    powerBox
        .classList
        .remove(
            "hidden"
        );


    if(
        state.mode===
            "longshot" ||
        state.mode===
            "crossbar"
    ){

        precisionCard
            .classList
            .remove(
                "hidden"
            );


        precisionElement.textContent =
            Math.round(
                clamp(
                    p.accuracy-
                    state.wind*
                    8,

                    1,

                    100
                )
            )+
            "%";

    }


    updateWall();


    positionBall(
        ball.x,
        ball.y
    );

}


/* ============================================================
   EXACT TARGET
============================================================ */

function chooseExactTarget(
    event
){

    if(
        state.busy ||
        state.paused ||
        state.result
    ){

        return;

    }


    const rect =
        pitchSvg.getBoundingClientRect();


    const x =
        (
            event.clientX-
            rect.left
        )/
        rect.width*
        1200;


    const y =
        (
            event.clientY-
            rect.top
        )/
        rect.height*
        650;


    const goal =
        goalBox();


    const inside =

        x>=goal.x&&

        x<=
            goal.x+
            goal.w&&

        y>=goal.y&&

        y<=
            goal.y+
            goal.h;


    if(
        !inside
    ){

        setMessage(
            "AIM INSIDE THE GOAL!",
            "Tap the net."
        );

        return;

    }


    state.exactTarget={

        x:
            clamp(
                x,
                goal.x+
                    10,

                goal.x+
                    goal.w-
                    10
            ),

        y:
            clamp(
                y,
                goal.y+
                    10,

                goal.y+
                    goal.h-
                    10
            )

    };


    updateAimTarget();


    setMessage(
        "TARGET LOCKED 🎯",
        "Press SHOOT."
    );


    beep(
        650,
        .06,
        "triangle"
    );

}


/* ============================================================
   GOAL BOX
============================================================ */

function goalBox(){

    return {

        x:
            360,

        y:
            112,

        w:
            480,

        h:
            180

    };

}


/* ============================================================
   DRAW / MOVE AIM TARGET
============================================================ */

function updateAimTarget(){

    if(
        !state.exactTarget
    ){

        aimTarget
            .setAttribute(
                "display",
                "none"
            );

        return;

    }


    const x =
        state.exactTarget.x;


    const y =
        state.exactTarget.y;


    aimTarget
        .setAttribute(
            "display",
            "inline"
        );


    const circle =
        aimTarget.querySelector(
            "circle"
        );


    const lines =
        aimTarget.querySelectorAll(
            "line"
        );


    setCircle(
        circle,
        x,
        y
    );


    lines[0].setAttribute(
        "x1",
        String(
            x-
            27
        )
    );


    lines[0].setAttribute(
        "x2",
        String(
            x+
            27
        )
    );


    lines[0].setAttribute(
        "y1",
        String(
            y
        )
    );


    lines[0].setAttribute(
        "y2",
        String(
            y
        )
    );


    lines[1].setAttribute(
        "x1",
        String(
            x
        )
    );


    lines[1].setAttribute(
        "x2",
        String(
            x
        )
    );


    lines[1].setAttribute(
        "y1",
        String(
            y-
            27
        )
    );


    lines[1].setAttribute(
        "y2",
        String(
            y+
            27
        )
    );

}


/* ============================================================
   EXACT SHOOT
============================================================ */

function exactShoot(){

    if(
        !state.exactTarget
    ){

        setMessage(
            "CHOOSE A TARGET FIRST!",
            "Tap the goal."
        );

        return;

    }


    startShot(
        state.exactTarget
    );


    setMessage(

        state.mode===
        "crossbar"

            ? "CROSSBAR SHOT! 🎯"

            : "LONG SHOT! 🚀",

        "Power from distance."
    );

}


/* ============================================================
   WALL
============================================================ */

function updateWall(){

    wallGroup.innerHTML =
        "";


    if(
        state.mode!==
        "freekick"
    ){

        wallGroup.setAttribute(
            "display",
            "none"
        );

        return;

    }


    const count =
        clamp(
            4+
            Math.floor(
                state.level/
                2
            ),

            4,

            9
        );


    const spacing =
        clamp(
            58-
            state.level*
            1.5,

            40,

            58
        );


    const start =
        600-
        (
            count-
            1
        )*
        spacing/
        2;


    for(
        let i=0;
        i<count;
        i++
    ){

        const x =
            start+
            i*
            spacing;


        const person =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );


        person.setAttribute(
            "transform",
            "translate("+
            x+
            ",300)"
        );


        const body =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );


        body.setAttribute(
            "x",
            "-11"
        );


        body.setAttribute(
            "y",
            "-15"
        );


        body.setAttribute(
            "width",
            "22"
        );


        body.setAttribute(
            "height",
            "28"
        );


        body.setAttribute(
            "rx",
            "3"
        );


        body.setAttribute(
            "fill",
            "#314e9c"
        );


        const head =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );


        head.setAttribute(
            "cy",
            "-25"
        );


        head.setAttribute(
            "r",
            "8"
        );


        head.setAttribute(
            "fill",
            "#ca8b67"
        );


        const legs =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );


        legs.setAttribute(
            "d",
            "M-6 13 L-9 34 M6 13 L9 34"
        );


        legs.setAttribute(
            "stroke",
            "#172019"
        );


        legs.setAttribute(
            "stroke-width",
            "7"
        );


        legs.setAttribute(
            "stroke-linecap",
            "round"
        );


        person.appendChild(
            body
        );


        person.appendChild(
            head
        );


        person.appendChild(
            legs
        );


        wallGroup.appendChild(
            person
        );

    }


    wallGroup.setAttribute(
        "display",
        "inline"
    );

}


/* ============================================================
   BALL POSITION
============================================================ */

function positionBall(
    x,
    y
){

    setCircle(
        ballElement,
        x,
        y,
        ball.radius
    );

}


/* ============================================================
   KEEPER HOME
============================================================ */

function resetKeeper(){

    keeper.homeX=
        600;

    keeper.homeY=
        265;

    keeper.x=
        600;

    keeper.y=
        265;

    keeper.targetX=
        600;

    keeper.targetY=
        265;

    keeper.rotation=
        0;


    fieldKeeper.removeAttribute(
        "transform"
    );

}


/* ============================================================
   RESET ROUND
============================================================ */

function resetRound(){

    cancelTimer();


    state.roundId++;


    state.busy=
        false;


    state.result=
        false;


    state.keeperActive=
        false;


    state.exactTarget=
        null;


    aimTarget
        .setAttribute(
            "display",
            "none"
        );


    resultOverlay
        .classList
        .add(
            "hidden"
        );


    powerBox
        .classList
        .add(
            "hidden"
        );


    precisionCard
        .classList
        .add(
            "hidden"
        );


    const d =
        difficulty();


    state.wind =
        random(
            -d.wind,
            d.wind
        );


    resetKeeper();


    positionBall(
        600,
        state.mode===
        "keeper"
            ? 100
            : 565
    );


    if(
        state.mode===
        "keeper"
    ){

        startKeeperChallenge();

    }


    updateWall();

    updateScene();

    updateCamera();

    updateHUD();


    if(
        state.mode===
        "penalty"
    ){

        distanceElement.textContent =
            "Distance: 11 m";


        setMessage(
            "CHOOSE YOUR SHOT",
            playerSelect.value===
            "Jude Bellingham"
                ? "⚽ Penalty specialist active."
                : "LEFT • CENTER • RIGHT"
        );

    }


    if(
        state.mode===
        "freekick"
    ){

        distanceElement.textContent =
            "Distance: "+
            (
                20+
                state.level*
                2
            )+
            " m";


        setMessage(
            "BEND IT AROUND THE WALL",
            playerSelect.value===
            "Lamine Yamal"
                ? "🎯 Free-kick specialist active."
                : "Curve around the wall."
        );

    }


    if(
        state.mode===
        "longshot"
    ){

        distanceElement.textContent =
            "Distance: "+
            (
                28+
                state.level*
                2
            )+
            " m";


        setMessage(
            "CHOOSE YOUR TARGET",
            playerSelect.value===
            "Erling Haaland"
                ? "🚀 Long-shot specialist active."
                : "Tap inside the goal."
        );

    }


    if(
        state.mode===
        "crossbar"
    ){

        distanceElement.textContent =
            "Distance: "+
            (
                24+
                state.level*
                2
            )+
            " m";


        setMessage(
            "HIT THE CROSSBAR",
            "Tap the bar area."
        );

    }


    if(
        state.mode===
        "keeper"
    ){

        setMessage(
            "GET READY! 🧤",
            "Watch the incoming shot."
        );

    }

}


/* ============================================================
   KEEPER CHALLENGE
============================================================ */

function startKeeperChallenge(){

    cancelTimer();


    state.keeperActive=
        false;


    const zones=[
        "left",
        "center",
        "right"
    ];


    state.keeperZone =
        zones[
            Math.floor(
                Math.random()*
                zones.length
            )
        ];


    const target =
        targetForZone(
            state.keeperZone
        );


    ball.startX =
        target.x+
        random(
            -130,
            130
        );


    ball.startY=
        85;


    ball.targetX=
        target.x;


    ball.targetY=
        335;


    ball.x=
        ball.startX;


    ball.y=
        ball.startY;


    ball.curve =
        random(
            -28,
            28
        );


    ball.progress=
        0;


    ball.radius=
        9;


    setCircle(
        keeperBallElement,
        ball.x,
        ball.y,
        ball.radius
    );


    const round =
        state.roundId;


    state.timer =
        setTimeout(
            () => {

                if(
                    round!==
                    state.roundId
                ){

                    return;

                }


                if(
                    state.mode!==
                    "keeper"
                ){

                    return;

                }


                if(
                    state.paused||
                    state.result
                ){

                    return;

                }


                state.keeperActive=
                    true;


                state.shotStart =
                    performance.now();


                setMessage(
                    "SAVE IT! 🧤",
                    "DIVE NOW!"
                );

            },

            560
        );

}


/* ============================================================
   KEEPER INPUT
============================================================ */

function keeperSave(
    zone
){

    if(
        state.mode!==
            "keeper" ||
        !state.keeperActive ||
        state.paused ||
        state.result
    ){

        return;

    }


    state.keeperActive=
        false;


    const k =
        goalkeeper();


    const targetZone =
        zoneFromX(
            ball.x
        );


    const correct =
        zone===
        targetZone;


    let chance =

        correct
            ? .62
            : .08;


    chance +=
        k.reflexes/
        500;


    /*
      Hassan gets the custom
      300-stat behavior.
    */

    if(
        keeperSelect.value===
        "Hassan Ali"
    ){

        chance =
            correct
                ? .999
                : .16;
    }


    chance =
        clamp(
            chance,
            0,
            .999
        );


    const saved =
        Math.random()<
        chance;


    if(
        saved
    ){

        state.saves++;


        state.score+=2;


        state.combo++;


        state.best =
            Math.max(
                state.best,
                state.combo
            );


        createParticles(
            600,
            325,
            true,
            55
        );


        saveSound();


        showResult(
            "INCREDIBLE SAVE!",
            "+2",
            keeperSelect.value===
            "Hassan Ali"

                ? "Hassan Ali — 300 GK stats!"

                : "Perfect reaction!"
        );


    }

    else{

        state.combo=
            0;


        showResult(
            "GOAL!",
            "0",
            "The ball got through."
        );

    }


    updateHUD();

}


/* ============================================================
   UPDATE KEEPER
============================================================ */

function updateKeeper(
    time
){

    if(
        !state.keeperActive
    ){

        return;

    }


    const duration =
        Math.max(
            900,

            1500-
            state.level*
            18
        );


    const progress =
        clamp(
            (
                time-
                state.shotStart
            )/
            duration,

            0,

            1
        );


    ball.progress=
        progress;


    const amount =
        smooth(
            progress
        );


    ball.x =
        lerp(
            ball.startX,
            ball.targetX,
            amount
        )+
        Math.sin(
            progress*
            Math.PI
        )*
        ball.curve;


    ball.y =
        lerp(
            ball.startY,
            ball.targetY,
            amount
        );


    ball.radius =
        9+
        20*
        progress;


    setCircle(
        keeperBallElement,
        ball.x,
        ball.y,
        ball.radius
    );


    if(
        progress>=1
    ){

        state.keeperActive=
            false;


        state.combo=
            0;


        showResult(
            "TOO LATE",
            "0",
            "The shot reached the goal."
        );

    }

}


/* ============================================================
   UPDATE SHOT
============================================================ */

function updateShot(
    time
){

    if(
        !state.busy
    ){

        return;

    }


    const progress =
        clamp(
            (
                time-
                state.shotStart
            )/
            state.shotDuration,

            0,

            1
        );


    ball.progress=
        progress;


    const amount =
        smooth(
            progress
        );


    ball.x =
        lerp(
            ball.startX,
            ball.targetX,
            amount
        );


    ball.y =
        lerp(
            ball.startY,
            ball.targetY,
            amount
        )-
        Math.sin(
            progress*
            Math.PI
        )*
        ball.arc;


    /*
      Curve.
    */

    ball.x+=
        Math.sin(
            progress*
            Math.PI
        )*
        ball.curve;


    /*
      Wind.
    */

    ball.x+=
        Math.sin(
            progress*
            Math.PI
        )*
        state.wind*
        28;


    ball.radius =
        13-
        5*
        progress;


    positionBall(
        ball.x,
        ball.y
    );


    /*
      Keeper movement.
    */

    if(
        time>=
        state.keeperMoveStart
    ){

        const keeperProgress =
            clamp(
                (
                    time-
                    state.keeperMoveStart
                )/
                state.keeperMoveDuration,

                0,

                1
            );


        const keeperAmount =
            smooth(
                keeperProgress
            );


        keeper.x =
            lerp(
                keeper.homeX,
                keeper.targetX,
                keeperAmount
            );


        keeper.y =
            lerp(
                keeper.homeY,
                keeper.targetY,
                keeperAmount*
                .55
            );


        moveKeeper(
            keeper.x,
            keeper.y,
            keeper.rotation
        );

    }


    powerFill.style.width =
        (
            progress*
            100
        )+
        "%";


    if(
        progress>=1
    ){

        state.busy=
            false;


        powerBox
            .classList
            .add(
                "hidden"
            );


        resolveShot();

    }

}


/* ============================================================
   SHOT RESOLUTION
============================================================ */

function resolveShot(){

    const p =
        player();


    const k =
        goalkeeper();


    const d =
        difficulty();


    /*
      Crossbar.
    */

    if(
        state.mode===
        "crossbar"
    ){

        const goal =
            goalBox();


        const hit =
            Math.abs(
                ball.targetY-
                goal.y
            )<
            25;


        const inside =
            ball.targetX>
            goal.x+
            25&&

            ball.targetX<
            goal.x+
            goal.w-
            25;


        if(
            hit&&
            inside
        ){

            state.crossbarHits++;


            state.score+=5;


            state.combo++;


            state.best=
                Math.max(
                    state.best,
                    state.combo
                );


            createParticles(
                ball.targetX,
                goal.y,
                true,
                65
            );


            goalSound();


            showResult(
                "CROSSBAR HIT!",
                "+5",
                "Perfect bar accuracy!"
            );


            updateHUD();

            return;

        }


        missShot(
            "MISSED THE BAR!"
        );


        return;
    }


    /*
      Distance from keeper
      to target.
    */

    const keeperDistance =
        Math.hypot(

            keeper.x-
            ball.targetX,

            keeper.y-
            ball.targetY

        );


    let saveRange =
        d.save*
        (
            .75+
            k.diving/
            240
        );


    saveRange +=
        k.reflexes/
        27;


    saveRange -=
        p.accuracy/
        9;


    /*
      Hassan goalkeeper.
    */

    if(
        keeperSelect.value===
        "Hassan Ali"
    ){

        saveRange+=
            82;

    }


    /*
      Player-specific
      specialties.
    */

    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        saveRange*=
            .43;

    }


    if(
        state.mode===
            "longshot" &&
        playerSelect.value===
            "Erling Haaland"
    ){

        saveRange*=
            .72;

    }


    if(
        state.mode===
            "freekick" &&
        playerSelect.value===
            "Lamine Yamal"
    ){

        saveRange*=
            .66;

    }


    if(
        state.mode===
            "penalty" &&
        playerSelect.value===
            "Jude Bellingham"
    ){

        saveRange*=
            .68;

    }


    /*
      SAVE
    */

    if(
        keeperDistance<
        saveRange
    ){

        state.saves++;


        state.combo=
            0;


        createParticles(
            ball.targetX,
            ball.targetY,
            false,
            50
        );


        saveSound();


        showResult(
            "SAVED!",
            "+0",
            keeperSelect.value+
            " stopped the shot!"
        );


        updateHUD();

        return;

    }


    /*
      GOAL
    */

    let points =

        state.mode===
        "penalty"

            ? 1

            :
            state.mode===
            "freekick"

                ? 2

                :
                state.mode===
                "longshot"

                    ? 3

                    : 4;


    /*
      Specialist bonuses.
    */

    if(
        state.mode===
            "penalty" &&
        playerSelect.value===
            "Jude Bellingham"
    ){

        points+=2;

    }


    if(
        state.mode===
            "freekick" &&
        playerSelect.value===
            "Lamine Yamal"
    ){

        points+=2;

    }


    if(
        state.mode===
            "longshot" &&
        playerSelect.value===
            "Erling Haaland"
    ){

        points+=2;

    }


    /*
      Hassan bonus.
    */

    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        points+=5;

    }


    /*
      Combo bonus.
    */

    points+=
        Math.floor(
            state.combo/
            3
        );


    state.score+=
        points;


    state.goals++;


    state.combo++;


    state.best=
        Math.max(
            state.best,
            state.combo
        );


    const previousLevel =
        state.level;


    state.level=
        Math.floor(
            state.goals/
            3
        )+
        1;


    createParticles(
        ball.targetX,
        ball.targetY,
        true,
        80
    );


    goalSound();


    if(
        state.level>
        previousLevel
    ){

        showResult(
            "LEVEL "+
            state.level+
            "!",
            "+"+
            points,
            "New level unlocked!"
        );

    }

    else{

        showResult(
            "GOOOOOAL!",
            "+"+
            points,
            p.role+
            " scored!"
        );

    }


    updateHUD();

}


/* ============================================================
   MISS
============================================================ */

function missShot(
    text
){

    state.combo=
        0;


    createParticles(
        ball.x,
        ball.y,
        false,
        30
    );


    saveSound();


    showResult(
        text,
        "0",
        "Try again!"
    );

}


/* ============================================================
   RESULT
============================================================ */

function showResult(
    title,
    points,
    detail
){

    state.result=
        true;


    resultTitle.textContent =
        title;


    resultPoints.textContent =
        points;


    resultDetail.textContent =
        detail;


    resultOverlay
        .classList
        .remove(
            "hidden"
        );


    updateHUD();

}


/* ============================================================
   PARTICLES
============================================================ */

function createParticles(
    x,
    y,
    good,
    amount
){

    const number =
        amount||
        40;


    for(
        let i=0;
        i<number;
        i++
    ){

        const angle =
            Math.random()*
            Math.PI*
            2;


        const velocity =
            random(
                60,
                420
            );


        particles.push({

            x:x,

            y:y,

            vx:
                Math.cos(
                    angle
                )*
                velocity,

            vy:
                Math.sin(
                    angle
                )*
                velocity-
                random(
                    30,
                    120
                ),

            life:
                random(
                    .5,
                    1.1
                ),

            size:
                random(
                    2,
                    7
                ),

            good:
                good

        });

    }

}


function updateParticles(
    dt
){

    for(
        const p of particles
    ){

        p.x+=
            p.vx*
            dt;


        p.y+=
            p.vy*
            dt;


        p.vy+=
            300*
            dt;


        p.life-=
            dt*
            1.5;

    }


    particles=
        particles.filter(
            p=>
                p.life>0
        );

}


/* ============================================================
   SOUND
============================================================ */

let audioContext=
    null;


function getAudio(){

    if(
        !state.sound
    ){

        return null;

    }


    try{

        if(
            !audioContext
        ){

            const AudioConstructor =
                window.AudioContext||
                window.webkitAudioContext;


            if(
                !AudioConstructor
            ){

                return null;

            }


            audioContext=
                new AudioConstructor();

        }


        return audioContext;

    }

    catch{

        return null;

    }

}


function beep(
    frequency,
    duration,
    type
){

    const audio =
        getAudio();


    if(
        !audio
    ){

        return;

    }


    try{

        const oscillator =
            audio.createOscillator();


        const gain =
            audio.createGain();


        oscillator.type =
            type||
            "sine";


        oscillator.frequency.value =
            frequency;


        gain.gain.value =
            .035;


        oscillator.connect(
            gain
        );


        gain.connect(
            audio.destination
        );


        oscillator.start();


        gain.gain.exponentialRampToValueAtTime(
            .0001,
            audio.currentTime+
            duration
        );


        oscillator.stop(
            audio.currentTime+
            duration
        );

    }

    catch{

        /* Optional sound. */

    }

}


function goalSound(){

    beep(
        523,
        .08,
        "triangle"
    );


    setTimeout(
        ()=>
            beep(
                659,
                .08,
                "triangle"
            ),

        80
    );


    setTimeout(
        ()=>
            beep(
                784,
                .18,
                "triangle"
            ),

        160
    );

}


function saveSound(){

    beep(
        180,
        .12,
        "square"
    );


    setTimeout(
        ()=>
            beep(
                120,
                .16,
                "square"
            ),

        100
    );

}


/* ============================================================
   PAUSE
============================================================ */

function togglePause(){

    state.paused=
        !state.paused;


    pauseOverlay
        .classList
        .toggle(
            "hidden",
            !state.paused
        );


    document
        .getElementById(
            "pauseBtn"
        )
        .textContent =

        state.paused
            ? "▶ RESUME"
            : "⏸ PAUSE";

}


/* ============================================================
   MODE SWITCH
============================================================ */

function setMode(
    mode
){

    const validModes = [

        "penalty",
        "freekick",
        "longshot",
        "keeper",
        "crossbar"

    ];


    if(
        !validModes.includes(
            mode
        )
    ){

        return;

    }


    state.mode=
        mode;


    state.busy=
        false;


    state.result=
        false;


    state.keeperActive=
        false;


    state.exactTarget=
        null;


    cancelTimer();


    resultOverlay
        .classList
        .add(
            "hidden"
        );


    document
        .querySelectorAll(
            ".mode"
        )
        .forEach(
            button=>{

                button.classList.toggle(

                    "active",

                    button.dataset.mode===
                    mode

                );

            }
        );


    shotButtons
        .classList
        .toggle(

            "hidden",

            mode===
                "keeper"||

            mode===
                "longshot"||

            mode===
                "crossbar"

        );


    saveButtons
        .classList
        .toggle(

            "hidden",

            mode!==
            "keeper"

        );


    exactButton
        .classList
        .toggle(

            "hidden",

            mode!==
                "longshot"&&

            mode!==
                "crossbar"

        );


    updateScene();


    resetRound();

}


/* ============================================================
   EVENTS: MODES
============================================================ */

document
    .querySelectorAll(
        ".mode"
    )
    .forEach(
        button=>{

            button.addEventListener(
                "click",
                ()=>{

                    setMode(
                        button.dataset.mode
                    );

                }
            );

        }
    );


/* ============================================================
   EVENTS: SHOOT BUTTONS
============================================================ */

document
    .querySelectorAll(
        "#shotButtons button"
    )
    .forEach(
        button=>{

            button.addEventListener(
                "pointerdown",
                event=>{

                    event.preventDefault();


                    startDirectionShot(
                        button.dataset.zone
                    );

                }
            );

        }
    );


/* ============================================================
   EVENTS: KEEPER BUTTONS
============================================================ */

document
    .querySelectorAll(
        "#saveButtons button"
    )
    .forEach(
        button=>{

            button.addEventListener(
                "pointerdown",
                event=>{

                    event.preventDefault();


                    keeperSave(
                        button.dataset.save
                    );

                }
            );

        }
    );


/* ============================================================
   EVENTS: EXACT AIM
============================================================ */

pitchSvg.addEventListener(
    "pointerdown",
    event=>{

        event.preventDefault();


        if(
            state.paused||
            state.result
        ){

            return;

        }


        if(
            state.mode===
                "longshot"||

            state.mode===
                "crossbar"
        ){

            chooseExactTarget(
                event
            );

        }

    },
    {
        passive:false
    }
);


keeperSvg.addEventListener(
    "pointerdown",
    event=>{

        event.preventDefault();


        if(
            state.mode!==
                "keeper"||

            state.paused||
            state.result
        ){

            return;

        }


        const rect =
            keeperSvg.getBoundingClientRect();


        const x =
            (
                event.clientX-
                rect.left
            )/
            rect.width*
            1200;


        keeperSave(
            zoneFromX(
                x
            )
        );

    },
    {
        passive:false
    }
);


exactButton.addEventListener(
    "click",
    exactShoot
);


/* ============================================================
   SELECT EVENTS
============================================================ */

playerSelect.addEventListener(
    "change",
    ()=>{

        updateHUD();

        resetRound();

    }
);


keeperSelect.addEventListener(
    "change",
    ()=>{

        updateHUD();

        resetRound();

    }
);


difficultySelect.addEventListener(
    "change",
    ()=>{

        resetRound();

    }
);


cameraSelect.addEventListener(
    "change",
    ()=>{

        updateCamera();

        resetRound();

    }
);


/* ============================================================
   PAUSE
============================================================ */

document
    .getElementById(
        "pauseBtn"
    )
    .addEventListener(
        "click",
        togglePause
    );


document
    .getElementById(
        "resumeButton"
    )
    .addEventListener(
        "click",
        togglePause
    );


/* ============================================================
   SOUND
============================================================ */

document
    .getElementById(
        "soundBtn"
    )
    .addEventListener(
        "click",
        ()=>{

            state.sound=
                !state.sound;


            document
                .getElementById(
                    "soundBtn"
                )
                .textContent =

                state.sound
                    ? "🔊 SOUND ON"
                    : "🔇 SOUND OFF";

        }
    );


/* ============================================================
   RESULT CONTINUE
============================================================ */

document
    .getElementById(
        "continueButton"
    )
    .addEventListener(
        "click",
        ()=>{

            state.result=
                false;


            resultOverlay
                .classList
                .add(
                    "hidden"
                );


            resetRound();

        }
    );


/* ============================================================
   RESTART
============================================================ */

document
    .getElementById(
        "restartButton"
    )
    .addEventListener(
        "click",
        ()=>{

            state.score=
                0;

            state.goals=
                0;

            state.saves=
                0;

            state.level=
                1;

            state.combo=
                0;

            state.best=
                0;

            state.crossbarHits=
                0;

            state.busy=
                false;

            state.result=
                false;

            state.paused=
                false;


            particles=[];


            cancelTimer();


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


            document
                .getElementById(
                    "pauseBtn"
                )
                .textContent=
                    "⏸ PAUSE";


            resetRound();


            setMessage(
                "GAME RESTARTED! ⚽",
                "New match started."
            );

        }
    );


/* ============================================================
   WINDOW RESIZE
============================================================ */

window.addEventListener(
    "resize",
    ()=>{

        updateCamera();

    }
);


window.addEventListener(
    "orientationchange",
    ()=>{

        setTimeout(
            updateCamera,
            150
        );

    }
);


/* ============================================================
   MAIN GAME LOOP
============================================================ */

function gameLoop(
    time
){

    const delta =
        clamp(
            (
                time-
                state.lastTime
            )/
            1000,

            0,

            .033
        );


    state.lastTime=
        time;


    if(
        !state.paused&&
        !state.result
    ){

        updateParticles(
            delta
        );


        if(
            state.mode===
            "keeper"
        ){

            updateKeeper(
                time
            );

        }

        else{

            updateShot(
                time
            );

        }

    }


    requestAnimationFrame(
        gameLoop
    );

}


/* ============================================================
   INITIALIZATION
============================================================ */

updateCamera();

updateHUD();

setMode(
    "penalty"
);


requestAnimationFrame(
    gameLoop
);

})();
