import React from 'react';
import { css } from '@emotion/css';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles((theme) => ({
  tableItem: styles.tableItem,
  firstTableItem: styles.firstTableItem,
  lastTableItem: styles.lastTableItem
}));

const PlayerBreakdownTableHead = ({ order, orderBy, onRequestSort }) => {
    const classes = useStyles();

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const getTableHeadClass = (headCell) => {

      if (headCell.firstCell) {
        return classes.firstTableItem;
      }
      if (headCell.lastCell) {
        return classes.lastTableItem;
      }
      return classes.tableItem
    }
  
    const headCells = [
        { id: 'name', numeric: false, disablePadding: false, label: 'Account Name', firstCell: true },
        { id: 'encounterCount', numeric: true, disablePadding: false, label: 'Encounters' },
        { id: 'avgBossDps', numeric: true, disablePadding: false, label: 'Avg Boss Dps' },
        { id: 'avgCleaveDps', numeric: true, disablePadding: false, label: 'Avg Cleave Dps' },
        { id: 'downs', numeric: true, disablePadding: false, label: 'Downs' },
        { id: 'firstDowns', numeric: true, disablePadding: false, label: 'First Downs' },
        { id: 'deaths', numeric: true, disablePadding: false, label: 'Deaths' },
        { id: 'firstDeaths', numeric: true, disablePadding: false, label: 'First Deaths' },
        { id: 'revives', numeric: true, disablePadding: false, label: 'Revives' },
        { id: 'reviveTime', numeric: true, disablePadding: false, label: 'Revive Time' },
        { id: 'breakbar', numeric: true, disablePadding: false, label: 'Breakbar'},
        { id: 'totalDamageandBarrierTaken', numeric: true, disablePadding: false, label: 'Dmg + Barrier Taken', lastCell: true}
    ];
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              classes={{root: getTableHeadClass(headCell)}}
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
