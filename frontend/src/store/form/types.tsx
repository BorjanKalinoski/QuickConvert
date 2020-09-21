export enum FormType {
    BASIC = 'BASIC',
    YOUTUBE = 'YOUTUBE',
    NONE = 'NONE'
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
export const ON_FILE_CHANGE = 'ON_FILE_CHANGE';
export const CONVERT_TO_AUDIO_EXTENSIONS = ['mp3', 'wav'];
export const CONVERT_TO_VIDEO_EXTENSIONS = ['mp4', 'flv', 'avi'];
export const MIME_TYPES = new Map();

CONVERT_TO_AUDIO_EXTENSIONS.forEach(element => {
    if(element==='mp3'){
        MIME_TYPES.set(element,'audio/mpeg');
    }else{
        MIME_TYPES.set(element,`audio/${element}`)
    }
});
CONVERT_TO_VIDEO_EXTENSIONS.forEach(element=>{
    if(element==='flv') {
        MIME_TYPES.set(element,`video/x-${element}`)
    }else if(element==='wmv') {
        MIME_TYPES.set(element,`video/x-ms-wmv`); 
    }else {
        MIME_TYPES.set(element,`video/${element}`);
    }//TODO mov
});
export const CONVERT_TO_EXTENSIONS = CONVERT_TO_AUDIO_EXTENSIONS.concat(CONVERT_TO_VIDEO_EXTENSIONS);


export enum actions {
    CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE',
    ON_URL_CHANGE = 'ON_URL_CHANGE',
    ON_CONVERT_TO_CHANGE = 'ON_CONVERT_TO_CHANGE',
    ON_FILE_CHANGE = 'ON_FILE_CHANGE'
}


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

interface OnFileChangeAction {
    type: typeof ON_FILE_CHANGE;
    file: any;
}

export interface ErrorDTO {
    message: string;
}


export type FormActionTypes =
    ChangeFormTypeAction
    | OnUrlChangeAction
    | OnConvertToChangeAction
    | OnFileChangeAction;