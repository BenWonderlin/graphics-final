import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Gorilla, Ape } from 'objects';
import { BasicLights } from 'lights';

class MainScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            //gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
            feed: false,
            walk: false,
            bathe: false
        };

        // Set background to a nice color
        this.background = new Color(0xCEE7E6);

        // Add meshes to scene
        // const gorilla = new Gorilla();
        // const lights = new BasicLights();
        // this.add(gorilla, lights);

        const ape = new Ape(this);
        const lights = new BasicLights();
        this.add(ape, lights);

        // Populate GUI
        // this.state.gui.add(this.state, 'feed');
        // this.state.gui.add(this.state, 'walk');
        // this.state.gui.add(this.state, 'bathe');
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp, clock) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp, clock);
        }
    }
}

export default MainScene;
