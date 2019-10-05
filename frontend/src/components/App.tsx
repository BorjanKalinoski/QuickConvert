import * as React from 'react';
import Container from "./Container/Container";
import {AppState} from "../store/types";

export default class App extends React.Component<any, {}> {
    render() {
        return (
            <React.Fragment>
                <Container/>
            </React.Fragment>
        );
    }
};

