import React, { useState } from 'react';
import { css } from '@emotion/css';

import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import SupportTableHead from './SupportTableHead';
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
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            cursor: 'pointer'
        }
    },
}));

const SupportTable = ({ tableData, setSelectedPlayer }) => {
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
                className={css(styles.supportTable)}
                size={'medium'}
                aria-label="enhanced table"
            >
                <SupportTableHead
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
                                    <div className={css(styles.professioniconContainer)}>
                                        <ProfessionIconGroup nameArray={row.professions.displayVal || []} size={30}/>
                                    </div>
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.encounterCount}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.downs}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.firstDowns}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.deaths}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.firstDeaths}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.revives}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.reviveTime}</TableCell>
                                <TableCell classes={{root: classes.lastTableItem}} align="right">{row.totalDamageTaken.displayVal}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SupportTable;
