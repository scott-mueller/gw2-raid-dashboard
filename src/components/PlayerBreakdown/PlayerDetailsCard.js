import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';
import { equals, uniq } from 'ramda';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import styles from './styles';
import {
    APPLY_PROFESSION_FILTER,
    APPLY_ROLE_FILTER,
    FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR,
    RESET_PROFESSION_AND_ROLE_FILTERS
} from '../../redux/actions';
import { Chip } from '@material-ui/core';

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

    return (
        <div className={css(styles.playerDetailsContainer)}>
            <Paper elevation={18}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={css(styles.detailsTitle)}>{player.accountName}</div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={()=> dispatch({ type: RESET_PROFESSION_AND_ROLE_FILTERS })} variant="contained">Reset Filters</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {Object.keys(player.professionAggrigates).map((profession) => (
                            <Chip 
                                label={profession}
                                onClick={() => dispatch({ type: APPLY_PROFESSION_FILTER, payload: profession})}
                                disabled={!presentProfessions.includes(profession)}
                                variant={activeFilters.profession === profession ? 'outlined' : 'default'}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        {Object.keys(player.roleMap).map((role) => (
                            <Chip
                                label={role.split('-').join(' ')}
                                onClick={() => dispatch({ type: APPLY_ROLE_FILTER, payload: role.split('-').join(' ')})}
                                disabled={!presentRoles.includes(role.split('-').join(' '))}
                                variant={activeFilters.roles.includes(role.split('-').join(' ')) ? 'outlined' : 'default'}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <div>{`Average Boss DPS: ${filteredStats.totalBossDps / filteredStats.encounterCount}`}</div>
                            <div>{`Average Cleave DPS: ${filteredStats.totalCleaveDps / filteredStats.encounterCount}`}</div>
                            <div>{`Total Breakbar Damage: ${filteredStats.totalBreakbarDamage}`}</div>
                            <div>{`Downs: ${filteredStats.downDeathStats.downs}`}</div>
                            <div>{`Deaths: ${filteredStats.downDeathStats.deaths}`}</div>
                            <div>{`First Downs: ${filteredStats.downDeathStats.firstDownCount}`}</div>
                            <div>{`First Deaths: ${filteredStats.downDeathStats.firstDeathCount}`}</div>
                            <div>{`Revives: ${filteredStats.revives}`}</div>
                            <div>{`Revive Time: ${filteredStats.reviveTime}`}</div>
                            <div>{`Damage + Barrier Taken: ${filteredStats.totalBarrierTaken + filteredStats.totalDamageTaken}`}</div>
                            <div>{`Encounters: ${filteredStats.encounterCount}`}</div>
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
