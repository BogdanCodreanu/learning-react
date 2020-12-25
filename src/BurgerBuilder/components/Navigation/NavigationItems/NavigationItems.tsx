import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

interface INavigationItemsProps {

}

const NavigationItems = (props: INavigationItemsProps) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link={"/"} exact={true}>Burger Builder</NavigationItem>
            <NavigationItem link={"/orders"} exact={false}>Orders</NavigationItem>
        </ul>
    );
};

export default NavigationItems;
