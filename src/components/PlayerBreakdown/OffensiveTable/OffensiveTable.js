import React, { useState } from 'react';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import OffensiveTableHead from './OffensiveTableHead';
import ProfessionIconGroup from '../../ProfessionIconGroup/ProfessionIconGroup';

import { getComparator, stableSort } from '../../../utils';
import styles from '../styles';

const useStyles = makeStyles(() => ({
    root: {
      background: '#E6EEF0',
    },
    tableItem: styles.tableItem,
    firstTableItem: styles.firstTableItem,
    lastTableItem: styles.lastTableItem,
    professionIcons: styles.professionIcons,
    alternatingColor: {
        '&:nth-of-type(odd)': {
            backgroundColor: 'white',
        },
    },
    rowHovered: {
        backgroundColor: 'green'
    }
}));

const OffensiveTable = ({ tableData, setSelectedPlayer }) => {
    const classes = useStyles();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('name');

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    return (
        <TableContainer className={css(styles.tableContainer)}>
            <Table
                className={css(styles.offensiveTable)}
                size={'medium'}
                aria-label="enhanced table"
            >
                <OffensiveTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={tableData.length}
                />
                <TableBody>
                    {stableSort(tableData, getComparator(order, orderBy))
                        .map((row) => (
                            <TableRow 
                                classes={{root: classes.alternatingColor}}
                                key={row.name}
                                onClick={() => setSelectedPlayer(row.fullAccount)}
                            >
                                <TableCell classes={{root: classes.firstTableItem}} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell classes={{root: classes.professionIcons}} align="left">
                                    <div className={css({display: 'flex', alignItems: 'center', width: '125px'})}>
                                        <ProfessionIconGroup nameArray={row.professions.displayVal || []} size={30}/>
                                    </div>
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.encounterCount}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.avgBossDps.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.avgCleaveDps.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.scholarUptime}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.flankingUptime}</TableCell>
                                <TableCell classes={{root: classes.lastTableItem}} align="right">{row.breakbar.displayVal}</TableCell>

                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OffensiveTable;
