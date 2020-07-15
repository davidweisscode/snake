const canvas = document.getElementById("arena");
const context = canvas.getContext("2d");

context.scale(20, 20);

let moveInterval = 500;
let deltaTime = 0;
let lastTime = 0;
let accumulator = 0;

function collide() {
    // Wall
    if (player.pos.x < 0 || player.pos.x > 19 ||
        player.pos.y < 0 || player.pos.y > 19) {
            feedback("collide");
            playerReset();
    }

    // Apple
    if (player.pos.x === apple.pos.x && player.pos.y === apple.pos.y) {
        console.log("Chomp")
        feedback("chomp");
        player.size += 1;
        moveInterval -= 50 * (moveInterval / 500);
        spawnApple();
    }

    // Self
    if (player.body.filter(ele => ele.x === player.pos.x && ele.y === player.pos.y).length > 1) {
        console.log("Touchy");
            feedback("collide");
            playerReset();
    }
}

function draw() {
    context.fillStyle = "#555";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "green";
    player.body.forEach(bodypart => {
        context.fillRect(bodypart.x, bodypart.y, 1, 1);
    });

    context.fillStyle = "#f32";
    context.fillRect(apple.pos.x, apple.pos.y, 1, 1);
}

function feedback(event) {
    document.getElementById("arena").classList.add(event);
    setTimeout(() => document.getElementById("arena").classList.remove(event), 50);
}

function update(time = 0) {
    deltaTime = time - lastTime;
    accumulator += deltaTime;
    if (accumulator > moveInterval) {
        playerMove();
        collide()
        accumulator = 0;
        controlLock = false;
    }
    lastTime = time;
    draw()
    requestAnimationFrame(update);
}

function playerMove() {
    player.pos.x += player.dir.x;
    player.pos.y += player.dir.y;
    player.hist.push({x: player.pos.x, y: player.pos.y});
    player.body = player.hist.slice(player.hist.length - player.size, player.hist.length);
}

function playerReset() {
    console.log("Reset")
    player.pos = {x: 7, y: 5};
    player.dir = {x: 1, y: 0};
    player.hist = [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 7, y: 5},
    ];
    if (player.size > player.highscore) {
        player.highscore = player.size;
        document.getElementById("highscore").innerHTML = "Highscore: " + player.highscore;
    }
    player.size = 3;
    moveInterval = 500;
}

function spawnApple() {
    let _x = Math.floor(Math.random() * 10);
    let _y = Math.floor(Math.random() * 10);

    while (player.body.filter(bodypart => bodypart.x === _x && bodypart.y === _y).length > 0) {
        console.log("try new apple pos");
        _x = Math.floor(Math.random() * 10);
        _y = Math.floor(Math.random() * 10);
    }

    apple.pos = {x: _x, y: _y};
}

let controlLock = false;

const player = {
    pos: {x: 7, y: 5},
    dir: {x: 1, y: 0},
    hist: [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 7, y: 5},
    ],
    size: 3,
    body: [
        {x: 5, y: 5},
        {x: 6, y: 5},
        {x: 7, y: 5},
    ],
    highscore: 0,
}

const apple = {
    pos: {x: 9, y: 5},
}

document.addEventListener("keydown", event => {
    if (controlLock) { return; }
    if (event.key === "ArrowUp") {
        if (player.dir.y !== 1) {
            player.dir = {x: 0, y: -1};
        }
    } else if (event.key === "ArrowDown") {
        if (player.dir.y !== -1) {
            player.dir = {x: 0, y: 1};
        }
    } else if (event.key === "ArrowRight") {
        if (player.dir.x !== -1) {
            player.dir = {x: 1, y: 0};
        }
    } else if (event.key === "ArrowLeft") {
        if (player.dir.x !== 1) {
            player.dir = {x: -1, y: 0};
        }
    }
    controlLock = true;
});

update()
