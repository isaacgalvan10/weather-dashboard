let searchForm = document.getElementById('search-form');
let cityInput = document.getElementById('city');
let city = '';
let cityHistoryEl = document.getElementById('city-history');
let citiesHistoryList = [];
let currentCityName = document.getElementById('city-name');
let currentWeatherImg = document.getElementById('weather-img');
let currentTemp = document.getElementById('temp');
let currentWind = document.getElementById('wind');
let currentHumidity = document.getElementById('humidity');
let currentUV = document.getElementById('uv');

// Search form submit listener
searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  if (cityInput.value !== '') {
    city = cityInput.value;
  }
  console.log(city);
  getWeather();
  addCitiesList(city);
  cityInput.value = '';
});

// Calls the API with city and returns data
function getWeather() {
  let api = `https://api.weatherapi.com/v1/forecast.json?key=b3d0f4cbc3c3431384d204030213112&q=${city}&days=5&aqi=no&alerts=no`;
  console.log(api);
  fetch(api)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    currentCityName.textContent = `${data.location.name} (${data.location.localtime})`;
    currentWeatherImg.src = data.current.condition.icon;
    currentTemp.textContent = `${data.current.temp_f}°F`;
    currentWind.textContent = `${data.current.wind_mph} MPH`;
    currentHumidity.textContent = `${data.current.humidity}%`;
    currentUV.textContent = `${data.current.uv}`;

    if (data.current.uv <= 2 ) {
      currentUV.classList.add('low');
    } else if (data.current.uv <= 6 ) {
      currentUV.classList.add('moderate');
    } else if (data.current.uv >= 7 ) {
      currentUV.classList.add('high');
    };
  });
};

function init() {
  let citiesStorage = localStorage.getItem('cities');
  if (citiesStorage) {
    citiesHistoryList = JSON.parse(citiesStorage);
    loopThroughCities();
  }
}


// Adds searched city to history
function addCitiesList(city) {
  console.log(city);
  console.log(citiesHistoryList);
  cityHistoryEl.innerHTML = "";
  citiesHistoryList.unshift(city);

  if (citiesHistoryList.length > 8) {
    citiesHistoryList.pop();
  };

  saveToStorage(citiesHistoryList);
  
  loopThroughCities();

};

function loopThroughCities() {
  for(let i = 0; i < citiesHistoryList.length; i++) {
    let li = document.createElement('li');
    li.classList = 'city-li';
    li.textContent = citiesHistoryList[i];
    cityHistoryEl.appendChild(li);
  }
};

cityHistoryEl.addEventListener('click', function(e) {
  city = e.target.innerText;
  getWeather();
});


function saveToStorage(cities) {
  localStorage.setItem('cities', JSON.stringify(cities));
};

init();