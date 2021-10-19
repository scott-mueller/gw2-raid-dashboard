import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import HeaderAndSidebarTemplate from '../../components/HeaderAndSidebarTemplate/HeaderAndSidebarTemplate';

const Home = () => {

    return (
        <div>
            <CssBaseline />
            <HeaderAndSidebarTemplate pageTitleText={'Guild Wars 2 Raid Dashboard'}>
                <h1>Home</h1>
            </HeaderAndSidebarTemplate>
        </div>
    )
};

export default Home;
