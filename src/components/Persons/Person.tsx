import React from 'react';
import styled from "styled-components";

interface IPersonProps {

}
interface IPersonProps {
    name: string,
    click: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined,
    age: number,
}

const Person = (props: IPersonProps) => {
    interface StyleProps {
        age: number
    }

    const StyledDiv = styled.div`
          padding: 16px;
          box-shadow: 0 0 4px 1px ${(props: StyleProps) => props.age <
                                                           15 ? "#000000" : "#ff0000"};
          width: 400px;
          margin: 24px auto;
          background-color: lightblue;
          
          &:hover {
            background-color: #efa5a5;
          }
    `;

    return (
        <StyledDiv age={props.age} onClick={props.click}>
            Hello. I Am {props.name}, {props.age} years old.
        </StyledDiv>);
};

export default Person;
