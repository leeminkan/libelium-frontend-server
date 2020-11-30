import { GET_DISPLAYED_DEVICES, GET_DISPLAYED_DEVICES_SUCCESS, GET_DISPLAYED_DEVICES_ERROR, RESET_DASHBOARD} from './actionTypes';

const initialState = {
    errors: null,
    loading: false,
    devicesData: []
}

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case GET_DISPLAYED_DEVICES:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_DISPLAYED_DEVICES_SUCCESS:
            state = {
                ...state,
                loading: false,
                devicesData: action.payload
            }
            break;
        case GET_DISPLAYED_DEVICES_ERROR:
            state = { ...state, errors: action.payload, loading: false };
            break;
        case RESET_DASHBOARD:
            state = initialState;
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default dashboard;