const snakeManager = new SnakeManager(document);
const snakeLocal = snakeManager.createPlayer();
snakeLocal.playerElement.classList.add("local");
snakeLocal.run();

const connectionManager = new ConnectionManager(snakeManager);
connectionManager.connect("ws://localhost:9000");
// connectionManager.connect("ws://" + window.location.hostname + ":9000");

const keyListener = (event) => {
    [
        ["w", "s", "d", "a"],
        // ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"],
    ].forEach((keys, index) => {
        const player = snakeLocal.player;
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
};

document.addEventListener("keydown", keyListener);
