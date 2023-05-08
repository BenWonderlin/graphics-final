import { Scene, Color } from 'three';
import { Gorilla, Bedroom, Forest, City, Bathtub } from 'objects';
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
            currentActivity: undefined,
            bathtub: new Bathtub()
        };

        this.background = new Color(0x000000);
        const lights = new BasicLights();
        this.state.currentLocation = this.state.bedroom;

        this.add(this.state.gorilla, lights, this.state.bedroom);

    }


    update(clock) {
        // let health, need;
        // [health, need] = this.state.gorilla.update(clock);
        // // console.log(health, need);
        // return [health, need, this.state.currentActivity];
        return [this.state.gorilla.update(clock), this.state.currentActivity];
    }

    doActivity(activity_name, clock) {
        
        if (this.state.currentActivity){
            // return this.state.gorilla.doActivity(activity_name, clock).concat(this.state.currentActivity);
            return [this.state.gorilla.doActivity(activity_name, clock), this.state.currentActivity];
        }


        if (activity_name == "feed"){
            this.state.currentActivity = "feed";
            setTimeout(() => {this.state.currentActivity = undefined}, 4000);
        }
        else if (activity_name == "bathe"){

            this.add(this.state.bathtub);
            this.state.currentActivity = "bathe";

            setTimeout(() => {
                this.state.currentActivity = undefined;
                this.remove(this.state.bathtub);
            }, 4000);

        }
        else if (activity_name == "walk"){

            this.remove(this.state.currentLocation);
            this.state.currentActivity = "walk";

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
            setTimeout(() => {this.state.currentActivity = undefined}, 4000);

        }


        return [this.state.gorilla.doActivity(activity_name, clock), this.state.currentActivity]
    }


}

export default MainScene;
