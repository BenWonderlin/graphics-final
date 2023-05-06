/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MainScene } from 'scenes';
import { Clock } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { RenderPixelatedPass } from 'passes';

const WINDOW_PROPORTION = 0.8;


// Initialize core ThreeJS components
const scene = new MainScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });


// Set up camera
camera.position.set(0, 0.5, 2);
camera.lookAt(new Vector3(0, 0, 0));


// Set up post-processing
const composer = new EffectComposer( renderer );

const renderPass = new RenderPass(scene, camera); // uncomment these two lines for normal rendering
composer.addPass(renderPass);

const renderPixelatedPass = new RenderPixelatedPass(1, scene, camera, {normalEdgeStrength : 0.00001, depthEdgeStrength : 0.00001}); // uncomment these two lines for pixelated rendering
composer.addPass(renderPixelatedPass);

composer.render(scene, camera);


// Set up clock for animation
const clock = new Clock();


// START PAGE STRUCTURE ------------------------------------------------------------------------------------------
// using dom model sadge
// this is just gonna be offensively messy ig

// imports
var font_link = document.createElement('link');
font_link.setAttribute('rel', 'stylesheet');
font_link.setAttribute('type', 'text/css');
font_link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Darumadrop+One');
document.head.appendChild(font_link);
document.body.style.backgroundColor = "rgb(100, 135, 103)";
//

// main container/div
const main_container = document.createElement("div");
main_container.style.position = "fixed";
main_container.style.margin =  "0 auto";
main_container.style.left = "10%";
main_container.style.fontFamily = "Darumadrop One";
main_container.style.fontSize = "42px";
main_container.style.display = "flex";
main_container.style.flexDirection = "column";
main_container.style.alignItems = "center";
main_container.style.color = 'rgb(100, 135, 103)';
//



// header row
const header_row = document.createElement("div");
header_row.className = "button-row";

header_row.style.display = "flex";
header_row.style.justifyContent = "space-evenly";
header_row.style.width = "100%";
header_row.style.verticalAlign = "center";
header_row.style.margin = "8px 0px 8px 0px"

const save_button = document.createElement("span");
save_button.className = "button";
var node = document.createTextNode("Save");
save_button.append(node);

const title_card = document.createElement("span");
title_card.style.fontSize = "54px";
title_card.style.verticalAlign = "middle";
title_card.style.lineHeight = "normal";
title_card.style.color = "white";
title_card.style.display = "inline-flex";
title_card.style.alignItems = "center";

node = document.createTextNode("Gorilla Tamagotchi");
title_card.append(node);

const info_button = document.createElement("span");
info_button.className = "button";
node = document.createTextNode("Info");
info_button.append(node);


header_row.appendChild(save_button);
header_row.appendChild(title_card);
header_row.appendChild(info_button);

main_container.appendChild(header_row);
//


// window row
const window_row = document.createElement("div");
window_row.style.maxHeight = "69vh";
window_row.style.margin = "0px 0px 24px 0px";

renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block';
canvas.style.margin = 0;
canvas.style.maxHeight = "70vh";
canvas.style.borderRadius = "8px";
canvas.style.cursor = "grab";
canvas.style.border = "6px solid white";
window_row.appendChild(canvas);


const gorilla_name = document.createElement("div");
gorilla_name.contentEditable = true;
const saved_name = localStorage.getItem("gorilla_name");
node = document.createTextNode(saved_name ? saved_name : "click here to name your gorilla");


gorilla_name.style.position = "absolute";
gorilla_name.style.left = "50%";
gorilla_name.style.bottom = "15%";
gorilla_name.style.fontSize = "24px";
gorilla_name.style.transform = "translate(-50%, -50%)";
gorilla_name.style.color = "rgb(125,201,94)";
gorilla_name.style.textOverflow = "ellipsis";
gorilla_name.append(node);

window_row.appendChild(gorilla_name);


const health_bar_background = document.createElement("div");
health_bar_background.style.position = "absolute";
health_bar_background.style.backgroundColor = "rgb(100, 135, 103)";
health_bar_background.style.height = "3%";
health_bar_background.style.width = "52%";
health_bar_background.style.borderRadius = "16px";
health_bar_background.style.left = "24%";
health_bar_background.style.bottom = "12.75%";

window_row.appendChild(health_bar_background);


const health_bar = document.createElement("div");
health_bar.style.position = "absolute";
health_bar.style.backgroundColor = "rgb(124,223,100)";
health_bar.style.height = "1.5%";
health_bar.style.width = "50%"; // adjusting this updates the health bar
health_bar.style.borderRadius = "16px";
health_bar.style.left = "25%";
health_bar.style.bottom = "13.5%";

window_row.appendChild(health_bar);

main_container.appendChild(window_row);
//



// footer row

const footer_row = document.createElement("div");
footer_row.className = "button-row";

const feed_button = document.createElement("span");
feed_button.className = "button";
var node = document.createTextNode("Feed");
feed_button.append(node);

const bathe_button = document.createElement("span");
bathe_button.className = "button";
node = document.createTextNode("Bathe");
bathe_button.append(node);

const walk_button = document.createElement("span");
walk_button.className = "button";

node = document.createTextNode("Walk");
walk_button.append(node);

footer_row.appendChild(feed_button);
footer_row.appendChild(bathe_button);
footer_row.appendChild(walk_button);

main_container.appendChild(footer_row);
//


document.body.append(main_container);

// modals

const modal_background = document.createElement("div");
modal_background.style.position = "absolute";
modal_background.style.width = "150vw";
modal_background.style.height = "150vh";
modal_background.style.top = "50%";
modal_background.style.left = "50%";
modal_background.style.transform = "translate(-50%, -50%)";
modal_background.style.backgroundColor = "rgba(0, 0, 0, 0.67)";
modal_background.style.visibility = "hidden";
main_container.appendChild(modal_background);

const modal = document.createElement("div");
modal.style.position = "absolute";
modal.style.width = "45%";
modal.style.height = "45%";
modal.style.top = "50%";
modal.style.left = "50%";
modal.style.transform = "translate(-50%, -50%)";
modal.style.backgroundColor = "rgb(100, 135, 103)"
modal.style.borderRadius = "8px";
modal.style.display = "flex";
modal.style.flexDirection = "column";
modal.style.alignItems = "center";
modal.style.justifyContent = "space-around"
modal.style.border = "6px solid white";
modal.style.padding = "32px";
modal.style.color = "rgb(191,192,192)";
modal.style.textAlign = "center";
modal.style.visibility = "hidden";

const modal_text = document.createElement("div");
node = document.createTextNode("Game saved successfully");
modal_text.style.width = "100%";
modal_text.append(node);
modal.appendChild(modal_text);

const modal_button = document.createElement("div");
modal_button.className = "button";
modal_button.style.width = "33%";
modal_button.style.color = "rgb(100, 135, 103)";
modal_button.style.justifyContent = "center";
node = document.createTextNode("OK");
modal_button.append(node);
modal.appendChild(modal_button);

main_container.appendChild(modal);

//

// style and configure buttons
const mouseOverButtonHandler = (event) => {
    event.target.style.backgroundColor = "white";
};

const mouseOutButtonHandler = (event) => {
    event.target.style.backgroundColor = "rgb(191,192,192)";
}

const startActivity = (activity) => {
    scene.doActivity(activity, clock);
}


feed_button.addEventListener("click", () => startActivity("feed"));
bathe_button.addEventListener("click", () => startActivity("bathe"));
walk_button.addEventListener("click", () => startActivity("walk"));

const saveGame = () => {
    localStorage.setItem("gorilla_name", gorilla_name.textContent);
    localStorage.setItem("gorilla_health", health);
}

const openModal = () => {
    modal.style.visibility = "visible";
    modal_background.style.visibility = "visible";
}

const closeModal = () => {
    modal.style.visibility = "hidden";
    modal_background.style.visibility = "hidden";
}

save_button.addEventListener("click", () => {saveGame(); openModal();});
info_button.addEventListener("click", () => openModal());
modal_button.addEventListener("click", () => closeModal());


const buttons = document.getElementsByClassName("button");
for (let i = 0; i < buttons.length; i++){
    buttons[i].style.backgroundColor = "rgb(191,192,192)";
    buttons[i].style.borderRadius  = "8px";
    buttons[i].style.display = "inline-flex";
    buttons[i].style.alignItems = "center";
    buttons[i].style.padding = "0px 8px 0px 8px";
    buttons[i].style.cursor = "pointer";
    buttons[i].addEventListener("mouseover", mouseOverButtonHandler);
    buttons[i].addEventListener("mouseout", mouseOutButtonHandler);
}

const button_rows = document.getElementsByClassName("button-row");
for (let i = 0; i < button_rows.length; i++){
    button_rows[i].style.display = "flex";
    button_rows[i].style.justifyContent = "space-evenly";
    button_rows[i].style.width = "100%";
    button_rows[i].style.verticalAlign = "center";
    button_rows[i].style.margin = "8px 0px 8px 0px"
    button_rows[i].style.maxHeight = "8vh";
}
//


// END PAGE STRUCTURE -------------------------------------------------------------------------------------------


// set up controls 
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1.75;
controls.maxDistance = 2.25;
controls.maxAzimuthAngle = Math.PI / 6;
controls.minAzimuthAngle = - Math.PI / 6;
controls.maxPolarAngle = Math.PI / 2
controls.minPolarAngle = Math.PI / 4;
controls.update();



function updateHealthBar(health){

    health *= 5;
    health_bar.style.width = health.toString() + "%";

    if (health <= 10){
        health_bar.style.backgroundColor = "rgb(139, 0, 0)";
    }
    else if (health <= 20){
        health_bar.style.backgroundColor = "rgb(255,114,118)";
    }
    else if (health <= 35){
        health_bar.style.backgroundColor = "rgb(244, 241, 134)";
    }
    else {
        health_bar.style.backgroundColor = "rgb(124,223,100)";
    }

}

function lockButtons(){

    let lock_these = [save_button, info_button, feed_button, bathe_button, walk_button];

    for (let i = 0; i < lock_these.length; i++){
        lock_these[i].style.backgroundColor = "gray";
        lock_these[i].style.pointerEvents = "none";
    }

}

function unlockButtons(){

    let unlock_these = [save_button, info_button, feed_button, bathe_button, walk_button];

    for (let i = 0; i < unlock_these.length; i++){
        if (unlock_these[i].style.backgroundColor != "white"){
            unlock_these[i].style.backgroundColor = "rgb(191,192,192)";
        }
        buttons[i].style.pointerEvents = "all";
    }

}

let health;
let activity;
// Render loop
const onAnimationFrameHandler = () => {
    controls.update();
    composer.render(scene, camera);
    [health, activity] = scene.update(clock);

    updateHealthBar(health);
    activity ? lockButtons() : unlockButtons();

    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);


// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(WINDOW_PROPORTION * innerWidth, WINDOW_PROPORTION * innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
