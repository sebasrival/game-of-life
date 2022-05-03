import './App.css';
import { useState } from 'react'
import useBoard from './hooks/useBoard';
import Cells from './components/Cells';


function App() {

    const [col, setCol] = useState(100)
    const [row, setRow] = useState(50)
    const [board, setBoard] = useBoard(row, col)
    const tam = col * 14


    return (
        <div>
            <div className='title'>
                <p>Game of Life!</p>
            </div>
            <div className='content'>
                <div className='board' style={{width: tam + 'px'}}>
                    <Cells board={board} setBoard={setBoard} row_t={row} col_t={col}></Cells>
                </div>
            </div>
        </div>
        
    )
}

export default App;