import './App.css';
import { useState } from 'react'
import useBoard from './hooks/useBoard';
import Cells from './components/Cells';


function App() {

    const [col, setCol] = useState(70)
    const [row, setRow] = useState(30)
    const [board, setBoard] = useBoard(row, col)
    const [gameState, setGameState] = useState(false)
    const tam = col * 14

    const start = () => {
        setGameState(true)
        console.log(gameState)
    }

    const pause = () => {
        setGameState(false)
        console.log(gameState)
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