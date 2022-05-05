import { useState } from "react"

const Cell = ({...props}) => {

    const clickCell = () => {
        props.selectCell(props.row, props.col)
    }

    return (
        <div className={props.className} key={props.key} id={props.id} onClick={() => clickCell()}></div>
    )
}

const Board = ({...props}) => {

    let listCells = [];

    props.board.map((x, row) => {
        x.map((y, col) => {
            let cell_id = row + '_' + col
            listCells.push(<Cell className={ props.board[row][col] ? 'cell alive': 'cell'} 
                                row={row}
                                col={col} 
                                key={cell_id} 
                                id={cell_id} 
                                board={props.board}
                                selectCell={props.selectCell}></Cell>)
        })
    })

    return (
        <div className='board' style={props.style}>
            { listCells}
        </div>
    )
}

export default Board;