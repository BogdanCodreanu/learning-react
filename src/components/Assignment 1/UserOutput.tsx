import React from "react";

interface IOutputProps {
    username: string
}

const UserOutput = (props: IOutputProps) => {
    return (
        <p style={{border: "2px solid #fff00f"}}>{props.username}: testf</p>
    );
}

export default UserOutput;