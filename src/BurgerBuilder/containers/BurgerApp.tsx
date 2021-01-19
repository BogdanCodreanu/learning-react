import React, { Component, lazy, Suspense } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import Layout from "../hoc/Layout/Layout";
import { authCheckState } from "../store/actions";
import { AuthActionTypes, BurgerCombinedState } from "../store/actions/actionTypes";
import Auth from './Auth/Auth';
import Logout from "./Auth/Logout/Logout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";

const Orders = lazy(() => import('./Orders/Orders'))

interface IBurgerAppProps {
    onTryAutoSignup?: () => void
    isAuthenticated?: boolean
}

class BurgerApp extends Component<IBurgerAppProps> {
    componentDidMount() {
        this.props.onTryAutoSignup?.();
    }

    render() {
        let routes = (
            <Switch >
                <Route path='/' exact component={BurgerBuilder} />
                <Route path='/auth' component={Auth} />
                <Redirect to={'/'} />
            </Switch >
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch >
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' render={() => (
                        <Suspense fallback={<div>Loading component</div>}>
                            <Orders />
                        </Suspense>
                    )} />
                    <Route path='/auth' component={Auth} />
                    <Route path='/logout' component={Logout} />
                    <Redirect to={'/'} />
                </Switch >);
        }

        return (
            <div >
                <Layout >
                    {routes}
                </Layout >
            </div >
        );
    }
}

const mapStateToProps = (state: BurgerCombinedState) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, AuthActionTypes>) => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerApp);