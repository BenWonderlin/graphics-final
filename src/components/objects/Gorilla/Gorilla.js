import * as THREE from 'three';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
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

    walk() {
        // Use timing library for more precice "bounce" animation
        // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
        // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
        const turnOff = new TWEEN.Tween(this.rotation)
            .to({ y: this.rotation.y + Math.PI / 2 }, 800)
            .easing(TWEEN.Easing.Linear.None);
        const moveBack = new TWEEN.Tween(this.position)
            .to({ x: this.position.x - 0.5}, 800)
            .easing(TWEEN.Easing.Linear.None);
        const walkOff = new TWEEN.Tween(this.position)
            .to({ x: this.position.x + 2}, 2200)
            .easing(TWEEN.Easing.Quadratic.In);
        const walkOn = new TWEEN.Tween(this.position)
            .to({ x: this.position.x - 0.5}, 2200)
            .easing(TWEEN.Easing.Quadratic.Out);
        const turnOn = new TWEEN.Tween(this.rotation)
            .to({ y: this.rotation.y}, 800)
            .easing(TWEEN.Easing.Linear.None);
        const moveForward = new TWEEN.Tween(this.position)
            .to({ x: this.position.x}, 800)
            .easing(TWEEN.Easing.Linear.None);

        // turn to gorilla's left, run off scene, reappear on other side, run back to center
        turnOff.onComplete(() => {
            setTimeout(() => walkOff.start(), 500)
        });
        walkOff.onComplete(() => {
            this.position.x = -2;
            walkOn.start();
        });
        walkOn.onComplete(() => {
            turnOn.start()
            moveForward.start()
        });

        // Start animation
        turnOff.start();
        moveBack.start();
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
                
                // increase walk speed
                this.actions['walk'].setEffectiveTimeScale(1.5);
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
        if (Math.min(this.state.hunger, this.state.cleanliness, this.state.happiness) < 5000) {
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

        TWEEN.update();

        // using harmonic mean to penalize outliers
        return [Math.round( 3 / ( (1/this.state.hunger) + (1/this.state.cleanliness) +  (1/this.state.happiness) ) / 1000 ), need];
    }

    doActivity(activity_name, clock){

        if (activity_name == "feed"){
            this.state.hunger = Math.min(this.state.hunger + 2500, 10000);
            playAnimation(this, 'feed');
        }
        else if (activity_name == "bathe"){
            this.state.cleanliness = Math.min(this.state.cleanliness + 2500, 10000);
            playAnimation(this, 'bathe');
        }
        else if (activity_name == "walk"){
            this.state.happiness = Math.min(this.state.happiness + 2500, 10000);
            playAnimation(this, 'walk');
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

        // plays the selected animation
        function playAnimation(model, name) {
            model.mixer.addEventListener( 'loop' , restoreIdle );
            model.state.animState = name;
            model.actions['idle'].stop();
            model.actions[name].play();
        }
    }



}

export default Gorilla;
