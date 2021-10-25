import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const CustomButton = ({ onClick, disabled = false, children, width = 200 }) => {

    const useStyles = makeStyles(() => ({
        root: {
            background: '#F57600',
            width,
            '&$disabled': {
                background: '#FFC085'
            },
            '&:hover': {
                background: '#E06C00'
            }
        },
        label: {
            fontFamily: 'Oxanium',
            fontWeight: '700',
            fontSize: '1.2em',
            display: 'flex',
            alignItems: 'center'
          },
        disabled: {},
    }));

    const classes = useStyles();

    return (
        <Button
            classes={{
                root: classes.root, 
                label: classes.label,
                disabled: classes.disabled,
            }}
            onClick={onClick}
            disabled={disabled}
            variant={'contained'}
        >
            {children}
        </Button>
    )
};

export default CustomButton;
