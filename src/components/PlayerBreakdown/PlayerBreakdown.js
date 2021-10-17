import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import OffensiveTable from './OffensiveTable/OffensiveTable';
import SupportTable from './SupportTable/SupportTable';
import PlayerDetailsCard from './PlayerDetailsCard';
import { formatDPS } from '../../utils';
import styles from './styles';

const useStyles = makeStyles((theme) => ({
    root: {
      background: '#E6EEF0',
    },
    tabRoot: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '700',
        color: '#F57600',
        background: 'black'
    }
}));

const buildTableData = (accounts) => Object.keys(accounts).map((accountName) => {
    const account = accounts[accountName];

    const sortedProfessions = Object
        .keys(account.professionAggrigates)
        .map((profession) => {
            let count = 0;
            account.professionAggrigates[profession].forEach((roleAgg) => count += roleAgg.count);

            return {
                profession,
                count
            };
        })
        .sort((a, b) => b.count - a.count)
        .map((profession) => profession.profession);

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
    const classes = useStyles();
    const [currentTab, setCurrentTab] = React.useState(0);

    const accounts = useSelector((state) => state?.collectorStats?.stats?.stats?.accounts);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (accounts) {
            setTableData(buildTableData(accounts));
        }
    }, [accounts])

    console.log(currentTab)

    return (
        <Paper classes={{ root: classes.root}} className={css(styles.paper)}>
            <div className={css(styles.text)}>Player Breakdown Table</div>
            <div className={css({ display: 'flex', justifyContent: 'center' })}>
                <Tabs value={currentTab} onChange={(e, newVal) => setCurrentTab(newVal)}>
                    <Tab classes={{root: classes.tabRoot}} label="Damage Stats"/>
                    <Tab classes={{root: classes.tabRoot}} label="Support Stats"/>
                </Tabs>
            </div>
            {currentTab === 0 && (
                <OffensiveTable tableData={tableData} setSelectedPlayer={setSelectedPlayer}/>
            )}
            {currentTab === 1 && (
                <SupportTable tableData={tableData} setSelectedPlayer={setSelectedPlayer}/>
            )}
            {selectedPlayer ? (
                <div ref={ref} className={css(styles.playerDetailsOuterContainer)}>
                    <PlayerDetailsCard player={selectedPlayer} collectorId={collectorId} resetOnClick={() => setSelectedPlayer(null)}/>
                </div>
            ) : (
                <p className={css(styles.detailsNoneSelected)}>
                    Select a player to view details...
                </p>
            )}
        </Paper>
  );
});

export default PlayerBreakdown;
