import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import PlayerBreakdownTableHead from './PlayerBreakdownTableHead';
import { getComparator, stableSort, formatDPS } from '../../utils';
import styles from './styles';

const useStyles = makeStyles((theme) => ({
    root: {
      background: '#E6EEF0',
    },
    tableItem: styles.tableItem,
    alternatingColor: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'white',
        },
    }
}));

const buildTableData = (accounts) => Object.keys(accounts).map((accountName) => {
    const account = accounts[accountName];
    return {
        name: account.accountName,
        encounterCount: account.encounterCount,
        avgBossDps: {
            displayVal: formatDPS((account.totalBossDps / account.encounterCount).toFixed(0)),
            sortVal:  parseInt(account.totalBossDps / account.encounterCount)
        },
        avgCleaveDps: {
            displayVal: formatDPS((account.totalCleaveDps / account.encounterCount).toFixed(0)),
            sortVal:  parseInt(account.totalCleaveDps / account.encounterCount)
        },
        downs: account.downDeathStats.downs,
        firstDowns: account.downDeathStats.firstDownCount,
        deaths: account.downDeathStats.deaths,
        firstDeaths: account.downDeathStats.firstDeathCount,
        revives: account.revives,
        reviveTime: parseFloat(account.reviveTime.toFixed(1))
    }
});

const PlayerBreakdownTable = () => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('avgBossDps');

    const accounts = useSelector((state) => state?.collectorStats?.stats?.stats?.accounts);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (accounts) {
            setTableData(buildTableData(accounts));
        }
    }, [accounts])

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    return (
        <Paper classes={{ root: classes.root}} className={css(styles.paper)}>
            <div className={css(styles.text)}>Player Breakdown Table</div>
            <TableContainer className={css(styles.tableContainer)}>
                <Table
                    className={css(styles.table)}
                    size={'medium'}
                    aria-label="enhanced table"
                >
                    <PlayerBreakdownTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={tableData.length}
                    />
                    <TableBody>
                        {stableSort(tableData, getComparator(order, orderBy))
                            .map((row, index) => (
                                <TableRow classes={{root: classes.alternatingColor}} key={row.name}>
                                    <TableCell classes={{root: classes.tableItem}} component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.encounterCount}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.avgBossDps.displayVal}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.avgCleaveDps.displayVal}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.downs}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.firstDowns}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.deaths}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.firstDeaths}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.revives}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.reviveTime}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
  );
}

export default PlayerBreakdownTable;
