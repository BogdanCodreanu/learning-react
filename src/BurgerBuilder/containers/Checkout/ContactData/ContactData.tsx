import React, { useState } from 'react';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import instance from '../../../axios-orders';
import { IIngredients } from "../../../components/Burger/Burger";
import Input from "../../../components/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { IBurgerIngredientsState } from "../../../store/reducers/burgerBuilder";
import classes from './ContactData.module.css';

interface IContactDataProps extends RouteComponentProps {
    ingredients: IIngredients | null
    price: number | null
}

interface IInputElementType {
    elementType: string;
    elementConfig: any;
    value: string;
    validation?: {
        required: boolean
        valid: boolean
        touched: boolean
    }
}


interface IInputString extends IInputElementType {
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

const TextElement = (placeholder: string): IInputString => {
    return {
        elementConfig: {
            type: 'text',
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

const ContactData = (props: IContactDataProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [orderForm, setOrderForm] = useState<IOrderForm>({
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
    });
    const [formValid, setFormValid] = useState<boolean>(false);


    const orderHandlerButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        orderHandler();
    };

    const orderHandler = () => {
        setLoading(true);

        const formData: { [key: string]: IInputElementType } = {};
        for (const orderFormKey in orderForm) {
            formData[orderFormKey] = orderForm[orderFormKey];
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
        };

        console.log(order);
        // new Promise(resolve => setTimeout(resolve, 500)).then(res => {
        //     setLoading(false);
        // });
        instance.post('/orders.json', order)
            .then(response => {
                console.log('Order sent', response);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                throw e;
            });

    };

    const formElementsArray = [];

    for (const orderFormKey in orderForm) {
        formElementsArray.push({
            id: orderFormKey,
            config: orderForm[orderFormKey],
        });
    }

    const checkValidity = (value: string, rules: { required: boolean }) => {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    };

    const inputChangedHandler = (event: any, inputIdentifier: string) => {
        const updatedForm = { ...orderForm };
        const updatedFormElement = { ...updatedForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        if (updatedFormElement.validation) {
            updatedFormElement.validation.valid =
                checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.validation.touched = true;

        }
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (const updatedFormKey in updatedForm) {
            formIsValid =
                (updatedForm[updatedFormKey].validation?.valid ?? true) && formIsValid;
        }
        if (formIsValid !== formValid) {
            setFormValid(formIsValid);
        }

        setOrderForm(updatedForm);
    };

    let form = (
        <form onSubmit={orderHandler} >
            {formElementsArray.map(formElement => (
                <Input key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid={!(formElement.config.validation?.valid ?? true)}
                       touched={(formElement.config.validation?.touched ?? false)}
                       changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType='Success' clicked={orderHandlerButton}
                    disabled={!formValid} >ORDER</Button >
        </form >);
    if (loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData} >
            <h4 >Enter your Contact Data</h4 >
            {form}
        </div >
    );
};

const mapStateToProps = (state: IBurgerIngredientsState) => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
    };
};

export default connect(mapStateToProps)(ContactData);