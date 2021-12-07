import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import {
    Paper,
    Tabs,
    Tab
} from '@mui/material';

import OffensiveTable from './OffensiveTable/OffensiveTable';
import SupportTable from './SupportTable/SupportTable';
import PlayerDetailsCard from './PlayerDetailsCard';
import RoleIcon from '../RoleIcon/RoleIcon';

import { formatDPS, sortProfessionAggrigatesByFrequency } from '../../utils';
import styles from './styles';

const tabsTheme = createTheme({
    palette: {
        secondary: {
            main: '#F57600'
        }
    }
});

const buildTableData = (accounts) => Object.keys(accounts).map((accountName) => {
    const account = accounts[accountName];

    const sortedProfessions = sortProfessionAggrigatesByFrequency(account.professionAggrigates);

    return {
        fullAccount: account,
        name: account.accountName,
        encounterCount: account.encounterCount,
        professions: {
            displayVal: sortedProfessions,
            sortVal: sortedProfessions[0]
        },
        avgBossDps: {
            displayVal: formatDPS((account.totalBossDps / account.encounterCount).toFixed(0)),
            sortVal:  parseInt(account.totalBossDps / account.encounterCount)
        },
        avgCleaveDps: {
            displayVal: formatDPS((account.totalCleaveDps / account.encounterCount).toFixed(0)),
            sortVal:  parseInt(account.totalCleaveDps / account.encounterCount)
        },
        downs: account.downDeathStats.downs,
        firstDowns: account.downDeathStats.firstDownCount,
        deaths: account.downDeathStats.deaths,
        firstDeaths: account.downDeathStats.firstDeathCount,
        revives: account.revives,
        reviveTime: parseFloat(account.reviveTime.toFixed(1)),
        breakbar: {
            displayVal: formatDPS(account.totalBreakbarDamage),
            sortVal: parseInt(account.totalBreakbarDamage)
        },
        totalDamageTaken: {
            displayVal: formatDPS(account.totalDamageTaken),
            sortVal: parseInt(account.totalDamageTaken)
        },
        scholarUptime: account.totalScholarRuneUptime ? parseFloat((account.totalScholarRuneUptime / account.encounterCount).toFixed(1)) : 'Unknown',
        flankingUptime: account.totalThiefRuneUptime ? parseFloat((account.totalThiefRuneUptime / account.encounterCount).toFixed(1)) : 'Unknown'
    }
});

const PlayerBreakdown = forwardRef(({ collectorId, setSelectedPlayer, selectedPlayer }, ref) => {
    const [currentTab, setCurrentTab] = React.useState(0);

    const accounts = useSelector((state) => state?.collectorStats?.stats?.stats?.accounts);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (accounts) {
            setTableData(buildTableData(accounts));
        }
    }, [accounts])

    return (
        <Paper sx={styles.paper}>
            <Box sx={styles.text}>Player Breakdown Table</Box>
            <ThemeProvider theme={tabsTheme}>
                <Tabs
                    centered
                    value={currentTab}
                    onChange={(e, newVal) => setCurrentTab(newVal)}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab icon={<Box sx={{ paddingRight: '5px' }}><RoleIcon boon={'power-dps'} size={20}/></Box>} iconPosition="start" sx={styles.tabRoot} label="Damage Stats"/>
                    <Tab icon={<Box sx={{ paddingRight: '5px' }}><RoleIcon boon={'healer'} size={20}/></Box>} iconPosition="start" sx={styles.tabRoot} label="Support Stats"/>
                </Tabs>
            </ThemeProvider>
            {currentTab === 0 && (
                <OffensiveTable tableData={tableData} setSelectedPlayer={setSelectedPlayer}/>
            )}
            {currentTab === 1 && (
                <SupportTable tableData={tableData} setSelectedPlayer={setSelectedPlayer}/>
            )}
            {selectedPlayer ? (
                <Box ref={ref} sx={styles.playerDetailsOuterContainer}>
                    <PlayerDetailsCard player={selectedPlayer} collectorId={collectorId} resetOnClick={() => setSelectedPlayer(null)}/>
                </Box>
            ) : (
                <Box component={'p'} sx={styles.detailsNoneSelected}>
                    Select a player to view details...
                </Box>
            )}
        </Paper>
  );
});

export default PlayerBreakdown;
