import React from 'react';
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";

import classes from "./SideDrawer.module.css";

interface ISideDrawerProps {
    show: boolean;
    close: () => void;
    isAuth: boolean;
}

const SideDrawer = (props: ISideDrawerProps) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <>
            <Backdrop show={props.show} onClick={props.close} />
            <div className={attachedClasses.join(' ')} onClick={props.close}>
                <div className={classes.Logo} >
                    <Logo />
                </div >
                <nav >
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav >
            </div >
        </>
    );
};

export default SideDrawer;
