import React from 'react';

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

export interface IIngredients {
    salad: number,
    bacon: number,
    cheese: number,
    meat: number,

    [key: string]: number
}

export const DEFAULT_INGREDIENTS: IIngredients = {
    salad: 0,
    meat: 0,
    cheese: 0,
    bacon: 0,
};

interface IBurgerProps {
    ingredients: IIngredients
}

const Burger = (props: IBurgerProps) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])]
            .map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    return (
        <div className={classes.Burger} >
            <BurgerIngredient type={'bread-top'} />
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div >
    );
};

export default Burger;
