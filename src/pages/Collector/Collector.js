import React, { useEffect } from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_COLLECTOR_DATA } from '../../redux/actions';

const Collector = () => {

    const { search } = useLocation();
    const dispatch = useDispatch();
    const stats = useSelector((state) => state.collectorStats);

    useEffect(() => {
        const qsValues = queryString.parse(search);
        return dispatch({type: FETCH_COLLECTOR_DATA, payload: qsValues.collectorId})
    }, [search, dispatch]);
    
    return (
        <div>
            <p>Hello Collector</p>
            <p>This code isn't pushed yet!</p>
            <p>{JSON.stringify(stats)}</p>
        </div>
    )
};

export default Collector;
