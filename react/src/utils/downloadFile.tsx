import {AxiosResponse} from "axios";

export default function downloadFile(response: AxiosResponse): void {
    const contentDisposition = decodeURIComponent(response.headers['content-disposition']);
    const filename = decodeURIComponent(contentDisposition.split("filename*=UTF-8''")[1]);

    const url: string = window.URL.createObjectURL(
        new Blob([response.data], {
            type: response.headers["content-type"]
        })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
};