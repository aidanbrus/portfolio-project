// takes the camera points from panelMidpoint.json and converts into center points for the panels
// need two sets of mid points tho, one for wide mode and one for skinny mode
// generate points for wide, aka split and full panels

import * as THREE from 'three'; 
import fs from 'fs';
import camPoints from './panelMidpoint.json' with {type: 'json'};
import camDir from './camDirection.json' with {type: 'json'};

// const up = new THREE.Vector3(0, 0, 1);
const height = new THREE.Vector3(0, 0, 5);

let fullPoints = [];
let skinnyPoints = [];


for (let i=0; i < camPoints.length; i++) {
    const pos = camPoints[i];
    const dir = camDir[i];

    const posVect = new THREE.Vector3(pos.x, pos.y, pos.z);
    const dirVect = new THREE.Vector3(dir.x, dir.y, dir.z);
    const scaleDir = dirVect.multiplyScalar(5);
    // console.log(posVect);

    if (pos.type === "split") {
        const wing = dirVect.clone().cross(height.clone());
        const tempPoint  = posVect.clone().add(height.clone());
        const tempPoint2 = tempPoint.clone().add(wing.clone());
        const finalPoint = tempPoint2.clone().add(scaleDir.clone())

        const opWing = height.clone().cross(dirVect.clone());
        const tempPointOp = posVect.clone().add(height.clone());
        const tempPointOp2 = tempPointOp.clone().add(opWing.clone());
        const finalPointOp = tempPointOp2.clone().add(scaleDir.clone());

        const tempMidSplit = posVect.clone().add(scaleDir.clone());
        const finalMidSplit = tempMidSplit.clone().add(height.clone());

        const rowR = {x: finalPoint.x, y: finalPoint.y, z: finalPoint.z};
        const rowL = {x: finalPointOp.x, y: finalPointOp.y, z: finalPointOp.z};

        const rowM = {x: finalMidSplit.x, y: finalMidSplit.y, z: finalMidSplit.z};

        skinnyPoints.push({ ...rowM});
        fullPoints.push({ ...rowR});
        fullPoints.push({ ...rowL});
    } else {
        const tempMidSplit = posVect.clone().add(scaleDir.clone());
        const finalMidSplit = tempMidSplit.clone().add(height.clone());

        const rowM = {x: finalMidSplit.x, y: finalMidSplit.y, z: finalMidSplit.z};

        fullPoints.push({ ...rowM});
        skinnyPoints.push({ ...rowM});
    }
}

fs.writeFileSync('fullPoints.json', JSON.stringify(fullPoints, null, 2));
fs.writeFileSync('skinnyPoints.json', JSON.stringify(skinnyPoints, null, 2));



