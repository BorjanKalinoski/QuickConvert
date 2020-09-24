import {ErrorDto} from "../models/error-dto";

import {UNEXPECTED_ERROR} from '../constants/errors';

const blobToString = (blob:Blob): Promise<ErrorDto[]> => {
    const objectUrl = URL.createObjectURL(blob);
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', objectUrl, true);
    httpRequest.send();
    URL.revokeObjectURL(objectUrl);
    return new Promise((resolve, reject) => {
        httpRequest.onload = (e) => {
            try {
                resolve(JSON.parse(httpRequest.responseText));
            } catch (e) {
                resolve([{message: UNEXPECTED_ERROR}])
            }
        };
        httpRequest.onerror = (err) => {
            reject({message: httpRequest.statusText});
        };
    });
};

export default blobToString;