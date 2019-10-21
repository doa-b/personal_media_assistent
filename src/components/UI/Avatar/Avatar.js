import React from 'react';
import {Link} from 'react-router-dom'
import Img from 'react-image'

import classes from './Avatar.module.css'
import defaultAvatar from '../../../assets/images/anonymous-avatar.png'
import seriesPlaceholder from "../../../assets/images/series_placeholder.png";
import Spinner from '../Spinner/Spinner';

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

    return (
        <div className={classes.Avatar}>
            <Link to="/authentication">
                <Img
                    src={[props.url, defaultAvatar]}
                    loader={<Spinner/>}
                    alt='episode still'/>
            </Link>
        </div>)
};
export default avatar;