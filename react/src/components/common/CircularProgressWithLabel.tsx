import React from "react";
import {Box, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CircularProgressWithLabel({value}: { value: number; }) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={value}/>
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
};