import * as THREE from 'three';
import { Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './Ape.gltf';

class Ape extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'ape';

        this.state = {
            idle: true,
        }

        // set initial position, scaling, and rotation
        const scale = 0.15;
        this.scale.set(scale, scale, scale);
        this.position.set(0,-0.5,0);
        this.rotation.y += Math.PI;

        // loader.load(MODEL, (gltf) => {
        //     this.add(gltf.scene);

        // });

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

                // console.log( gltf.animations[0] );
                // const clip = THREE.AnimationClip.findByName(this.clips, 'IdleAnim');
                // const action = this.mixer.clipAction(clip);
                // action.play();
            },
            // called while loading is progressing
            function ( xhr ) {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            }
        );

        parent.addToUpdateList(this);
    }

    update(timeStamp, clock) {
        const delta = clock.getDelta();

        // console.log(timeStamp);
        if (this.mixer && this.clips) {
            if (this.state.idle) {
                const clip = THREE.AnimationClip.findByName(this.clips, 'IdleAnim');
                const action = this.mixer.clipAction( clip );
                action.play();
            }
            this.mixer.update(delta);
        }
        // mixer.update( deltaSeconds );
    }
}

export default Ape;
