// Factory function for Player
let Player = (name) => {
    return {name};
};

// Factory function for GameController
let GameController = ((player1, player2) => {
    let playerMapping;
    let playerTurn;
    
    // Module for GameBoard
    let GameBoard = (() => {
        let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
        
        return {gameBoardArray};
    })();
    let gameBoardElement = document.querySelector(".board");
    
    let updatePlayerTurnDisplay = (playerTurn, circlePlayerMapElement, crossPlayerMapElement) => {
        if (playerTurn) {
            if (playerMapping.player1 === "circle") {
                circlePlayerMapElement.classList.add("current-player");
                crossPlayerMapElement.classList.remove("current-player");
            } else {
                circlePlayerMapElement.classList.remove("current-player");
                crossPlayerMapElement.classList.add("current-player");
            }
        } else {
            if (playerMapping.player2 === "circle") {
                circlePlayerMapElement.classList.add("current-player");
                crossPlayerMapElement.classList.remove("current-player");
            } else {
                circlePlayerMapElement.classList.remove("current-player");
                crossPlayerMapElement.classList.add("current-player");
            }
        }
    };
    
    let setupPlayers = () => {
        // randomly assign players to symbols
        playerMapping = Math.round(Math.random()) === 1 ? {player1: "circle", player2: "cross"} : {player1: "cross", player2: "circle"};
        // randomly set player turn
        playerTurn = Math.round(Math.random()) === 1 ? true : false;  // true: player1, false: player2
        // Update UI
        let circlePlayerMapElement = document.querySelector("#circle-player-map");
        let circlePlayerNameElement = circlePlayerMapElement.children[0];
        let crossPlayerMapElement = document.querySelector("#cross-player-map");
        let crossPlayerNameElement = crossPlayerMapElement.children[0];
        // Update player name display
        if (playerMapping.player1 === "circle") {
            circlePlayerNameElement.textContent = player1.name;
            crossPlayerNameElement.textContent = player2.name;
        } else {
            circlePlayerNameElement.textContent = player2.name;
            crossPlayerNameElement.textContent = player1.name;
        }
        // Update player turn UI
        updatePlayerTurnDisplay(playerTurn, circlePlayerMapElement, crossPlayerMapElement);
    };
    
    let checkPlacement = (boardIndex) => {
        if (GameBoard.gameBoardArray[boardIndex] === "") {
            return true;
        }
        return false;
    };
    
    let updateBoard = (e) => {
        console.log("HERE");
        let boardIndex = Array.from(gameBoardElement.children).indexOf(e.target);
        //  Check if placement is valid
        if (checkPlacement(boardIndex)) {
            // Update game board array
            GameBoard.gameBoardArray[boardIndex] = playerTurn ? playerMapping.player1 : playerMapping.player2;
            // Update board in UI depending on player symbol
            let currentPlayerSymbol = playerTurn ? playerMapping.player1 : playerMapping.player2;
            if (currentPlayerSymbol === "circle") {
                e.target.innerHTML = "<img src='assets/circle.svg' width='50rem' draggable='false' alt='circle'>"
            } else if (currentPlayerSymbol === "cross") {
                e.target.innerHTML = "<img src='assets/cross.svg' width='50rem' draggable='false' alt='cross'>"
            }
            return true;
        }
        return false;
    };
    
    let checkEndGame = (e) => {
        let winConditionFound = false;
        let boardIndex = Array.from(gameBoardElement.children).indexOf(e.target);
        console.log(GameBoard.gameBoardArray);
        // check column
        if (GameBoard.gameBoardArray[0] === GameBoard.gameBoardArray[3] &&  GameBoard.gameBoardArray[3] === GameBoard.gameBoardArray[6] && GameBoard.gameBoardArray[0] !== "") {
            winConditionFound = true;
        } else if (GameBoard.gameBoardArray[1] === GameBoard.gameBoardArray[4] && GameBoard.gameBoardArray[4] === GameBoard.gameBoardArray[7] && GameBoard.gameBoardArray[1] !== "") {
            winConditionFound = true;
        } else if (GameBoard.gameBoardArray[2] === GameBoard.gameBoardArray[5] && GameBoard.gameBoardArray[5] === GameBoard.gameBoardArray[8] && GameBoard.gameBoardArray[2] !== "") {
            winConditionFound = true;
        } 
        // check row
        if (GameBoard.gameBoardArray[0] === GameBoard.gameBoardArray[1] && GameBoard.gameBoardArray[1] === GameBoard.gameBoardArray[2] && GameBoard.gameBoardArray[0] !== "") {
            winConditionFound = true;
        } else if (GameBoard.gameBoardArray[3] === GameBoard.gameBoardArray[4] && GameBoard.gameBoardArray[4] === GameBoard.gameBoardArray[5] && GameBoard.gameBoardArray[3] !== "") {
            winConditionFound = true;
        } else if (GameBoard.gameBoardArray[6] === GameBoard.gameBoardArray[7] && GameBoard.gameBoardArray[7] === GameBoard.gameBoardArray[8] && GameBoard.gameBoardArray[6] !== "") {
            winConditionFound = true;
        }
        // check diagonal
        if (GameBoard.gameBoardArray[0] === GameBoard.gameBoardArray[4] && GameBoard.gameBoardArray[4] === GameBoard.gameBoardArray[8] && GameBoard.gameBoardArray[0] !== "") {
            winConditionFound = true;
        } else if (GameBoard.gameBoardArray[2] === GameBoard.gameBoardArray[4] && GameBoard.gameBoardArray[4] === GameBoard.gameBoardArray[6] && GameBoard.gameBoardArray[2] !== "") {
            winConditionFound = true;
        }
        
        if (winConditionFound) {
            if (GameBoard.gameBoardArray[boardIndex] === playerMapping.player1) {
                return "player1";
            } else {
                return "player2";
            }
        } else {
            // check for draw
            // check if all divs are filled and no win condition is met
            if (GameBoard.gameBoardArray.every((element) => element != "")) {
                return "draw";
            }
        }
        return "continue";
    };
    
    let endGame = (gameStatus) => {
        console.log("Game ended!");
        // Show end modal screen
        let modalWrapperElement = document.querySelector(".modal-wrapper");
        modalWrapperElement.style.display = "flex";
        
        //  Uf user clicks on play again, start a new instance of the game
            //  reset players
            //  reset board
        let endModalTextElement = document.querySelector(".end-modal > p");
        if (gameStatus === "player1") {
            endModalTextElement.textContent = `${player1.name} wins!`;
        } else if (gameStatus === "player2") {
            endModalTextElement.textContent = `${player2.name} wins!`;
        } else if (gameStatus === "draw") {
            endModalTextElement.textContent = "It's a draw!";
        }
        let endModalButtonElement = document.querySelector(".end-modal > button");
        endModalButtonElement.onclick = () => {
            // hide end modal wrapper
            modalWrapperElement.style.display = "none";
            // restart & hide game screen
            let mainElement = document.querySelector("main");
            // mainElement.style.display = "none";
            // reset board values in UI
            let gameBoardChildren = Array.from(gameBoardElement.children);
            gameBoardChildren.forEach((element) => {
                element.innerHTML = "";
            });
            GameBoard.gameBoardArray = ["", "", "", "", "", "", "", "", ""];
            // restart & show start screen
            // let startScreenElement = document.querySelector(".start-screen");
            // startScreenElement.style.display = "flex";
        };
    };
    
    // Main game logic
    let playGame = () => {
        // Update board with symbols
        gameBoardElement.addEventListener("click", (e) => {
            if (e.target.classList.contains("cell")) {
                // Update board
                if (updateBoard(e)) {
                    // Check win condition
                    let gameStatus = checkEndGame(e);
                    if (gameStatus === "player1" || gameStatus === "player2" || gameStatus === "draw") {
                        // End game
                        endGame(gameStatus);
                    } else {
                        // Switch player turn
                        playerTurn = !playerTurn;
                        // Update player turn UI
                        let circlePlayerMapElement = document.querySelector("#circle-player-map");
                        let crossPlayerElement = document.querySelector("#cross-player-map");
                        updatePlayerTurnDisplay(playerTurn, circlePlayerMapElement, crossPlayerElement);
                    }
                }
            }
        });
    };
    
    // Entrypoint
    let startNewGame = () => {
        console.log("Setting up players...");
        setupPlayers();
        console.log("Players set up!");
        console.log("Player 1: " + player1.name + " (" + playerMapping.player1 + ")");
        console.log("Player 2: " + player2.name + " (" + playerMapping.player2 + ")");
        console.log("Player turn: " + (playerTurn ? player1.name : player2.name));
        playGame();
    };
    
    return {startNewGame, updateBoard};
});

// Start Screen
let startGameFormElement = document.querySelector(".player-names-modal > form");
function startGame(e) {
    console.log("Attempting to start game...");
    e.preventDefault();
    let player1Field = document.querySelector("#player1");
    let player2Field = document.querySelector("#player2");
    if (player1Field.value != "" && player2Field != "") {
        if (player1Field.value === player2Field.value) {
            alert("Player names must be different!");
            return false;
        }
        // Hide the start screen
        let startScreenElement = document.querySelector(".start-screen");
        startScreenElement.style.display = "none";
        console.log("Game started!");
        // Display the next screen (Game instance)
        let mainElement = document.querySelector("main");
        mainElement.style.display = "flex";
        // Initalize players
        let player1 = Player(player1Field.value);
        let player2 = Player(player2Field.value);
        // Create game instance
        let gameController = GameController(player1, player2);
        console.log(gameController);
        gameController.startNewGame();
    } 
    return false;
}

startGameFormElement.onsubmit = (e) => {
    startGame(e);
};

