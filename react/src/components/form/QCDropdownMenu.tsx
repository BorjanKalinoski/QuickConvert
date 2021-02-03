import React, {useRef, useState} from "react";
import {formats} from "../../constants";
import Dropdown from 'react-dropdown';
interface Props {
    format: string;
    handleFormatChange: Function;
}

const QCDropdownMenu = (props: Props) => {
    const {handleFormatChange, format: selectedFormat} = props;

    const onFormatChange = (format) => {
        handleFormatChange('format', format);
    };

    return <Dropdown
        className='dropdown-container'
        placeholderClassName='dropdown-container'
        menuClassName='dropdown-menu'
        options={formats.filter(format => format !== selectedFormat)}
        value={selectedFormat}
        onChange={(e) => onFormatChange(e.value)}


    />;
};

export default QCDropdownMenu;
