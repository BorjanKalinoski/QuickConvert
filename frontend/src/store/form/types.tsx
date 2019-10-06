export enum FormType {
    BASIC = 'BASIC',
    YOUTUBE = 'YOUTUBE',
    NONE = ''
}
export interface FormState {
    url: string;
    convertTo: string;
    formType: FormType;
    file: string;
}

export const CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';
export const ON_URL_CHANGE = 'ON_URL_CHANGE';
export const ON_CONVERT_TO_CHANGE = 'ON_CONVERT_TO_CHANGE';

interface ChangeFormTypeAction {
    type: typeof CHANGE_FORM_TYPE;
    formType: FormType;
}

interface OnUrlChangeAction {
    type: typeof ON_URL_CHANGE;
    url: string;
}

interface OnConvertToChangeAction {
    type: typeof ON_CONVERT_TO_CHANGE;
    convertTo: string;
}

export type FormActionTypes = ChangeFormTypeAction | OnUrlChangeAction | OnConvertToChangeAction;