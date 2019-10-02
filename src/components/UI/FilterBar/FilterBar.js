import React from 'react';

import classes from './FilterBar.module.css'

/**
 * Created by Doa on 2-10-2019.
 */
const filterBar = (props) => {
    return (
        <div className={classes.FilterBar}
             onClick={() => props.setOption('filter')}>
            <b>filter: </b>{props.filter}
        </div>
    );
};

export default filterBar;