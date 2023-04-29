import React, {useContext} from 'react'
import { Getweatherfunction } from '../App'
import { Getcoordinatesfunction } from '../App'
import hum from "../images/humidity.png"

export default function WeatherCard() {
const {current,location,forecast,condition} = useContext(Getweatherfunction)
const {village,taluka,district,state,country} =useContext(Getcoordinatesfunction)

  return (
    <>
      
      {current?(<><div className="container ">
      
        <h1 className='text-center mt-4 mb-0 text-primary'>Weather For {village}  {taluka}</h1>
        <div className='text-center text-white my-2'>{district} | {state} | {country}</div>
        
<p className='text-center mb-0 text-white fs-1 '><img className='mb-2 ' src={condition.icon} alt="logo"  /> {current.temp_c}&deg;c</p>
<div className="text-center fs-4 pt-0 mt-0 mb-4 text-white">{condition.text}</div>
        <div className="row row-cols-1 row-cols-md-3 mb-3 mt-3 text-center">
          {/* */}
          <div className="col ">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-3">
                <h4 className="my-0 fw-normal text-primary">Temperature</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title" >{current.temp_c}&deg;c</h1>
                <div>cloud : {current.cloud}%</div>
                <div>feels like : {current.feelslike_c}&deg;c</div>
                <div>max Temperature : {forecast[0].day.maxtemp_c}&deg;c</div>
                <div>Min Temperature : {forecast[0].day.mintemp_c}&deg;c</div>
                
                <div>last updated : {current.last_updated.slice(10,16)} {current.last_updated.slice(11,13)>12?"PM":"AM"}</div>
                
                

              </div>
            </div>
          </div>
          {/*starts*/}
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-3">
                <h4 className="my-0 fw-normal text-primary">Humidity</h4>
              </div>
              
              <div className="card-body">
                <h1 className="card-title pricing-card-title">{current.humidity}<img className='pb-2 ms-1' src={hum} alt="%" height={"40px"}/></h1>
                
                <div>condition {condition.text}</div>
                <div>Humidity : {current.humidity}%</div>
                <div>{new Date(location.localtime_epoch*1000).toDateString()}</div>
                <div>time : {location.localtime.slice(11,16)} {location.localtime.slice(11,13)>12?"PM":"AM"}</div>
                <div>time zone : {location.tz_id}</div>
                

              </div>
            </div>
          </div>
          {/* */}
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-3">
                <h4 className="my-0 fw-normal text-primary">wind</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">{current.wind_kph} km/hr</h1>
                <div>wind degree : {current.wind_degree}&deg;c</div>
                <div>wind direction : {current.wind_dir}</div>
                <div>wind speed : {current.wind_kph} km/hr</div>
                <div>lattitude : {location.lat}</div>
                <div>longitude : {location.lon}</div>

              </div>
            </div>
          </div>
          {/*ends*/}
        </div>
      </div></>) : (<div className="spinner-border text-danger position-absolute top-50 start-50" role="status">
      <span class="sr-only">Loading...</span>
    </div>)
 }
    </>
  )
}
