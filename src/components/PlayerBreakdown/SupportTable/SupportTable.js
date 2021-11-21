import React, { useState } from 'react';

import { Box } from '@mui/system';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';

import SupportTableHead from './SupportTableHead';
import ProfessionIconGroup from '../../ProfessionIconGroup/ProfessionIconGroup';

import { getComparator, stableSort } from '../../../utils';
import styles from '../styles';

const SupportTable = ({ tableData, setSelectedPlayer }) => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('name');

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    return (
        <TableContainer sx={styles.tableContainer}>
            <Table
                sx={styles.supportTable}
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
                                sx={styles.alternatingColor}
                                key={row.name}
                                onClick={() => setSelectedPlayer(row.fullAccount)}
                            >
                                <TableCell sx={styles.firstTableItem} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell sx={styles.professionIcons} align="left">
                                    <Box sx={styles.professioniconContainer}>
                                        <ProfessionIconGroup nameArray={row.professions.displayVal || []} size={30}/>
                                    </Box>
                                </TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.encounterCount}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.downs}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.firstDowns}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.deaths}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.firstDeaths}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.revives}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.reviveTime}</TableCell>
                                <TableCell sx={styles.lastTableItem} align="right">{row.totalDamageTaken.displayVal}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SupportTable;
