import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components//current-weather/current-weather'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {

  const [currentWeather , setcurrentWeather]=useState(null);
  const [forecast , setforecast]=useState(null);
  const handleOnSearchChange=(searchData)=>{
    const [lat,lon]=searchData.value.split(" ");

    const currentWeatherfetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)


    const forecastfetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherfetch,forecastfetch])
    .then(async(response)=>{
     const weatherResponce = await response[0].json();
     const forecastResponce = await response[1].json();
      setcurrentWeather({city: searchData.label, ...weatherResponce});
      setforecast({city: searchData.label, ...forecastResponce});
      
    })
    .catch((err)=>console.log(err));
  }
  console.log(currentWeather);
  console.log(forecast);
  return (
    
    <div className="container">
      
      <div className='left'>
       
     <Search onSearchChange={handleOnSearchChange}/>
     { currentWeather && <CurrentWeather data={currentWeather}/>}
     {/* <Forecast data={forecast}/> */}
     
     </div>  
     
     <div className='right'>
     {forecast && <Forecast data={forecast} />}
     </div>
    </div>
   
  );
}
 
export default App;
