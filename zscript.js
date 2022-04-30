const APIKEY = "c4cca234510e7d128e1b3e6285c096d0"

const locationField = document.querySelector("#location");
const locBtn = document.querySelector("#locBtn");
const resultContainer = document.querySelector(".result-container");

locationField.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        locBtn.click();
    }
});

locBtn.addEventListener('click', () => {
    console.log(locationField.value)
    handleQuery();
});

async function handleQuery() {
    const location = locationField.value;
    const response = await queryWeather(location);
    console.log(response);
    const weatherCard = await createWeatherCard(response);
    resultContainer.appendChild(weatherCard);
}


async function queryWeather(location) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`;
 
    return await fetch(URL, { mode: 'cors' })
    .then(function(response) {
        return response.json();
    })
    .catch(function(error){
        console.log(error);
    });

}

async function createWeatherCard(response) { 
    if (response.cod === "404") {
        const errNode = document.createElement("div");
        errNode.classList.add("cityNF");
        errNode.innerText = `city ${locationField.value} not found`;
        return errNode;
    }

    const baseNode = document.querySelector("#hidden-card");
    const newNode = baseNode.cloneNode(true);
    newNode.removeAttribute("hidden");
    newNode.removeAttribute("id");

    const nnLocation = newNode.querySelector(".wc-location");
    const nnMain = newNode.querySelector(".wc-main");
    const nnOther = newNode.querySelector(".wc-other");

    nnLocation.innerText=`${response.name}, ${response.sys.country}`;
    nnMain.children[0].innerText=`${Math.round(response.main.temp - 273.15)}°C  ${response.weather[0].description}`;
    nnMain.children[1].innerText=`Min: ${Math.round(response.main.temp_min - 273.15)}°C Max: ${Math.round(response.main.temp_max - 273.15)}°C`;
    nnOther.children[0].innerText=`Wind: ${response.wind.deg}° ${response.wind.speed} m/s`;
    nnOther.children[1].innerText=`Pressure: ${response.main.pressure} hPa`;
    nnOther.children[2].innerText=`Humidity: ${response.main.humidity} %`;

    console.log(baseNode);
    console.log(newNode);

    return newNode;
}