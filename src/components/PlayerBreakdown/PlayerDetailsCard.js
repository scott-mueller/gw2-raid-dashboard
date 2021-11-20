import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';
import { equals, uniq } from 'ramda';

import { adaptV4Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import styles from './styles';
import {
    APPLY_ROLE_FILTER,
    FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR,
    RESET_PROFESSION_AND_ROLE_FILTERS
} from '../../redux/actions';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Chip } from '@mui/material';
import ProfessionIconGroup from '../ProfessionIconGroup/ProfessionIconGroup';
import PlayerDetailsStatTile from './PlayerDetailsStatTile';
import { formatDPS, sortProfessionAggrigatesByFrequency } from '../../utils';
import ProfessionChip from '../ProfessionChip/ProfessionChip';
import RoleIcon from '../RoleIcon/RoleIcon';
import CustomButton from '../CustomButton/CustomButton';

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
    },
    gridContainer: {
        padding: '16px'
    },
    chipRootTest: {
        background: 'green',
        '&:hover, &:focus': {
            background: 'red'
        },
    },
    chipOutlinedTest: {
        '&:active': {
            background: 'blue'
        }
    },
    chipRoot: {
        fontFamily: 'Oxanium',
    }
}));

const detailsCardTheme = createTheme(adaptV4Theme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 1000,
            lg: 1500,
            xl: 1700,
        }
    }
}));

const roleChipTheme = createTheme(adaptV4Theme({
    palette: {
        primary: {
            main: '#303F4B'
        }
    }
}));

const computeStatsForFilteredList = (filteredEncounters, accountName) => {

    const filteredStats = {
        downDeathStats: {
            firstDownCount: 0,
            firstDeathCount: 0,
            downs: 0,
            deaths: 0
        },
        revives: 0,
        reviveTime: 0,
        successfulEncounters: 0,
        encounterCount: 0,
        totalBossDps: 0,
        totalCleaveDps: 0,
        totalBreakbarDamage: 0,
        totalDamageTaken: 0,
        totalBarrierTaken: 0
    };

    filteredEncounters.forEach((encounter) => {

        const player = encounter.players.filter((p) => p.accountName === accountName)[0];
        if (player) {

            if (encounter.success) {
                filteredStats.successfulEncounters += 1;
            }

            filteredStats.downDeathStats.downs += player.defensiveStats.downs.length;
            filteredStats.downDeathStats.deaths += player.defensiveStats.deaths.length;
            filteredStats.downDeathStats.firstDownCount += encounter.firstDown === player.accountName ? 1 : 0;
            filteredStats.downDeathStats.firstDeathCount += encounter.firstDeath === player.accountName ? 1 : 0;
            filteredStats.revives += player.supportStats.revives;
            filteredStats.reviveTime += player.supportStats.reviveTimes;
            filteredStats.encounterCount++;
            filteredStats.totalBossDps += player.dmgStats.targetDPS;
            filteredStats.totalCleaveDps += player.dmgStats.totalDPS;
            filteredStats.totalBreakbarDamage += player.dmgStats.defianceBarDamage;
            filteredStats.totalDamageTaken += player.defensiveStats.damageTaken;
            filteredStats.totalBarrierTaken += player.defensiveStats.damageBarrier;
        }
    });

    return filteredStats;
};

const PlayerDetailsCard = ({ player, collectorId, resetOnClick }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const filteredEncounters = useSelector((state) => state?.collectorStats?.selectedPlayer?.filteredEncounters);
    const filteredStats = computeStatsForFilteredList(filteredEncounters, player.accountName);
    const activeFilters = useSelector((state) => state?.collectorStats?.selectedPlayer?.filters);
    const [presentRoles, setPresentRoles] = useState([]);
    const [presentProfessions, setPresentProfessions] = useState([]);

    const sortedProfessions = sortProfessionAggrigatesByFrequency(player.professionAggrigates);

    useEffect(() => {
        return dispatch({type: FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR, payload: { accountName: player.accountName, collectorId }});
    }, [player, collectorId, dispatch]);

    useEffect(() => {
        let newRoles = [];
        filteredEncounters.forEach((encounter) => {
            const pl =  encounter.players.filter((p) => p.accountName === player.accountName)[0];
            if (pl) {
                newRoles = [...newRoles, ...pl.roles];
            }

        });
        newRoles = uniq(newRoles);

        if (!equals(newRoles, presentRoles)) {
            setPresentRoles(newRoles);
        }

    }, [filteredEncounters, player.accountName, presentRoles]);

    useEffect(() => {
        let newProfessions = [];
        filteredEncounters.forEach((encounter) => {
            const pl =  encounter.players.filter((p) => p.accountName === player.accountName)[0];
            if (pl) {
                newProfessions = [...newProfessions, pl.profession];
            }
        });
        newProfessions = uniq(newProfessions);

        if (!equals(newProfessions, presentProfessions)) {
            setPresentProfessions(newProfessions);
        }
    }, [filteredEncounters, player.accountName, presentProfessions]);
    
    const statRows = [
        { 
            primaryTitle: 'Encounters',
            primaryData: filteredStats.encounterCount,
            secondaryTitle: 'Success Rate',
            secondaryData: `${((filteredStats.successfulEncounters / filteredStats.encounterCount) * 100).toFixed(0)}% (${filteredStats.successfulEncounters} of ${filteredStats.encounterCount})`
        },
        { 
            primaryTitle: 'Avg Boss DPS',
            primaryData: formatDPS((filteredStats.totalBossDps / filteredStats.encounterCount).toFixed(0))
        },
        {
            primaryTitle: 'Avg Cleave DPS',
            primaryData: formatDPS((filteredStats.totalCleaveDps / filteredStats.encounterCount).toFixed(0))
        },
        {
            primaryTitle: 'Total Breakbar Damage',
            primaryData: formatDPS(filteredStats.totalBreakbarDamage),
            secondaryTitle: 'Average Per Encounter',
            secondaryData: formatDPS((filteredStats.totalBreakbarDamage / filteredStats.encounterCount).toFixed(0))
        },
        {
            primaryTitle: 'Downs',
            primaryData: filteredStats.downDeathStats.downs,
            secondaryTitle: 'First Downs',
            secondaryData: filteredStats.downDeathStats.firstDownCount
        },
        {
            primaryTitle: 'Deaths',
            primaryData: filteredStats.downDeathStats.deaths,
            secondaryTitle: 'First Deaths',
            secondaryData: filteredStats.downDeathStats.firstDeathCount
        },
        {
            primaryTitle: 'Revives',
            primaryData: filteredStats.revives,
            secondaryTitle: 'Revive Time',
            secondaryData: `${filteredStats.reviveTime.toFixed(1)}s`
        },
        {
            primaryTitle: 'Dmg + Barrier Taken',
            primaryData: formatDPS(filteredStats.totalDamageTaken),
            secondaryTitle: 'True Damage Taken',
            secondaryData: formatDPS(filteredStats.totalDamageTaken - filteredStats.totalBarrierTaken)
        },
    ];

    return (
        <div className={css(styles.playerDetailsContainer)}>
            <Paper elevation={18}>
                <Grid container spacing={3} classes={{ container: classes.gridContainer }}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid className={css(styles.filterTitleGrid)} item sm={12} md={6}>
                                <div className={css(styles.detailsTitle)}>{player.accountName}</div>
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <div className={css(styles.professionIconGroupLarge)}>
                                    <ProfessionIconGroup nameArray={sortedProfessions || []} size={60}/>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={css(styles.filterContainer)}>
                                    <Paper className={css(styles.filterPaper)} elevation={4}>
                                        <div className={css(styles.filterTitle)}>Performance Filters</div>
                                        <div className={css(styles.chipGroup)}>
                                                {Object.keys(player.professionAggrigates).map((profession) => (
                                                    <div className={css(styles.chipContainer)}>
                                                        <ProfessionChip 
                                                            profession={profession} 
                                                            disabled={!presentProfessions.includes(profession)} 
                                                            variant={activeFilters.profession === profession ? 'outlined' : 'default'}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        <div className={css(styles.chipGroup, { paddingTop: '5px', paddingBottom: '5px' })}>
                                            <StyledEngineProvider injectFirst>
                                                <ThemeProvider theme={roleChipTheme}>
                                                    {Object.keys(player.roleMap).map((role) => (
                                                        <div className={css(styles.chipContainer)}>
                                                            <Chip
                                                                classes={{root: classes.chipRoot}}
                                                                icon={<div className={css(styles.roleChipIcon)}><RoleIcon boon={role} size={22}/></div>}
                                                                label={role.split('-').join(' ')}
                                                                color={'primary'}
                                                                onClick={() => dispatch({ type: APPLY_ROLE_FILTER, payload: role.split('-').join(' ')})}
                                                                disabled={!presentRoles.includes(role.split('-').join(' '))}
                                                                variant={activeFilters.roles.includes(role.split('-').join(' ')) ? 'outlined' : 'default'}
                                                            />
                                                        </div>
                                                    ))}
                                                </ThemeProvider>
                                            </StyledEngineProvider>
                                        </div>
                                    </Paper>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <StyledEngineProvider injectFirst>
                                <ThemeProvider theme={detailsCardTheme}>
                                    <Grid container spacing={2}>
                                        {statRows.map((row) => (
                                            <Grid item xl={3} lg={4} md={6} xs={12}>
                                                <PlayerDetailsStatTile
                                                    primaryTitle={row.primaryTitle}
                                                    primaryData={row.primaryData}
                                                    secondaryTitle={row.secondaryTitle}
                                                    secondaryData={row.secondaryData}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </ThemeProvider>
                            </StyledEngineProvider>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={css(styles.resetCloseButtonGroup)}>
                            <div className={css(styles.resetButton)}>
                                <CustomButton onClick={()=> dispatch({ type: RESET_PROFESSION_AND_ROLE_FILTERS })}>Reset Filters</CustomButton>
                            </div>
                            <CustomButton onClick={resetOnClick}>Close</CustomButton>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default PlayerDetailsCard;
