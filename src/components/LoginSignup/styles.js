const styles = {
    largeTextField: {
        width: '80%',
        maxWidth: '350px',
        fontFamily: 'Oxanium',
        '&& label': {
            fontFamily: 'Oxanium',
            fontWeight: 700,
            '&:focus': {
                color: 'green'
            }
        },
        '&& input': {
            fontFamily: 'Oxanium',
        },
        '&& p': {
            fontFamily: 'Oxanium',
        }
    },
    extraLargeTextField: {
        width: '80%',
        maxWidth: '480px',
        '&& label': {
            fontFamily: 'Oxanium',
            fontWeight: 700,
        },
        '&& input': {
            fontSize: '0.65em',
            fontFamily: 'Oxanium',
            fontWeight: 700,
            paddingBottom: '14px'
        }
    },
    apiKeyInput: {
        fontSize: '0.5em'
    },
    loginSignupContainer: {
        position: 'absolute',
        top: '20%',
        left: '50%',
        marginLeft: '-265px',
        width: '530px',
        height: '700px',
        overflow: 'auto'
    },
    loginSignupContainerMobile: {
        position: 'absolute',
        width: '100%',
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
    tabRoot: {
        fontFamily: 'Oxanium',
        fontWeight: '700',
        width: '160px'
    }
};

export default styles;
