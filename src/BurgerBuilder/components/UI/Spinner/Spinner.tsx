import React from 'react';
import classes from "./Spinner.module.css";

interface ISpinnerProps {

}

const Spinner = (props: ISpinnerProps) => {
    return (
        <div className={classes.Loader}>
            Loading...
        </div >
    );
};

export default Spinner;
