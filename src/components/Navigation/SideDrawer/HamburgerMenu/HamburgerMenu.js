import React from 'react';

import classes from './HamburgerMenu.module.css'

/**
 * Created by Doa on 8-9-2019.
 */
const hamburgerMenu = (props) => (
    <div className={classes.HamburgerMenu}
         onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default hamburgerMenu;