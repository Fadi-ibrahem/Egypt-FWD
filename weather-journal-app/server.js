// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


/* Setup Server */

// Port to Receive the connection
const port = 8000;

// Callback to debug
function listening() {
    console.log("Server Running");
    console.log(`Running on localhost: ${port}`);
};

// Spin up the server
const server = app.listen(port, listening);

// Initialize all route with a callback function
app.get('/all', getData)

// Callback function to complete GET '/all'
function getData(request, response) {
    response.send(projectData)
}

// Post Route
app.post('/postData', (request, response) => {

    projectData = {
        temp: request.body.temp,
        date: request.body.date,
        content: request.body.content
    }
});