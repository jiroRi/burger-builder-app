import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 7,
    bacon: 20,
    cheese: 10,
    patty: 15
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            patty: 0
        },
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        })
        .reduce( ( sum, el ) => {
            return sum + el;
        }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[ type ];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState( updatedIngredients );
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[ type ];

        if( oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    orderCanceledHandler = () => {
        this.setState({ purchasing: false});
    }

    orderContinuedHandler = () => {

        this.setState({loading: true});
        
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Jiro Ricaro',
                address: {
                    street: 'Rancho Pogi',
                    zipCode: '6969',
                    country: 'Philippines',
                },
                email: 'ricarovirgiliojr@gmail.com'
            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false })
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false })
            });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary ingredients={this.state.ingredients}
        orderCanceled={this.orderCanceledHandler}
        orderContinued={this.orderContinuedHandler}
        price={this.state.totalPrice}/>

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} orderCanceled={this.orderCanceledHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);