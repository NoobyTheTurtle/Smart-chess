import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import {Box, Typography} from "@mui/material";
import {Colors} from "../models/Colors";

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }

        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <>
            <Typography
                sx={{
                    mt: 6,
                    mb: 4
                }}
                component="h1"
                variant="h4"
                textAlign="center"
                gutterBottom
            >
                Ход игрока за {currentPlayer?.color === Colors.BLACK ? "чёрных" : "белых"}
            </Typography>
            <Box
                display="flex"
                flexWrap="wrap"
                sx={{
                    width: 64 * 8,
                    height: 64 * 8,
                    border: "1em solid black",
                    boxSizing: "content-box",
                    borderRadius: "1em",
                }}
            >
                {board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map((cell) => (
                            <CellComponent
                                click={click}
                                key={cell.id}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </Box>
        </>
    );
};

export default BoardComponent;