import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/system';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material';

import BossTableHead from './BossTableHead';
import { formatDPS, getComparator, stableSort } from '../../utils';
import styles from './styles';

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
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('bossName');

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

    return (
        <Paper sx={styles.paper}>
            <Box sx={styles.text}>Boss Table</Box>
            <TableContainer sx={styles.tableContainer}>
                <Table
                    sx={styles.table}
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
                            .map((row, index) => (
                                <TableRow sx={styles.alternatingColor} key={row.bossName}>
                                    <TableCell sx={styles.tableIconRow}>
                                        <Box sx={styles.bossIconContainer}>
                                            <Box
                                                component={'img'}
                                                src={row.icon.iconLink} 
                                                alt={row.icon.iconAlt} 
                                                width={40} 
                                                height={40} 
                                                sx={styles.bossImage}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={styles.tableItem} component="th" scope="row" padding="none">
                                        {row.bossName}
                                    </TableCell>
                                    <TableCell sx={styles.tableItem} align="right">{row.successRate.displayVal}</TableCell>
                                    <TableCell sx={styles.tableItem} align="right">{row.avgBossDps.displayVal}</TableCell>
                                    <TableCell sx={styles.tableItem} align="right">{row.avgCleaveDps.displayVal}</TableCell>
                                    <TableCell sx={styles.tableItem} align="right">{row.downs}</TableCell>
                                    <TableCell sx={styles.tableItem} align="right">{row.deaths}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
  );
}

export default BossTable;
