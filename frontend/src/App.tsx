import * as React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";
import {Formik, Field, Form, ErrorMessage, useField} from 'formik';
import * as yup from 'yup';
import {
    Button,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
const formats = ['mp3', 'mp4', 'wav', 'flv', 'avi'];

const validationSchema = yup.object().shape({
    url: yup.string().required('This field is required').url('Please enter a valid URL').matches(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/, 'Please enter a valid YouTube URL'),
    format: yup.string().required('This field is required').oneOf(formats,'Please enter a valid format')
});

const MyTextField = (props) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return <Field {...field} {...props} helperText={errorText} error={!!errorText}/>;
};

const MySelectField = (props) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return <Field {...field} {...props} >
        {props.children}
    </Field>
};
const App = props => {

    return (
        <Container style={{height: 500, borderRadius: 16}} className={"bg-info w-50 my-4 py-5"} fluid>
            <Row className="h-25">
                <Col className={"d-flex justify-content-center align-items-center w-100"}> {/* FORMA*/}
                    <Formik
                        initialValues={{url: '', format: ''}}
                        validationSchema={validationSchema}
                        onSubmit={(data, {setSubmitting, resetForm}) => {
                            setSubmitting(true);
                            const {url, format} = data;
                            axios({
                                method: 'POST',
                                url: '/api/videos/download',
                                data: {
                                    format,
                                    url,
                                },
                                responseType: 'blob'
                            }).then(res => {
                                setSubmitting(false);
                                console.log(res.headers['content-type']);
                                const file = new Blob([res.data], {
                                    type: res.headers['content-type']
                                });
                                const fileURL = URL.createObjectURL(file);
                                const filename = res.headers['content-disposition'].split('filename=')[1].slice(1, -1);
                                // saveAs(fileURL, filename);
                            }).catch(e => {
                                setSubmitting(false);
                            });
                        }}
                    >
                        {({values, isSubmitting, errors}) => {
                            console.log('errors are !', errors);
                            console.log(values);
                            return (
                                <Form className={"w-100 d-flex flex-column"}>
                                    <div className={"d-flex justify-content-center "}>
                                        <MyTextField
                                            as={TextField}
                                            name="url"
                                            className={"my-2 w-60"}/>
                                        <Field
                                            as={Select}
                                            className={"my-2 w-10"}
                                            name={"format"}
                                            value={values.format ? values.format : 'mp3'}
                                            error={!!errors.format} helperText={errors.format}
                                        >
                                            <MenuItem value="">
                                                <em>Audio</em>
                                            </MenuItem>
                                            <MenuItem value={'mp3'}>mp3</MenuItem>
                                            <MenuItem value={'wav'}>wav</MenuItem>
                                            <MenuItem value="">
                                                <em>Video</em>
                                            </MenuItem>
                                            <MenuItem value={'mp4'}>mp4</MenuItem>
                                            <MenuItem value={'flv'}>flv</MenuItem>
                                            <MenuItem value={'avi'}>avi</MenuItem>
                                        </Field>
                                    </div>
                                    <ErrorMessage name='url'>
                                        {(msg) => <Alert severity="error">{msg}</Alert>}
                                    </ErrorMessage>
                                    <ErrorMessage name='format'>
                                        {(msg) => <Alert severity="error">{msg}</Alert>}
                                    </ErrorMessage>
                                    <div className={"d-flex justify-content-center m-2"}>
                                        <Button disabled={isSubmitting} type="submit"> <GetAppIcon fontSize={'large'}/></Button>
                                    </div>
                                </Form>);
                        }}
                    </Formik>
                </Col>
            </Row>
            <Row className={"h-70 text-center"}> {/*LOGO*/}
                <Col>
                    QUICK CONVERT
                </Col>
            </Row>
        </Container>
    );
};

export default App;