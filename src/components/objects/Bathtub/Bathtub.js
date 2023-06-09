import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './bathtub.glb';

class Bathtub extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader()

        // set initial position, scaling, and rotation
        const SCALE = 0.15;
        this.scale.set(SCALE, SCALE*1.2, SCALE);
        this.position.set(0, -0.20, 0.4);
        this.rotation.y += 3 *Math.PI / 2;

        loader.load(
            MODEL,
            // called when the resource is loaded
            (gltf) => {
                this.add(gltf.scene);
            }
        );

    }

}

export default Bathtub;
