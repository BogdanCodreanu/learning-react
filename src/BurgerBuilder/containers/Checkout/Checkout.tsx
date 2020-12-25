import React, { useEffect, useState } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, RouteComponentProps } from "react-router";
import { IIngredients } from "../../components/Burger/Burger";
import ContactData from "./ContactData/ContactData";

interface ICheckoutState {
    ingredients: IIngredients
    price: number
}

const Checkout = (props: RouteComponentProps) => {
    const [ingredients, setIngredients] = useState<IIngredients>({
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0,
    });

    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const queryIngredients: IIngredients = {
            bacon: 0,
            cheese: 0,
            meat: 0,
            salad: 0,
        };

        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1];
            } else {
                queryIngredients[param[0]] = +param[1];

            }
        }

        console.log('checkout changed', queryIngredients);
        setIngredients(queryIngredients);
        setPrice(price);
    }, []);


    const onCancelClicked = () => {
        props.history.goBack();
    };
    const onContinueClicked = () => {
        props.history.replace('/checkout/contact-data');
    };
    return (
        <div >
            <CheckoutSummary ingredients={ingredients}
                             onCancelClicked={onCancelClicked}
                             onContinueClicked={onContinueClicked} />
            <Route path={props.match.path + '/contact-data'}
                   render={(props) => {
                       return (<ContactData ingredients={ingredients}
                                            price={price} {...props} />);
                   }} />
        </div >
    );
};

export default Checkout;