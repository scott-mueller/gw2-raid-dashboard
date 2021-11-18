import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Tab,
} from '@material-ui/core';

import { RESET_LOGIN_SIGNUP } from '../../redux/actions';
import Signup from './Signup';
import Login from './Login';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './styles';

const useStyles = makeStyles(() => ({
    ...styles,
}));

const LoginSignup = ({ internalOnClose }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const { width } = useWindowDimensions();

    const fetching = useSelector((state) => state.session.fetching);

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
        dispatch({type: RESET_LOGIN_SIGNUP});
    };

    return (
        <div className={css((width > 700 ? styles.loginSignupContainer : styles.loginSignupContainerMobile), { background: fetching ? '#707070': 'white' })}>
            <Tabs
                value={tabValue}
                onChange={(e, newValue) => handleTabChange(newValue)}
                centered
            >
                <Tab classes={{root: classes.tabRoot}} label={'Login'} />
                <Tab classes={{root: classes.tabRoot}} label={'Sign Up'} />
            </Tabs>
            {tabValue === 0 ? (<Login internalOnClose={internalOnClose} />) : (<Signup internalOnClose={internalOnClose} />)}
        </div>
    )
};

export default LoginSignup;

