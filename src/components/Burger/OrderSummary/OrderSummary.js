import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return(
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize'}}>{igKey}</span>: x{props.ingredients[igKey]}
            </li>
        );
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p><b>Total Price:</b> PHP {props.price}</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.orderCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.orderContinued}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;