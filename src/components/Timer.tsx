import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import {Button, Typography, Box, Grid, Paper} from "@mui/material";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    return (
        <Grid
            container
            spacing={2}
            direction="column" //TODO: Сделать адаптивный переход, чтоб рестарт был внизу
        >
            <Grid item xs={4}>
                <Paper sx={{p: 1}}>
                    <Typography component="p" align="center" noWrap variant="h6">Черные - {blackTime}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper sx={{p: 1}}>
                    <Typography component="p" align="center" noWrap variant="h6">Белые - {whiteTime}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={handleRestart}
                    >
                        Рестарт
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Timer;