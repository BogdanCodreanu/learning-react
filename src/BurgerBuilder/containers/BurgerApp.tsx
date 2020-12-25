import React, { Component } from 'react';
import Layout from "../hoc/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import { Route } from "react-router";
import Orders from "./Orders/Orders";

class BurgerApp extends Component {
    render() {
        return (
            <div >
                <Layout >
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                </Layout >
            </div >
        );
    }
}

export default BurgerApp;