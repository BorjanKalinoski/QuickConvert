import {FormActionTypes, ON_CONVERT_TO_CHANGE, ON_URL_CHANGE, CHANGE_FORM_TYPE, FormType} from './types';


export function onUrlChange(url: string): FormActionTypes {
    return {
        type: ON_URL_CHANGE,
        url
    };
}

export function onConverToChange(convertTo: string): FormActionTypes {
    return {
        type: ON_CONVERT_TO_CHANGE,
        convertTo
    };
}

export function onChangeFormType(formType: FormType) {
    return {
        type: CHANGE_FORM_TYPE,
        formType
    };
}

