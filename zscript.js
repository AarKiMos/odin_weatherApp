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
    queryWeather(locationField.value)
});


function queryWeather(location) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`;

    fetch(URL, {
        mode: 'cors'
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
        });
}