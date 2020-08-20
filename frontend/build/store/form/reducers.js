"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var initialState = {
    formType: types_1.FormType.NONE,
    convertTo: 'Convert To',
    file: '',
    url: ''
};
var formReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.actions.CHANGE_FORM_TYPE:
            return __assign(__assign({}, state), { formType: action.formType });
        case types_1.actions.ON_URL_CHANGE:
            return __assign(__assign({}, state), { url: action.url });
        case types_1.actions.ON_CONVERT_TO_CHANGE:
            return __assign(__assign({}, state), { convertTo: action.convertTo });
        case types_1.actions.ON_FILE_CHANGE:
            return __assign(__assign({}, state), { file: action.file });
    }
    return state;
};
exports.default = formReducer;
//# sourceMappingURL=reducers.js.map