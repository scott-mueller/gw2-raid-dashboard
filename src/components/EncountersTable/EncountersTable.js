import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';

import makeStyles from '@mui/styles/makeStyles';
import { Paper, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination, Chip } from '@mui/material';

import EncountersTableHead from './EncountersTableHead';
import ProfessionIcon from '../ProfessionIcon/ProfessionIcon';
import RoleIcon from '../RoleIcon/RoleIcon';
import { formatDPS, getComparator, stableSort } from '../../utils';

import styles from './styles';
import moment from 'moment-timezone';

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const useStyles = makeStyles((theme) => ({
    root: {
      background: '#E6EEF0',
    },
    tableItem: styles.tableItem,
    tableIconRow: {
        paddingLeft: '16px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingRight: '16px'
    },
    alternatingColor: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'white',
        },
    },
    chips: {
        flexBasis: '20%',
        flexShrink: 0,
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
  }));

const buildTableData = (encounters, session) => encounters.map((encounter) => {

    const accountName = session.user.accounts ? session.user?.accounts[0].accountName : '';
    const player = encounter.players.filter((player) => player.accountName === accountName)[0];

    return {
        id: encounter.encounterId,
        icon: {
            iconLink: encounter.fightIcon,
            iconAlt: `${encounter.bossName} Icon`
        },
        bossName: encounter.bossName,
        successFail: {
            displayVal: encounter.success,
            sortVal: encounter.success ? 'Success' : 'Fail'
        }, 
        profession: player.profession,
        roles: {
            displayVal: player.roles,
            sortVal: player.roles.length > 0 ? player.roles[0] : ''
        },
        targetDps: {
            displayVal: formatDPS(player.dmgStats.targetDPS),
            sortVal: player.dmgStats.targetDPS
        },
        cleaveDps: {
            displayVal: formatDPS(player.dmgStats.totalDPS),
            sortVal: player.dmgStats.totalDPS
        },
        duration: {
            displayVal: encounter.duration.substring(0, 7),
            sortVal: encounter.durationMs
        },
        timeStart: {
            displayVal: moment(encounter.utcTimeStart).tz(timeZone).format('MMM Do YYYY, H:mm:ss'),
            sortVal: new Date(encounter.utcTimeStart).getTime()
        }
    }
})

const EncountersTable = () => {
    const classes = useStyles();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('timeStart');
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const encounters = useSelector((state) => state.encounters.encounters);
    const session = useSelector((state) => state.session);

    useEffect(() => {
        if (encounters) {
            setTableData(buildTableData(encounters, session));
        }
    }, [encounters, session]);

    const handleRequestSort = (event, property) => {
        setPage(0);
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

    return (
        <Paper classes={{ root: classes.root}} className={css(styles.paper)}>
            <TableContainer>
                <Table size={'medium'}>
                    <EncountersTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={tableData.length}
                    />
                    <TableBody>
                    {stableSort(tableData, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                            <TableRow classes={{root: classes.alternatingColor}} key={row.id}>
                                <TableCell classes={{ root: classes.tableIconRow }}>
                                    <div className={css(styles.bossIconContainer)}>
                                        <img 
                                            src={row.icon.iconLink} 
                                            alt={row.icon.iconAlt} 
                                            width={40} 
                                            height={40} 
                                            className={css(styles.bossImage)}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} component="th" scope="row" padding="none">
                                    {row.bossName}
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">
                                    <div className={classes.chips}>
                                        <Chip classes={{root: row.successFail.displayVal ? classes.chipRootSuccess : classes.chipRootFail}} label={row.successFail.displayVal ? 'Success' : 'Fail'} />
                                    </div>
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">
                                    <div className={css(styles.bossIconContainer, { justifyContent: 'right' })}>
                                        <ProfessionIcon professionName={row.profession} size={30}/>
                                    </div>
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">
                                    <div className={css(styles.bossIconContainer, { justifyContent: 'right' })}>
                                        {row.roles.displayVal.map((role) => (
                                            <RoleIcon boon={role} size={22} />
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.targetDps.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.cleaveDps.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.duration.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.timeStart.displayVal}</TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: (53) * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
};

export default EncountersTable;
