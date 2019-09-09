import React from 'react';

import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Avatar from '../../../components/Avatar/Avatar'
import Backdrop from "../../UI/Backdrop/Backdrop";


/**
 * Created by Doa on 9-9-2019.
 */
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.AvatarHeight}>
                    <Avatar/>
                </div>
                <div className={classes.SideDrawerBottom}>
                </div>
            </div>

        </Aux>
    );
};

export default sideDrawer;