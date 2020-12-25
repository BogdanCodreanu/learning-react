import React from "react";
import './UserInput.css';

interface IInputProps {
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
    username: string
}

const UserInput = (props: IInputProps) => {
    return (
        <input className={"UserInput"}
               type="text"
               onChange={props.onChange}
               value={props.username}/>
    );
};

export default UserInput;