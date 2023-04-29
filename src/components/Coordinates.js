import { useState } from "react"

export default function FetchWeather(props) {
    
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [village, setVillage] = useState("")
    const [taluka, setTaluka] = useState("")
    const [district, setDistrict] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")


  const getInput = async (input) => {
    
    await fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${input}&apiKey=RVVfOTI3ZTRiN2FjY2IzNGRiYmE4MGI4Y2I2ODkwNmMyMjQ6NjBkZDM5NTktN2Y5MC00OTRhLWEyMGUtMTMzYmFhYjJmNTRl`)
      .then((response) => response.json())
      .then((response) => {
        setLatitude(response.locations[0].referencePosition.latitude)
        setLongitude(response.locations[0].referencePosition.longitude)
        setVillage(response.locations[0].address.district)
        setTaluka(response.locations[0].address.city)
        setDistrict(response.locations[0].address.province)
        setState(response.locations[0].address.state)
        setCountry(response.locations[0].address.countryName)
        console.log(latitude, longitude)
        console.log(response)
      })
  }
  useEffect(()=>{
    getInput("new delhi")
  },[])
  useEffect(()=>{
    getInput(inputData)
  },[Context])


  return (
    <>
    </>
  )
}
