// node_modules
import React, { useEffect, useState, useRef } from 'react';
import { css } from '@emotion/css';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
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

const useStyles = makeStyles(() => ({ ...styles }));

const collectorTheme = createTheme(adaptV4Theme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1520,
            xl: 1920,
        }
    },
}));

const Collector = () => {
    const classes = useStyles();

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
            <div className={css(styles.drawerHeading)}>{`Collector: ${collector?._id}`}</div>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <ListItem button onClick={() => overviewRef.current.scrollIntoView({ behavior: 'smooth' })} classes={{ gutters: classes.gutters }}>
                    <ListItemText primary="Overview" classes={{ primary: classes.listText }}/>
                </ListItem>
                <ListItem button onClick={() => timelineRef.current.scrollIntoView({ behavior: 'smooth' })} classes={{ gutters: classes.gutters }}>
                    <ListItemText primary="Timeline" classes={{ primary: classes.listText }}/>
                </ListItem>
                <ListItem button onClick={() => bossTableRef.current.scrollIntoView({ behavior: 'smooth' })} classes={{ gutters: classes.gutters }}>
                    <ListItemText primary="Boss Table" classes={{ primary: classes.listText }}/>
                </ListItem>
                <ListItem button onClick={() => playerBreakddownRef.current.scrollIntoView({ behavior: 'smooth' })} classes={{ gutters: classes.gutters }}>
                    <ListItemText primary="Player Breakdown" classes={{ primary: classes.listText }}/>
                </ListItem>
                <Collapse in={true} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {Object.keys(collector?.stats?.accounts || {}).sort((a, b) => a.localeCompare(b)).map((account) => {
                            const player = collector?.stats?.accounts[account];
                            const sortedProfessions = sortProfessionAggrigatesByFrequency(player.professionAggrigates || {});

                            return (
                                <ListItem button onClick={() => sidebarAccountClick(account)} className={classes.nested}>
                                    <ListItemIcon>
                                        <ProfessionIcon professionName={sortedProfessions[0]} size={25}/>
                                    </ListItemIcon>
                                    <ListItemText primary={collector.stats.accounts[account].accountName} classes={{ primary: classes.listText }}/>
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
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={collectorTheme}>
                    <HeaderAndSidebarTemplate pageTitleText={`Collector: ${collector?._id}`} pageDrawerContent={drawerContent}>
                        <Grid container spacing={3}>
                            <Grid ref={overviewRef} classes={{ root: classes.scrollMargin }} item xs={12} md={6} lg={3}>
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
                            <Grid ref={timelineRef} classes={{ root: classes.scrollMargin }} item xs={12}>
                                <BossTimeline />
                            </Grid>
                            <Grid ref={bossTableRef} classes={{ root: classes.scrollMargin }} item xs={12}>
                                <BossTable />
                            </Grid>

                            <Grid ref={playerBreakddownRef} classes={{ root: classes.scrollMargin }} item xs={12}>
                                <PlayerBreakdown ref={playerDetailsCardRef} collectorId={collector?._id} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer}/>
                            </Grid>
                        </Grid>
                    </HeaderAndSidebarTemplate>
                </ThemeProvider>
            </StyledEngineProvider>
        </div>
    );
};

export default Collector;
