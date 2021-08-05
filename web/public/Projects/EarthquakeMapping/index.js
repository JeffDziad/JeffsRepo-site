const width = 1024;
const height = 512;
const token = "sk.eyJ1IjoiamVmZmR6aWFkIiwiYSI6ImNrcnNrZ3lzazlpd3Iydm10dzFiOWJpM24ifQ.SMp2chrya3_7UwIjy080Kw";
const apiCmd = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/0,0,1,0,0/${width}x${height}?access_token=${token}`;
const dataURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv";

let raw_data;
let earthquakes;

let mapImg;

let center_lat = 0;
let center_lon = 0;

let zoom = 1;

let r = 0, g = 0, b = 0;

function preload() {
    mapImg = loadImage(apiCmd);
    raw_data = loadStrings(dataURL);
    earthquakes = [];
}

function mercX(lon) {
    lon = radians(lon);
    let a = (256 / PI) * pow(2, zoom);
    let b = (lon + PI);
    return a * b;
}

function mercY(lat) {
    lat = radians(lat);
    let a = (256 / PI) * pow(2, zoom);
    let b = tan(PI / 4 + lat / 2);
    let c = PI - log(b);
    return a * c;
}

function mapQuake(quake) {
    let qlat = parseInt(quake[1]);
    let qlon = parseInt(quake[2]);
    let qmag = parseInt(quake[4]);

    let cy = mercY(center_lat);
    let cx = mercX(center_lon);

    let y = mercY(qlat) - cy;
    let x = mercX(qlon) - cx;

    if(qmag >= 0 && qmag <= 1.5) {
        r = 243;
        g = 255;
        b = 20;
        console.log("test");
    } else if(qmag > 1.5 && qmag < 2.5) {
        r = 255;
        g = 167;
        b = 15;
    }else if(qmag >= 2.5) {
        r = 255;
        g = 15;
        b = 15;
    }
    printQuake(quake, r, g, b);
    fill(`rgba(${r}, ${g}, ${b}, 0.5)`);
    ellipse(x, y, qmag * 5);
}

function sortData(data) {
    for(let i = 0; i < data.length; i++) {
        earthquakes[i] = data[i].split(',');
    }
}

function printQuake(quake, r, g, b) {
    let q = createP(`${quake[0]}, ${quake[1]}, ${quake[2]}, ${quake[4]}`);
    q.style('color', `rgb(${r}, ${g}, ${b})`);
}

function setup() {
    //Prep data
    sortData(raw_data);
    let heading = createP(`Date - Latitude - Longitude - Magnitude`);
    heading.style('color', 'white');

    //Make Map
    createCanvas(width, height);
    translate(width/2, height/2);
    imageMode(CENTER);
    image(mapImg, 0, 0);

    //Map data
    for(let i = 1; i < earthquakes.length; i++) {
        mapQuake(earthquakes[i]);
    }
}
