import React from 'react';
import classes from "./BuildControl.module.css";

interface IBuildControlProps {
    ingredientAdded?: () => void
    ingredientRemoved?: () => void
    label: string;
    disabled: boolean
}

const BuildControl = (props: IBuildControlProps) => {
    const onClickMoreHandler = () => {
        props.ingredientAdded?.();
    };

    const onClickRemoveHandler = () => {
        props.ingredientRemoved?.();
    };

    return (
        <div className={classes.BuildControl} >
            <div className={classes.Label} >{props.label}</div >
            <button className={classes.Less}
                    disabled={props.disabled}
                    onClick={onClickRemoveHandler} >Less
            </button >
            <button className={classes.More} onClick={onClickMoreHandler} >More</button >
        </div >
    );
};

export default BuildControl;
