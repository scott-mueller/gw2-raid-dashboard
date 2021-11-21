const styles = {
    bossIconContainer: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    bossImage: {
        borderRadius: '10px',
    },
    paper: {
        background: '#E6EEF0',
        padding: '12px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    text: {
        fontFamily: 'Oxanium',
        fontWeight: 200,
        fontSize: '2.2em',
        textDecoration: 'underline',
        paddingLeft: '10px'
    },
    tableContainer: {
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingBottom: '10px'
    },
    table: {
        minWidth: 800,
    },
    tablelHeadLabel: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '700'
    },
    tableIconRow: {
        paddingLeft: '16px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingRight: '16px'
    },
    tableItem: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '400'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    alternatingColor: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'white',
        },
    }
};

export default styles;
