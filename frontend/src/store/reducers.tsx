import {AppState, types} from './types';

const initialState: AppState = {
    convertTo: null,
    file: '',
    formType: null,
    url: ''
};

export function AppReducer(
    state = initialState,
    action: any
): AppState {
    switch (action.type) {
        case types.CHANGE_FORM_TYPE:
            return {
                ...state,
                formType: action.payload
            };
        case types.ON_URL_CHANGE:
            return {
                ...state,
                url: action.payload
            };
        case types.ON_CONVERT_TO_CHANGE:
            return {
                ...state,
                convertTo: action.payload
            };
    }
    return state;
}