'use strict'

const WALL = '<img style="display:block;" width="100%" height="100%" src="./img/wall.JPG">';
const FOOD = '◽'
const POWER_FOOD = '🔴'
const CHERRY_FOOD = '🍒'
const EMPTY = ' ';

var elBtn = document.querySelector('.restart-btn');
var elGameOver = document.querySelector('.game-over');
var elGameWin = document.querySelector('.game-win');
var gPacmanSirenSoundInterval;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}


function init() {
    reduceInit();
    gBoard = buildBoard()
    createPacman(gBoard);
    printMat(gBoard, '.board-container')
    updateScore(gGame.score);
    setTimeout(() => {
        createGhosts(gBoard);
        gGame.isOn = true;
        gPacmanSirenSoundInterval = setInterval(playSound, 1600, 'Pacman_Siren', 'mp3')
    }, 3500);
}

function reduceInit() {
    playSound('pacman_beginning', 'wav');
    elGameOver.classList.add('hide');
    elGameWin.classList.add('hide');
    elBtn.classList.add('hide');
    PACMAN_IMG = '<img style="display:block;" width="100%" height="100%" src="./img/pacman_right.png">';
    clearInterval(gCherryInterval);
    gCherryInterval = setInterval(insertCherry, 15000);
    gGame.score = 0;
    gCountFoodEaten = 0;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = POWER_FOOD;
    board[1][8] = POWER_FOOD;
    board[8][1] = POWER_FOOD;
    board[8][8] = POWER_FOOD;

    return board;
}



function updateScore(diff) {
    // console.log(diff);
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameWin() {
    clearInterval(gPacmanSirenSoundInterval);
    playSound('pacman_win', 'mp3');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    elGameWin.classList.remove('hide');
    elBtn.classList.remove('hide');
}


function gameOver() {
    clearInterval(gPacmanSirenSoundInterval);
    playSound('pacman_death', 'wav');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    elGameOver.classList.remove('hide');
    elBtn.classList.remove('hide');
}




