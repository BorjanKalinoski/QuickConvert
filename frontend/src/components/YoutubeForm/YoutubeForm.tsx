import * as React from 'react';
import {Formik, Form, Field, FieldProps, ErrorMessage} from 'formik';
import {Input, TreeSelect, Form as AForm, Button, Alert} from 'antd';
import axios from 'axios';
import {saveAs} from 'file-saver';
import {
    CONVERT_TO_EXTENSIONS,
    MIME_TYPES,
    CONVERT_TO_AUDIO_EXTENSIONS,
    CONVERT_TO_VIDEO_EXTENSIONS,
    ErrorDTO
} from '../../store/form/types';

interface FormValues {
    url: string;
    convertTo: string;
}

const FormItem = AForm.Item;
const {TreeNode} = TreeSelect;

const blobToString = (b): Promise<ErrorDTO> => {
    let u, x;
    u = URL.createObjectURL(b);
    x = new XMLHttpRequest();
    x.open('GET', u, true);
    x.send();
    URL.revokeObjectURL(u);
    return new Promise((resolve, reject) => {
        x.onload = (e) => {
            resolve(JSON.parse(x.responseText));
        };
        x.onerror = (err) => {
            reject({message: x.statusText});
        };
    });
};

const YoutubeForm: React.FC<{}> = () => {
    let errorMessage: string = "";
    console.log('wat')
    return <Formik
        initialValues={{
            url: "",
            convertTo: "Convert To!"
        }}
        onSubmit={() => {
            console.log('submit');
        }}
    >
        {({ isSubmitting }) => (
            <Form>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
        )}
    </Formik>;
    return (
        <Formik<FormValues, {}>
            initialValues={{
                url: '',
                convertTo: 'Convert to!'
            }}
            validate={values => {
                const errors: any = {}
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
                const match = values.url.match(regExp);
                if (!values.url) {
                    errors.url = "This field is required!"
                } else if (!(match && match[2].length == 11)) {
                    errors.url = 'Please provide a valid youtube link!'
                }
                if (values.convertTo === 'Convert to!') {
                    errors.convertTo = "This field is required!"
                } else if (!CONVERT_TO_EXTENSIONS.includes(values.convertTo)) {
                    errors.convertTo = "Please select a valid conversion type!"
                }
                return errors;
            }}
            onSubmit={(values: any, {setSubmitting}) => {
                setSubmitting(true);
                const {url, convertTo} = values;
                axios({
                    method: 'POST',
                    url: '/api/videos/download',
                    data: {
                        convertTo,
                        url,
                    },
                    responseType: 'blob'
                }).then(res => {
                    console.log(res.headers['content-type']);
                    errorMessage = "";
                    console.log(MIME_TYPES.get(convertTo));
                    const file = new Blob([res.data], {
                        type: res.headers['content-type']
                    });

                    console.log('blob is', file);
                    const fileURL = URL.createObjectURL(file);
                    const filename = res.headers['content-disposition'].split('filename=')[1].slice(1, -1);
                    saveAs(fileURL, filename);
                })
                    .catch(async (err) => {
                        try {
                            const error: ErrorDTO = await blobToString(new Blob([err.response.data]));
                            errorMessage = error.message;
                        } catch (e) {
                            console.log('this should not happen ', e);
                            errorMessage = e;
                        }
                    })
                    .finally(() => {
                        setSubmitting(false);
                    });
            }}
        >
            {({values, isSubmitting}) => (
                <Form className={"Container"}>
                    <Field name='url'>
                        {({field, form, meta}: FieldProps) =>
                            <FormItem
                                help={meta.error && meta.touched ? meta.error : ''}
                                validateStatus={meta.error && meta.touched ? 'error' : 'success'}
                            >
                                <Input
                                    {...field}
                                    placeholder='Enter a youtube link'
                                />
                            </FormItem>
                        }
                    </Field>
                    <Field name='convertTo'>
                        {({field, form, meta}: FieldProps) =>
                            <FormItem
                                help={meta.error && meta.touched ? meta.error : ''}
                                validateStatus={meta.error && meta.touched ? 'error' : 'success'}
                            >
                                <TreeSelect
                                    {...field}
                                    onChange={value => form.setFieldValue(field.name, value)}
                                    onBlur={() => form.setFieldTouched(field.name, true)}
                                    value={meta.touched ? field.value : meta.initialValue}
                                >
                                    <TreeNode
                                        value='Audio'
                                        title='Audio'
                                        disabled
                                    >
                                        {CONVERT_TO_AUDIO_EXTENSIONS.map(element => {
                                            return <TreeNode value={element} title={element}/>
                                        })}
                                    </TreeNode>
                                    <TreeNode
                                        value='Video'
                                        title='Video'
                                        disabled
                                    >
                                        {CONVERT_TO_VIDEO_EXTENSIONS.map(element => {
                                            return <TreeNode value={element} title={element}/>
                                        })}
                                    </TreeNode>
                                </TreeSelect>
                            </FormItem>
                        }
                    </Field>
                    <FormItem>
                        <Button htmlType="submit" loading={isSubmitting} disabled={isSubmitting}>
                            Download
                        </Button>
                    </FormItem>
                    {errorMessage === ""
                        ? ""
                        : isSubmitting
                            ? ""
                            : <Alert
                                message="Failed to convert video!"
                                description={errorMessage}
                                type="error"
                                showIcon
                            />
                    }
                </Form>
            )}
        </Formik>
    );
};

export default YoutubeForm;