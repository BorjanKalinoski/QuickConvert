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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var formik_1 = require("formik");
var antd_1 = require("antd");
var axios_1 = require("axios");
var file_saver_1 = require("file-saver");
var types_1 = require("../../store/form/types");
var FormItem = antd_1.Form.Item;
var TreeNode = antd_1.TreeSelect.TreeNode;
var blobToString = function (b) {
    var u, x;
    u = URL.createObjectURL(b);
    x = new XMLHttpRequest();
    x.open('GET', u, true);
    x.send();
    URL.revokeObjectURL(u);
    return new Promise(function (resolve, reject) {
        x.onload = function (e) {
            resolve(JSON.parse(x.responseText));
        };
        x.onerror = function (err) {
            reject({ message: x.statusText });
        };
    });
};
var YoutubeForm = function () {
    var errorMessage = "";
    console.log('wat');
    return React.createElement(formik_1.Formik, { initialValues: {
            url: "",
            convertTo: "Convert To!"
        }, onSubmit: function () {
            console.log('submit');
        } }, function (_a) {
        var isSubmitting = _a.isSubmitting;
        return (React.createElement(formik_1.Form, null,
            React.createElement(formik_1.Field, { type: "email", name: "email" }),
            React.createElement(formik_1.ErrorMessage, { name: "email", component: "div" }),
            React.createElement(formik_1.Field, { type: "password", name: "password" }),
            React.createElement(formik_1.ErrorMessage, { name: "password", component: "div" }),
            React.createElement("button", { type: "submit", disabled: isSubmitting }, "Submit")));
    });
    return (React.createElement(formik_1.Formik, { initialValues: {
            url: '',
            convertTo: 'Convert to!'
        }, validate: function (values) {
            var errors = {};
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = values.url.match(regExp);
            if (!values.url) {
                errors.url = "This field is required!";
            }
            else if (!(match && match[2].length == 11)) {
                errors.url = 'Please provide a valid youtube link!';
            }
            if (values.convertTo === 'Convert to!') {
                errors.convertTo = "This field is required!";
            }
            else if (!types_1.CONVERT_TO_EXTENSIONS.includes(values.convertTo)) {
                errors.convertTo = "Please select a valid conversion type!";
            }
            return errors;
        }, onSubmit: function (values, _a) {
            var setSubmitting = _a.setSubmitting;
            setSubmitting(true);
            var url = values.url, convertTo = values.convertTo;
            axios_1.default({
                method: 'POST',
                url: '/api/videos/download',
                data: {
                    convertTo: convertTo,
                    url: url,
                },
                responseType: 'blob'
            }).then(function (res) {
                console.log(res.headers['content-type']);
                errorMessage = "";
                console.log(types_1.MIME_TYPES.get(convertTo));
                var file = new Blob([res.data], {
                    type: res.headers['content-type']
                });
                console.log('blob is', file);
                var fileURL = URL.createObjectURL(file);
                var filename = res.headers['content-disposition'].split('filename=')[1].slice(1, -1);
                file_saver_1.saveAs(fileURL, filename);
            })
                .catch(function (err) { return __awaiter(void 0, void 0, void 0, function () {
                var error, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4, blobToString(new Blob([err.response.data]))];
                        case 1:
                            error = _a.sent();
                            errorMessage = error.message;
                            return [3, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.log('this should not happen ', e_1);
                            errorMessage = e_1;
                            return [3, 3];
                        case 3: return [2];
                    }
                });
            }); })
                .finally(function () {
                setSubmitting(false);
            });
        } }, function (_a) {
        var values = _a.values, isSubmitting = _a.isSubmitting;
        return (React.createElement(formik_1.Form, { className: "Container" },
            React.createElement(formik_1.Field, { name: 'url' }, function (_a) {
                var field = _a.field, form = _a.form, meta = _a.meta;
                return React.createElement(FormItem, { help: meta.error && meta.touched ? meta.error : '', validateStatus: meta.error && meta.touched ? 'error' : 'success' },
                    React.createElement(antd_1.Input, __assign({}, field, { placeholder: 'Enter a youtube link' })));
            }),
            React.createElement(formik_1.Field, { name: 'convertTo' }, function (_a) {
                var field = _a.field, form = _a.form, meta = _a.meta;
                return React.createElement(FormItem, { help: meta.error && meta.touched ? meta.error : '', validateStatus: meta.error && meta.touched ? 'error' : 'success' },
                    React.createElement(antd_1.TreeSelect, __assign({}, field, { onChange: function (value) { return form.setFieldValue(field.name, value); }, onBlur: function () { return form.setFieldTouched(field.name, true); }, value: meta.touched ? field.value : meta.initialValue }),
                        React.createElement(TreeNode, { value: 'Audio', title: 'Audio', disabled: true }, types_1.CONVERT_TO_AUDIO_EXTENSIONS.map(function (element) {
                            return React.createElement(TreeNode, { value: element, title: element });
                        })),
                        React.createElement(TreeNode, { value: 'Video', title: 'Video', disabled: true }, types_1.CONVERT_TO_VIDEO_EXTENSIONS.map(function (element) {
                            return React.createElement(TreeNode, { value: element, title: element });
                        }))));
            }),
            React.createElement(FormItem, null,
                React.createElement(antd_1.Button, { htmlType: "submit", loading: isSubmitting, disabled: isSubmitting }, "Download")),
            errorMessage === ""
                ? ""
                : isSubmitting
                    ? ""
                    : React.createElement(antd_1.Alert, { message: "Failed to convert video!", description: errorMessage, type: "error", showIcon: true })));
    }));
};
exports.default = YoutubeForm;
//# sourceMappingURL=YoutubeForm.js.map