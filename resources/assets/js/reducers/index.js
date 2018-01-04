import { combineReducers } from "redux";
import results from "./searchReducer";
import { routerReducer } from 'react-router-redux';
import {responsiveStateReducer} from 'redux-responsive';

export default combineReducers({
    results,
    browser: responsiveStateReducer,
    routing: routerReducer
});
