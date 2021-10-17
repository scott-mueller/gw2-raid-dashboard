const styles = {
    paper: {
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
    playerDetailsOuterContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '30px',
        paddingBottom: '30px',
        scrollMarginTop: '60px'
    },
    playerDetailsContainer: {
        width: '85%',
    },
    offensiveTable: {
        minWidth: 920,
    },
    supportTable: {
        minWidth: 1100,
    },
    tablelHeadLabel: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '700'
    },
    tableItem: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '400',
        paddingLeft: '2px',
        paddingRight: '2px'
    },
    firstTableItem: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '400',
        paddingRight: '5px'
    },
    lastTableItem: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '400',
        paddingLeft: '5px'
    },
    professionIcons: {
        paddingLeft: '10px',
        paddingRight: '2px',
        paddingTop: '0px',
        paddingBottom: '0px'
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
    detailsTitle: {
        fontFamily: 'Oxanium',
        color: '#F57600',
        fontSize: '2em',
        textDecoration: 'underline',
    },
    detailsNoneSelected: {
        fontFamily: 'Oxanium',
        fontWeight: 700,
        fontSize: '1.2em',
        paddingLeft: '10px',
        scrollMarginTop: '-300px'
    },

    //PlayerDetailsStatTile
    primaryTitle: {
        fontFamily: 'Oxanium',
        fontWeight: '400',
        fontSize: '1.3em',
        textDecoration: 'underline'
    },
    primaryData: {
        fontFamily: 'Oxanium',
        fontSize: '2.4em',
        fontWeight: '300',
        color: '#F57600',
    },
    secondaryTitle: {
        fontFamily: 'Oxanium',
        fontWeight: '700',
        fontSize: '1.2em'
    },
    secondaryData: {
        fontFamily: 'Oxanium',
        fontSize: '1.0em'
    }
};

export default styles;
