import React, { Component } from 'react';
import instance from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { IOrderData } from "../Checkout/ContactData/ContactData";

class Orders extends Component {
    state: { orders: IOrderData[], loading: boolean } = {
        orders: [],
        loading: true,
    };

    async componentDidMount() {

        try {
            const ordersData = await instance.get<IOrderData[]>('/orders.json');
            console.log(ordersData);
            const fetchedOrders = [];
            for (let dataKey in ordersData.data) {
                fetchedOrders.push({
                    ...ordersData.data[dataKey],
                    id: dataKey,
                });
            }
            this.setState({
                loading: false,
                orders: fetchedOrders,
            });
        } catch (e) {
            console.log('fetching orders failed', e);
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div >
                {this.state.orders.map(order =>
                    <Order key={order.id}
                           ingredients={order.ingredients}
                           price={order.price} />,
                )}
            </div >
        );
    }
}

export default withErrorHandler(Orders, instance);