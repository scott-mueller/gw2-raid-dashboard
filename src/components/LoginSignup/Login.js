import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';

import {
    Button,
    TextField
} from '@material-ui/core';

import { SIGN_IN } from '../../redux/actions';

// Basic alphanumeric, plus basic joiners between 3 and 30 characters long
// 
const usernameRegex = new RegExp(/^[a-zA-Z0-9_\-.]{0,30}$/);

const Login = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [usernameHelperText, setUsernameHelperText] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');

    const [loginError, setLoginError] = useState(null);
    const session = useSelector((state) => state?.session);

    useEffect(() => {

        if (session.signInSuccess === false) {
            
            if (session.errors?.failField === 'username') {
                setUsernameError(true);
                setUsernameHelperText(session.errors?.message)
            }

            if (session.errors?.failField === 'password') {
                setPasswordError(true);
                setPasswordHelperText(session.errors?.message)
            }

            setLoginError(session.errors?.message)
        }

    }, [session.errors?.failField, session.errors?.message, session.signInSuccess])

    const handleFieldOnChange = (field, value) => {
        switch(field) {
            case 'username': {

                if (usernameRegex.test(value)) {
                    setUsernameError(false);
                    setUsernameHelperText('');
                    return setUsername(value);
                }
                setUsernameError(true);
                setUsernameHelperText(`'${value[value.length -1]}' cannot be used in a username`)
                break;

            }
            case 'password':{
                setPasswordError(false);
                setPasswordHelperText('');
                return setPassword(value);
            }
            default: {
                return;
            }
        }
    };

    const handleLogin = () => {

        if (username.length < 3 || username.length > 30) {
            setUsernameError(true);
            setUsernameHelperText('Username must be between 3 and 30 characters');
            return;
        }

        if (password.length < 8 ) {
            setPasswordError(true);
            setPasswordHelperText('Password must be 8 or more characters long');
            return;
        }

        if (passwordError || usernameError) {
            return;
        }


        setLoginError(null);
        dispatch({type: SIGN_IN, payload: { username, password }});
    };

    return (
        <div className={css({ padding: '10px' })}>
            <TextField 
                error={usernameError}
                variant={'outlined'}
                label={'Username'}
                value={username}
                helperText={usernameHelperText}
                onFocus={() => { setUsernameError(false); setUsernameHelperText(''); }}
                onChange={(e) => handleFieldOnChange('username', e.target.value)}
            />
            <TextField 
                type={'password'} 
                error={passwordError}
                variant={'outlined'}
                label={'Password'}
                value={password}
                helperText={passwordHelperText}
                onFocus={() => { setPasswordError(false); setPasswordHelperText(''); }}
                onChange={(e) => handleFieldOnChange('password', e.target.value)}
            />
            <Button variant={'contained'} onClick={handleLogin}>Login</Button>
            {loginError ?? (
                <div>{loginError}</div>
            )}
        </div>

    )
};

export default Login;
