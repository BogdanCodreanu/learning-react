import React, { Component } from 'react';
import Burger, { IIngredients } from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { RouteComponentProps } from "react-router-dom";


interface IIngredientPrices {
    [key: string]: number;
}

const INGREDIENT_PRICES: IIngredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

interface IBurgerBuilderState {
    ingredients: IIngredients | null;
    totalPrice: number;
    purchasable: boolean;
    purchasing: boolean;
    loading: boolean
}

interface IBurgerBuilderProps extends RouteComponentProps {

}

class BurgerBuilder extends Component<IBurgerBuilderProps> {
    state: IBurgerBuilderState = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    };

    async componentDidMount() {
        // const response = await axios.get(
        //     'https://react-burger-learning-9391f-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json');
        // console.log(response);
        // this.setState({ ingredients: response.data });
        this.setState({ingredients: {salad: 0, bacon: 0, cheese: 0, meat: 0}});

    }

    updatePurchaseState = (ingredients: IIngredients) => {
        const sum: number = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((elementsSum, el) => elementsSum + el, 0);
        this.setState({
            purchasable: sum > 0,
        });
    };

    addIngredientHandler = (type: string) => {
        if (this.state.ingredients) {
            const oldCount = this.state.ingredients[type];
            const updatedCount = oldCount + 1;
            const updatedIngredients = {
                ...this.state.ingredients,
            };
            updatedIngredients[type] = updatedCount;
            const priceAddition = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice + priceAddition;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients,
            });
            this.updatePurchaseState(updatedIngredients);
        }
    };
    removeIngredientHandler = (type: string) => {
        if (this.state.ingredients) {
            const oldCount = this.state.ingredients[type];
            if (oldCount <= 0) {
                return;
            }

            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients,
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice - priceDeduction;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients,
            });
            this.updatePurchaseState(updatedIngredients);
        }
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => this.setState({ purchasing: false });
    purchaseContinueHandler = async () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) +
                             '=' +
                             encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    };

    render() {
        const disabledInfo: { [key: string]: boolean } = {};
        for (let key in this.state.ingredients) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
        }

        let orderSummary = null;

        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredientAdded={this.addIngredientHandler}
                                   ingredientRemoved={this.removeIngredientHandler}
                                   disabled={disabledInfo}
                                   price={this.state.totalPrice}
                                   purchasable={this.state.purchasable}
                                   ordered={this.purchaseHandler} />
                </>);

            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         purchaseCanceled={this.purchaseCancelHandler}
                                         purchaseContinue={this.purchaseContinueHandler}
                                         price={this.state.totalPrice} />;

            if (this.state.loading) {
                orderSummary = <Spinner />;
            }
        }

        return (
            <>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal >
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);