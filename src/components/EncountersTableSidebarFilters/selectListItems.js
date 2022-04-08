import React from 'react';
import { MenuItem } from '@mui/material';

export const masterDurationList = [
    {index: 'any', component: (<MenuItem value={'any'}>Any</MenuItem>)},
    {index: '<10s', component: (<MenuItem value={'<10s'}>{`< 10s`}</MenuItem>)},
    {index: '10000', component: (<MenuItem value={'10000'}>10s</MenuItem>)},
    {index: '15000', component: (<MenuItem value={'15000'}>15s</MenuItem>)},
    {index: '20000', component: (<MenuItem value={'20000'}>20s</MenuItem>)},
    {index: '25000', component: (<MenuItem value={'25000'}>25s</MenuItem>)},
    {index: '30000', component: (<MenuItem value={'30000'}>30s</MenuItem>)},
    {index: '40000', component: (<MenuItem value={'40000'}>40s</MenuItem>)},
    {index: '50000', component: (<MenuItem value={'50000'}>50s</MenuItem>)},
    {index: '60000', component: (<MenuItem value={'60000'}>1m 00s</MenuItem>)},
    {index: '90000', component: (<MenuItem value={'90000'}>1m 30s</MenuItem>)},
    {index: '120000', component: (<MenuItem value={'120000'}>2m 00s</MenuItem>)},
    {index: '180000', component: (<MenuItem value={'180000'}>3m 00s</MenuItem>)},
    {index: '240000', component: (<MenuItem value={'240000'}>4m 00s</MenuItem>)},
    {index: '300000', component: (<MenuItem value={'300000'}>5m 00s</MenuItem>)},
    {index: '360000', component: (<MenuItem value={'360000'}>6m 00s</MenuItem>)},
    {index: '420000', component: (<MenuItem value={'420000'}>7m 00s</MenuItem>)},
    {index: '480000', component: (<MenuItem value={'480000'}>8m 00s</MenuItem>)},
    {index: '540000', component: (<MenuItem value={'540000'}>9m 00s</MenuItem>)},
    {index: '600000', component: (<MenuItem value={'600000'}>10m 00s</MenuItem>)},
    {index: '>10m', component: (<MenuItem value={'>10m'}>{'> 10m 00s'}</MenuItem>)}
];

export const masterDPSList = [
    {index: 'any', component: (<MenuItem value={'any'}>Any</MenuItem>)},
    {index: '1000', component: (<MenuItem value={'1000'}>1000</MenuItem>)},
    {index: '1500', component: (<MenuItem value={'1500'}>1500</MenuItem>)},
    {index: '2000', component: (<MenuItem value={'2000'}>2000</MenuItem>)},
    {index: '3000', component: (<MenuItem value={'3000'}>3000</MenuItem>)},
    {index: '4000', component: (<MenuItem value={'4000'}>4000</MenuItem>)},
    {index: '5000', component: (<MenuItem value={'5000'}>5000</MenuItem>)},
    {index: '10000', component: (<MenuItem value={'10000'}>10000</MenuItem>)},
    {index: '15000', component: (<MenuItem value={'15000'}>15000</MenuItem>)},
    {index: '20000', component: (<MenuItem value={'20000'}>20000</MenuItem>)},
    {index: '25000', component: (<MenuItem value={'25000'}>25000</MenuItem>)},
    {index: '30000', component: (<MenuItem value={'30000'}>30000</MenuItem>)},
    {index: '35000', component: (<MenuItem value={'35000'}>35000</MenuItem>)},
    {index: '40000', component: (<MenuItem value={'40000'}>40000</MenuItem>)},
    {index: '>40000', component: (<MenuItem value={'>40000'}>{'> 40000'}</MenuItem>)},
];