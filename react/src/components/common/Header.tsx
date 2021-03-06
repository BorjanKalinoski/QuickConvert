import React from "react";
import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useHeaderStyles} from "../../styles";


interface Props {

}

const headersData = [
    {
        label: "Contact Us",
        href: "/contact",
    },
    {
        label: "F.A.Q",
        href: "/faq",
    },
    {
        label: "About Us",
        href: "/about",
    },
];

const Header: React.FC<Props> = () => {
    const classes = useHeaderStyles();

    const displayDesktop = () => {
        return <Toolbar className={classes.toolbar}>
            {logo}
            <div>
                {getMenuButtons()}
            </div>
        </Toolbar>;
    };
    const logo = (
        <Typography className={classes.logo} variant="h6" component="h1">
            QuickConvert
        </Typography>
    );
    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Button
                    {...{
                        key: label,
                        color: "inherit",
                        to: href,
                        component: Link,
                        className: classes.menuButton
                    }}
                >
                    {label}
                </Button>
            );
        });
    };


    return (<header>
        <AppBar className={classes.header}>{displayDesktop()}</AppBar>
    </header>);

};

export default Header;
