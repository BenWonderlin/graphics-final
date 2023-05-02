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

const WINDOW_PROPORTION = 0.8;
// Initialize core ThreeJS components
const scene = new MainScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

// Set up camera
camera.position.set(0, 0.5, 2);
camera.lookAt(new Vector3(0, 0, 0));


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
window_row.style.maxHeight = "70vh";

renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block';
canvas.style.margin = 0;
canvas.style.maxHeight = "70vh";
canvas.style.borderRadius = "8px";
canvas.style.cursor = "grab";
window_row.appendChild(canvas);


const gorilla_name = document.createElement("div");
node = document.createTextNode("funky kong");

gorilla_name.style.position = "absolute";
gorilla_name.style.left = "50%";
gorilla_name.style.bottom = "15%";
gorilla_name.style.fontSize = "24px";
gorilla_name.style.transform = "translate(-50%, -50%)";
gorilla_name.style.color = "rgb(125,201,94)";
gorilla_name.append(node);

window_row.appendChild(gorilla_name);


const health_bar_background = document.createElement("div");
health_bar_background.style.position = "absolute";
health_bar_background.style.backgroundColor = "rgb(100, 135, 103)";
health_bar_background.style.height = "3%";
health_bar_background.style.width = "52%";
health_bar_background.style.borderRadius = "16px";
health_bar_background.style.left = "24%";
health_bar_background.style.bottom = "11.75%";

window_row.appendChild(health_bar_background);


const health_bar = document.createElement("div");
health_bar.style.position = "absolute";
health_bar.style.backgroundColor = "rgb(124,223,100)";
health_bar.style.height = "1.5%";
health_bar.style.width = "50%"; // adjusting this updates the health bar
health_bar.style.borderRadius = "16px";
health_bar.style.left = "25%";
health_bar.style.bottom = "12.5%";


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

const chat_button = document.createElement("span");
chat_button.className = "button";
node = document.createTextNode("Chat");
chat_button.append(node);


footer_row.appendChild(feed_button);
footer_row.appendChild(bathe_button);
footer_row.appendChild(walk_button);
footer_row.appendChild(chat_button);

main_container.appendChild(footer_row);
//


document.body.append(main_container);


// more css for the buttons

const mouseOverButtonHandler = (event) => {
    event.target.style.backgroundColor = "white";
};

const mouseOutButtonHandler = (event) => {
    event.target.style.backgroundColor = "rgb(191,192,192)";
}



const buttons = document.getElementsByClassName("button");
for (let i = 0; i < buttons.length; i++){
    buttons[i].style.backgroundColor = "rgb(191,192,192)";
    buttons[i].style.borderRadius  = "8px";
    buttons[i].style.display = "inline-flex";
    buttons[i].style.alignItems = "center";
    buttons[i].style.padding = "0px 8px 0px 8px";
    buttons[i].style.cursor = "pointer";
    buttons[i].addEventListener("mouseover", mouseOverButtonHandler, false);
    buttons[i].addEventListener("mouseout", mouseOutButtonHandler, false);
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


// comment this block to enable/disable controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1;
controls.maxDistance = 2;
controls.update();
//

// END PAGE STRUCTURE -------------------------------------------------------------------------------------------


// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    // controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
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
