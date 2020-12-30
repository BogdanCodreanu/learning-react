import React from 'react';
import { IPerson } from '../store/type';
import classes from "./Person.module.css";

interface IPersonProps {
    person: IPerson,
    onClick: any
}

const Person = (props: IPersonProps) => {
    return (
        <div className={classes.Person} onClick={props.onClick}>
            <h1>{props.person.name}</h1>
            Is of age: {props.person.age}
        </div >
    );
};

export default Person;
