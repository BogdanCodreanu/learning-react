import React from 'react';
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import {
    IBurgerIngredientsState,
    IDispatchType,
} from "../../../store/burgerIngredientsReducer";
import { ADD_INGREDIENT } from "../../../store/actions";
import { connect } from "react-redux";

const controls = [
    {
        label: 'Salad',
        type: 'salad',
    },
    {
        label: 'Bacon',
        type: 'bacon',
    },
    {
        label: 'Cheese',
        type: 'cheese',
    },
    {
        label: 'Meat',
        type: 'meat',
    },

];

interface IBuildControlsProps {
    price: number;
    ingredientAdded?: (arg0: string) => void;
    ingredientRemoved?: (arg0: string) => void;
    disabled: { [key: string]: boolean };
    purchasable: boolean;
    ordered: () => void;
    onAddIngredients?: (ingredient: string) => void
    onRemoveIngredients?: (ingredient: string) => void
}

const BuildControls = (props: IBuildControlsProps) => {
    const orderHandler = () => {
        props.ordered();
    };
    return (
        <div className={classes.BuildControls} >
            <p >Current Price: <strong >{props.price.toFixed(2)}</strong ></p >
            {controls.map(control => {
                return (
                    <BuildControl key={control.label}
                                  label={control.label}
                                  ingredientAdded={() => props.ingredientAdded?.(control.type)}
                                  ingredientRemoved={() => props.ingredientRemoved?.(
                                      control.type)}
                                  disabled={props.disabled[control.type]}
                    />);
            })}
            <button className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={orderHandler} >ORDER
                NOW
            </button >
        </div >
    );
};

export default BuildControls;
