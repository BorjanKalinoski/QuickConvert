import * as yup from 'yup';
import {formats, FORMAT_NOT_VALID, URL_NOT_VALID} from "./index";

const validationSchema = yup.object().shape({
    url: yup.string().required(URL_NOT_VALID).matches(/^.*(youtu\.be|youtube\.com|y2u\.be)\/(watch\?(v|feature)=.{11}|embed\/.{11}|.{11}|[ev]\/.{11})((?=[\/?&]).*|(?![\/?&]))$/img, URL_NOT_VALID),
    format: yup.string().required(FORMAT_NOT_VALID).oneOf(formats, FORMAT_NOT_VALID)
});

export default validationSchema;