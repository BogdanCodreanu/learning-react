import { IIngredients } from "../components/Burger/Burger";
import { ADD_INGREDIENT, GET_INGREDIENTS, REMOVE_INGREDIENT } from "./actions";

export interface IIngredientsAction {
    type: string

    ingredient?: string
}

export type IDispatchType = (args: IIngredientsAction) => IIngredientsAction

export interface IBurgerIngredientsState {
    ingredients: IIngredients,
    totalPrice: number
}

interface IIngredientPrices {
    [key: string]: number;
}

const INGREDIENT_PRICES: IIngredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState: IBurgerIngredientsState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0,
    },
    totalPrice: 0,
};

const burgerIngredientsReducer = (state = initialState, action: IIngredientsAction) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (!action.ingredient) {
                return state;
            } else {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredient]: state.ingredients[action.ingredient] + 1,
                    },
                    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
                };
            }
        case REMOVE_INGREDIENT:
            if (!action.ingredient || state.ingredients[action.ingredient] == 0) {
                return state;
            }
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
            };
        case GET_INGREDIENTS: {
            return state;
        }
    }
    return state;
};

export default burgerIngredientsReducer;
