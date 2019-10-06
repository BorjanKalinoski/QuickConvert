import formReducer from "./form/reducers";
import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    form: formReducer
});

export default function configureStore(): Store<AppState, any> {
    const store = createStore(
        rootReducer,
        composeWithDevTools()
    );

    return store;
}
export type AppState = ReturnType<typeof rootReducer>;