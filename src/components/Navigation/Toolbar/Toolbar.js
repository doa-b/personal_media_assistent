import React from 'react';

import classes from './Toolbar.module.css'

import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';
import Avatar from '../../../components/Avatar/Avatar'


/**
 * Created by Doa on 8-9-2019.
 */
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <HamburgerMenu clicked={props.drawerToggleClicked}/>
        <div className={classes.AvatarHeight}>
            <Avatar/>
        </div>
    </header>
);

export default toolbar;