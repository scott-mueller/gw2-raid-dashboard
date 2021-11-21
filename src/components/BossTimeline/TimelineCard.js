import React from 'react';

import { Box } from '@mui/system';
import { Tooltip } from '@mui/material';

import styles from './styles';

const TimelineCard = ({ boss, onClick }) => {

    const tooltipText = () => (
        <React.Fragment>
            <Box sx={styles.timelineCardTooltip}>{boss.name}</Box>
        </React.Fragment>
    );

    return (
        <Box sx={styles.timelineCardContainer}>
            <Tooltip title={tooltipText()} placement={'top'} arrow>
                <Box
                    component={'img'} 
                    src={boss.icon} 
                    alt={boss.name} 
                    width={40} 
                    height={40}
                    sx={styles.bossImage}
                    onClick={() => onClick()}
                />
            </Tooltip>
            <Box component={'p'} sx={styles.timelineCardSubtext}>{boss.count}</Box>
        </Box>
    );
};

export default TimelineCard;