import React from 'react';

interface ICockpitProps {

}

const Cockpit = (props: ICockpitProps) => {


    const togglePersonsHandler = () => {
        ;
    };
    return (
        <div>
            <h1>React app baby.</h1>
            <p>No class name</p>
            <button onClick={togglePersonsHandler}>Toggle Persons</button>
        </div>
    );
};

export default Cockpit;
