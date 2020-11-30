import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Modal.module.css';

const modal = (props) => (
    <Aux>
        <Backdrop 
            show={props.show}
            clicked={props.orderCanceled}></Backdrop>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;