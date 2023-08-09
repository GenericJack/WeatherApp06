$(document).ready(function () {
    const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

    // Function to fetch weather data from OpenWeatherMap API
    function getWeatherData(city) {
        // build the api url using coordinates
        const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

        // fetch current weather data
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // display current weather data
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error("Error fetching current weather data:", error);
        });
        // build api url for 5 day forecast
        const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}';

        // fetch 5 day forecast data
        fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            // display data
            displayForecast(data);
        })
        .catch(error => {
            console.error("Error fetching forecast data:", error);
        });
    }
    // function to display weather data
    function displayCurrentWeather(data) {
     const currentWeatherSection = $("#currentWeather");

     currentWeatherSection.empty();

    //  extract data from api response
     const city = data.name;
     const date = moment.unix(data.dt).format("MMMM D, YYYY");
     const iconCode = data.weather[0].icon;
     const temperature = data.main.temp;
     const humidity = data.main.humidity;
     const windSpeed = data.wind.speed;
     
    //  elements to display weather data
     const cityEl = $("<h2>").text(city + " (" + date + ")");
     const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
     const iconEl = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");
     const tempEl = $("<p>").text("Temperature: " + temperature + " °F");
     const humidityEl = $("<p>").text("Humidity: " + humidity + "%");
     const windEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");

     currentWeatherSection.append(cityEl, iconEl, tempEl, humidityEl, windEl);
    }
    // function display 5 day forecast data
    function displayForecast(data) {
        const forecastSection = $("#forecast");

        forecastSection.empty();

        // loop through forecast dataand siplay each day's forecast
        for (let i = 0; i < data.list.length; i++) {
            // extract data
            const forecast = data.list[i];
            const date = moment.unix(forecast.dt).format("MMMM D, YYYY");
            const iconCode = forecast.weather[0].icon;
            const temperature = forecast.main.temp;
            const humidity = forecast.main.humidity;
            const windSpeed = forecast.wind.speed;
        }
    }

    // function to handle form submission
    $("#searchForm").on("submit", function (event) {
        event.preventDefault();
        const city = $("#cityInput").val().trim();
        // check if city is not empty
        if (city !== "") {
            // Clear the input field
            $("#cityInput").val("");
            // fetch weather data for the entered city
            getWeatherData(city);
        }
    });

    function addToSearchHistory(city) {
        // code to add city to the searchHistory section
    }
    $("#searchHistory").on("click", ".history-item", function () {
        const city = $(this).text();
        getWeatherData(city);
    });

});

