const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const toggleButton = document.getElementById("toggle-button");
const toggleStatus = document.getElementById("toggle-status");

const temperatureElement = document.querySelector(".temperature");
var isCelsius = true;

toggleButton.addEventListener("change", function() {
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
});


function updateTemperatureDisplay() { //function to toggle between units of temparature
    const temperatureValue = parseFloat(temperatureElement.textContent);
    var toggleButton=false;
    if (isCelsius) {
        const tempC = Math.round((temperatureValue - 32) * 5/9);
        temperatureElement.textContent = `${(tempC)} °C`;
        document.querySelector(".weather_img"); // Update description as needed
        document.querySelector(".description"); // Update description as needed

    } else {
        const tempF = Math.round((temperatureValue * 9/5)) + 32;
        temperatureElement.textContent = `${tempF} °F`;
        document.querySelector(".weather_img"); // Update description as needed
        document.querySelector(".description"); // Update description as needed
    }
}

// Initial temperature display (in Celsius)
updateTemperatureDisplay();

async function checkWeather(city){  // Open Weather Map API used
    const api_key = "52e78029e003ced500a452a1be789c90";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === `404`){ //if wrong or invalid location entered then this happens
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch(weather_data.weather[0].main){ //cases for Weather in the location
        case 'Clouds':
            weather_img.src = "https://cdn2.iconfinder.com/data/icons/weather-365/64/weather-sun-cloud-rain-512.png";
            break;
        case 'Clear':
            weather_img.src = "./assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "./assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "./assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./assets/snow.png";
            break;
    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});