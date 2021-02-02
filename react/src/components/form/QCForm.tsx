import React, {useState} from "react";
import {Form, Formik} from 'formik';
import {formats, validationSchema} from "../../constants";
import {useFakeDownloadProgress} from "../../hooks";
import {downloadVideo} from "../../api";
import {downloadFile} from "../../utils";
import QCTextField  from "./QCTextField";
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


    return (<Formik
        validateOnBlur={false}
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
        {({values}) => {
            console.log(values)

            // setUrl(url);

            return <Form className='form-container'>

                <div className='input-container'>
                    <QCTextField name='url'/>
                    {/*<QCSelect*/}
                    {/*    name='format'*/}
                    {/*    data..*/}
                    {/*/>*/}
                    <div id='format-container'>
                        <span>
                            mp3
                        </span>
                    </div>
                </div>

                <div className={'btn-container'}>
                    Download
                </div>

                {/*<Grid*/}
                {/*    xs={12}*/}
                {/*    item*/}
                {/*    container*/}
                {/*    justify='center'*/}
                {/*    alignContent='center'*/}
                {/*    className={classes.inputRow}*/}
                {/*>*/}

                {/*    <Grid item xs={10}>*/}
                {/*        /!*<CssTextField*!/*/}
                {/*        /!*    label="Custom CSS"*!/*/}
                {/*        /!*    variant="outlined"*!/*/}
                {/*        /!*    id="custom-css-outlined-input"*!/*/}
                {/*        /!*//*/}
                {/*        <QCTextField*/}
                {/*            as={TextField}*/}
                {/*            name="url"*/}
                {/*            label="YouTube URL"*/}
                {/*            placeholder="https://www.youtube.com/watch?v=f02mOEt11OQ"*/}
                {/*            className={classes.textField}*/}
                {/*            variant="outlined"*/}
                {/*            autoComplete={'off'}*/}
                {/*        />*/}
                {/*    </Grid>*/}
                {/*    <Grid*/}
                {/*        xs={2}*/}
                {/*        item*/}
                {/*        container*/}
                {/*        justify='center'*/}
                {/*        alignContent='center'*/}
                {/*        className={classes.downloadButtonContainer}*/}
                {/*    >*/}
                {/*        {*/}
                {/*            isSubmitting*/}
                {/*                ? <CircularProgressWithLabel value={progress}/>*/}
                {/*                : <Button*/}
                {/*                    id={"test"}*/}
                {/*                    className={classes.downloadButton}*/}
                {/*                    disabled={isSubmitting}*/}
                {/*                    type='submit'*/}
                {/*                    children={<GetAppRoundedIcon/>}*/}
                {/*                />*/}
                {/*        }*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                {/*<div className={classes.downloadContainer}>*/}
                {/*    Download*/}
                {/*</div>*/}
                {/*<FormControl className={classes.margin}>*/}
                {/*    <InputLabel shrink htmlFor="bootstrap-input">*/}
                {/*        YouTube URL*/}
                {/*    </InputLabel>*/}
                {/*    <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />*/}
                {/*</FormControl>*/}
                {/*<Grid item container justify="center" xs={12}>*/}
                {/*    {formats.map(format =>*/}
                {/*        <QCRadioButton*/}
                {/*            key={format}*/}
                {/*            type="radio"*/}
                {/*            name="format"*/}
                {/*            value={format}*/}
                {/*            label={format}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*</Grid>*/}
            </Form>;
        }}
    </Formik>);
};

export default QCForm;