import { useState } from "react"

const Cell = ({...props}) => {
    const [state, setState] = useState('cell')
    const clickCell = (row, col) => {
        state === 'cell alive' ? setState('cell') : setState('cell alive')
        props.board[row][col] = !props.board[row][col]
        props.setBoard(props.board)
    }

    return (
        <div className={state} onClick={() =>clickCell(props.row, props.col)}></div>
    )
}

const Cells = ({...props}) => {

    const listCells = [];
    let auxBoard = props.board.slice() //copia del array

    auxBoard.map((x, row) => {
        x.map((y, col) => {
            listCells.push(<Cell row={row} col={col} key={row + '_' + col} board={auxBoard} setBoard={props.setBoard}></Cell>)
        })
    })
    

    return (
        listCells
    )
}

export default Cells;