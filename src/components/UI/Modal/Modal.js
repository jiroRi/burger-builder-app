import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Modal.module.css';

class Modal extends Component {

    shouldComponentUpdate( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        console.log('[Modal.js] componentDidUpdate');
    }

    render() {
        return (
            <Aux>
        <Backdrop 
            show={this.props.show}
            clicked={this.props.orderCanceled}></Backdrop>
        <div 
            className={classes.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
        </div>
    </Aux>
        );
    }
}

export default Modal;