import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { IAuthData } from "../../containers/Auth/Auth";
import {
    AUTH_FAIL,
    AUTH_INITIATE_LOGOUT,
    AUTH_START,
    AUTH_SUCCESS,
    AuthActionTypes,
} from "./actionTypes";

const authStart = (): AuthActionTypes => {
    return {
        type: AUTH_START,
    };
};

const authSuccess = (authData: IAuthData): AuthActionTypes => {
    return {
        type: AUTH_SUCCESS,
        authData: authData,
    };
};

const authFail = (error: string): AuthActionTypes => {
    return {
        type: AUTH_FAIL,
        error: error,
    };
};

export const logOut = (): AuthActionTypes => {
    return {
        type: AUTH_INITIATE_LOGOUT,
    };
};

export const auth = (
    email: string,
    password: string,
    isSignup: boolean,
    forceError?: boolean): ThunkAction<void, any, unknown, Action> => async dispatch => {

    dispatch(authStart());

    try {
        // const response = await axios.post(
        //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBH9gAK3GofAlUKtqiWYRlBL7Ih_ViOBxQ',
        // authData);

        // simulate post request
        await new Promise(r => setTimeout(r, 500));
        if (forceError) {
            throw new Error("error test");
        }

        const authData = {
            email: email,
            idToken: 'token123ForMail' + email,
            userId: 'userid123',
        };
        localStorage.setItem('token', authData.idToken);
        dispatch(authSuccess(authData));
    } catch (e) {
        dispatch(authFail(e));
    }
};

export const authCheckState = () : ThunkAction<void, any, unknown, Action> => dispatch =>  {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logOut());
    } else {
        // get user data using the token from the backend.
        const authData = {
            email: 'test@test.com',
            idToken: token,
            userId: 'userid123',
        };

        dispatch(authSuccess(authData));
    }
}