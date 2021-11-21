import React, { useState } from 'react';

import { Box } from '@mui/system';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';

import OffensiveTableHead from './OffensiveTableHead';
import ProfessionIconGroup from '../../ProfessionIconGroup/ProfessionIconGroup';

import { getComparator, stableSort } from '../../../utils';
import styles from '../styles';

const OffensiveTable = ({ tableData, setSelectedPlayer }) => {
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
                sx={styles.offensiveTable}
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
                                <TableCell sx={styles.tableItem} align="right">{row.avgBossDps.displayVal}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.avgCleaveDps.displayVal}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.scholarUptime}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.flankingUptime}</TableCell>
                                <TableCell sx={styles.lastTableItem} align="right">{row.breakbar.displayVal}</TableCell>

                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OffensiveTable;
