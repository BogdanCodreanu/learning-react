import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

interface ISideDrawerProps {
    show: boolean;
    close: () => void;
}

const SideDrawer = (props: ISideDrawerProps) => {
    let attachedClasses = [classes.SideDrawer, classes.Closed];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <>
            <Backdrop show={props.show} onClick={props.close} />
            <div className={attachedClasses.join(' ')} >
                <div className={classes.Logo} >
                    <Logo />
                </div >
                <nav >
                    <NavigationItems />
                </nav >
            </div >
        </>
    );
};

export default SideDrawer;
