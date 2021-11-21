import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/system';
import {
    Tooltip,
    Paper,
    Breadcrumbs,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import TimelineCard from './TimelineCard';
import TimelineDetails from './TimelineDetails';

import styles from './styles';

const createBreadcrumbsArray = (timeline) => {

    const formattedTimeline = [];

    let currentRow = [];
    let currentNode = timeline?.head || {};
    while(currentNode.next) {

        if (currentRow.length > 10) {
            currentRow.push('lineBreak');
            formattedTimeline.push(currentRow);
            currentRow = [];
            currentRow.push('lineBreak');
        }

        currentRow.push(currentNode.data)
        currentNode = currentNode.next;
    }

    currentRow.push('end');
    formattedTimeline.push(currentRow);

    return formattedTimeline;
    
};

const BossTimeline = () => {

    const timeline = useSelector((state) => state?.collectorStats?.stats?.stats?.timeline);

    const [containerWidth, setContainerWidth] = useState(document.querySelector('#bossTimelineContainer')?.clientWidth);
    const [contentWidth, setContentWidth] = useState(document.querySelector('#bossTimelineContent')?.clientWidth);
    const [detailsWidth, setDetailsWidth] = useState(document.querySelector('#bossTimelineDetailsContent')?.clientWidth);

    const [selectedBoss, setSelectedBoss] = useState(null);

    const handleResize = () => {
        setContainerWidth(document.querySelector('#bossTimelineContainer')?.clientWidth);
        setContentWidth(document.querySelector('#bossTimelineContent')?.clientWidth);
        setDetailsWidth(document.querySelector('#bossTimelineDetailsContent')?.clientWidth);
    };

    useEffect(() => {
        handleResize();
    });

    window.addEventListener('resize', handleResize)

    const containerStyle = containerWidth < contentWidth ? styles.containerMobile : styles.container;
    const detailsContainerStyle = containerWidth < detailsWidth ? styles.detailsOuterContainerMobile : styles.detailsOuterContainer;

    const generateBreadcrumbItem = (item) => {
        switch(item) {
            case 'start': {
                return  (
                    <Box component={'p'} sx={styles.timelineCardSubtext}>Start</Box>
                )
            }
            case 'end': {
                return  (
                    <Box component={'p'} sx={styles.timelineCardSubtext}>End</Box>
                )
            }
            case 'lineBreak': {
                return  (
                    <div />
                )
            }
            default: {
                return (
                    <TimelineCard boss={item} onClick={() => selectedBoss === item ? setSelectedBoss(null) : setSelectedBoss(item)} />
                );
            }
        }
    };

    const tooltipText = (text) => (
        <React.Fragment>
            <Box sx={styles.timelineCardTooltip}>
                {text}
            </Box>
        </React.Fragment>
    );

    const separator = (
        <Tooltip  title={tooltipText('Separator')} placement={'top'} arrow>
            <NavigateNextIcon fontSize="large" />
        </Tooltip>
    );

    // Satisfying older collectors
    if (!timeline) {
        return(
            <div />
        );
    }
    return (
        <Paper sx={styles.paper}>
            <Box sx={styles.headerText}>Timeline</Box>
            <Box id={'bossTimelineContainer'} sx={containerStyle}>
                <Box sx={styles.breadcrumbs}>
                    {createBreadcrumbsArray(timeline).map((row) => (
                        <Breadcrumbs sx={styles.muiBreadcrumbs} id={'bossTimelineContent'} maxItems={30} separator={separator}>
                            {row.map((item) => generateBreadcrumbItem(item))}
                        </Breadcrumbs>
                    ))}
                </Box>

            </Box>
            {selectedBoss ?
                <Box sx={detailsContainerStyle}>
                    <TimelineDetails boss={selectedBoss} resetOnClick={() => setSelectedBoss(null)} />
                </Box>
            : 
                <Box component={'p'} sx={styles.detailsNoneSelected}>
                    Select a boss to view details...
                </Box>
            }
        </Paper>
    );
};

export default BossTimeline;
