import React from 'react';
import { MenuItem } from '@mui/material';

export const masterDurationList = [
    {index: 'any', component: (<MenuItem value={'any'}>Any</MenuItem>)},
    {index: '<10', component: (<MenuItem value={'<10'}>{`< 10s`}</MenuItem>)},
    {index: '10', component: (<MenuItem value={'10'}>10s</MenuItem>)},
    {index: '15', component: (<MenuItem value={'15'}>15s</MenuItem>)},
    {index: '20', component: (<MenuItem value={'20'}>20s</MenuItem>)},
    {index: '25', component: (<MenuItem value={'25'}>25s</MenuItem>)},
    {index: '30', component: (<MenuItem value={'30'}>30s</MenuItem>)},
    {index: '40', component: (<MenuItem value={'40'}>40s</MenuItem>)},
    {index: '50', component: (<MenuItem value={'50'}>50s</MenuItem>)},
    {index: '60', component: (<MenuItem value={'60'}>1m 00s</MenuItem>)},
    {index: '90', component: (<MenuItem value={'90'}>1m 30s</MenuItem>)},
    {index: '120', component: (<MenuItem value={'120'}>2m 00s</MenuItem>)},
    {index: '180', component: (<MenuItem value={'180'}>3m 00s</MenuItem>)},
    {index: '240', component: (<MenuItem value={'240'}>4m 00s</MenuItem>)},
    {index: '300', component: (<MenuItem value={'300'}>5m 00s</MenuItem>)},
    {index: '360', component: (<MenuItem value={'360'}>6m 00s</MenuItem>)},
    {index: '420', component: (<MenuItem value={'420'}>7m 00s</MenuItem>)},
    {index: '480', component: (<MenuItem value={'480'}>8m 00s</MenuItem>)},
    {index: '540', component: (<MenuItem value={'540'}>9m 00s</MenuItem>)},
    {index: '600', component: (<MenuItem value={'600'}>10m 00s</MenuItem>)},
    {index: '>10', component: (<MenuItem value={'>10'}>{'> 10m 00s'}</MenuItem>)}
];

export const masterDPSList = [
    {index: 'any', component: (<MenuItem value={'any'}>Any</MenuItem>)},
    {index: '<1000', component: (<MenuItem value={'<1000'}>{`< 1000`}</MenuItem>)},
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