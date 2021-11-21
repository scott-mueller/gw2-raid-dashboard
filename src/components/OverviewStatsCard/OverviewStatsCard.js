import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';

import { formatDPS } from '../../utils';
import styles from './styles';

// eslint-disable-next-line no-extend-native
Number.prototype.formatMsToString = function () {
    //return '88m 88s'
    const input = this.valueOf()// + 1000000;

    if(input > 3600000) {
        const h = Math.floor(input / 3600000);
        const m = Math.floor((input - (h * 3600000)) / 60000)
        return `${h}h ${m}m`
    }


    const m = Math.floor(input / 60000).toString();
    const s = Math.floor((input - (m * 60000)) / 1000).toString();
    //const ms = (input - ((m * 60000) + (s * 1000))).toString();
    return `${m}m ${s}s`

    //return m.padStart(2, '0') + 'm ' + s.padStart(2, '0') + 's ' + ms.padStart(3, '0') + 'ms';
};

const OverviewStatsCard = ({ variant }) => {
    const stats = useSelector((state) => state?.collectorStats?.stats?.stats);
    
    if (!stats) {
        return (<div></div>)
    }

    // eslint-disable-next-line default-case
    switch (variant) {
        case 'successRate': {
            return (
                <Paper sx={styles.paper}>
                    <Box sx={{...styles.cardText, ...styles.cardTitle}}>
                        Success Rate
                    </Box>
                    <Box sx={{...styles.cardText, ...styles.cardContent}}>
                        {`${((stats.successCount / stats.logCount) * 100).toFixed(0)}%`}
                    </Box>
                    <Box sx={{...styles.cardText, ...styles.cardSubheading}}>{`${stats.successCount} of ${stats.logCount} Logs`}</Box>
                </Paper>
            )
        }
        case 'avgBossDps': {
            return (
                <Paper sx={styles.paper}>
                    <Box sx={{...styles.cardText, ...styles.cardTitle}}>Avg Boss Dps</Box>
                    <Box sx={{...styles.cardText, ...styles.cardContent, ...styles.dps}}>{`${formatDPS((stats.totalBossDps / stats.logCount).toFixed(0))}`}</Box>
                </Paper>
            );
        }
        case 'avgCleaveDps': {
            return (
                <Paper sx={styles.paper}>
                    <Box sx={{...styles.cardText, ...styles.cardTitle}}>Avg Cleave Dps</Box>
                    <Box sx={{...styles.cardText, ...styles.cardContent, ...styles.dps}}>{`${formatDPS((stats.totalCleaveDps / stats.logCount).toFixed(0))}`}</Box>
                </Paper>
            );
        }
        case 'encounterTime': {
            return (
                <Paper sx={styles.paper}>
                    <Box sx={{...styles.cardText, ...styles.cardTitle}}>Time in Combat</Box>
                    <Box sx={{...styles.cardText, ...styles.cardContent, ...styles.combatTime}}>{stats.combatTime.formatMsToString()}</Box>
                    <Box sx={{...styles.cardText, ...styles.cardSubheading}}>{`${moment(stats.lastEncounterEnd).diff(stats.firstEncounterStart).formatMsToString()} Total Elapsed Time`}</Box>
                </Paper>
            )
        }
    }
};

export default OverviewStatsCard;