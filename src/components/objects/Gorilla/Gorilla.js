import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './gorilla.gltf';

class Gorilla extends Group {


    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader()

        this.state = {
            "hunger" : 10000,
            "cleanliness" : 10000,
            "happiness" : 10000,
        };

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
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
