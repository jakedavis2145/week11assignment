const tiles = document.querySelectorAll(".tile");
const Player_X = "X";
const Player_O = "O";
let turn = Player_X;

const gameState = Array(tiles.length);
gameState.fill(null);

const winningCombos = [

    {combinations: [1, 2, 3], strikeSet: "strike-row-1"},
    {combinations: [4, 5, 6], strikeSet: "strike-row-2"},
    {combinations: [7, 8, 9], strikeSet: "strike-row-3"},
    
    {combinations: [1, 4, 7], strikeSet: "strike-column-1"},
    {combinations: [2, 5, 8], strikeSet: "strike-column-2"},
    {combinations: [3, 6, 9], strikeSet: "strike-column-3"},
    
    {combinations: [1, 5, 9], strikeSet: "strike-diagonal-1"},
    {combinations: [3, 5, 7], strikeSet: "strike-diagonal-2"},
    
    ]
    
// 
const strike = document.getElementById("strike");
const gameEndArea = document.getElementById("game-end-area");
const gameEndText = document.getElementById("game-end-text");
const newGame = document.getElementById("play-again");
newGame.addEventListener("click", startNewGame)

tiles.forEach((tile) => tile.addEventListener("click", tileClick))

//

function gameOverScreen(winnerText){
    let text = "Draw!";
    if(winnerText != null) {
        text= `Winner is ${winnerText}!`;
    }
    gameEndArea.className = "visible";
    gameEndText.innerText = text;
}


// 

function setHoverText() {
    tiles.forEach((tile) => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });
    
    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach((tile) => {
        if(tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    })
    
}

// 

function checkWinner() {
    for(const winningCombo of winningCombos){
        const {combinations, strikeSet} = winningCombo;
        const tileValue1 = gameState[combinations[0] - 1]
        const tileValue2 = gameState[combinations[1] - 1]
        const tileValue3 = gameState[combinations[2] - 1]
        console.log(winningCombos);

        if(tileValue1 != null 
            && tileValue1 === tileValue2 
            && tileValue1 === tileValue3
            ){
            strike.classList.add(strikeSet);
            gameOverScreen(tileValue1);
            return;
            }
            
    }
    const boardFilled = gameState.every((tile) => tile !== null);
    if(boardFilled){
        gameOverScreen(null)
    }

}

// 

function startNewGame() {
    strike.className = "strike";
    gameEndArea.className = "hidden";
    gameState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = Player_X;
    setHoverText()
}

//


function tileClick(event) {
    if(gameEndArea.classList.contains("visible")) {
        return;
    }
    const tile= event.target;
    const tileNumber= tile.dataset.index;
    if(tile.innerText !="") {
        return;
    }
    if(turn === Player_X){
        tile.innerText = Player_X;
        gameState[tileNumber-1] = Player_X;
        turn = Player_O;
    } else{
        tile.innerText = Player_O;
        gameState[tileNumber - 1] = Player_O;
        turn = Player_X
    }

setHoverText();
checkWinner();
}





