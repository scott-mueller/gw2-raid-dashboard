import React from 'react';

import { Box } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';

import professionIconMap from '../../utils/professionIconMap';
import styles from './styles';

const ProfessionIconGroup = ({ nameArray, size = 20, displayMax = 5 }) => {

    const professionNamesFormatted = nameArray.map((name) => ({
        formatted: name
            .toLowerCase()
            .split(' ')
            .map((word) => {
                return word[0].toUpperCase() + word.substr(1);
            })
            .join(' '),
        original: name
    })
    );

    const tooltipText = (name) => (
        <React.Fragment>
            <Box sx={styles.tooltip}>
                {name}
            </Box>
        </React.Fragment>
    );
    
    const validatedDisplayMax = displayMax > nameArray.length ? nameArray.length : displayMax;
    const opacityIncrement = Math.ceil(100/(validatedDisplayMax >= 5 ? validatedDisplayMax : 5));
    let opacity = 100;
    let zIndex = 50;

    return(
        <Box sx={styles.container}>
            {professionNamesFormatted.slice(0, validatedDisplayMax).map((name) => {
                
                const className = professionNamesFormatted.indexOf(name) === 0 ?
                    { zIndex: 50, position: 'relative' } :
                    { marginLeft: `-${(size / 3).toFixed(0)}px`, zIndex, position: 'relative', opacity: opacity / 100}

                zIndex--;
                opacity = opacity - opacityIncrement > 0 ? opacity = opacity - opacityIncrement : 0;

                return (
                    <Tooltip title={tooltipText(name.formatted)} placement={'top'} arrow>
                        <Box
                            component={'img'} 
                            sx={className}
                            src={professionIconMap[name.original.toLowerCase()]} 
                            alt={name.formatted} 
                            width={size} 
                            height={size}
                        />
                    </Tooltip>
                )
            })}
        </Box>
    );
};

export default ProfessionIconGroup;
