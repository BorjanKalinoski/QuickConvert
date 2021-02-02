import {Field, useField} from "formik";
import React from "react";
import QCLabel from "./QCLabel";

const QCTextField: React.FC<any> = (props: any) => {

    // const errorStyle = {
    //     color: 'red'
    // };
    const [field, meta] = useField(props);
    // const errorText = (meta.error && meta.touched && field.value) && meta.error;
    return <Field
        {...field}
        {...props}
        // helperText={errorText}
        // error={!!errorText}
    >
        {({
              field, // { name, value, onChange, onBlur }
              form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
          }) => {
            return <div className='input-container'>
                <input
                    required
                    autoComplete='off'
                    type="text"
                    // style={(meta.error && meta.touched && field.value) ? errorStyle : {}}
                    {...field}
                />
                <QCLabel name={field.name} content={'YouTube URL'}/>
            </div>;
        }}

    </Field>;

};


export default QCTextField;