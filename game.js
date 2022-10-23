const SETTINGS = {
    FPS: 60,
    winScore: 7,

    smallFont: "10px retro",
    largeFont: "14px retro",
    scoreboardColour: "black",

    buttonColour: "white",
    buttonTextColour: "black",

    paddleSound: '/Sounds/Paddle.wav',
    wallSound: '/Sounds/Wall.wav',
    scoreSound: '/Sounds/Score.wav',

    fps: 60,
    courtColour: "black",
    wallColour: "white",
    wallSize: 20,
    courtMarginX: 12,
    courtMarginY: 4,

    width: innerWidth,
    height: innerHeight,

    paddleColour: "white",
    paddleWidth: 12,
    paddleHeight: 48,
}

const PLAYERS = {
    playerOne: 1,
    playerTwo: 2
}

class Game {

    constructor(canvas) {
        this.canvas = canvas;
        this.court = new Court(this.canvas);
    }

    start() {
        let previousTime = Date.now();
        let now;
        let dT;
        let that = this;

        setInterval(function() {

            now = Date.now();
            dT = (now - previousTime) / 1000.0;

            // Update
            that.draw()

            previousTime = now;

        }, 1/SETTINGS.FPS * 1000);
    }

    draw() {
        let ctx = this.canvas.getContext('2d')
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.court.draw()
    }
}

class ScoreBoard {

}

class Paddle {

    constructor(canvas, court, x, y, player) {
        this.x = x
        this.y = y
        this.width = SETTINGS.paddleWidth;
        this.height = SETTINGS.paddleHeight;
        this.player = player
        this.court = court;
        this.canvas = canvas;
    }

    draw() {
        let ctx = this.canvas.getContext('2d');
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
}

class PaddleController {
    
}

class AIController {
    
}

class Court {

    constructor(canvas) {
        this.canvas = canvas;

        this.playerOne = new Paddle(this.canvas, this, 10, 40, 0);
        this.playerTwo = new Paddle(this.canvas, this, SETTINGS.width - 20, 40, 1);

        this.ball = new Ball(this.canvas, this, SETTINGS.width / 2, SETTINGS.height / 2, 10);
        
    }

    draw() {
        let ctx = this.canvas.getContext('2d')

        // Fill background
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,SETTINGS.width, SETTINGS.height);

        // Fill top border
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(0,0, SETTINGS.width, 20);

        // Fill bottom border
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(0, SETTINGS.height - 20, SETTINGS.width, 20);

        // Fill bottom border
        
        ctx.setLineDash([10]);
        ctx.beginPath();
        ctx.moveTo(SETTINGS.width / 2, 0);
        ctx.lineTo(SETTINGS.width / 2, SETTINGS.height);
        ctx.strokeStyle = "#00ff00"
        ctx.stroke();

        this.playerOne.draw();
        this.playerTwo.draw();

        this.ball.draw();
    }
    
}

class Ball {
    
    constructor(canvas, court, x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius

        this.court = court;
        this.canvas = canvas;
    }

    draw() {
        let ctx = this.canvas.getContext('2d')

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    get left() {return this.x}
    get right() {return this.x + this.width}
    get top() {return this.y}
    get bottom() {return this.y + this.height}

    overlaps(other) {
        return other.left < this.right &&
        this.left < other.right &&
        other.top < this.bottom &&
        this.top < other.bottom
    }

    contains(x, y) {
        return this.left < x && this.right > x && this.top < y && this.bottom > y
    }

}




const canvas = document.getElementById("game")
canvas.width = SETTINGS.width;
canvas.height = SETTINGS.height;
let game = new Game(canvas);
game.start();