import React from 'react';

interface IValidationComponentProps {
    textLength: number
}

const ValidationComponent = (props: IValidationComponentProps) => {


    return (
        <div>
            {props.textLength < 5 ? <p>Text too short !</p> :
                props.textLength > 10 ? <p>Text too long !</p> :
                    <p>Text is nice.</p>}
        </div>
    );
};


export default ValidationComponent;
