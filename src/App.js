import './App.css';
import { useState } from 'react'
import useBoard from './hooks/useBoard';
import Board from './components/Board';


function App() {

    const [cols, setCol] = useState(5)
    const [rows, setRow] = useState(5)
    const [board, setBoard] = useBoard(rows, cols)
    const tam = cols * 14

    const selectCell = (row, col) => {
        let auxBoard = board.slice()
        auxBoard[row][col] = !auxBoard[row][col]
        setBoard(auxBoard)
    }

    const start = () => {
        period()
        console.log(board)
    }

    const period = () => {
        let auxBoard = board.slice()
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let neighbour = (auxBoard[Math.abs(i - 1) % rows][Math.abs(j - 1) % cols] + 
                            auxBoard[Math.abs(i - 1) % rows][j] +
                            auxBoard[Math.abs(i - 1) % rows][Math.abs(j + 1) % cols] +
                            auxBoard[i][Math.abs(j - 1) % cols] +
                            auxBoard[i][Math.abs(j + 1) % cols] +
                            auxBoard[Math.abs(i + 1) % rows][Math.abs(j - 1) % cols] +
                            auxBoard[Math.abs(i + 1) % rows][j] +
                            auxBoard[Math.abs(i + 1) % rows][Math.abs(j + 1) % cols])
                            console.log(neighbour)
                if (auxBoard[i][j] && neighbour == 3 ) { auxBoard[i][j] = true}
                if (auxBoard[i][j] && (neighbour < 2 || neighbour > 3 )) { auxBoard[i][j] = false }
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
                        <button className='button' onClick={start}>Start</button>
                        <button className='button'>Pause</button>
                    </nav>
                    <Board board={board} rows={rows} cols={cols} style={{width: tam + 'px'}} selectCell={selectCell}/>
                </div>
            </div>
        </main>
    )
}

export default App;