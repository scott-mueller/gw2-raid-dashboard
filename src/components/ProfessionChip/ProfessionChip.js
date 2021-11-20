import React from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/css';

import { adaptV4Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Chip } from '@mui/material';

import ProfessionIcon from '../ProfessionIcon/ProfessionIcon';

import { APPLY_PROFESSION_FILTER } from '../../redux/actions/index';
import styles from './styles';



const chipColor = (profession) => {

    switch (profession) {

        case 'Guardian':
        case 'Firebrand':
        case 'Dragonhunter': {
            return '#006666';
        }

        case 'Revenant':
        case 'Herald':
        case 'Renegade':
        case 'Vindicator': {
            return '#661100';
        }

        case 'Warrior':
        case 'Berserker':
        case 'Spellbreaker':
        case 'Bladesworn': {
            return '#CC6600';
        }

        case 'Engineer':
        case 'Scrapper': 
        case 'Holosmith': {
            return '#663300';
        }

        case 'Ranger':
        case 'Druid':
        case 'Soulbeast': {
            return '#336600';
        }

        case 'Thief':
        case 'Daredevil':
        case 'Deadeye': {
            return '#993333';
        }

        case 'Elementalist':
        case 'Tempest':
        case 'Weaver': {
            return '#CC0000';
        }

        case 'Mesmer':
        case 'Chronomancer':
        case 'Mirage': 
        case 'Virtuoso': {
            return '#660066';
        }

        case 'Necromancer':
        case 'Reaper':
        case 'Scourge': {
            return '#006633';
        }

        default: {
            return '#f542ec';
        }
    }
};

const useStyles = makeStyles((theme) => ({
    chipRoot: {
        fontFamily: 'Oxanium',
    }
}));

const ProfessionChip = ({ profession, variant, disabled }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const chipTheme = createTheme(adaptV4Theme({
        palette: {
            primary: {
                main: chipColor(profession)
            }
        }
    }));

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={chipTheme}>
                <Chip
                    classes={{root: classes.chipRoot}}
                    icon={<div className={css(styles.iconStyle)}><ProfessionIcon professionName={profession} size={25}/></div>}
                    label={profession}
                    color={'primary'}
                    onClick={() => dispatch({ type: APPLY_PROFESSION_FILTER, payload: profession})}
                    disabled={disabled}
                    variant={variant}
                />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ProfessionChip
