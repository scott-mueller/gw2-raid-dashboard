import React from 'react';

import { Box } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';

import styles from './styles';

const BossIcon = ({ bossName, iconImg, size = 20, borderRadius }) => {

    const tooltipText = () => (
        <React.Fragment>
            <Box sx={styles.tooltip}>
                {bossName}
            </Box>
        </React.Fragment>
    );

    return(
        <Tooltip title={tooltipText()} placement={'top'} arrow>
            <Box
                component={'img'} 
                sx={{ borderRadius: borderRadius ?? Math.floor(size / 10) }}
                src={iconImg} 
                alt={bossName} 
                width={size} 
                height={size}
            />
        </Tooltip>
    );
};

export default BossIcon;
