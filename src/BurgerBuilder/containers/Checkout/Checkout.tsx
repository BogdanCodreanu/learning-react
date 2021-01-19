import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { DEFAULT_INGREDIENTS, IIngredients } from "../../components/Burger/Burger";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { BurgerCombinedState } from "../../store/actions/actionTypes";
import ContactData from "./ContactData/ContactData";

interface ICheckoutProps extends RouteComponentProps {
    ingredients: IIngredients | null,
    purchased?: boolean
}

const hasAnyIngredient = (ingredients: IIngredients): boolean => {
    return ingredients.salad > 0 || ingredients.bacon > 0 || ingredients.cheese > 0 ||
           ingredients.meat > 0;
};

class Checkout extends Component<ICheckoutProps> {

    onCancelClicked = () => {
        this.props.history.goBack();
    };

    onContinueClicked = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to={'/'} />;

        if (this.props.ingredients &&
            hasAnyIngredient(this.props.ingredients) &&
            !this.props.purchased) {
            summary = (
                <div >
                    <CheckoutSummary ingredients={this.props.ingredients ??
                                                  DEFAULT_INGREDIENTS}
                                     onCancelClicked={this.onCancelClicked}
                                     onContinueClicked={this.onContinueClicked} />
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData} />
                </div >);
        }
        return summary;
    }
}

const mapStateToProps = (state: BurgerCombinedState) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
};

export default connect(mapStateToProps)(Checkout);