import React, { useState } from 'react';

import {
    Tabs,
    Tab,
} from '@material-ui/core';

import Signup from './Signup';
import Login from './Login';

const LoginSignup = () => {

    const [tabValue, setTabValue] = useState(0);

    return (
        <div>
            <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
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

