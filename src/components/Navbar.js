import React, {useContext, useEffect, useState} from 'react'
import logo from "../images/weather.png"
import { Link, useLocation } from 'react-router-dom'
import { Getcoordinatesfunction} from '../App'


export default function Navbar() { 
    const {getCoordinates} = useContext(Getcoordinatesfunction)
  const [inputData, setInputData] = useState("")
  let locationpath = useLocation()
  const handleclick = (city) =>{
    getCoordinates(city)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          
          <span className="navbar-brand"><img src={logo} alt="logo" height={"30px"} className='me-1 ms-0' />iClouder</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className={`nav-link ${locationpath.pathname==="/"?"active":""}`}  to="/" >Weather</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Forecast
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className={`dropdown-item ${locationpath.pathname==="/today"?"active":""}`} to="/today">Today</Link></li>
                  <li><Link className={`dropdown-item ${locationpath.pathname==="/tommorow"?"active":""}`} to="/tommorow">Tommorow</Link></li>
                  <li><Link className={`dropdown-item ${locationpath.pathname==="/nextday"?"active":""}`} to="/nextday">Next Day</Link></li>
                </ul>
              </li>

            </ul>
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control me-2" placeholder="Search" onChange={(e) => setInputData(e.target.value)} />
              <button className="btn btn-primary" type='button'  onClick={()=>handleclick(inputData)}>Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
