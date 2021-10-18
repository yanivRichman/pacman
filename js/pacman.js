'use strict'
const PACMAN_IMG_UP = '<img style="display:block;" width="100%" height="100%" src="./img/pacman_up.png">';
const PACMAN_IMG_DOWN = '<img style="display:block;" width="100%" height="100%" src="./img/pacman_down.png">';
const PACMAN_IMG_LEFT = '<img style="display:block;" width="100%" height="100%" src="./img/pacman_left.png">';
const PACMAN_IMG_RIGHT = '<img style="display:block;" width="100%" height="100%" src="./img/pacman_right.png">';
const gFoodEatenForWin = 56;

var PACMAN_IMG = '<img style="display:block;" width="100%" height="100%" src="./img/pacman_right.png">';
var gIsPowerFood = false;
var gPacman;
var gEmptyCells = [];
var gCherryInterval;
var gCountFoodEaten = 0;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN_IMG
}

function movePacman(ev) {

    if (!gGame.isOn) return;
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        gEmptyCells.push(gPacman.location);
        updateScore(1);
        gCountFoodEaten++;
        console.log(gCountFoodEaten);
        if (gCountFoodEaten >= gFoodEatenForWin) gameWin()
    }
    if (nextCell === POWER_FOOD && gIsPowerFood) return;
    else if (nextCell === POWER_FOOD) {
        gEmptyCells.push(gPacman.location);
        gIsPowerFood = true;
        playSound('pacman_intermission', 'wav')
        setTimeout(() => {
            gIsPowerFood = false;
            gGhosts.push(...gDeletedGhosts);
            gDeletedGhosts = [];
        }, 5000);
    }
    if (nextCell === GHOST || nextCell === GHOST_SUPER_COLOR) {
        if (gIsPowerFood) {
            playSound('pacman_eatghost', 'wav')
            renderCell(gPacman.location, '.')
            deleteGhost(nextLocation)
        }
        else {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }
    }
    if (nextCell === CHERRY_FOOD) {
        playSound('pacman_eatfruit', 'wav')
        gEmptyCells.push(gPacman.location);
        updateScore(10);
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN_IMG;
    // update the dom
    renderCell(gPacman.location, PACMAN_IMG);
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            PACMAN_IMG = PACMAN_IMG_UP;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            PACMAN_IMG = PACMAN_IMG_DOWN;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            PACMAN_IMG = PACMAN_IMG_LEFT;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            PACMAN_IMG = PACMAN_IMG_RIGHT;
            break;
        default:
            return null;
    }
    return nextLocation;
}


function insertCherry() {
    if (gEmptyCells.length !== 0) {
        var EmptyCellIdx = getRandomIntInt(0, gEmptyCells.length);
        var randomCherryIdx = gEmptyCells.splice(EmptyCellIdx, 1);

        // update the model
        gBoard[randomCherryIdx[0].i][randomCherryIdx[0].j] = CHERRY_FOOD;

        // update the dom
        renderCell(randomCherryIdx[0], CHERRY_FOOD);
    }
}

