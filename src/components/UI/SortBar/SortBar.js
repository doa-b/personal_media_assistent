import React from 'react';

import classes from './SortBar.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/**
 * Created by Doa on 2-10-2019.
 */
const SortBar = (props) => {
    return (
        <div className={classes.SortBar}>
            <div onClick={() => props.setOption('sortBy')}>
                <b>sort by: </b>{props.sortBy}
            </div>
            <div onClick={props.toggleOrder}>
                <FontAwesomeIcon
                    className={classes.SortIcon}
                    icon={props.orderIcon}/>
            </div>
        </div>
    );
};

export default SortBar;