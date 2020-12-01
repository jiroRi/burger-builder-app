import React from 'react';

import classes from './HamburgerMenu.module.css';

const hamburgerMenu = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default hamburgerMenu;