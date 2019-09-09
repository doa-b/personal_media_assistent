import React from 'react';

import classes from './statusIcon.module.css'

import finished from '../../assets/images/ic_stop.png'

/**
 * Created by Doa on 9-9-2019.
 */
const statusIcon = (props) => {
    return (
        <div>
            <img src={finished} alt="finished" />
        </div>
    );
};

export default statusIcon;