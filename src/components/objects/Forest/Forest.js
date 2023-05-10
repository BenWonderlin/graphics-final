import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './forest.glb';

class Forest extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader()

        // set initial position, scaling, and rotation
        const SCALE = 1.25;
        this.scale.set(SCALE, SCALE, SCALE);
        this.position.set(0, 0.86, 0);

        // create mixer to control animation
        this.mixer = new THREE.AnimationMixer( this );

        loader.load(
            MODEL,
            // called when the resource is loaded
            (gltf) => {
                this.add(gltf.scene);
            }
        );

    }

}

export default Forest;
