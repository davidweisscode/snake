class Player {
    constructor(snake) {
        this.hist = [
            {x: 5, y: 5},
            {x: 6, y: 5},
            {x: 7, y: 5},
        ];
        this.dir = {x: 1, y: 0};
        this.size = 3;
        this.highscore = 0;
        this.moveInterval = 500;
        this.moveAccumulator = 0;
        this.controlLock = false;
        this.snake = snake;
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
        this.moveAccumulator = 0;
        this.controlLock = false;
        this.hist.push({
            x: this.getPos().x + this.dir.x,
            y: this.getPos().y + this.dir.y
        });
    }

    collide() {
        // Wall
        if (this.getPos().x < 0 || this.getPos().x > 19 ||
            this.getPos().y < 0 || this.getPos().y > 19) {
                this.snake.feedback("collide");
                this.reset();
        }

        // Apple
        if (this.getPos().x === this.snake.apple.x && this.getPos().y === this.snake.apple.y) {
            this.snake.feedback("chomp");
            this.size += 1;
            this.moveInterval -= 50 * (this.moveInterval / 500);
            this.spawnApple();
        }

        // Self
        if (this.getBody().filter(ele => ele.x === this.getPos().x && ele.y === this.getPos().y).length > 1) {
            this.snake.feedback("collide");
            this.reset();
        }
    }

    spawnApple() {
        let _x = Math.floor(Math.random() * 20);
        let _y = Math.floor(Math.random() * 20);

        while (this.getBody().filter(bodypart => bodypart.x === _x && bodypart.y === _y).length > 0) {
            _x = Math.floor(Math.random() * 20);
            _y = Math.floor(Math.random() * 20);
        }

        this.snake.apple = {x: _x, y: _y};
    }

    reset() {
        this.hist = [
            {x: 5, y: 5},
            {x: 6, y: 5},
            {x: 7, y: 5},
        ];
        this.dir = {x: 1, y: 0};
        if (this.size > this.highscore) {
            this.highscore = this.size;
            this.snake.playerElement.querySelector(".highscore").innerHTML = "Highscore: " + this.highscore;
        }
        this.size = 3;
        this.moveInterval = 500;
    }

}
