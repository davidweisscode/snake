class SnakeManager {
    constructor(document) {
        this.document = document;
        this.template = this.document.querySelector("#player-template");
        this.instances = [];
    }

    createPlayer() {
        const playerElement = document
            .importNode(this.template.content, true)
            .children[0];

        const snake = new Snake(playerElement);
        this.document.body.appendChild(snake.playerElement);
        this.instances.push(snake);

        return snake;
    }

    removePlayer(snake) {
        this.document.body.removeChild(snake.playerElement);
        this.instances = this.instances.filter(instance => instance !== snake);
    }

    sortPlayers(snakes) {
        snakes.forEach(snake => {
            this.document.body.appendChild(snake.playerElement);
        });
    }
}
