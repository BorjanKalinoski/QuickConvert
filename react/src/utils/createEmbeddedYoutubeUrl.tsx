export default function createEmbeddedYoutubeUrl(youtubeUrl: string): string {
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*)/;
    const matchArray = youtubeUrl.match(regExp);

    if (!matchArray || matchArray[1].length !== 11) {
        return '';
    }

    const videoId = matchArray[1];

    return `https://www.youtube.com/embed/${videoId}`;
};