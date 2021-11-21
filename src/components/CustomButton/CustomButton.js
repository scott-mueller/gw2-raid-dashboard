import React from 'react';

import { Button } from '@mui/material';
import styles from './styles';

const CustomButton = ({ onClick, disabled = false, children, width = 200 }) => {

    return (
        <Button
            sx={{...styles.base, width}}
            onClick={onClick}
            disabled={disabled}
            variant={'contained'}
        >
            {children}
        </Button>
    )
};

export default CustomButton;
