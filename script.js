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


//need to get latitude/longitude data for the city 

var cityName = ;
var stateCode = ;
var countryCode = ;

function getCity() {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',' + stateCode + ',' + countryCode + '&limit=5&appid=53dde6618c2178392a38a7bdd50d3890';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            return data.json();
        })

        .then(function (,) {
            console.log("lat", "long");
        })

    //more needed here? -- just want to grab lat and long to use for next fetch
})
}

//need to display weather info
var currentWeather = //can i put in the attributes required?
var futureWeather = 

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

    fetch('https://ubahthebuilder.tech/posts/1')
        .then(data function () {
            return data.json();
        })
        .then(post function () {
            console.log(post."temp");
        });
}

var displayWeather = function ()

userFormEl.addEventListener('submit', formSearchHandler);
savedCityEl.addEventListener('click', buttonClickHandler);
