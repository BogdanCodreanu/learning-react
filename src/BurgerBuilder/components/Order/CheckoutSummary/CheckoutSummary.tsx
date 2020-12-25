import React from 'react';
import Burger, { IIngredients } from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

interface ICheckoutSummaryProps {
    onCancelClicked: () => void;
    onContinueClicked: () => void;
    ingredients: IIngredients
}

const CheckoutSummary = (props: ICheckoutSummaryProps) => {
    return (
        <div className={classes.CheckoutSummary} >
            <h1 >We hope it tastes well !</h1 >
            <div style={{
                width: '100%',
                margin: 'auto',
            }} >
                <Burger ingredients={props.ingredients} />
            </div >

            <Button btnType={'Danger'} clicked={props.onCancelClicked} >CANCEL</Button >
            <Button btnType={'Success'}
                    clicked={props.onContinueClicked} >CONTINUE</Button >
        </div >
    );
};

export default CheckoutSummary;
