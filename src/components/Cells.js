import { useState } from "react"


function cloneArray(grid) {
    const newGrid = [...grid]
    newGrid.forEach((row, rowIndex) => newGrid[rowIndex] = [...row])
    return newGrid
  }

const Cell = ({...props}) => {
    const [state, setState] = useState('cell')

    const clickCell = (row, col) => {
        let auxBoard = cloneArray(props.board)
        if(state === 'cell alive'){
            setState('cell')
            auxBoard[row][col] = false
        }else{
            setState('cell alive')
            auxBoard[row][col] = true
        }
        console.log(auxBoard)
    }

    return (
        <div className={state} onClick={() =>clickCell(props.row, props.col)}></div>
    )
}

const Cells = ({...props}) => {

    const listCells = [];

    props.board.map((x, row) => {
        x.map((y, col) => {
            listCells.push(<Cell row={row} col={col} key={row + '_' + col} board={props.board} setBoard={props.setBoard}></Cell>)
        })
    })

    return (
        listCells
    )
}

export default Cells;