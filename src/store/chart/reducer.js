import { GET_TEMPERATURE, GET_TEMPERATURE_SUCCESS, GET_TEMPERATURE_ERROR} from './actionTypes';

const initialState = {
    errors: null,
    loading: false,
    data: []
}

const chart = (state = initialState, action) => {
    switch (action.type) {
        case GET_TEMPERATURE:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_TEMPERATURE_SUCCESS:
            state = {
                ...state,
                loading: false,
                data: action.payload
            }
            break;
        case GET_TEMPERATURE_ERROR:
            state = { ...state, errors: action.payload, loading: false };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default chart;