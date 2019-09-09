import React from 'react';

import classes from './Avatar.module.css'
import defaultAvatar from '../../assets/images/anonymous-avatar.png'

/**
 * Created by Doa on 9-9-2019.
 */
const avatar = (props) => {

    let avatar = (
        <div className={classes.Avatar}>
            <img src={defaultAvatar} alt="Anonymous User"/>
        </div>
    );

    return avatar;
};

export default avatar;