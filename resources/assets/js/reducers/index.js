import { combineReducers } from "redux";
import results from "./searchReducer";
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    results,
    routing: routerReducer
});
