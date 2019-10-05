import * as React from 'react';
import './AppForm.less';
import {Form, Input, TreeSelect} from 'antd';
import Button from "antd/lib/button";
import Col from "antd/lib/grid/col"
import Row from "antd/lib/grid/row"
import Upload from "antd/es/upload";
import Icon from "antd/es/icon";
const { TreeNode } = TreeSelect;

interface Props {

}

interface State {
    formType: string;
}

export default class AppForm extends React.Component<Props, State> {
    render() {
        const a = '1';
        return (
            <Form className={'AppForm'}>
                <Row type='flex'>
                    <Col span={20}>
                        <Form.Item>
                            {
                                // @ts-ignore
                                'yt' === a ?
                                    < Upload
                                        name='file'
                                    >
                                        <Button>
                                            <Icon type="upload"/> Click to upload your file
                                        </Button>
                                    </Upload>
                                    : <Input
                                        placeholder="Enter a valid youtube link"
                                        required
                                    />
                            }
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item>
                            <TreeSelect
                                defaultValue="Convert To"
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
};