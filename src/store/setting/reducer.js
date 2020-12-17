import { GET_SETTING, GET_SETTING_SUCCESS, GET_SETTING_ERROR, UPDATE_SETTING, UPDATE_SETTING_SUCCESS, UPDATE_SETTING_ERROR } from './actionTypes';

const initialState = {
    errors: null,
    loading: {
        UPDATE_SETTING: false
    },
    data: {
        "window_size": 0,
        "saving_level": 0,
        "time_base": 0
    }
}

const setting = (state = initialState, action) => {
    switch (action.type) {
        case GET_SETTING:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_SETTING: true
                }
            }
            break;
        case UPDATE_SETTING:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    UPDATE_SETTING: true
                }
            }
            break;
        case GET_SETTING_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    GET_SETTING: false
                },
                data: action.payload,
            }
            break;
        case UPDATE_SETTING_SUCCESS:
            state = {
                ...state,
                loading: {
                    ...state.loading,
                    UPDATE_SETTING: false
                },
                data: action.payload,
            }
            break;
        case GET_SETTING_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    GET_SETTING: false
                }
            };
            break;
        case UPDATE_SETTING_ERROR:
            state = { 
                ...state, 
                errors: action.payload,
                loading: {
                    ...state.loading,
                    UPDATE_SETTING: false
                }
            };
            break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default setting;