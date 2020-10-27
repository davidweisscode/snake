const snakes = [];
const playerElements = document.querySelectorAll(".player");
[...playerElements].forEach(playerElement => {
    const snake = new Snake(playerElement);
    snakes.push(snake);
});

document.addEventListener("keydown", event => {
    [
        ["w", "s", "d", "a"],
        ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"],
    ].forEach((keyset, index) => {
        const player = snakes[index].player;
        if (player.controlLock) { return; }
        if (event.key === keyset[0]) {
            if (player.dir.y !== 1) {
                player.dir = {x: 0, y: -1};
            }
        } else if (event.key === keyset[1]) {
            if (player.dir.y !== -1) {
                player.dir = {x: 0, y: 1};
            }
        } else if (event.key === keyset[2]) {
            if (player.dir.x !== -1) {
                player.dir = {x: 1, y: 0};
            }
        } else if (event.key === keyset[3]) {
            if (player.dir.x !== 1) {
                player.dir = {x: -1, y: 0};
            }
        }
        player.controlLock = true;
    });
});
