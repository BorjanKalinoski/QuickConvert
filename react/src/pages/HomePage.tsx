import React, {useState} from "react";
import {Container} from "@material-ui/core";
import {RouteComponentProps} from 'react-router-dom';
import {QCForm} from "../components";
import {createEmbeddedYoutubeUrl} from "../utils";

interface Props extends RouteComponentProps {}

const HomePage: React.FC<Props> = () => {

    const [url, setUrl] = useState('');

    return (
        <div className={'home-container'}>
            <div className={'title'}>
                Quick Converter
            </div>
            <div className={'subtitle'}>
                Download YouTube videos with one click!
            </div>
            <QCForm setUrl={setUrl}/>
        </div>
    );
};

export default HomePage;










{/*{*/}
{/*    embeddedUrl && <div className={classes.iframeContainer}>*/}
{/*        <iframe*/}
{/*            frameBorder={'none'}*/}
{/*            className={classes.iframe}*/}
{/*            title="QuickConvert"*/}
{/*            loading="lazy"*/}
{/*            src={embeddedUrl}*/}
{/*        />*/}
{/*    </div>*/}
{/*}*/}