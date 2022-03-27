document.addEventListener("DOMContentLoaded", main);

/** @type {CanvasRenderingContext2D} */
let borders = 0;
let canvasContext = null;
let windowHeight = 0;
let windowWidth = 0;

const baseWidth = 1280;
const baseHeight = 720;
const maxJumps = 3;

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
    update: function () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > (floor.y - this.height)) {
            this.y = floor.y - this.height;
            this.jumpConfig.quantity = 0;
        }
    },
    jump: function () {
        if (this.jumpConfig.quantity < maxJumps) {
            this.velocity = -this.jumpConfig.force;
            this.jumpConfig.quantity++;
        }
    },
};

const obstacle = {
    allObstacles: [],
    colors: ["#3beca8", "#fcc147", "#6c2d4e", "#def098", "#cd382f"],
    insertTime: 0,
    create: function () {
        this.allObstacles.push({
            x: baseWidth / 2,
            y: 0,
            width: 20 + Math.floor(20 * Math.random()),
            height: 30 + Math.floor(120 * Math.random()),
            color: this.colors[Math.floor(5 * Math.random())],
            gravity: 1.6,
            velocity: 0,
        });

        this.insertTime = 30 + Math.floor(21 * Math.random());
    },
    update: function () {
        this.allObstacles.forEach((obstacle) => {
            obstacle.velocity += obstacle.gravity;
            obstacle.y += obstacle.velocity;

            if (obstacle.y > (floor.y - obstacle.height)) {
                obstacle.y = floor.y - obstacle.height;
            }
        });
    },
    draw: function () {
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
    // obstacle.create();
    obstacle.draw();
    obstacle.update();

    window.requestAnimationFrame(run);
}

function click() {
    player.jump();
    console.warn('Canvas was clicked');
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
    // drawRectangle(0, 0, baseWidth / 5, baseHeight, "#f72098");
    // drawRectangle((baseWidth - (baseWidth / 5)), 0, baseWidth / 5, baseHeight, "#f72098");
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