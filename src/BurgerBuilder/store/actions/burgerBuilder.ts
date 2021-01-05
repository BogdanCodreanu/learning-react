import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "../../axios-orders";
import { IIngredients } from "../../components/Burger/Burger";
import { IBurgerIngredientsState } from "../reducers/burgerBuilder";
import {
    ADD_INGREDIENT,
    BurgerBuilderActionTypes,
    FETCH_INGREDIENTS_FAILED,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
} from "./actionTypes";

export const addIngredient = (ingredientName: string): BurgerBuilderActionTypes => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: ingredientName,
    };
};

export const removeIngredient = (ingredientName: string): BurgerBuilderActionTypes => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: ingredientName,
    };
};

const setIngredients = (ingredients: IIngredients): BurgerBuilderActionTypes => {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

const fetchIngredientsFailed = (): BurgerBuilderActionTypes => {
    return {
        type: FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = (): ThunkAction<void, IBurgerIngredientsState, unknown, Action> =>
    async dispatch => {
        try {
            const response = await axios.get(
                'https://react-burger-learning-9391f-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json');
            console.log('get ingredients response', response);
            dispatch(setIngredients(response.data));
        } catch (e) {
            dispatch(fetchIngredientsFailed());
        }
    };