import React from "react";
import {RouteComponentProps} from "react-router-dom";

interface Props extends RouteComponentProps {}


const AboutPage: React.FC<Props> = () => {
    return (<div>
        This is ABOUT page
    </div>);
};
export default AboutPage;