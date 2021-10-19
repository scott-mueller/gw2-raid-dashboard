import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import HeaderAndSidebarTemplate from '../../components/HeaderAndSidebarTemplate/HeaderAndSidebarTemplate';

const Encounters = () => {

    return (
        <div>
            <CssBaseline />
            <HeaderAndSidebarTemplate pageTitleText={'Encounters'}>
                <h1>List of your logs</h1>
            </HeaderAndSidebarTemplate>
        </div>
    )
};

export default Encounters;
