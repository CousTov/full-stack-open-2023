import { useState } from "react"
import axios from "axios"

const CountryDetails = ({country}) => {

    const name = country.name.common
    const capital = country.capital
    const languages = Object.values(country.languages)
    const area = country.area

    const api_key = process.env.REACT_APP_API_KEY
    const [data, setdata] = useState(null)
    axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
            .then(response =>{ 
                console.log(response.data)
                setdata(response.data)
            })
    const temp = data ? (data.main.temp - 273.15).toFixed(2) : null
    const image = data ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : null
    const wind = data ? data.wind.speed : null
    const imageAlt = data ? data.weather.description : null


    return(
        <div>
            <h1>{name}</h1>
            <p>
                Capital: {capital}
            </p>
            <p>
                Area: {area}
            </p>
            <p>
                Languages: {languages[0]}
            </p>
            <ul>
                {languages.map(lan => <li key={lan}>{lan}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} height={200}></img>
            <h2>Weather in {capital}</h2>
            <p>Temperature: {temp} C</p>
            <img src={image} alt={imageAlt}></img>
            <p>Wind: {wind} m/s</p>
        </div>
    )
}

export default CountryDetails