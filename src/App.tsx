import React, {useEffect, useState} from 'react';
// import './App.scss';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import {Container, CssBaseline, Grid} from "@mui/material";

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer((currentPlayer) => currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer)
    }

    return (
        <Container component="main" fixed>
            <Grid container alignItems="center" justifyContent="center">
                <Grid
                    md={2}
                    item
                >
                    <Timer currentPlayer={currentPlayer} restart={restart}/>
                </Grid>
                <Grid
                    item
                    md={10}
                    alignItems="center"
                    flexDirection="column"
                    display="flex"
                >
                    <BoardComponent
                        board={board}
                        setBoard={setBoard}
                        currentPlayer={currentPlayer}
                        swapPlayer={swapPlayer}
                    />
                </Grid>
                {/*<LostFigures title={"Чёрные фигуры"} figures={board.lostBlackFigures}/>*/}
                {/*<LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigures}/>*/}
            </Grid>
        </Container>
    )
}

/*
        <div className="app">


            <div>

            </div>
        </div>
 */

export default App;
