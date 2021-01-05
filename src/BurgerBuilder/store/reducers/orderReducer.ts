import { IOrderData } from "../../containers/Checkout/ContactData/ContactData";
import { PurchaseBurgerActionTypes } from "../actions/actionTypes";

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

const orderReducer = (state = initialState, action: PurchaseBurgerActionTypes) => {
    switch (action.type) {
        case "PURCHASE_INIT":
            return {
                ...state,
                purchased: false,
            };
        case "PURCHASE_BURGER_SUCCESS":
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
        case "PURCHASE_BURGER_FAIL":
            return {
                ...state,
                loading: false,
            };
        case "PURCHASE_BURGER_START":
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default orderReducer;