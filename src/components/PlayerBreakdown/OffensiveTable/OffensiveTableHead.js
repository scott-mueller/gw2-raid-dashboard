import React from 'react';

import { Box } from '@mui/system';
import {
	TableHead,
	TableCell,
	TableRow,
	TableSortLabel
} from '@mui/material'

import styles from '../styles';

const OffensiveTableHead = ({ order, orderBy, onRequestSort }) => {

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
        { id: 'avgBossDps', numeric: true, disablePadding: false, label: 'Avg Boss Dps' },
        { id: 'avgCleaveDps', numeric: true, disablePadding: false, label: 'Avg Cleave Dps' },
        { id: 'scholarUptime', numeric: true, disablePadding: false, label: 'Scholar Uptime'},
        { id: 'flankingUptime', numeric: true, disablePadding: false, label: 'Flanking Uptime'},
        { id: 'breakbar', numeric: true, disablePadding: false, label: 'Breakbar', type: 'lastCell'},
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
    );
}

export default OffensiveTableHead;
