import React from 'react';
import { css } from '@emotion/css';
import Tooltip from '@material-ui/core/Tooltip';

import roleIconMap from '../../utils/roleIconMap';
import styles from './styles';

const BoonIcon = ({ boon, size = 20 }) => {

    const boonNameFormatted = boon
        .toLowerCase()
        .split(/[\s-]+/)
        .map((word) => {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');

    const tooltipText = () => (
        <React.Fragment>
            <div className={css(styles.tooltip)}>
                {boonNameFormatted}
            </div>
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

export default BoonIcon;
