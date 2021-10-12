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


//establish variables that point to different elements on the page

var userFormEl = document.querySelector('.form-container');
var cityInputEl = document.querySelector('.input-city');
var resultsContainerEl = document.querySelector('.results-container');
var searchBtn = document.querySelector('.search-btn');
var savedCityEl = document.querySelector('.saved-searches');
var iconEl = document.querySelector('.icon');


//create function that searches for a city when inputted by user
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

//function that calls on open weather map to get lat and lon for whatever city is entered
function getCoords(cityName) {

    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=53dde6618c2178392a38a7bdd50d3890';

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
        })
}

//need to fetch weather info by using coords and specific parameters

var getWeather = function (latitude, longitude) {

    var currentApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=current,minutely,hourly,alerts&appid=53dde6618c2178392a38a7bdd50d3890'

    return fetch(currentApiUrl)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            const daily = data.daily
            return daily.slice(0, 6).map(dayData => ({
                dt: new Date(dayData.dt * 1000).toString().split(" ").slice(1, 4).join(" "),
                temp: (dayData.temp.day - 273.15) * 1.8 + 32,
                humidity: dayData.humidity,
                wind_speed: dayData.wind_speed,
                uvi: dayData.uvi,
                icon: dayData.weather[0].icon
            }))


        })

}


//function to display the weather data that was pulled from open weather map
var displayWeather = function (weatherDatas) {
    const weatherEls = weatherDatas.map(createWeatherEl)
    resultsContainerEl.innerHTML = "";
    weatherEls.forEach(function (weatherEl) {
        resultsContainerEl.appendChild(weatherEl);
    })
}


//create elements for where to display each piece of data
var createWeatherEl = function (weatherData) {

    const wrapper = document.createElement("div")
    const weatherElDate = document.createElement("h2")
    weatherElDate.textContent = weatherData.dt
    wrapper.appendChild(weatherElDate);

    const weatherElIcon = document.createElement("img")
    weatherElIcon.src = "https://openweathermap.org/img/wn/" + weatherData.icon + "@2x.png";
    wrapper.appendChild(weatherElIcon);

    const weatherElTemp = document.createElement("div")
    weatherElTemp.textContent = "Temperature: " + weatherData.temp.toFixed(0) + " degrees fahrenheit"
    wrapper.appendChild(weatherElTemp);

    const weatherElHumidity = document.createElement("div")
    weatherElHumidity.textContent = "Humidity: " + weatherData.humidity
    wrapper.appendChild(weatherElHumidity);

    const weatherElWind = document.createElement("div")
    weatherElWind.textContent = "Wind Speed: " + weatherData.wind_speed
    wrapper.appendChild(weatherElWind);

    const weatherElUvi = document.createElement("btn")
    weatherElUvi.textContent = "UVI Index: " + weatherData.uvi

    //color changes on uvi button based on index value
    weatherElUvi.style.backgroundColor = function () {
        if (weatherData.uvi.value <= 2) {
            "green";
        } else if (weatherData.uvi.value >= 3 && weatherData.uvi.value <= 5) {
            "yellow";
        } else if (weatherData.uvi.value >= 6 && weatherData.uvi.value <= 7) {
            "orange";
        } else if (weatherData.uvi.value >= 8 && weatherData.uvi.value <= 10) {
            "red";
        } else {
            "purple";
        }
    };

    wrapper.appendChild(weatherElUvi);

    return wrapper
}




//store searches and allow them to be clicked on
var displayHistory = function (lookupHistory) {
    const lookupHistoryEls = lookupHistory.map(function (lookup) {
        const wrapper = document.createElement("div");
        wrapper.textContent = lookup;
        wrapper.addEventListener("click", function () {
            updateWeather(lookup)
        })
        return wrapper
    })

    savedCityEl.innerHTML = ""

    lookupHistoryEls.forEach(function (lookupHistoryEl) {
        savedCityEl.appendChild(lookupHistoryEl)
    })
}

var updateWeather = function (cityName) {
    updateHistory(cityName);
    getCoords(cityName)
        .then(function (coords) {
            return getWeather(coords.lat, coords.lon)
        })
        .then(function (weatherData) {
            displayWeather(weatherData)
        })
}

var updateHistory = function (cityName) {
    let lookupHistory = localStorage.getItem("lookup-history") || "[]"
    lookupHistory = JSON.parse(lookupHistory);
    if (cityName) lookupHistory.unshift(cityName);
    lookupHistory = lookupHistory.filter((e, i) => lookupHistory.indexOf(e) === i);
    localStorage.setItem("lookup-history", JSON.stringify(lookupHistory))
    displayHistory(lookupHistory);
}

userFormEl.addEventListener('submit', formSearchHandler);
updateHistory();

