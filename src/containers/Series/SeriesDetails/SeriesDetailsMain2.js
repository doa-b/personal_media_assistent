import React, {useEffect, useState} from 'react';

import classes from './SeriesDetailsMain.module.css'

/**
 * Created by Doa on 16-9-2019.
 */
const seriesDetailsMain2 = (props) => {
    const [series, setSeries] = useState(null);

    useEffect(() => {
        if (props.seriesId != series) setSeries(props.seriesId);

        console.log('[series]'+ series);
    });

    return (
        <div>
            {(series) ? series.name : null}
        </div>
    )
};

export default seriesDetailsMain2;