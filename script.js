// Initiate game variables
let gameInProgress = false;
let computerMove;
let computerScore;
let playerScore;

// Fetch HTML elements
let instructionHolder = document.getElementById("instruction");
let playerScoreHolder = document.getElementById("player-score");
let computerScoreHolder = document.getElementById("computer-score");
let roundResultHolder = document.getElementById("round-result");
let gameResultHolder = document.getElementById("game-result");

// Add "click" listener to the move buttons
const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
        playRound(button.id);
    });
});

// Select a move for the computer
function getComputerMove() {
    let moves = ["rock", "paper", "scissors"];

    return moves[Math.floor(Math.random() * moves.length)];
}

function processRoundResult(playerMove, computerMove, roundResult) {
    // Update the HTML element displaying the round result, and the appropriate score
    if (roundResult === "playerWin") {
        roundResultHolder.textContent = "You win the round, " + playerMove + " beats " + computerMove + "!";
        playerScore++;
        playerScoreHolder.textContent = playerScore;
    }
    else {
        roundResultHolder.textContent = "You lose the round, " + computerMove + " beats " + playerMove + "!";
        computerScore++;
        computerScoreHolder.textContent = computerScore;
    }
}

// Play a round of rock, paper, scissors
function playRound(playerMove) {
    // Update the game instructions once the player has selected a move
    instructionHolder.textContent = "Select your next move against the computer.";

    // If there's not a game in progress, start a new game
    if (!gameInProgress) {
        computerScore = 0;
        playerScore = 0;
        computerScoreHolder.textContent = "0";
        playerScoreHolder.textContent = "0";
        roundResultHolder.textContent = "";
        if (roundResultHolder.classList.contains("end")) {
            roundResultHolder.classList.toggle("end");
        }
        gameResultHolder.textContent = "";
        gameInProgress = true;                    
    }
    
    computerMove = getComputerMove();

    // If the player and computer choose different moves, determine the outcome of the round
    if (playerMove !== computerMove) {
        switch (playerMove) {
            case "rock":
                if (computerMove === "scissors") {
                    processRoundResult(playerMove, computerMove, "playerWin");
                    break;
                }
                else {
                    processRoundResult(playerMove, computerMove, "computerWin");
                    break;
                }
            case "paper":
                if (computerMove === "rock") {
                    processRoundResult(playerMove, computerMove, "playerWin");
                    break;
                }
                else {
                    processRoundResult(playerMove, computerMove, "computerWin");
                    break;
                }
            case "scissors":
                if (computerMove === "paper") {
                    processRoundResult(playerMove, computerMove, "playerWin");
                    break;
                }
                else {
                    processRoundResult(playerMove, computerMove, "computerWin");
                    break;
                }
        }
    }
    // If the player and computer choose the same moves, the round is a tie
    else {
        roundResultHolder.textContent = "Tie round, both chose " + playerMove + "! ";
    }

    // When either the player or the computer reach a score of 5, determine the winner of the game
    if (playerScore === 5 || computerScore === 5) {
        instructionHolder.textContent = "Game over! Select a move to start a new game.";
        roundResultHolder.classList.toggle("end");
        if (playerScore > computerScore) {
            gameResultHolder.textContent = "You won the game, " + playerScore + " - " + computerScore + "!";
        }
        else {
            gameResultHolder.textContent = "You lost the game, " + playerScore + " - " + computerScore + "!";
        }
        gameInProgress = false;
    }
}