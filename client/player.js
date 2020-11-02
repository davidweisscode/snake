class Player {
    constructor(snake) {
        this.events = new Events();
        this.snake = snake;
        this.arena = snake.arena;
        this.moveInterval = 500;
        this.moveAccumulator = 0;
        this.controlLock = false;

        this.hist = [
            {x: 5, y: 5},
            {x: 6, y: 5},
            {x: 7, y: 5},
        ];
        this.dir = {x: 1, y: 0};
        this.size = this.hist.length;
        this.highscore = 0;

        this.reset();
    }

    getPos() {
        return this.hist[this.hist.length - 1];
    }

    getBody() {
        return this.hist.slice(this.hist.length - this.size, this.hist.length);
    }

    update(deltaTime) {
        this.moveAccumulator += deltaTime;
        if (this.moveAccumulator > this.moveInterval) {
            this.move();
            this.collide();
        }
    }

    move() {
        // Diff: Collide here?
        const newpos = {
            x: this.getPos().x + this.dir.x,
            y: this.getPos().y + this.dir.y,
        };
        this.hist.push(newpos);
        this.moveAccumulator = 0;
        this.controlLock = false;
        this.events.emit("move", newpos); // emit here newpos or new hist ?
    }

    collide() {
        // Wall
        if (this.getPos().x < 0 || this.getPos().x > 19 ||
            this.getPos().y < 0 || this.getPos().y > 19) {
                this.snake.feedback("collide");
                this.reset();
        }

        // Self
        if (this.getBody().filter(ele => ele.x === this.getPos().x && ele.y === this.getPos().y).length > 1) {
            this.snake.feedback("collide");
            this.reset();
        }

        // Apple
        if (this.getPos().x === this.arena.apple.x && this.getPos().y === this.arena.apple.y) {
            this.snake.feedback("chomp");
            this.size += 1;
            this.moveInterval -= 50 * (this.moveInterval / 500);
            this.arena.spawnApple();
        }
    }

    reset() {
        if (this.size > this.highscore) {
            this.highscore = this.size;
            this.events.emit("highscore", this.highscore);
        }
        this.hist = [
            {x: 5, y: 5},
            {x: 6, y: 5},
            {x: 7, y: 5},
        ];
        this.dir = {x: 1, y: 0};
        this.size = 3;
        this.moveInterval = 500;
    }

}
