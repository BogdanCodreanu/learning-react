import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { logOut } from '../../../store/actions';
import { AuthActionTypes } from "../../../store/actions/actionTypes";


interface ILogoutProps {
    onLogout?: () => void
}

class Logout extends Component<ILogoutProps> {
    componentDidMount() {
        this.props.onLogout?.();
    }

    render() {
        return (
            <Redirect to={'/'} />
        );
    }
}

const mapDispatchTOProps = (dispatch: ThunkDispatch<any, void, AuthActionTypes>) => {
    return {
        onLogout: () => dispatch(logOut()),
    }
}

export default connect(null, mapDispatchTOProps)(Logout);