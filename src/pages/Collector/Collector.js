// node_modules
import React, { useEffect, useState, useRef } from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Box } from '@mui/system';
import {
    CssBaseline,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse
} from '@mui/material';

// internal components
import ProfessionIcon from '../../components/ProfessionIcon/ProfessionIcon';
import HeaderAndSidebarTemplate from '../../components/HeaderAndSidebarTemplate/HeaderAndSidebarTemplate';
import OverviewStatsCard from '../../components/OverviewStatsCard/OverviewStatsCard';
import BossTable from '../../components/BossTable/BossTable';
import BossTimeline from '../../components/BossTimeline/BossTimeline';
import PlayerBreakdown from '../../components/PlayerBreakdown/PlayerBreakdown';

// internal tools
import { FETCH_COLLECTOR_DATA } from '../../redux/actions';
import styles from './styles';
import { sortProfessionAggrigatesByFrequency } from '../../utils';

const Collector = () => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const { search } = useLocation();
    const dispatch = useDispatch();
    const collector = useSelector((state) => state?.collectorStats?.stats);

    const overviewRef = useRef(null);
    const timelineRef = useRef(null);
    const bossTableRef = useRef(null);
    const playerBreakddownRef = useRef(null);
    const playerDetailsCardRef = useRef(null);

    useEffect(() => {
        const qsValues = queryString.parse(search);
        return dispatch({type: FETCH_COLLECTOR_DATA, payload: qsValues.collectorId})
    }, [search, dispatch]);
    
    const sidebarAccountClick = (accountName) => {

        const account = collector?.stats?.accounts[accountName];
        setSelectedPlayer(account);
        setTimeout(() => {
            playerDetailsCardRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 200)

    };

    const drawerContent = (
        <div>
            <Box sx={styles.drawerHeading}>{`Collector: ${collector?._id}`}</Box>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                sx={styles.root}
            >
                <ListItem button onClick={() => overviewRef.current.scrollIntoView({ behavior: 'smooth' })} sx={styles.gutters}>
                    <ListItemText primary="Overview" sx={styles.listText}/>
                </ListItem>
                <ListItem button onClick={() => timelineRef.current.scrollIntoView({ behavior: 'smooth' })} sx={styles.gutters}>
                    <ListItemText primary="Timeline" sx={styles.listText}/>
                </ListItem>
                <ListItem button onClick={() => bossTableRef.current.scrollIntoView({ behavior: 'smooth' })} sx={styles.gutters}>
                    <ListItemText primary="Boss Table" sx={styles.listText}/>
                </ListItem>
                <ListItem button onClick={() => playerBreakddownRef.current.scrollIntoView({ behavior: 'smooth' })} sx={styles.gutters}>
                    <ListItemText primary="Player Breakdown" sx={styles.listText}/>
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {Object.keys(collector?.stats?.accounts || {}).sort((a, b) => a.localeCompare(b)).map((account) => {
                            const player = collector?.stats?.accounts[account];
                            const sortedProfessions = sortProfessionAggrigatesByFrequency(player.professionAggrigates || {});

                            return (
                                <ListItem button onClick={() => sidebarAccountClick(account)} sx={styles.nested}>
                                    <ListItemIcon>
                                        <ProfessionIcon professionName={sortedProfessions[0]} size={25}/>
                                    </ListItemIcon>
                                    <ListItemText primary={collector.stats.accounts[account].accountName} sx={styles.listText}/>
                                </ListItem>
                            )
                        })}
                    </List>
                </Collapse>
            </List>
        </div>
    );

    return (
        <div>
            <CssBaseline />
            <HeaderAndSidebarTemplate pageTitleText={`Collector: ${collector?._id}`} pageDrawerContent={drawerContent}>
                <Grid container spacing={3}>
                    <Grid ref={overviewRef} sx={styles.scrollMargin} item xs={12} md={6} lg={3}>
                        <OverviewStatsCard variant="successRate"/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <OverviewStatsCard variant="avgBossDps"/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <OverviewStatsCard variant="avgCleaveDps"/>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <OverviewStatsCard variant="encounterTime"/>
                    </Grid>
                    <Grid ref={timelineRef} sx={styles.scrollMargin} item xs={12}>
                        <BossTimeline />
                    </Grid>
                    <Grid ref={bossTableRef} sx={styles.scrollMargin} item xs={12}>
                        <BossTable />
                    </Grid>

                    <Grid ref={playerBreakddownRef} sx={styles.scrollMargin} item xs={12}>
                        <PlayerBreakdown ref={playerDetailsCardRef} collectorId={collector?._id} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer}/>
                    </Grid>
                </Grid>
            </HeaderAndSidebarTemplate>
        </div>
    );
};

export default Collector;
