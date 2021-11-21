import React from "react";

import { Box } from '@mui/system';
import { Grid } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{padding: '16px', color: '#F57600', background: 'black'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ fontFamily: 'Oxanium', fontWeight: '400', textAlign: 'center' }}>Created by Scott Mueller (Rhavoreth.1350)</Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default Footer;