import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './gorilla.gltf';

class Gorilla extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader()

        // includes needs and animation states
        this.state = {
            "hunger" : 10000,
            "cleanliness" : 10000,
            "happiness" : 10000,
            // idle: true,
            // walking: false,
            // bathing: false,
            // feeding: false,
            // chatting: false
            animState: 'idle',
        };

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
        
            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error occurred.' );
                console.log( error );
            }
        );
        // parent.addToUpdateList(this);
    }

    update(clock) {
        // delta is time elapsed since previous frame
        // used to calculate the corresponding amount of motion
        const delta = clock.getDelta();

        // run this only after loading is complete
        if (this.mixer && this.clips) {
            // console.log(this.state.animState);
            if (!this.idleAction || !this.feedAction) {
                const idleClip = THREE.AnimationClip.findByName(this.clips, 'IdleAnim');
                this.idleAction = this.mixer.clipAction(idleClip);
                const feedClip = THREE.AnimationClip.findByName(this.clips, 'FeedAnim');
                this.feedAction = this.mixer.clipAction(feedClip);
            }

            if (this.state.animState == 'idle') {
                this.idleAction.play();
            }
            this.mixer.update(delta);
        }

        this.state.hunger -= 3;
        this.state.cleanliness -= 3;
        this.state.happiness -= 3;

        return Math.min(this.state.hunger, this.state.cleanliness, this.state.happiness) / 100;
    }

    doActivity(activity_name, clock){

        if (activity_name == "feed"){
            this.state.hunger = Math.min(this.state.hunger + 1000, 10000);
            // this.state.feeding = true;
            // this.state.idle = false;
            this.mixer.addEventListener( 'loop' , restoreIdle );
            this.state.animState = 'feed';
            this.idleAction.stop();
            this.feedAction.play();
        }
        else if (activity_name == "bathe"){
            this.state.cleanliness = Math.min(this.state.cleanliness + 1000, 10000);
        }
        else if (activity_name == "walk"){
            this.state.happiness = Math.min(this.state.happiness + 1000, 10000);
        }

        return this.update(clock);

        function restoreIdle() {
            // console.log('detected');
            // console.log(this);
            this.removeEventListener( 'loop' , restoreIdle );
            this._root.state.animState = 'idle';
            this._root.feedAction.stop();
            this._root.idleAction.play();
        }

    }



}

export default Gorilla;
