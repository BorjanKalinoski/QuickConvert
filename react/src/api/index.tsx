import axios, {AxiosResponse} from "axios";
import {properties} from "../properties";
import {VideoFormData} from "../types";

const downloadVideo = (data: VideoFormData): Promise<AxiosResponse> => {
    console.log(properties);
    return axios(`${properties.api.root}/download`, {
        responseType: 'blob',
        method: 'POST',
        data
    });
};

export {
    downloadVideo
};
