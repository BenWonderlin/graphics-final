import { Scene, Color } from 'three';
import { Gorilla, Bedroom, Forest, City, Bathtub, Banana } from 'objects';
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
            currentLocationCode: undefined, // webpack >_<
            currentActivity: undefined,
            bathtub: new Bathtub(),
            banana: new Banana()
        };

        this.background = new Color(0x000000);
        const lights = new BasicLights();
        this.state.currentLocation = this.state.bedroom;
        this.state.currentLocationCode = 0;

        this.add(this.state.gorilla, lights, this.state.bedroom, this.state.banana);

    }


    update(clock) {
        this.state.banana.update();
        return [this.state.gorilla.update(clock), this.state.currentActivity];
    }

    doActivity(activity_name, clock) {
        
        if (this.state.currentActivity){
            return [this.state.gorilla.doActivity(activity_name, clock), this.state.currentActivity];
        }


        if (activity_name == "feed"){
            this.state.currentActivity = "feed";
            this.state.banana.fall();
            setTimeout(() => {this.state.currentActivity = undefined}, 8000);
        }
        else if (activity_name == "bathe"){

            this.add(this.state.bathtub);
            this.state.currentActivity = "bathe";

            setTimeout(() => {
                this.state.currentActivity = undefined;
                this.remove(this.state.bathtub);
            }, 8000);

        }
        else if (activity_name == "walk"){

            this.state.currentActivity = "walk";

            this.state.gorilla.walk();

            let nextLocation;
            if (this.state.currentLocationCode == 0){
                nextLocation = this.state.forest;
                this.state.currentLocationCode = 1;
            }
            else if (this.state.currentLocationCode == 1){
                nextLocation = this.state.city;
                this.state.currentLocationCode = 2;
            }
            else {
                nextLocation = this.state.bedroom;
                this.state.currentLocationCode = 0;
            }

            setTimeout(() => {
                this.remove(this.state.currentLocation);
                this.state.currentLocation = nextLocation;
                this.add(this.state.currentLocation);
            }, 3200);
 
            setTimeout(() => {this.state.currentActivity = undefined;}, 8000);

        }


        return [this.state.gorilla.doActivity(activity_name, clock), this.state.currentActivity]
    }


}

export default MainScene;
