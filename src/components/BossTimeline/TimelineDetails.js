import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { Box } from '@mui/system';
import {
    Grid,
    Paper,
    Link,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TimelineEncounterSimpleTable from './TimelineEncounterSimpleTable';
import CustomButton from '../CustomButton/CustomButton';

import { FETCH_ENCOUNTERS_FOR_TIMELINE_DETAILS } from '../../redux/actions';
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

const TimelineDetails = ({ boss, resetOnClick }) => {
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(false);

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
        <Box id={'bossTimelineDetailsContent'} sx={styles.detailsContainer}>
            <Paper elevation={18}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Box sx={styles.detailsContent}>
                            <Box sx={styles.detailsTitle}>{boss.name}</Box>
                            <Box sx={styles.detailsContentText}>{`${boss.count} Log${boss.count === 1 ? '' : '(s)'} in Group`}</Box>
                            <Box sx={styles.detailsContentText}>{`Group started: ${moment(boss.firstEncounterStart).tz(timeZone).format('MMMM Do YYYY, H:mm:ss')}`}</Box>
                            <Box sx={styles.detailsContentText}>{`Group Ended: ${moment(boss.lastEncounterEnd).tz(timeZone).format('MMMM Do YYYY, H:mm:ss')}`}</Box>
                            <Box sx={styles.detailsContentText}>{`Time in Combat: ${boss.combatTime.formatMsToString()}`}</Box>
                            <Box sx={styles.detailsContentText}>{`Elapsed Time: ${moment(boss.lastEncounterEnd).diff(boss.firstEncounterStart).formatMsToString()}`}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{display: 'flex', justifyContent: 'right', paddingRight: '12px'}}>
                            <Box
                                component={'img'}
                                src={boss.icon} 
                                alt={boss.name}
                                width={150} 
                                height={150}
                                sx={styles.bossDetailsImage}
                            />
                        </Box>

                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={styles.accordionContainer}>
                            {sortedEncounters.map((encounter) => (
                                <Accordion expanded={expanded === encounter.encounterId} onChange={handlePanelChange(encounter.encounterId)}>
                                    <AccordionSummary
                                        sx={styles.accordionSummaryContent}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Box sx={styles.number}>{sortedEncounters.indexOf(encounter) + 1}</Box>
                                        <Box sx={styles.duration}>{`Duration: ${encounter.durationMs.formatMsToString()}`}</Box>
                                        <Box sx={styles.timeStartEnd}>
                                            {`Start: ${moment(encounter.utcTimeStart).tz(timeZone).format('H:mm:ss')} / End: ${moment(encounter.utcTimeEnd).tz(timeZone).format('H:mm:ss')}`}
                                        </Box>
                                        <Box sx={styles.chips}>
                                            <Chip sx={encounter.success ? styles.chipRootSuccess : styles.chipRootFail} label={encounter.success ? 'Success' : 'Fail'} />
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <CustomButton>
                                                        <Link href={encounter.dpsReportUrl} target={'_blank'} rel={'noopener noreferrer'}>View Full Report</Link>
                                                    </CustomButton>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TimelineEncounterSimpleTable players={encounter.players}/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>

                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{textAlign: 'right', paddingRight: '10px', paddingBottom: '12px'}}>
                            <CustomButton onClick={resetOnClick}>Close</CustomButton>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default TimelineDetails;