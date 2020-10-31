class Snake {
    constructor(playerElement) {
        this.playerElement = playerElement;
        this.canvas = playerElement.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.context.scale(20, 20);

        this.player = new Player(this);

        this.apple = {x: 9, y: 5};

        let lastTime = 0;
        this._update = (time = 0) => {
            this.player.update(time - lastTime);
            lastTime = time;
            this.draw();
            requestAnimationFrame(this._update);
        };
        this._update();
    }

    draw() {
        this.context.fillStyle = "#111";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "green";
        this.player.getBody().forEach(bodypart => {
            this.context.fillRect(bodypart.x, bodypart.y, 1, 1);
        });

        this.context.fillStyle = "#f32";
        this.context.fillRect(this.apple.x, this.apple.y, 1, 1);
    }

    feedback(event) {
        this.canvas.classList.add(event);
        setTimeout(() => this.canvas.classList.remove(event), 50);
    }

}
