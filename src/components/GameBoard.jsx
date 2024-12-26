// import { useState } from "react";

const initalGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
export default function GameBoard({onSelectSquare , board}){

    // let gameBoard = initalGameBoard;

    // for( const turn of turns ){

    //     const {square , player} = turn;
    //     const {col , row} = square;

    //     gameBoard[row][col] = player

    // }

    // const [gameBoard , setGameBoard] = useState(initalGameBoard);

    // function handleSelectSquare(rowIndex , colIndex){

    //     setGameBoard( (prevGameBoard)=>{ 
    //         const updatedBoard = [...prevGameBoard] ;
    //         updatedBoard.map( (innerArray)=>{ [...innerArray] } )
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol ;
    //         return updatedBoard

    //      })

    //      onSelectSquare();
    // }

    return(

        <ol id="game-board">
            {board.map( (row ,rowIndex )=> <li key={rowIndex}>

                <ol>
                    { row.map( (playerSombol,colIndex)=> <li key={colIndex}>
                        <button onClick={ ()=>{onSelectSquare(rowIndex , colIndex)} } disabled={playerSombol !== null}>{playerSombol}</button>
                        </li> ) }
                </ol>


            </li> ) }
        </ol>
        
    )
}