import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

interface ILayoutState {
    showSideDrawer: boolean
}

class Layout extends Component {
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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer close={this.sideDrawerClosedHandler}
                            show={this.state.showSideDrawer} />
                <main className={classes.Content} >
                    {this.props.children}
                </main >
            </BrowserRouter >
        );
    }
}

export default Layout;
