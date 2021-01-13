import React, {useState} from "react";
import {Form, Formik} from 'formik';
import {Button, Grid, TextField} from "@material-ui/core";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import {formats, validationSchema} from "../../constants";
import {useFakeDownloadProgress} from "../../hooks";
import {downloadVideo} from "../../api";
import {CircularProgressWithLabel, QCRadioButton, QCTextField} from '../';
import {downloadFile} from "../../utils";
import {useFormStyles} from "../../styles";

interface Props {
    setUrl: any;
}

const initialValues = {
    url: '',
    format: 'mp3'
};

const QCForm: React.FC<Props> = ({setUrl}) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [isDownloadFinished, setIsDownloadFinished] = useState(false);
    const progress = useFakeDownloadProgress(isSubmitting, isDownloadFinished)
    const classes = useFormStyles();

    return (<Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data) => {
            setSubmitting(true);
            try {
                const response = await downloadVideo(data);
                downloadFile(response);
            } catch (error) {
                console.log(error);
            } finally {
                setIsDownloadFinished(true);
                setTimeout(() => {
                    setSubmitting(false);
                    setIsDownloadFinished(false);
                }, 75);
            }
        }}
    >
        {({values: {url}, }) => {
            setUrl(url);

            return <Form>
                <Grid
                    xs={12}
                    item
                    container
                    justify='center'
                    alignContent='center'
                    className={classes.inputRow}
                >
                    <Grid item xs={10}>
                        <QCTextField
                            as={TextField}
                            name="url"
                            label="YouTube URL"
                            placeholder="https://www.youtube.com/watch?v=f02mOEt11OQ"
                            className={classes.textField}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        xs={2}
                        item
                        container
                        justify='center'
                        alignContent='center'
                        className={classes.downloadButtonContainer}
                    >
                        {
                            isSubmitting
                                ? <CircularProgressWithLabel value={progress}/>
                                : <Button
                                    id={"test"}
                                    className={classes.downloadButton}
                                    disabled={isSubmitting}
                                    type='submit'
                                    children={<GetAppRoundedIcon/>}
                                />
                        }
                    </Grid>
                </Grid>
                <Grid item container justify="center" xs={12}>
                    {formats.map(format =>
                        <QCRadioButton
                            key={format}
                            type="radio"
                            name="format"
                            value={format}
                            label={format}
                        />
                    )}
                </Grid>
            </Form>;
        }}
    </Formik>);
};

export default QCForm;