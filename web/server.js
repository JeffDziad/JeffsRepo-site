//Set up dependecies
const express = require('express');
const app = express();

//Start listener on desired port
let port = 3000;
app.listen(port, () => {
    console.log("Listening: " + port);
});

//Serve Webpage
//Point incomming connections to public directory and serve
app.use(express.static('public'));