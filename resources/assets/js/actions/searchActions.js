/**
 * Created by Rajesh on 5/18/17.
 */

import axios from "axios";

let d = [];
let q = null;

export function fetchResults(query){
    return function(dispatch){
        if(d.length > 0 && query == q)
            return d;

        console.log("Sending New Request......");

        axios.get(`/api/search?query=${query}`)
            .then((response) => {
                d = response.data;
                q = query;
                dispatch({type: "REMOVE_ERROR"});
                dispatch({type: "FETCH_RESULTS_FULFILLED", payload: {query: query, results: response.data.results} });
            })
            .catch((err) => {
                dispatch({type: "FETCH_RESULTS_REJECTED", payload: err});
            })
    }
}

export function setQuery(query) {
    return function(dispatch) {
        dispatch({type: "SET_QUERY", payload: query});
    }
}
