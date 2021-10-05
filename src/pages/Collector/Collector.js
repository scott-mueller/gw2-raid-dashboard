import React, { useEffect, useState, useRef } from 'react';
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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import OverviewStatsCard from '../../components/OverviewStatsCard/OverviewStatsCard';
import BossTable from '../../components/BossTable/BossTable';
import BossTimeline from '../../components/BossTimeline/BossTimeline';

import { FETCH_COLLECTOR_DATA } from '../../redux/actions';
import styles from './styles';
import PlayerBreakdown from '../../components/PlayerBreakdown/PlayerBreakdown';


const useStyles = makeStyles({
    colorPrimary: {
        backgroundColor: 'black'
    },
    containerLg: {
        maxWidth: '1500px'
    },
    drawer: {
        width: '250px',
        flexShrink: 0,
    },
    drawerPaper: {
        width: '250px',
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
    gutters: {
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    listText: {
        fontFamily: 'Oxanium',
        fontWeight: '700',
    },
    root: {
        width: '100%',
        maxWidth: 360,
      },
    nested: {
        paddingLeft: '15px'
    },
    scrollMargin: {
        scrollMarginTop: '75px'
    }
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

    const [playerBreakdownOpen, setPlayerBreakdownOpen] = useState(true);
    const { search } = useLocation();
    const dispatch = useDispatch();
    const collector = useSelector((state) => state?.collectorStats?.stats);

    const overviewRef = useRef(null);
    const timelineRef = useRef(null);
    const bossTableRef = useRef(null);
    const playerBreakddownRef = useRef(null);


    useEffect(() => {
        const qsValues = queryString.parse(search);
        return dispatch({type: FETCH_COLLECTOR_DATA, payload: qsValues.collectorId})
    }, [search, dispatch]);
    
    const handlePlayerBreakdownClick = () => {
        setPlayerBreakdownOpen(!playerBreakdownOpen);
      };

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawerContent = () => (
        <div>
            <Toolbar />
            <div className={classes.drawerContainer}>
                <div className={css({ textDecoration: 'underline', paddingTop: '15px' })}>{`Collector: ${collector?._id}`}</div>
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
                        {playerBreakdownOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={playerBreakdownOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {Object.keys(collector?.stats?.accounts || {}).map((account) => (
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={collector.stats.accounts[account].accountName} classes={{ primary: classes.listText }}/>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
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
            <Hidden smUp implementation="css">
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
            </Hidden>
            <main id={'mainContainer'} className={css(styles.content)}>
                <div className={css(styles.appBarSpacer)} />
                <ThemeProvider theme={collectorTheme}>
                    <Container maxWidth="lg" classes = {{ maxWidthLg: classes.containerLg }} className={css(styles.container)}>
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
                                <PlayerBreakdown collectorId={collector?._id}/>
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
