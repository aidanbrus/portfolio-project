// takes the camera points from panelMidpoint.json and converts into center points for the panels
// need two sets of mid points tho, one for wide mode and one for skinny mode
// generate points for wide, aka split and full panels

import * as THREE from 'three'; 
import camPoints from './panelMidpoint.json'; 

const up = new THREE.Vector3(0, 0, 1);

camPoints.forEach(row => {
    const pos = new THREE.Vector3(row.x, row.y, row.z);

    if (row.type === "split") {
        const wing = pos.clone().cross(up.clone());
        const pointR  = wing.clone().add(new THREE.Vector3(0, 0, 5));
    }
})


// writeFileSync('panelCenters_wide.json', JSON.stringify( {wideCenters}, null, 2));
// writeFileSync('panelCenters_skinny.json', JSON.stringify( {skinnyCenters}, null, 2));

