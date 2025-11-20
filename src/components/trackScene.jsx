// home for the background of my track 

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { emissive, materialReflectivity, materialSpecularIntensity, objectDirection } from 'three/tsl';
import { newReflector } from '../utils/newReflector.js';
import { useState } from 'react';
// import Navbar from './navbar.jsx'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/Addons.js';
import '../styles/App.css';
// import LayoutStatus from '../utils/layoutManager.js';
import makeGantry from '../utils/createBox.js';
import ScrollMap from '../utils/scrollMap.js';


function TrackScene( {setNavMode, layoutStyle, camAspect, sizeWindow, setVisNavbar, setProgNav} ) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const renderRef = useRef(null);
  const animationRef = useRef(null);
  const cssRenderRef = useRef(null);
  const cssRef = useRef(null);
  const camDist = useRef(0);
  const camRef = useRef(null);
  const compRef = useRef(null);
  const scrollRef = useRef(null);

  const {width, height} = sizeWindow;

  let trackWeights = [];
  let camFrames = [];

  useEffect(() => {
        //if (!mountRef.current) return;

        let scene, camera, renderer, composer, cameraPos;
        let curve;
        let loadingScene, loadAnimID, tracer, manager, Loadtrack, elapsed;
        let mirror, track, botPlane;
        let rightFoot, leftFoot, rightPost, leftPost, mainBar;
        let loadComplete = false;
        let tracerT = 0;
        let speed = 0.25;
        let lastFrameTime = performance.now();
        let loadStartTime = performance.now();
        let deltaCam = 1.0;
        let camPhase = 0.0;
        let camProgress1 = 0.0;
        let camProgress2 = 0.0;
        let camProgress3 = 0.0;
        let camSpeed = 0.004;
        let phaseTwoClick = false;
        let switchCheck = false;
        let cssRenderer, sceneCSS;
        let storedRotation;
        //let camFrames = [];
        let lasT, newDelta;
        // let trackWeights = [];
        let loadingFlag = true;
        let aspectRatio, layoutMode;

        function createTrack() {
            // trace of the track
            curve = new THREE.CatmullRomCurve3( [
                new THREE.Vector3( 0, 5, 0 ), // almost actual start line 
                new THREE.Vector3( -76, 5, 0 ), // turn 1 start
                new THREE.Vector3( -77.5, 6, 0), 
                new THREE.Vector3( -77.8, 7, 0),
                new THREE.Vector3( -77.5, 8.4, 0),
                new THREE.Vector3( -73, 13.5, 0 ), // turn 1 end
                new THREE.Vector3( -66, 17.5, 0), // turn 1a start
                new THREE.Vector3( -58, 20, 0), // turn 1a end
                new THREE.Vector3( -10, 20, -5), // turn 2 start
                new THREE.Vector3( -7.7, 21, -5),
                new THREE.Vector3( -6.8, 22, -5),
                new THREE.Vector3( -6.15, 23.8, -5),
                new THREE.Vector3( -5.95, 25, -5),
                new THREE.Vector3( -6.15, 26.2, -5),
                new THREE.Vector3( -7, 28, -5), // -7, 28, -5
                new THREE.Vector3( -9, 29.5, -5), // turn 2 end
                new THREE.Vector3( -31, 38.5, -8), // turn 3 start
                new THREE.Vector3( -32.5, 40, -8),
                new THREE.Vector3( -34, 43, -8), // turn 3 end
                new THREE.Vector3( -44, 85, -4.5),
                new THREE.Vector3( -45, 97.5, -4.25),
                new THREE.Vector3( -45, 100, -4), // turn 4 start
                new THREE.Vector3( -44.5, 107.5, -3.6),
                new THREE.Vector3( -46, 110, -3.2),
                new THREE.Vector3( -50, 114, -2.8), // turn 4 end
                new THREE.Vector3( -60, 122, -2.4), // turn 5 start
                new THREE.Vector3( -67, 130, -2),
                new THREE.Vector3( -67.5, 133, -1.6),
                new THREE.Vector3( -67, 136, -1.2), 
                new THREE.Vector3( -63.5, 139, -0.8), 
                new THREE.Vector3( -60, 140, -0.4), // turn 5 end
                new THREE.Vector3( -20, 135.5, 0), // turn 6 start
                new THREE.Vector3( -14, 134.5, 0),
                new THREE.Vector3( -11, 133, 0), 
                new THREE.Vector3( -10, 131, 0),
                new THREE.Vector3( -10, 130, 0), // turn 6 end
                new THREE.Vector3( -10, 127, 0), // turn 7 start
                new THREE.Vector3( -9.5, 125.5, 0),
                new THREE.Vector3( -8, 124, 0),// turn 7 end
                new THREE.Vector3( 6, 116, 0), // turn 8 start
                new THREE.Vector3( 10, 115, 0),
                new THREE.Vector3( 14, 116, 0), // turn 8 end
                new THREE.Vector3( 22, 122, 0), // turn 9 start
                new THREE.Vector3( 25, 122.5, 0),
                new THREE.Vector3( 28, 120, 0), // turn 9 end
                new THREE.Vector3( 36, 109, 0), // turn 10 start
                new THREE.Vector3( 41.4, 103, 0), 
                new THREE.Vector3( 45, 101, 0), // turn 10 end
                new THREE.Vector3( 57.5, 96, 0), // turn 11 start
                new THREE.Vector3( 62, 93, 0),
                new THREE.Vector3( 63, 90, 0), // turn 11 end
                new THREE.Vector3( 60.5, 36, 0), /// turn 12 start
                new THREE.Vector3( 60, 33, 0), 
                new THREE.Vector3( 58.5, 30, 0), 
                new THREE.Vector3( 57, 29, 0),
                new THREE.Vector3( 54, 29, 0), // turn 12 end
                new THREE.Vector3( 41, 33, 0), // turn 12a
                new THREE.Vector3( 29, 33, 0), // turn 13 start
                new THREE.Vector3( 26, 32, 0),
                new THREE.Vector3( 23.5, 28.5, 0),
                new THREE.Vector3( 23, 26.5, 0),
                new THREE.Vector3( 23.5, 24.5, 0),
                new THREE.Vector3( 26, 21, 0),
                new THREE.Vector3( 29, 20, 0), // turn 13 end
                new THREE.Vector3( 52, 20, 0), // turn 14 start
                new THREE.Vector3( 55, 19.3, 0),
                new THREE.Vector3( 58, 17.1, 0),
                new THREE.Vector3( 59.5, 14.4, 0),
                new THREE.Vector3( 60, 12.5, 0),
                new THREE.Vector3( 59.5, 10.5, 0),
                new THREE.Vector3( 58, 7.9, 0),
                new THREE.Vector3( 55, 5.7, 0),
                new THREE.Vector3( 52, 5, 0), // turn 14 end
                new THREE.Vector3( 51.5, 5, 0),
                new THREE.Vector3( 51, 5, 0),
                new THREE.Vector3( 0, 5, 0)
            ] )

            // const points = curve.getPoints( 100 );

            const thickTrack = 3, widthTrack = 3;

            const shape = [
                new THREE.Vector2(-widthTrack/2, -thickTrack/2),
                new THREE.Vector2( widthTrack/2, -thickTrack/2),
                new THREE.Vector2( widthTrack/2,  thickTrack/2),
                new THREE.Vector2(-widthTrack/2,  thickTrack/2)
            ];

            const up = new THREE.Vector3(0, 0, 1); // fixed up direction

            function getAdaptivePoints(curve, baseDivisions, maxExtra) { // add = 750,8 here to baseDivisions/maxExtra?
                const points = [];
                
                let prevTangent = null;
                
                for (let i = 0; i <= baseDivisions; i++) {
                    const t = i / baseDivisions;
                    const point = curve.getPoint(t);
                    const tangent = curve.getTangent(t).normalize();
                    
                    if (prevTangent) {
                        // Curvature measure = how much direction changes
                        const angle = Math.acos(Math.min(Math.max(prevTangent.dot(tangent), -1), 1));
                        
                        // Map angle to number of extra segments
                        const extra = Math.ceil((angle / Math.PI) * maxExtra);
                        
                        // Add intermediate points if curvature is high
                        for (let j = 1; j <= extra; j++) {
                            const t2 = (i - 1 + j / (extra + 1)) / baseDivisions;
                            points.push(curve.getPoint(t2));
                        }
                    }
                    
                    points.push(point);
                    prevTangent = tangent;
                }
                
                return points;
            }

            let firstRing = [];
            let firstNormal = null;
            let firstBinormal = null;

            const positions = [];
            const indices = [];

            let prevNormal = new THREE.Vector3(1, 0, 0); // starting guess

            const pathPoints = getAdaptivePoints(curve, 200, 8); // base 200, up to 8x more in corners

            for (let i = 0; i < pathPoints.length; i++) {
                const point = pathPoints[i];

                // Compute tangent directly from neighboring points
                let tangent;
                if (i === 0) {
                    tangent = pathPoints[i + 1].clone().sub(point).normalize() 
                } else if (i === pathPoints.length - 1) {
                    tangent = point.clone().sub(pathPoints[i - 1]).normalize(); 
                } else {
                    tangent = pathPoints[i + 1].clone().sub(pathPoints[i - 1]).normalize();
                }

                if (i === 0) {
                    prevNormal = new THREE.Vector3().crossVectors(up, tangent).normalize();

                } else if ( i > pathPoints.length - 1) {
                    prevNormal = new THREE.Vector3().crossVectors(up, tangent).normalize();
                } else {
                    const projection = prevNormal.clone().projectOnVector(tangent);
                    prevNormal.sub(projection).normalize();
                }

                const binormal = new THREE.Vector3().crossVectors(tangent, prevNormal).normalize();

                // handle last ring
                let ringVertices = [];
                if (i === pathPoints.length - 1) {
                    // Force last ring = first ring
                    ringVertices = firstRing.map(v => v.clone());
                } else {
                    // Build normal ring
                    for (let p = 0; p < shape.length; p++) {
                        const sp = shape[p];
                        const vertex = new THREE.Vector3()
                        .addScaledVector(prevNormal, sp.x)
                        .addScaledVector(binormal, sp.y)
                        .add(point);
                        ringVertices.push(vertex);
                    }
                }

                // Push vertices to buffer
                ringVertices.forEach(v => positions.push(v.x, v.y, v.z));

                // Save first ring for reuse
                if (i === 0) {
                    firstRing = ringVertices.map(v => v.clone());
                    firstNormal = prevNormal.clone();
                    firstBinormal = binormal.clone();
                }

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
            };

            // sampling track for camera purposes
            if (!loadingFlag){
                const camSamples = 2500;
                console.log('tally 1 camframes');
                for (let i=0; i<= camSamples; i++) {
                    const t = i/camSamples;
                    const pos = curve.getPointAt(t);
                    const tan = curve.getTangentAt(t);
                    tan.normalize();
                    camFrames.push({pos, tan})
                }
            };

            // prep for camera animation in phase 3
            if (!loadingFlag) {
                trackWeights = compWeight(camFrames);
            };
            

            // assign vertices to geometry (needs indices, uvs, etc. for full mesh)
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            // geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
            geometry.setIndex(indices);
            geometry.computeVertexNormals();

            const material = new THREE.MeshPhysicalMaterial({
                color: 'rgba(21, 37, 53, 1)',
                side: THREE.DoubleSide, // prevents dark “missing” faces until normals are perfect
                emissive: 'rgba(24, 111, 199, 1)',
                // emissiveMap: emissiveTexture, // need to make a map
                // metalness: 0.8,
                // roughness: 0.2,
                emissiveIntensity: 2.0
            });

            //const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
            // .MeshPhongMaterial({color: '#8AC'})
            // .MeshBasicMaterial( { color: 0x00ff00 } )
            // .MeshLambertMaterial
            // const material = new THREE.MeshPhongMaterial( { color: '#8AC' } );
            const track = new THREE.Mesh( geometry, material ) ;
            
            // // info for the camera
            // camFrames.push({tangent, prevNormal, binormal, position: pathPoints.clone()});

            return track;
        }

        function createReflector() {
            const reflectorGeo = new THREE.PlaneGeometry(1600, 1000);
            const reflector = new newReflector(reflectorGeo, {
                clipBias: 0.003,
                textureWidth: width * window.devicePixelRatio,
                textureHeight: height * window.devicePixelRatio,
                color: 'rgba(78, 77, 81, 1)',
            });

            reflector.material.transparent = true;
            // reflector.material.opacity = 0.875;
            reflector.material.needsUpdate = true;

            reflector.translateX(20);
            reflector.translateY(25);
            reflector.translateZ(-10);
            // scene.add(reflector);
            return reflector;
        }

        function createPlane() {
            // create a canvas for lines
            const size = 512;
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = size;
            const ctx = canvas.getContext('2d');

            // background color
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, size, size);

            // Draw grid lines
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2; // thickness in pixels
            const divisions = 2;
            const spacing = canvas.width / divisions;
            for (let i = 0; i <= divisions; i++) {
                ctx.beginPath();
                ctx.moveTo(i * spacing, 0);
                ctx.lineTo(i * spacing, canvas.height);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(0, i * spacing);
                ctx.lineTo(canvas.width, i * spacing);
                ctx.stroke();
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10,10);

            const geometryPlane = new THREE.PlaneGeometry( 1600, 1000 );
            const materialPlane = new THREE.MeshBasicMaterial( {
                map: texture,
                emissiveMap: texture,
                emissive : "rgba(52, 156, 208, 1)",
                emissiveIntensity: 2.0,
                side: THREE.DoubleSide
            } );
            const botPlane = new THREE.Mesh( geometryPlane, materialPlane );
            botPlane.translateX(20);
            botPlane.translateY(25);
            botPlane.translateZ(-20);
            botPlane.receiveShadow = true;
            //scene.add(botPlane);
            return botPlane;
        }

        init(); 

        function init() {
            initLoadingScene();
            animate();
            // old: animationLoader();
        }

        function initLoadingScene() {
            // scene
            loadingScene = new THREE.Scene();
            sceneRef.current = loadingScene;
            camera = new THREE.PerspectiveCamera( 75, camAspect, 0.1, 1000);
            // 
            // old window stuff: window.innerWidth/window.innerHeight
            // new stuff: mountRef.current.clientWidth / mountRef.current.clientHeight
            camera.position.set( 0, 72.5, 500);
            camera.lookAt(0,72.5,0);
            camRef.current = camera;

            // loadingScene.fog = new THREE.FogExp2(0x000000, 0.004);

            // renderer
            renderer = new THREE.WebGLRenderer({ antialias:true });
            renderer.setSize(width, height);
            // old setSize arguments: window.innerWidth, window.innerHeight
            // new ones: mountRef.current.clientWidth, mountRef.current.clientHeight
            renderer.setClearColor(0x000000, 1);
            mountRef.current.appendChild(renderer.domElement);
            // old code before react: document.body.appendChild(renderer.domElement);
            renderRef.current = renderer;

            // css2d renderer
            cssRenderer = new CSS2DRenderer();
            cssRenderer.setSize(width, height);
            cssRef.current.appendChild(cssRenderer.domElement);
            cssRenderRef.current = cssRenderer;

            // low quality version of background
            loadingScene.background = new THREE.Color(0x0a0a1a);

            // track
            Loadtrack = createTrack();
            loadingScene.add(Loadtrack);

            // tracer for loading animation
            tracer = new THREE.Mesh(
                new THREE.SphereGeometry(4, 16, 8),
                new THREE.MeshBasicMaterial({color:'rgba(157, 244, 255, 1)'})
            );
            loadingScene.add(tracer);

            composer = new EffectComposer(renderer);
            compRef.current = composer;

        }

        function handleLoadComplete() {
            const now = performance.now();
            elapsed = now - loadStartTime;

            if (elapsed > 4000 && tracerT < 0.01) {
                camPhase = 1.0;
                loadComplete = true;
            } else {
                const remaining = 4000 - elapsed;
                setTimeout(() => {
                    camPhase = 1.0;
                    loadComplete = true; 
                }, remaining);
            }
        }

        function initMainScene() {
            // fog
            scene = new THREE.Scene();
            sceneRef.current = scene;
            scene.fog = new THREE.FogExp2(0x000000, 0.004);

            // scene
            scene.background = new THREE.Color(0x0a0a1a);

            // track
            track = createTrack();
            scene.add(track);

            // top plane
            mirror = createReflector();
            scene.add(mirror);

            // bottom plane
            botPlane = createPlane();
            scene.add(botPlane);

            // gantry
            rightFoot = makeGantry(new THREE.Vector3( -4, 10, 0.25), 'x', 4, 0.5, 0.5);
            rightPost = makeGantry(new THREE.Vector3( -4, 10, 3), 'z', 5, 0.25, 0.25);
            leftFoot = makeGantry(new THREE.Vector3( -4, 0, 0.25), 'x', 4, 0.5, 0.5);
            leftPost = makeGantry(new THREE.Vector3( -4, 0, 3), 'z', 5, 0.25, 0.25);
            mainBar = makeGantry(new THREE.Vector3( -4, 5, 5), 'x', 0.25, 9.75, 1);
            scene.add(rightFoot);
            scene.add(rightPost);
            scene.add(leftFoot);
            scene.add(leftPost);
            scene.add(mainBar);

            // css2d renderer
            // const cssRenderer = new CSS2DRenderer();
            // cssRenderer.setSize(window.innerWidth, window.innerHeight);
            // mountRef.current.appendChild(cssRenderer.domElement);
            // cssRenderRef.current = cssRenderer;

            // sceneCSS = new THREE.Scene();

            // navbar

            // postprocessing w/ bloom
            const renderScene = new RenderPass(scene, camera);
            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2( width, height),
                1.0, // strength
                1.25, // radius
                0.05 // threshold
            );

            // composer = new EffectComposer(renderer);
            composer.addPass(renderScene);
            composer.addPass(bloomPass);
            compRef.current = composer;

        }

        // on click for camera animation
        window.addEventListener('click', () => {
            phaseTwoClick = true;
        });

        // tracking scrolling for main animation
        // const scrollContainer = document.getElementById('inner-scroll');
        // console.log(scrollContainer);

        // const trackScroll = () => {
        //     const scrollY = scrollContainer.scrollTop;
        //     const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        //     console.log(scrollY);
        //     console.log(scrollHeight);
        //     //camDist.current = scrollY/scrollHeight; // can scale how far scroll goes
        //     const scrollProgress = scrollY/scrollHeight;
        //     camDist.current = scrollMap(scrollProgress, trackWeights);
        //     //console.log(trackWeights);
        //     // console.log(camDist);
        // };

        // scrollContainer.addEventListener('scroll',trackScroll);

        function compWeight(camFrames) {
            let totalWeight = 0;
            const curveWeights = [];

            for (let j=1; j< camFrames.length-1; j++) {
                const prevTan = camFrames[j-1].tan;
                const nextTan = camFrames[j+1].tan;
                const curvature = prevTan.clone().sub(nextTan).length();
                //const curvature = nextTan.clone().sub(prevTan).length();

                const weight = 1/(1-1.55*curvature);
                totalWeight += weight;
                curveWeights.push(weight);
            }
            
            let cumulative = 0;
            const normWeights = [0];

            for (let j=0; j<curveWeights.length; j++) {
                cumulative += curveWeights[j] / totalWeight;
                normWeights.push(cumulative)
            }
            return normWeights
        }

        // function scrollMap(scrollProgress, trackWeights) {
        //     let i=0;
        //     while (i<trackWeights.length-1 && scrollProgress > trackWeights[i]) {
        //         i++;
        //     }

        //     const prev = trackWeights[i-1] ?? 0;
        //     const next = trackWeights[i];

        //     const denom = next - prev;
        //     const epsilon = 1e-8; 

        //     const t = Math.abs(denom) < epsilon ? 0 : (scrollProgress - prev) / denom;

        //     return (i+t)/(camFrames.length-1);
        // }

        function updateCamera(camFrames) {
            if (camPhase == 1.0){
                // transition from loading camera spot to initial main spot
                setVisNavbar(false);
                setTimeout(() => {
                camProgress1 += camSpeed;
                if (camProgress1 > 1) {
                    camProgress1 = 1;
                    camPhase = 2.0; // move to next phase
                }
                let easing = easeIOCubic(camProgress1);

                camera.position.z = THREE.MathUtils.lerp(500, 150, easing);
                }, 250);

            } else if (camPhase == 2.0 && phaseTwoClick) {
                // transition from top down to on track
                camProgress2 += camSpeed;
                if (camProgress2 > 1) {
                    camProgress2 = 1;
                    camPhase = 3.0; // move to next phase
                    
                    const camEuler2 = new THREE.Euler().setFromQuaternion(camera.quaternion);
                    storedRotation = new THREE.Quaternion().setFromEuler(camEuler2);
                    storedRotation.normalize();

                    
                }
                let easing = easeIOCubic(camProgress2);

                // camera.position.x = THREE.MathUtils.lerp(500, 150, easing);
                camera.position.y = THREE.MathUtils.lerp(72.5, 5, easing);
                camera.position.z = THREE.MathUtils.lerp(150, 3, easing);
                camera.rotation.y = THREE.MathUtils.lerp(0, Math.PI/2, easing);
                camera.rotation.z = THREE.MathUtils.lerp(0, Math.PI/2, easing);


            } else if (camPhase == 3.0) {
                // once user is on track
                setVisNavbar(true);
                const camProg = camDist.current;
                const totalFrames = camFrames.length;
                const index = Math.floor(camProg * (totalFrames -1));
                const nextIndex = Math.min(index+1, totalFrames-1);
                const prevIndex = Math.max(index-1, 0);
                const alpha = (camProg *(totalFrames - 1)) - index;

                const camPos = camFrames[index].pos.clone().lerp(camFrames[nextIndex].pos, alpha);
                camPos.z = camPos.z + 3;
                const camTan = camFrames[index].tan.clone().lerp(camFrames[nextIndex].tan, alpha).normalize();

                camera.position.copy(camPos);

                //ensuring that the camera is the right orientation and direction
                const quatTan = camTan.clone();
                quatTan.z = 0; 
                if (quatTan.lengthSq() < 1e-6) return;
                quatTan.normalize();

                const camYaw3 = Math.atan2(quatTan.x, quatTan.y);
                const quatYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,-1), camYaw3);
                quatYaw.normalize();

                const eulerCam3 = new THREE.Euler().setFromQuaternion(storedRotation, "XYZ");
                eulerCam3.y = 0;
                eulerCam3.z = -eulerCam3.z;
                
                const pitRollQuat = new THREE.Quaternion().setFromEuler(eulerCam3);
                camera.quaternion.copy(quatYaw).multiply(pitRollQuat);

            };
        };

        // function for easying camera movements
        function easeIOCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animate() {
            animationRef.current = requestAnimationFrame(animate);

            if (!switchCheck) {
                const now = performance.now();
                const delta = (now - lastFrameTime) / 1000;
                lastFrameTime = now;

                tracerT = (tracerT + speed * delta) % 1;
                tracer.position.copy(curve.getPointAt(tracerT));
                tracer.position.y += 0.5;

                renderer.render(loadingScene, camera);

                manager = new THREE.LoadingManager();
                manager.onLoad = handleLoadComplete();

                if (loadComplete === true) {
                    switchCheck = true;
                    loadingFlag = false;
                    initMainScene();
                }
            } else {
                updateCamera(camFrames);
                
                composer.render(scene, camera);
                cssRenderer.render(scene, camera);

            }     
        }

        // clean up, for reloads and such
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            // window.removeEventListener('resize', onWindowResize);
            // window.removeEventListener('click',);
            // window.removeEventListener('scroll',);

            if (sceneRef.current) {
                sceneRef.current.traverse((object) => {
                    if (object.isMesh) {
                        if (object.geometry) object.geometry.dispose();
                        if (object.material) {
                            if (Array.isArray(object.material)) {
                                object.material.forEach((m) => m.dispose());
                            } else {
                                object.material.dispose();
                            }
                        }
                    }
                });
            }
        
            // remove scene renderer
            if (renderRef.current) {
                if (renderRef.current.domElement && renderRef.current.domElement.parentNode) {
                    renderRef.current.domElement.parentNode.removeChild(renderRef.current.domElement);
                }
            }

            // remove css2d renderer
            if (cssRenderRef.current) {
                cssRenderRef.current.domElement.remove();
            }

            // scrollContainer.removeEventListener('scroll',trackScroll)
        };

    }, []);

    useEffect(() => {
        if (!camRef || !renderRef || !cssRenderRef || !compRef) return;
        const renderMain = renderRef.current;
        const renderCSS = cssRenderRef.current;
        const composerMain = compRef.current;
        const camMain = camRef.current;
        
        camMain.aspect = width/height;
        camMain.updateProjectionMatrix();

        renderMain.setSize(width, height);
        composerMain.setSize(width, height);
        renderCSS.setSize(width, height);
        renderRef.current.setSize(width, height);
        cssRenderRef.current.setSize(width, height);
    }, [sizeWindow]);

    useEffect(() => {
        const scroll = scrollRef.current;
        if (!scroll) return;

        const trackScroll = () => {
            const y = scroll.scrollTop;
            const max = scroll.scrollHeight - scroll.clientHeight;
            const prog = y/max;
            camDist.current = ScrollMap(prog, trackWeights, camFrames);
            setProgNav(prog);
            if (prog === 0) {
                setNavMode('loading');
            } else if (prog > 0 && prog < 0.05) {
                setNavMode('gantry');
            } else if (prog >= 0.05 && prog < 0.987) {
                setNavMode('track');
            } else {
                setNavMode('finish');
            }
        };
        scroll.addEventListener('scroll', trackScroll);
        return () => scroll.removeEventListener('scroll',trackScroll);
    }, []);

    //return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
    return (
        // <div 
        //     id="container-scroll" 
        //     style={{
        //         width: "100%", 
        //         height:"100vh", 
        //         overflow:"hidden",
        //         position: "relative",
        //     }}
        // >
        //     <div 
        //         id="inner-scroll"
        //         style={{
        //             height: "13000px",
        //             overflowY: "scroll",
        //             overflowX: "hidden",
        //             width: "100%",
        //             position: "absolute",
        //             zIndex: 50,
        //             top: 0,
        //             left: 0,
        //             scrollbarWidth: "none",
        //         }}
        //         ref={scrollRef}
        //     />

        //     <div
        //         style={{
        //             position:"sticky",
        //             top: 0,
        //             left: 0,
        //             width: "100%",
        //             height: "100vh",
        //             zIndex: 10,
        //         }}
        //     >
        //         <div
        //             id="container-track"
        //             ref={mountRef}
        //             style={{
        //                 width: "100%",
        //                 height: "100%",
        //                 position: "absolute",
        //                 top: 0,
        //                 left: 0,
        //                 zIndex: 20,
        //             }}
        //         />
        //         <div
        //             id="container-css"
        //             ref={cssRef}
        //             style={{
        //                 width: "100%",
        //                 height: "100%",
        //                 position: "absolute",
        //                 top: 0,
        //                 left: 0,
        //                 pointerEvents: "none",
        //                 zIndex: 20,
        //             }}
        //         />
        //     </div>
        // </div>
        <div 
            id="container-scroll" 
            style={{
                width: "100%", 
                height:"100vh", 
                overflowY:"scroll",
                overflowX: 'hidden',
                scrollBarWidth: 'none',
                position: 'absolute'
            }}
            ref={scrollRef}
        >
            <div
                style={{
                    position:"sticky",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100vh",
                }}
            >
                <div
                    id="container-track"
                    ref={mountRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left:0,
                    }}
                />
                <div
                    id="container-css"
                    ref={cssRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                    }}
                />
            </div>
            <div style={{height: "13000px"}}/>
        </div>
    );    

}

export default TrackScene;