import React from 'react';

import classes from './SearchBar.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/**
 * Created by Doa on 2-10-2019.
 */
const searchBar = (props) => {
    return (
        <div className={classes.SearchBar}>
            <div>
                <label><b>search</b>:
                    <input value={props.search}
                           onChange={props.setSearch}/>
                </label>
            </div>
            <div onClick={props.clearSearch}>
                <FontAwesomeIcon
                    className={classes.closeIcon}
                    icon={'times-circle'}/>
            </div>
        </div>
    );
};

export default searchBar;