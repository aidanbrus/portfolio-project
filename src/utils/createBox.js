// for creating the gantry
import * as THREE from 'three';

// center is a vector3, axis is a string, and the rest are scalars
function makeGantry (center, axis, length, width, height) {
    // creating the points for each box
    // let beamCurve;
    let vectorStart = null;
    let vectorEnd = null;
    let addV = null;
    let subV = null;
    let normal = null;
    let binormal = null;
    const positions = [];
    const indices = [];

    const halfLen = length/2;
    if (axis === 'x') {
        addV = new THREE.Vector3(halfLen, 0, 0);
        subV = new THREE.Vector3(-halfLen, 0, 0);

        vectorStart = center.clone().add(addV);
        vectorEnd = center.clone().add(subV);

        normal = new THREE.Vector3( 0, -1, 0);
        binormal = new THREE.Vector3( 0, 0, 1);
    } else if (axis === 'y') {
        addV = new THREE.Vector3( 0, halfLen, 0);
        subV = new THREE.Vector3( 0, -halfLen, 0);

        vectorStart = center.clone().add(addV);
        vectorEnd = center.clone().add(subV);

        normal = new THREE.Vector3( 0, 0, -1);
        binormal = new THREE.Vector3( 1, 0, 0);
    } else {
        addV = new THREE.Vector3( 0, 0, halfLen);
        subV = new THREE.Vector3( 0, 0, -halfLen);

        vectorStart = center.clone().add(addV);
        vectorEnd = center.clone().add(subV);

        normal = new THREE.Vector3( -1, 0, 0);
        binormal = new THREE.Vector3( 0, 1, 0);
    }

    let beamCurve = new THREE.CatmullRomCurve3( [
        vectorStart,
        center,
        vectorEnd
    ] )
    
    const shape = [
        new THREE.Vector2(-width/2, -height/2),
        new THREE.Vector2( width/2, -height/2),
        new THREE.Vector2( width/2,  height/2),
        new THREE.Vector2(-width/2,  height/2)
    ];

    const pathPoints = beamCurve.getPoints(9);
    for (let i = 0; i < pathPoints.length; i++) {
        const point = pathPoints[i];

        let ringVertices = [];
        for (let p = 0; p < shape.length; p++) {
            const sp = shape[p];
            const vertex = new THREE.Vector3()
            .addScaledVector(normal, sp.x)
            .addScaledVector(binormal, sp.y)
            .add(point);
            ringVertices.push(vertex);
        }

        // Push vertices to buffer
        ringVertices.forEach(v => positions.push(v.x, v.y, v.z));

        // create indices for faces
        if (i > 0) {
            const base = i * shape.length;
            const prevBase = (i - 1) * shape.length;
            for (let p = 0; p < shape.length; p++) {
                const nextP = (p + 1) % shape.length;
                indices.push(prevBase + p, base + p, base + nextP);
                indices.push(prevBase + p, base + nextP, prevBase + nextP);
            }
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhysicalMaterial({
        color: 'rgba(21, 37, 53, 1)',
        side: THREE.DoubleSide, // prevents dark “missing” faces until normals are perfect
        emissive: 'rgba(0, 44, 105, 1)',
        emissiveIntensity: 2.0
    });

    const beam = new THREE.Mesh(geometry, material);

    return beam;
}

export default makeGantry;