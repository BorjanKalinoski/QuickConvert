"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var Container_1 = require("./Container/Container");
var App = function (props) {
    return (React.createElement(react_redux_1.Provider, { store: props.store },
        React.createElement(Container_1.default, null)));
};
exports.default = App;
//# sourceMappingURL=App.js.map