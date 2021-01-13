import {useInterval} from "./";
import {useEffect, useRef, useState} from "react";
import {randomNumberFromInclusiveInterval} from "../utils";

export default function useFakeDownloadProgress(isSubmitting: boolean, isDownloadFinished?: boolean): number {
    const [progress, setProgress] = useState(0);
    const step = useRef(0.001);
    const incrementFactor = useRef(0);

    useEffect(() => {
        setProgress(0);
        step.current = 0.005;
        incrementFactor.current = 0;
    }, [isSubmitting]);

    useInterval(() => {
        if (isDownloadFinished) {
            setProgress(100);
        } else {
            incrementFactor.current += step.current;
            setProgress(Math.round(Math.atan(incrementFactor.current) / (Math.PI / 2) * 100 * 1000) / 1000);
            step.current = randomNumberFromInclusiveInterval();
        }
    }, isSubmitting ? 125 : null);

    return progress;
};

