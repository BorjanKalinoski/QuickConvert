import * as React from 'react';
import {Formik, Form,} from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, FormLabel, Grid, Button, CircularProgress} from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import {saveAs} from 'file-saver';
import MyTextField from "./CustomFormComponents/MyTextField";
import MyRadioButton from "./CustomFormComponents/MyRadioButton";
import {ErrorDTO} from "../../../common/models/ErrorDTO";
import {FORMAT_NOT_VALID, URL_NOT_VALID} from "../../../common/constants/errors";
import formats from "../../../common/constants/formats";

const validationSchema = yup.object().shape({
    url: yup.string().required(URL_NOT_VALID).url(URL_NOT_VALID).matches(/^.*(youtu\.be|youtube\.com|y2u\.be)\/(watch\?(v|feature)=.{11}|embed\/.{11}|.{11}|[ev]\/.{11})((?=[\/?&]).*|(?![\/?&]))$/img, 'YouTube URL is not valid'),
    format: yup.string().required(FORMAT_NOT_VALID).oneOf(formats, FORMAT_NOT_VALID)
});

const useStyles = makeStyles({
    form: {
        width: '100%',
        textAlign: 'center',
    },
    input: {
        width:'100%',
        marginVertical: 20
    }
});

const initialValues = {
    url: '',
    format: 'mp3'
};

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

const YoutubeForm = props => {
    const classes = useStyles();

    return (<Formik
        initialValues={initialValues}
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
                saveAs(fileURL, filename);
            }).catch(async (err) => {
                try {
                    const error: ErrorDTO = await blobToString(new Blob([err.response.data]));
                    console.log(error)
                    // errorMessage = error.message;
                } catch (e) {
                    console.log('this should not happen ', e);
                    // errorMessage = e;
                }
            })
                .finally(() => {
                    setSubmitting(false);
                });
        }}
    >
        {({values, isSubmitting, errors}) => {
            return (
                <Form className={classes.form}>
                    <Grid xs={12} container justify="center">
                        <Grid item xs={11} md={8}>
                            <MyTextField
                                as={TextField}
                                name="url"
                                label="Link"
                                placeholder="https://www.youtube.com/watch?v=f02mOEt11OQ"
                                className={classes.input}
                                // autoFocus
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item container justify="center" xs={12}>
                            {/*<FormLabel>*/}
                            {/*    Format*/}
                            {/*</FormLabel>*/}
                            {/*<div>*/}
                            {formats.map(format => <MyRadioButton
                                    key={format}
                                    type="radio"
                                    name="format"
                                    value={format}
                                    label={format}
                                />
                            )}
                            {/*</div>*/}
                        </Grid>
                        <Grid item xs={12}>
                            {!isSubmitting
                                ? <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
                                    Download
                                </Button>
                                : <CircularProgress/>
                                // <GetAppIcon fontSize={'large'}/>
                            }
                        </Grid>
                    </Grid>
                </Form>);
        }}
    </Formik>);
};


export default YoutubeForm;