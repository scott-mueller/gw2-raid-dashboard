import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/css';

import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TimelineCard from './TimelineCard';
import TimelineDetails from './TimelineDetails';

import styles from './styles';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    ol:{ 
        flexWrap: 'nowrap',
        padding: '10px',
        paddingBottom: '40px',
        paddingTop: '0px'
    }
  }));

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
    const classes = useStyles();

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
                    <p className={css(styles.timelineCardSubtext)}>Start</p>
                )
            }
            case 'end': {
                return  (
                    <p className={css(styles.timelineCardSubtext)}>End</p>
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
            <div className={css(styles.timelineCardTooltip)}>
                {text}
            </div>
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
        <Paper className={css(styles.paper)}>
            <div className={css(styles.headerText)}>Timeline</div>
            <div id={'bossTimelineContainer'} className={css(containerStyle)}>
                <div className={css(styles.breadcrumbs)}>
                    {createBreadcrumbsArray(timeline).map((row) => (
                        <Breadcrumbs classes={{ol: classes.ol}} id={'bossTimelineContent'} maxItems={30} separator={separator}>
                            {row.map((item) => generateBreadcrumbItem(item))}
                        </Breadcrumbs>
                    ))}
                </div>

            </div>
            {selectedBoss ?
                <div className={css(detailsContainerStyle)}>
                    <TimelineDetails boss={selectedBoss} resetOnClick={() => setSelectedBoss(null)} />
                </div>
            : 
                <p className={css(styles.detailsNoneSelected)}>
                    Select a boss to view details...
                </p>
            }
        </Paper>
    );
};

export default BossTimeline;
