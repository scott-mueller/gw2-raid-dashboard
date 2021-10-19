import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import HeaderAndSidebarTemplate from '../../components/HeaderAndSidebarTemplate/HeaderAndSidebarTemplate';

const CollectorList = () => {

    return (
        <div>
            <CssBaseline />
            <HeaderAndSidebarTemplate pageTitleText={'Guild Wars 2 Raid Dashboard'}>
                <h1>List of all collectors you are in</h1>
            </HeaderAndSidebarTemplate>
        </div>
    )
};

export default CollectorList;
