import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
} from '@material-ui/core';

import { SIGN_IN } from '../../redux/actions';
import CustomButton from '../CustomButton/CustomButton';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './styles';

const useStyles = makeStyles(() => ({
    ...styles,
}));

const usernameRegex = new RegExp(/^[a-zA-Z0-9_\-.]{0,30}$/);

const Login = ({ internalOnClose }) => {
    const classes = useStyles();
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameHelperText, setUsernameHelperText] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');

    const session = useSelector((state) => state?.session);
    const fetching = useSelector((state) => state.session.fetching);

    const maybeSubmitForm = ({keyCode}) => {
        if (keyCode === 13) {
            handleLogin();
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", maybeSubmitForm);
        // Remove event listeners on cleanup
        return () => {
          window.removeEventListener("keydown", maybeSubmitForm);
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [username, password]);

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

        dispatch({type: SIGN_IN, payload: { username, password }});
    };

    return (
        <div id={'login'} className={css({ padding: '16px', display: 'flex', alignItems: 'center', height: '100%', maxHeight: '600px'})}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={css({display: 'flex', justifyContent: 'center', height: '65px'})}>
                        <TextField
                            classes={{root: classes.largeTextField}}
                            error={usernameError}
                            disabled={fetching}
                            variant={'outlined'}
                            label={'Username'}
                            color={'secondary'}
                            value={username}
                            autoFocus
                            helperText={usernameHelperText}
                            onFocus={() => { setUsernameError(false); setUsernameHelperText(''); }}
                            onChange={(e) => handleFieldOnChange('username', e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={css({display: 'flex', justifyContent: 'center',height: '65px'})}>
                        <TextField
                            classes={{root: classes.largeTextField}}
                            disabled={fetching}
                            type={'password'} 
                            error={passwordError}
                            variant={'outlined'}
                            label={'Password'}
                            value={password}
                            color={'secondary'}
                            helperText={passwordHelperText}
                            onFocus={() => { setPasswordError(false); setPasswordHelperText(''); }}
                            onChange={(e) => handleFieldOnChange('password', e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={css({display: 'flex', justifyContent: 'center'})}>
                            <CustomButton submit={true} onClick={handleLogin}>Login</CustomButton>
                    </div>
                </Grid>
                {width < 700 && (
                    <Grid item xs={12}>
                        <div className={css({display: 'flex', justifyContent: 'center'})}>
                            <CustomButton onClick={internalOnClose}>Cancel</CustomButton>
                        </div>
                    </Grid>
                )}
            </Grid>
        </div>

    )
};

export default Login;
