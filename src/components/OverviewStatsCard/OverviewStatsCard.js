import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import styles from './styles';

const useStyles = makeStyles({
    root: {
      background: '#E6EEF0',
    }
  });

const formatDPS = (val) => {
    return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

const OverviewStatsCard = ({ variant }) => {
    const stats = useSelector((state) => state?.collectorStats?.stats?.stats);
    const classes = useStyles();
    
    if (!stats) {
        return (<div></div>)
    }

    // eslint-disable-next-line default-case
    switch (variant) {
        case 'successRate': {
            return (
                <Paper classes={{ root: classes.root}}className={css(styles.paper, styles.fixedHeight)}>
                    <h2 className={css(styles.cardText, styles.cardTitle)}>Success Rate</h2>
                    <h1 className={css(styles.cardText, styles.cardContent)}>{`${((stats.successCount / stats.logCount) * 100).toFixed(0)}%`}</h1>
                    <p className={css(styles.cardText, styles.cardSubheading)}>{`${stats.successCount} of ${stats.logCount} Logs`}</p>
                </Paper>
            )
        }
        case 'avgBossDps': {
            return (
                <Paper classes={{ root: classes.root}}className={css(styles.paper, styles.fixedHeight)}>
                    <h2 className={css(styles.cardText, styles.cardTitle)}>Avg Boss Dps</h2>
                    <h1 className={css(styles.cardText, styles.cardContent, styles.dps)}>{`${formatDPS((stats.totalBossDps / stats.logCount).toFixed(0))}`}</h1>
                </Paper>
            );
        }
        case 'avgCleaveDps': {
            return (
                <Paper classes={{ root: classes.root}}className={css(styles.paper, styles.fixedHeight)}>
                    <h2 className={css(styles.cardText, styles.cardTitle)}>Avg Cleave Dps</h2>
                    <h1 className={css(styles.cardText, styles.cardContent, styles.dps)}>{`${formatDPS((stats.totalCleaveDps / stats.logCount).toFixed(0))}`}</h1>
                </Paper>
            );
        }
        case 'encounterTime': {
            return (
                <Paper classes={{ root: classes.root}}className={css(styles.paper, styles.fixedHeight)}>
                    <h2 className={css(styles.cardText, styles.cardTitle)}>Combat Time</h2>
                    <h1 className={css(styles.cardText, styles.cardContent, styles.dps)}>{`N/A`}</h1>
                </Paper>
            )
        }
    }
};

export default OverviewStatsCard;