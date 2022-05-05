import './App.css';
import { useState, useEffect } from 'react'
import useBoard from './hooks/useBoard';
import Board from './components/Board';


function App() {

    const [rows, setRow] = useState(30)
    const [cols, setCol] = useState(70)
    const [board, setBoard] = useBoard(rows, cols)
    const [gameState, SetStateGame] = useState(false)
    const velocidad = 200
    const tam = cols * 14

    useEffect(()=>{
        if (gameState){
            const id = setInterval(()=>{
                period()
            }, velocidad)
            return () => clearInterval(id)
        }
        return undefined
    })

    const selectCell = (row, col) => {
        let auxBoard = arrayCopy(board)
        auxBoard[row][col] = !auxBoard[row][col]
        console.log(row, col)
        setBoard(auxBoard)
    }

   

    const pause = () => {
        SetStateGame(false)
    }

    const period = () => {
        let auxBoard = arrayCopy(board)
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let neighbour = (board[Math.abs(i - 1) % rows][Math.abs(j - 1) % cols] + 
                            board[Math.abs(i - 1) % rows][j] +
                            board[Math.abs(i - 1) % rows][Math.abs(j + 1) % cols] +
                            board[i][Math.abs(j - 1) % cols] +
                            board[i][Math.abs(j + 1) % cols] +
                            board[Math.abs(i + 1) % rows][Math.abs(j - 1) % cols] +
                            board[Math.abs(i + 1) % rows][j] +
                            board[Math.abs(i + 1) % rows][Math.abs(j + 1) % cols])
                if (board[i][j] == false && neighbour == 3 ) { auxBoard[i][j] = true}
                if (board[i][j] == true && (neighbour < 2 || neighbour > 3 )) { auxBoard[i][j] = false }
            }
            
        }
        setBoard(auxBoard)
    }

    return (
        <main>
            <header className='title'>
                <p>Game of Life!</p>
            </header>
            <div className='content-center'>
                <div className='content'>
                    <nav className='button-box'>
                        <button className='button' onClick={() => { SetStateGame(true)}}>Start</button>
                        <button className='button' onClick={() => { SetStateGame(false)}}>Pause</button>
                    </nav>
                    <Board board={board} rows={rows} cols={cols} style={{width: tam + 'px'}} selectCell={selectCell}/>
                </div>
            </div>
        </main>
    )
}

function arrayCopy(arr){
    let copy = []
    arr.map((rows, i) => {
        copy[i] = []
        rows.map((col, j) => {
            copy[i][j] = arr[i][j]
        })
    })
    return copy;
}

export default App;