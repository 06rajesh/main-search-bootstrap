/**
 * Created by Rajesh on 1/13/18.
 */

const initialState = {
    results : null,
    has_knowledge_graph: false,
    query: '',
    title: '',
    url: null,
    fetching: false,
    fetched: false,
    error: null
};

export default function reducer(state = initialState, action) {

    switch (action.type){
        case "FETCH_INFOBOX":
            return {
                ...state,
                fetching: true,
                fetched: false,
                query: action.payload
            };

        case "FETCH_INFOBOX_REJECTED":
            return {
                ...state,
                fetching: false,
                error: action.payload,
                results: null
            };

        case "FETCH_INFOBOX_FULFILLED":
            return {
                ...state,
                results: action.payload.results,
                has_knowledge_graph: action.payload.has_infobox,
                query: action.payload.query,
                title: action.payload.title,
                url: action.payload.url,
                fetching: false,
                fetched: true
            };

        case "SET_INFO_QUERY":
            return {
                ...state,
                 query: action.payload
            };

        case "RESET_INFOBOX":
            return {
                ...state,
                results : null,
                has_knowledge_graph: false,
                query: '',
                title: '',                
                url: null,
                fetching: false,
                fetched: false
            };

        case "REMOVE_INFO_ERROR":
            return {
                ...state,
                error: null
            };

        default:
            return state
    }
}

