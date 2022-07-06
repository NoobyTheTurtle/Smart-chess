import React, {FC, useMemo} from 'react';
import {Cell} from "../models/Cell";
import {Box, styled} from "@mui/material";
import {Colors} from "../models/Colors";

interface CellProps {
    cell: Cell
    selected: boolean
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    const backgroundColor = () => {
        if (selected)
            return "brown"
        if (cell.available && cell.figure)
            return "green"
        if (cell.color === Colors.BLACK)
            return "rgb(18, 70, 111)"

        return "rgb(217, 222, 223)"
    }

    return (
        <Box
            onClick={() => click(cell)}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundColor: backgroundColor(),
                width: 64,
                height: 64,
            }}
        >
            {cell.available && !cell.figure && (<Box
                sx={{
                    height: 16,
                    width: 16,
                    borderRadius: "50%",
                    backgroundColor: "green"
                }}
            />)}
            {cell.figure?.logo && (
                <img
                    width={48}
                    height={48}
                    src={cell.figure.logo}
                    alt={"logo-" + cell.figure.name}
                />
            )}
        </Box>
    );
};

export default CellComponent;


/*
className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
style={{background: cell.available && cell.figure ? 'green' : ''}}
 */