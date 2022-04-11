// node_modules
import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// material-ui
import { createTheme, ThemeProvider, adaptV4Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/system';
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

const HeaderAndSidebarTemplate = ({ window, pageDrawerContent, pageTitleText, children }) => {
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
                <Box sx={{ display: 'flex', justifyContent: 'right', paddingRight: '10px', paddingtop: '10px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setMobileDrawerStatus(false)}
                        size="large">
                        <CloseIcon sx={styles.menuIcon} fontSize="large"/>
                    </IconButton>
                </Box>
            )}

            <Box sx={styles.drawerContainer}>

                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    sx={styles.root}
                >
                    {/*width < 700 && !userSession.user?.username && (
                        <ListItem button  onClick={() => setMobileDrawerStatus(false)} sx={styles.mobileLoginListItem}>
                            <CustomButton onClick={() => setLoginModalOpen(true)}>
                                Login / Sign up
                            </CustomButton>
                        </ListItem>
                    )*/}
                    {/*<ListItem button onClick={() => history.push('/')} sx={styles.gutters} disabled>
                        <ListItemText primary="Home" sx={styles.listText}/>
                    </ListItem>*/}
                    {userSession.user?._id && (
                        <div>
                            <ListItem button onClick={() => history.push('/encounters')} sx={styles.gutters} disabled>
                                <ListItemText primary="Encounters" sx={styles.listText}/>
                            </ListItem>
                            <ListItem button onClick={() => history.push('/collector-list')} sx={styles.gutters} disabled>
                                <ListItemText primary="Collector List" sx={styles.listText}/>
                            </ListItem>
                        </div>
                    )}
                </List>
                <Divider />
                {pageDrawerContent}
            </Box>
        </div>
    );

    return (
        <div>
            <ThemeProvider theme={sidebarTheme}>
                <AppBar sx={styles.colorPrimary}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => handleMenuClick()}
                            size="large">
                            <MenuIcon sx={styles.menuIcon} fontSize="large"/>
                        </IconButton>
                        <Box sx={width < 700
                            ? styles.titleTextSmall
                            : styles.titleText
                        }>
                            {pageTitleText}
                        </Box>
                        {/*userSession.user?.username ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {width > 700 && (
                                    <Box sx={styles.titleTextSmall}>{userSession.user.username}</Box>
                                )}
                                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} size="large">
                                    <AccountCircleIcon sx={styles.menuIcon} fontSize="large"/>
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
                                    <MenuItem sx={styles.listText} onClick={() => { setAnchorEl(null); handleLogout() }}>Logout</MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <>
                                {width > 700 && (
                                    <CustomButton onClick={() => setLoginModalOpen(true)}>
                                        Login / Sign up
                                    </CustomButton>
                                )}
                            </>
                        )*/}

                    </Toolbar>
                </AppBar>
                <Modal
                    open={loginModalOpen}
                    sx={{ overflow: 'auto', height: '100%' }}
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
                        sx={styles.drawer}
                        ModalProps={{ keepMounted: true }}
                    >
                        {drawerContent}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        sx={styles.drawer}
                        variant="persistent"
                        open={drawerStatus}
                    >
                        {drawerContent}
                    </Drawer>
                </Hidden>
            </ThemeProvider>
            <main
                id={'mainContainer'} 
                className={
                    width < 700 
                        ? classes.contentDrawerClosed
                        : drawerStatus ? classes.content : classes.contentDrawerClosed
                }
            >
                <Box id={'content'} sx={{ flex: '1 0 auto', paddingBottom: '10px' }}>
                    <Box sx={styles.appBarSpacer} />
                            <Container maxWidth="lg" sx={styles.container}>
                                {children}
                            </Container>
                </Box>
                <Box id={'footer'} sx={{ flexShrink: 0 }}>
                    <Footer />
                </Box>
            </main>
        </div>
    );
};

export default HeaderAndSidebarTemplate;
