export default function createEmbeddedYoutubeUrl(url: string): string {
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*)/;
    const matchArray = url.match(regExp);

    if (!matchArray || matchArray[1].length !== 11) {
        return '';
    }

    const videoId = matchArray[1];

    return `https://www.youtube.com/embed/${videoId}`;
};