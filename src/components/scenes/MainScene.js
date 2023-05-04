import { Scene, Color } from 'three';
import { Gorilla } from 'objects';
import { BasicLights } from 'lights';

class MainScene extends Scene {
    constructor() {

        super();
        this.state = {
            gorilla: new Gorilla(this)
        };

        this.background = new Color(0xCEE7E6);
      
        const lights = new BasicLights();

        this.add(this.state.gorilla, lights);

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
      
        return this.state.gorilla.update();

    doActivity(activity_name) {
        return this.state.gorilla.doActivity(activity_name);
    }



}

export default MainScene;
