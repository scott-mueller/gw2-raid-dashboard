import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/system';
import {
    Tabs,
    Tab,
} from '@mui/material';

import { RESET_LOGIN_SIGNUP } from '../../redux/actions';
import Signup from './Signup';
import Login from './Login';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './styles';

const LoginSignup = ({ internalOnClose }) => {

    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const { width } = useWindowDimensions();

    const fetching = useSelector((state) => state.session.fetching);

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
        dispatch({type: RESET_LOGIN_SIGNUP});
    };

    return (
        <Box sx={{
            ...(width > 700 ? styles.loginSignupContainer : styles.loginSignupContainerMobile),
            background: fetching ? '#707070': 'white' 
        }}>
            <Tabs
                value={tabValue}
                onChange={(e, newValue) => handleTabChange(newValue)}
                centered
                variant={width < 700 ? 'fullWidth' : ''}
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab sx={styles.tabRoot} label={'Login'} />
                <Tab sx={styles.tabRoot} label={'Sign Up'} />
            </Tabs>
            {tabValue === 0 ? (<Login internalOnClose={internalOnClose} />) : (<Signup internalOnClose={internalOnClose} />)}
        </Box>
    )
};

export default LoginSignup;

