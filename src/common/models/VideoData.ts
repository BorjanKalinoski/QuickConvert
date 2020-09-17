import {Readable} from "stream";

export interface VideoData {
    videoStream: Readable;
    format: string;
    title: string;
    mimeType: string;
}
