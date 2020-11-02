class ConnectionManager {
    constructor(snakeManager) {
        this.conn = null;
        this.peers = new Map;
        this.snakeManager = snakeManager;
        this.localSnake = snakeManager.instances[0];
    }

    connect(address) {
        this.conn = new WebSocket(address);

        this.conn.addEventListener("open", () => {
            console.log("Connection established");
            this.initSession();
            this.watchEvents();
        });

        this.conn.addEventListener("message", event => {
            console.log("Received message", event.data);
            this.receive(event.data);
        });
    }

    initSession() {
        const sessionId = window.location.hash.split("#")[1];
        const state = this.localSnake.serialize();
        if(sessionId) {
            this.send({
                type: "join-session",
                id: sessionId,
                state,
            });
        } else {
            this.send({
                type: "create-session",
                state,
            });
        }
    }

    updateManager(peers) {
        const me = peers.you;
        console.log("PEERS", peers);
        const clients = peers.clients.filter(client => me !== client.id);
        console.log("CLIENTS", clients);
        clients.forEach(client => {
            if(!this.peers.has(client.id)) { // Shouldnt it be this.peers.clients.has() ?
                const snake = this.snakeManager.createPlayer();
                snake.unserialize(client.state);
                this.peers.set(client.id, snake);
                console.log("SET NEW PEER"); // This never runs
            }
        });

        [...this.peers.entries()].forEach(([id, snake]) => {
            if (!clients.some(client => client.id === id)) {
                this.snakeManager.removePlayer(snake);
                this.peers.delete(id);
            }
        });

        const local = this.snakeManager.instances[0];
        const sorted = peers.clients.map(client => this.peers.get(client.id) || local);
        this.snakeManager.sortPlayers(sorted);
    }

    updatePeer(id, fragment, [key, value]) {
        if (!this.peers.has(id)) {
            throw new Error("Client does not exist", id);
        }

        const snake = this.peers.get(id);
        snake[fragment][key] = value;

        if (key === "highscore") {
            snake.updateHighscore(value);
        } else {
            snake.draw();
        }
    }

    watchEvents() {
        const local = this.snakeManager.instances[0];

        const player = local.player;
        ["move", "highscore"].forEach(key => {
            player.events.listen(key, () => {
                this.send({
                    type: "state-update",
                    fragment: "player",
                    state: [key, player[key]],
                });
            });
        });

        // const arena = local.arena;
        // ["spawn-apple"].forEach(key => {
        //     arena.events.listen(key, () => {
        //         this.send({
        //             type: "state-update",
        //             fragment: "arena",
        //             state: [key, arena[key]],
        //         });
        //     });
        // });a
    }

    receive(msg) {
        const data = JSON.parse(msg);
        if(data.type === "session-created") {
            window.location.hash = data.id;
        } else if (data.type === "session-broadcast") {
            this.updateManager(data.peers);
        } else if (data.type === "state-update") {
            this.updatePeer(data.clientId, data.fragment, data.state);
        }
    }

    send(data) {
        const msg = JSON.stringify(data);
        console.log("Sending message", msg);
        this.conn.send(msg);
    }
}
