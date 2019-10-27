import React, { useEffect, useState } from 'react';

import {
    Box,
    LinearProgress,
} from "@material-ui/core"


function LoadingProgress(props) {
    return (
        <Box my={2}>
            <LinearProgress variant="determinate" value={props.value}></LinearProgress>
        </Box>
    )
}

export default LoadingProgress;