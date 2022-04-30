const APIKEY = "c4cca234510e7d128e1b3e6285c096d0"

const locationField = document.querySelector("#location");
const locBtn = document.querySelector("#locBtn");

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
    const weatherCard = createWeatherCard(response);
}


async function queryWeather(location) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`;
 
    return await fetch(URL, { mode: 'cors' })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        return JSON.parse(response);
    });

}

function createWeatherCard(response) { 

}