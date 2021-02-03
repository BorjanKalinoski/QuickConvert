import React, {useState} from "react";
import {Form, Formik} from 'formik';
import {validationSchema} from "../../constants";
import {downloadVideo} from "../../api";
import {downloadFile} from "../../utils";
import QCTextField  from "./QCTextField";
import QCDropdownMenu from "./QCDropdownMenu";
import QCTooltip from "../common/QCTooltip";

interface Props {
    setUrl: any;
}

const initialValues = {
    url: '',
    format: 'mp3'
};

const QCForm: React.FC<Props> = ({setUrl}) => {
    const [isDownloadFinished, setIsDownloadFinished] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    return (<Formik
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (data) => {
            setSubmitting(true);
            return;
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
        {({values, getFieldMeta, setFieldValue, submitForm}) => {
            const meta = getFieldMeta('url');
            const errorText = (meta.error && meta.touched && values.url) && meta.error;

            return <Form className='form-container'>
                <div className='input-container'>
                    <QCTextField name='url'/>
                    <QCDropdownMenu
                        format={values.format}
                        handleFormatChange={setFieldValue}
                    />
                </div>
                {
                    !!errorText && <QCTooltip content={errorText}/>
                }
                <button
                    type='button'
                    className='btn-container'
                    onClick={submitForm}
                    disabled={!!errorText}
                >
                    {
                        isSubmitting
                            ? 'Downloading...'
                            : 'Download'
                    }
                </button>
            </Form>;
        }}
    </Formik>);
};

export default QCForm;