import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import BossTableHead from './BossTableHead';
import { formatDPS, getComparator, stableSort } from '../../utils';
import styles from './styles';

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
    }
  }));

const buildTableData = (bosses) => Object.keys(bosses).map((bossName) => {
    const boss = bosses[bossName];
    return {
        icon: { iconLink: boss.icon, iconAlt: `${boss.name} Icon`},
        bossName: boss.name,
        successRate: {
            displayVal: `${((boss.success / (boss.success + boss.fail)) * 100).toFixed(0)}% - (${boss.success} of ${boss.success + boss.fail})`,
            sortVal: parseInt((boss.success / (boss.success + boss.fail)) * 100)
        },
        avgBossDps: {
            displayVal: formatDPS(parseInt(boss.totalBossDps / (boss.success + boss.fail))),
            sortVal: parseInt(boss.totalBossDps / (boss.success + boss.fail)),
        },
        avgCleaveDps: {
            displayVal: formatDPS(parseInt(boss.totalCleaveDps / (boss.success + boss.fail))),
            sortVal: parseInt(boss.totalCleaveDps / (boss.success + boss.fail)),
        },
        downs: boss.downs,
        deaths: boss.deaths
    }
});

const BossTable = () => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('bossName');
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    const bosses = useSelector((state) => state?.collectorStats?.stats?.stats?.bosses);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (bosses) {
            setTableData(buildTableData(bosses));
        }
    }, [bosses])

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

    return (
        <Paper classes={{ root: classes.root}} className={css(styles.paper)}>
            <div className={css(styles.text)}>Boss Table</div>
            <TableContainer className={css(styles.tableContainer)}>
                <Table
                    className={css(styles.table)}
                    size={'medium'}
                    aria-label="enhanced table"
                >
                    <BossTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={tableData.length}
                    />
                    <TableBody>
                        {stableSort(tableData, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow classes={{root: classes.alternatingColor}} key={row.bossName}>
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
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.successRate.displayVal}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.avgBossDps.displayVal}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.avgCleaveDps.displayVal}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.downs}</TableCell>
                                    <TableCell classes={{root: classes.tableItem}} align="right">{row.deaths}</TableCell>
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
                rowsPerPageOptions={[10]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
  );
}

export default BossTable;
