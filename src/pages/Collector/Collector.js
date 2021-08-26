import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_COLLECTOR_DATA } from '../../redux/actions';

const Collector = () => {

    const dispatch = useDispatch();
    const stats = useSelector((state) => state.collectorStats);

    const dispatchAction = () => {
        return dispatch({type: FETCH_COLLECTOR_DATA})
    }

    return (
        <div>
            <p>Hello Collector</p>
            <button onClick={dispatchAction}>Click me!</button>
            <p>{JSON.stringify(stats)}</p>
        </div>
    )
};

export default Collector;
