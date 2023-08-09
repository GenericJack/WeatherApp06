$(document).ready(function () {
    const API_KEY = "API KEY";

    // Function to fetch weather data from OpenWeatherMap API
    function getWeatherData(city) {
        // build the api url using coordinates
        const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${API_KEY}&units-metric';

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
        const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric';

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

        // loop through forecast data and siplay each day's forecast
        for (let i = 0; i < data.list.length; i++) {

            // extract data
            const forecast = data.list[i];
            const date = moment.unix(forecast.dt).format("MMMM D, YYYY");
            const iconCode = forecast.weather[0].icon;
            const temperature = forecast.main.temp;
            const humidity = forecast.main.humidity;
            const windSpeed = forecast.wind.speed;

            // create container for each day's forecast
            const dayConatiner = $("<div>").addClass("forecast-day");

            // create elements to display forecast data
            const dateEl = $("<h6>").text(date);
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
            const iconEl = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");
            const tempEl = $("<p>").text("Temp: " + temperature + " °F");
            const humidityEl = $("<p>").text("Humidity: " + humidity + "%");
            const windEl = $("<p>").text("Wind: " + windSpeed + " MPH");

            // append elements to the day's container
            dayConatiner.append(dateEl, iconEl, tempEl, humidityEl, windEl);

            // append the day's container to the forecast section
            forecastSection.append(dayContainer);
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

    const city = "North Port";
    getWeatherData(city);

    function addToSearchHistory(city) {
        // code to add city to the searchHistory section
    }
    $("#searchHistory").on("click", ".history-item", function () {
        const city = $(this).text();
        getWeatherData(city);
    });

});

$(document).ready(function() {
    // Style the title
    $("h1.display-3").css({
      "color": "#333",
      "font-size": "2rem",
      "margin-bottom": "20px"
    });
  
    // Style the search bar
    $(".search-form").css({
      "background-color": "#f8f9fa",
      "border": "1px solid #ced4da",
      "border-radius": "4px",
      "padding": "8px 15px",
      "margin-bottom": "20px"
    });
  
    // Style the forecast dashboard
    $(".forecast").css({
      "background-color": "#fff",
      "border": "1px solid #ced4da",
      "border-radius": "4px",
      "padding": "20px"
    });
  });