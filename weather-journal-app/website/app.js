/* Global Variables */
const serverURL = 'http://localhost:8000/';
const apiKey = '&appid=01de94a2a0d8d497dbfde0efabc1a0af&units=imperial'; // Personal API Key for OpenWeatherMap API
const generateButton = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(event) {

    // Select the actual value of an HTML input to include in POST
    const feelings = document.getElementById('feelings').value;

    // API call
    getApiData(apiKey)
    
    // After Getting data from API Be Resolved 
    .then(function(data) {
    
        // Add data
        postDataToServer(`${serverURL}postData`, {date:newDate, temp: data.main.temp, content:feelings})
    
        // We can do this because of Asunc!
        updateUI();
        })
}

/* Function to GET Web API Data*/
const getApiData = async (apiKey) => {

    // Select the actual value of an HTML input to include in GET
    const zipCode = document.getElementById('zip').value;

    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postDataToServer = async ( url='', data = {}) => {

    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), // body data type must match "Content-Type", and convert it to string
    });

    try {
        const newData = await response.json();
        return newData
    }catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data From The Server*/
const updateUI = async () => {
    const request = await fetch(`${serverURL}all`);
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = "The Date is: " + allData.date;
        document.getElementById('temp').innerHTML = "The Temprature is: " + allData.temp + " Fahrenheit";
        document.getElementById('content').innerHTML = "The Feelings is: " + allData.content;

    } catch(error) {
        console.log("error", error)
    }
}