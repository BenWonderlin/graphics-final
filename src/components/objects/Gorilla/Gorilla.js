import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './gorilla.gltf';

class Gorilla extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader()
        const health = localStorage.getItem("gorilla_health");

        // includes needs and animation states
        this.state = {
            "hunger" : health ?  health * 1000 : 6000,
            "cleanliness" : health ?  health * 1000 : 6000,
            "happiness" : health ?  health * 1000 : 6000,
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
    }

    update(clock) {
        // delta is time elapsed since previous frame
        // used to calculate the corresponding amount of motion
        const delta = clock.getDelta();

        // run this only after loading is complete
        if (this.mixer && this.clips) {

            // initialize actions if not done already
            if (!this.actions) {
                this.actions = {};

                for (let i = 0; i < this.clips.length; i++) {
                    const clip = this.clips[i];
                    const action = this.mixer.clipAction(clip);
                    this.actions[clip.name] = action;
                }   
            }

            if (this.state.animState == 'idle') {
                this.actions['idle'].play();
            }
            this.mixer.update(delta);
        }

        this.state.hunger = Math.max(this.state.hunger - 1, 0);
        this.state.cleanliness = Math.max(this.state.cleanliness - 1, 0);
        this.state.happiness = Math.max(this.state.happiness - 1, 0);

        // console.log(this.state);


        // determine the lowest need if it is under 50% (used for chat box)
        var need = undefined;
        // this is sloppy, i couldn't find an "argmin" function
        if (Math.min(this.state.hunger, this.state.cleanliness, this.state.happiness) < 9000) {
            if (this.state.hunger < this.state.cleanliness && this.state.hunger < this.state.happiness) {
                need = 'feed';
            }
            else if (this.state.cleanliness < this.state.happiness) {
                need = 'bathe';
            }
            else {
                need = 'walk';
            }
        }

        // using harmonic mean to penalize outliers
        return [Math.round( 3 / ( (1/this.state.hunger) + (1/this.state.cleanliness) +  (1/this.state.happiness) ) / 1000 ), need];
    }

    doActivity(activity_name, clock){

        if (activity_name == "feed"){
            this.state.hunger = Math.min(this.state.hunger + 2000, 10000);
            this.mixer.addEventListener( 'loop' , restoreIdle );
            this.state.animState = 'feed';
            this.actions['idle'].stop();
            this.actions['feed'].play();
        }
        else if (activity_name == "bathe"){
            this.state.cleanliness = Math.min(this.state.cleanliness + 2000, 10000);
        }
        else if (activity_name == "walk"){
            this.state.happiness = Math.min(this.state.happiness + 2000, 10000);
        }
        
        return this.update(clock);

        // returns state to 'idle' and adjusts animations accordingly
        // NOTE: this is attached to 'mixer', to access the model itself use 'this._root'
        function restoreIdle() {
            this.removeEventListener( 'loop' , restoreIdle );
            this._root.actions[this._root.state.animState].stop();
            this._root.state.animState = 'idle';
            this._root.actions['idle'].play();
        }
    }



}

export default Gorilla;
