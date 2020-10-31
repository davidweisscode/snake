class SnakeManager {
    constructor(document) {
        this.document = document;
        this.template = this.document.getElementById("player-template");
        this.instances = [];
    }

    createPlayer() {
        const playerElement = this.document
            .importNode(this.template.content, true)
            .children[0];

        const snake = new Snake(playerElement);
        this.instances.push(snake);

        this.document.body.appendChild(snake.playerElement);

        return snake;
    }

    removePlayer(snake) {
        this.instances = this.instances.filter(instance => instance !== snake);
        this.document.body.removeChild(snake.playerElement);
    }
}
