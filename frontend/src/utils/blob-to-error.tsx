import {ErrorDTO} from "../../../src/common/models/ErrorDTO";
import {UNEXPECTED_ERROR} from '../../../src/common/constants/errors';

export const blobToErrorDto = (blob: Blob): Promise<ErrorDTO[]> => {
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