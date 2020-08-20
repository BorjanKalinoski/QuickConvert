"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var grid_1 = require("antd/lib/grid");
var antd_1 = require("antd");
require("./Container.less");
var types_1 = require("../../store/form/types");
var actions_1 = require("../../store/form/actions");
var YoutubeForm_1 = require("../YoutubeForm/YoutubeForm");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Container.prototype.render = function () {
        var onChangeFormType = this.props.onChangeFormType;
        var formType = this.props.formType;
        return (React.createElement(React.Fragment, null, formType === types_1.FormType.BASIC ?
            (React.createElement(grid_1.Row, { justify: "center", align: 'middle', className: 'Container', gutter: 0 },
                React.createElement(grid_1.Col, { span: 14 },
                    React.createElement(antd_1.Button, { size: 'large', block: true, onClick: function () { return onChangeFormType(types_1.FormType.YOUTUBE); } }, "Paste a ss link")),
                React.createElement(grid_1.Col, { span: 14 }, "OR"),
                React.createElement(grid_1.Col, { span: 14 },
                    React.createElement(antd_1.Button, { size: 'large', block: true, onClick: function () { return onChangeFormType(types_1.FormType.BASIC); } }, "Upload a file"))))
            : (React.createElement(YoutubeForm_1.default, null))));
    };
    return Container;
}(React.Component));
exports.Container = Container;
exports.default = react_redux_1.connect(function (state) { return ({
    formType: state.form.formType,
}); }, {
    onChangeFormType: actions_1.onChangeFormType
})(Container);
//# sourceMappingURL=Container.js.map