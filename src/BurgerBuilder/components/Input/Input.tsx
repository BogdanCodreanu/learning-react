import React, { ChangeEventHandler, EventHandler } from 'react';
import classes from "./Input.module.css";

interface IInputProps {
    invalid: boolean;
    label?: string
    elementType: string
    elementConfig: any
    value: string
    changed: (ev: any) => void
    touched: boolean
}

const Input = (props: IInputProps) => {
    let inputElement = null;
    const inputClasses: string[] = [classes.InputElement];

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement =
                <input className={inputClasses.join(' ')} {...(props.elementConfig)}
                       value={props.value}
                       onChange={props.changed} />;
            break;
        case 'textarea':
            inputElement =
                <textarea className={inputClasses.join(' ')} {...(props.elementConfig)}
                          value={props.value}
                          onChange={props.changed} />;
            break;
        case 'select':
            inputElement =
                (
                    <select className={inputClasses.join(' ')}
                            value={props.value}
                            onChange={props.changed} >
                        {props.elementConfig.options.map((option: { value: string, displayValue: string }) => (
                            <option key={option.value} value={option.value} >
                                {option.displayValue}
                            </option >
                        ))}
                    </select >);
            break;
        default:
            inputElement =
                <input className={classes.InputElement} {...(props.elementConfig)}
                       value={props.value} />;

    }

    return (
        <div className={classes.Input} >
            <label className={classes.Label} >{props.label}</label >
            {inputElement}
        </div >
    );
};

export default Input;