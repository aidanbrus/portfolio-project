// logic for dealing with window resize
// different layout for mobile and computer

const aspect_threshold = 1.3;

function layoutStatus(windowWidth, windowHeight) {
    const aspectRatio = windowWidth/windowHeight;
    const isWide = aspectRatio >= aspectRatio;
    const isSkinny = !isWide;

    return {
        isWide,
        isSkinny,
        aspectRatio,
        width: windowWidth,
        height: windowHeight
    };
}
export default layoutStatus;
