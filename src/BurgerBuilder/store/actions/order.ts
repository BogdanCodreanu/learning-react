import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import instance from "../../axios-orders";
import { IOrderData } from "../../containers/Checkout/ContactData/ContactData";
import { IOrdersState } from "../reducers/orderReducer";
import { PurchaseBurgerActionTypes } from "./actionTypes";

const purchaseBurgerSuccess = (
    id: string,
    orderData: IOrderData): PurchaseBurgerActionTypes => {
    return {
        type: "PURCHASE_BURGER_SUCCESS",
        orderId: id,
        orderData: orderData,
    };
};

const purchaseBurgerFail = (error: string): PurchaseBurgerActionTypes => {
    return {
        type: "PURCHASE_BURGER_FAIL",
        error: error,
    };
};

const purchaseBurgerStart = (): PurchaseBurgerActionTypes => {
    return {
        type: "PURCHASE_BURGER_START",
    };
};

export const purchaseBurger = (orderData: IOrderData): ThunkAction<void, IOrdersState, unknown, Action> =>
    dispatch => {
        dispatch(purchaseBurgerStart());
        instance.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(e => {
                dispatch(purchaseBurgerFail(e));
            });
    };

export const purchaseInit = (): PurchaseBurgerActionTypes => {
    return {
        type: "PURCHASE_INIT",
    };
};