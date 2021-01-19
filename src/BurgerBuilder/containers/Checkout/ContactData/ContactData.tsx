import React, { Component } from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import instance from '../../../axios-orders';
import { IIngredients } from "../../../components/Burger/Burger";
import Input from "../../../components/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions";
import {
    BurgerCombinedState,
    PurchaseBurgerActionTypes,
} from "../../../store/actions/actionTypes";
import { IOrdersState } from "../../../store/reducers/orderReducer";
import classes from './ContactData.module.css';

interface IContactDataProps extends RouteComponentProps {
    ingredients: IIngredients | null
    price: number | null
    onOrderBurger?: (arg0: IOrderData) => void
    loading: boolean
}

export interface IValidation {
    required: boolean
    valid: boolean
    isEmail?: boolean
    minLength?: number
    touched: boolean
}

export interface IInputElementType {
    elementType: string;
    elementConfig: any;
    value: string;
    validation?: IValidation
}

export interface IInputString extends IInputElementType {
    elementType: 'input';
    elementConfig: {
        type: string;
        placeholder: string;
    }
}

interface IInputSelectType extends IInputElementType {
    elementType: 'select';
    elementConfig: {
        options: { value: string, displayValue: string }[]
    }
}

export const TextElement = (placeholder: string, type: string = 'text'): IInputString => {
    return {
        elementConfig: {
            type: type,
            placeholder: placeholder,
        },
        value: '',
        elementType: "input",
        validation: {
            required: true,
            valid: false,
            touched: false,
        },
    };
};

interface IOrderForm {
    name: IInputString;
    street: IInputString;
    zipCode: IInputString;
    country: IInputString;
    email: IInputString;
    deliveryMethod: IInputSelectType;

    [key: string]: IInputElementType
}

export interface IOrderWithForm {
    price: number;
    ingredients: IIngredients
    orderFormData: IOrderForm
}

export interface IOrderData {
    id?: string
    price: number,
    ingredients: IIngredients,
    orderData: {
        name: string,
        street: string,
        zipCode: string,
        country: string,
        email: string,
        deliveryMethod: string
    }
}

class ContactData extends Component<IContactDataProps> {
    state: { orderForm: IOrderForm, formValid: boolean } = {
        orderForm: {
            name: TextElement('Name'),
            street: TextElement('Street'),
            zipCode: TextElement('Zip Code'),
            country: TextElement('Country'),
            email: TextElement('Your email'),
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest',
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest',
                        },
                    ],
                },
                value: 'cheapest',
            },
        },
        formValid: false,
    };


    orderHandlerButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.orderHandler();
    };

    orderHandler = () => {
        // setLoading(true);
        if (!this.props.ingredients || !this.props.price) {
            return;
        }

        const formData: { [key: string]: IInputElementType } = {};
        for (const orderFormKey in this.state.orderForm) {
            formData[orderFormKey] = this.state.orderForm[orderFormKey];
        }

        const order: IOrderData = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: {
                country: this.state.orderForm.country.value,
                deliveryMethod: this.state.orderForm.deliveryMethod.value,
                email: this.state.orderForm.email.value,
                street: this.state.orderForm.street.value,
                name: this.state.orderForm.name.value,
                zipCode: this.state.orderForm.zipCode.value,
            },
        };
        this.props.onOrderBurger?.(order);
    };

    checkValidity = (value: string, rules: { required: boolean }) => {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    };

    inputChangedHandler = (event: any, inputIdentifier: string) => {
        const updatedForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        if (updatedFormElement.validation) {
            updatedFormElement.validation.valid =
                this.checkValidity(
                    updatedFormElement.value,
                    updatedFormElement.validation);
            updatedFormElement.validation.touched = true;

        }
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (const updatedFormKey in updatedForm) {
            formIsValid =
                (updatedForm[updatedFormKey].validation?.valid ?? true) && formIsValid;
        }
        if (formIsValid !== this.state.formValid) {
            this.setState({ formValid: formIsValid });
        }

        this.setState({ orderForm: updatedForm });
    };

    render() {

        const formElementsArray = [];

        for (const orderFormKey in this.state.orderForm) {
            formElementsArray.push({
                id: orderFormKey,
                config: this.state.orderForm[orderFormKey],
            });
        }

        let form = (
            <form onSubmit={this.orderHandler} >
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           invalid={!(formElement.config.validation?.valid ?? true)}
                           touched={(formElement.config.validation?.touched ?? false)}
                           changed={(event) => this.inputChangedHandler(
                               event,
                               formElement.id)} />
                ))}
                <Button btnType='Success' clicked={this.orderHandlerButton}
                        disabled={!this.state.formValid} >ORDER</Button >
            </form >);
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData} >
                <h4 >Enter your Contact Data</h4 >
                {form}
            </div >
        );
    }
}

const mapStateToProps = (state: BurgerCombinedState) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IOrdersState, void, PurchaseBurgerActionTypes>) => {
    return {
        onOrderBurger: (orderData: IOrderData) => dispatch(purchaseBurger(orderData)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(
    withErrorHandler(ContactData, instance));