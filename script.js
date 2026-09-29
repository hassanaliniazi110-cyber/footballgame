"use strict";


/* ============================================================
   FOOTBALL LEGENDS ARENA X
   LARGE GAME ENGINE
============================================================ */


/* ============================================================
   DOM
============================================================ */

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
        "camera"
    );


const displayPlayer =
    document.getElementById(
        "displayPlayer"
    );

const displayRole =
    document.getElementById(
        "displayRole"
    );

const playerAvatar =
    document.getElementById(
        "playerAvatar"
    );


const statShoot =
    document.getElementById(
        "statShoot"
    );

const statPower =
    document.getElementById(
        "statPower"
    );

const statAccuracy =
    document.getElementById(
        "statAccuracy"
    );

const statCurve =
    document.getElementById(
        "statCurve"
    );

const statSpeed =
    document.getElementById(
        "statSpeed"
    );

const statStamina =
    document.getElementById(
        "statStamina"
    );

const statLong =
    document.getElementById(
        "statLong"
    );


const matchPlayer =
    document.getElementById(
        "matchPlayer"
    );

const matchKeeper =
    document.getElementById(
        "matchKeeper"
    );


const modeTitle =
    document.getElementById(
        "modeTitle"
    );

const gameMessage =
    document.getElementById(
        "gameMessage"
    );

const distance =
    document.getElementById(
        "distance"
    );


const ability =
    document.getElementById(
        "ability"
    );

const wind =
    document.getElementById(
        "wind"
    );

const challenge =
    document.getElementById(
        "challenge"
    );


const precisionCard =
    document.getElementById(
        "precisionCard"
    );

const precision =
    document.getElementById(
        "precision"
    );


const powerContainer =
    document.getElementById(
        "powerContainer"
    );

const powerBar =
    document.getElementById(
        "powerBar"
    );


const shootControls =
    document.getElementById(
        "shootControls"
    );

const keeperControls =
    document.getElementById(
        "keeperControls"
    );


const exactShootButton =
    document.getElementById(
        "shootExactButton"
    );


const pauseOverlay =
    document.getElementById(
        "pauseOverlay"
    );

const resumeButton =
    document.getElementById(
        "resumeButton"
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

const resultText =
    document.getElementById(
        "resultText"
    );

const continueButton =
    document.getElementById(
        "continueButton"
    );


const soundButton =
    document.getElementById(
        "soundButton"
    );

const pauseButton =
    document.getElementById(
        "pauseButton"
    );

const restartButton =
    document.getElementById(
        "restartButton"
    );

const status =
    document.getElementById(
        "status"
    );


/* ============================================================
   PLAYER DATABASE
============================================================ */

const players = {


    /* --------------------------------------------------------
       HASSAN ALI
    --------------------------------------------------------- */

    "Hassan Ali": {

        shoot:300,

        power:300,

        accuracy:300,

        curve:300,

        speed:300,

        stamina:300,

        long:300,

        penalty:300,

        freeKick:300,

        role:
            "300 ALL-STATS MASTER",

        initials:
            "HA",

        color:
            "#35e978"

    },


    /* --------------------------------------------------------
       MUHAMMAD ARHAM
    --------------------------------------------------------- */

    "Muhammad Arham": {

        shoot:94,

        power:92,

        accuracy:93,

        curve:90,

        speed:91,

        stamina:95,

        long:94,

        penalty:91,

        freeKick:89,

        role:
            "ELITE ATTACKER",

        initials:
            "MA",

        color:
            "#74b9ff"

    },


    "Ehan Ali": {

        shoot:90,

        power:88,

        accuracy:91,

        curve:90,

        speed:91,

        stamina:89,

        long:87,

        penalty:88,

        freeKick:86,

        role:
            "ATTACKER",

        initials:
            "EA",

        color:
            "#65d2ff"

    },


    "Umar Shoaib": {

        shoot:92,

        power:94,

        accuracy:91,

        curve:95,

        speed:89,

        stamina:94,

        long:93,

        penalty:91,

        freeKick:94,

        role:
            "PLAYMAKER",

        initials:
            "US",

        color:
            "#9c82ff"

    },


    "Cristiano Ronaldo": {

        shoot:96,

        power:96,

        accuracy:93,

        curve:89,

        speed:89,

        stamina:91,

        long:97,

        penalty:96,

        freeKick:91,

        role:
            "GOAL SCORER",

        initials:
            "CR",

        color:
            "#ffffff"

    },


    "Lionel Messi": {

        shoot:97,

        power:86,

        accuracy:99,

        curve:99,

        speed:90,

        stamina:86,

        long:95,

        penalty:92,

        freeKick:99,

        role:
            "PLAYMAKER",

        initials:
            "LM",

        color:
            "#79b8ff"

    },


    "Kylian Mbappe": {

        shoot:94,

        power:92,

        accuracy:91,

        curve:86,

        speed:99,

        stamina:94,

        long:92,

        penalty:89,

        freeKick:83,

        role:
            "SPEEDSTER",

        initials:
            "KM",

        color:
            "#ae82ff"

    },


    /* --------------------------------------------------------
       HAALAND
       LONG SHOT SPECIALIST
    --------------------------------------------------------- */

    "Erling Haaland": {

        shoot:99,

        power:100,

        accuracy:93,

        curve:78,

        speed:90,

        stamina:92,

        long:100,

        penalty:92,

        freeKick:72,

        role:
            "LONG SHOT SPECIALIST",

        initials:
            "EH",

        color:
            "#acd7ff"

    },


    /* --------------------------------------------------------
       LAMINE YAMAL
       FREE KICK SPECIALIST
    --------------------------------------------------------- */

    "Lamine Yamal": {

        shoot:91,

        power:85,

        accuracy:97,

        curve:100,

        speed:95,

        stamina:90,

        long:92,

        penalty:86,

        freeKick:100,

        role:
            "FREE KICK SPECIALIST",

        initials:
            "LY",

        color:
            "#ffe06a"

    },


    /* --------------------------------------------------------
       BELLINGHAM
       PENALTY SPECIALIST
    --------------------------------------------------------- */

    "Jude Bellingham": {

        shoot:95,

        power:93,

        accuracy:96,

        curve:89,

        speed:90,

        stamina:98,

        long:96,

        penalty:100,

        freeKick:86,

        role:
            "PENALTY SPECIALIST",

        initials:
            "JB",

        color:
            "#dfb0ff"

    },


    "Vinicius Jr": {

        shoot:91,

        power:88,

        accuracy:89,

        curve:86,

        speed:100,

        stamina:94,

        long:87,

        penalty:81,

        freeKick:80,

        role:
            "WINGER",

        initials:
            "VJ",

        color:
            "#ff8295"

    },


    "Neymar": {

        shoot:92,

        power:84,

        accuracy:95,

        curve:99,

        speed:90,

        stamina:83,

        long:91,

        penalty:89,

        freeKick:98,

        role:
            "SKILL MASTER",

        initials:
            "NJ",

        color:
            "#7ce6ff"

    },


    "Mohamed Salah": {

        shoot:94,

        power:90,

        accuracy:93,

        curve:90,

        speed:95,

        stamina:92,

        long:93,

        penalty:88,

        freeKick:82,

        role:
            "WINGER",

        initials:
            "MS",

        color:
            "#ffd06b"

    },


    "Kevin De Bruyne": {

        shoot:92,

        power:91,

        accuracy:97,

        curve:98,

        speed:83,

        stamina:90,

        long:93,

        penalty:84,

        freeKick:97,

        role:
            "PRECISION PLAYMAKER",

        initials:
            "KD",

        color:
            "#8fd9ff"

    },


    "Robert Lewandowski": {

        shoot:98,

        power:96,

        accuracy:95,

        curve:87,

        speed:80,

        stamina:89,

        long:94,

        penalty:97,

        freeKick:79,

        role:
            "CLINICAL STRIKER",

        initials:
            "RL",

        color:
            "#d7e1ff"

    },


    "Harry Kane": {

        shoot:97,

        power:95,

        accuracy:95,

        curve:92,

        speed:82,

        stamina:90,

        long:98,

        penalty:98,

        freeKick:88,

        role:
            "LONG RANGE STRIKER",

        initials:
            "HK",

        color:
            "#d9f2ff"

    },


    "Son Heung-min": {

        shoot:95,

        power:91,

        accuracy:92,

        curve:95,

        speed:96,

        stamina:93,

        long:96,

        penalty:89,

        freeKick:85,

        role:
            "FORWARD",

        initials:
            "SH",

        color:
            "#e7ff77"

    },


    "Rodri": {

        shoot:88,

        power:92,

        accuracy:91,

        curve:84,

        speed:71,

        stamina:96,

        long:95,

        penalty:76,

        freeKick:80,

        role:
            "MIDFIELDER",

        initials:
            "R",

        color:
            "#b6b7ff"

    },


    "Antoine Griezmann": {

        shoot:94,

        power:88,

        accuracy:95,

        curve:96,

        speed:87,

        stamina:91,

        long:92,

        penalty:91,

        freeKick:94,

        role:
            "FORWARD",

        initials:
            "AG",

        color:
            "#9eefff"

    },


    "Ousmane Dembele": {

        shoot:89,

        power:85,

        accuracy:89,

        curve:91,

        speed:98,

        stamina:88,

        long:87,

        penalty:78,

        freeKick:86,

        role:
            "WINGER",

        initials:
            "OD",

        color:
            "#d796ff"

    },


    "Jamal Musiala": {

        shoot:90,

        power:85,

        accuracy:93,

        curve:95,

        speed:94,

        stamina:89,

        long:87,

        penalty:80,

        freeKick:84,

        role:
            "PLAYMAKER",

        initials:
            "JM",

        color:
            "#baffcf"

    },


    "Phil Foden": {

        shoot:91,

        power:87,

        accuracy:95,

        curve:96,

        speed:91,

        stamina:89,

        long:90,

        penalty:82,

        freeKick:92,

        role:
            "PLAYMAKER",

        initials:
            "PF",

        color:
            "#f4c7ff"

    },


    "Raphinha": {

        shoot:91,

        power:91,

        accuracy:91,

        curve:95,

        speed:94,

        stamina:91,

        long:94,

        penalty:81,

        freeKick:91,

        role:
            "WINGER",

        initials:
            "RA",

        color:
            "#8fe9ff"

    }

};


/* ============================================================
   GOALKEEPER DATABASE
============================================================ */

const goalkeepers = {


    /* --------------------------------------------------------
       HASSAN ALI
       300 EVERY GK STAT
    --------------------------------------------------------- */

    "Hassan Ali": {

        diving:300,

        reflexes:300,

        positioning:300,

        handling:300,

        speed:300,

        kicking:300,

        reactions:300,

        reach:300,

        role:
            "ULTIMATE GK",

        initials:
            "HA"

    },


    "Muhammad Arham": {

        diving:92,

        reflexes:93,

        positioning:90,

        handling:91,

        speed:90,

        kicking:89,

        reactions:92,

        reach:90,

        role:
            "GOALKEEPER",

        initials:
            "MA"

    },


    "Ehan Ali": {

        diving:90,

        reflexes:91,

        positioning:89,

        handling:90,

        speed:90,

        kicking:88,

        reactions:91,

        reach:88,

        role:
            "GOALKEEPER",

        initials:
            "EA"

    },


    "Thibaut Courtois": {

        diving:98,

        reflexes:97,

        positioning:98,

        handling:95,

        speed:83,

        kicking:88,

        reactions:97,

        reach:100,

        role:
            "GIANT GK",

        initials:
            "TC"

    },


    "Alisson": {

        diving:95,

        reflexes:95,

        positioning:96,

        handling:96,

        speed:91,

        kicking:97,

        reactions:95,

        reach:94,

        role:
            "COMPLETE GK",

        initials:
            "AL"

    },


    "Manuel Neuer": {

        diving:93,

        reflexes:95,

        positioning:94,

        handling:92,

        speed:95,

        kicking:96,

        reactions:94,

        reach:93,

        role:
            "SWEEPER GK",

        initials:
            "MN"

    },


    "Gianluigi Donnarumma": {

        diving:97,

        reflexes:97,

        positioning:94,

        handling:95,

        speed:86,

        kicking:87,

        reactions:97,

        reach:100,

        role:
            "TALL GK",

        initials:
            "GD"

    },


    "Ederson": {

        diving:91,

        reflexes:93,

        positioning:95,

        handling:91,

        speed:93,

        kicking:100,

        reactions:92,

        reach:91,

        role:
            "DISTRIBUTOR GK",

        initials:
            "ED"

    },


    "Jan Oblak": {

        diving:96,

        reflexes:97,

        positioning:98,

        handling:96,

        speed:80,

        kicking:86,

        reactions:97,

        reach:94,

        role:
            "SHOT STOPPER",

        initials:
            "JO"

    },


    "Marc-Andre ter Stegen": {

        diving:93,

        reflexes:95,

        positioning:95,

        handling:93,

        speed:89,

        kicking:97,

        reactions:95,

        reach:92,

        role:
            "MODERN GK",

        initials:
            "MT"

    },


    "Emiliano Martinez": {

        diving:94,

        reflexes:95,

        positioning:92,

        handling:92,

        speed:87,

        kicking:90,

        reactions:96,

        reach:93,

        role:
            "PENALTY GK",

        initials:
            "EM"

    }

};


/* ============================================================
   DIFFICULTY
============================================================ */

const difficulties = {

    easy:{

        keeperReaction:
            420,

        keeperRead:
            .25,

        saveRadius:
            45,

        shotTime:
            1.15,

        wind:
            .10

    },


    normal:{

        keeperReaction:
            300,

        keeperRead:
            .45,

        saveRadius:
            56,

        shotTime:
            1.00,

        wind:
            .25

    },


    hard:{

        keeperReaction:
            210,

        keeperRead:
            .66,

        saveRadius:
            67,

        shotTime:
            .88,

        wind:
            .40

    },


    legend:{

        keeperReaction:
            145,

        keeperRead:
            .80,

        saveRadius:
            75,

        shotTime:
            .75,

        wind:
            .58

    }

};


/* ============================================================
   GAME STATE
============================================================ */

const state = {

    width:1000,

    height:600,

    mode:
        "penalty",

    score:0,

    goals:0,

    saves:0,

    level:1,

    combo:0,

    bestCombo:0,

    crossbarHits:0,

    busy:false,

    paused:false,

    result:false,

    sound:true,

    wind:0,

    exactTarget:null,

    keeperZone:
        "center",

    keeperActive:false,

    shotStarted:0,

    shotDuration:0,

    keeperMoveStarted:0,

    keeperMoveDuration:0,

    timer:null,

    lastTime:
        performance.now()

};


/* ============================================================
   BALL
============================================================ */

const ball = {

    x:500,

    y:500,

    startX:500,

    startY:500,

    targetX:500,

    targetY:150,

    progress:0,

    curve:0,

    arc:60,

    radius:13

};


/* ============================================================
   KEEPER
============================================================ */

const keeper = {

    x:500,

    y:280,

    homeX:500,

    homeY:280,

    targetX:500,

    targetY:280,

    dive:0

};


/* ============================================================
   PARTICLES
============================================================ */

let particles=[];


/* ============================================================
   HELPERS
============================================================ */

function clamp(
    value,
    min,
    max
){

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
){

    return a+
        (
            b-a
        )*
        t;

}


function smoothStep(
    t
){

    return t*t*
        (
            3-
            2*t
        );

}


function random(
    min,
    max
){

    return min+
        Math.random()*
        (
            max-min
        );

}


function distanceBetween(
    ax,
    ay,
    bx,
    by
){

    return Math.hypot(
        ax-bx,
        ay-by
    );

}


function currentPlayer(){

    return (
        players[
            playerSelect.value
        ] ||
        players[
            "Hassan Ali"
        ]
    );

}


function currentKeeper(){

    return (
        goalkeepers[
            keeperSelect.value
        ] ||
        goalkeepers[
            "Hassan Ali"
        ]
    );

}


function currentDifficulty(){

    return (
        difficulties[
            difficultySelect.value
        ] ||
        difficulties.normal
    );

}


/* ============================================================
   RESIZE
============================================================ */

function resizeCanvas(){

    const rect =
        canvas.getBoundingClientRect();

    state.width =
        Math.max(
            320,
            rect.width
        );

    state.height =
        Math.max(
            390,
            rect.height
        );

    const dpr =
        Math.min(
            window.devicePixelRatio||
            1,
            2
        );

    canvas.width =
        Math.floor(
            state.width*dpr
        );

    canvas.height =
        Math.floor(
            state.height*dpr
        );

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    positionObjects();

}


/* ============================================================
   GOAL GEOMETRY
============================================================ */

function goalGeometry(){

    let x=.19;

    let width=.62;

    let y=.09;

    let height=.32;


    if(
        cameraSelect.value===
        "close"
    ){

        x=.10;

        width=.80;

        y=.07;

        height=.39;
    }


    if(
        cameraSelect.value===
        "wide"
    ){

        x=.26;

        width=.48;

        y=.14;

        height=.27;
    }


    return{

        x:
            state.width*x,

        y:
            state.height*y,

        width:
            state.width*width,

        height:
            state.height*height
    };

}


/* ============================================================
   POSITION
============================================================ */

function positionObjects(){

    const g =
        goalGeometry();


    keeper.homeX =
        state.width/2;

    keeper.homeY =
        g.y+
        g.height*.76;


    keeper.x =
        keeper.homeX;

    keeper.y =
        keeper.homeY;

    keeper.targetX =
        keeper.homeX;

    keeper.targetY =
        keeper.homeY;

    keeper.dive=0;


    if(
        state.mode===
        "keeper"
    ){

        return;
    }


    ball.x =
        state.width/2;

    ball.y =
        state.height*.77;

    ball.startX =
        ball.x;

    ball.startY =
        ball.y;

}


/* ============================================================
   MESSAGE
============================================================ */

function setMessage(
    main,
    sub
){

    gameMessage.textContent =
        main;

    status.textContent =
        sub||
        main;

}


/* ============================================================
   PLAYER UI
============================================================ */

function updatePlayerUI(){

    const name =
        playerSelect.value;

    const player =
        currentPlayer();


    displayPlayer.textContent =
        name;

    displayRole.textContent =
        player.role;

    playerAvatar.textContent =
        player.initials;

    playerAvatar.style.background =
        `linear-gradient(
            135deg,
            ${player.color},
            #087d37
        )`;


    statShoot.textContent =
        player.shoot;

    statPower.textContent =
        player.power;

    statAccuracy.textContent =
        player.accuracy;

    statCurve.textContent =
        player.curve;

    statSpeed.textContent =
        player.speed;

    statStamina.textContent =
        player.stamina;

    statLong.textContent =
        player.long;


    matchPlayer.textContent =
        name;

    matchKeeper.textContent =
        "vs "+
        keeperSelect.value;


    updateAbility();

}


/* ============================================================
   ABILITY UI
============================================================ */

function updateAbility(){

    const player =
        currentPlayer();


    if(
        state.mode===
        "keeper"
    ){

        if(
            keeperSelect.value===
            "Hassan Ali"
        ){

            ability.textContent =
                "👑 HASSAN ALI — 300 REFLEXES • 300 DIVING • 300 REACH";

        }else{

            ability.textContent =
                keeperSelect.value+
                " — "+
                currentKeeper().role;
        }

        return;
    }


    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        ability.textContent =
            "👑 HASSAN ALI — 300 IN EVERY STAT";

        return;
    }


    if(
        state.mode===
        "longshot" &&
        playerSelect.value===
        "Erling Haaland"
    ){

        ability.textContent =
            "🚀 HAALAND — LONG SHOT SPECIALIST";

        return;
    }


    if(
        state.mode===
        "freekick" &&
        playerSelect.value===
        "Lamine Yamal"
    ){

        ability.textContent =
            "🎯 LAMINE YAMAL — FREE KICK SPECIALIST";

        return;
    }


    if(
        state.mode===
        "penalty" &&
        playerSelect.value===
        "Jude Bellingham"
    ){

        ability.textContent =
            "⚽ BELLINGHAM — PENALTY SPECIALIST";

        return;
    }


    ability.textContent =
        player.role;

}


/* ============================================================
   HUD
============================================================ */

function updateHUD(){

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


    updatePlayerUI();


    const remainder =
        state.goals%3;

    const need =
        remainder===0
            ? 3
            : 3-remainder;


    challenge.textContent =
        `Score ${need} more goal${
            need===1
                ? ""
                : "s"
        } to level up`;


    wind.textContent =
        state.wind>=0
            ? "+"+
                state.wind.toFixed(1)
            :
                state.wind.toFixed(1);

}


/* ============================================================
   TARGET BY ZONE
============================================================ */

function targetByZone(
    zone
){

    const g =
        goalGeometry();


    if(
        zone==="left"
    ){

        return{

            x:
                g.x+
                g.width*.16,

            y:
                g.y+
                g.height*
                random(
                    .16,
                    .45
                )
        };
    }


    if(
        zone==="right"
    ){

        return{

            x:
                g.x+
                g.width*.84,

            y:
                g.y+
                g.height*
                random(
                    .16,
                    .45
                )
        };
    }


    return{

        x:
            g.x+
            g.width*.50,

        y:
            g.y+
            g.height*
            random(
                .17,
                .46
            )
    };

}


/* ============================================================
   SPECIAL BONUS
============================================================ */

function specialMultiplier(){

    const name =
        playerSelect.value;


    if(
        name===
        "Hassan Ali"
    ){

        return 1.45;
    }


    if(
        state.mode===
        "longshot" &&
        name===
        "Erling Haaland"
    ){

        return 1.28;
    }


    if(
        state.mode===
        "freekick" &&
        name===
        "Lamine Yamal"
    ){

        return 1.30;
    }


    if(
        state.mode===
        "penalty" &&
        name===
        "Jude Bellingham"
    ){

        return 1.30;
    }


    return 1;

}


/* ============================================================
   FREE KICK WALL COUNT
============================================================ */

function wallCount(){

    return clamp(
        4+
        Math.floor(
            state.level/2
        ),
        4,
        9
    );

}


/* ============================================================
   START DIRECTION SHOT
============================================================ */

function startDirectionShot(
    zone
){

    if(
        state.busy||
        state.paused||
        state.result||
        state.mode==="keeper"||
        state.mode==="longshot"||
        state.mode==="crossbar"
    ){

        return;
    }


    let target =
        targetByZone(
            zone
        );


    /*
      Bellingham gets a special
      penalty target placement.
    */

    if(
        state.mode===
        "penalty" &&
        playerSelect.value===
        "Jude Bellingham"
    ){

        const g=
            goal();

        target.y =
            g.y+
            g.height*.19;
    }


    startShot(
        target
    );

}


/* ============================================================
   START SHOT
============================================================ */

function startShot(
    target
){

    if(
        state.busy
    ){

        return;
    }


    const player =
        currentPlayer();

    const d =
        currentDifficulty();

    const goalkeeper =
        currentKeeper();


    state.busy =
        true;


    let start;


    if(
        state.mode===
        "penalty"
    ){

        start={
            x:
                state.width/2,

            y:
                state.height*.77
        };

    }

    else if(
        state.mode===
        "freekick"
    ){

        start={
            x:
                state.width/2,

            y:
                state.height*.76
        };

    }

    else if(
        state.mode===
        "longshot"
    ){

        start={
            x:
                state.width/2,

            y:
                state.height*.84
        };

    }

    else{

        start={
            x:
                state.width/2,

            y:
                state.height*.81
        };

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

    ball.progress=0;


    let curve =
        player.curve/
        100;


    if(
        state.mode===
        "freekick"
    ){

        curve *=
            1.5;

    }

    else{

        curve *=
            .45;
    }


    if(
        state.mode===
        "freekick" &&
        playerSelect.value===
        "Lamine Yamal"
    ){

        curve *=
            1.3;
    }


    ball.curve =
        (
            target.x<
            state.width/2
                ? -1
                : 1
        )*
        curve*
        100;


    ball.arc =

        state.mode===
        "freekick"

            ? 65

            : state.mode===
              "longshot"

                ? 95

                : 25;


    state.shotStarted =
        performance.now();


    const powerFactor =
        clamp(
            player.power/
            100,
            .5,
            3
        );


    state.shotDuration =

        state.mode===
        "longshot"

            ? 1150/
                (
                    d.shotTime*
                    powerFactor
                )

            : state.mode===
              "freekick"

                ? 920/
                    (
                        d.shotTime*
                        powerFactor
                    )

                : 780/
                    (
                        d.shotTime*
                        powerFactor
                    );


    state.keeperMoveStarted =
        state.shotStarted+
        d.keeperReaction;


    state.keeperMoveDuration =
        clamp(
            460-
            (
                goalkeeper.reactions-80
            )*
            2-
            state.level*8,
            150,
            460
        );


    /*
      Goalkeeper reads target.
    */

    const shotZone =
        target.x<
        state.width*.38
            ? "left"
            :
            target.x>
            state.width*.62
                ? "right"
                : "center";


    let readChance =
        d.keeperRead+
        state.level*.018-
        player.accuracy/
        1000;


    /*
      Hassan's 300 accuracy
      makes his intended shot
      harder to read.
    */

    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        readChance -=
            .35;
    }


    readChance =
        clamp(
            readChance,
            .03,
            .95
        );


    let guessedZone;


    if(
        Math.random()<
        readChance
    ){

        guessedZone =
            shotZone;

    }else{

        const zones=[
            "left",
            "center",
            "right"
        ];

        guessedZone =
            zones[
                Math.floor(
                    Math.random()*
                    zones.length
                )
            ];
    }


    const keeperTarget =
        targetByZone(
            guessedZone
        );


    state.keeperTargetX =
        keeperTarget.x;

    state.keeperTargetY =
        keeperTarget.y;


    keeper.targetX =
        keeperTarget.x;

    keeper.targetY =
        keeperTarget.y;


    keeper.dive =
        guessedZone==="left"
            ? -.28
            :
            guessedZone==="right"
                ? .28
                : 0;


    powerContainer
        .classList
        .remove(
            "hidden"
        );


    if(
        state.mode==="longshot"||
        state.mode==="crossbar"
    ){

        precisionCard
            .classList
            .remove(
                "hidden"
            );

        precision.textContent =
            Math.round(
                clamp(
                    player.accuracy-
                    state.wind*7,
                    1,
                    100
                )
            )+
            "%";
    }


    if(
        state.mode===
        "penalty"
    ){

        setMessage(

            playerSelect.value===
            "Jude Bellingham"

                ? "BELLINGHAM PENALTY! ⚽"

                : "SHOT! ⚡",

            "Pick your target."
        );
    }


    if(
        state.mode===
        "freekick"
    ){

        setMessage(

            playerSelect.value===
            "Lamine Yamal"

                ? "YAMAL FREE KICK! 🎯"

                : "FREE KICK! 🎯",

            "Curve the ball around the wall."
        );
    }


    if(
        state.mode===
        "longshot"
    ){

        setMessage(
            "LONG SHOT! 🚀",
            playerSelect.value===
            "Erling Haaland"

                ? "LONG SHOT SPECIALIST ACTIVATED!"

                : "Power from distance!"
        );
    }


    if(
        state.mode===
        "crossbar"
    ){

        setMessage(
            "CROSSBAR ATTEMPT! 🎯",
            "Try to hit the bar."
        );
    }


    beep(
        350,
        .07,
        "triangle"
    );

}


/* ============================================================
   EXACT AIM
============================================================ */

function chooseExactTarget(
    event
){

    if(
        state.busy||
        state.paused||
        state.result
    ){

        return;
    }


    const rect =
        canvas.getBoundingClientRect();


    const x =
        event.clientX-
        rect.left;


    const y =
        event.clientY-
        rect.top;


    const g =
        goal();


    const inside =

        x>=g.x&&

        x<=
            g.x+
            g.width&&

        y>=g.y&&

        y<=
            g.y+
            g.height;


    if(
        !inside
    ){

        setMessage(
            "AIM INSIDE THE GOAL!",
            "Tap directly on the net."
        );

        beep(
            160,
            .06,
            "square"
        );

        return;
    }


    state.exactTarget={

        x:
            clamp(
                x,
                g.x+8,
                g.x+
                g.width-
                8
            ),

        y:
            clamp(
                y,
                g.y+8,
                g.y+
                g.height-
                8
            )
    };


    setMessage(
        "TARGET LOCKED 🎯",
        "Press SHOOT."
    );


    beep(
        700,
        .07,
        "triangle"
    );

}


/* ============================================================
   EXACT SHOOT
============================================================ */

function shootExact(){

    if(
        !state.exactTarget
    ){

        setMessage(
            "CHOOSE A TARGET FIRST!",
            "Tap inside the goal."
        );

        return;
    }


    startShot(
        state.exactTarget
    );

}


/* ============================================================
   CHECK CROSSBAR
============================================================ */

function checkCrossbar(){

    const g =
        goal();


    const verticalDistance =
        Math.abs(
            ball.y-
            g.y
        );


    const horizontal =
        ball.x>
        g.x+
        g.width*.08&&
        ball.x<
        g.x+
        g.width*.92;


    return (
        verticalDistance<
        20&&
        horizontal
    );

}


/* ============================================================
   RESOLVE SHOT
============================================================ */

function resolveShot(){

    if(
        state.mode===
        "crossbar"
    ){

        if(
            checkCrossbar()
        ){

            state.crossbarHits++;


            state.score+=
                5;


            state.combo++;


            state.bestCombo =
                Math.max(
                    state.bestCombo,
                    state.combo
                );


            particlesBurst(
                ball.x,
                ball.y,
                true,
                75
            );


            goalSound();


            setMessage(
                "CROSSBAR HIT! 🎯",
                "+5 bonus points!"
            );


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


    const player =
        currentPlayer();

    const goalkeeper =
        currentKeeper();

    const d =
        currentDifficulty();


    const keeperDistance =
        distanceBetween(

            keeper.x,

            keeper.y,

            ball.targetX,

            ball.targetY
        );


    let saveRange =
        d.saveRadius;


    saveRange *=
        (
            .75+
            goalkeeper.diving/
            250
        );


    saveRange +=
        goalkeeper.reflexes/
        25;


    /*
      Hassan is the strongest
      requested goalkeeper.
    */

    if(
        keeperSelect.value===
        "Hassan Ali"
    ){

        saveRange +=
            80;
    }


    /*
      High accuracy reduces
      the effective save range.
    */

    saveRange -=
        player.accuracy/
        9;


    /*
      SPECIAL PLAYER EFFECTS
    */

    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        saveRange *=
            .45;
    }


    if(
        state.mode===
        "longshot" &&
        playerSelect.value===
        "Erling Haaland"
    ){

        saveRange *=
            .72;
    }


    if(
        state.mode===
        "freekick" &&
        playerSelect.value===
        "Lamine Yamal"
    ){

        saveRange *=
            .68;
    }


    if(
        state.mode===
        "penalty" &&
        playerSelect.value===
        "Jude Bellingham"
    ){

        saveRange *=
            .70;
    }


    if(
        keeperDistance<
        saveRange
    ){

        state.saves++;


        state.combo=0;


        particlesBurst(
            ball.targetX,
            ball.targetY,
            false,
            50
        );


        saveSound();


        setMessage(
            keeperSelect.value===
            "Hassan Ali"

                ? "HASSAN ALI — 300 GK SAVE! 👑🧤"

                : "SAVED! 🧤",

            keeperSelect.value+
            " reached the shot."
        );


        showResult(
            "SAVED!",
            "+0",
            keeperSelect.value+
            " made the save."
        );


        updateHUD();

        return;
    }


    /* GOAL */

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


    if(
        state.mode===
        "penalty"&&
        playerSelect.value===
        "Jude Bellingham"
    ){

        points+=
            2;
    }


    if(
        state.mode===
        "freekick"&&
        playerSelect.value===
        "Lamine Yamal"
    ){

        points+=
            2;
    }


    if(
        state.mode===
        "longshot"&&
        playerSelect.value===
        "Erling Haaland"
    ){

        points+=
            2;
    }


    if(
        playerSelect.value===
        "Hassan Ali"
    ){

        points+=
            5;
    }


    /*
      Combo bonus.
    */

    points +=
        Math.floor(
            state.combo/
            3
        );


    state.goals++;


    state.score +=
        points;


    state.combo++;


    state.bestCombo =
        Math.max(
            state.bestCombo,
            state.combo
        );


    const previousLevel =
        state.level;


    state.level =
        Math.floor(
            state.goals/
            3
        )+
        1;


    particlesBurst(
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

        setMessage(
            "LEVEL "+
            state.level+
            "! 🏆",
            "The challenge just increased!"
        );

    }

    else if(
        state.combo>=3
    ){

        setMessage(
            "HOT STREAK! 🔥",
            "+"+
            points+
            " points"
        );

    }

    else{

        setMessage(
            "GOOOOOAL! ⚽🔥",
            "+"+
            points+
            " points"
        );
    }


    showResult(
        "GOOOOOAL!",
        "+"+
        points,
        playerSelect.value+
        " scored!"
    );


    updateHUD();

}


/* ============================================================
   MISS
============================================================ */

function missShot(
    text
){

    state.combo=0;

    particlesBurst(
        ball.x,
        ball.y,
        false,
        35
    );

    saveSound();

    setMessage(
        text,
        "Try again."
    );

    showResult(
        text,
        "+0",
        "Better luck on the next attempt."
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

    resultText.textContent =
        detail;


    resultOverlay
        .classList
        .remove(
            "hidden"
        );

}


/* ============================================================
   KEEPER MODE
============================================================ */

function startKeeperMode(){

    clearTimeout(
        state.timer
    );


    state.busy=
        false;

    state.keeperActive=
        false;


    const g =
        goal();


    const zones=[
        "left",
        "center",
        "right"
    ];


    const zone =
        zones[
            Math.floor(
                Math.random()*
                zones.length
            )
        ];


    state.keeperZone =
        zone;


    const target =
        targetByZone(
            zone
        );


    ball.startX =
        random(
            g.x+
            g.width*.1,

            g.x+
            g.width*.9
        );


    ball.startY =
        g.y-
        state.height*.30;


    ball.targetX =
        target.x;


    ball.targetY =
        state.height*.78;


    ball.x =
        ball.startX;


    ball.y =
        ball.startY;


    ball.progress=0;


    ball.radius=7;


    keeper.x =
        state.width/2;


    keeper.y =
        state.height*.80;


    setMessage(
        "GET READY! 🧤",
        "Watch the ball and react!"
    );


    state.timer =
        setTimeout(
            () => {

                if(
                    state.mode!==
                    "keeper"||
                    state.paused||
                    state.result
                ){

                    return;
                }


                state.keeperActive=
                    true;


                state.shotStarted =
                    performance.now();


                setMessage(
                    "SAVE IT! 🧤",
                    "DIVE NOW!"
                );

            },

            550
        );

}


/* ============================================================
   KEEPER SAVE
============================================================ */

function keeperSave(
    zone
){

    if(
        state.mode!==
        "keeper"||
        !state.keeperActive||
        state.paused||
        state.result
    ){

        return;
    }


    state.keeperActive=
        false;


    const targetZone =
        ball.x<
        state.width*.38

            ? "left"

            :
            ball.x>
            state.width*.62

                ? "right"

                : "center";


    const correct =
        zone===
        targetZone;


    let successChance =
        correct
            ? .62
            : .08;


    const gk =
        currentKeeper();


    successChance +=
        gk.reflexes/
        500;


    if(
        keeperSelect.value===
        "Hassan Ali"
    ){

        successChance =
            correct
                ? .999
                : .15;
    }


    successChance =
        clamp(
            successChance,
            0,
            .999
        );


    if(
        Math.random()<
        successChance
    ){

        state.saves++;


        state.score+=
            2;


        state.combo++;


        state.bestCombo =
            Math.max(
                state.bestCombo,
                state.combo
            );


        particlesBurst(
            state.width/2,
            state.height*.62,
            true,
            60
        );


        saveSound();


        setMessage(
            keeperSelect.value===
            "Hassan Ali"

                ? "HASSAN ALI — 300 GK SAVE! 👑"

                : "INCREDIBLE SAVE! 🧤",

            "+2 points"
        );


        showResult(
            "SAVE!",
            "+2",
            keeperSelect.value+
            " stopped the shot!"
        );


    }else{

        state.combo=0;


        setMessage(
            "GOAL! 😱",
            "The striker got past you."
        );


        showResult(
            "GOAL!",
            "0",
            "Wrong reaction."
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
            880,
            1500-
            state.level*20
        );


    const progress =
        clamp(
            (
                time-
                state.shotStarted
            )/
            duration,

            0,
            1
        );


    ball.progress =
        progress;


    const smooth =
        smoothStep(
            progress
        );


    ball.x =
        lerp(
            ball.startX,
            ball.targetX,
            smooth
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
            smooth
        );


    ball.radius =
        lerp(
            7,
            27,
            progress
        );


    if(
        progress>=1
    ){

        state.keeperActive=
            false;


        state.combo=0;


        result(
            "TOO LATE",
            "0",
            "The ball reached the net."
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
                state.shotStarted
            )/
            state.shotDuration,

            0,
            1
        );


    ball.progress =
        progress;


    const smooth =
        smoothStep(
            progress
        );


    ball.x =
        lerp(
            ball.startX,
            ball.targetX,
            smooth
        );


    ball.y =
        lerp(
            ball.startY,
            ball.targetY,
            smooth
        )-
        Math.sin(
            progress*
            Math.PI
        )*
        ball.arc;


    ball.x +=
        Math.sin(
            progress*
            Math.PI
        )*
        ball.curve;


    /*
      Wind
    */

    ball.x +=
        Math.sin(
            progress*
            Math.PI
        )*
        state.wind*
        state.width*
        .03;


    ball.radius =
        lerp(
            13,
            8,
            progress
        );


    /*
      Keeper begins diving
    */

    if(
        time>=
        state.keeperMoveStarted
    ){

        const keeperProgress =
            clamp(
                (
                    time-
                    state.keeperMoveStarted
                )/
                state.keeperMoveDuration,

                0,
                1
            );


        const keeperEase =
            smoothStep(
                keeperProgress
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
                keeperEase*
                .70
            );

    }


    powerBar.style.width =
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


        powerContainer
            .classList
            .add(
                "hidden"
            );


        resolveShot();

    }

}


/* ============================================================
   PARTICLES
============================================================ */

function particlesBurst(
    x,
    y,
    good,
    amount
){

    const count =
        amount||
        40;


    for(
        let i=0;
        i<count;
        i++
    ){

        const angle =
            Math.random()*
            Math.PI*
            2;


        const speed =
            random(
                70,
                430
            );


        particles.push({

            x:x,

            y:y,

            vx:
                Math.cos(angle)*
                speed,

            vy:
                Math.sin(angle)*
                speed-
                random(
                    20,
                    120
                ),

            life:
                random(
                    .55,
                    1.2
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

        p.x +=
            p.vx*
            dt;

        p.y +=
            p.vy*
            dt;

        p.vy +=
            300*
            dt;

        p.life -=
            dt*
            1.5;

    }


    particles =
        particles.filter(
            p=>
                p.life>0
        );

}


function drawParticles(){

    for(
        const p of particles
    ){

        ctx.globalAlpha =
            clamp(
                p.life,
                0,
                1
            );


        ctx.fillStyle =
            p.good
                ? "#ffe33f"
                : "#ffffff";


        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI*2
        );


        ctx.fill();

    }


    ctx.globalAlpha=1;

}


/* ============================================================
   FIELD
============================================================ */

function drawField(){

    const w =
        state.width;

    const h =
        state.height;


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            h
        );


    gradient.addColorStop(
        0,
        "#139547"
    );


    gradient.addColorStop(
        .5,
        "#087a35"
    );


    gradient.addColorStop(
        1,
        "#045926"
    );


    ctx.fillStyle =
        gradient;


    ctx.fillRect(
        0,
        0,
        w,
        h
    );


    /*
      Grass stripes
    */

    for(
        let i=0;
        i<18;
        i++
    ){

        ctx.fillStyle =
            i%2===0
                ? "#ffffff08"
                : "#00000008";


        ctx.fillRect(
            0,
            i*
            h/18,
            w,
            h/18
        );

    }


    /*
      Stadium roof strip
    */

    ctx.fillStyle =
        "#15221a";


    ctx.fillRect(
        0,
        0,
        w,
        h*.13
    );


    /*
      Stadium lights
    */

    for(
        let i=0;
        i<5;
        i++
    ){

        const x =
            w*
            (
                .10+
                i*
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
            h*.05,
            7,
            0,
            Math.PI*2
        );


        ctx.fill();

    }


    ctx.shadowBlur=0;


    /*
      Pitch outline
    */

    ctx.strokeStyle =
        "#ffffffcc";

    ctx.lineWidth=
        3;


    ctx.strokeRect(
        w*.035,
        h*.15,
        w*.93,
        h*.82
    );


    /*
      Half line
    */

    ctx.beginPath();

    ctx.moveTo(
        w*.035,
        h*.56
    );

    ctx.lineTo(
        w*.965,
        h*.56
    );

    ctx.stroke();


    /*
      Center circle
    */

    ctx.beginPath();

    ctx.arc(
        w/2,
        h*.56,
        Math.min(w,h)*.12,
        0,
        Math.PI*2
    );

    ctx.stroke();


    /*
      Penalty box
    */

    ctx.strokeRect(
        w*.10,
        h*.15,
        w*.80,
        h*.40
    );


    /*
      Six-yard box
    */

    ctx.strokeRect(
        w*.26,
        h*.15,
        w*.48,
        h*.23
    );


    /*
      Center spot
    */

    ctx.fillStyle =
        "#ffffff";


    ctx.beginPath();

    ctx.arc(
        w/2,
        h*.50,
        5,
        0,
        Math.PI*2
    );

    ctx.fill();


    drawGoal();


    if(
        state.mode===
        "freekick"
    ){

        drawWall();
    }

}


/* ============================================================
   GOAL
============================================================ */

function drawGoal(){

    const g =
        goalGeometry();


    /*
      Net
    */

    ctx.fillStyle =
        "#ffffff12";


    ctx.fillRect(
        g.x,
        g.y,
        g.width,
        g.height
    );


    ctx.strokeStyle =
        "#ffffff35";


    ctx.lineWidth=
        1;


    for(
        let x=g.x;
        x<=
        g.x+g.width;
        x+=18
    ){

        ctx.beginPath();

        ctx.moveTo(
            x,
            g.y
        );

        ctx.lineTo(
            x,
            g.y+
            g.height
        );

        ctx.stroke();

    }


    for(
        let y=g.y;
        y<=
        g.y+g.height;
        y+=15
    ){

        ctx.beginPath();

        ctx.moveTo(
            g.x,
            y
        );

        ctx.lineTo(
            g.x+
            g.width,
            y
        );

        ctx.stroke();

    }


    /*
      Goal frame
    */

    ctx.strokeStyle =
        "#ffffff";


    ctx.lineWidth=
        9;


    ctx.strokeRect(
        g.x,
        g.y,
        g.width,
        g.height
    );


    ctx.strokeStyle =
        "#dce6df";


    ctx.lineWidth=
        3;


    ctx.strokeRect(
        g.x+7,
        g.y+7,
        g.width-14,
        g.height-14
    );


    /*
      Crossbar challenge highlight
    */

    if(
        state.mode===
        "crossbar"
    ){

        ctx.strokeStyle =
            "#ffe05a";


        ctx.lineWidth=
            5;


        ctx.beginPath();


        ctx.moveTo(
            g.x+
            g.width*.03,

            g.y+
            2
        );


        ctx.lineTo(
            g.x+
            g.width*.97,

            g.y+
            2
        );


        ctx.stroke();
    }

}


/* ============================================================
   WALL
============================================================ */

function drawWall(){

    const count =
        wallCount();


    const spacing =
        Math.min(
            state.width*.055,
            60
        );


    const start =
        state.width/2-
        (
            count-1
        )*
        spacing/2;


    const y =
        state.height*.50;


    for(
        let i=0;
        i<count;
        i++
    ){

        drawWallPerson(
            start+
            i*spacing,
            y
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
        state.width/2,
        y+40
    );

}


function drawWallPerson(
    x,
    y
){

    ctx.save();


    ctx.translate(
        x,
        y
    );


    ctx.strokeStyle =
        "#121b15";


    ctx.lineWidth=
        7;


    ctx.beginPath();


    ctx.moveTo(
        -5,
        14
    );


    ctx.lineTo(
        -8,
        33
    );


    ctx.moveTo(
        5,
        14
    );


    ctx.lineTo(
        8,
        33
    );


    ctx.stroke();


    ctx.fillStyle =
        "#324d9b";


    ctx.fillRect(
        -11,
        -10,
        22,
        27
    );


    ctx.fillStyle =
        "#ca8b67";


    ctx.beginPath();


    ctx.arc(
        0,
        -22,
        8,
        0,
        Math.PI*2
    );


    ctx.fill();


    ctx.restore();

}


/* ============================================================
   PLAYER
============================================================ */

function drawPlayer(){

    if(
        state.mode===
        "keeper"
    ){

        return;
    }


    const x =
        state.width/2;

    const y =
        state.height*.82;


    const p =
        currentPlayer();


    ctx.save();


    ctx.translate(
        x,
        y
    );


    /*
      Shadow
    */

    ctx.fillStyle =
        "#00000044";


    ctx.beginPath();


    ctx.ellipse(
        0,
        25,
        33,
        8,
        0,
        0,
        Math.PI*2
    );


    ctx.fill();


    /*
      Legs
    */

    ctx.strokeStyle =
        "#f6f6f6";


    ctx.lineWidth=
        10;


    ctx.beginPath();


    ctx.moveTo(
        -9,
        9
    );


    ctx.lineTo(
        -15,
        35
    );


    ctx.moveTo(
        9,
        9
    );


    ctx.lineTo(
        15,
        35
    );


    ctx.stroke();


    /*
      Shirt
    */

    ctx.fillStyle =
        p.color;


    ctx.fillRect(
        -22,
        -31,
        44,
        44
    );


    /*
      Head
    */

    ctx.fillStyle =
        "#d09a70";


    ctx.beginPath();


    ctx.arc(
        0,
        -49,
        15,
        0,
        Math.PI*2
    );


    ctx.fill();


    /*
      Hair
    */

    ctx.fillStyle =
        "#21160d";


    ctx.beginPath();


    ctx.arc(
        0,
        -54,
        14,
        Math.PI,
        Math.PI*2
    );


    ctx.fill();


    /*
      Arms
    */

    ctx.strokeStyle =
        "#25362c";


    ctx.lineWidth=
        7;


    ctx.beginPath();


    ctx.moveTo(
        -17,
        -13
    );


    ctx.lineTo(
        -30,
        3
    );


    ctx.moveTo(
        17,
        -13
    );


    ctx.lineTo(
        30,
        3
    );


    ctx.stroke();


    ctx.restore();

}


/* ============================================================
   KEEPER
============================================================ */

function drawKeeper(){

    ctx.save();


    ctx.translate(
        keeper.x,
        keeper.y
    );


    ctx.rotate(
        keeper.dive
    );


    /*
      Shadow
    */

    ctx.fillStyle =
        "#00000044";


    ctx.beginPath();


    ctx.ellipse(
        0,
        34,
        40,
        9,
        0,
        0,
        Math.PI*2
    );


    ctx.fill();


    /*
      Legs
    */

    ctx.strokeStyle =
        "#131f17";


    ctx.lineWidth=
        12;


    ctx.beginPath();


    ctx.moveTo(
        -10,
        11
    );


    ctx.lineTo(
        -18,
        43
    );


    ctx.moveTo(
        10,
        11
    );


    ctx.lineTo(
        18,
        43
    );


    ctx.stroke();


    /*
      Shirt
    */

    const shirt =
        ctx.createLinearGradient(
            -25,
            -30,
            25,
            30
        );


    shirt.addColorStop(
        0,
        "#ffe628"
    );


    shirt.addColorStop(
        1,
        "#e39300"
    );


    ctx.fillStyle =
        shirt;


    ctx.fillRect(
        -25,
        -30,
        50,
        50
    );


    /*
      Head
    */

    ctx.fillStyle =
        "#d59a70";


    ctx.beginPath();


    ctx.arc(
        0,
        -47,
        17,
        0,
        Math.PI*2
    );


    ctx.fill();


    /*
      Hair
    */

    ctx.fillStyle =
        "#24170e";


    ctx.beginPath();


    ctx.arc(
        0,
        -53,
        16,
        Math.PI,
        Math.PI*2
    );


    ctx.fill();


    /*
      Arms
    */

    ctx.strokeStyle =
        "#ffcb18";


    ctx.lineWidth=
        12;


    ctx.beginPath();


    ctx.moveTo(
        -20,
        -15
    );


    ctx.lineTo(
        -45,
        3
    );


    ctx.moveTo(
        20,
        -15
    );


    ctx.lineTo(
        45,
        3
    );


    ctx.stroke();


    /*
      Gloves
    */

    ctx.fillStyle =
        "#ffffff";


    ctx.beginPath();


    ctx.arc(
        -45,
        3,
        9,
        0,
        Math.PI*2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.arc(
        45,
        3,
        9,
        0,
        Math.PI*2
    );


    ctx.fill();


    ctx.restore();

}


/* ============================================================
   BALL
============================================================ */

function drawBall(){

    ctx.save();


    const r =
        ball.radius;


    ctx.shadowColor =
        "#000b";


    ctx.shadowBlur=
        12;


    const gradient =
        ctx.createRadialGradient(
            ball.x-r*.35,
            ball.y-r*.45,
            2,
            ball.x,
            ball.y,
            r
        );


    gradient.addColorStop(
        0,
        "#ffffff"
    );


    gradient.addColorStop(
        1,
        "#b8c1bb"
    );


    ctx.fillStyle =
        gradient;


    ctx.beginPath();


    ctx.arc(
        ball.x,
        ball.y,
        r,
        0,
        Math.PI*2
    );


    ctx.fill();


    ctx.shadowBlur=0;


    ctx.fillStyle =
        "#222";


    ctx.beginPath();


    ctx.arc(
        ball.x-r*.2,
        ball.y-r*.15,
        r*.22,
        0,
        Math.PI*2
    );


    ctx.fill();


    ctx.strokeStyle =
        "#222";


    ctx.lineWidth=
        1.5;


    ctx.stroke();


    ctx.restore();

}


/* ============================================================
   TARGET
============================================================ */

function drawTarget(){

    if(
        !state.exactTarget
    ){

        return;
    }


    if(
        state.busy
    ){

        return;
    }


    if(
        state.mode!==
            "longshot" &&
        state.mode!==
            "crossbar"
    ){

        return;
    }


    const target =
        state.exactTarget;


    ctx.save();


    ctx.strokeStyle =
        state.mode===
        "crossbar"
            ? "#ffe35e"
            : "#ffffff";


    ctx.lineWidth=
        3;


    ctx.shadowColor =
        "#000";


    ctx.shadowBlur=
        10;


    ctx.beginPath();


    ctx.arc(
        target.x,
        target.y,
        18,
        0,
        Math.PI*2
    );


    ctx.stroke();


    ctx.beginPath();


    ctx.moveTo(
        target.x-25,
        target.y
    );


    ctx.lineTo(
        target.x+25,
        target.y
    );


    ctx.moveTo(
        target.x,
        target.y-25
    );


    ctx.lineTo(
        target.x,
        target.y+25
    );


    ctx.stroke();


    ctx.restore();

}


/* ============================================================
   KEEPER POV
============================================================ */

function drawKeeperPOV(){

    const w =
        state.width;

    const h =
        state.height;


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            h
        );


    gradient.addColorStop(
        0,
        "#15763a"
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
        w,
        h
    );


    /*
      Goal
    */

    ctx.strokeStyle =
        "#ffffff";


    ctx.lineWidth=
        8;


    ctx.strokeRect(
        w*.09,
        h*.08,
        w*.82,
        h*.62
    );


    /*
      Net
    */

    ctx.strokeStyle =
        "#ffffff28";


    ctx.lineWidth=
        1;


    for(
        let x=0;
        x<=w;
        x+=28
    ){

        ctx.beginPath();

        ctx.moveTo(
            x,
            h*.08
        );

        ctx.lineTo(
            x,
            h*.70
        );

        ctx.stroke();

    }


    for(
        let y=h*.08;
        y<=h*.70;
        y+=22
    ){

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            w,
            y
        );

        ctx.stroke();

    }


    /*
      Ball
    */

    if(
        state.keeperActive
    ){

        ctx.shadowColor =
            "#ffffff";


        ctx.shadowBlur=
            18;


        ctx.fillStyle =
            "#ffffff";


        ctx.beginPath();


        ctx.arc(
            ball.x,
            ball.y,
            ball.radius,
            0,
            Math.PI*2
        );


        ctx.fill();


        ctx.shadowBlur=0;

    }


    /*
      Gloves
    */

    ctx.fillStyle =
        "#ffffff";


    ctx.beginPath();


    ctx.ellipse(
        w*.16,
        h*.90,
        60,
        28,
        -.30,
        0,
        Math.PI*2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.ellipse(
        w*.84,
        h*.90,
        60,
        28,
        .30,
        0,
        Math.PI*2
    );


    ctx.fill();


    ctx.fillStyle =
        "#00000066";


    ctx.fillRect(
        0,
        h-55,
        w,
        55
    );


    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 18px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(
        keeperSelect.value===
        "Hassan Ali"

            ? "HASSAN ALI — 300 GK STATS"

            : "GOALKEEPER POV",

        w/2,
        h-25
    );

}


/* ============================================================
   DRAW
============================================================ */

function draw(){

    ctx.clearRect(
        0,
        0,
        state.width,
        state.height
    );


    if(
        state.mode===
        "keeper"
    ){

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


/* ============================================================
   GAME LOOP
============================================================ */

function update(
    dt,
    time
){

    if(
        state.paused||
        state.result
    ){

        return;
    }


    updateParticles(
        dt
    );


    if(
        state.mode===
        "keeper"
    ){

        updateKeeper(
            time
        );

    }else{

        updateShot(
            time
        );
    }

}


function gameLoop(
    time
){

    const dt =
        clamp(
            (
                time-
                state.lastTime
            )/
            1000,

            0,

            .033
        );


    state.lastTime =
        time;


    update(
        dt,
        time
    );


    draw();


    requestAnimationFrame(
        gameLoop
    );

}


/* ============================================================
   MODE BUTTONS
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

                    const mode =
                        button.dataset.mode;


                    state.mode =
                        mode;


                    state.busy=
                        false;

                    state.result=
                        false;

                    state.keeperActive=
                        false;

                    state.exactTarget=
                        null;


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
                            item=>{

                                item.classList.toggle(
                                    "active",

                                    item.dataset.mode===
                                        mode
                                );

                            }
                        );


                    shootControls
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


                    keeperControls
                        .classList
                        .toggle(
                            "hidden",

                            mode!==
                                "keeper"
                        );


                    exactShootButton
                        .classList
                        .toggle(
                            "hidden",

                            mode!==
                                "longshot"&&
                            mode!==
                                "crossbar"
                        );


                    precisionCard
                        .classList
                        .add(
                            "hidden"
                        );


                    if(
                        mode===
                        "penalty"
                    ){

                        modeTitle.textContent =
                            "PENALTY SHOOTOUT";

                        distance.textContent =
                            "Distance: 11 m";

                        setMessage(
                            "CHOOSE YOUR SHOT",
                            "LEFT • CENTER • RIGHT"
                        );

                    }


                    if(
                        mode===
                        "freekick"
                    ){

                        modeTitle.textContent =
                            "FREE KICK";

                        distance.textContent =
                            "Distance: "+
                            (
                                20+
                                state.level*2
                            )+
                            " m";

                        setMessage(
                            "BEND IT AROUND THE WALL",
                            "Use curve to beat the wall."
                        );

                    }


                    if(
                        mode===
                        "longshot"
                    ){

                        modeTitle.textContent =
                            "LONG SHOT";

                        distance.textContent =
                            "Distance: "+
                            (
                                25+
                                state.level*3
                            )+
                            " m";

                        setMessage(
                            "CHOOSE YOUR EXACT TARGET",
                            "Tap inside the goal."
                        );

                    }


                    if(
                        mode===
                        "crossbar"
                    ){

                        modeTitle.textContent =
                            "CROSSBAR CHALLENGE";

                        distance.textContent =
                            "Distance: "+
                            (
                                23+
                                state.level*2
                            )+
                            " m";

                        setMessage(
                            "HIT THE CROSSBAR",
                            "Tap the bar and press SHOOT."
                        );

                    }


                    if(
                        mode===
                        "keeper"
                    ){

                        modeTitle.textContent =
                            "GOALKEEPER POV";

                        distance.textContent =
                            "INCOMING SHOT";

                        setMessage(
                            "GET READY! 🧤",
                            "Watch the ball!"
                        );


                        startKeeperMode();

                    }


                    updateHUD();

                }
            );

        }
    );


/* ============================================================
   SHOOT BUTTONS
============================================================ */

document
    .querySelectorAll(
        "#shootControls .shot-button"
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
   KEEPER BUTTONS
============================================================ */

document
    .querySelectorAll(
        "#keeperControls .shot-button"
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
   EXACT TARGET SHOOT
============================================================ */

canvas.addEventListener(
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

            return;
        }


        if(
            state.mode===
            "keeper"
        ){

            const rect =
                canvas.getBoundingClientRect();


            const x =
                event.clientX-
                rect.left;


            const zone =
                x<
                state.width/3

                    ? "left"

                    :
                    x<
                    state.width*2/3

                        ? "center"

                        : "right";


            keeperSave(
                zone
            );

        }

    },
    {
        passive:false
    }
);


exactShootButton.addEventListener(
    "click",
    shootExact
);


/* ============================================================
   SELECTS
============================================================ */

playerSelect.addEventListener(
    "change",
    ()=>{

        updatePlayerUI();

        resetRound();

    }
);


keeperSelect.addEventListener(
    "change",
    ()=>{

        updatePlayerUI();

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

        resizeCanvas();

        resetRound();

    }
);


/* ============================================================
   RESET ROUND
============================================================ */

function resetRound(){

    clearTimeout(
        state.timer
    );


    state.busy=
        false;

    state.result=
        false;

    state.keeperActive=
        false;

    state.exactTarget=
        null;


    resultOverlay
        .classList
        .add(
            "hidden"
        );


    const d =
        currentDifficulty();


    state.wind =
        random(
            -d.wind,
            d.wind
        );


    positionObjects();


    updateHUD();


    if(
        state.mode===
        "keeper"
    ){

        startKeeperMode();

    }


    if(
        state.mode===
        "penalty"
    ){

        setMessage(
            "CHOOSE YOUR SHOT",
            "LEFT • CENTER • RIGHT"
        );

    }


    if(
        state.mode===
        "freekick"
    ){

        setMessage(
            "BEND IT AROUND THE WALL",
            "Free-kick wall active."
        );

    }


    if(
        state.mode===
        "longshot"
    ){

        setMessage(
            "CHOOSE YOUR EXACT TARGET",
            "Tap inside the goal."
        );

    }


    if(
        state.mode===
        "crossbar"
    ){

        setMessage(
            "HIT THE CROSSBAR",
            "Choose a target."
        );

    }

}


/* ============================================================
   PAUSE
============================================================ */

pauseButton.addEventListener(
    "click",
    ()=>{

        state.paused=
            !state.paused;


        pauseOverlay
            .classList
            .toggle(
                "hidden",
                !state.paused
            );


        pauseButton.textContent =
            state.paused
                ? "▶ RESUME"
                : "⏸ PAUSE";

    }
);


resumeButton.addEventListener(
    "click",
    ()=>{

        state.paused=
            false;


        pauseOverlay
            .classList
            .add(
                "hidden"
            );


        pauseButton.textContent =
            "⏸ PAUSE";

    }
);


/* ============================================================
   RESULT CONTINUE
============================================================ */

continueButton.addEventListener(
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
   SOUND
============================================================ */

let audioContext =
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

            audioContext =
                new(
                    window.AudioContext||
                    window.webkitAudioContext
                )();

        }


        return audioContext;

    }catch{

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


        gain.gain.setValueAtTime(
            .001,
            audio.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            .10,
            audio.currentTime+
            .01
        );


        gain.gain.exponentialRampToValueAtTime(
            .001,
            audio.currentTime+
            duration
        );


        oscillator.connect(
            gain
        );


        gain.connect(
            audio.destination
        );


        oscillator.start();


        oscillator.stop(
            audio.currentTime+
            duration
        );

    }catch{

        /* Audio is optional. */
    }

}


function goalSound(){

    beep(
        523,
        .08,
        "triangle"
    );


    setTimeout(
        ()=>{

            beep(
                659,
                .09,
                "triangle"
            );

        },
        80
    );


    setTimeout(
        ()=>{

            beep(
                784,
                .18,
                "triangle"
            );

        },
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
        ()=>{

            beep(
                120,
                .16,
                "square"
            );

        },
        100
    );

}


soundButton.addEventListener(
    "click",
    ()=>{

        state.sound=
            !state.sound;


        soundButton.textContent =
            state.sound
                ? "🔊 SOUND ON"
                : "🔇 SOUND OFF";

    }
);


/* ============================================================
   RESTART
============================================================ */

restartButton.addEventListener(
    "click",
    ()=>{

        clearTimeout(
            state.timer
        );


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

        state.bestCombo=
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


        pauseButton.textContent =
            "⏸ PAUSE";


        updateHUD();

        resetRound();


        setMessage(
            "GAME RESTARTED! ⚽",
            "New match!"
        );

    }
);


/* ============================================================
   WINDOW EVENTS
============================================================ */

window.addEventListener(
    "resize",
    resizeCanvas
);


window.addEventListener(
    "orientationchange",
    ()=>{

        setTimeout(
            resizeCanvas,
            150
        );

    }
);


/* ============================================================
   START GAME
============================================================ */

updatePlayerUI();

resizeCanvas();

resetRound();

requestAnimationFrame(
    gameLoop
);
