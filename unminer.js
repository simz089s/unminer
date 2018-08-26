const boardSize = 6;
const squareSize = 50;
const squareRadius = 5;
const w = squareSize * boardSize;
const h = squareSize * boardSize;
let canvas, context;
const board = Array(boardSize);

function cmpClr(a, b) {
    if (a == b) return true;
    return a.toString() === b.toString();
}

function preload() {}

function setup() {
    createCanvas(w+5, h+5);
    canvas = document.querySelector("canvas");
    canvas.oncontextmenu = () => { return false; }
    context = canvas.getContext("2d");

    for (let i = 0; i < w; i++) {
        board[i] = Array(boardSize);
        for (let j = 0; j < h; j++) {
            board[i][j] = { col: color("lightblue"), val: Math.round(Math.random() * 3.5)-1 };
        }
    }

    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            if (board[i][j].val !== -1) { board[i][j].val = calcVal(i, j); }
        }
    }

    drawBoard();

    noLoop();
}

function calcVal(i, j) {
    let val = 0;
    let permut = Array(-1, 0, 1);
    permut.forEach(a => {
        permut.forEach(b => {
            if (i+a < boardSize && i+a >= 0 && j+b < boardSize && j+b >= 0
                && board[i+a][j+b].val === -1 && !(a === 0 && b === 0)) {
                val++;
            }
        });
    });
    return val;
}

function draw() {
    drawBoard();
    drawSprites();
}

function drawBoard() {
    for (let i = 0, x = 0; i < w; i+=squareSize, x++) {
        for (let j = 0, y = 0; j < h; j+=squareSize, y++) {
            fill(board[x][y].col);
            rect(i, j, squareSize, squareSize, squareRadius);
            if (cmpClr(board[x][y].col, color("lightgrey"))) {
                fill(color("green"));
                textSize(46);
                text(' '+board[x][y].val, i, j, squareSize, squareSize);
            }
        }
    }
}

function mousePressed() {
    let x = Math.round(mouseX/squareSize-0.5)*squareSize;
    let y = Math.round(mouseY/squareSize-0.5)*squareSize;

    if (x < w && y < h) {
        let i = x/squareSize;
        let j = y/squareSize;

        if (mouseButton === LEFT && !cmpClr(board[i][j].col, color("red"))) {
            board[i][j].col = color("lightgrey");
            fill(board[i][j].col);
        }

        if (mouseButton === RIGHT) {
            if (cmpClr(board[i][j].col, color("red"))) {
                board[i][j].col = color("lightblue");
                fill(board[i][j].col);
            }
            else if (!cmpClr(board[i][j].col, color("lightgrey"))) {
                board[i][j].col = color("red");
                fill(board[i][j].col);
            }
        }

        rect(x, y, squareSize, squareSize, squareRadius);
    }

    clear();
    redraw();

    return false;
}

function f() {
    return false;
}
