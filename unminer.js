const boardSize = 5;
const squareSize = 50;
const squareRadius = 5;
const w = squareSize * boardSize;
const h = squareSize * boardSize;
let canvas, context;
const board = Array(boardSize);
// let x, y = -1;
// let c;
// let square;

function preload() {}

function setup() {
    createCanvas(w+5, h+5);
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    for (let i = 0; i < w; i++) {
        board[i] = Array(boardSize);
    }

    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            board[i][j] = createSprite(i+squareSize, j+squareSize, squareSize, squareSize);
            board[i][j].shapeColor = color("lightblue");
            board[i][j].immovable = true;
        }
    }

    drawBoard();

    noLoop();
}

function draw() {
    drawBoard();
    drawSprites();
}

function drawBoard() {
    for (let i = 0; i < w; i+=squareSize) {
        for (let j = 0; j < h; j+=squareSize) {
            // if (i === x && j === y) {
            //     fill(c);
            //     rect(i, j, squareSize, squareSize, squareRadius);
            //     continue;
            // }
            fill(color("lightblue"));
            rect(i, j, squareSize, squareSize, squareRadius);
        }
    }
}

function mouseClicked() {
    let x = Math.round(mouseX/squareSize-0.5)*squareSize;
    let y = Math.round(mouseY/squareSize-0.5)*squareSize;

    clear();
    redraw();

    if (x < w && y < h) {
        if (mouseButton === LEFT) fill(color("lightgrey"));
        if (mouseButton === RIGHT) fill(color("red"));
        rect(x, y, squareSize, squareSize, squareRadius);
    }

    return false;
}
