import React, { useEffect } from 'react';
import { css } from '@emotion/css';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// MATERIAL-UI COMPONENTS
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

import OverviewStatsCard from '../../components/OverviewStatsCard/OverviewStatsCard';

import { FETCH_COLLECTOR_DATA } from '../../redux/actions';
import styles from './styles';

const useStyles = makeStyles({
    colorPrimary: {
        backgroundColor: 'black'
    }
});

const Collector = () => {
        
    const classes = useStyles();

    const { search } = useLocation();
    const dispatch = useDispatch();
    const collector = useSelector((state) => state?.collectorStats?.stats);
    
    useEffect(() => {
        const qsValues = queryString.parse(search);
        return dispatch({type: FETCH_COLLECTOR_DATA, payload: qsValues.collectorId})
    }, [search, dispatch]);
    
    return (
        <div className={css(styles.root)}>
            <CssBaseline />
            <AppBar classes={{colorPrimary: classes.colorPrimary}}>
                <div>
                    <h1 className={css(styles.titleText)}>Showing Stats for Collector: {collector?._id}</h1>
                </div>
            </AppBar>
            <main className={css(styles.content)}>
                <div className={css(styles.appBarSpacer)} />
                    <Container maxWidth="lg" className={css(styles.container)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3} lg={3}>
                              <OverviewStatsCard variant="successRate"/>
                            </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <OverviewStatsCard variant="avgBossDps"/>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <OverviewStatsCard variant="avgCleaveDps"/>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <OverviewStatsCard variant="encounterTime"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={css(styles.paper)}>
                                <h2>Boss Table</h2>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={css(styles.paper)}>
                                <h2>Player Breakdown Table</h2>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={css(styles.paper)}>
                                <p>{JSON.stringify(collector)}</p>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
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
