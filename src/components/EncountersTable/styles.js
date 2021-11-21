import { globalStyles } from "../../globalStyles";

const styles = {
    ...globalStyles,

    bossIconContainer: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    bossImage: {
        borderRadius: '10px',
    },
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
    table: {
        minWidth: 800,
    },
    tablelHeadLabel: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '700'
    },
    tableItem: {
        fontFamily: 'Oxanium',
        fontSize: '1em',
        fontWeight: '400'
    }
};

export default styles;