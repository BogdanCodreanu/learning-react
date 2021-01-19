import { CombinedState } from "redux";
import { IIngredients } from "../../components/Burger/Burger";
import { IAuthData } from "../../containers/Auth/Auth";
import { IOrderData } from "../../containers/Checkout/ContactData/ContactData";
import { IAuthReducerState } from "../reducers/authReducer";
import { IBurgerIngredientsState } from "../reducers/burgerBuilderReducer";
import { IOrdersState } from "../reducers/orderReducer";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

export interface IAddIngredientAction {
    type: typeof ADD_INGREDIENT,
    ingredientName: string
}

export interface IRemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT,
    ingredientName: string
}

export interface ISetIngredientsAction {
    type: typeof SET_INGREDIENTS,
    ingredients: IIngredients
}

export interface IFetchIngredientsFailed {
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

export interface IPurchaseBurgerSuccessAction {
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

export type BurgerCombinedState = CombinedState<{ burgerBuilder: IBurgerIngredientsState, order: IOrdersState, auth: IAuthReducerState }>;

export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';

export interface IFetchOrdersSuccessAction {
    type: typeof FETCH_ORDERS_SUCCESS,
    orders: IOrderData[]
}

interface IFetchOrdersFailAction {
    type: typeof FETCH_ORDERS_FAIL,
    error: string
}

interface IFetchOrdersStartAction {
    type: typeof FETCH_ORDERS_START,
}

export type FetchOrdersActionTypes =
    IFetchOrdersFailAction
    | IFetchOrdersStartAction
    | IFetchOrdersSuccessAction

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

interface IAuthStartAction {
    type: typeof AUTH_START
}

export interface IAuthSuccessAction {
    type: typeof AUTH_SUCCESS,
    authData: IAuthData
}

export interface IAuthFailAction {
    type: typeof AUTH_FAIL
    error: string
}

interface IAuthLogoutAction {
    type: typeof AUTH_LOGOUT
}

export type AuthActionTypes =
    IAuthStartAction
    | IAuthSuccessAction
    | IAuthFailAction
    | IAuthLogoutAction;