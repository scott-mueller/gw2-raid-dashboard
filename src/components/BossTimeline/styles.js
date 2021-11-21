const styles = {
    accordionContainer: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    bossImage: {
        borderRadius: '10px',
        cursor: 'pointer'
    },
    bossDetailsImage: {
        borderRadius: '25px',
    },
    detailsOuterContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsOuterContainerMobile: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
    },
    detailsContainer: {
        width: '80%',
        minWidth: '610px',
        maxWidth: '725px',
        paddingLeft: '10px',
        paddingBottom: '30px',
        paddingTop: '30px',
    },
    detailsTitle: {
        color: '#F57600',
        fontSize: '2em',
        textDecoration: 'underline'
    },
    detailsContentText: {
        fontSize: '1.2em',
        fontWeight: 700
    },
    detailsContent: {
        paddingLeft: '10px',
        fontFamily: 'Oxanium',
        fontWeight: 400,
    },
    headerText: {
        fontFamily: 'Oxanium',
        fontWeight: 200,
        fontSize: '2.2em',
        textDecoration: 'underline',
        paddingLeft: '10px'
    },
    timelineCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        flexWrap: 'wrap',
        width: '40px'
    },
    timelineCardTooltip: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        fontSize: '1.6em',
    },
    timelineCardSubtext: {
        fontFamily: 'Oxanium',
        fontWeight: 700,
        fontSize: '1.4em',
        lineHeight: '0px',
    },
    timelineCardSubtextSuccess: {
        color: 'green'

    },
    timelineCardSubtextFail: {
        color: 'red'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#E6EEF0',
        flexWrap: 'wrap'
    },
    breadcrumbs: {
        display: 'grid'
    },
    containerMobile: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        background: '#E6EEF0',
        flexWrap: 'wrap'
    },
    paper: {
        padding: '12px',
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        background: '#E6EEF0',
    },
    detailsNoneSelected: {
        fontFamily: 'Oxanium',
        fontWeight: 700,
        fontSize: '1.2em',
        paddingLeft: '10px'
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
    tableItem: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '400',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    muiBreadcrumbs: {
        '& .MuiBreadcrumbs-ol': {
            flexWrap: 'nowrap',
            padding: '10px',
            paddingBottom: '40px',
            paddingTop: '0px'
        }
    },
    number: {
        flexBasis: '10%',
        flexShrink: 0,
    },
    duration: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        flexBasis: '30%',
        flexShrink: 0,
    },
    timeStartEnd: {
        flexBasis: '40%',
        flexShrink: 0,
    },
    chips: {
        flexBasis: '20%',
        flexShrink: 0,
    },
    accordionSummaryContent: {
        '& .MuiAccordionSummary-content' : {
            alignItems: 'center'
        }
    },
    chipRootSuccess: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        backgroundColor: '#4caf50'
    },
    chipRootFail: {
        fontFamily: 'Oxanium',
        fontWeight: 400,
        backgroundColor: '#ef5350'
    },
    alternatingColor: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#E6EEF0',
        },
    }
};

export default styles;
