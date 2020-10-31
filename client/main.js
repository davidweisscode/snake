const snakeManager = new SnakeManager(document);
const localSnake = snakeManager.createPlayer();
localSnake.playerElement.classList.add("local");

const connectionManager = new ConnectionManager(snakeManager);
connectionManager.connect("ws://localhost:9000");

document.addEventListener("keydown", event => {
    [
        ["w", "s", "d", "a"],
        ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"],
    ].forEach((keys, index) => {
        const player = localSnake.player;
        if (player.controlLock) { return; }
        if (event.key === keys[0]) {
            if (player.dir.y !== 1) {
                player.dir = {x: 0, y: -1};
            }
        } else if (event.key === keys[1]) {
            if (player.dir.y !== -1) {
                player.dir = {x: 0, y: 1};
            }
        } else if (event.key === keys[2]) {
            if (player.dir.x !== -1) {
                player.dir = {x: 1, y: 0};
            }
        } else if (event.key === keys[3]) {
            if (player.dir.x !== 1) {
                player.dir = {x: -1, y: 0};
            }
        }
        player.controlLock = true;
    });
});
