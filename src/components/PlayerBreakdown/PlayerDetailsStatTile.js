import React from 'react';
import { css } from '@emotion/css';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import styles from './styles';

const PlayerDetailsStatTile = ({ primaryTitle, primaryData, secondaryTitle, secondaryData }) => {



    return(
        <Paper elevation={4}>
            <div className={css(styles.tileContainer)}>
                <div className={css(styles.primaryTitle)}>{primaryTitle}</div>
                <div className={css(styles.primaryData)}>{primaryData}</div>
                {secondaryTitle !== undefined && secondaryData !== undefined && (
                    <div className={css(styles.secondaryTitle)}>{`${secondaryTitle}: ${secondaryData}`}</div>
                )}
            </div>
        </Paper>
    );
};

export default PlayerDetailsStatTile;
