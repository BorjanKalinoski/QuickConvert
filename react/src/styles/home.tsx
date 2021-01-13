import {makeStyles} from "@material-ui/core";

export const useHomePageStyles = makeStyles((theme)=>({
    root: {
        marginTop: 20,
        backgroundColor: '#f2f8ff',
        textAlign: 'center',
        padding: '14px 20px',
        width: '60%',
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
            width: '80%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    iframeContainer: {
        width: '65%',
        margin: '0 auto',
        marginTop: 10,
        height: '20vw',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '45vw',
            marginTop: 6,
        },
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 0,
        boxShadow: '0 10px 25px rgba(0,0,0,.2)',
        borderRadius: 4,
    }
}));