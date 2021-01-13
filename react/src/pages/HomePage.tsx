import React, {useState} from "react";
import {Container} from "@material-ui/core";
import {RouteComponentProps} from 'react-router-dom';
import {QCForm} from "../components";
import {useHomePageStyles} from "../styles";
import {createEmbeddedYoutubeUrl} from "../utils";

interface Props extends RouteComponentProps {}

const HomePage: React.FC<Props> = () => {
    const classes = useHomePageStyles();

    const [url, setUrl] = useState('');

    const embeddedUrl = createEmbeddedYoutubeUrl(url);

    return (<Container className={classes.root}>
        <QCForm setUrl={setUrl}/>
        {
            embeddedUrl && <div className={classes.iframeContainer}>
                <iframe
                    frameBorder={'none'}
                    className={classes.iframe}
                    title="QuickConvert"
                    loading="lazy"
                    src={embeddedUrl}
                />
            </div>
        }
    </Container>);
};

export default HomePage;