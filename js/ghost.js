'use strict'
const GHOST_SUPER_COLOR = '<img style="display:block;" width="100%" height="100%" src="img/super_food_ghost2.jpg">';
const GHOST = '&#9781;';
var gGhosts = []
var gIntervalGhosts;
var gDeletedGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 500)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}
function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST || nextCell === GHOST_SUPER_COLOR) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN_IMG && !gIsPowerFood) {
        gameOver();
        return;
    }
    if (nextCell === PACMAN_IMG && gIsPowerFood) {
        return;
    }


    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var ghostColor = (gIsPowerFood) ? GHOST_SUPER_COLOR : ghost.color;
    if (ghostColor === GHOST_SUPER_COLOR) {
        return `<span style="color:${ghostColor}${GHOST_SUPER_COLOR}</span>`
    } else {
        return `<span style="color:${ghostColor};">${GHOST}</span>`
    }
}

function deleteGhost(pacmanLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === pacmanLocation.i && gGhosts[i].location.j === pacmanLocation.j) {
            gDeletedGhosts.push(gGhosts[i]);
            gGhosts.splice(i, 1)
        }
    }
}



