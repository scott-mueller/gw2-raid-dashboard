import React, { useEffect } from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { FETCH_COLLECTOR_DATA } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      backgroundColor: '#f0f6ff'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

const Collector = () => {
    
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    const { search } = useLocation();
    const dispatch = useDispatch();
    const stats = useSelector((state) => state.collectorStats);

    useEffect(() => {
        const qsValues = queryString.parse(search);
        return dispatch({type: FETCH_COLLECTOR_DATA, payload: qsValues.collectorId})
    }, [search, dispatch]);
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <h1>Raid Boss Name Here</h1>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <h2>Success Rate</h2>
                                    <p>Success / Failure counts</p>
                                </Paper>
                            </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Average Boss DPS</h2>
                                <p>Some number</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Average Cleave DPS</h2>
                                <p>Some number</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <h2>Time in encounter</h2>
                                <p>Percentage of total time</p>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h2>Boss Table</h2>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h2>Player Breakdown Table</h2>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <p>{JSON.stringify(stats)}</p>
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
