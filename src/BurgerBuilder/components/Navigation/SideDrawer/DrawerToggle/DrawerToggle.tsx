import React from 'react';
import classes from "./DrawerToggle.module.css";

interface IDrawerToggleProps {
    clicked: () => void;
}

const DrawerToggle = (props: IDrawerToggleProps) => {
    const onClick = () => {
        props.clicked();
    };
    return (
        <div onClick={onClick} className={classes.DrawerToggle} >
            <div/>
            <div/>
            <div/>
        </div >
    );
};

export default DrawerToggle;
