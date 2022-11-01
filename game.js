let game;

let gameBoardElement = document.querySelector(".board");

let circlePlayerMapElement = document.querySelector('#circle-player-map');
let circlePlayerNameElement = circlePlayerMapElement.children[0];

let crossPlayerMapElement = document.querySelector('#cross-player-map');
let crossPlayerNameElement = crossPlayerMapElement.children[0];

let startGameFormElement = document.querySelector(".player-names-modal > form");

let endModalButtonElement = document.querySelector(".end-modal > button");

let modalWrapperElement = document.querySelector(".modal-wrapper");

class Player {
    constructor(name) {
        this.name = name;
    }
}

class GameBoard {
    constructor() {
        this.gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    }
}

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.playerMapping;
        this.playerTurn;
        this.gameBoard = new GameBoard();
        
        this._setupPlayers();
    }
    
    // Update the UI indicator of the current player
    updatePlayerTurnDisplay() {
        if (this.playerTurn) {  // if player1's turn
            // Find player1's symbol
            if (this.playerMapping.player1 === "circle") {
                circlePlayerMapElement.classList.add("current-player");
                crossPlayerMapElement.classList.remove("current-player");
            } else if (this.playerMapping.player1 === "cross") {
                crossPlayerMapElement.classList.add("current-player");
                circlePlayerMapElement.classList.remove("current-player");
            }
        } else {  // if player2's turn
            // Find player2's symbol
            if (this.playerMapping.player2 === "circle") {
                circlePlayerMapElement.classList.add("current-player");
                crossPlayerMapElement.classList.remove("current-player");
            } else if (this.playerMapping.player2 === "cross") {
                crossPlayerMapElement.classList.add("current-player");
                circlePlayerMapElement.classList.remove("current-player");
            }
        }
    }
    
    // Update the board
    updateBoard(event) {
        // Get the index of the cell that is clicked
        let boardIndex = Array.from(gameBoardElement.children).indexOf(event.target);
        
        // Check if the cell placement is valid
        if (this.gameBoard.gameBoardArray[boardIndex] !== "") {
            return false;
        }
        
        // Get the current player's symbol
        let currentPlayerSymbol = this.playerTurn ? this.playerMapping.player1 : this.playerMapping.player2;
        
        // Update the game board array
        this.gameBoard.gameBoardArray[boardIndex] = currentPlayerSymbol;
        
        // Update the board UI
        if (currentPlayerSymbol === "circle") {
            event.target.innerHTML = "<img src='assets/circle.svg' width='50rem' draggable='false' alt='circle'>";
        } else if (currentPlayerSymbol === "cross") {
            event.target.innerHTML = "<img src='assets/cross.svg' width='50rem' draggable='false' alt='cross'>";
        }
        
        return true;
    };
    
    // Check if the game is over
    isOver(event) {
        let winConditionFound = false;
        let boardIndex = Array.from(gameBoardElement.children).indexOf(event.target);
        
        // check column
        if (this.gameBoard.gameBoardArray[0] === this.gameBoard.gameBoardArray[3] && this.gameBoard.gameBoardArray[3] === this.gameBoard.gameBoardArray[6] && this.gameBoard.gameBoardArray[0] !== "") {
            winConditionFound = true;
        } else if (this.gameBoard.gameBoardArray[1] === this.gameBoard.gameBoardArray[4] && this.gameBoard.gameBoardArray[4] === this.gameBoard.gameBoardArray[7] && this.gameBoard.gameBoardArray[1] !== "") {
            winConditionFound = true;
        } else if (this.gameBoard.gameBoardArray[2] === this.gameBoard.gameBoardArray[5] && this.gameBoard.gameBoardArray[5] === this.gameBoard.gameBoardArray[8] && this.gameBoard.gameBoardArray[2] !== "") {
            winConditionFound = true;
        } 
        
        // check row
        if (this.gameBoard.gameBoardArray[0] === this.gameBoard.gameBoardArray[1] && this.gameBoard.gameBoardArray[1] === this.gameBoard.gameBoardArray[2] && this.gameBoard.gameBoardArray[0] !== "") {
            winConditionFound = true;
        } else if (this.gameBoard.gameBoardArray[3] === this.gameBoard.gameBoardArray[4] && this.gameBoard.gameBoardArray[4] === this.gameBoard.gameBoardArray[5] && this.gameBoard.gameBoardArray[3] !== "") {
            winConditionFound = true;
        } else if (this.gameBoard.gameBoardArray[6] === this.gameBoard.gameBoardArray[7] && this.gameBoard.gameBoardArray[7] === this.gameBoard.gameBoardArray[8] && this.gameBoard.gameBoardArray[6] !== "") {
            winConditionFound = true;
        }
        
        // check diagonal
        if (this.gameBoard.gameBoardArray[0] === this.gameBoard.gameBoardArray[4] && this.gameBoard.gameBoardArray[4] === this.gameBoard.gameBoardArray[8] && this.gameBoard.gameBoardArray[0] !== "") {
            winConditionFound = true;
        } else if (this.gameBoard.gameBoardArray[2] === this.gameBoard.gameBoardArray[4] && this.gameBoard.gameBoardArray[4] === this.gameBoard.gameBoardArray[6] && this.gameBoard.gameBoardArray[2] !== "") {
            winConditionFound = true;
        }
        
        if (winConditionFound) {
            // Check who placed the winning tile
            if (this.gameBoard.gameBoardArray[boardIndex] === this.playerMapping.player1) {
                return "player1";
            } else {
                return "player2";
            }
        } 
        
        // Check for a draw by checking if all divs are filled and no win condition is met
        if (this.gameBoard.gameBoardArray.every((element) => element != "")) {
            return "draw";
        }
        
        return "continue";
    }
    
    // End the game
    endGame(gameStatus) {
        // Show end modal screen
        modalWrapperElement.style.display = "flex";
        
        // Update the end modal screen with the game status
        let endModalTextElement = document.querySelector(".end-modal > p");
        if (gameStatus === "player1") {
            endModalTextElement.textContent = `${this.player1.name} wins!`;
        } else if (gameStatus === "player2") {
            endModalTextElement.textContent = `${this.player2.name} wins!`;
        } else if (gameStatus === "draw") {
            endModalTextElement.textContent = "It's a draw!";
        }
    }
    
    // Initial setup of players
    _setupPlayers() {
        // Randomly assign players to symbols in playerMapping
        this.playerMapping = Math.round(Math.random()) === 1 ? {"player1": "circle", "player2": "cross"} : {"player1": "cross", "player2": "circle"};
        
        // Randomly set current player's turn
        this.playerTurn = Math.round(Math.random()) === 1 ? true : false;
        
        console.log("Player 1:", this.player1.name);
        console.log("Player 2:", this.player2.name);
        console.log("Player Mapping:", this.playerMapping);
        console.log("Player Turn:", this.playerTurn ? "Player 1" : "Player 2");
        
        // Update player names UI
        if (this.playerMapping.player1 === "circle") {
            circlePlayerNameElement.textContent = this.player1.name;
            crossPlayerNameElement.textContent = this.player2.name;
        } else if (this.playerMapping.player1 === "cross") {
            circlePlayerNameElement.textContent = this.player2.name;
            crossPlayerNameElement.textContent = this.player1.name;
        }
        
        // Update who is highlighted based on player turn in UI
        this.updatePlayerTurnDisplay();
    };
}

// Event Listeners --->

startGameFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let player1Name = startGameFormElement.querySelector("#player1").value;
    let player2Name = startGameFormElement.querySelector("#player2").value;
    
    if (player1Name != "" && player2Name != "") {
        if (player1Name === player2Name) {
            alert("Player names must be different");
            return false;
        }
        // Reset the start form
        let startScreenElement = document.querySelector(".start-screen");
        startGameFormElement.reset();
        // Hide the start form
        startScreenElement.style.display = "none";
        
        // Display the game board
        let mainElement = document.querySelector("main");
        mainElement.style.display = "flex";
        
        // Initialize players
        let player1 = new Player(player1Name);
        let player2 = new Player(player2Name);
        
        // Create game instance
        game = new Game(player1, player2);
    }
    return false;
});

gameBoardElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("cell")) {     
        // Update board
        if (game.updateBoard(event)) {
            // Check if the game is over --->
            let gameStatus = game.isOver(event);
            if (gameStatus === "player1" || gameStatus === "player2" || gameStatus === "draw") {
                // End game
                game.endGame(gameStatus);
            }
            else {
                // Switch player turn
                game.playerTurn = !game.playerTurn;
                // Update who is highlighted based on player turn in UI
                game.updatePlayerTurnDisplay();
            }
        }
    }
});

//  Uf user clicks on play again, start a new instance of the game
endModalButtonElement.onclick = () => {
    // hide end modal wrapper
    modalWrapperElement.style.display = "none";
    
    // hide game screen
    let mainElement = document.querySelector("main");
    mainElement.style.display = "none";
    
    // reset gameboard
    let gameBoardChildren = Array.from(gameBoardElement.children);
    gameBoardChildren.forEach((element) => {
        element.innerHTML = "";
    });
    
    // show start screen
    let startScreenElement = document.querySelector(".start-screen");
    startScreenElement.style.display = "flex";
};