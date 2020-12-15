import { 
    GET_ALL_ALGORITHM_PARAMETER, 
    GET_ALL_ALGORITHM_PARAMETER_SUCCESS, 
    GET_ALL_ALGORITHM_PARAMETER_ERROR,
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
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default algorithmParameter;