import { combineReducers } from "redux";
import results from "./searchReducer";
import pages from "./pageReducer";
import { routerReducer } from 'react-router-redux';
import {responsiveStateReducer} from 'redux-responsive';

export default combineReducers({
    results,
    pages,
    browser: responsiveStateReducer,
    routing: routerReducer
});
