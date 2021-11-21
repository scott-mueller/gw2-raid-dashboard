import React, { useState } from 'react';

import { Box } from '@mui/system';
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableContainer,
    TableRow,
    TableSortLabel
} from '@mui/material';

import ProfessionIcon from '../ProfessionIcon/ProfessionIcon';

import { getComparator, stableSort, formatDPS } from '../../utils';
import styles from './styles';

const TimelineEncounterSimpleTable = ({ players = [] }) => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('bossDps');

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };
    
    const headCells = [
        {id: 'name', numeric: false, disablePadding: false, label: 'Account'},
        {id: 'icon', numeric: false, disablePadding: true, label: ''},
        {id: 'bossDps', numeric: true, disablePadding: false, label: 'Boss Dps'},
        {id: 'cleaveDps', numeric: true, disablePadding: false, label: 'Cleave Dps'},
        {id: 'downs', numeric: true, disablePadding: false, label: 'Downs'},
        {id: 'revives', numeric: true, disablePadding: false, label: 'Revives'},

    ];

    const tableData = players.map((player) => {
        return {
            name: player.accountName,
            profession: player.profession,
            bossDps: {
                displayVal: formatDPS(player.dmgStats.targetDPS),
                sortVal: player.dmgStats.targetDPS
            },
            cleaveDps: {
                displayVal: formatDPS(player.dmgStats.totalDPS),
                sortVal: player.dmgStats.totalDPS
            },
            downs: player.defensiveStats.downs.length,
            revives: player.supportStats.revives
        }
    });

    return (
        <TableContainer>
            <Table size={'small'}>
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <TableCell
                                sx={styles.tableItem}
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                            {headCell.id !== 'icon' && (
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'desc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                    <Box component={'span'} sx={styles.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                    ) : null}
                                </TableSortLabel>
                            )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(tableData, getComparator(order, orderBy))
                        .map((row, index) => (
                            <TableRow sx={styles.alternatingColor} key={row.name}>
                                <TableCell sx={styles.tableItem} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell sx={styles.tableItem} align="right">
                                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <ProfessionIcon professionName={row.profession.toLowerCase()} size={20}/>
                                    </Box>
                                </TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.bossDps.displayVal}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.cleaveDps.displayVal}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.downs}</TableCell>
                                <TableCell sx={styles.tableItem} align="right">{row.revives}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default TimelineEncounterSimpleTable;
