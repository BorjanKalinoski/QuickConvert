import * as React from 'react';
import './AppForm.less';
import {Form, Input, TreeSelect} from 'antd';
import Button from "antd/lib/button";
import Col from "antd/lib/grid/col"
import Row from "antd/lib/grid/row"
import Upload from "antd/es/upload";
import Icon from "antd/es/icon";
import {FormType} from "../../store/form/types";
import {AppState} from "../../store";
import axios from 'axios';

import {
    onUrlChange,
    onConvertToChange,
    onFileChange
} from '../../store/form/actions';

import {connect} from "react-redux";

const { TreeNode } = TreeSelect;

interface OwnProps {
    formType: FormType;
}

interface DispatchProps {
    onUrlChange: typeof onUrlChange;
    onConvertToChange: typeof onConvertToChange;
    onFileChange: typeof onFileChange;

}

interface StateProps {
    url: AppState['form']['url'];
    convertTo: AppState['form']['convertTo'];
    file: AppState['form']['file'];
}

type Props = DispatchProps & StateProps & OwnProps;

export class AppForm extends React.Component<Props, {}> {
    render() {
        const {formType, url, convertTo, file} = this.props;

        return (
            <Form className={'AppForm'} onSubmit={this.handleSubmit}>
                <Row type='flex'>
                    <Col span={20}>
                        <Form.Item>
                            {
                                formType === FormType.BASIC ?
                                    < Upload
                                        name='file'
                                        onChange={(e) => {
                                            this.props.onFileChange(e);
                                        }}
                                    >
                                        <Button>
                                            <Icon type="upload"/> Click to upload your file
                                        </Button>
                                    </Upload>
                                    : <Input
                                        placeholder="Enter a valid youtube link"
                                        onChange={(e) => this.props.onUrlChange(e.target.value)}
                                        value={url}
                                        required
                                    />
                            }
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item>
                            <TreeSelect
                                defaultValue="Convert To"
                                onChange={(e) => this.props.onConvertToChange(e)}
                                value={convertTo}
                            >
                                <TreeNode
                                    value='Audio'
                                    title='Audio'
                                    disabled
                                >
                                    AudioS
                                    <TreeNode value='mp3' title='mp3'>
                                        mp3
                                    </TreeNode>
                                    <TreeNode value='aac' title='aac'>
                                        aac
                                    </TreeNode>
                                    <TreeNode value='wma' title='wma'>
                                        wma
                                    </TreeNode>
                                </TreeNode>
                                <TreeNode
                                    value='Video'
                                    title='Video'
                                    disabled
                                >
                                    videos
                                    <TreeNode value='mp4' title='mp4'>
                                        mp4
                                    </TreeNode>
                                    <TreeNode value='avi' title='avi'>
                                        avi
                                    </TreeNode>
                                    <TreeNode value='mov' title='mov'>
                                        mov
                                    </TreeNode>
                                </TreeNode>
                            </TreeSelect>
                        </Form.Item>
                    </Col>,
                    <Col span={12} offset={8}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Download
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }

    handleSubmit(e: any) {
        console.log('submitting');
        console.log(e);
        e.preventDefault();
        axios.post('/videos/download', {
            convertTo: this.props.convertTo,
            url: this.props.url
        }).then(res => {
            console.log('yay!');
            console.log(res);
        }).catch(err => {
            console.log('err:(');
            console.log(err);
        });
    }
}

export default connect<StateProps, DispatchProps, {}, AppState>(
    state => ({
        file: state.form.file,
        url: state.form.url,
        convertTo: state.form.convertTo
    }),
    {
        onConvertToChange,
        onUrlChange,
        onFileChange
    }
)(AppForm);
