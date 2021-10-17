import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';
import { equals, uniq } from 'ramda';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import styles from './styles';
import {
    APPLY_ROLE_FILTER,
    FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR,
    RESET_PROFESSION_AND_ROLE_FILTERS
} from '../../redux/actions';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import ProfessionIconGroup from '../ProfessionIconGroup/ProfessionIconGroup';
import PlayerDetailsStatTile from './PlayerDetailsStatTile';
import { formatDPS } from '../../utils';
import ProfessionChip from '../ProfessionChip/ProfessionChip';
import RoleIcon from '../RoleIcon/RoleIcon';

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
    }
}));

const detailsCardTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 1000,
            lg: 1500,
            xl: 1700,
        }
    }
}) 

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

    const sortedProfessions = Object
        .keys(player.professionAggrigates)
        .map((profession) => {
            let count = 0;
            player.professionAggrigates[profession].forEach((roleAgg) => count += roleAgg.count);

            return {
                profession,
                count
            };
        })
        .sort((a, b) => b.count - a.count)
        .map((profession) => profession.profession);
    
    const statRows = [
            { primaryTitle: 'Avg Boss DPS', primaryData: formatDPS((filteredStats.totalBossDps / filteredStats.encounterCount).toFixed(0)) },
            { primaryTitle: 'Avg Cleave DPS', primaryData: formatDPS((filteredStats.totalCleaveDps / filteredStats.encounterCount).toFixed(0)) },
            { primaryTitle: 'Total Breakbar Damage', primaryData: formatDPS(filteredStats.totalBreakbarDamage), secondaryTitle: 'Average Per Encounter', secondaryData: formatDPS((filteredStats.totalBreakbarDamage / filteredStats.encounterCount).toFixed(0)) },
            { primaryTitle: 'Downs', primaryData: filteredStats.downDeathStats.downs, secondaryTitle: 'First Downs', secondaryData: filteredStats.downDeathStats.firstDownCount },
            { primaryTitle: 'Deaths', primaryData: filteredStats.downDeathStats.deaths, secondaryTitle: 'First Deaths', secondaryData: filteredStats.downDeathStats.firstDeathCount },
            { primaryTitle: 'Revives', primaryData: filteredStats.revives, secondaryTitle: 'Revive Time', secondaryData: `${filteredStats.reviveTime.toFixed(1)}s` },
            { primaryTitle: 'Dmg + Barrier Taken', primaryData: formatDPS(filteredStats.totalDamageTaken), secondaryTitle: 'True Damage Taken', secondaryData: formatDPS(filteredStats.totalDamageTaken - filteredStats.totalBarrierTaken) },
            { primaryTitle: 'Encounters', primaryData: filteredStats.encounterCount },
            //{ primaryTitle: 'Scholar Uptime', primaryData: filteredStats.encounterCount },
            //{ primaryTitle: 'Flanking Uptime', primaryData: filteredStats.encounterCount }
    ];

    return (
        <div className={css(styles.playerDetailsContainer)}>
            <Paper elevation={18}>
                <Grid container spacing={3} classes={{ container: classes.gridContainer }}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className={css(styles.detailsTitle)}>{player.accountName}</div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button onClick={()=> dispatch({ type: RESET_PROFESSION_AND_ROLE_FILTERS })} variant="contained">Reset Filters</Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {Object.keys(player.professionAggrigates).map((profession) => (
                                            <div className={css({ display: 'inline-block', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '1px', paddingRight: '1px' })}>
                                                <ProfessionChip 
                                                    profession={profession} 
                                                    disabled={!presentProfessions.includes(profession)} 
                                                    variant={activeFilters.profession === profession ? 'outlined' : 'default'}
                                                />
                                            </div>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {Object.keys(player.roleMap).map((role) => (
                                            <div className={css({ display: 'inline-block', paddingTop: '5px', paddingBottom: '5px', paddingLeft: '1px', paddingRight: '1px' })}>
                                                <Chip
                                                    icon={<div className={css({ paddingLeft: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' })}><RoleIcon boon={role} size={25}/></div>}
                                                    label={role.split('-').join(' ')}
                                                    onClick={() => dispatch({ type: APPLY_ROLE_FILTER, payload: role.split('-').join(' ')})}
                                                    disabled={!presentRoles.includes(role.split('-').join(' '))}
                                                    variant={activeFilters.roles.includes(role.split('-').join(' ')) ? 'outlined' : 'default'}
                                                />
                                            </div>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <div className={css({ display: 'flex', justifyContent: 'right' })}>
                                    <ProfessionIconGroup nameArray={sortedProfessions || []} size={80}/>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
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
    )
};

export default PlayerDetailsCard;
