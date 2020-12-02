import { 
    GET_DATA_COLLECTION, 
    GET_DATA_COLLECTION_SUCCESS, 
    GET_DATA_COLLECTION_ERROR,
    EXPORT_DATA_COLLECTION, 
    EXPORT_DATA_COLLECTION_SUCCESS, 
    EXPORT_DATA_COLLECTION_ERROR,
    UPDATE_STATE
} from './actionTypes';

const initialState = {
    errors: null,
    loading: {
        GET_DATA_COLLECTION: false
    },
    data: [],
    meta: {
        per_page: 5
    },
    sort: {
        order_by: 'created_at',
        order: 'desc'
    },
    filter: {
    },
    change: 1,
    showAddFilterModal: false,
    showExportModal: false
}

const dataCollection = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_COLLECTION:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_DATA_COLLECTION: true
                }
            }
            break;
        case GET_DATA_COLLECTION_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_DATA_COLLECTION: false
                },
                data: action.payload.data,
                meta: action.payload.meta,
            }
            break;
        case GET_DATA_COLLECTION_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_DATA_COLLECTION: false
                }
            };
            break;
        case EXPORT_DATA_COLLECTION:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    EXPORT_DATA_COLLECTION: true
                }
            }
            break;
        case EXPORT_DATA_COLLECTION_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    EXPORT_DATA_COLLECTION: false
                },
            }
            break;
        case EXPORT_DATA_COLLECTION_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    EXPORT_DATA_COLLECTION: false
                }
            };
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