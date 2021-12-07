import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import EncounterAccordionGroup from './EncounterAccordionGroup';
import { cmFractalBossMap, cmRaidBossMap, raidBossMap } from '../../utils/bossIconMap';

import { ButtonGroup, Paper, Button, Grid, TextField, Select, MenuItem, InputLabel, ListItemButton, Accordion, AccordionSummary, AccordionDetails, Chip, List, Avatar, ListItem, ListItemAvatar, Checkbox, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { uniq } from 'ramda';

import RoleIcon from '../../components/RoleIcon/RoleIcon';
import ProfessionChip from '../../components/ProfessionChip/ProfessionChip';
import { knownEncountersArray } from '../../utils/bossIconMap';
import { masterDPSList, masterDurationList } from './selectListItems';

import styles from './styles';
import { APPLY_ENCOUNTERS_FILTER } from '../../redux/actions';

const roleChipTheme = createTheme({
    palette: {
        primary: {
            main: '#303F4B'
        }
    }
});

const EncountersTableSidebarFilters = () => {

    const dispatch = useDispatch();

    const [dateRange, setDateRange] = useState([null, null])
    const [hideFalseStarts, setHideFalseStarts] = useState(false);
    const [falseStartDuration, setFalseStartDuration] = useState(20);

    const [durationLowerBound, setDurationLowerBound] = useState('any');
    const [durationUpperBound, setDurationUpperBound] = useState('any');

    const [dpsLowerBound, setDpsLowerBound] = useState('any');
    const [dpsUpperBound, setDpsUpperBound] = useState('any');

    const [logStatusSelected, setLogStatusSelected] = useState('all');
    const [bossTypeSelected, setBossTypeSelected] = useState('all');

    const encounters = useSelector((state) => state.encounters.encounters);
    const filteredEncounters = useSelector((state) => state.encounters.filteredEncounters);
    const session = useSelector((state) => state.session);

    const uniqueRoles = uniq(session.user.accounts ? encounters.reduce((acc, encounter) => {
        const accountName = session.user.accounts ? session.user?.accounts[0].accountName : '';
        const player = encounter.players.filter((player) => player.accountName === accountName)[0];
        return [...acc, ...player.roles];
    }, []) : []);

    const presentRoles = uniq(session.user.accounts ? filteredEncounters.reduce((acc, encounter) => {
        const accountName = session.user.accounts ? session.user?.accounts[0].accountName : '';
        const player = encounter.players.filter((player) => player.accountName === accountName)[0];
        return [...acc, ...player.roles];
    }, []) : []);

    const uniqueProfessions = uniq(session.user.accounts ? encounters.reduce((acc, encounter) => {
        const accountName = session.user.accounts ? session.user?.accounts[0].accountName : '';
        const player = encounter.players.filter((player) => player.accountName === accountName)[0];
        return [...acc, player.profession]
    }, []): []);

    const presentProfessions = uniq(session.user.accounts ? filteredEncounters.reduce((acc, encounter) => {
        const accountName = session.user.accounts ? session.user?.accounts[0].accountName : '';
        const player = encounter.players.filter((player) => player.accountName === accountName)[0];
        return [...acc, player.profession]
    }, []): []);

    const uniqueBosses = uniq(session.user.accounts ? encounters.reduce((acc, encounter) => {
        if (knownEncountersArray.includes(encounter.bossName)) {
            return [...acc];
        }

        return [...acc, {name: encounter.bossName, icon: encounter.fightIcon}];
    }, []) : []);

    const generateDurationLowerBoundList = () => {
        if (durationUpperBound === 'any') {
            return masterDurationList.map((el) => el.component);
        }

        const upperBoundIndex = masterDurationList.indexOf(masterDurationList.find((el) => el.index === durationUpperBound));
        return masterDurationList.slice(0, upperBoundIndex).map((el) => el.component);
    };

    const generateDurationUpperBoundList = () => {
        if (durationLowerBound === 'any') {
            return masterDurationList.map((el) => el.component)
        }

        let lowerBoundIndex = masterDurationList.indexOf(masterDurationList.find((el) => el.index === durationLowerBound));
        const upperBoundIndex = masterDurationList.indexOf(masterDurationList.find((el) => el.index === durationUpperBound));
        if (upperBoundIndex < lowerBoundIndex) {
            setDurationUpperBound('>10');
        }
        if (durationUpperBound !== 'any') {
            lowerBoundIndex++;
        }

        return masterDurationList.slice(lowerBoundIndex).map((el) => el.component);
    };

    const generateDPSLowerBoundList = () => {
        if (dpsUpperBound === 'any') {
            return masterDPSList.map((el) => el.component);
        }

        const upperBoundIndex = masterDPSList.indexOf(masterDPSList.find((el) => el.index === dpsUpperBound));
        return masterDPSList.slice(0, upperBoundIndex).map((el) => el.component);
    };

    const generateDPSUpperBoundList = () => {
        if (dpsLowerBound === 'any') {
            return masterDPSList.map((el) => el.component)
        }

        let lowerBoundIndex = masterDPSList.indexOf(masterDPSList.find((el) => el.index === dpsLowerBound));
        const upperBoundIndex = masterDPSList.indexOf(masterDPSList.find((el) => el.index === dpsUpperBound));
        if (upperBoundIndex < lowerBoundIndex) {
            setDpsUpperBound('>40000');
        }
        if (dpsUpperBound !== 'any') {
            lowerBoundIndex++;
        }

        return masterDPSList.slice(lowerBoundIndex).map((el) => el.component);
    };

    const logStatusButtonData = [
        { id: 'success', displayName: 'Success' },
        { id: 'all', displayName: 'All'},
        { id: 'fail', displayName: 'Fail' }
    ];

    const bossTypeButtonData = [
        { id: 'normal', displayName: 'Normal' },
        { id: 'all', displayName: 'All'},
        { id: 'cm', displayName: 'CM' }
    ];

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <p>Log Status</p>
                <ButtonGroup variant={'contained'}>
                    {logStatusButtonData.map((buttonValue) => (
                        <Button
                            sx={{ width: '85px' }}
                            color={buttonValue.id === logStatusSelected ? 'primary' : 'secondary'}
                            onClick={() => {
                                setLogStatusSelected(buttonValue.id);
                                dispatch({
                                    type: APPLY_ENCOUNTERS_FILTER,
                                    payload: {
                                        filterType: 'logStatus',
                                        filterValue: buttonValue.id
                                    }
                                });
                            }}
                        >
                            {buttonValue.displayName}
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>      
            <Grid item xs={12}>
                <p>Boss Type</p>
                <ButtonGroup variant={'contained'}>
                    {bossTypeButtonData.map((buttonValue) => (
                        <Button
                            sx={{ width: '85px' }}
                            color={buttonValue.id === bossTypeSelected ? 'primary' : 'secondary'}
                            onClick={() => {
                                setBossTypeSelected(buttonValue.id);
                                dispatch({
                                    type: APPLY_ENCOUNTERS_FILTER,
                                    payload: {
                                        filterType: 'bossType',
                                        filterValue: buttonValue.id
                                    }
                                });
                            }}
                        >
                            {buttonValue.displayName}
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
                <p>Date</p>
                <DateRangePicker
                    calendars={3}
                    disableFuture
                    startText="Earliest Log"
                    endText="Latest Log"
                    value={dateRange}
                    onChange={(newValue) => {
                    setDateRange(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <p>Duration</p>
                <FormControl>
                    <InputLabel id="min-duration-select-label">Min</InputLabel>
                    <Select
                        sx={{width: 100}}
                        labelId="min-duration-select-label"
                        value={durationLowerBound}
                        label={'Min'}
                        onChange={(e) => setDurationLowerBound(e.target.value)}
                    >
                        {generateDurationLowerBoundList()}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="max-duration-select-label">Max</InputLabel>
                    <Select
                        sx={{width: 100}}
                        labelId="max-duration-select-label"
                        value={durationUpperBound}
                        label={'Max'}
                        onChange={(e) => setDurationUpperBound(e.target.value)}
                    >
                        {generateDurationUpperBoundList()}
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Switch 
                        color="primary"
                        onChange={(e) => setHideFalseStarts(e.target.checked)}
                        checked={hideFalseStarts}
                    />}
                    label="Hide False Starts"
                    labelPlacement="end"
                />
                {hideFalseStarts && (
                    <Box sx={{display: 'inline'}}>
                        <div>False Start Duration</div>
                        <Select
                            value={falseStartDuration}
                            variant={'standard'}
                            onChange={(e) => setFalseStartDuration(e.target.value)}
                        >
                            <MenuItem value={10}>10s</MenuItem>
                            <MenuItem value={20}>20s</MenuItem>
                            <MenuItem value={30}>30s</MenuItem>
                            <MenuItem value={40}>40s</MenuItem>
                        </Select>
                    </Box>
                )}

            </Grid>
            <Grid item xs={12}>
                <p>DPS</p>
                <FormControl>
                    <InputLabel id="min-dps-select-label">Min</InputLabel>
                    <Select
                        sx={{width: 100}}
                        labelId="min-dps-select-label"
                        value={dpsLowerBound}
                        label={'Min'}
                        onChange={(e) => {
                            setDpsLowerBound(e.target.value);
                            dispatch({
                                type: APPLY_ENCOUNTERS_FILTER,
                                payload: {
                                    filterType: 'dps-lower',
                                    filterValue: e.target.value
                                }
                            });
                        }}
                    >
                        {generateDPSLowerBoundList()}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="max-dps-select-label">Max</InputLabel>
                    <Select
                        sx={{width: 100}}
                        labelId="max-dps-select-label"
                        value={dpsUpperBound}
                        label={'Max'}
                        onChange={(e) => {
                            setDpsUpperBound(e.target.value);
                            dispatch({
                                type: APPLY_ENCOUNTERS_FILTER,
                                payload: {
                                    filterType: 'dps-upper',
                                    filterValue: e.target.value
                                }
                            });
                        }}
                    >
                        {generateDPSUpperBoundList()}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <ThemeProvider theme={roleChipTheme}>
                    <p>Roles</p>
                    <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                        {uniqueRoles.map((role) => (
                            <Box sx={styles.chipContainer}>
                                <Chip
                                    sx={{ fontFamily: 'Oxanium' }}
                                    icon={<Box sx={styles.roleChipIcon}><RoleIcon boon={role} size={22}/></Box>}
                                    label={role.split('-').join(' ')}
                                    color={'primary'}
                                    //onClick={() => dispatch({ type: APPLY_ROLE_FILTER, payload: role.split('-').join(' ')})}
                                    disabled={!presentRoles.includes(role.split('-').join(' '))}
                                    variant={'default'}
                                />
                            </Box>
                        ))}
                    </Box>
                </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
                <p>Professions</p>
                <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                    {uniqueProfessions.map((profession) => (
                        <Box sx={styles.chipContainer}>
                            <ProfessionChip 
                                profession={profession} 
                                disabled={!presentProfessions.includes(profession)} 
                                variant={'default'}
                            />
                        </Box>
                    ))}
                </Box>
            </Grid>
            <Grid item xs={12}>
                <p>Raid Bosses</p>
                <EncounterAccordionGroup dataMap={raidBossMap} />
                <p>CM Raid Bosses</p>
                <EncounterAccordionGroup dataMap={cmRaidBossMap} />
                <p>Fractals</p>
                <EncounterAccordionGroup dataMap={cmFractalBossMap} />
                {uniqueBosses.length > 0 && (
                        <>
                            <p>Other Encounters</p>
                            <List>
                                {uniqueBosses.map((boss) => (
                
                                    <ListItem
                                        key={boss.name}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                            />
                                        }
                                        disablePadding
                                    >
                                    <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                        sx={{ borderRadius: '10px' }}
                                        alt={boss.name}
                                        src={boss.icon}
                                        variant={'rounded'}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary={boss.name} />
                                    </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </>
                )}
            </Grid>
        </Grid>
    )
};

export default EncountersTableSidebarFilters;

// encounter filters
// success/fail/all
// date range
// trim false starts (logs under 20s)
// roles
// filter by boss name