import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './gorilla.gltf';

class Gorilla extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader()

        this.state = {
            "hunger" : 10000,
            "cleanliness" : 10000,
            "happiness" : 10000,
        };

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

    update() {

        this.state.hunger -= 3;
        this.state.cleanliness -= 3;
        this.state.happiness -= 3;

        return Math.min(this.state.hunger, this.state.cleanliness, this.state.happiness) / 100;

    }

    doActivity(activity_name){

        if (activity_name == "feed"){
            this.state.hunger = Math.min(this.state.hunger + 1000, 10000);
        }
        else if (activity_name == "bathe"){
            this.state.cleanliness = Math.min(this.state.cleanliness + 1000, 10000);
        }
        else if (activity_name == "walk"){
            this.state.happiness = Math.min(this.state.happiness + 1000, 10000);
        }

        return this.update();

    }

}

export default Gorilla;
