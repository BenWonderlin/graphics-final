import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './bed.gltf';

class Bed extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader()

        // set initial position, scaling, and rotation
        const SCALE = 0.15;
        this.scale.set(SCALE, SCALE, SCALE);
        this.position.set(-1, -0.375, -1);

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

export default Bed;
