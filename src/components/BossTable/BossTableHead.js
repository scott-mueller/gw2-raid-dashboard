import React from 'react';

import { Box } from '@mui/system';
import {
	TableHead,
	TableCell,
	TableRow,
	TableSortLabel
} from '@mui/material'

import styles from './styles';

const BossTableHead = ({ order, orderBy, onRequestSort }) => {
		const createSortHandler = (property) => (event) => {
			onRequestSort(event, property);
		};
	
		const headCells = [
				{ id: 'icon', disablePadding: true, label: ''},
				{ id: 'bossName', numeric: false, disablePadding: true, label: 'Boss Name' },
				{ id: 'successRate', numeric: true, disablePadding: false, label: 'Success Rate' },
				{ id: 'avgBossDps', numeric: true, disablePadding: false, label: 'Avg Boss Dps' },
				{ id: 'avgCleaveDps', numeric: true, disablePadding: false, label: 'Avg Cleave Dps' },
				{ id: 'downs', numeric: true, disablePadding: false, label: 'Downs' },
				{ id: 'deaths', numeric: true, disablePadding: false, label: 'Deaths' },
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
												sx={styles.tablelHeadLabel}
												active={orderBy === headCell.id}
												direction={orderBy === headCell.id ? order : 'desc'}
												onClick={createSortHandler(headCell.id)}
										>
												{headCell.label}
												{orderBy === headCell.id ? (
														<Box component={"span"} sx={styles.visuallyHidden}>
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

export default BossTableHead;
