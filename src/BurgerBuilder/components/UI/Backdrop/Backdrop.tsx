import React from 'react';
import classes from "./Backdrop.module.css";

interface IBackdropProps {
    show: boolean
    onClick: () => void
}

const Backdrop = (props: IBackdropProps) => {
    const onClick = () => props.onClick();

    return props.show ? <div className={classes.Backdrop} onClick={onClick} /> : null;
};

export default Backdrop;
