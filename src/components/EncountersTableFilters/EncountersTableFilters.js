import React from 'react';

import { ButtonGroup, Paper, Button } from '@mui/material';

const EncountersTableFilters = () => {

    return (
        <Paper>
            <div>
                <ButtonGroup>
                    <Button>Sucess</Button>
                    <Button>All</Button>
                    <Button>Fail</Button>
                </ButtonGroup>
                
            </div>
        </Paper>
    )
};

export default EncountersTableFilters;

// encounter filters
// success/fail/all
// date range
// trim false starts (logs under 20s)
// roles
// filter by boss name