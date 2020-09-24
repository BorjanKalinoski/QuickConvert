import * as yup from 'yup';
import {URL_NOT_VALID, FORMAT_NOT_VALID} from '../constants/errors';
import {formats} from "../constants/formats";

const validationSchema = yup.object().shape({
    url: yup.string().required(URL_NOT_VALID).matches(/^.*(youtu\.be|youtube\.com|y2u\.be)\/(watch\?(v|feature)=.{11}|embed\/.{11}|.{11}|[ev]\/.{11})((?=[\/?&]).*|(?![\/?&]))$/img, URL_NOT_VALID),
    format: yup.string().required(FORMAT_NOT_VALID).oneOf(formats, FORMAT_NOT_VALID)    
});

export default validationSchema;


