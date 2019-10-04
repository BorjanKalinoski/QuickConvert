import * as React from 'react';
import Container from "./Container/Container";

export default class App extends React.Component<any, {}> {
    render() {
        return (
            <div>
                <Container/>
            </div>
        );
    }
};

interface Props {
    name: string;
}