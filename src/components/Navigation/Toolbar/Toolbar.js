import React from 'react';
import { Link } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import classes from './Toolbar.module.css'

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

        <Link
            to={'series/add'}>
        <FontAwesomeIcon
            className={classes.Icon}
            icon={'plus-circle'}
            size={'2x'}/>
        </Link>

        <FontAwesomeIcon
            className={classes.Icon}
            icon={'search'}
            size={'2x'}/>

        <div className={classes.Avatar}>
            <Avatar/>
        </div>

    </header>
);

export default toolbar;