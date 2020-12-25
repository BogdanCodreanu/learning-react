import React, { useState } from "react";
import UserInput from "./UserInput";
import UserOutput from "./UserOutput";

const Assignment = () => {
    const [username, setUsername] = useState("default");

    const OnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    return (
        <div>
            <UserInput onChange={OnInputChange} username={username} />
            <UserOutput username={username} />
        </div>
    );
}

export default Assignment;