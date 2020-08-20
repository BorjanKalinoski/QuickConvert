"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.CONVERT_TO_EXTENSIONS = exports.MIME_TYPES = exports.CONVERT_TO_VIDEO_EXTENSIONS = exports.CONVERT_TO_AUDIO_EXTENSIONS = exports.ON_FILE_CHANGE = exports.ON_CONVERT_TO_CHANGE = exports.ON_URL_CHANGE = exports.CHANGE_FORM_TYPE = exports.FormType = void 0;
var FormType;
(function (FormType) {
    FormType["BASIC"] = "BASIC";
    FormType["YOUTUBE"] = "YOUTUBE";
    FormType["NONE"] = "NONE";
})(FormType = exports.FormType || (exports.FormType = {}));
exports.CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';
exports.ON_URL_CHANGE = 'ON_URL_CHANGE';
exports.ON_CONVERT_TO_CHANGE = 'ON_CONVERT_TO_CHANGE';
exports.ON_FILE_CHANGE = 'ON_FILE_CHANGE';
exports.CONVERT_TO_AUDIO_EXTENSIONS = ['mp3', 'wav'];
exports.CONVERT_TO_VIDEO_EXTENSIONS = ['mp4', 'flv', 'avi'];
exports.MIME_TYPES = new Map();
exports.CONVERT_TO_AUDIO_EXTENSIONS.forEach(function (element) {
    if (element === 'mp3') {
        exports.MIME_TYPES.set(element, 'audio/mpeg');
    }
    else {
        exports.MIME_TYPES.set(element, "audio/" + element);
    }
});
exports.CONVERT_TO_VIDEO_EXTENSIONS.forEach(function (element) {
    if (element === 'flv') {
        exports.MIME_TYPES.set(element, "video/x-" + element);
    }
    else if (element === 'wmv') {
        exports.MIME_TYPES.set(element, "video/x-ms-wmv");
    }
    else {
        exports.MIME_TYPES.set(element, "video/" + element);
    }
});
exports.CONVERT_TO_EXTENSIONS = exports.CONVERT_TO_AUDIO_EXTENSIONS.concat(exports.CONVERT_TO_VIDEO_EXTENSIONS);
var actions;
(function (actions) {
    actions["CHANGE_FORM_TYPE"] = "CHANGE_FORM_TYPE";
    actions["ON_URL_CHANGE"] = "ON_URL_CHANGE";
    actions["ON_CONVERT_TO_CHANGE"] = "ON_CONVERT_TO_CHANGE";
    actions["ON_FILE_CHANGE"] = "ON_FILE_CHANGE";
})(actions = exports.actions || (exports.actions = {}));
//# sourceMappingURL=types.js.map