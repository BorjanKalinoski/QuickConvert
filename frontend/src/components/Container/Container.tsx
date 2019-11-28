import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from "../../store";
import Col from "antd/lib/grid/col"
import Row from "antd/lib/grid/row"
import {Button} from 'antd';
import './Container.less';
import {FormType} from "../../store/form/types";
import AppForm from "../AppForm/AppForm";
import {onChangeFormType} from '../../store/form/actions';
import YoutubeForm from "../YoutubeForm/YoutubeForm";
interface DispatchProps {
    onChangeFormType: typeof onChangeFormType;
}

interface StateProps {
    formType: AppState['form']['formType'];
}

type Props = StateProps & DispatchProps;

export class Container extends React.Component<Props, {}> {

    render() {
        const {onChangeFormType} = this.props;

        const {formType} = this.props;
        return (
            <React.Fragment>
                {
                    formType === FormType.BASIC ?
                        (<Row type="flex" justify="center" align='middle' className='Container' gutter={0}>
                            <Col span={14}>
                                <Button
                                    size='large'
                                    block
                                    onClick={() => onChangeFormType(FormType.YOUTUBE)}
                                >
                                    Paste a ss link
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
                        : (<YoutubeForm />)
                        //(<AppForm formType={formType}/>)
                }
            </React.Fragment>
        );
    }
}

export default connect<StateProps, DispatchProps, {}, AppState>(
    state => ({
        formType: state.form.formType,
    }),
    {
        onChangeFormType
    }
)(Container);
