import React from 'react';
import { css } from '@emotion/css';
import moment from 'moment-timezone';

import styles from './styles';

//import Accordion from '@material-ui/core/Accordion';
//import AccordionSummary from '@material-ui/core/AccordionSummary';
//import AccordionDetails from '@material-ui/core/AccordionDetails';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
//import ExpandMore from '@material-ui/icons/ExpandMore'
//import Typography from '@material-ui/core/Typography';


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

const TimelineDetails = ({ boss }) => {

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div id={'bossTimelineDetailsContent'} className={css(styles.detailsContainer)}>
            <Paper elevation={18}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <div className={css(styles.detailsContent)}>
                            <div className={css(styles.detailsTitle)}>{boss.name}</div>
                            <div className={css(styles.detailsContentText)}>{`${boss.count} Log${boss.count === 1 ? '' : '(s)'} in Group`}</div>
                            <div className={css(styles.detailsContentText)}>{`Group started: ${moment(boss.firstEncounterStart).tz(timeZone).format('MMMM Do YYYY, H:mm:ss')}`}</div>
                            <div className={css(styles.detailsContentText)}>{`Group Ended: ${moment(boss.lastEncounterEnd).tz(timeZone).format('MMMM Do YYYY, H:mm:ss')}`}</div>
                            <div className={css(styles.detailsContentText)}>{`Time in Combat: ${boss.combatTime.formatMsToString()}`}</div>
                            <div className={css(styles.detailsContentText)}>{`Elapsed Time: ${moment(boss.lastEncounterEnd).diff(boss.firstEncounterStart).formatMsToString()}`}</div>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={css({display: 'flex', justifyContent: 'right', paddingRight: '12px'})}>
                            <img 
                                src={boss.icon} 
                                alt={boss.name} 
                                width={150} 
                                height={150}
                                className={css(styles.bossDetailsImage)}
                            />
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <div>Logs</div>

                    </Grid>
                    <Grid item xs={12}>
                        <div className={css({textAlign: 'right', paddingRight: '10px'})}>
                            <Button variant="contained">Reset</Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default TimelineDetails;