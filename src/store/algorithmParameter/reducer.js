import { 
    GET_ALL_ALGORITHM_PARAMETER, 
    GET_ALL_ALGORITHM_PARAMETER_SUCCESS, 
    GET_ALL_ALGORITHM_PARAMETER_ERROR,
    ADD_ALGORITHM_PARAMETER, 
    ADD_ALGORITHM_PARAMETER_SUCCESS, 
    ADD_ALGORITHM_PARAMETER_ERROR,
} from './actionTypes';

const initialState = {
    errors: null,
    loading: {
        GET_ALL_ALGORITHM_PARAMETER: false,
    },
    data: [],
}

const algorithmParameter = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ALGORITHM_PARAMETER:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_ALL_ALGORITHM_PARAMETER: true
                }
            }
            break;
        case GET_ALL_ALGORITHM_PARAMETER_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_ALL_ALGORITHM_PARAMETER: false
                },
                data: action.payload,
            }
            break;
        case GET_ALL_ALGORITHM_PARAMETER_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_ALL_ALGORITHM_PARAMETER: false
                }
            };
            break;
        case ADD_ALGORITHM_PARAMETER:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    [`ADD_ALGORITHM_PARAMETER_${action.payload.waspmote_id}`]: true
                }
            }
            break;
        case ADD_ALGORITHM_PARAMETER_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    [`ADD_ALGORITHM_PARAMETER_${action.payload.waspmote_id}`]: false
                },
                data: state.data.map(item => {
                    if (item.waspmote_id === action.payload.waspmote_id) return action.payload.data;
                    return item;
                })
            }
            break;
        case ADD_ALGORITHM_PARAMETER_ERROR:
            state = { 
                ...state, 
                errors: action.payload.errors,
                loading: {
                    ...state.loading,
                    [`ADD_ALGORITHM_PARAMETER_${action.payload.waspmote_id}`]: false
                }
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default algorithmParameter;