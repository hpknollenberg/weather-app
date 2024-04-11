import axios from 'axios'
let lat;
let lon;
let temp;
let condition;
let city;
let icon;


//Main Function to Get the Weather
function axiosWeather (zip) {
    axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=d874a5b2c03d18aa2d6ff411a3d736f6`)
    .then(response => { 
        console.log('data: ', response.data); 
        lat = response.data.lat;
        lon = response.data.lon;
        city = response.data.name;
        console.log(lat, lon, city);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d874a5b2c03d18aa2d6ff411a3d736f6`)
        .then(responseTwo => { 
            console.log('weather: ', responseTwo.data);
            temp = responseTwo.data.main.temp;
            condition = responseTwo.data.weather[0].description;
            icon = responseTwo.data.weather[0].icon;
            console.log(temp, condition);
            populateCity();
            populateTemperature();
            populateConditions();
            populateIcon();
            document.getElementById("error").innerHTML = "";
        })
    })
    .catch(error => {
        depopulateEverything();
        document.getElementById("error").innerHTML = "Error: Please enter a valid zip code.";
    })
}


//Listener for Get Weather Button
document.getElementById("weatherButton").addEventListener("click", () => {
    let zipInput = document.getElementById("zip-code").value;
    axiosWeather(zipInput);
})


//Populate Functions
function populateCity () {
    document.getElementById("city").innerHTML = city;
}

function populateTemperature () {
    document.getElementById("temp-k").innerHTML = Math.round(temp) + " K";
    document.getElementById("temp-f").innerHTML = Math.round((temp - 273.15) * 1.8 + 32) + " F";
    document.getElementById("temp-c").innerHTML = Math.round(temp - 273.15) + " C";
}

function populateConditions () {
    document.getElementById("conditions").innerHTML = condition;
}

function populateIcon () {
    document.getElementById("image").setAttribute(`src`, `https://openweathermap.org/img/wn/${icon}@4x.png`);
}

function depopulateEverything () {
    document.getElementById("image").setAttribute(`src`, ``);
    document.getElementById("conditions").innerHTML = "";
    document.getElementById("temp-k").innerHTML = "K";
    document.getElementById("temp-f").innerHTML = "F";
    document.getElementById("temp-c").innerHTML = "C";
    document.getElementById("city").innerHTML = "";
}