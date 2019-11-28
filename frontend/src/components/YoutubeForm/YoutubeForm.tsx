import * as React from 'react';
// import './YoutubeForm.less';

import {Formik, Form, Field, ErrorMessage } from 'formik';

import {Input} from 'antd';

const YoutubeForm =()=>(
    <div>
        <h1>This is a youtube Form</h1>
        <Formik
            initialValues={{url:'',convertTo:''}}
            validate={values=>{
                const errors:any={}
                if (!values.url){//validate url
                    errors.url='Required'

                }else if(!values.convertTo){
                    errors.convertTo='Invalid conversion type'        
                }
                return errors;
            }}
            onSubmit={(values,{setSubmitting})=>{
                setTimeout(()=>{
                    alert(JSON.stringify(values,null,2));
                    setSubmitting(false);
                },400);

            }}
        >
            {({isSubmitting})=>(
                <Form>
                    <Field name='url' placeholder='url link' component={Input}/>
                    {/* <Field name='url'
                        render={({field})=>
                        <Input
                        {...field}
                                        placeholder="Enter a valid youtube link"
                                        onChange={(value) => setFieldValue)}
                                        value={url}
                                        required
                                    />
                        console.log(field)
                    }
                    /> */}
                    <ErrorMessage name='url' component='div'/>
                    <Field name='convertTo'  />
                    <ErrorMessage name='url' component='div'/>
                    <button type='submit' disabled={isSubmitting}>
                        Submit
                    </button>

                </Form>


            )}

            </Formik>
    </div>
)
export default YoutubeForm;