import React, { useState } from 'react';
import { css } from '@emotion/css';

import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

import ProfessionIcon from '../ProfessionIcon/ProfessionIcon';

import { getComparator, stableSort, formatDPS } from '../../utils';
import styles from './styles';

const useStyles = makeStyles((theme) => ({
    tableItem: styles.tableItem,
    alternatingColor: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#E6EEF0',
        },
    }
}));

const TimelineEncounterSimpleTable = ({ players = [] }) => {
    const classes = useStyles();

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
                            classes={{root: classes.tableItem}}
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
                                    <span className={css(styles.visuallyHidden)}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
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
                            <TableRow classes={{root: classes.alternatingColor}} key={row.name}>
                                <TableCell classes={{root: classes.tableItem}} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">
                                    <div className={css({display: 'flex', justifyContent: 'center', alignItems: 'center'})}>
                                        <ProfessionIcon professionName={row.profession.toLowerCase()} size={20}/>
                                    </div>
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.bossDps.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.cleaveDps.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.downs}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.revives}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default TimelineEncounterSimpleTable;
