import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { useState } from "react"
import {WINNING_COMBINATIONS} from './Winning-combinations.js'
import GameOver from "./components/GameOVer.jsx";

const PLAYER = {
  X : 'Player 1',
  O : 'Player 2'
}

const INITAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

function deriveGameBoard(gameTurns){

  let gameBoard = [...INITAL_GAME_BOARD.map( array => [...array])];
    for( const turn of gameTurns ){

        const {square , player} = turn;
        const {col , row} = square;
        gameBoard[row][col] = player
    }

    return gameBoard;

}

function deriveWinner(gameBoard , Players){

  let winner ;

  for( const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol  =  gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =  gameBoard[combination[1].row][combination[1].column];
    const thridSquareSymbol  =  gameBoard[combination[2].row][combination[2].column];

    if( firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thridSquareSymbol){
      winner = Players[firstSquareSymbol]
    }
  }

  return winner;

}


function App() {

  const [Players, setPlayers] = useState(PLAYER)

const [gameTurns , setGameTurns] = useState([]);
const activePlayer = deriveActivePlayer(gameTurns);
const gameBoard = deriveGameBoard(gameTurns);   
const winner = deriveWinner(gameBoard , Players);
const hasDraw = gameTurns.length == 9 && !winner; 

  function handleSelectSquare(rowIndex , colIndex){
    setGameTurns( (prevTurns)=>{
     const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [ 
        {square:{row: rowIndex , col: colIndex } , player : currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns
    } )
  }

  function handleStart(){
    setGameTurns([])
  }

  function handlePlayerChangeName(symbol , newName){
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer ,
        [symbol] : newName
      };
    })
  }

  return (
   <main>
       <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player name={PLAYER.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerChangeName} />
            <Player name={PLAYER.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerChangeName} />
          </ol>

          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleStart} /> }

          <GameBoard  onSelectSquare={handleSelectSquare} board={gameBoard} />
       </div>

       <Log turns={gameTurns}/>
   </main>
  )
}

export default App
