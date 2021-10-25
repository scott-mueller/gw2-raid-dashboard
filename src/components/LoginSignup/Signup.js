import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Grid,
    Paper,
    Tooltip,
} from '@material-ui/core';

import { SIGN_UP, VERIFY_API_KEY } from '../../redux/actions';
import styles from './styles';
import CustomButton from '../CustomButton/CustomButton';

const useStyles = makeStyles((theme) => ({
    ...styles,
    root: {

    },
    label: {
        fontFamily: 'Oxanium',
        fontWeight: '700'
      },
}));


const accountNameRegex = new RegExp(/^[a-zA-Z ]{3,27}.[0-9]{4}$/);
const apiKeyRegex = new RegExp(/^[A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{20}-([A-Z0-9]{4}-){3}[A-Z0-9]{12}$/);

const Signup = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [accountName, setAccountName] = useState('')

    const [usernameError, setUsernameError] = useState(false);
    const [usernameHelperText, setUsernameHelperText] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState('');

    const [accountNameError, setAccountNameError] = useState(false);
    const [accountNameHelperText, setAccountNameHelperText] = useState('');

    const [apiKeyError, setApiKeyError] = useState(false);
    const [apiKeyHelperText, setApiKeyHelperText] = useState('');

    const [verifiedApiKey, setVerifiedApiKey] = useState(false);

    const session = useSelector((state) => state?.session);
    const fetching = useSelector((state) => state.session.fetching);

    useEffect(() => {

        if (session.signupSuccess === false) {
            setUsernameError(true);
            setUsernameHelperText(session.errors?.message);
        }

    }, [session.errors?.message, session.signupSuccess]);

    useEffect(() => {

        setVerifiedApiKey(session?.apiKeyVerified);
        if (session?.verificationMessage) {
            setApiKeyError(true);
            setAccountNameError(true);
            setAccountNameHelperText(session?.verificationMessage);
            setApiKeyHelperText(session?.verificationMessage)
        }
    }, [session?.apiKeyVerified, session?.verificationMessage])

    const handleSignup = () => {

        let rejectRequest = false;

        if (username.length < 3 || username.length > 30) {
            setUsernameError(true);
            setUsernameHelperText('Username must be between 3 and 30 characters');
            rejectRequest = true;
        }

        if (password.length < 8 ) {
            setPasswordError(true);
            setPasswordHelperText('Password must be 8 or more characters long');
            rejectRequest = true;
        }
        else if (password !== retypePassword) {
            setPasswordError(true);
            setPasswordHelperText('Password\'s do not match');
            rejectRequest = true;
        }

        if (!accountNameRegex.test(accountName)) {
            setAccountNameHelperText('Invalid Account Name');
            setAccountNameError(true);
            rejectRequest = true;
        }

        if (!apiKeyRegex.test(apiKey)) {
            setApiKeyHelperText('Invalid Api Key');
            setApiKeyError(true);
            rejectRequest = true;
        }

        if (rejectRequest) {
            return;
        }

        // Good to go - Send the request!
        dispatch({type: SIGN_UP, payload: { username, password, apiKey, accountName }});
    };

    const verifyApiKey = () => {
        let reject = false;
        if (!accountNameRegex.test(accountName)) {
            setAccountNameHelperText('Invalid Account Name');
            setAccountNameError(true);
            reject = true;
        }

        if (!apiKeyRegex.test(apiKey)) {
            setApiKeyHelperText('Invalid Api Key');
            setApiKeyError(true);
            reject = true;
        }

        if (reject) {
            return;
        }

        setApiKeyError(false);
        setAccountNameError(false);
        setApiKeyHelperText('')
        setAccountNameHelperText('');

        // Dispatch an action to check the api key against the account name provided
        dispatch({type: VERIFY_API_KEY, payload: { accountName, apiKey }})
    }

    const handleFieldOnChange = (field, value) => {
        switch(field) {
            case 'username': {
                const usernameRegex = new RegExp(/^[a-zA-Z0-9_\-.]{0,30}$/);
                if (usernameRegex.test(value)) {
                    setUsernameError(false);
                    setUsernameHelperText('');
                    return setUsername(value);
                }
                setUsernameError(true);
                setUsernameHelperText(`'${value[value.length -1]}' cannot be used in a username`)
                break;
            }
            case 'password': {
                return setPassword(value);
            }
            case 'retypePassword': {
                return setRetypePassword(value);
            }
            case 'accountName': {
                return setAccountName(value);
            }
            case 'apiKey': {
                return setApiKey(value);
            }
            default: {
                return;
            }
        }
    }

    const signupTooltipText = () => (
        <React.Fragment>
            <div className={css(styles.tooltip)}>
                {'You must verify your Guild Wars 2 account before signing up'}
            </div>
        </React.Fragment>
    );

    return (
        <div className={css({ padding: '10px', paddingTop: '16px' })}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={css({display: 'flex', justifyContent: 'center', height: '65px'})}>
                        <TextField
                            classes={{root: classes.largeTextField}}
                            disabled={fetching}
                            error={usernameError}
                            variant={'outlined'}
                            label={'Username'}
                            helperText={usernameHelperText}
                            onFocus={() => { setUsernameError(false); setUsernameHelperText(''); }}
                            value={username}
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
                            helperText={passwordHelperText}
                            onFocus={() => { setPasswordError(false); setPasswordHelperText(''); }}
                            onChange={(e) => handleFieldOnChange('password', e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={css({display: 'flex', justifyContent: 'center', height: '65px'})}>
                        <TextField
                            classes={{root: classes.largeTextField}}
                            disabled={fetching}
                            type={'password'}
                            error={passwordError}
                            variant={'outlined'}
                            label={'Confirm Password'}
                            value={retypePassword}
                            helperText={passwordHelperText}
                            onFocus={() => { setPasswordError(false); setPasswordHelperText(''); }}
                            onChange={(e) => handleFieldOnChange('retypePassword', e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={css({display: 'flex', justifyContent: 'center', width: '100%'})}>
                        <Paper elevation={5} className={css({ padding: '10px', width: '100%' })}>
                            <div className={css(styles.accountVerifyHeader)}>
                                {verifiedApiKey ? 'Guild Wars 2 Account Verified' : 'Please Verify Your Guild Wars 2 Account'}
                            </div>
                            <div className={css({display: 'flex', justifyContent: 'center', paddingTop: '8px', paddingBottom: '8px', height: '85px'})}>
                                <TextField
                                    classes={{root: classes.largeTextField}}
                                    error={accountNameError}
                                    variant={'outlined'}
                                    disabled={verifiedApiKey || fetching}
                                    label={'Guild Wars 2 Account Name'}
                                    value={accountName}
                                    helperText={accountNameHelperText}
                                    onFocus={() => { setAccountNameError(false); setAccountNameHelperText(''); }}
                                    onChange={(e) => handleFieldOnChange('accountName', e.target.value)}
                                />
                            </div>
                            <div className={css({display: 'flex', justifyContent: 'center', paddingTop: '8px', paddingBottom: '8px', height: '85px'})}>
                                    <TextField
                                        classes={{root: classes.extraLargeTextField}}
                                        error={apiKeyError} variant={'outlined'}
                                        disabled={verifiedApiKey || fetching}
                                        label={'Guild Wars 2 Api Key'}
                                        value={apiKey}
                                        helperText={apiKeyHelperText}
                                        onFocus={() => { setApiKeyError(false); setApiKeyHelperText(''); }}
                                        onChange={(e) => handleFieldOnChange('apiKey', e.target.value)}
                                    />
                            </div>
                            <div className={css({display: 'flex', justifyContent: 'right', paddingTop: '5px', paddingBottom: '5px'})}>
                                <CustomButton disabled={verifiedApiKey} onClick={() => verifyApiKey()}>Verify Api Key</CustomButton>
                            </div>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={css({display: 'flex', justifyContent: 'center'})}>
                        {!verifiedApiKey ? (
                            <Tooltip title={signupTooltipText()} placement={'top'} arrow>
                                <span>
                                    <CustomButton disabled={true}>Sign Up</CustomButton>
                                </span>
                            </Tooltip>
                        ) : (
                            <CustomButton onClick={() => handleSignup()}>Sign Up</CustomButton>
                        )}

                    </div>
                </Grid>
            </Grid>
        </div>
    )
};

export default Signup;