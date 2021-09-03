const styles = {
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    titleText: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        paddingLeft: '30px',
        color: '#F57600'
    },
    appBar: {
        backgroundColor: 'black'
    },
    appBarSpacer: {
        height: 100
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        background: '#303F4B'
    },
    container: {
        paddingTop: '10px',
        paddingBottom: '10px',
    },

    paper: {
        padding: '12px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
};

export default styles;
