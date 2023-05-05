import { Scene, Color } from 'three';
import { Gorilla, Bedroom, Forest, City } from 'objects';
import { BasicLights } from 'lights';

class MainScene extends Scene {
    constructor() {

        super();
        this.state = {
            gorilla: new Gorilla(this),
            bedroom: new Bedroom(),
            forest: new Forest(),
            city: new City(),
            currentLocation: undefined,
            updateList: []
        };

        this.background = new Color(0x000000);
        const lights = new BasicLights();
        this.state.currentLocation = this.state.bedroom;

        this.add(this.state.gorilla, lights, this.state.bedroom);

    }


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

        if (activity_name == "walk"){

            this.remove(this.state.currentLocation);

            if (this.state.currentLocation.constructor.name == "Bedroom"){
                this.state.currentLocation = this.state.forest;
            }
            else if (this.state.currentLocation.constructor.name == "Forest"){
                this.state.currentLocation = this.state.city;
            }
            else {
                this.state.currentLocation = this.state.bedroom;
            }

            this.add(this.state.currentLocation);

        }

        return this.state.gorilla.doActivity(activity_name);

    }



}

export default MainScene;
