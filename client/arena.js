class Arena {
    constructor() {
        this.events = new Events();
        this.apple = {x: 9, y: 5};
    }

    spawnApple() {
        let _x = Math.floor(Math.random() * 20);
        let _y = Math.floor(Math.random() * 20);

        // TODO Access player methods in arena (same hierarchy) ?!
        // while (this.player.getBody().filter(bodypart => bodypart.x === _x && bodypart.y === _y).length > 0) {
        //     _x = Math.floor(Math.random() * 20);
        //     _y = Math.floor(Math.random() * 20);
        // }

        this.apple = {x: _x, y: _y};
        this.events.emit("spawn-apple", this.apple);
    }
}
