import { useState } from "react";

const useBoard = (row, col) => {
    const matriz = Array(row).fill(Array(col).fill(false))
    const [board, setBoard] = useState(matriz)
    return [board, setBoard]
}

export default useBoard;