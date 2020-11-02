class Snake {
    constructor(playerElement) {
        this.playerElement = playerElement;
        this.canvas = playerElement.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.context.scale(20, 20);

        this.arena = new Arena();
        this.player = new Player(this);
        this.player.events.listen("highscore", highscore => {
            this.updateHighscore(highscore);
        });

        // this.apple = {x: 9, y: 5}; // in arena?

        let lastTime = 0;
        this._update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;
            this.player.update(deltaTime);
            this.draw();
            requestAnimationFrame(this._update);
        };
        this.updateHighscore(0);
    }

    draw() {
        // Background
        this.context.fillStyle = "#111";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Snake
        this.context.fillStyle = "green";
        this.player.getBody().forEach(bodypart => {
            this.context.fillRect(bodypart.x, bodypart.y, 1, 1);
        });

        // Apple
        this.context.fillStyle = "#f32";
        this.context.fillRect(this.arena.apple.x, this.arena.apple.y, 1, 1);
    }

    run() {
        this._update();
    }

    serialize() {
        return {
            arena: {
                apple: this.arena.apple,
            },
            player: {
                hist: this.player.hist,
                size: this.player.size,
                highscore: this.player.highscore,
            },
        };
    }

    unserialize(state) {
        this.arena = Object.assign(state.arena);
        this.player = Object.assign(state.player);
        this.updateHighscore(this.player.highscore);
        this.draw();
    }

    feedback(event) {
        this.canvas.classList.add(event);
        setTimeout(() => this.canvas.classList.remove(event), 50);
    }

    updateHighscore(highscore) {
        this.playerElement.querySelector(".highscore").innerText = "Highscore: " + highscore;
    }

}
