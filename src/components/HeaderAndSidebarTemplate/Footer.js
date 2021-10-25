import React from "react";
import { css } from '@emotion/css';
import { Grid } from "@material-ui/core";

const Footer = () => {
    return (
        <div className={css({padding: '16px', color: '#F57600', background: 'black'})}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={css({ fontFamily: 'Oxanium', fontWeight: '400', textAlign: 'center' })}>Created by Scott Mueller (Rhavoreth.1350)</div>
                </Grid>
            </Grid>
        </div>
    )
};

export default Footer;