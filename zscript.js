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
    nnMain.innerText=`${response.main.temp - 273.15}°C`;

    console.log(baseNode);
    console.log(newNode);

    return newNode;
}