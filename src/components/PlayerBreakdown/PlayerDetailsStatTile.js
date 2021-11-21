import React from 'react';

import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';

import styles from './styles';

const PlayerDetailsStatTile = ({ primaryTitle, primaryData, secondaryTitle, secondaryData }) => {



    return(
        <Paper elevation={4}>
            <Box sx={styles.tileContainer}>
                <Box sx={styles.primaryTitle}>{primaryTitle}</Box>
                <Box sx={styles.primaryData}>{primaryData}</Box>
                {secondaryTitle !== undefined && secondaryData !== undefined && (
                    <Box sx={styles.secondaryTitle}>{`${secondaryTitle}: ${secondaryData}`}</Box>
                )}
            </Box>
        </Paper>
    );
};

export default PlayerDetailsStatTile;
