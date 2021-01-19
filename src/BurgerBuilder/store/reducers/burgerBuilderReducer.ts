import { IIngredients } from "../../components/Burger/Burger";
import {
    ADD_INGREDIENT,
    BurgerBuilderActionTypes,
    FETCH_INGREDIENTS_FAILED,
    IAddIngredientAction,
    IRemoveIngredientAction,
    ISetIngredientsAction,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
} from "../actions/actionTypes";

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

const addIngredient = (action: IAddIngredientAction, state: IBurgerIngredientsState) => {
    if (!action.ingredientName || !state.ingredients) {
        return state;
    } else {
        const updatedIngredients = {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        };
        return {
            ...state,
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice +
                        INGREDIENT_PRICES[action.ingredientName],
        };
    }
};

const removeIngredient = (
    action: IRemoveIngredientAction,
    state: IBurgerIngredientsState) => {
    if (!action.ingredientName ||
        !state.ingredients ||
        state.ingredients[action.ingredientName] ===
        0) {
        return state;
    }
    const updatedIngredients = state.ingredients[action.ingredientName] - 1;
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: updatedIngredients,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    };
};

const setIngredients = (
    state: IBurgerIngredientsState,
    action: ISetIngredientsAction) => {
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
};

const fetchIngredientsFailed = (state: IBurgerIngredientsState) => {
    return {
        ...state,
        error: true,
    };
};

const burgerBuilderReducer = (state = initialState, action: BurgerBuilderActionTypes) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return addIngredient(action, state);
        case REMOVE_INGREDIENT:
            return removeIngredient(action, state);
        case SET_INGREDIENTS:
            return setIngredients(state, action);
        case FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state);
        default:
            return state;
    }
};

export default burgerBuilderReducer;
