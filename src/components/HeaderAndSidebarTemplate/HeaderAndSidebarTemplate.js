// node_modules
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/css';
import { useCookies } from 'react-cookie';

// material-ui
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import {
    AppBar,
    Divider,
    Hidden,
    Drawer,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Container
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

// internal tools
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './styles';

const useStyles = makeStyles((theme) => ({
    ...styles,
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
    }
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
});

/**
 * Check the cookie 
 *  - if its present display the full list of stuff in the sidebar, player info in the top bar,
 *  - No cookie? - Display just the home link, a login/signup button in place of the player info
 */

const GlobalHeaderAndSidebar = ({ window, pageDrawerContent, pageTitleText, children }) => {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const history = useHistory();
    const [ cookies, setCookie, removeCookie ] = useCookies([]);
    const [drawerStatus, setDrawerStatus] = useState(true);
    const [mobileDrawerStatus, setMobileDrawerStatus] = useState(false);

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleMenuClick = () => {
        if (width < 600) {
            return setMobileDrawerStatus(true);
        }
        console.log(cookies);
        return setDrawerStatus(!drawerStatus);
    }

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

                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button onClick={() => history.push('/')} classes={{ gutters: classes.gutters }}>
                        <ListItemText primary="Home" classes={{ primary: classes.listText }}/>
                    </ListItem>

                    <ListItem button onClick={() => setCookie('test', '12345')} classes={{ gutters: classes.gutters }}>
                        <ListItemText primary="Cookie test add" classes={{ primary: classes.listText }}/>
                    </ListItem>
                    <ListItem button onClick={() => removeCookie('test')} classes={{ gutters: classes.gutters }}>
                        <ListItemText primary="Cookie test remove" classes={{ primary: classes.listText }}/>
                    </ListItem>
                    
                    <ListItem button onClick={() => history.push('/encounters')} classes={{ gutters: classes.gutters }}>
                        <ListItemText primary="Encounters" classes={{ primary: classes.listText }}/>
                    </ListItem>
                    <ListItem button onClick={() => history.push('/collector-list')} classes={{ gutters: classes.gutters }}>
                        <ListItemText primary="Collector List" classes={{ primary: classes.listText }}/>
                    </ListItem>
                </List>
                <Divider />
                {pageDrawerContent}
            </div>
        </div>
    );

    return (
        <div>
            <AppBar classes={{colorPrimary: classes.colorPrimary}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => handleMenuClick()}>
                        <MenuIcon classes={{root: classes.menuIcon}} fontSize="large"/>
                    </IconButton>
                    <div className={css(styles.titleText)}>{pageTitleText}</div>
                    <div>Login</div>
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
                        {children}
                    </Container>
            </ThemeProvider>
            </main>
        </div>
    )
};

export default GlobalHeaderAndSidebar;
