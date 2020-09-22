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

};

export default App;

// navigator.clipboard.readText().then(//optional
//     clipText => {
//         console.log('cliptext ');
//         console.log(clipText);
//         @ts-ignore
        // return '';
    // });