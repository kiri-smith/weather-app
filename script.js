//create a form with an "input"
//put in city--on click "Search", current weather and next 5 day forecast is displayed
//current weather: city name, date, an icon to represent the weather conditions, temperature, humidity, wind speed, uv index
//uv index is color coded based on favorable, moderate or severe --- look up colors!
//future weather: dates, icon representing each day's conditions, temperature, humidity
//that city is added to search history (local storage)
//clicking the city in the search history brings up the conditions

//click event -- to input city

//fetch geo for lat and long to use
//fetch that city's data by linking to geo results
//display required elements

//store that city in local storage

var userFormEl = document.querySelector('.form-container');
var cityInputEl = document.querySelector('.input-city');
var resultsContainerEl = document.querySelector('.results-container');
var searchBtn = document.querySelector('.search-btn');
var savedCityEl = document.querySelector('.saved-searches');
var iconEl = document.querySelector('.icon');



var formSearchHandler = function (event) {
    event.preventDefault();

    var citySearched = cityInputEl.value.trim();

    if (citySearched) {
        updateWeather(citySearched);

        resultsContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Weather info cannot be displayed for that city");
    }
};

function getCoords(cityName) {

    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=53dde6618c2178392a38a7bdd50d3890';



    return fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            const dataObject = data[0];
            return {
                lat: dataObject.lat,
                lon: dataObject.lon
            }
            console.log("lat", "long");

        })
}

//need to display weather info

var getWeather = function (latitude, longitude) {

    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=current,minutely,hourly,alerts&appid=53dde6618c2178392a38a7bdd50d3890'


    return fetch(currentApiUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            const daily = data.daily
            return daily.slice(0, 5).map(dayData => ({
                dt: new Date(dayData.dt * 1000).toString().split(" ").slice(1, 4).join(" "),
                temp: dayData.temp.day,
                humidity: dayData.humidity,
                wind_speed: dayData.wind_speed,
                uvi: dayData.uvi,
                icon: dayData.weather[0].icon
            }))
            c
        })

}


var displayWeather = function (weatherDatas) {
    const weatherEls = weatherDatas.map(createWeatherEl)
    resultsContainerEl.innerHTML = "";
    weatherEls.forEach(function (weatherEl) {
        resultsContainerEl.appendChild(weatherEl);
    })
}

var createWeatherEl = function (weatherData) {
    const wrapper = document.createElement("div")
    const weatherElDate = document.createElement("h2")
    weatherElDate.textContent = weatherData.dt
    wrapper.appendChild(weatherElDate);

    const weatherElIcon = document.createElement("img")
    weatherElIcon.src = "http://openweathermap.org/img/wn/" + weatherData.icon + "@2x.png";
    wrapper.appendChild(weatherElIcon);

    const weatherElTemp = document.createElement("div")
    weatherElTemp.textContent = "Temperature (in celsius): " + weatherData.temp
    wrapper.appendChild(weatherElTemp);

    const weatherElHumidity = document.createElement("div")
    weatherElHumidity.textContent = "Humidity: " + weatherData.humidity
    wrapper.appendChild(weatherElHumidity);

    const weatherElWind = document.createElement("div")
    weatherElWind.textContent = "Wind Speed: " + weatherData.wind_speed
    wrapper.appendChild(weatherElWind);

    const weatherElUvi = document.createElement("div")
    weatherElUvi.textContent = "UVI Index: " + weatherData.uvi
    wrapper.appendChild(weatherElUvi);

    return wrapper
}



userFormEl.addEventListener('submit', formSearchHandler);
updateHistory();

