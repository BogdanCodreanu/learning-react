import { CombinedState } from "redux";
import { IIngredients } from "../../components/Burger/Burger";
import { IOrderData } from "../../containers/Checkout/ContactData/ContactData";
import { IBurgerIngredientsState } from "../reducers/burgerBuilderReducer";
import { IOrdersState } from "../reducers/orderReducer";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

interface IAddIngredientAction {
    type: typeof ADD_INGREDIENT,
    ingredientName: string
}

interface IRemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT,
    ingredientName: string
}

interface ISetIngredientsAction {
    type: typeof SET_INGREDIENTS,
    ingredients: IIngredients
}

interface IFetchIngredientsFailed {
    type: typeof FETCH_INGREDIENTS_FAILED,
}

export type BurgerBuilderActionTypes =
    IAddIngredientAction
    | IRemoveIngredientAction
    | ISetIngredientsAction
    | IFetchIngredientsFailed

const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
const PURCHASE_INIT = 'PURCHASE_INIT';

interface IPurchaseBurgerSuccessAction {
    type: typeof PURCHASE_BURGER_SUCCESS,
    orderId: string,
    orderData: IOrderData
}

interface IPurchaseBurgerFailAction {
    type: typeof PURCHASE_BURGER_FAIL,
    error: string
}

interface IPurchaseBurgerStartAction {
    type: typeof PURCHASE_BURGER_START,
}


interface IPurchaseInitAction {
    type: typeof PURCHASE_INIT,
}

export type PurchaseBurgerActionTypes =
    IPurchaseBurgerSuccessAction
    | IPurchaseBurgerFailAction
    | IPurchaseBurgerStartAction
    | IPurchaseInitAction

export type BurgerCombinedState = CombinedState<{ burgerBuilder: IBurgerIngredientsState, order: IOrdersState }>;