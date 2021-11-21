import React from 'react';

import { Box } from '@mui/system';
import {
	TableHead,
	TableCell,
	TableRow,
	TableSortLabel
} from '@mui/material'

import styles from '../styles';

const PlayerBreakdownTableHead = ({ order, orderBy, onRequestSort }) => {

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const getTableHeadClass = (headCell) => {

      if (headCell.type === 'firstCell') {
        return styles.firstTableItem;
      }
      if (headCell.type === 'lastCell') {
        return styles.lastTableItem;
      }
      if (headCell.type === 'profession') {
        return styles.professionIcons
      }
      return styles.tableItem
    }

    const headCells = [
        { id: 'name', numeric: false, disablePadding: false, label: 'Account Name', type: 'firstCell' },
        { id: 'professions', numeric: false, disablePadding: false, label: 'Professions', type: 'profession' },
        { id: 'encounterCount', numeric: true, disablePadding: false, label: 'Encounters' },
        { id: 'downs', numeric: true, disablePadding: false, label: 'Downs' },
        { id: 'firstDowns', numeric: true, disablePadding: false, label: 'First Downs' },
        { id: 'deaths', numeric: true, disablePadding: false, label: 'Deaths' },
        { id: 'firstDeaths', numeric: true, disablePadding: false, label: 'First Deaths' },
        { id: 'revives', numeric: true, disablePadding: false, label: 'Revives' },
        { id: 'reviveTime', numeric: true, disablePadding: false, label: 'Revive Time' },
        { id: 'totalDamageTaken', numeric: true, disablePadding: false, label: 'Dmg + Barrier Taken', type: 'lastCell'}
    ];
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              sx={getTableHeadClass(headCell)}
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
                {headCell.label !== '' && (
                    <TableSortLabel
                        sx={styles.tablelHeadLabel}
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'desc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box sx={styles.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

export default PlayerBreakdownTableHead;
