import axios from 'axios';

let lat;
let lon;
let temp;
let condition;
let city;
let icon;

let currentColorClass = "load";


//On Load Get Position Function
function loadPosition (lat, lon) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d874a5b2c03d18aa2d6ff411a3d736f6`)
    .then(responseTwo => { 
        temp = responseTwo.data.main.temp;
        condition = responseTwo.data.weather[0].description;
        icon = responseTwo.data.weather[0].icon;
        city = responseTwo.data.name;
        document.getElementById("city").innerHTML = city;
        populateTemperature();
        populateConditions();
        populateIcon();
        document.getElementById("error").innerHTML = "";
        document.getElementById('spinner').className = "";
        console.log(responseTwo);
    })
}

navigator.geolocation.getCurrentPosition((position) => {
    loadPosition(position.coords.latitude, position.coords.longitude);
});



//Main Function to Get the Weather
function axiosWeather (zip) {
    document.getElementById('spinner').className = "spinner-border text-info";
    axios.get(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=d874a5b2c03d18aa2d6ff411a3d736f6`)
    .then(response => { 
        lat = response.data.lat;
        lon = response.data.lon;
        city = response.data.name;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d874a5b2c03d18aa2d6ff411a3d736f6`)
        .then(responseTwo => { 
            temp = responseTwo.data.main.temp;
            condition = responseTwo.data.weather[0].description;
            icon = responseTwo.data.weather[0].icon;
            populateCity();
            populateTemperature();
            populateConditions();
            populateIcon();
            document.getElementById("error").innerHTML = "";
            document.getElementById('spinner').className = "";
        })
    })
    .catch(error => {
        depopulateEverything();
        document.getElementById("error").innerHTML = "ERROR: PLEASE ENTER A VALID ZIP CODE.";
        document.getElementById('spinner').className = "";
    })
}


//Listener for Get Weather Button
document.getElementById("weatherButton").addEventListener("click", () => {
    let zipInput = document.getElementById("zip-code").value;
    axiosWeather(zipInput);
})

let input = document.getElementById("zip-code");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("weatherButton").click();
    }
});


//Populate Functions
function populateCity () {
    document.getElementById("city").innerHTML = city;
}

function populateTemperature () {
    document.getElementById("temp-k").innerHTML = Math.round(temp) + " K";
    document.getElementById("temp-f").innerHTML = Math.round((temp - 273.15) * 1.8 + 32) + " F";
    document.getElementById("temp-c").innerHTML = Math.round(temp - 273.15) + " C";
    
    let tempF = Math.round((temp- 273.15) * 1.8 + 32);

    if (tempF >= 80) {
        document.getElementById("sub-title-1").classList.replace(currentColorClass, "hot");
        document.getElementById("sub-title-2").classList.replace(currentColorClass, "hot");
        document.getElementById("sub-title-3").classList.replace(currentColorClass, "hot");
        document.getElementById("sub-title-4").classList.replace(currentColorClass, "hot");
        currentColorClass = "hot";
    } else if (tempF >= 45 && tempF < 80) {
        document.getElementById("sub-title-1").classList.replace(currentColorClass, "mild");
        document.getElementById("sub-title-2").classList.replace(currentColorClass, "mild");
        document.getElementById("sub-title-3").classList.replace(currentColorClass, "mild");
        document.getElementById("sub-title-4").classList.replace(currentColorClass, "mild");
        currentColorClass = "mild";
    } else if (tempF < 45) {
        document.getElementById("sub-title-1").classList.replace(currentColorClass, "cold");
        document.getElementById("sub-title-2").classList.replace(currentColorClass, "cold");
        document.getElementById("sub-title-3").classList.replace(currentColorClass, "cold");
        document.getElementById("sub-title-4").classList.replace(currentColorClass, "cold");
        currentColorClass = "cold";
    }
}

function populateConditions () {
    document.getElementById("conditions").innerHTML = condition;

    if (condition.includes("rain") || condition.includes("thunderstorm")) {
        document.getElementById("sub-title-1").classList.replace(currentColorClass, "rain");
        document.getElementById("sub-title-2").classList.replace(currentColorClass, "rain");
        document.getElementById("sub-title-3").classList.replace(currentColorClass, "rain");
        document.getElementById("sub-title-4").classList.replace(currentColorClass, "rain");
        currentColorClass = "rain"
    }
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

    document.getElementById("sub-title-1").classList.replace(currentColorClass, "load");
    document.getElementById("sub-title-2").classList.replace(currentColorClass, "load");
    document.getElementById("sub-title-3").classList.replace(currentColorClass, "load");
    document.getElementById("sub-title-4").classList.replace(currentColorClass, "load");
    currentColorClass = "load";
}



