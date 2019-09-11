import React from 'react';
import { Link } from 'react-router-dom'

import classes from './Avatar.module.css'
import defaultAvatar from '../../assets/images/anonymous-avatar.png'

/**
 * Created by Doa on 9-9-2019.
 */
const avatar = (props) => {

    let avatar = (

        <div className={classes.Avatar}>
            <Link to="/authentication">
                <img src={defaultAvatar} alt="Anonymous User"/>
            </Link>
        </div>
    );

    return avatar;
};

export default avatar;