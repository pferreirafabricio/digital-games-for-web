import GAME_STATE from "./gameState.js";

document.addEventListener("DOMContentLoaded", main);

/** @type {CanvasRenderingContext2D} */
let borders = 0;
let canvasContext = null;
let windowHeight = 0;
let windowWidth = 0;

const baseWidth = 1280;
const baseHeight = 720;
const maxJumps = 3;
let currentGameState = GAME_STATE.PLAY;

/**
 * Hold the reference of previous values by a key
 */
const previousObject = {};

const floor = {
    x: 0,
    y: baseHeight * 0.8
};

const player = {
    x: 50,
    y: 0,
    height: 50,
    width: 50,
    color: "#47fd",
    gravity: 1.6,
    velocity: 0,
    jumpConfig: {
        force: 23.6,
        quantity: 0
    },
    update: function() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > (floor.y - this.height)) {
            this.y = floor.y - this.height;
            this.jumpConfig.quantity = 0;
        }
    },
    jump: function() {
        if (this.jumpConfig.quantity < maxJumps) {
            this.velocity = -this.jumpConfig.force;
            this.jumpConfig.quantity++;
        }
    },
};

const obstacle = {
    /**
     * @typedef Obstacle
     */

    /**
     * @type Obstacle[]
     */
    allObstacles: [],
    colors: ["#3beca8", "#fcc147", "#6c2d4e", "#def098", "#cd382f"],
    positions: [baseWidth / 2, baseWidth / 3, baseWidth / 1.2, baseWidth / 1.4, baseWidth / 1.6],
    insertTime: 0,
    create: function() {
        this.allObstacles.push({
            x: baseWidth, // getRandomElement(this.positions, 5, true, 'obstaclePositions'),
            y: 0,
            width: 20 + Math.floor(20 * Math.random()),
            height: 30 + Math.floor(120 * Math.random()),
            color: getRandomElement(this.colors, 5, true, 'obstacleColors'),
            gravity: 1.6,
            velocityInY: 0,
            velocityInX: 3,
        });

        this.insertTime = 50 + Math.floor(31 * Math.random());
    },
    update: function() {
        if (this.insertTime === 0) this.create();
        else this.insertTime--;

        this.allObstacles.forEach((obstacle, index) => {
            obstacle.velocityInY += obstacle.gravity;
            obstacle.y += obstacle.velocityInY;

            if (obstacle.y > (floor.y - obstacle.height)) {
                obstacle.y = floor.y - obstacle.height;
            }

            obstacle.x -= obstacle.velocityInX;

            if (obstacle.x <= -obstacle.width) {
                this.allObstacles.splice(index, 1);
                return;
            }

            if (
                player.x < (obstacle.x + obstacle.width) &&
                (player.x + player.width) >= obstacle.x &&
                (player.y + player.height) >= (floor.y - obstacle.height)
            ) {
                currentGameState = GAME_STATE.LOST;
                this.allObstacles = [];
                return;
            }
        });
    },
    draw: function() {
        this.allObstacles.forEach((obstacle) => {
            drawRectangle(
                obstacle.x,
                obstacle.y, // floor.y - obstacle.height,
                obstacle.width,
                obstacle.height,
                obstacle.color
            );
        });
    },
};

function run() {
    drawElements();
    player.update();

    if (currentGameState === GAME_STATE.PLAYING) {
        obstacle.draw();
        obstacle.update();
    }

    window.requestAnimationFrame(run);
}

function click() {
    if (currentGameState === GAME_STATE.PLAY) currentGameState = GAME_STATE.PLAYING;

    if (currentGameState === GAME_STATE.PLAYING) player.jump();

    if (currentGameState === GAME_STATE.LOST) currentGameState = GAME_STATE.PLAY;
}

function main() {
    setWindowDimensions();
    configureCanvas();

    run();
}

function setWindowDimensions() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    if (windowWidth >= 500) {
        windowWidth = baseWidth;
        windowHeight = baseHeight;
    }
}

function configureCanvas() {
    const canvas = document.createElement("canvas")
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    canvas.style.border = "1px solid #000";

    canvasContext = canvas.getContext("2d");
    document.body.appendChild(canvas);
    document.addEventListener("mousedown", click);
}

function drawElements() {
    // Sky
    drawRectangle(0, 0, windowWidth, windowHeight, "#53d6ed");
    // Floor
    drawRectangle(floor.x, floor.y, windowWidth, 200, "#cf9044");
    // Player
    drawRectangleWithGradient(
        player.x,
        player.y,
        player.width,
        player.height,
        player.color,
        "#FF0000"
    );

    if (currentGameState === GAME_STATE.PLAY) {
        drawRectangle(baseWidth / 2 - 50, baseHeight / 2 - 50, 100, 100, "green");
    }

    if (currentGameState === GAME_STATE.LOST) {
        drawRectangle(baseWidth / 2 - 50, baseHeight / 2 - 50, 100, 100, "red");
    }
}

/**
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {string} color Hex
 * @returns 
 */
function drawRectangle(x, y, width, height, color = "#000") {
    if (!canvasContext) {
        console.error('Context not defined');
        return;
    }

    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

/**
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @param {string} color1 Hex
 * @param {string} color2 Hex
 * @returns 
 */
function drawRectangleWithGradient(x, y, width, height, color1 = "#000", color2 = "#444") {
    if (!canvasContext) {
        console.error('Context not defined');
        return;
    }

    canvasContext.fillStyle = createGradient(color1, color2);
    canvasContext.fillRect(x, y, width, height);
}

/**
 * @param {string} color1
 * @param {string} color2 
 * @returns {CanvasGradient}
 */
function createGradient(color1, color2) {
    const gradient = canvasContext.createLinearGradient(0, 0, 45, 0);

    gradient.addColorStop(1, color1);
    gradient.addColorStop(1, color2);

    return gradient;
}

/**
 * @param {Array} elements 
 * @param {Number} numberOfElements 
 * @param {Boolean} validateIfIsTheSame 
 * @param {String} contextKey
 */
function getRandomElement(
    elements,
    numberOfElements,
    validateIfIsTheSame = false,
    contextKey = ''
) {
    const random = elements[Math.floor(numberOfElements * Math.random())];

    if (!validateIfIsTheSame) return random;

    if (isTheSameValue(contextKey, random)) {
        getRandomElement(elements, numberOfElements, true, contextKey);
    }

    return random;
}

/**
 * @param {string} contextKey 
 * @param {Number | String} currentRandomValue
 * @returns 
 */
function isTheSameValue(contextKey, currentRandomValue) {
    if (!previousObject.hasOwnProperty(contextKey)) {
        previousObject[contextKey] = '';
        return false;
    }

    const result = previousObject[contextKey] === currentRandomValue;

    if (!result) previousObject[contextKey] = currentRandomValue;

    return result;
}