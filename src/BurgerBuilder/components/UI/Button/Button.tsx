import React from 'react';
import classes from "./Button.module.css";

interface IButtonProps {
    clicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: JSX.Element[] | JSX.Element | string
    btnType: string
}

const Button = (props: IButtonProps) => {

    return (
        <button onClick={props.clicked}
                className={[classes.Button, classes[props.btnType]].join(' ')} >
            {props.children}
        </button >
    );
};

export default Button;
