import * as React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

import YoutubeForm from "./components/YoutubeForm";

const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        backgroundColor: '#ccc',
        height: '100vh',
    },
    form: {
        height: '55%',
        marginTop: '5%',
        backgroundColor: 'white',
        padding: '1.35%',
        borderRadius: 6
    }
}));

const App = props => {
    const classes = useStyles();

    return (
        <Grid container justify="center" className={classes.container}>
            <Grid item container xs={11} md={8} lg={6} className={classes.form}>
                <YoutubeForm/>
            </Grid>
        </Grid>
    );
    // return (
        // <Container style={{height: 500, borderRadius: 16}} className={"bg-info w-90 my-4 py-5"} fluid>
        //     <Row className="h-25">
                {/*<Col className={"d-flex justify-content-center align-items-center w-20"}> /!* FORMA*!/*/}
                    // <Formik
                    //     initialValues={{url: '', format: 'mp3'}}
                    //     validationSchema={validationSchema}
                    //     onSubmit={(data, {setSubmitting, resetForm}) => {
                    //         setSubmitting(true);
                    //         const {url, format} = data;
                    //         axios({
                    //             method: 'POST',
                    //             url: '/api/videos/download',
                    //             data: {
                    //                 format,
                    //                 url,
                    //             },
                    //             responseType: 'blob'
                    //         }).then(res => {
                    //             setSubmitting(false);
                    //             console.log(res.headers['content-type']);
                    //             const file = new Blob([res.data], {
                    //                 type: res.headers['content-type']
                    //             });
                    //             const fileURL = URL.createObjectURL(file);
                    //             const filename = res.headers['content-disposition'].split('filename=')[1].slice(1, -1);
                    //             // saveAs(fileURL, filename);
                    //         }).catch(e => {
                    //             setSubmitting(false);
                    //         });
                    //
                    //
                    //     }}
                    // >
                    //     {({values, isSubmitting, errors}) => {
                    //         return (
                    //             <Form className={"w-70 d-flex flex-column"}>
                    //                 <div className={"d-flex flex-column align-items-center justify-content-center"}>
                    //                     <MyTextField
                    //                         as={TextField}
                    //                         name="url"
                    //                         className={"my-2 w-100"}
                    //                         label="Link"
                    //                         placeholder="https://www.youtube.com/watch?v=f02mOEt11OQ"
                    //                         // autoFocus
                    //                         variant="outlined"
                    //                     />
                    //                     <div className={"d-flex align-items-center flex-column w-100 my-4"}>
                    //                         <FormLabel
                    //                             className={"center w-100"}>
                    //                             Format
                    //                         </FormLabel>
                    //                         <div role="group"
                    //                              className={"d-flex justify-content-center w-100 flex-wrap"}>
                    //                             <MyRadio type="radio" name="format" value="mp3" label="mp3"/>
                    //                             <MyRadio type="radio" name="format" value="wav" label="wav"/>
                    //                             <MyRadio type="radio" name="format" value="mp4" label="mp4"/>
                    //                             <MyRadio type="radio" name="format" value="flv" label="flv"/>
                    //                             <MyRadio type="radio" name="format" value="avi" label="avi"/>
                    //                         </div>
                    //                     </div>
                    //                 </div>
                    //
                    //                 <div className={"d-flex justify-content-center m-2"}>
                    //                     {
                    //                         !isSubmitting
                    //                             ? <Button disabled={isSubmitting} type="submit">
                    //                                 <GetAppIcon fontSize={'large'}/>
                    //                             </Button>
                    //                             : <CircularProgress/>
                    //                     }
                    //                 </div>
                    //                 {/*<ErrorMessage name='url'>*/}
                    //                 {/*    {(msg) => <Alert severity="error">{msg}</Alert>}*/}
                    //                 {/*</ErrorMessage>*/}
                    //                 {/*<ErrorMessage name='format'>*/}
                    //                 {/*    {(msg) => <Alert severity="error">{msg}</Alert>}*/}
                    //                 {/*</ErrorMessage>*/}
                    //             </Form>);
                    //     }}
                    // </Formik>
                {/*</Col>*/}
            // </Row>
            // <Row className={"h-70 text-center"}> {/*LOGO*/}
                {/*<Col>*/}
                {/*    QUICK CONVERT*/}
                {/*</Col>*/}
            // </Row>/**/
        // </Container>
    // );
};

export default App;

// navigator.clipboard.readText().then(//optional
//     clipText => {
//         console.log('cliptext ');
//         console.log(clipText);
//         @ts-ignore
        // return '';
    // });