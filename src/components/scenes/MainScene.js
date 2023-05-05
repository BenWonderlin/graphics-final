import { Scene, Color } from 'three';
import { Gorilla, Bedroom, Bed, Forest } from 'objects';
import { BasicLights } from 'lights';

class MainScene extends Scene {
    constructor() {

        super();
        this.state = {
            gorilla: new Gorilla(this),
            updateList: [],
        };

        this.background = new Color(0x000000);
      
        const lights = new BasicLights();
        const bedroom = new Bedroom();
        const forest = new Forest();
        const bed = new Bed();

        this.add(this.state.gorilla, lights, forest);

    }

    // addToUpdateList(object) {
    //     this.state.updateList.push(object);
    // }

    update(timeStamp, clock) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp, clock);
        }
      
        return this.state.gorilla.update(timeStamp, clock);
    }

    doActivity(activity_name) {
        return this.state.gorilla.doActivity(activity_name);
    }



}

export default MainScene;
