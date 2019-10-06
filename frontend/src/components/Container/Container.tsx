import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from "../../store";
import {onChangeFormType, onUrlChange} from '../../store/form/actions';
// @ts-ignore
import Col from "antd/lib/grid/col"
// @ts-ignore
import Row from "antd/lib/grid/row"
// @ts-ignore
import {Button} from 'antd';

import './Container.less';
import YoutubeForm from "../AppForm/AppForm";
import {FormState, FormType} from "../../store/form/types";

interface DispatchProps {
    onUrlChange: typeof onUrlChange;
    onChangeFormType: typeof onChangeFormType;
}

interface StateProps {
    url: FormState['url'];
    formType: FormState['formType'];
    convertTo: FormState['convertTo'];
}

type Props = StateProps & DispatchProps;

export class Container extends React.Component<Props, {}> {

    componentDidMount(): void {

    }

    render() {
        const {onChangeFormType} = this.props;

        const {formType} = this.props;
        console.log(formType);
        return (
            <React.Fragment>
                {
                    //@ ts-ignore
                    !formType ?
                        (<Row type="flex" justify="center" align='middle' className='Container' gutter={0}>
                            <Col span={14}>
                                <Button
                                    size='large'
                                    block
                                    onClick={() => onChangeFormType(FormType.YOUTUBE)}
                                >
                                    Paste a youtube link
                                </Button>
                            </Col>
                            <Col span={14}>OR</Col>
                            <Col span={14}>
                                <Button
                                    size='large'
                                    block
                                    onClick={() => onChangeFormType(FormType.BASIC)}
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
}

export default connect<StateProps, DispatchProps, {}, AppState>(
    state => ({
        formType: state.form.formType,
        url: state.form.url,
        convertTo: state.form.convertTo
    }),
    {
        onChangeFormType,
        onUrlChange
    }
)(Container);
