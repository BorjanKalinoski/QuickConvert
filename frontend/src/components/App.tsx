import * as React from 'react';
import {Provider} from "react-redux";
import {Store} from "redux";


import Container from "./Container/Container";
import {AppState} from "../store";

interface Props {
    store: Store<AppState>;
}

const App: React.FC<Props> = props => {
    return (
        <Provider store={props.store}>
            <Container/>
        </Provider>
    );
};

export default App;