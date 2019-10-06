import {FormActionTypes, FormState, FormType} from './types';
import {Reducer} from "redux";

const initialState: FormState = {
    formType: FormType.NONE,
    convertTo: '',
    file: '',
    url: ''
};

const formReducer: Reducer<FormState, FormActionTypes> = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        case "CHANGE_FORM_TYPE":
            return {
                ...state,
                formType: action.formType
            };
        case "ON_URL_CHANGE":
            return {
                ...state,
                url: action.url
            };
        case "ON_CONVERT_TO_CHANGE":
            return {
                ...state,
                convertTo: action.convertTo
            };
    }
    return state;
};
export default formReducer;
