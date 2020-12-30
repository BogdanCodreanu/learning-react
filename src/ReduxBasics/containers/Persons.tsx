import React, { Component } from 'react';
import Person from "../components/Person";
import AddPerson from "../components/AddPerson";
import { connect, createStoreHook, Provider } from "react-redux";
import { IPersonsState } from "../store/reducer";
import { ADD_PERSON, REMOVE_PERSON } from "../store/actions";
import { IPersonDispatchType, IPerson } from "../store/type";

interface IPersonsProps {
    onAddedPerson?: () => void
    onRemovedPerson?: (age: number) => void
    prs: IPerson[]
}

class Persons extends Component<IPersonsProps> {


    render() {
        return (
            <div >
                <AddPerson onClick={this.props.onAddedPerson} />
                {this.props.prs.map((pers: IPerson) => (
                    <Person key={pers.age}
                            person={pers}
                            onClick={() => {
                                if (this.props.onRemovedPerson) {
                                    return this.props.onRemovedPerson(pers.age);
                                }
                            }} />
                ))}
            </div >
        );
    }
}

const mapStateToProps = (state: IPersonsState) => {
    return {
        prs: state.persons,
    };
};

const mapDispatchToProps = (dispatch: IPersonDispatchType) => {
    return {
        onRemovedPerson: (age: number) => dispatch({
            type: REMOVE_PERSON,
            age: age,
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);