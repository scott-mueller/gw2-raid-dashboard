import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { formatDPS } from '../../utils';
import styles from './styles';

const useStyles = makeStyles({
    root: {
      background: '#E6EEF0',
    }
  });

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
                    <div className={css(styles.cardText, styles.cardTitle)}>
                        Success Rate
                    </div>
                    <div className={css(styles.cardText, styles.cardContent)}>
                        {`${((stats.successCount / stats.logCount) * 100).toFixed(0)}%`}
                    </div>
                    <div className={css(styles.cardText, styles.cardSubheading)}>{`${stats.successCount} of ${stats.logCount} Logs`}</div>
                </Paper>
            )
        }
        case 'avgBossDps': {
            return (
                <Paper classes={{ root: classes.root}}className={css(styles.paper, styles.fixedHeight)}>
                    <div className={css(styles.cardText, styles.cardTitle)}>Avg Boss Dps</div>
                    <div className={css(styles.cardText, styles.cardContent, styles.dps)}>{`${formatDPS((stats.totalBossDps / stats.logCount).toFixed(0))}`}</div>
                </Paper>
            );
        }
        case 'avgCleaveDps': {
            return (
                <Paper classes={{ root: classes.root}}className={css(styles.paper, styles.fixedHeight)}>
                    <div className={css(styles.cardText, styles.cardTitle)}>Avg Cleave Dps</div>
                    <div className={css(styles.cardText, styles.cardContent, styles.dps)}>{`${formatDPS((stats.totalCleaveDps / stats.logCount).toFixed(0))}`}</div>
                </Paper>
            );
        }
        case 'encounterTime': {
            return (
                <Paper classes={{ root: classes.root}}className={css(styles.paper, styles.fixedHeight)}>
                    <div className={css(styles.cardText, styles.cardTitle)}>Combat Time</div>
                    <div className={css(styles.cardText, styles.cardContent)}>{`N/A`}</div>
                    <div className={css(styles.cardText, styles.cardSubheading)}>{`N/A Total Elapsed Time`}</div>
                </Paper>
            )
        }
    }
};

export default OverviewStatsCard;