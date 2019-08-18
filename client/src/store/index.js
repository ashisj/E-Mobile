import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import rootReducer from "./reducers";

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

const middleware = [thunk];

const defaultState = {}

console.log(devTools);

const store = createStore(
    rootReducer,
    defaultState,
    compose(
        applyMiddleware(...middleware),
        devTools    
    )
)

export default store;