// function to smoothly map the speed of the camera around the track

function ScrollMap(scrollProgress, trackWeights, camFrames) {
    let i=0;
    while (i<trackWeights.length-1 && scrollProgress > trackWeights[i]) {
        i++;
    }

    const prev = trackWeights[i-1] ?? 0;
    const next = trackWeights[i];

    const denom = next - prev;
    const epsilon = 1e-8; 

    const t = Math.abs(denom) < epsilon ? 0 : (scrollProgress - prev) / denom;

    return (i+t)/(camFrames.length-1);
}

export default ScrollMap;