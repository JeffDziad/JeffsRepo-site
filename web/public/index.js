const canvas = document.getElementById('c_index');
const c = canvas.getContext('2d');

const links = [{str:"Earthquakes", url:"Projects/EarthqualeMapping/earthquales.html"},
               {str: "QuadTrees", url:"Projects/QuadTree/quadtrees.html"}];
const particle_Count = 50;

let mouse = {
    x: 0,
    y: 0
}

let particles;
let texts;

function animate() {
    //Draw Loop
    requestAnimationFrame(animate);
    //Clear screen
    clearScreen('black');
    
    //Update Particles
    updateParticles();
    //Update Texts
    updateTexts();
}

function init() {
    //Initialize program
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    texts = [];
    generateTexts();

    particles = [];
    populateParticles();

    animate();    
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

init();