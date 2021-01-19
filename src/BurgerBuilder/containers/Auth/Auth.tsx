import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import Input from "../../components/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { auth } from "../../store/actions";
import { AuthActionTypes, BurgerCombinedState } from "../../store/actions/actionTypes";
import {
    IInputElementType,
    IInputString,
    IValidation,
} from "../Checkout/ContactData/ContactData";
import classes from "./Auth.module.css";

interface ILoginForm {
    email: IInputString
    password: IInputString

    [key: string]: IInputElementType
}

interface IAuthState {
    controls: ILoginForm
    isSignup: boolean
}

export interface IAuthData {
    email: string,
    idToken: string
    userId: string
}

interface IAuthProps {
    onAuth?: (
        email: string,
        password: string,
        isSignup: boolean,
        forceError: boolean) => void
    isLoading?: boolean
    error?: string
    isAuthenticated?: boolean
}

class Auth extends Component<IAuthProps> {
    state: IAuthState = {
        controls: {
            email:
                {
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Mail Address',
                    },
                    value: '',
                    elementType: "input",
                    validation: {
                        required: true,
                        isEmail: true,
                        valid: false,
                        touched: false,
                    },
                },
            password:
                {
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Password',
                    },
                    value: '',
                    elementType: "input",
                    validation: {
                        required: true,
                        minLength: 3,
                        valid: false,
                        touched: false,
                    },
                },
        },
        isSignup: true,
    };
    submitHandler = (event: any) => {
        event.preventDefault();
        this.props.onAuth?.(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup, false);
    };

    private inputChangedHandler(event: any, controlName: string) {
        const updatedControls = {
            ...this.state.controls,
        };
        const updatedFormElement = { ...updatedControls[controlName] };
        updatedFormElement.value = event.target.value;
        if (updatedFormElement.validation) {
            updatedFormElement.validation.valid = this.checkValidity(
                updatedFormElement.value,
                updatedFormElement.validation);
            updatedFormElement.validation.touched = true;
        }
        updatedControls[controlName] = updatedFormElement;
        this.setState({ controls: updatedControls });
    }

    checkValidity = (value: string, rules: IValidation): boolean => {
        if (!rules) {
            return true;
        }
        let isValid = true;


        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = isValid && value.trim().length >= rules.minLength;
        }

        return isValid;
    };

    switchAuthModeHandler = () => {
        this.setState((prevState: IAuthState) => {
            return { isSignup: !prevState.isSignup };
        });
    };

    getErrorHandler = () => {
        this.props.onAuth?.(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup, true);
    };


    render() {

        const formElementsArray = [];

        for (const orderFormKey in this.state.controls) {
            formElementsArray.push({
                id: orderFormKey,
                config: this.state.controls[orderFormKey],
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!(formElement.config.validation?.valid ?? true)}
                   touched={(formElement.config.validation?.touched ?? false)}
                   changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if (this.props.isLoading) {
            form = [<Spinner key='spinner' />];
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p >{this.props.error.toString()}</p >;
        }

        const authRedirect = this.props.isAuthenticated ? (<Redirect to={'/'} />) : null;

        return (
            <div className={classes.Auth} >
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler} >
                    {form}
                    <Button btnType={"Success"} >SUBMIT</Button >
                </form >
                <Button btnType='Danger'
                        clicked={this.switchAuthModeHandler} >{this.state.isSignup ? (<>SWITCH
                    TO SIGNIN</>) : (<>SWITCH TO SIGNUP</>)}</Button >

                <Button btnType='Danger' clicked={this.getErrorHandler} >ERROR
                    TEST</Button >
            </div >
        );
    }
}

const mapStateToProps = (state: BurgerCombinedState) => {
    return {
        isLoading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, void, AuthActionTypes>) => {
    return {
        onAuth: (
            email: string,
            password: string,
            isSignup: boolean,
            forceError: boolean) => dispatch(auth(
            email,
            password,
            isSignup, forceError)),
    };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Auth);