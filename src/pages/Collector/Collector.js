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
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import Collapse from '@material-ui/core/Collapse';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import OverviewStatsCard from '../../components/OverviewStatsCard/OverviewStatsCard';
import BossTable from '../../components/BossTable/BossTable';
import BossTimeline from '../../components/BossTimeline/BossTimeline';

import { FETCH_COLLECTOR_DATA } from '../../redux/actions';
import styles from './styles';
import PlayerBreakdown from '../../components/PlayerBreakdown/PlayerBreakdown';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { sortProfessionAggrigatesByFrequency } from '../../utils';
import ProfessionIcon from '../../components/ProfessionIcon/ProfessionIcon';

const useStyles = makeStyles((theme) => ({
    colorPrimary: {
        backgroundColor: 'black'
    },
    containerLg: {
        maxWidth: '1500px'
    },
    drawer: {
        width: '250px',

    },
    drawerPaper: {
        width: '250px',
        zIndex: 0,
        background: '#E6EEF0',
        flexShrink: 0,
    },
    drawerContainer: {
        padding: '16px',
        overflow: 'auto',
        fontFamily: 'Oxanium',
        fontSize: '1.2em',
        fontWeight: '700',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        background: '#303F4B',
        marginLeft: '250px',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    },
    contentDrawerClosed: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        background: '#303F4B',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
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
        paddingLeft: '10px'
    },
    scrollMargin: {
        scrollMarginTop: '75px'
    },
    menuIcon: {
        color: '#F57600',
    },
}));

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

    const [drawerStatus, setDrawerStatus] = useState(true);
    const [mobileDrawerStatus, setMobileDrawerStatus] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const { search } = useLocation();
    const dispatch = useDispatch();
    const collector = useSelector((state) => state?.collectorStats?.stats);
    const { width } = useWindowDimensions();

    const overviewRef = useRef(null);
    const timelineRef = useRef(null);
    const bossTableRef = useRef(null);
    const playerBreakddownRef = useRef(null);
    const playerDetailsCardRef = useRef(null);


    useEffect(() => {
        const qsValues = queryString.parse(search);
        return dispatch({type: FETCH_COLLECTOR_DATA, payload: qsValues.collectorId})
    }, [search, dispatch]);
    
    const container = window !== undefined ? () => window().document.body : undefined;

    const sidebarAccountClick = (accountName) => {

        const account = collector?.stats?.accounts[accountName];
        setSelectedPlayer(account);
        setTimeout(() => {
            playerDetailsCardRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 200)

    };

    const drawerContent = (
        <div>
            {width > 600 ? (
                <Toolbar />
            ) : (
                <div className={css({ display: 'flex', justifyContent: 'right', paddingRight: '10px', paddingtop: '10px' })}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMobileDrawerStatus(false)}>
                        <ChevronLeftIcon classes={{root: classes.menuIcon}} fontSize="large"/>
                    </IconButton>
                </div>
            )}

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
                    </ListItem>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {Object.keys(collector?.stats?.accounts || {}).sort((a, b) => a.localeCompare(b)).map((account) => {
                                const player = collector?.stats?.accounts[account];
                                const sortedProfessions = sortProfessionAggrigatesByFrequency(player.professionAggrigates || {});

                                return (
                                    <ListItem button onClick={() => sidebarAccountClick(account)} className={classes.nested}>
                                        <ListItemIcon>{<ProfessionIcon professionName={sortedProfessions[0]} size={25}/>}</ListItemIcon>
                                        <ListItemText primary={collector.stats.accounts[account].accountName} classes={{ primary: classes.listText }}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Collapse>
                </List>
            </div>
        </div>
    );

    const handleMenuClick = () => {
        if (width < 600) {
            return setMobileDrawerStatus(true);
        }
        return setDrawerStatus(!drawerStatus);
    }

    return (
        <div className={css(styles.root)}>
            <CssBaseline />
            <AppBar classes={{colorPrimary: classes.colorPrimary}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => handleMenuClick()}>
                        <MenuIcon classes={{root: classes.menuIcon}} fontSize="large"/>
                    </IconButton>
                    <div className={css(styles.titleText)}>Collector: {collector?._id}</div>
                </Toolbar>
            </AppBar>
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={'left'}
                    open={mobileDrawerStatus}
                    classes={{ paper: classes.drawerPaper }}
                    ModalProps={{ keepMounted: true }}
                >
                    {drawerContent}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    variant="persistent"
                    open={drawerStatus}
                >
                    {drawerContent}
                </Drawer>
            </Hidden>
            <main
                id={'mainContainer'} 
                className={
                    width < 600 
                        ? classes.contentDrawerClosed
                        : drawerStatus ? classes.content : classes.contentDrawerClosed
                }
            >
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
                                <PlayerBreakdown ref={playerDetailsCardRef} collectorId={collector?._id} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer}/>
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
