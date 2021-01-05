import React, { Component } from 'react';
import { connect } from "react-redux";
import { addPerson } from "../store/actions/actions";
import { IPersonDispatchType } from "../store/type";

interface IAddPersonProps {
    onClick: any
    onAddedPerson?: (name: string) => void
}

class AddPerson extends Component<IAddPersonProps> {
    state = {
        name: '',
    };

    nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value,
        });
    };

    render() {
        return (
            <div >
                <input type='text'
                       placeholder='name'
                       onChange={this.nameChangeHandler}
                       value={this.state.name} />
                <button onClick={() => this.props.onAddedPerson?.(this.state.name)} >Add Person</button >
            </div >
        );
    }
}

const mapDispatchToProps = (dispatch: IPersonDispatchType) => {
    return {
        onAddedPerson: (name: string) => dispatch(addPerson(name)),
    };
};

export default connect(null, mapDispatchToProps)(AddPerson);