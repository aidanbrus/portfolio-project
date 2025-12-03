// takes the camera points from panelMidpoint.json and converts into center points for the panels
// need two sets of mid points tho, one for wide mode and one for skinny mode
// generate points for wide, aka split and full panels

import * as THREE from 'three'; 
import camPoints from './panelMidpoint.json';
import camDir from './camDirection.json';

// const up = new THREE.Vector3(0, 0, 1);
const height = new THREE.Vector3.apply(0, 0, 5);

let fullPoints = [];
let skinnyPoints = [];


for (let i=0; i < camPoints.length; i++) {
    const pos = camPoints[i];
    const dir = camDir[i];

    const posVect = new THREE.Vector3(pos.x, pos.y, pos.z);
    const dirVect = new THREE.Vector3(dir.x, dir.y, dir.z);
    const scaleDir = dirVect.multiplyScalar(5);

    if (row.type === "split") {
        const wing = posVect.clone().cross(height.clone());
        const opWing = height.clone().cross(posVect.clone());

        const tempPoint  = pos.clone().add(height.clone());
        const tempPointOp = pos.clone().add(height.clone());

        const tempPoint2 = tempPoint.clone().add(wing.clone());
        const tempPointOp2 = tempPointOp.clone().add(opWing.clone());

        const finalPoint = tempPoint2.clone().add(scaleDir.clone())
        const finalPointOp = tempPointOp2.clone().add(scaleDir.clone())

        const tempMidSplit = posVect.clone().add(scaleDir.clone());
        const finalMidSplit = tempMidSplit.clone().add(height.clone());

        const rowR = {x: finalPoint.x, y: finalPoint.y, z: finalPoint.z};
        const rowL = {x: finalPointOp.x, y: finalPointOp.y, z: finalPointOp.z};

        const rowM = {x: finalMidSplit.x, y: finalMidSplit.y, z: finalMidSplit.z};


    } else {
        const tempPt = pos.clone().add(new THREE.Vector3(0, 0, 5));
        // const midPt = tempPT.clone().add(// insert camera direction vector here )

        // add point to the new json file
    }


}



