import { IPersonDispatchType } from "../type";
import { IPersonsState } from "../reducer";

export const ADD_PERSON = 'ADD_PERSON';
export const REMOVE_PERSON = 'REMOVE_PERSON';

export const addPerson = (name: string) => {
    return {
        type: ADD_PERSON,
        name: name,
    };
};

const syncRemovePerson = (age: number) => {
    return {
        type: REMOVE_PERSON,
        age: age,
    };
};
export const removePerson = (age: number) => {
    return (dispatch: IPersonDispatchType, getState: () => IPersonsState) => {
        setTimeout(() => {
            const oldState = getState();
            console.log('old state', oldState);
            dispatch(syncRemovePerson(age));
        }, 2000);
    };
};