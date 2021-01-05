import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from "./BurgerBuilder/store/reducers/burgerBuilder";
import App from './containers/App';
import './index.css';
import reportWebVitals from './reportWebVitals';

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


// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose ||
                         compose;


// burger builder store
const store = createStore(burgerBuilderReducer, composeEnhancers(applyMiddleware(thunk)));


// const logger: Middleware<{}, IPersonsState> = store => next => action => {
//     const result = next(action);
//     console.log('incoming result');
//     return result;
// };
// const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

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
