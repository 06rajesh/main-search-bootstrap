const initialState = {
    results : [],
    total: 0,
    queryTime: 0,
    page: 1,
    query: '',
    prevQuery: '',
    fetching: false,
    fetched: false,
    error: null
};

export default function reducer(state = initialState, action) {

    switch (action.type){
        case "FETCH_RESULTS":
            return {
                ...state,
                fetching: true, fetched: false, query: action.payload
            };

        case "FETCH_RESULTS_REJECTED":
            return {
                ...state,
                fetching: false, error: action.payload, page: 1, total: 0, results: []
            };

        case "FETCH_RESULTS_FULFILLED":
            return {
                ...state,
                fetching: false,
                fetched: true,
                query: action.payload.query,
                total: action.payload.total,
                page: action.payload.page,
                queryTime: action.payload.queryTime,
                results: action.payload.results
            };

        case "SET_QUERY":
            return {
                ...state,
                query: action.payload
            };

        case "SET_PREV_QUERY":
            return{
                ...state,
                prevQuery: action.payload
            };

        case "REMOVE_ERROR":
            return {
                ...state,
                error: null
            };

        default:
            return state
    }
}
