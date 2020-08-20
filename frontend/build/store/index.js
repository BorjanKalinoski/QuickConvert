"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reducers_1 = require("./form/reducers");
var redux_1 = require("redux");
var redux_saga_1 = require("redux-saga");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var sagaMiddleware = redux_saga_1.default();
var rootReducer = redux_1.combineReducers({
    form: reducers_1.default
});
function configureStore() {
    var store = redux_1.createStore(rootReducer, redux_devtools_extension_1.composeWithDevTools());
    return store;
}
exports.default = configureStore;
//# sourceMappingURL=index.js.map