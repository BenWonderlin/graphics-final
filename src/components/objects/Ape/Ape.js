import { Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Ape.gltf';

class Ape extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'ape';
        this.scale.set(0.1, 0.1, 0.1);
        this.position.set(0,-0.7,0);
        this.rotation.y += Math.PI;

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }
}

export default Ape;
