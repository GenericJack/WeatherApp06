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
        // code to display current weather data in the currentWeather section
    }
    // function display 5 day forecast data
    function displayForecast(data) {
    // code to display forecast data in the forecast section
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

