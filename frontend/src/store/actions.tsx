import {AppState, FormState, FormType, types} from './types';

export function changeFormType(formType: FormType) {
    return {
        type: types.CHANGE_FORM_TYPE,
        payload: formType
    }
}


