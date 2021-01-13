import React from 'react';
import {FieldAttributes, useField} from "formik";
import {FormControlLabel, Radio} from "@material-ui/core";

type QCRadioButtonProps = { label: string; } & FieldAttributes<{}>;

const QCRadioButton: React.FC<QCRadioButtonProps> = ({label, ...props}) => {
    const [field] = useField(props);
    return <FormControlLabel {...field} control={<Radio/>} label={label}/>;
};

export default QCRadioButton;