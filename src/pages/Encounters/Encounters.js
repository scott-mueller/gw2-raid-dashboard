import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    CssBaseline,
    Grid
} from '@material-ui/core';

import HeaderAndSidebarTemplate from '../../components/HeaderAndSidebarTemplate/HeaderAndSidebarTemplate';
import EncountersTable from '../../components/EncountersTable/EncountersTable';
import { FETCH_ENCOUNTERS_BY_ACCOUNT_NAME } from '../../redux/actions';
import EncountersTableFilters from '../../components/EncountersTableFilters/EncountersTableFilters';

const Encounters = () => {

    const dispatch = useDispatch();
    const userSession = useSelector((state) => state?.session);

    useEffect(() => {
        if (userSession.user?._id) {
            return dispatch({type: FETCH_ENCOUNTERS_BY_ACCOUNT_NAME, payload: userSession.user?.accounts[0].accountName})
        }
    }, [dispatch, userSession]);

    return (
        <div>
            <CssBaseline />
            <HeaderAndSidebarTemplate pageTitleText={'Encounters'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <EncountersTableFilters />
                    </Grid>
                    <Grid item xs={12}>
                        <EncountersTable />
                    </Grid>
                </Grid>
            </HeaderAndSidebarTemplate>
        </div>
    )
};

export default Encounters;

// General stats about the selected encounters
// Success Rate
// pie chart with profession breakdown
// time spent in encounters
// role breakddown

// encounters - try the expansion panel thing again
// on click, split the table into 2 parts - rows before the click exclusive, and rows after the click exclusive
// In the middle put a card in there with expanded stats (players, dps breakdown, downs, death, first down, first death, etc) + link to full report
