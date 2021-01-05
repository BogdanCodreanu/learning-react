import { IIngredients } from "../../components/Burger/Burger";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

interface AddIngredientAction {
    type: typeof ADD_INGREDIENT,
    ingredientName: string
}

interface RemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT,
    ingredientName: string
}

interface SetIngredientsAction {
    type: typeof SET_INGREDIENTS,
    ingredients: IIngredients
}

interface FetchIngredientsFailed {
    type: typeof FETCH_INGREDIENTS_FAILED,
}

export type BurgerBuilderActionTypes =
    AddIngredientAction
    | RemoveIngredientAction
    | SetIngredientsAction
    | FetchIngredientsFailed