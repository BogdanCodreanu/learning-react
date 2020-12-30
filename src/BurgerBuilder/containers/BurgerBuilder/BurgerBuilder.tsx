import React, { Component } from 'react';
import Burger, { IIngredients } from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { RouteComponentProps } from "react-router-dom";
import {
    IBurgerIngredientsState,
    IDispatchType,
} from "../../store/burgerIngredientsReducer";
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../../store/actions";
import { connect } from "react-redux";


interface IBurgerBuilderState {
    purchasing: boolean;
    loading: boolean
}

interface IBurgerBuilderProps extends RouteComponentProps {
    ingredients?: IIngredients,
    price?: number,
    onAddIngredient?: (ingredient: string) => void
    onRemoveIngredient?: (ingredient: string) => void
}

class BurgerBuilder extends Component<IBurgerBuilderProps> {
    state: IBurgerBuilderState = {
        purchasing: false,
        loading: false,
    };

    async componentDidMount() {
        // const response = await axios.get(
        //     'https://react-burger-learning-9391f-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json');
        // console.log(response); this.setState({ ingredients: response.data });
    }

    updatePurchaseState = (ingredients: IIngredients):boolean => {
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

        let burger = <Spinner />;

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

const mapStateToProps = (state: IBurgerIngredientsState) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch: IDispatchType) => {
    return {
        onAddIngredient: (ingredient: string) => dispatch({
            type: ADD_INGREDIENT,
            ingredient: ingredient,
        }),
        onRemoveIngredient: (ingredient: string) => dispatch({
            type: REMOVE_INGREDIENT,
            ingredient: ingredient,
        }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(
    withErrorHandler(BurgerBuilder, axios));