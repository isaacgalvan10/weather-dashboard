let searchForm = document.getElementById('search-form');
let cityInput = document.getElementById('city');
let city = '';
let cityHistoryEl = document.getElementById('city-history');
let citiesHistoryList = [];

// Search form submit listener
searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  city = cityInput.value;
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
  .then(data => console.log(data));
};

// Adds searched city to history
function addCitiesList(city) {
  cityHistoryEl.innerHTML = "";
  citiesHistoryList.push(city);

  for(let i = 0; i < citiesHistoryList.length; i++) {
    let li = document.createElement('li');
    li.classList = 'city-li';
    li.textContent = citiesHistoryList[i];
    cityHistoryEl.appendChild(li);
  }
};