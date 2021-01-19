import {
    AuthActionTypes,
    IAuthFailAction,
    IAuthSuccessAction,
} from "../actions/actionTypes";

export interface IAuthReducerState {
    token: string | null;
    userId: string | null;
    error: string | null;
    loading: boolean;
}

const initialState: IAuthReducerState = {
    error: null,
    loading: false,
    token: null,
    userId: null,
};

const authStart = (state: IAuthReducerState) => {
    return {
        ...state,
        loading: true,
        error: null,
    };
};

const authSuccess = (state: IAuthReducerState, action: IAuthSuccessAction) => {
    return {
        ...state,
        userId: action.authData.userId,
        token: action.authData.idToken,
        error: null,
        loading: false,
    };
};

const authFail = (state: IAuthReducerState, action: IAuthFailAction) => {
    return {
        ...state,
        error: action.error,
    };
};

const authLogout = (state: IAuthReducerState) => {
    return {
        ...state,
        token: null,
        userId: null,
    };
};

const orderReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case "AUTH_START":
            return authStart(state);
        case 'AUTH_SUCCESS':
            return authSuccess(state, action);
        case 'AUTH_FAIL':
            return authFail(state, action);
        case "AUTH_LOGOUT":
            return authLogout(state);
        default:
            return state;
    }
};

export default orderReducer;