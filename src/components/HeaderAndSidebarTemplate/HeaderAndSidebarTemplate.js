// node_modules
import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    Container,
    Modal,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';

// internal tools
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './styles';
import LoginSignup from '../LoginSignup/LoginSignup';
import { FETCH_USER_BY_SESSION_TOKEN, SIGN_OUT } from '../../redux/actions';
import CustomButton from '../CustomButton/CustomButton';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    ...styles,
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
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
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto',
        background: '#303F4B',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
});

const GlobalHeaderAndSidebar = ({ window, pageDrawerContent, pageTitleText, children }) => {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const history = useHistory();
    const dispatch = useDispatch();
    const [ cookies, setCookie, removeCookie ] = useCookies([]);
    const [drawerStatus, setDrawerStatus] = useState(true);
    const [mobileDrawerStatus, setMobileDrawerStatus] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const userSession = useSelector((state) => state?.session);

    useEffect(() => {
        // Close the modal on signup or sign in success
        if (userSession.signupSuccess || userSession.signInSuccess) {
            setLoggedIn(true);
            setLoginModalOpen(false);
        }
    }, [userSession.signInSuccess, userSession.signupSuccess])

    useEffect(() => {
        // if there is a session token and no cookie, set the cookie
        if (userSession.user.sessionToken && !cookies.session) {
            setLoggedIn(true);
            setCookie('session', userSession.user.sessionToken);
        }

        // if there is a cookie but no session, look up the user using the session
        if (cookies.session && !userSession.user?.username && loggedIn) {
            // dispatch to fetch a user by token
            dispatch({type: FETCH_USER_BY_SESSION_TOKEN, payload: cookies.session});
        }
    }, [cookies.session, dispatch, loggedIn, setCookie, userSession.user]);

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleMenuClick = () => {
        if (width < 600) {
            return setMobileDrawerStatus(true);
        }
        return setDrawerStatus(!drawerStatus);
    }

    const handleLogout = () => {
        setLoggedIn(false);
        removeCookie('session');
        dispatch({
            type: SIGN_OUT, 
            payload: {
                userId: userSession.user._id,
                sessionToken: userSession.user.sessionToken
            }
        });
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
                    {userSession.user?.username ? (
                        <div>
                            <div>{userSession.user.username}</div>
                            <CustomButton onClick={() => handleLogout()}>Log Out</CustomButton>
                        </div>
                    ) : (
                        <div>
                            <CustomButton onClick={() => {
                                setLoginModalOpen(true);
                                setLoggedIn(false);
                            }}>Login / Sign up</CustomButton>
                        </div>

                    )}
                </Toolbar>
            </AppBar>
            <Modal
                open={loginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            >
                <div className={css({ position: 'absolute', top: '20%', left: '50%', background: 'white', marginLeft: '-265px' })}>
                    <LoginSignup />
                </div>
            </Modal>
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
                <div id={'content'} className={css({ flex: '1 0 auto', paddingBottom: '10px' })}>
                    <div className={css(styles.appBarSpacer)} />
                    <ThemeProvider theme={collectorTheme}>
                            <Container maxWidth="lg" classes={{ maxWidthLg: classes.containerLg }} className={css(styles.container)}>
                                {children}
                            </Container>
                    </ThemeProvider>
                </div>
                <div id={'footer'} className={css({ flexShrink: 0 })}>
                    <Footer />
                </div>
            </main>
        </div>
    )
};

export default GlobalHeaderAndSidebar;
