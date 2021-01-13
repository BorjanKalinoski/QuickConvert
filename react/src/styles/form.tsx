import {makeStyles} from "@material-ui/core";

export const useFormStyles = makeStyles((theme) => ({
    inputRow: {
        marginBottom: 10,
    },
    textField: {
        width: '100%',
        fontSize: 6,
        maxHeight: 56
    },
    downloadButtonContainer: {
        backgroundColor: "#ec524b",
        cursor: 'pointer',
        maxHeight: 56
    },
    downloadButton:{
        width: '100%',
        height: '100%',
        borderRadius: 0
    }
}));