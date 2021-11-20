import React from 'react';
import { css } from '@emotion/css';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import styles from './styles';

const EncountersTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    const headCells = [
        { id: 'icon', disablePadding: true, label: ''},
        { id: 'bossName', numeric: false, disablePadding: true, label: 'Boss Name' },
        { id: 'successFail', numeric: true, disablePadding: false, label: 'Success / Fail' },
        { id: 'profession', numeric: true, disablePadding: false, label: 'Profession' },
        { id: 'roles', numeric: true, disablePadding: false, label: 'Roles' },
        { id: 'targetDps', numeric: true, disablePadding: false, label: 'Target DPS' },
        { id: 'cleaveDps', numeric: true, disablePadding: false, label: 'Cleave DPS' },
        { id: 'duration', numeric: true, disablePadding: false, label: 'Duration' },
        { id: 'timeStart', numeric: true, disablePadding: false, label: 'Start Time' },
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
                {headCell.label !== '' && (
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
                )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

export default EncountersTableHead;
