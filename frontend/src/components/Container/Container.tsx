import * as React from 'react';
import Col from "antd/lib/grid/col"
import Row from "antd/lib/grid/row"
import { Button } from 'antd';

import './Container.less';
import YoutubeForm from "../AppForm/AppForm";

import {AppState, FormState} from '../../store/types';
import {changeFormType} from '../../store/actions';

interface StateProps {
    formState: FormState;
}
export default class Container extends React.Component<Props> {

    private handleFormTypeChange(type: string): any {
        return undefined;
    }

    render() {
        const a = 'b';
        return (
            <React.Fragment>
                {
                    //@ ts-ignore
                    true || false ?
                        (<Row type="flex" justify="center" align='middle' className='Container' gutter={0}>
                            <Col span={14}>
                                <Button
                                    size='large'
                                    block
                                    onClick={this.handleFormTypeChange('yt')}
                                >
                                    Paste a youtube link
                                </Button>
                            </Col>
                            <Col span={14}>OR</Col>
                            <Col span={14}>
                                <Button
                                    size='large'
                                    block
                                    onClick={this.handleFormTypeChange('cust')}

                                >
                                    Upload a file
                                </Button>
                            </Col>
                        </Row>)
                        : (<YoutubeForm/>)
                }
            </React.Fragment>
        );
    }
};
const mapStateToProps = (state: AppState) => ({
    formType: state.formType,
});