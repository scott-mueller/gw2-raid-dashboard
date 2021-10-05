import React from 'react';
import { css } from '@emotion/css';
import Tooltip from '@material-ui/core/Tooltip';

import professionIconMap from '../../utils/professionIconMap';
import styles from './styles';

const ProfessionIcon = ({ professionName, size = 20 }) => {

    const professionNameFormatted = professionName
        .toLowerCase()
        .split(' ')
        .map((word) => {
            return word[0].toUpperCase() + word.substr(1);
        })
        .join(' ');

    const tooltipText = () => (
        <React.Fragment>
            <div className={css(styles.tooltip)}>
                {professionNameFormatted}
            </div>
        </React.Fragment>
    );

    return(
        <Tooltip title={tooltipText()} placement={'top'} arrow>
            <img 
                src={professionIconMap[professionName.toLowerCase()]} 
                alt={professionNameFormatted} 
                width={size} 
                height={size}
            />
        </Tooltip>
    );
};

export default ProfessionIcon;
