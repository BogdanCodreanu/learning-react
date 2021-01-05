import React, { Component } from 'react';
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import AddPerson from "../components/AddPerson";
import Person from "../components/Person";
import { removePerson } from "../store/actions/actions";
import { IPersonsState } from "../store/reducer";
import { IPerson, IPersonsAction } from "../store/type";

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

const mapDispatchToProps = (dispatch: ThunkDispatch<IPersonsState, void, IPersonsAction>) => {
    return {
        onRemovedPerson: (age: number) => dispatch(removePerson(age)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);