import {makeStyles} from "@material-ui/core";

export const useHeaderStyles = makeStyles(() => ({
    header: {
        backgroundColor: '#c70039',
        // backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "118px",
        // backgroundColor: "#ec524b",
        // ec5858 -red (better)
        //    f6d887- yellow
        //a9294f - dark red (not like)
        // 6f9eaf - light blue (like)
        //c70039 - red (not bad)
        // backgroundColor: "#ec524b", reddish
        // backgroundColor: "#f05454",
        //

    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    }
}));
