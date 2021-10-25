import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';

import {
    Tabs,
    Tab,
} from '@material-ui/core';

import { RESET_LOGIN_SIGNUP } from '../../redux/actions';
import Signup from './Signup';
import Login from './Login';

import styles from './styles';

const LoginSignup = () => {

    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);

    const fetching = useSelector((state) => state.session.fetching);

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
        dispatch({type: RESET_LOGIN_SIGNUP});
    };

    return (
        <div className={css(styles.loginSignupContainer, { background: fetching ? '#707070': 'white' })}>
            <Tabs
                value={tabValue}
                onChange={(e, newValue) => handleTabChange(newValue)}
                centered
            >
                <Tab label={'Login'} />
                <Tab label={'Sign Up'} />
            </Tabs>
            {tabValue === 0 ? (<Login />) : (<Signup />)}
        </div>
    )
};

export default LoginSignup;

