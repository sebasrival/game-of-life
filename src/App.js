import './App.css';
import { useState, useEffect } from 'react'
import useBoard from './hooks/useBoard';
import Board from './components/Board';


function App() {

    const [rows, setRow] = useState(40)
    const [cols, setCol] = useState(100)
    const [board, setBoard] = useBoard(rows, cols)
    const [gameState, SetStateGame] = useState(false)
    const [periodos, setPeriodos] = useState(0)
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

   
    const clear = () => {
        SetStateGame(false)
        let auxBoard = Array(rows).fill().map(() => Array(cols).fill(false))
        setBoard(auxBoard)
        setPeriodos(0)
    }

    const pause = () => {
        SetStateGame(false)
    }

    const seed = () => {
        SetStateGame(false)
        let auxBoard = arrayCopy(board)
        auxBoard.map((row, i)=> row.map((col, j)=>{
            if (Math.floor(Math.random() * 4) === 1) {
                auxBoard[i][j] = true
            }
        }))
        setBoard(auxBoard)
        setPeriodos(0)
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
        setPeriodos(periodos+1)
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
                        <button className='button' onClick={() => { clear()}}>Clear</button>
                        <button className='button' onClick={() => { seed()}}>Seed</button>
                    </nav>
                    <Board board={board} rows={rows} cols={cols} style={{width: tam + 'px'}} selectCell={selectCell}/>
                    <header className='title'><p>Evolution: {periodos}</p></header>
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