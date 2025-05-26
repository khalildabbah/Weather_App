import React, { useState } from 'react';

const api= {
  key : "e934be3aa48e382cbca78882a924be6b",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query , setQuery] = useState('');
  const [weather , setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });

    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    
    // Format time to always show two digits
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${day} ${date} ${month} ${year} | ${hours}:${minutes}`;
  }

  const getBackgroundClass = (weather, date) => {
    if (typeof weather.main === "undefined") return 'app';
    
    const hour = date.getHours();
    const temp = weather.main.temp;
    
    // Use warm background for afternoon and evening, cold for morning and night
    if (hour >= 12 && hour < 21) {
      return 'app warm';  // Afternoon and evening (12 PM - 9 PM)
    } else {
      return 'app cold';  // Morning and night (9 PM - 12 PM)
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 18) ? 'app warm' : 'app cold') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">
            {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
           <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
