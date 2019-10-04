import * as React from 'react';
import YoutubeForm from "../YoutubeForm/YoutubeForm";
import Col from "antd/lib/grid/col"
import Row from "antd/lib/grid/col"

// type Props;

interface State {


}
export default class Container extends React.Component<{}, State> {
    render() {
        return (
            <div className='Container'>
                <Row>
                    <Col span={6} offset={6}>
                        col-12 col-offset-6
                    </Col>
                    <Col span={6}>
                        col-12 col-ofsssSSfset-6
                    </Col><s></s>
                </Row>
            </div>
        );
    }

};