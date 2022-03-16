// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Dependencies
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Post Route
const data = [];
app.post('/add', dataAdd);

function dataAdd(req, res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
}

app.get('/all', getYourData);

function getYourData(req, res) {
    res.send(projectData);
}


const port = 8080;
const listen = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
};
