// logic for dealing with window resize
// different layout for mobile and computer

function LayoutStatus(windowWidth, windowHeight) {
    const aspectRatio = windowWidth/windowHeight;
    // const isWide = aspectRatio >= aspect_threshold;
    // const isSkinny = !isWide;
    // const isPortrait = windowHeight > windowWidth;
    // const isLandscape = !isPortrait;

    const isWide = windowWidth > 1000 && aspectRatio > 1.3 && windowHeight > 600;
    const isSkinny = aspectRatio < 1 && windowWidth < 800;
    const isWeird = aspectRatio > 1 && windowWidth < 600 && windowHeight < 500;

    let layoutMode;
    if (isWide) layoutMode = 'wide';
    else if (isSkinny) layoutMode = 'skinny';
    else if (isWeird) layoutMode = 'weird';
    else layoutMode = 'medium';

    return { aspectRatio, layoutMode };
}
export default LayoutStatus;
