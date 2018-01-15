import { combineReducers } from "redux";
import results from "./searchReducer";
import pages from "./pageReducer";
import infoBox from "./infoboxReducer";
import { routerReducer } from 'react-router-redux';
import {responsiveStateReducer} from 'redux-responsive';

export default combineReducers({
    results,
    pages,
    infoBox,
    browser: responsiveStateReducer,
    routing: routerReducer
});

