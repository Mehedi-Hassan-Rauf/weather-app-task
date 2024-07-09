const search = document.getElementById("search");
const city = document.getElementById("city");
const modal = document.getElementById("modal");
const warning = document.getElementById("warning");
const closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", () => {
  modal.classList.remove("open");
});
search.addEventListener("click", () => {
  getWeather();
});

const warningHandler = (str) => {
  const warningHtml = `
            <h2>${str}</h2>`;
  warning.innerHTML = warningHtml;
  modal.classList.add("open");
};

const getWeather = () => {
  const query = city.value;
  const apiKey = "f46c40c20ea440f993c64108240907";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`;
  if (!query) {
    warningHandler("You have to enter a city name!");
    return;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      warningHandler("Sorry,We can't find the city you have entered.");
      console.error("Error fetching current weather data:", error);
    });
  city.value = "";
};

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");

  // Clear previous content
  weatherInfoDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (!data) {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.location.name;
    const temperature = Math.round(data.current.temp_c);
    const description = data.current.condition.text;
    const iconCode = data.current.condition.icon;
    const iconUrl = `https:${iconCode}`;

    const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

    const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    showImage();
  }
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block"; // Make the image visible once it's loaded
}
