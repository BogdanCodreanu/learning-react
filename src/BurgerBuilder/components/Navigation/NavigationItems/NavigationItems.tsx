import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

interface INavigationItemsProps {
    isAuthenticated: boolean
}

const NavigationItems = (props: INavigationItemsProps) => {
    return (
        <ul className={classes.NavigationItems} >
            <NavigationItem link={"/"} exact={true} >Burger Builder</NavigationItem >
            {props.isAuthenticated ? <NavigationItem link={"/orders"} exact={false} >Orders</NavigationItem > : null}
            {!props.isAuthenticated ?
                <NavigationItem link={"/auth"}
                                exact={false} >Authenticate</NavigationItem >
                : <NavigationItem link={"/logout"}
                                  exact={true} >Logout</NavigationItem >}
        </ul >
    );
};

export default NavigationItems;
