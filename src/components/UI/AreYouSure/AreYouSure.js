import React from 'react';

import classes from './AreYouSure.module.css'

/**
 * Created by Doa on 4-10-2019.
 */
const areYouSure = (props) => {
    return (
        <div>
            <p>{props.message}</p>
            <button onClick={props.yes}>
                YES
            </button>
            <button onClick={props.no}>
                No
            </button>
        </div>
    );
};

export default areYouSure;