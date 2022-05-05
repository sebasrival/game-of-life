import './App.css';
import { useState } from 'react'
import useBoard from './hooks/useBoard';
import Cells from './components/Cells';


function App() {

    const [col, setCol] = useState(70)
    const [row, setRow] = useState(50)
    const [board, setBoard] = useBoard(row, col)
    const tam = col * 14

    function cloneArray(grid) {
        const newGrid = [...grid]
        newGrid.forEach((row, rowIndex) => newGrid[rowIndex] = [...row])
        return newGrid
    }

    const start = () => {
        console.log(board)
        period()
        console.log(board)
    }

    const pause = () => {
        console.log(board)
    }

    const period = () =>{
        let auxBoard = cloneArray(board)
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let neighbour = (auxBoard[Math.abs(i - 1) % row][Math.abs(j - 1) % col] + 
                            auxBoard[Math.abs(i - 1) % row][j] +
                            auxBoard[Math.abs(i - 1) % row][Math.abs(j + 1) % col] +
                            auxBoard[i][Math.abs(j - 1) % col] +
                            auxBoard[i][Math.abs(j + 1) % col] +
                            auxBoard[Math.abs(i + 1) % row][Math.abs(j - 1) % col] +
                            auxBoard[Math.abs(i + 1) % row][j] +
                            auxBoard[Math.abs(i + 1) % row][Math.abs(j + 1) % col])
                            console.log(neighbour)
                if (auxBoard[i][j] == false && neighbour == 3 ) { auxBoard[i][j] = true; console.log(auxBoard[i][j])}
                if (auxBoard[i][j] == true && (neighbour < 2 && neighbour > 3 )) { auxBoard[i][j] = false }
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
                        <button className='button' onClick={pause}>Pause</button>
                    </nav>
                    <div className='board' style={{width: tam + 'px'}}>
                        <Cells board={board} setBoard={setBoard} row_t={row} col_t={col}></Cells>
                    </div>
                </div>
            </div>
        </main>
        
    )
}

export default App;