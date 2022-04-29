const APIKEY = "40f13a2a116244606434a8f958e22f5d"

const locationField = document.querySelector("#location");
const locBtn = document.querySelector("#locBtn");

locationField.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        e.preventDefault();
        locBtn.click();
    }
});

locBtn.addEventListener('click', () => {console.log(locationField.value)});
