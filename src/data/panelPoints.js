// takes the camera points from panelMidpoint.json and converts into center points for the panels
// need two sets of mid points tho, one for wide mode and one for skinny mode
// generate points for wide, aka split and full panels

import * as THREE from 'three'; 
import camPoints from './panelMidpoint.json'; 

const up = new THREE.Vector3(0, 0, 1);
// NEED TO CREATE JSON WITH CAMERA DIRECTIONS TO SCALE PANELS INFRONT OF THE CAMERA
camPoints.forEach(row => {
    const pos = new THREE.Vector3(row.x, row.y, row.z);

    if (row.type === "split") {
        const wing = pos.clone().cross(up.clone());
        const opWing = up.clone().cross(pos.clone());

        const tempPoint  = pos.clone().add(new THREE.Vector3(0, 0, 5));
        const tempPointOp = pos.clone().add(new THREE.Vector3(0, 0, 5));

        const tempPoint2 = tempPoint.clone().add(wing.clone());
        const tempPointOp2 = tempPointOp.clone().add(opWing.clone());

        // need to push the points forward by adding  the scaled camera direction vector to push panels forward

        // then add both points to the main new json file
    } else {
        const tempPt = pos.clone().add(new THREE.Vector3(0, 0, 5));
        // const midPt = tempPT.clone().add(// insert camera direction vector here )

        // add point to the new json file
    }
})



