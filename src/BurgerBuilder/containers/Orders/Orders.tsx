import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import instance from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions";
import {
    BurgerCombinedState,
    FetchOrdersActionTypes,
} from "../../store/actions/actionTypes";
import { IOrdersState } from "../../store/reducers/orderReducer";
import { IOrderData } from "../Checkout/ContactData/ContactData";

interface IOrdersProps {
    onFetchOrders?: (token?: string) => void
    orders?: IOrderData[]
    loading?: boolean
    authToken?: string
}

class Orders extends Component<IOrdersProps> {

    async componentDidMount() {
        this.props.onFetchOrders?.(this.props.authToken);
    }

    render() {
        if (this.props.loading || !this.props.orders) {
            return <Spinner />;
        }
        return (
            <div >
                {this.props.orders.map(order =>
                    <Order key={order.id}
                           ingredients={order.ingredients}
                           price={order.price} />,
                )}
            </div >
        );
    }
}

const mapStateToProps = (state: BurgerCombinedState) => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        authToken: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IOrdersState, void, FetchOrdersActionTypes>) => {
    return {
        onFetchOrders: (token?: string) => dispatch(fetchOrders(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(
    withErrorHandler(Orders, instance));