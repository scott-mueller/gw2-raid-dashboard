import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

import { FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS } from '../../redux/actions';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';

import TimelineEncounterSimpleTable from './TimelineEncounterSimpleTable';

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

const useStyles = makeStyles((theme) => ({
    number: {
        flexBasis: '10%',
        flexShrink: 0,
    },
    duration: {
        fontSize: theme.typography.pxToRem(15),
        fontFamily: 'Oxanium',
        fontWeight: 400,
        flexBasis: '30%',
        flexShrink: 0,
    },
    timeStartEnd: {
        flexBasis: '40%',
        flexShrink: 0,
    },
    chips: {
        flexBasis: '20%',
        flexShrink: 0,
    },
    chipRootSuccess: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        backgroundColor: '#4caf50'
    },
    chipRootFail: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        backgroundColor: '#ef5350'
    },
    accordionContent: {
          alignItems: 'center'
    }
  }));

const TimelineDetails = ({ boss, resetOnClick }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {

        return dispatch({type: FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS, payload: boss.encounterArray || ['OfFA3Oss']});
    }, [boss, dispatch]);

    const encounters = useSelector((state) => state?.collectorStats?.timelineEncounters);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    // Sort the encounters by startTime, then we can collect groups of bosses by same consecutive
    const sortedEncounters = encounters.sort((a, b) => {
        if (moment(a.utcTimeStart).isBefore(moment(b.utcTimeStart))) {
            return -1;
        }

        return 1;
    });

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
                        <div className={css(styles.accordionContainer)}>
                            {sortedEncounters.map((encounter) => (
                                <Accordion expanded={expanded === encounter.encounterId} onChange={handlePanelChange(encounter.encounterId)}>
                                    <AccordionSummary
                                        classes={{content: classes.accordionContent}}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <div className={classes.number}>{sortedEncounters.indexOf(encounter) + 1}</div>
                                        <div className={classes.duration}>{`Duration: ${encounter.durationMs.formatMsToString()}`}</div>
                                        <div className={classes.timeStartEnd}>
                                            {`Start: ${moment(encounter.utcTimeStart).tz(timeZone).format('H:mm:ss')} / End: ${moment(encounter.utcTimeEnd).tz(timeZone).format('H:mm:ss')}`}
                                        </div>
                                        <div className={classes.chips}><Chip classes={{root: encounter.success ? classes.chipRootSuccess : classes.chipRootFail}} label={encounter.success ? 'Success' : 'Fail'}></Chip></div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Button variant={'contained'}>
                                                        <Link href={encounter.dpsReportUrl} target={'_blank'} rel={'noopener noreferrer'}>View Full Report</Link>
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TimelineEncounterSimpleTable players={encounter.players}/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <div className={css({textAlign: 'right', paddingRight: '10px'})}>
                            <Button onClick={resetOnClick} variant="contained">Close</Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default TimelineDetails;