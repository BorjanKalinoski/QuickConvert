import {
    FormActionTypes,
    FormType,
    ON_CONVERT_TO_CHANGE,
    ON_URL_CHANGE,
    CHANGE_FORM_TYPE,
    ON_FILE_CHANGE
} from './types';

export function onUrlChange(url: string): FormActionTypes {
    return {
        type: ON_URL_CHANGE,
        url
    };
}

export function onConvertToChange(convertTo: string): FormActionTypes {
    return {
        type: ON_CONVERT_TO_CHANGE,
        convertTo
    };
}

export function onChangeFormType(formType: FormType): FormActionTypes {
    return {
        type: CHANGE_FORM_TYPE,
        formType
    };
}

export function onFileChange(file: any): FormActionTypes {
    return {
        type: ON_FILE_CHANGE,
        file
    }
}

