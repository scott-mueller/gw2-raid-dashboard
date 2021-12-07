import React from 'react';

import { Box } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';

import roleIconMap from '../../utils/roleIconMap';
import styles from './styles';

const RoleIcon = ({ boon, size = 20 }) => {

    const boonNameFormatted = boon
        .toLowerCase()
        .split(/[\s-]+/)
        .map((word) => {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');

    const tooltipText = () => (
        <React.Fragment>
            <Box sx={styles.tooltip}>
                {boonNameFormatted}
            </Box>
        </React.Fragment>
    );

    return(
        <Tooltip title={tooltipText()} placement={'top'} arrow>
            <img 
                src={roleIconMap[boon.toLowerCase().split(' ').join('-')]} 
                alt={boonNameFormatted} 
                width={size} 
                height={size}
            />
        </Tooltip>
    );
};

export default RoleIcon;
