const styles = {
    //PlayerBreakdown
    paper: {
        padding: '12px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        background: '#E6EEF0',
    },
    text: {
        fontFamily: 'Oxanium',
        fontWeight: 200,
        fontSize: '2.2em',
        textDecoration: 'underline',
        paddingLeft: '10px'
    },
    tabRoot: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '700',
        minHeight: '40px'
    },
    playerDetailsOuterContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '30px',
        paddingBottom: '30px',
        scrollMarginTop: '60px'
    },
    detailsNoneSelected: {
        fontFamily: 'Oxanium',
        fontWeight: 700,
        fontSize: '1.2em',
        paddingLeft: '10px',
        scrollMarginTop: '-300px'
    },

    //OffensiveTable SupportTable
    tableContainer: {
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingBottom: '10px'
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
    professioniconContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '125px'
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
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            cursor: 'pointer'
        }
    },

    //PlayerDetailsCard
    playerDetailsContainer: {
        width: '85%',
    },
    gridContainer: {
        padding: '16px'
    },
    detailsTitle: {
        fontFamily: 'Oxanium',
        color: '#F57600',
        fontSize: '2em',
        textDecoration: 'underline',
    },
    professionIconGroupLarge: {
        display: 'flex',
        justifyContent: 'right',
        overflow: 'wrap'
    },
    filterContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    filterPaper: {
        width: '80%',
        background: '#E6EEF0'
    },
    filterTitleGrid: {
        display: 'flex',
        alignItems: 'center'
    },
    filterTitle: {
        paddingTop: '5px',
        paddingBottom: '5px',
        textAlign: 'center',
        fontFamily: 'Oxanium',
        fontWeight: '400',
        fontSize: '1.3em',
        textDecoration: 'underline'
    },
    chipGroup: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    chipContainer: {
        display: 'inline-block',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '1px',
        paddingRight: '1px' 
    },
    roleChipIcon: {
        paddingLeft: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetCloseButtonGroup: {
        textAlign: 'right'
    },
    resetButton: {
        display: 'inline-block',
        paddingRight: '5px'
    },

    //PlayerDetailsStatTile
    tileContainer: {
        height: '120px',
        padding: '10px',
        background: '#E6EEF0'
    },
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
