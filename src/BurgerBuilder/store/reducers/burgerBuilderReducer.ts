import { IIngredients } from "../../components/Burger/Burger";
import {
    ADD_INGREDIENT,
    BurgerBuilderActionTypes,
    FETCH_INGREDIENTS_FAILED,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
} from "../actions/actionTypes";

export type IDispatchType = (args: BurgerBuilderActionTypes) => BurgerBuilderActionTypes

export interface IBurgerIngredientsState {
    ingredients: IIngredients | null,
    totalPrice: number,
    error: boolean
}

const INGREDIENT_PRICES: { [key: string]: number } = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState: IBurgerIngredientsState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
};

const burgerBuilderReducer = (state = initialState, action: BurgerBuilderActionTypes) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (!action.ingredientName || !state.ingredients) {
                return state;
            } else {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] +
                                                 1,
                    },
                    totalPrice: state.totalPrice +
                                INGREDIENT_PRICES[action.ingredientName],
                };
            }
        case REMOVE_INGREDIENT:
            if (!action.ingredientName ||
                !state.ingredients ||
                state.ingredients[action.ingredientName] ===
                0) {
                return state;
            }
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
        case SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 0,
                error: false,
            };
        }
        case FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true,
            };
        }
        default:
            return state;
    }
};

export default burgerBuilderReducer;
