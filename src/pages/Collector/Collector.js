import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// MATERIAL-UI COMPONENTS
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import OverviewStatsCard from '../../components/OverviewStatsCard/OverviewStatsCard';
import BossTable from '../../components/BossTable/BossTable';
import BossTimeline from '../../components/BossTimeline/BossTimeline';

import { FETCH_COLLECTOR_DATA } from '../../redux/actions';
import styles from './styles';
import PlayerBreakdownTable from '../../components/PlayerBreakdownTable/PlayerBreakdownTable';


const useStyles = makeStyles({
    colorPrimary: {
        backgroundColor: 'black'
    },
    containerLg: {
        maxWidth: '1500px'
    },
    drawer: {
        width: '220px',
        flexShrink: 0,
    },
    drawerPaper: {
        width: '220px',
        zIndex: 0,
        background: '#E6EEF0',
    },
    drawerContainer: {
        padding: '16px',
        overflow: 'auto',
        fontFamily: 'Oxanium',
        fontSize: '1.2em',
        fontWeight: '700',
    },
});

const collectorTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1505,
            xl: 1920,
        }
    },
    palette: {
        test: {
            main: '#F57600',
            contrastText: '#fff',
        },
    }
});

const Collector = ({window}) => {
        
    const classes = useStyles();

    const { search } = useLocation();
    const dispatch = useDispatch();
    const collector = useSelector((state) => state?.collectorStats?.stats);

    useEffect(() => {
        const qsValues = queryString.parse(search);
        return dispatch({type: FETCH_COLLECTOR_DATA, payload: qsValues.collectorId})
    }, [search, dispatch]);
    
    const container = window !== undefined ? () => window().document.body : undefined;

    const drawerContent = () => (
        <div>
            <Toolbar />
            <div className={classes.drawerContainer}>
                <p>Home</p>
                <p>My Dashboard</p>
                <p>Bosses</p>
                <p>Log Browser</p>
                <Divider />
                <p className={css({ textDecoration: 'underline' })}>{`Collector: ${collector?._id}`}</p>
                <p>Timeline</p>
                <p>Boss Table</p>
                <p>Player Breakdown</p>
            </div>
        </div>
    );

    return (
        <div className={css(styles.root)}>
            <CssBaseline />
            <AppBar classes={{colorPrimary: classes.colorPrimary}}>
                <div>
                    <h1 className={css(styles.titleText)}>Showing Stats for Collector: {collector?._id}</h1>
                </div>
            </AppBar>
            {/*<Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={'left'}
                    open={false}
                    classes={{ paper: classes.drawerPaper }}
                    ModalProps={{ keepMounted: true }}
                >
                    {drawerContent()}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    className={classes.drawer}
                    classes={{ paper: classes.drawerPaper }}
                    variant="permanent"
                    open
                >
                    {drawerContent()}
                </Drawer>
            </Hidden> */}
            <main className={css(styles.content)}>
                <div className={css(styles.appBarSpacer)} />
                <ThemeProvider theme={collectorTheme}>
                    <Container maxWidth="lg" classes = {{ maxWidthLg: classes.containerLg }} className={css(styles.container)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={3}>
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
                            <Grid item xs={12}>
                                <BossTimeline />
                            </Grid>
                            <Grid item xs={12}>
                                <BossTable />
                            </Grid>

                            <Grid item xs={12}>
                                <PlayerBreakdownTable />
                            </Grid>
                        </Grid>
                    </Container>
                </ThemeProvider>
                <div className={css(styles.appBarSpacer)} />
            </main>
        </div>
    )
};

export default Collector;

/**
 * General Stats
 *  -   4 cards along the top row
 *      -   Success Rate - success / fail counts on second row
 *      -   Average Boss DPS
 *      -   Average Cleave DPS
 *      -   Time in encounter - to see the faffing
 * 
 * Bosses Table
 *  -   Table showing information about each boss
 *      -   Boss Icon
 *      -   Boss Name
 *      -   Success
 *      -   Fail
 *      -   Success Rate
 *      -   Average Boss DPS
 *      -   Average Cleave DPS
 *      Collapsable
 *      -   Average boon uptimes - Might as well do all of them - with icons
 * Player Breakdown Table
 *  -   For each player
 *      -   Profession Icons
 *      -   Number of logs
 *      -   Avg dps (boss/cleave)
 *      -   Revives
 *      -   Revive Time
 *      -   Downs
 *      -   Deaths
 *  -   Each player has expandable section
 *      -   Roles and their counts as bubbles - roles colour coded
 */
