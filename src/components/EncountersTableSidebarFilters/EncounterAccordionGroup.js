import React from 'react';

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

const EncounterAccordionGroup = ({ dataMap }) => {

    return (
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
                                {wing.bosses.map((boss) => (
                                    <ListItem
                                        key={`${wing}-${boss.bossName}`}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                            />
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton sx={{paddingLeft: '8px'}}>
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
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </>
    )
};

export default EncounterAccordionGroup;
