import React from 'react';

import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Chip } from '@mui/material';

import ProfessionIcon from '../ProfessionIcon/ProfessionIcon';

import styles from './styles';

const chipColor = (profession) => {

    switch (profession) {

        case 'Guardian':
        case 'Willbender':
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
        case 'Mechanist':
        case 'Holosmith': {
            return '#663300';
        }

        case 'Ranger':
        case 'Druid':
        case 'Untamed':
        case 'Soulbeast': {
            return '#336600';
        }

        case 'Thief':
        case 'Daredevil':
        case 'Specter':
        case 'Deadeye': {
            return '#993333';
        }

        case 'Elementalist':
        case 'Tempest':
        case 'Catalyst':
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
        case 'Harbinger':
        case 'Reaper':
        case 'Scourge': {
            return '#006633';
        }

        default: {
            return '#f542ec';
        }
    }
};

const ProfessionChip = ({ profession, variant, disabled, onClick }) => {

    const chipTheme = createTheme({
        palette: {
            primary: {
                main: chipColor(profession)
            }
        }
    });

    return (
        <ThemeProvider theme={chipTheme}>
            <Chip
                sx={styles.chipRoot}
                icon={
                    <Box sx={styles.iconStyle}>
                        <ProfessionIcon professionName={profession} size={25}/>
                    </Box>
                }
                label={profession}
                color={'primary'}
                onClick={onClick}
                disabled={disabled}
                variant={variant}
            />
        </ThemeProvider>
    );
};

export default ProfessionChip
