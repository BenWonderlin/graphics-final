/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
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

// main container/div
const main_container = document.createElement("div");
main_container.style.fontFamily = "Darumadrop One";
main_container.style.fontSize = "42px";
main_container.style.display = "flex";
main_container.style.flexDirection = "column";
main_container.style.alignItems = "center";
main_container.style.color = 'rgb(191,192,192)';




// header row
const header_row = document.createElement("div");

header_row.style.display = "flex";
header_row.style.justifyContent = "space-evenly";
header_row.style.width = "100%";
header_row.style.verticalAlign = "center";

const save_button = document.createElement("span");
var node = document.createTextNode("Save");
save_button.append(node);

const title_card = document.createElement("span");
title_card.style.fontSize = "54px";
node = document.createTextNode("My Pet Gorilla");
title_card.append(node);

const info_button = document.createElement("span");
node = document.createTextNode("Info");
info_button.append(node);

header_row.appendChild(save_button);
header_row.appendChild(title_card);
header_row.appendChild(info_button);

main_container.appendChild(header_row);



// window row
const window_row = document.createElement("div");


renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block';
canvas.style.margin = 0;
canvas.style.borderRadius = "8px";
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


const health_bar = document.createElement("div");
health_bar.style.position = "absolute";
health_bar.style.backgroundColor = "rgb(124,223,100)";
health_bar.style.height = "2%";
health_bar.style.width = "50%";
health_bar.style.borderRadius = "16px";
health_bar.style.left = "50%";
health_bar.style.bottom = "12.5%";
health_bar.style.transform = "translate(-50%, -50%)";

window_row.appendChild(health_bar);

main_container.appendChild(window_row);




// footer row

const footer_row = document.createElement("div");

footer_row.style.display = "flex";
footer_row.style.justifyContent = "space-evenly";
footer_row.style.width = "100%";

const feed_button = document.createElement("span");
var node = document.createTextNode("Feed");
feed_button.append(node);

const bathe_button = document.createElement("span");
node = document.createTextNode("Bathe");
bathe_button.append(node);

const walk_button = document.createElement("span");
node = document.createTextNode("Walk");
walk_button.append(node);

const chat_button = document.createElement("span");
node = document.createTextNode("Chat");
chat_button.append(node);


footer_row.appendChild(feed_button);
footer_row.appendChild(bathe_button);
footer_row.appendChild(walk_button);
footer_row.appendChild(chat_button);

main_container.appendChild(footer_row);



document.body.append(main_container);




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
