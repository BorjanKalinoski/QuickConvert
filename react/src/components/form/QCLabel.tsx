import React from "react";

const QCLabel: React.FC<{ name: string, content: string; }> = (props) => {
    const {name, content} = props;

    return <label className='label-container' htmlFor={name}>
                    <span className='label-content'>
                        {content}
                    </span>
    </label>;

};
export default QCLabel;