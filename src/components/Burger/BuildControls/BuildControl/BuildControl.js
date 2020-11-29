import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = (props) => {
    <div>
        <div className={classes.BuildControl}>{props.label}</div>
        <button className={classes.Less}></button>
        <button className={classes.More}></button>
    </div>
}

export default buildControls;
