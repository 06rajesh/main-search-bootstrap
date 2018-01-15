/**
 * Created by Rajesh on 5/18/17.
 */

import axios from "axios";

let d = [];
let q = null;

export function fetchResults(query, page=1){
    return function(dispatch){
        if(d.length > 0 && query == q)
            return d;

        dispatch({type: "FETCH_RESULTS", payload: query});
        axios.get(`/api/search?query=${query}&page_no=${page}`)
            .then((response) => {
                d = response.data;
                q = query;
                dispatch({type: "REMOVE_ERROR"});
                dispatch({type: "FETCH_RESULTS_FULFILLED", payload: {query: query, queryTime: d.query_time, page: page, total: d.total_result, results: d.results} });
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
