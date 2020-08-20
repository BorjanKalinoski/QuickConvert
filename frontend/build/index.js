"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var App_1 = require("./components/App");
require("./style.less");
var index_1 = require("./store/index");
var store = index_1.default();
var ROOT = document.getElementById('root');
ReactDOM.render(React.createElement(App_1.default, { store: store }), ROOT);
//# sourceMappingURL=index.js.map