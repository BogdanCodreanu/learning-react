import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from "axios";

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {

    return class extends Component {
        state: { error: Error | null } = {
            error: null,
        };


        componentWillMount() {
            axios.interceptors.request.use(value => {
                this.setState({ error: null });
                return value;
            });

            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        modalClosed = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <>
                    <Modal show={this.state.error !== null}
                           modalClosed={this.modalClosed} >
                        {this.state.error?.message ?? 'Something went wrong'}
                    </Modal >
                    <WrappedComponent {...this.props} />
                </>);
        }
    };
};

export default withErrorHandler;
