let borders = 0;
/** @type {CanvasRenderingContext2D} */
let canvasContext = null;
let windowHeight = 0;
let windowWidth = 0;
const baseWidth = 800;
const baseHeight = 600;

document.addEventListener("DOMContentLoaded", main);

function run() {
    drawElements();

    window.requestAnimationFrame(run);
}

function click() {
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
    drawRectangle(0, 0, windowWidth, windowHeight, "#53d6ed");
    drawRectangle(0, 0, baseWidth / 5, baseHeight, "#f72098");
    drawRectangle((baseWidth - (baseWidth / 5)), 0, baseWidth / 5, baseHeight, "#f72098");
    drawFloor();
}

function drawFloor() {
    drawRectangle(0, baseHeight * 0.8, windowWidth, 200, "#cf9044");
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