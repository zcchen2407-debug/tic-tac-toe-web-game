const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gamePlay = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");
    if (board[cellIndex] !== "" || gamePlay == false) {
        return;
    }

    board[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let playerWon = false;
    for(let i=0; i<winCombos.length; i++) {
        const condition = winCombos[i];

        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        if(a == "") {
            continue;
        }
        if(a == b && b == c) {
            playerWon = true;
        }
    }

    if(playerWon) {
        statusText.textContent = "Player " + currentPlayer + " Wins!";
        gamePlay = false;
        return;
    }

    if(!board.includes("")) {
        statusText.textContent = "Draw";
        gamePlay = false;
        return;
    }

    if(currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    statusText.textContent = "Player " + currentPlayer + "'s Turn";
} 

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gamePlay = true;

    statusText.textContent = "Player " + currentPlayer + "'s Turn";

    for(let i=0; i<cells.length; i++) {
        cells[i].textContent = "";
    }
}

for(let i=0; i<cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
}

restartButton.addEventListener("click", restartGame);