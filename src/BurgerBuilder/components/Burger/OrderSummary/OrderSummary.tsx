import React from 'react';
import { IIngredients } from "../Burger";
import Button from "../../UI/Button/Button";

interface IOrderSummaryProps {
    price: number;
    ingredients: IIngredients
    purchaseCanceled: () => void;
    purchaseContinue: () => void;
}

const OrderSummary = (props: IOrderSummaryProps) => {
    const ingredientSummary = Object.keys(props.ingredients).map(key => {
        return (
            <li key={key} >
                <span style={{ textTransform: 'capitalize' }} >{key}</span >
                : {props.ingredients[key]}
            </li >);
    });

    return (
        <>
            <h3 >Your Order</h3 >
            <p >A burger with the following ingredients:</p >
            <ul >
                {ingredientSummary}
            </ul >
            <p >
                <strong >Total price: {props.price.toFixed(2)}</strong >
            </p >
            <p >Continue to checkout</p >
            <Button btnType={'Danger'} clicked={props.purchaseCanceled} >CANCEL</Button >
            <Button btnType={'Success'}
                    clicked={props.purchaseContinue} >CONTINUE</Button >
        </>
    );
};

export default OrderSummary;
