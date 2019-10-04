import * as React from 'react';
import {Form, Input, TreeSelect} from 'antd';
import Button from "antd/lib/button";
const { TreeNode } = TreeSelect;

interface Props {

}

interface State {


}

export default class YoutubeForm extends React.Component<Props, State> {
    render() {

        return (
            <Form>
                <Form.Item>
                    <Input
                        placeholder="Enter a valid youtube link"
                        required
                    />
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
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};