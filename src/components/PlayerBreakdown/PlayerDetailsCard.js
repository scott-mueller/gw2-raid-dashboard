import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { equals, uniq } from 'ramda';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import styles from './styles';
import { Box } from '@mui/system';
import {
    APPLY_ROLE_FILTER,
    FETCH_ENCOUNTERS_FOR_PLAYER_IN_COLLECTOR,
    RESET_PROFESSION_AND_ROLE_FILTERS
} from '../../redux/actions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Chip } from '@mui/material';
import ProfessionIconGroup from '../ProfessionIconGroup/ProfessionIconGroup';
import PlayerDetailsStatTile from './PlayerDetailsStatTile';
import { formatDPS, sortProfessionAggrigatesByFrequency } from '../../utils';
import ProfessionChip from '../ProfessionChip/ProfessionChip';
import RoleIcon from '../RoleIcon/RoleIcon';
import CustomButton from '../CustomButton/CustomButton';
import useForceUpdate from '../../hooks/useForceUpdate';

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
});

const roleChipTheme = createTheme({
    palette: {
        primary: {
            main: '#303F4B'
        }
    }
});

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
    const dispatch = useDispatch();

    const forceUpdate = useForceUpdate();

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
        <Box sx={styles.playerDetailsContainer}>
            <Paper elevation={18}>
                <Grid container spacing={3} sx={styles.gridContainer}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid sx={styles.filterTitleGrid} item sm={12} md={6}>
                                <Box sx={styles.detailsTitle}>{player.accountName}</Box>
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <Box sx={styles.professionIconGroupLarge}>
                                    <ProfessionIconGroup nameArray={sortedProfessions || []} size={60}/>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.filterContainer}>
                                    <Paper onClick={() => forceUpdate()} sx={styles.filterPaper} elevation={4}>
                                        <Box sx={styles.filterTitle}>Performance Filters</Box>
                                        <Box sx={styles.chipGroup}>
                                                {Object.keys(player.professionAggrigates).map((profession) => (
                                                    <Box sx={styles.chipContainer}>
                                                        <ProfessionChip 
                                                            profession={profession} 
                                                            disabled={!presentProfessions.includes(profession)} 
                                                            variant={activeFilters.profession === profession ? 'outlined' : 'default'}
                                                        />
                                                    </Box>
                                                ))}
                                            </Box>
                                        <Box sx={{...styles.chipGroup, paddingTop: '5px', paddingBottom: '5px' }}>
                                            <ThemeProvider theme={roleChipTheme}>
                                                {Object.keys(player.roleMap).map((role) => (
                                                    <Box sx={styles.chipContainer}>
                                                        <Chip
                                                            sx={{ fontFamily: 'Oxanium' }}
                                                            icon={<Box sx={styles.roleChipIcon}><RoleIcon boon={role} size={22}/></Box>}
                                                            label={role.split('-').join(' ')}
                                                            color={'primary'}
                                                            onClick={() => dispatch({ type: APPLY_ROLE_FILTER, payload: role.split('-').join(' ')})}
                                                            disabled={!presentRoles.includes(role.split('-').join(' '))}
                                                            variant={activeFilters.roles.includes(role.split('-').join(' ')) ? 'outlined' : 'default'}
                                                        />
                                                    </Box>
                                                ))}
                                            </ThemeProvider>
                                        </Box>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
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
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={styles.resetCloseButtonGroup}>
                            <Box sx={styles.resetButton}>
                                <CustomButton onClick={()=> { forceUpdate(); dispatch({ type: RESET_PROFESSION_AND_ROLE_FILTERS }); }}>Reset Filters</CustomButton>
                            </Box>
                            <CustomButton onClick={resetOnClick}>Close</CustomButton>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default PlayerDetailsCard;
