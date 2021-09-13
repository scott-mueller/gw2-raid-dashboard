import React from 'react';
import { css } from '@emotion/css';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import styles from './styles';

const PlayerBreakdownTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    const headCells = [
        { id: 'name', numeric: false, disablePadding: false, label: 'Account Name' },
        { id: 'encounterCount', numeric: true, disablePadding: false, label: 'Encounter Count' },
        { id: 'avgBossDps', numeric: true, disablePadding: false, label: 'Avg Boss Dps' },
        { id: 'avgCleaveDps', numeric: true, disablePadding: false, label: 'Avg Cleave Dps' },
        { id: 'downs', numeric: true, disablePadding: false, label: 'Downs' },
        { id: 'firstDowns', numeric: true, disablePadding: false, label: 'First Downs' },
        { id: 'deaths', numeric: true, disablePadding: false, label: 'Deaths' },
        { id: 'firstDeaths', numeric: true, disablePadding: false, label: 'First Deaths' },
        { id: 'revives', numeric: true, disablePadding: false, label: 'Revives' },
        { id: 'reviveTime', numeric: true, disablePadding: false, label: 'Revive Time' },
    ];
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                className={css(styles.tablelHeadLabel)}
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
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

export default PlayerBreakdownTableHead;
