import * as React from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Button, CircularProgress, Grid, TextField} from "@material-ui/core";
import axios from 'axios';
import {saveAs} from 'file-saver';
import MyTextField from "./CustomFormComponents/MyTextField";
import MyRadioButton from "./CustomFormComponents/MyRadioButton";
import {ErrorDTO} from "../../../src/common/models/ErrorDTO";
import {FORMAT_NOT_VALID, URL_NOT_VALID} from '../../../src/common/constants/errors'
import {audioFormats, videoFormats} from '../../../src/common/constants/formats';
import Alert from '@material-ui/lab/Alert';
const formats = [...audioFormats, ...videoFormats];
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

const blobToString = (b): Promise<ErrorDTO[]> => {
    //Needs refactoring, THIS IS ONLY FOR THE ERROR! //ADD THIS TO A DIFFERENT FILE
    let u, x;
    u = URL.createObjectURL(b);
    x = new XMLHttpRequest();
    x.open('GET', u, true);
    x.send();
    URL.revokeObjectURL(u);
    return new Promise((resolve, reject) => {
        x.onload = (e) => {
            try {
                resolve(JSON.parse(x.responseText));
            } catch (e) {
                resolve([{message: "An unexpected error has occurred"}])
            }
        };
        x.onerror = (err) => {
            reject({message: x.statusText});
        };
    });
};
//TODO error when server crashes!
const YoutubeForm = props => {
    const classes = useStyles();
    let errors: ErrorDTO[] = [];

    return (<Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data, {setSubmitting}) => {
            errors = [];
            setSubmitting(true);
            try {
                const res = await axios({
                    method: "POST",
                    url: '/api/videos/download',
                    responseType: 'blob',
                    data,
                });

                const fileBlob: Blob = new Blob([res.data], {
                    type: res.headers['content-type']  // eg. audio/mpeg
                });

                const blobUrl: string = URL.createObjectURL(fileBlob);
                const fileName: string = res.headers['content-disposition'].split('filename=')[1].slice(1, -1); //Get the filename from Content-Disposition header

                saveAs(blobUrl, fileName);
            } catch (err) {
                errors = await blobToString(new Blob([err.response.data]));
            }
            setSubmitting(false);
        }}
    >
        {({values, isSubmitting}) => {
            return (
                <Form className={classes.form}>
                    <Grid item container justify="center" xs={12}>
                        <Grid item xs={11} md={8}>
                            <MyTextField
                                as={TextField}
                                name="url"
                                label="YouTube URL"
                                placeholder="https://www.youtube.com/watch?v=f02mOEt11OQ"
                                className={classes.input}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item container justify="center" xs={12}>
                            {formats.map(format => <MyRadioButton
                                    key={format}
                                    type="radio"
                                    name="format"
                                    value={format}
                                    label={format}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {!isSubmitting
                                ? <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">
                                    Download
                                </Button>
                                : <CircularProgress/>
                            }
                        </Grid>
                        {errors.length !== 0
                            && <Grid item container xs={12} direction="column">
                                <Box my={1}>
                                    {errors.map((error, index) =>
                                        <Box mb={1}>
                                            <Alert severity="error" key={index}>{error.message}</Alert>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </Form>);
        }}
    </Formik>);
};


export default YoutubeForm;
