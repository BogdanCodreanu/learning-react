import React, { Component, useEffect, useState } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, RouteComponentProps } from "react-router";
import { DEFAULT_INGREDIENTS, IIngredients } from "../../components/Burger/Burger";
import ContactData from "./ContactData/ContactData";
import { IBurgerIngredientsState } from "../../store/burgerIngredientsReducer";
import { connect } from "react-redux";

interface ICheckoutProps extends RouteComponentProps {
    ingredients?: IIngredients
    price?: number
}

class Checkout extends Component<ICheckoutProps> {
    onCancelClicked = () => {
        this.props.history.goBack();
    };

    onContinueClicked = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div >
                <CheckoutSummary ingredients={this.props.ingredients ??
                                              DEFAULT_INGREDIENTS}
                                 onCancelClicked={this.onCancelClicked}
                                 onContinueClicked={this.onContinueClicked} />
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData} />
            </div >
        );
    }
}

const mapStateToProps = (state: IBurgerIngredientsState) => {
    return {
        ingredients: state.ingredients,
    };
};

export default connect(mapStateToProps)(Checkout);