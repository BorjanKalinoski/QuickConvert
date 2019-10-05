export enum types {
    CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE',
    ON_URL_CHANGE = 'ON_URL_CHANGE',
    ON_CONVERT_TO_CHANGE = 'ON_CONVERT_TO_CHANGE'
}

export interface FormState {
    url: string;
    convertTo: string;
    formType: FormType;
    file: string;
}

export enum FormType {
    BASIC = 'BASIC',
    YOUTUBE = 'YOUTUBE'
}

export type AppState = FormState;
