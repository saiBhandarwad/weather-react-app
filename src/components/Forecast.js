import React, { useContext } from 'react'
import { Getweatherfunction } from '../App'
import { Getcoordinatesfunction } from '../App'
import "./Forecast.css"

export default function Forecast({ i }) {
    const { current, forecast } = useContext(Getweatherfunction)
    const { village, taluka, district, state, country } = useContext(Getcoordinatesfunction)

    return (
        <>

            {forecast ? (<><div className="container ">

                <h1 className='text-center mt-4 mb-0 text-primary'>Forecast For {village}  {taluka}</h1>
                <div className='text-center text-white my-2'>{district} | {state} | {country} ( {new Date(forecast[i].date_epoch * 1000).toDateString()} )</div>

                <p className='text-center mb-0 text-white fs-1 '><img className='mb-2 ' src={forecast[i].day.condition.icon} alt="logo" /> {forecast[i].day.avgtemp_c}&deg;c</p>
                <div className="text-center fs-5 pt-0 mt-0 mb-4 text-white">{forecast[i].day.condition.text}</div>
                <div className="text-center fs-5 pt-0 mt-0 mb-4 text-white">Will It Rain Today : {forecast[i].day.daily_will_it_rain === 1 ? "YES" : "NO"} </div>
                <div className="text-center fs-5 pt-0 mt-0 mb-4 text-white">Chances of Rain Today : {forecast[i].day.daily_chance_of_rain}%</div>
                <div className="row row-cols-1 row-cols-md-2 mb-3 mt-3 text-center">
                    {/*starts*/}
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal text-primary">Forecast</h4>
                            </div>

                            <div className="card-body">

                                <div>Date : {new Date(forecast[i].date_epoch * 1000).toDateString()}</div>
                                <div>Sunrise : {forecast[i].astro.sunrise}</div>
                                <div>Sunset : {forecast[i].astro.sunset}</div>
                                <div>Max Wind : {forecast[i].day.maxwind_kph} km/hr</div>
                                <div>Total Precipitation : {forecast[i].day.totalprecip_mm
                                } mm / {forecast[i].day.totalprecip_in
                                    } inch</div>


                            </div>
                        </div>
                    </div>
                    {/* */}
                    <div className="col ">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal text-primary">Temperature</h4>
                            </div>
                            <div className="card-body">
                                <div>Max Temperature : {forecast[i].day.maxtemp_c}&deg;c</div>
                                <div>Min Temperature : {forecast[i].day.mintemp_c}&deg;c</div>
                                <div>Average Temperature : {forecast[i].day.avgtemp_c}&deg;c</div>
                                <div>Average Humidity : {forecast[i].day.avghumidity
                                }&deg;c</div>

                                <div>Last Updated : {current.last_updated.slice(10, 16)} {current.last_updated.slice(11, 13) > 12 ? "PM" : "AM"}</div>



                            </div>
                        </div>
                    </div>
                    {/* */}

                    {/*ends*/}
                </div>
            </div>

                {/* scroll starts here*/}

                <h2 className='text-white container text-primary'>Hourly Forecast</h2>
                <hr className='text-white container' />
                <div className="scroll container">
                    {forecast[i].hour.map((curElem, index) => {
                        return (
                            <div className="bigbox container" key={index}>
                                <div className="box " >
                                    <div className='text-center pt-3'><strong>
                                        {new Date(curElem.time_epoch * 1000).getHours()===0?"12":new Date(curElem.time_epoch * 1000).getHours()<=12?new Date(curElem.time_epoch * 1000).getHours():(new Date(curElem.time_epoch * 1000).getHours())-12}:00 {new Date(curElem.time_epoch * 1000).getHours() < 12 ? "AM" : "PM"}</strong>
                                    </div>

                                    <div>
                                        <span className=''><img src={curElem.condition.icon} alt="logo" /></span>
                                        <span>{curElem.temp_c}&deg;c</span>
                                    </div>
                                    <div>Will Rain : {curElem.will_it_rain === 0 ? "No" : "Yes"}</div>
                                    <div>Chances Of Rain : {curElem.chance_of_rain
                                    } %</div>
                                    <div>Condition: {curElem.condition.text}</div>
                                    <div>Wind Direction : {curElem.wind_dir}</div>
                                    <div>Wind Speed : {curElem.wind_kph} km/hr</div>
                                    <div>Wind Degree : {curElem.wind_degree}&deg;c</div>
                                </div>
                            </div>
                        )

                    })
                    }
                </div>
                <hr className='text-white' />


                {/* scroll ends here */}

            </>) : (<div className="spinner-border text-danger position-absolute top-50 start-50" role="status">
            <span class="sr-only">Loading...</span>
          </div>)
            }
        </>
    )
}
