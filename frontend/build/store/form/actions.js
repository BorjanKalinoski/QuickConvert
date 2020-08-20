"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onFileChange = exports.onChangeFormType = exports.onConvertToChange = exports.onUrlChange = void 0;
var types_1 = require("./types");
function onUrlChange(url) {
    return {
        type: types_1.ON_URL_CHANGE,
        url: url
    };
}
exports.onUrlChange = onUrlChange;
function onConvertToChange(convertTo) {
    return {
        type: types_1.ON_CONVERT_TO_CHANGE,
        convertTo: convertTo
    };
}
exports.onConvertToChange = onConvertToChange;
function onChangeFormType(formType) {
    return {
        type: types_1.CHANGE_FORM_TYPE,
        formType: formType
    };
}
exports.onChangeFormType = onChangeFormType;
function onFileChange(file) {
    return {
        type: types_1.ON_FILE_CHANGE,
        file: file
    };
}
exports.onFileChange = onFileChange;
//# sourceMappingURL=actions.js.map