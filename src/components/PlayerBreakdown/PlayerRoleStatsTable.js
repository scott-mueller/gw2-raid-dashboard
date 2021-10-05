import React, { useState } from 'react';
import { css } from '@emotion/css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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

const PlayerRoleStatsTable = ({ roleAggs = [] }) => {
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
        {id: 'roles', numeric: false, disablePadding: false, label: 'Roles'},
        {id: 'encounters', numeric: true, disablePadding: true, label: 'Encounters'},
        {id: 'avgBossDps', numeric: true, disablePadding: true, label: 'Avg Boss Dps'},
        {id: 'avgCleaveDps', numeric: true, disablePadding: false, label: 'Avg Cleave Dps'},
        {id: 'revives', numeric: true, disablePadding: false, label: 'Revives'},
        {id: 'reviveTime', numeric: true, disablePadding: false, label: 'Revive Time'},
        {id: 'downs', numeric: true, disablePadding: false, label: 'Downs'},
        {id: 'deaths', numeric: true, disablePadding: false, label: 'Deaths'},
    ];

    const tableData = roleAggs.map((agg) => {
        return {
            roles: agg.roles,
            encounters: agg.count,
            avgBossDps: {
                displayVal: formatDPS(parseInt(agg.totalBossDps / agg.count)),
                sortVal: parseInt(agg.totalBossDps / agg.count)
            },
            avgCleaveDps: {
                displayVal: formatDPS(parseInt(agg.totalCleaveDps / agg.count)),
                sortVal: parseInt(agg.totalCleaveDps / agg.count)
            },
            revives: agg.revives,
            reviveTime: parseFloat(agg.reviveTime.toFixed(1)),
            downs: agg.downs,
            deaths: agg.deaths
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
                                    {row.roles}
                                </TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.encounters}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.avgBossDps.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.avgCleaveDps.displayVal}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.revives}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.reviveTime}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.downs}</TableCell>
                                <TableCell classes={{root: classes.tableItem}} align="right">{row.deaths}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default PlayerRoleStatsTable;
