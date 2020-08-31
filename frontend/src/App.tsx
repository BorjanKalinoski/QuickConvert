import * as React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";
import {Formik, Field, Form, ErrorMessage, useField, FieldAttributes} from 'formik';
import * as yup from 'yup';
import {
    Button, FormControlLabel, FormLabel,
    Radio, RadioGroup,
    TextField
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const formats = ['mp3', 'mp4', 'wav', 'flv', 'avi'];

const validationSchema = yup.object().shape({
    url: yup.string().required('This field is required').url('Please enter a valid URL').matches(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/, 'Please enter a valid YouTube URL'),
    format: yup.string().required('This field is required').oneOf(formats, 'Please enter a valid format')
});

const MyTextField = (props) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return <Field {...field} {...props} helperText={errorText} error={!!errorText}/>;
};

type MyRadioProps = { label: string; } & FieldAttributes<{}>;

const MyRadio: React.FC<MyRadioProps> = ({label, ...props}) => {
    const [field] = useField(props);
    return <FormControlLabel {...field} control={<Radio/>} label={label}/>;
};


const App = props => {

    return (
        <Container style={{height: 500, borderRadius: 16}} className={"bg-info w-90 my-4 py-5"} fluid>
            <Row className="h-25">
                <Col className={"d-flex justify-content-center align-items-center w-100"}> {/* FORMA*/}
                    <Formik
                        initialValues={{url: '', format: 'mp3'}}
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
                            return (
                                <Form className={"w-70 d-flex flex-column"}>
                                    <div className={"d-flex flex-column align-items-center justify-content-center"}>
                                        <MyTextField
                                            as={TextField}
                                            name="url"
                                            className={"my-2 w-100"}
                                            label="Link"
                                            placeholder="https://www.youtube.com/watch?v=f02mOEt11OQ"
                                            autoFocus
                                            variant="outlined"
                                        />
                                        <div className={"d-flex align-items-center flex-column w-100 my-4"}>
                                            <FormLabel
                                                className={"center w-100"}>
                                                Format
                                            </FormLabel>
                                            <div role="group" className={"d-flex justify-content-center w-100 flex-wrap"}>
                                                <MyRadio type="radio" name="format" value="mp3" label="mp3"/>
                                                <MyRadio type="radio" name="format" value="wav" label="wav"/>
                                                <MyRadio type="radio" name="format" value="mp4" label="mp4"/>
                                                <MyRadio type="radio" name="format" value="flv" label="flv"/>
                                                <MyRadio type="radio" name="format" value="avi" label="avi"/>
                                            </div>
                                        </div>
                                    </div>
                                    <ErrorMessage name='url'>
                                        {(msg) => <Alert severity="error">{msg}</Alert>}
                                    </ErrorMessage>
                                    <ErrorMessage name='format'>
                                        {(msg) => <Alert severity="error">{msg}</Alert>}
                                    </ErrorMessage>
                                    <div className={"d-flex justify-content-center m-2"}>
                                        <Button disabled={isSubmitting} type="submit">
                                            <GetAppIcon fontSize={'large'}/>
                                        </Button>
                                    </div>
                                </Form>);
                        }}
                    </Formik>
                </Col>
            </Row>
            <Row className={"h-70 text-center"}> {/*LOGO*/}
                {/*<Col>*/}
                {/*    QUICK CONVERT*/}
                {/*</Col>*/}
            </Row>
        </Container>
    );
};

export default App;

// navigator.clipboard.readText().then(//optional
//     clipText => {
//         console.log('cliptext ');
//         console.log(clipText);
//         @ts-ignore
        // return '';
    // });