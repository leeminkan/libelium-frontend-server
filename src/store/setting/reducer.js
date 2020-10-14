import { GET_SETTING, GET_SETTING_SUCCESS, GET_SETTING_ERROR, UPDATE_SETTING, UPDATE_SETTING_SUCCESS, UPDATE_SETTING_ERROR } from './actionTypes';

const initialState = {
    errors: null,
    loading: false,
    data: {
        "window_size": 0,
        "saving_level": 0,
        "time_base": 0
    }
}

const setting = (state = initialState, action) => {
    switch (action.type) {
        case GET_SETTING:
        case UPDATE_SETTING:
            state = {
                ...state,
                loading: true
            }
            break;
        case GET_SETTING_SUCCESS:
        case UPDATE_SETTING_SUCCESS:
            state = {
                ...state,
                loading: false,
                data: action.payload,
            }
            break;
        case GET_SETTING_ERROR:
        case UPDATE_SETTING_ERROR:
            state = { ...state, errors: action.payload, loading: false };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default setting;