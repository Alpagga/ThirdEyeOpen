// List of p5.js sketch files
const sketches = [
    //"P5.js/sketch1.js", Not that impressive
    //"P5.js/sketch2.js", .OBJ not working on MAC
    //"P5.js/sketch3.js",
    //"P5.js/sketch4.js", GIF
    //"P5.js/sketch5.js", GAME of Life
    "P5.js/sketch6.js",
    "P5.js/sketch7.js",
    "P5.js/sketch8.js",
    "P5.js/sketch9.js",
    "P5.js/sketch10.js",
    "P5.js/sketch11.js",
    "P5.js/sketch12.js",
    "P5.js/sketch13.js",
    "P5.js/sketch14.js",
    "P5.js/sketch15.js",
    "P5.js/sketch16.js",
    "P5.js/sketch17.js",
    "P5.js/sketch18.js",
    "P5.js/sketch19.js"
];

const sketchess = ["P5.js/sketch19.js"];

// Variable to keep track of the current p5 instance
let currentP5Instance = null;

// Function to load a random sketch
function loadRandomSketch() {
    // Ensure any previously created p5 instance is removed
    if (currentP5Instance) {
        currentP5Instance.remove();  // Remove the old canvas and its instance
        currentP5Instance = null;    // Reset the instance to prevent further actions on it
    }

    // Remove the old script element if it exists
    const existingScript = document.getElementById("p5-sketch");
    if (existingScript) {
        existingScript.remove();
    }

    // Choose a random sketch from the list
    const randomSketch = sketches[Math.floor(Math.random() * sketches.length)];

    // Dynamically load the chosen sketch script
    const script = document.createElement("script");
    script.src = randomSketch;
    script.id = "p5-sketch";
    script.onload = () => {
        console.log(`Loaded sketch: ${randomSketch}`);
    };
    script.onerror = () => {
        console.error(`Failed to load sketch: ${randomSketch}`);
    };

    // Append the script to the body to load the new sketch
    document.body.appendChild(script);
}


function callFunction() {
    loadRandomSketch();
}

setInterval(callFunction, 100000);

// Initialize when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initial random sketch load on page load
    loadRandomSketch();

    // Ensure the button is available before adding the event listener
    document.onkeydown = function(e){
        e = e || window.event;
        var key = e.which || e.key;
        if(key===13){
            loadRandomSketch();
        }
    }
});