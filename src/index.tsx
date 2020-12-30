import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { createStoreHook, Provider } from "react-redux";
import { createStore } from 'redux';
import burgerIngredientsReducer from "./BurgerBuilder/store/burgerIngredientsReducer";
import reducer from "./ReduxBasics/store/reducer";
import { applyMiddleware } from 'redux';
import { MiddlewareAPI } from 'redux';

axios.interceptors.request.use((request) => {
    return request;
}, error => {
    console.error('HANDLED ERROR REQUEST !!', error);
    return Promise.reject(error);
});

axios.interceptors.response.use((request) => {
    return request;
}, error => {
    console.error('HANDLED ERROR RESPONSE !!', error);
    return Promise.reject(error);
});

// const store = createStore(burgerIngredientsReducer);

const logger = (store: MiddlewareAPI<any, S>) => {
    return (next: (arg0: any) => any) => {
        return (action: any) => {
            const result = next(action)
            console.log('incoming result');
            return result;
        };
    };
};
const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store} >
        <React.StrictMode >
            <App />
        </React.StrictMode >
    </Provider >,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
