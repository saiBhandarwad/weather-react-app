import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Today from "./components/Today";
import Tommorow from "./components/Tommorow";
import Nextday from "./components/Nextday";
import WeatherCard from "./components/WeatherCard";
import { createContext, useState, useEffect } from "react";
const Getweatherfunction = createContext()
const Getcoordinatesfunction = createContext()

function App() {

  //for getWeather function
  const [current, setCurrent] = useState()
  const [location, setLocation] = useState()
  const [forecast, setForecast] = useState()
  const [condition, setCondition] = useState()

  // for getCoordinates function
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [village, setVillage] = useState("")
  const [taluka, setTaluka] = useState("")
  const [district, setDistrict] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")

  //getWeather starts
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '79c6b4dd17msh99173bc8048d9b6p1aba9bjsn473741998611',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  const getWeather = (lat, long) => {

    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat},${long}&days=3`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setCurrent(response.current)
        setLocation(response.location)
        setForecast(response.forecast.forecastday)
        setCondition(response.current.condition)
      })
  }

  //getCoordinates starts
  const getCoordinates = async (city) => {

    await fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${city}&apiKey=RVVfOTI3ZTRiN2FjY2IzNGRiYmE4MGI4Y2I2ODkwNmMyMjQ6NjBkZDM5NTktN2Y5MC00OTRhLWEyMGUtMTMzYmFhYjJmNTRl`)
      .then((response) => response.json())
      .then((response) => {
        setLatitude(response.locations[0].referencePosition.latitude)
        setLongitude(response.locations[0].referencePosition.longitude)
        setVillage(response.locations[0].address.district)
        setTaluka(response.locations[0].address.city)
        setDistrict(response.locations[0].address.province)
        setState(response.locations[0].address.state)
        setCountry(response.locations[0].address.countryName)
        console.log(response)
        // console.log(response.locations[0].referencePosition.latitude, response.locations[0].referencePosition.longitude)
        let lat = response.locations[0].referencePosition.latitude
        let long = response.locations[0].referencePosition.longitude
        getWeather(lat, long)
        // console.log(lat, long)
      })
  }
  useEffect(() => {
    getCoordinates("new delhi")
  }, [])
  return (
    <Getweatherfunction.Provider value={{ getWeather, current, location, forecast, condition }}>
      <Getcoordinatesfunction.Provider value={{ getCoordinates, latitude, longitude, village, taluka, district, state, country }}>

        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element=<WeatherCard /> />
            <Route path='/today' element=<Today /> />
            <Route path='/tommorow' element=<Tommorow /> />
            <Route path='/nextday' element=<Nextday /> />
          </Routes>
        </Router>

      </Getcoordinatesfunction.Provider>
    </Getweatherfunction.Provider>
  );
}

export default App;
export { Getweatherfunction, Getcoordinatesfunction }
