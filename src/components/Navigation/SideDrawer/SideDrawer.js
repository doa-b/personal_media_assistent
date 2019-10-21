import React from 'react';
import {Link} from 'react-router-dom'

import classes from './SideDrawer.module.css'
import Avatar from '../../UI/Avatar/Avatar'
import Backdrop from "../../UI/Backdrop/Backdrop";


/**
 * Created by Doa on 9-9-2019.
 */
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    let bottom = null;

    if (props.auth) {
        bottom = <div className={classes.SideDrawerBottom}>
            <Link to='/logout'>Logout</Link>
            <Link to='/'>Series List</Link>
            <Link to='http://localhost:4005/series/add'>Add Series</Link>
        </div>
    } else {
        bottom =
            <div className={classes.SideDrawerBottom}>
                <Link to='/authentication'>Sign in</Link>
            </div>
    }

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.AvatarHeight}>
                    <Avatar url={props.avatar}/>
                </div>
                <div className={classes.SideDrawerBottom}>
                    {bottom}
                </div>
            </div>

        </>
    );
};

export default sideDrawer;