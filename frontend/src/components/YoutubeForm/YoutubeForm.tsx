import * as React from 'react';

import {Formik, Form, Field, ErrorMessage, FieldProps} from 'formik';

import {Input, TreeSelect,Form as AForm, Button} from 'antd';
const FormItem = AForm.Item;
const { TreeNode } = TreeSelect;

interface FormValues {
    url:string;
    convertTo:string;//TODO convert to types
}
const YoutubeForm =()=>{
    return (
        <Formik <FormValues,{}>
            initialValues={{url:'',convertTo:'Convert to!'}}
            validate={values=>{
                const errors:any={}
                if (!values.url){
                    errors.url="Rqeuired"
                }
                if (values.convertTo==='Convert to!'){
                    errors.convertTo="Required convert to"
                }
                return errors;
            }}
            onSubmit={(values,{setSubmitting})=>{
                   setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
            }}
        >

            <Form>
                <Field name='url'>
                    {({field,form, meta}:FieldProps)=>
                        <Input 
                            {...field}
                            placeholder='Enter a youtube link'
                        />
                    }
                </Field>
                <ErrorMessage name="url" />
                <Field name='convertTo'>
                    {({field,form,meta}:FieldProps)=>
                    <TreeSelect
                            name
                            {...field}
                            onChange = {value => form.setFieldValue(field.name, value)}
                            onBlur ={ () => form.setFieldTouched(field.name, true)}
                            value={meta.touched ? field.value : meta.initialValue}
                        >
                            <TreeNode
                                value='Audio'
                                title='Audio'
                                disabled
                            >
                                <TreeNode value='mp3' title='mp3'/>
                                <TreeNode value='aac' title='aac'/>
                                <TreeNode value='wma' title='wma'/>
                            </TreeNode>
                            <TreeNode
                                value='Video'
                                title='Video'
                                disabled
                            >
                                <TreeNode value='mp4' title='mp4'/>
                                <TreeNode value='avi' title='avi'/>
                                <TreeNode value='mov' title='mov'/>
                            </TreeNode>
                        </TreeSelect>
                    }
                </Field>
                <FormItem>
                    <Button htmlType="submit">
                            Submit
                    </Button>
                </FormItem>
            </Form>
        </Formik>
    )
}
export default YoutubeForm;