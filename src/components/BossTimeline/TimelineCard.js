import React from 'react';
import { css } from '@emotion/css';
import Tooltip from '@mui/material/Tooltip';

import styles from './styles';

const TimelineCard = ({ boss, onClick }) => {

    const tooltipText = () => (
        <React.Fragment>
            <div className={css(styles.timelineCardTooltip)}>{boss.name}</div>
        </React.Fragment>
    );

    return (
        <div className={css(styles.timelineCardContainer)}>
            <Tooltip title={tooltipText()} placement={'top'} arrow>
                <img 
                    src={boss.icon} 
                    alt={boss.name} 
                    width={40} 
                    height={40}
                    className={css(styles.bossImage)}
                    onClick={() => onClick()}
                />
            </Tooltip>
            <p className={css(styles.timelineCardSubtext)}>{boss.count}</p>
        </div>
    );
};

export default TimelineCard;