import React, { useState } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import { IIngredients } from "../../../components/Burger/Burger";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { RouteComponentProps } from "react-router";
import instance from '../../../axios-orders';

interface IContactDataProps extends RouteComponentProps {
    ingredients: IIngredients
    price: number
}

const ContactData = (props: IContactDataProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const orderHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setLoading(true);

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            customer: {
                name: 'Max',
            },
            deliveryMethod: 'fastest',
        };
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

    let form = (
        <form >
            <input type='text' name='name' placeholder='John Doe' />
            <input type='email' name='email' placeholder='john.doe@mail.com' />
            <input type='text' name='street' placeholder='street 4' />
            <input type='text' name='postal' placeholder='123456' />
            <Button btnType='Success' clicked={orderHandler} >ORDER</Button >
        </form >);
    // if (loading) {
    //     form = <Spinner />;
    // }

    return (
        <div className={classes.ContactData} >
            <h4 >Enter your Contact Data</h4 >
            {form}
        </div >
    );
};

export default ContactData;