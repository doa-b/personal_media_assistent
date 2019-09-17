import React from 'react';

import classes from './SeriesDetailsMain.module.css'

/**
 * Created by Doa on 17-9-2019.
 */
const seriesDetailsMain = (props) => {
    return (
        <div>
        <h3>{props.details.name}</h3>
        <img scr={props.details.name}/>
        </div>
    );
};

export default seriesDetailsMain;