import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Checkbox
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { APPLY_ENCOUNTERS_FILTER } from '../../redux/actions';

const EncounterAccordionListItem = ({wing, boss}) => {

    const dispatch = useDispatch();
    const [checkBoxValue, setCheckboxValue] = useState(false);

    return (
        <ListItem
            key={`${wing}-${boss.bossName}`}
            secondaryAction={
                <Checkbox
                    edge="end"
                    checked={checkBoxValue}
                    onChange={(e) => {
                        setCheckboxValue(e.target.checked)
                        dispatch({
                            type: APPLY_ENCOUNTERS_FILTER,
                            payload: {
                                filterType: 'encounter',
                                encounterName: boss.bossName,
                                filterValue: e.target.checked
                            }
                        });
                    }}
                />
            }
            disablePadding
        >
            <ListItemButton sx={{paddingLeft: '8px'}} onClick={() => {
                const newCheckboxValue = !checkBoxValue;
                dispatch({
                    type: APPLY_ENCOUNTERS_FILTER,
                    payload: {
                        filterType: 'encounter',
                        encounterName: boss.bossName,
                        filterValue: newCheckboxValue
                    }
                });
                setCheckboxValue(newCheckboxValue);
            }}>
                <ListItemAvatar>
                    <Avatar
                        sx={{ borderRadius: '10px' }}
                        alt={boss.bossName}
                        src={boss.fightIcon}
                        variant={'rounded'}
                    />
                </ListItemAvatar>
                <ListItemText sx={{ '& .MuiTypography-root': {fontFamily: 'oxanium'}}} primary={boss.bossName} />
            </ListItemButton>
        </ListItem>
    )
};

const EncounterAccordionGroup = ({ dataMap }) => (
    <>
        {Object.keys(dataMap).map((key) => {
            const wing = dataMap[key];
            return (
                <Accordion>
                    <AccordionSummary  expandIcon={<ExpandMoreIcon />} sx={{background: '#E6EEF0'}}>
                        <div>{wing.name}</div>
                    </AccordionSummary>
                    <AccordionDetails sx={{background: '#E6EEF0', paddingLeft: 0, paddingRight: 0}}>
                        <List>
                            {wing.bosses.map((boss) => ( <EncounterAccordionListItem boss={boss} wing={wing} /> ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            );
        })}
    </>
);

export default EncounterAccordionGroup;
