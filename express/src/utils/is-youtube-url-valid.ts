const isYoutubeUrlValid = (url: string): boolean => {
    const validYoutubeUrlRegExp = /^.*(youtu\.be|youtube\.com|y2u\.be)\/(watch\?(v|feature)=.{11}|embed\/.{11}|.{11}|[ev]\/.{11})((?=[\/?&]).*|(?![\/?&]))$/img;
    return validYoutubeUrlRegExp.test(url);
};

export default isYoutubeUrlValid;