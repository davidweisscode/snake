class Snake {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.context.scale(20, 20);

        this.player = new Player(this);

        this.deltaTime = 0;
        this.lastTime = 0;
        this.accumulator = 0;

        this.apple = {x: 9, y: 5};

        let lastTime = 0;
        this._update = (time = 0) => {
            this.player.update(time - lastTime);
            lastTime = time;
            this.draw();
            requestAnimationFrame(this._update);
        };
    }

    draw() {
        this.context.fillStyle = "#555";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "green";
        this.player.getBody().forEach(bodypart => {
            this.context.fillRect(bodypart.x, bodypart.y, 1, 1);
        });

        this.context.fillStyle = "#f32";
        this.context.fillRect(this.apple.x, this.apple.y, 1, 1);
    }

    feedback(event) {
        document.getElementById("arena").classList.add(event);//canvas
        setTimeout(() => document.getElementById("arena").classList.remove(event), 50);
    }

}
