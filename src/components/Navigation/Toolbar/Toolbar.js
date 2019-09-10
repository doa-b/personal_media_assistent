import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import classes from './Toolbar.module.css'

import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';
import Avatar from '../../../components/Avatar/Avatar'


/**
 * Created by Doa on 8-9-2019.
 */
const toolbar = (props) => (
    <header className={classes.Toolbar}>

        <span
            onClick={props.drawerToggleClicked}
            className={classes.Hamburger}>
        <FontAwesomeIcon
            icon={'bars'}
            size={'2x'}
        />
        </span>

        <FontAwesomeIcon
            className={classes.Icon}
            icon={'plus-circle'}
            size={'2x'}/>

        <FontAwesomeIcon
            className={classes.Icon}
            icon={'search'}
            size={'2x'}/>

        <FontAwesomeIcon
            className={classes.Avatar}
            icon={'user-tie'}
            size={'2x'}/>
    </header>
);

export default toolbar;