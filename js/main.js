/**
 * Initializes the interactive functionality for the explode-view canvas,
 * hotspots, and slider, as well as loading and displaying information boxes.
 *
 * Main Features:
 * - Loads and animates a sequence of images for the explode-view canvas.
 * - Displays information boxes with video, title, and description for hotspots.
 * - Handles slider input to adjust the width of a divisor element.
 * - Adds interactivity to hotspots for showing and hiding information.
 *
 * Functions:
 * - `render()`: Renders the current frame of the explode-view animation.
 * - `loadInfo()`: Dynamically loads and appends information boxes to hotspots.
 * - `showInfo()`: Displays the information box associated with a hotspot.
 * - `hideInfo()`: Hides the information box associated with a hotspot.
 * - `moveDivisor()`: Adjusts the width of the divisor element based on slider input.
 *
 * Dependencies:
 * - GSAP (GreenSock Animation Platform) for animations and scroll-triggering.
 * - HTML5 Canvas API for rendering the explode-view animation.
 *
 * Event Listeners:
 * - `mouseenter` and `mouseleave` on hotspots for showing/hiding information.
 * - `input` on the slider for updating the divisor width.
 */

import { revealText } from "./revealText.js";

revealText();

const hotspots = document.querySelectorAll(".Hotspot");
const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");

const divisor = document.querySelector("#divisor");
const slider = document.querySelector("#slider");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 450;
const images = [];

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `images/vdo/explode_${(i + 1).toString().padStart(4, "0")}.webp`;
  images.push(img);
}

const buds = {
  frame: 0,
};

gsap.to(buds, {
  frame: 449,
  snap: "frame",
  scrollTrigger: {
    trigger: "#explode-view",
    pin: true,
    scrub: 1,

    start: "top top",
  },
  onUpdate: render,
});

images[0].addEventListener("load", render);

function render() {
  console.log(images[buds.frame]);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[buds.frame], 0, 0);
}

// Data
const infoBoxes = [
  {
    title: "We wheel rock you!",
    text: "The earbud's wheel control lets you adjust volume, skip tracks, play/pause music, and manage calls for a seamless, hands-free experience.",
    image: "./video/wheeling.mp4",
  },
  {
    title: "A good day!",
    text: "offers up to 24 hours of battery life, ensuring long-lasting use for all-day listening without the need for frequent recharging",
    image: "./video/battery.mp4",
  },
  {
    title: "This is the tap!",
    text: "tapping control lets you play/pause music, skip tracks, adjust volume, and manage calls with simple taps for a smooth, hands-free experience.",
    image: "./video/tapping.mp4",
  },
];

function loadInfo() {
  infoBoxes.forEach((infoBox, index) => {
    let selected = document.querySelector(`#hotspot-${index + 1}`);

    if (selected) {
      let video = document.createElement("video");
      video.src = infoBox.image;
      video.setAttribute("autoplay", "true");
      video.setAttribute("loop", "true");

      let title = document.createElement("h2");
      title.textContent = infoBox.title;

      let desc = document.createElement("p");
      desc.textContent = infoBox.text;

      selected.appendChild(video);
      selected.appendChild(title);
      selected.appendChild(desc);
    } else {
      console.warn(`Element with ID #hotspot-${index + 1} not found.`);
    }
  });
}

function showInfo() {
  let selected = document.querySelector(`#${this.slot}`);
  gsap.to(selected, 1, { autoAlpha: 1 });
}

function hideInfo() {
  let selected = document.querySelector(`#${this.slot}`);
  gsap.to(selected, 1, { autoAlpha: 0 });
}

loadInfo();

// Slider

function moveDivisor() {
  console.log(slider.value);
  divisor.style.width = slider.value + "%";
}

slider.addEventListener("input", moveDivisor);

hotspots.forEach(function (hotspot) {
  hotspot.addEventListener("mouseenter", showInfo);
  hotspot.addEventListener("mouseleave", hideInfo);
});
