const boardSize = 5;
const squareSize = 50;
const squareRadius = 5;
const w = squareSize * boardSize;
const h = squareSize * boardSize;
let canvas, context;
const board = Array(boardSize);

function preload() {}

function setup() {
    createCanvas(w+5, h+5);
    canvas = document.querySelector("canvas");
    canvas.oncontextmenu = () => { return false; }
    context = canvas.getContext("2d");

    for (let i = 0; i < w; i++) {
        board[i] = Array(boardSize);
        for (let j = 0; j < h; j++) {
            board[i][j] = "lightblue";
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
    for (let i = 0, x = 0; i < w; i+=squareSize, x++) {
        for (let j = 0, y = 0; j < h; j+=squareSize, y++) {
            fill(color(board[x][y]));
            rect(i, j, squareSize, squareSize, squareRadius);
        }
    }
}

function mousePressed() {
    let x = Math.round(mouseX/squareSize-0.5)*squareSize;
    let y = Math.round(mouseY/squareSize-0.5)*squareSize;

    if (x < w && y < h) {
        let i = x/squareSize;
        let j = y/squareSize;
        if (mouseButton === LEFT) board[i][j] = "lightgrey";
        if (mouseButton === RIGHT && board[i][j] !== "lightgrey") board[i][j] = "red";

        rect(x, y, squareSize, squareSize, squareRadius);
    }

    clear();
    redraw();

    return false;
}

function f() {
    return false;
}
