import React from "react";

interface Props {
    content: string;
}

const QCTooltip = ({content}: Props) => {
    return <div
        className='tooltip'
    >
        <span className='tooltip-filler'/>
        <span className='tooltip-text'>
                        {content}
        </span>
    </div>;

};

export default QCTooltip;