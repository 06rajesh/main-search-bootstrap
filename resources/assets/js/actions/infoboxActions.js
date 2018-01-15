/**
 * Created by Rajesh on 1/13/18.
 */

import axios from "axios";

 let d = [];
// let q = null;

export function fetchInfobox(query){
    return function(dispatch){
        // if(d.length > 0 && query == q)
        //     return d;

        dispatch({type: "FETCH_INFOBOX", payload: query});
        axios.get(`/api/infobox?query=${query}`)
            .then((response) => {
                 d = response.data;
                // q = query;
                let results = d.results[0];

                dispatch({type: "REMOVE_INFO_ERROR"});
                dispatch({type: "FETCH_INFOBOX_FULFILLED", payload: {query: query, has_infobox: results.has_infobox, results: results.infobox} });
            })

            .catch((err) => {
                dispatch({type: "FETCH_INFOBOX_REJECTED", payload: err});
            })
    }
}

export function setInfoquery(query) {
    return function(dispatch) {
        dispatch({type: "SET_INFO_QUERY", payload: query});
    }
}

export function resetInfoBox() {
    return function(dispatch) {
        dispatch({type: "RESET_INFOBOX"});
    }
}
