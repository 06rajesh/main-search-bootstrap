const initialState = {
    results : [],
    query: '',
    fetching: false,
    fetched: false,
    error: null
};

export default function reducer(state = initialState, action) {

    switch (action.type){
        case "FETCH_RESULTS":
            state = Object.assign(...state, {fetching: true, fetched: false, query: action.payload});
            return state;
            break;
        case "FETCH_RESULTS_REJECTED":
            state = Object.assign(...state, {fetching: false, error: action.payload});
            return state;
            break;
        case "FETCH_RESULTS_FULFILLED":
            state = Object.assign(
                ...state,
                {
                    fetching: false,
                    fetched: true,
                    query: action.payload.query,
                    results: action.payload.results
                }
            );
            break;
        case "SET_QUERY":
            state = Object.assign(...state, {query: action.payload});
            return state;
            break;
        case "REMOVE_ERROR":
            state = Object.assign(...state, {error: null});
            return state;
            break;
    }

    return state;
}
