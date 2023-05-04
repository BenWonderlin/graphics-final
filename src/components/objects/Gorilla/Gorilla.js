import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './gorilla.gltf';

class Gorilla extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'gorilla';

        // set initial states
        this.state = {
            idle: true,
            walking: false,
            bathing: false,
            feeding: false,
            chatting: false
        }

        // set initial position, scaling, and rotation
        const scale = 0.15;
        this.scale.set(scale, scale, scale);
        this.position.set(0,-0.5,0);
        this.rotation.y += Math.PI;

        // create mixer to control animation
        this.mixer = new THREE.AnimationMixer( this );

        loader.load(
            MODEL,
            // called when the resource is loaded
            (gltf) => {
                this.add(gltf.scene);
        
                this.clips = gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
            },
            // called while loading is progressing
            function ( xhr ) {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            }
        );

        parent.addToUpdateList(this);
    }

    update(timeStamp, clock) {
        // delta is time elapsed since previous frame
        // used to calculate the corresponding amount of motion
        const delta = clock.getDelta();

        // run this only after loading is complete
        if (this.mixer && this.clips) {
            if (this.state.idle) {
                const clip = THREE.AnimationClip.findByName(this.clips, 'IdleAnim');
                const action = this.mixer.clipAction( clip );
                action.play();
            }
            this.mixer.update(delta);
        }
    }
}

export default Gorilla;
