import React, { useState } from 'react';

import {
    Button,
    TextField
} from '@material-ui/core';
import { css } from '@emotion/css';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogin = () => {
        // Dispatch some action
        setUsernameError(false);
        setPasswordError(false);
    };

    return (
        <div className={css({ padding: '10px' })}>
            <TextField error={usernameError} variant={'outlined'} label={'Username'} value={username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField error={passwordError} variant={'outlined'} label={'Password'} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button variant={'contained'} onClick={handleLogin}>Login</Button>
        </div>

    )
};

export default Login;
