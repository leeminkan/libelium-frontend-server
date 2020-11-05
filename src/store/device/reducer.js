import { GET_DEVICE, GET_DEVICE_SUCCESS, 
    GET_DEVICE_ERROR,
    UPDATE_STATE_DEVICE
} from './actionTypes';

const initialState = {
    errors: null,
    loading: {
        GET_DEVICE: false
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
    showAddFilterModal: false
}

const dataCollection = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEVICE:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_DEVICE: true
                }
            }
            break;
        case GET_DEVICE_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_DEVICE: false
                },
                data: action.payload.data,
                meta: action.payload.meta,
            }
            break;
        case GET_DEVICE_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_DEVICE: false
                }
            };
            break;
        case UPDATE_STATE_DEVICE:
            state = { ...state, ...action.payload };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default dataCollection;