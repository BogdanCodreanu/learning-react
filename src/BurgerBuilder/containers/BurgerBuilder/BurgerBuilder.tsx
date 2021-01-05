import React, { Component } from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger, { IIngredients } from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { addIngredient, removeIngredient } from "../../store/actions";
import { BurgerBuilderActionTypes } from "../../store/actions/actionTypes";
import { initIngredients } from "../../store/actions/burgerBuilder";
import { IBurgerIngredientsState } from "../../store/reducers/burgerBuilder";


interface IBurgerBuilderState {
    purchasing: boolean;
}

interface IBurgerBuilderProps extends RouteComponentProps {
    ingredients: IIngredients | null,
    price?: number,
    error?: boolean;

    onAddIngredient?: (ingredient: string) => void
    onRemoveIngredient?: (ingredient: string) => void
    onInitIngredients?: () => void
}


class BurgerBuilder extends Component<IBurgerBuilderProps> {
    state: IBurgerBuilderState = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients?.();
    }

    updatePurchaseState = (ingredients: IIngredients): boolean => {
        const sum: number = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((elementsSum, el) => elementsSum + el, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => this.setState({ purchasing: false });

    purchaseContinueHandler = async () => {

        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo: { [key: string]: boolean } = {};
        for (let key in this.props.ingredients) {
            disabledInfo[key] = this.props.ingredients[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p >Ingredients can't be loaded</p > :
            <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredientAdded={this.props.onAddIngredient}
                                   ingredientRemoved={this.props.onRemoveIngredient}
                                   disabled={disabledInfo}
                                   price={this.props.price ?? 0}
                                   purchasable={this.updatePurchaseState(this.props.ingredients)}
                                   ordered={this.purchaseHandler} />
                </>);

            orderSummary = <OrderSummary ingredients={this.props.ingredients}
                                         purchaseCanceled={this.purchaseCancelHandler}
                                         purchaseContinue={this.purchaseContinueHandler}
                                         price={this.props.price ?? 0} />;
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

const mapStateToProps = (state: IBurgerIngredientsState) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IBurgerIngredientsState, void, BurgerBuilderActionTypes>) => {
    return {
        onAddIngredient: (ingredient: string) => dispatch(addIngredient(ingredient)),
        onRemoveIngredient: (ingredient: string) => dispatch(removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(initIngredients()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(BurgerBuilder, axios));