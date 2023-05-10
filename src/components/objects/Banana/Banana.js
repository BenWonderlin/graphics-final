import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './banana.gltf';

class Banana extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader()

        // set initial position, scaling, and rotation
        const SCALE = 0.012;
        this.scale.set(SCALE, SCALE, SCALE);
        this.position.set(0, 2, 0.6);
        this.rotation.set(0, 3 * Math.PI / 4, -1 * Math.PI / 4);

        loader.load(
            MODEL,
            // called when the resource is loaded
            (gltf) => {
                this.add(gltf.scene);
            }
        );

    }

    fall() {

        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: 0.45 }, 1700)
            .easing(TWEEN.Easing.Cubic.Out);
        const moveIn = new TWEEN.Tween(this.position)
            .to({ z: 0.3 }, 400)
            .easing(TWEEN.Easing.Linear.None);

        fallDown.onComplete(() => moveIn.start());
        moveIn.onComplete(() => this.position.set(0,2,0.5));

        // Start animation
        fallDown.start();
    }

    update() {
        // Advance tween animations, if any exist
        TWEEN.update();
    }

}

export default Banana;
