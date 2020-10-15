import { GET_DATA_COLLECTION, GET_DATA_COLLECTION_SUCCESS, 
    GET_DATA_COLLECTION_ERROR,
    UPDATE_STATE
} from './actionTypes';

const initialState = {
    errors: null,
    loading: false,
    data: [],
    meta: {
        per_page: 2
    },
    sort: {
        order_by: 'created_at',
        order: 'desc'
    }
}

const dataCollection = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_COLLECTION:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_DATA_COLLECTION_SUCCESS:
            state = {
                ...state,
                loading: false,
                data: action.payload.data,
                meta: action.payload.meta,
            }
            break;
        case GET_DATA_COLLECTION_ERROR:
            state = { ...state, errors: action.payload, loading: false };
            break;
        case UPDATE_STATE:
            state = { ...state, ...action.payload };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default dataCollection;