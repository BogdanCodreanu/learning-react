import { ADD_PERSON, REMOVE_PERSON } from "./actions/actions";
import { IPerson, IPersonsAction } from "./type";

export interface IPersonsState {
    persons: IPerson[]
}

const initialState: IPersonsState = {
    persons: [],
};

const reducer = (state = initialState, action: IPersonsAction) => {
    switch (action.type) {
        case ADD_PERSON:
            console.log("adding person");
            return {
                ...state,
                persons: state.persons.concat({
                    age: Math.random() * 10,
                    name: action.name,
                }),
            };
        case REMOVE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(pers => pers.age !== action.age)
            };
    }
    return state;
};

export default reducer;