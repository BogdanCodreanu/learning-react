import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "./BurgerBuilder/store/reducers/authReducer";
import burgerBuilderReducer from "./BurgerBuilder/store/reducers/burgerBuilderReducer";
import orderReducer from "./BurgerBuilder/store/reducers/orderReducer";
import { watchAuth } from "./BurgerBuilder/store/sagas";
import { logoutSaga } from "./BurgerBuilder/store/sagas/auth";
import App from './containers/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import createSagaMiddleware from 'redux-saga';

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
let composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose ||
                       compose;

if (process.env.NODE_ENV !== "development") {
    composeEnhancers = compose;
}

const rootBurgerReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

// burger builder store
const store = createStore(
    rootBurgerReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);

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
