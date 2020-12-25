import React from 'react';

interface ICharComponentProps {
    onClick: ((char: string) => void);
    charRepresented: string,
}


const CharComponent = (props: ICharComponentProps) => {


    function onClickHandler() {
        props.onClick(props.charRepresented);
    }

    return (
        <div style={{
            display: 'inline-block',
            padding: '16px',
            textAlign: 'center',
            margin: '16px',
            border: '1px solid black',
        }} onClick={onClickHandler}>
            char: {props.charRepresented}
        </div>
    );
};

export default CharComponent;
