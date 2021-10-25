const styles = {
    largeTextField: {
        width: '350px',
        fontFamily: 'Oxanium',
        '&& label': {
            fontFamily: 'Oxanium',
            fontWeight: 700,
        },
        '&& input': {
            fontFamily: 'Oxanium',
        },
        '&& p': {
            fontFamily: 'Oxanium',
        }
    },
    extraLargeTextField: {
        width: '480px',
        '&& label': {
            fontFamily: 'Oxanium',
            fontWeight: 700,
        },
        '&& input': {
            fontSize: '0.65em',
            fontFamily: 'Oxanium',
            fontWeight: 700,
            paddingTop: '20px',
            paddingBottom: '20px'
        }
    },
    apiKeyInput: {
        fontSize: '0.5em'
    },
    loginSignupContainer: {
        width: '530px',
        height: '720px',
        overflow: 'auto'
    },
    tooltip: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        fontSize: '1.6em',
        textAlign: 'center'
    },
    accountVerifyHeader: {
        fontFamily: 'Oxanium',
        fontWeight: 200,
        fontSize: '1.6em',
        textDecoration: 'underline',
        paddingBottom: '10px',
        textAlign: 'center'
    },
};

export default styles;
