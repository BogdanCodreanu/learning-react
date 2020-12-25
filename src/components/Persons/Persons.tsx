import React, { useState } from "react";
import styled from 'styled-components';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Person from "./Person";

const Persons = () => {
    const [persons, setPersons] = useState([
        {
            name: "Max",
            age: 16,
        }, {
            name: "Bogdan",
            age: 9,
        }, {
            name: "Maria",
            age: 10,
        },
    ]);

    const deletePersonHandler = (index: number) => {
        const persList = [...persons];
        persList.splice(index, 1);
        setPersons(persList);
    };


    const personsPrint = persons.map((value, index) => {
        const onClicked = () => deletePersonHandler(index);
        return (
            <ErrorBoundary key={value.name}>
                <Person name={value.name}
                        age={value.age}
                        click={onClicked}
                />
            </ErrorBoundary>);
    });

    return (
        <div>
            {personsPrint}
        </div>
    );
};

export default Persons;