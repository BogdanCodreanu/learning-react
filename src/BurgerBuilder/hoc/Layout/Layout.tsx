import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { BurgerCombinedState } from "../../store/actions/actionTypes";
import classes from "./Layout.module.css";

interface ILayoutState {
    showSideDrawer: boolean
}

interface ILayoutProps {
    isAuthenticated?: boolean
    children?: JSX.Element[] | JSX.Element | string | null;
}

class Layout extends Component<ILayoutProps> {
    state: ILayoutState = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    sideDrawerToggleHandler = () => {
        this.setState((prevState: ILayoutState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <BrowserRouter >
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                         isAuth={this.props.isAuthenticated ?? false} />
                <SideDrawer close={this.sideDrawerClosedHandler}
                            isAuth={this.props.isAuthenticated ?? false}
                            show={this.state.showSideDrawer} />
                <main className={classes.Content} >
                    {this.props.children}
                </main >
            </BrowserRouter >
        );
    }
}

const mapStateToProps = (state: BurgerCombinedState) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
