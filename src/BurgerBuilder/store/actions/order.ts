import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import instance from "../../axios-orders";
import { IOrderData } from "../../containers/Checkout/ContactData/ContactData";
import { IOrdersState } from "../reducers/orderReducer";
import {
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FetchOrdersActionTypes,
    PurchaseBurgerActionTypes,
} from "./actionTypes";

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


const fetchOrderSuccess = (orders: IOrderData[]): FetchOrdersActionTypes => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};
const fetchOrderFail = (error: string): FetchOrdersActionTypes => {
    return {
        type: FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrdersStart = (): FetchOrdersActionTypes => {
    return {
        type: FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token?: string): ThunkAction<void, IOrdersState, unknown, Action> => async dispatch => {
    try {
        dispatch(fetchOrdersStart());
        if (!token) {
            throw new Error("auth token not valid");
        }
        // with firebase token it would be like this.
        // const ordersData = await instance.get<IOrderData[]>('/orders?token=' + token);

        // fuck this, firebase cors doesn't work anymore
        //         const ordersData = await instance.get<IOrderData[]>('/orders');
        const ordersData: IOrderData[] = [];
        await new Promise(r => setTimeout(r, 500));

        ordersData.push({
            orderData: {
                deliveryMethod: 'fastest',
                country: 'ro',
                email: 'test@test.com',
                name: 'bogc',
                street: 'huedin',
                zipCode: '040',
            },
            id: '1',
            ingredients: {
                meat: 1,
                cheese: 2,
                bacon: 3,
                salad: 4,
            },
            price: 20,
        });
        console.log(ordersData);

        // const fetchedOrders: IOrderData[] = [];
        // for (let dataKey in ordersData.data) {
        //     fetchedOrders.push({
        //         ...ordersData.data[dataKey],
        //         id: dataKey,
        //     });
        // }

        dispatch(fetchOrderSuccess(ordersData));
    } catch (e) {
        dispatch(fetchOrderFail(e));
    }

};

