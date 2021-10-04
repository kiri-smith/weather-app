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
var savedCityEl = document.querySelector('saved-results');



var formSearchHandler = function (event) {
    event.preventDefault();

    var citySearched = cityInputEl.value.trim();

    if (citySearched) {
        getWeather(citySearched);

        resultsContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Weather info cannot be displayed for that city");
    }
};

var buttonClickHandler = function (event) {
    var savedCity = event.target.getAttribute('') //<-saved city buttons?

    if (savedCity) {
        getWeather(savedCity);

        resultsContainerEl.textContent = '';
    }
}

//need to create weather attributes to display
var getWeather = function (weather) {
    var apiUrl = ''

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, weather);
                });
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Unable to connect to weather data')
        });
}

var displayWeather = function ()

userFormEl.addEventListener('submit', formSearchHandler);
savedCityEl.addEventListener('click', buttonClickHandler);
