/* Global Variables */

const baseAdress = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = "f149bf2e7ce94c3d2113206edcb52d07"; // My API Key for OpenWeatherMap API after regestration

// Create a new date instance dynamically with JS

let d = new Date();

let newDate = 1 + d.getMonth() + "." + d.getDate() + "." + d.getFullYear(); // adding 1 to get month as months in js start with 0


// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', doAction);

/* Function called by event listener */

function doAction(e) {
    e.preventDefault();

    //get user input

    const zipCode = document.getElementById("zip").value;

    const content = document.getElementById("feelings").value;

    getWeatherInfo(baseAdress, zipCode, apiKey)
        .then(function (data) {
            postInfo('/add', { date: newDate, temp: data.main.temp, content })
        }).then(function (newEntry) {
            // Updating browser content 
            updateUI()
        })

}
/* Getting Web API Data*/

const getWeatherInfo = async (baseAdress, zipCode, apiKey) => {
    const res = await fetch(
        `${baseAdress}?zip=${zipCode}&appid=${apiKey}&units=metric`
    );

    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

/* Creating function to post the information */

const postInfo = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content,
        }),
    });

    try {
        const newEntry = await response.json();

        return newEntry;
    } catch (error) {
        console.log(error);
    }
};

const updateUI = async () => {
    const request = await fetch("/all");

    try {
        const allData = await request.json()
        // update new entered data 
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    } catch (error) {
        console.log("error", error);
    }
};