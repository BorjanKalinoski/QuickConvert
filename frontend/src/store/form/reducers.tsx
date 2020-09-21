import {actions, FormActionTypes, FormState, FormType} from './types';
import {Reducer} from "redux";

const initialState: FormState = {
    formType: FormType.NONE,
    convertTo: 'Convert To',
    file: '',
    url: ''
};

const formReducer: Reducer<FormState, FormActionTypes> = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        case actions.CHANGE_FORM_TYPE:
            return {
                ...state,
                formType: action.formType
            };
        case actions.ON_URL_CHANGE:
            return {
                ...state,
                url: action.url
            };
        case actions.ON_CONVERT_TO_CHANGE:
            return {
                ...state,
                convertTo: action.convertTo
            };
        case actions.ON_FILE_CHANGE:
            return {
                ...state,
                file: action.file
            }
    }
    return state;
};

export default formReducer;
