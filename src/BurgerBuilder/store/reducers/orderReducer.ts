import { IOrderData } from "../../containers/Checkout/ContactData/ContactData";
import {
    FetchOrdersActionTypes,
    IFetchOrdersSuccessAction,
    IPurchaseBurgerSuccessAction,
    PurchaseBurgerActionTypes,
} from "../actions/actionTypes";

export interface IOrdersState {
    orders: IOrderData[]
    loading: boolean
    purchased: boolean
}

const initialState: IOrdersState = {
    loading: false,
    orders: [],
    purchased: false,
};

function purchaseInit(state: IOrdersState) {
    return {
        ...state,
        purchased: false,
    };
}

function purchaseSuccess(action: IPurchaseBurgerSuccessAction, state: IOrdersState) {
    const newOrder: IOrderData = {
        ...action.orderData,
        id: action.orderId,
    };
    return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
    };
}

function purchaseFail(state: IOrdersState) {
    return {
        ...state,
        loading: false,
    };
}

function purchaseStart(state: IOrdersState) {
    return {
        ...state,
        loading: true,
    };
}

function fetchOrdersStart(state: IOrdersState) {
    return {
        ...state,
        loading: true,
    };
}

function fetchOrdersSuccess(state: IOrdersState, action: IFetchOrdersSuccessAction) {
    return {
        ...state,
        orders: action.orders,
        loading: false,
    };
}

function fetchOrdersFail(state: IOrdersState) {
    return {
        ...state,
        loading: false,
    };
}

const orderReducer = (
    state = initialState,
    action: PurchaseBurgerActionTypes | FetchOrdersActionTypes) => {
    switch (action.type) {
        case "PURCHASE_INIT":
            return purchaseInit(state);
        case "PURCHASE_BURGER_SUCCESS":
            return purchaseSuccess(action, state);
        case "PURCHASE_BURGER_FAIL":
            return purchaseFail(state);
        case "PURCHASE_BURGER_START":
            return purchaseStart(state);
        case "FETCH_ORDERS_START":
            return fetchOrdersStart(state);
        case "FETCH_ORDERS_SUCCESS":
            return fetchOrdersSuccess(state, action);
        case "FETCH_ORDERS_FAIL":
            return fetchOrdersFail(state);
        default:
            return state;
    }
};

export default orderReducer;