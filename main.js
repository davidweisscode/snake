const snake = new Snake(document.getElementById("arena"));

document.addEventListener("keydown", event => {
    if (snake.controlLock) { return; }
    if (event.key === "ArrowUp") {
        if (snake.player.dir.y !== 1) {
            snake.player.dir = {x: 0, y: -1};
        }
    } else if (event.key === "ArrowDown") {
        if (snake.player.dir.y !== -1) {
            snake.player.dir = {x: 0, y: 1};
        }
    } else if (event.key === "ArrowRight") {
        if (snake.player.dir.x !== -1) {
            snake.player.dir = {x: 1, y: 0};
        }
    } else if (event.key === "ArrowLeft") {
        if (snake.player.dir.x !== 1) {
            snake.player.dir = {x: -1, y: 0};
        }
    }
    snake.player.controlLock = true;
});

snake._update()
