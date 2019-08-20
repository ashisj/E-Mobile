import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
/*
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
    devTools = a => a;
}
*/
const middleware = [thunk];

const defaultState = {}

const store = createStore(
    rootReducer,
    defaultState,
    composeWithDevTools(
        applyMiddleware(...middleware)    
    )
)

export default store;