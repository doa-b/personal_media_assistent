import React from 'react';
import {Link} from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import classes from './Toolbar.module.css'

import Avatar from '../../UI/Avatar/Avatar'


/**
 * Created by Doa on 8-9-2019.
 *
 */


const toolbar = (props) => {

    let home = null;
    let add = null;

    if (props.auth) {
        home = (
            <Link
                to={'/'}>
                <FontAwesomeIcon
                    className={classes.Icon}
                    icon={'home'}
                    size={'2x'}/>
            </Link>
        );
        add = (
            <Link
                to={'series/add'}>
                <FontAwesomeIcon
                    className={classes.Icon}
                    icon={'plus-circle'}
                    size={'2x'}/>
            </Link>
        )
    }
    return (
        <header className={classes.Toolbar}>
        <span
            onClick={props.drawerToggleClicked}
            className={classes.Hamburger}>
        <FontAwesomeIcon
            icon={'bars'}
            size={'2x'}
        />
        </span>
            {home}
            {add}
            <div className={classes.Avatar}>
                <Avatar
                    url={props.avatar}/>
            </div>
        </header>
    )
};

export default toolbar;