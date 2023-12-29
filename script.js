const apiKey ="5eb5616014488ad11567edfd52351afc";

const temperatureElement = document.querySelector('.temperature');
const locationElement = document.querySelector('.location');
const iconElement = document.querySelector('.icon');
const conditionElement = document.querySelector('.condition');
const searchBar = document.querySelector('.bar');
const searchButton = document.querySelector('button');

let weather = {
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&units=metric&appid=" +apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const temperature = Math.round(data.main.temp);
        const location = `${data.name}, ${data.sys.country}`;
        const icon = data.weather[0].icon;
        const condition = data.weather[0].description;

        temperatureElement.innerText = `${temperature}°C`;
        locationElement.innerText = location;
        iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
        conditionElement.innerText = condition;
    },
    search: function() {
        this.fetchWeather(searchBar.value);
    },
};

searchButton.addEventListener("click", function() {
    weather.search();
});

searchBar.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Mumbai");