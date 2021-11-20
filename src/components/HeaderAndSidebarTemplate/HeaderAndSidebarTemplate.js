// node_modules
import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/css';
import { useCookies } from 'react-cookie';

// material-ui
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
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
    Menu,
    MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        marginLeft: '300px',
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


const sidebarTheme = createTheme(adaptV4Theme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 960,
            lg: 1520,
            xl: 1920,
        }
    },
    palette: {
        secondary: {
            main: '#F57600'
        }
    }
}));

const GlobalHeaderAndSidebar = ({ window, pageDrawerContent, pageTitleText, children }) => {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const history = useHistory();
    const dispatch = useDispatch();
    const [ cookies, setCookie, removeCookie ] = useCookies([]);
    const [drawerStatus, setDrawerStatus] = useState(true);
    const [mobileDrawerStatus, setMobileDrawerStatus] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const userMenuOpen = Boolean(anchorEl);

    const userSession = useSelector((state) => state?.session);

    useEffect(() => {
        // Close the modal on signup or sign in success
        if (userSession.signupSuccess || userSession.signInSuccess) {
            setLoginModalOpen(false);
        }
    }, [userSession.signInSuccess, userSession.signupSuccess])

    useEffect(() => {
        // if there is a session token and no cookie, set the cookie
        if (userSession.user.sessionToken && !cookies.session) {
            setCookie('session', userSession.user.sessionToken);
        }
    }, [cookies.session, setCookie, userSession.user.sessionToken])

    useEffect(() => {
        // if there is a cookie but no session, look up the user using the session
        if (cookies.session && !userSession.user?.username) {
            // dispatch to fetch a user by token
            dispatch({type: FETCH_USER_BY_SESSION_TOKEN, payload: cookies.session});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies.session, dispatch]);

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleMenuClick = () => {
        if (width < 700) {
            return setMobileDrawerStatus(true);
        }
        return setDrawerStatus(!drawerStatus);
    }

    const handleLogout = () => {
        removeCookie('session');
        history.push('/');
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
            {width > 700 ? (
                <Toolbar />
            ) : (
                <div className={css({ display: 'flex', justifyContent: 'right', paddingRight: '10px', paddingtop: '10px' })}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setMobileDrawerStatus(false)}
                        size="large">
                        <CloseIcon classes={{root: classes.menuIcon}} fontSize="large"/>
                    </IconButton>
                </div>
            )}

            <div className={classes.drawerContainer}>

                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    {width < 700 && !userSession.user?.username && (
                        <ListItem button  onClick={() => setMobileDrawerStatus(false)} classes={{ root: classes.mobileLoginListItem, gutters: classes.gutters }}>
                            <CustomButton onClick={() => setLoginModalOpen(true)}>
                                Login / Sign up
                            </CustomButton>
                        </ListItem>
                    )}
                    <ListItem button onClick={() => history.push('/')} classes={{ gutters: classes.gutters }}>
                        <ListItemText primary="Home" classes={{ primary: classes.listText }}/>
                    </ListItem>
                    {userSession.user?._id && (
                        <div>
                            <ListItem button onClick={() => history.push('/encounters')} classes={{ gutters: classes.gutters }}>
                                <ListItemText primary="Encounters" classes={{ primary: classes.listText }}/>
                            </ListItem>
                            <ListItem button onClick={() => history.push('/collector-list')} classes={{ gutters: classes.gutters }}>
                                <ListItemText primary="Collector List" classes={{ primary: classes.listText }}/>
                            </ListItem>
                        </div>
                    )}
                </List>
                <Divider />
                {pageDrawerContent}
            </div>
        </div>
    );

    return (
        <div>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={sidebarTheme}>
                    <AppBar classes={{colorPrimary: classes.colorPrimary}}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => handleMenuClick()}
                                size="large">
                                <MenuIcon classes={{root: classes.menuIcon}} fontSize="large"/>
                            </IconButton>
                            <div className={css(width < 700 ? styles.titleTextSmall : styles.titleText)}>{pageTitleText}</div>
                            {userSession.user?.username ? (
                                <div className={css({ display: 'flex', alignItems: 'center' })}>
                                    {width > 700 && (
                                        <div className={css(styles.titleTextSmall)}>{userSession.user.username}</div>
                                    )}
                                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} size="large">
                                        <AccountCircleIcon classes={{root: classes.menuIcon}} fontSize="large"/>
                                    </IconButton>
                                    <Menu
                                        open={userMenuOpen}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                        <MenuItem className={css(styles.listText)} onClick={() => { setAnchorEl(null); handleLogout() }}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            ) : (
                                <>
                                    {width > 700 && (
                                        <CustomButton onClick={() => setLoginModalOpen(true)}>
                                            Login / Sign up
                                        </CustomButton>
                                    )}
                                </>
                            )}

                        </Toolbar>
                    </AppBar>
                    <Modal
                        open={loginModalOpen}
                        className={css({ overflow: 'auto', height: '100%' })}
                        onClose={() => setLoginModalOpen(false)}
                    >
                        <LoginSignup internalOnClose={() => setLoginModalOpen(false)}/>
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
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{ paper: classes.drawerPaper }}
                            variant="persistent"
                            open={drawerStatus}
                        >
                            {drawerContent}
                        </Drawer>
                    </Hidden>
                </ThemeProvider>
            </StyledEngineProvider>
            <main
                id={'mainContainer'} 
                className={
                    width < 700 
                        ? classes.contentDrawerClosed
                        : drawerStatus ? classes.content : classes.contentDrawerClosed
                }
            >
                <div id={'content'} className={css({ flex: '1 0 auto', paddingBottom: '10px' })}>
                    <div className={css(styles.appBarSpacer)} />
                            <Container maxWidth="lg" classes={{ maxWidthLg: classes.containerLg }} className={css(styles.container)}>
                                {children}
                            </Container>
                </div>
                <div id={'footer'} className={css({ flexShrink: 0 })}>
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default GlobalHeaderAndSidebar;
