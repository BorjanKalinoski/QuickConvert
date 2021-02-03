import React, {useState} from "react";
import {Form, Formik} from 'formik';
import {formats, validationSchema} from "../../constants";
import {useFakeDownloadProgress} from "../../hooks";
import {downloadVideo} from "../../api";
import {downloadFile} from "../../utils";
import QCTextField  from "./QCTextField";
import QCDropdownMenu from "./QCDropdownMenu";
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
        {({values, setFieldValue}) => {
            console.log(values);

            return <Form className='form-container'>

                <div className='input-container'>
                    <QCTextField name='url'/>
                    <QCDropdownMenu
                        format={values.format}
                        handleFormatChange={setFieldValue}
                    />
                </div>

                <div className={'btn-container'}>
                    Download
                </div>
            </Form>;
        }}
    </Formik>);
};

export default QCForm;