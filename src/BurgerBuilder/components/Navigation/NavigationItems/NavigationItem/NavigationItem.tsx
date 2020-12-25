import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

interface INavigationItemProps {
    children?: JSX.Element[] | JSX.Element | string;
    link: string;
    exact: boolean
}

const NavigationItem = (props: INavigationItemProps) => {
    return (
        <li className={classes.NavigationItem} >
            <NavLink activeClassName={classes.AActive}
                     to={props.link}
                     exact={props.exact} >{props.children}</NavLink >
        </li >
    );
};

export default NavigationItem;
