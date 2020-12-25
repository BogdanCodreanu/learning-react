import React, { Component } from 'react';
import Order from "../../components/Order/Order";
import instance from "../../axios-orders";
import { IIngredients } from "../../components/Burger/Burger";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

interface IOrder {
    id: number
    customer: any,
    ingredients: IIngredients,
    price: number,
    deliveryMethod: string
}

class Orders extends Component {
    state: { orders: IOrder[], loading: boolean } = {
        orders: [],
        loading: true,
    };

    async componentDidMount() {

        try {
            const ordersData = await instance.get<IOrder[]>('/orders.json');
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