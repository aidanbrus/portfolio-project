// logic for dealing with window resize
// different layout for mobile and computer

function LayoutStatus(windowWidth, windowHeight) {
    const aspectRatio = windowWidth/windowHeight;
    // const isWide = aspectRatio >= aspect_threshold;
    // const isSkinny = !isWide;
    const isPortrait = windowHeight > windowWidth;
    const isLandscape = !isPortrait;

    const isWide = width > 1000 && aspectRatio > 1.3 && height > 600 && isLandscape;
    const isSkinny = aspectRatio < 1 && width < 800 && isPortrait;
    const isWeird = aspect > 1.3 && height < 600;

    let layoutMode;
    if (isWide) layoutMode = 'wide';
    else if (isSkinny) layoutMode = 'skinny';
    else if (isWeird) layoutMode = 'mobileWide';
    else layoutMode = 'medium';

    return { aspectRatio, layoutMode };
}
export default LayoutStatus;
