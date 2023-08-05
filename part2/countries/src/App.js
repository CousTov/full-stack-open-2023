import { useState, useEffect } from 'react'
import Countries from './components/Countries'
import countryServices from './services/countries'
import React from 'react'

const App = () => {

  // countries[] is to save data returned back when searching
  const [countries, setCoutries] = useState([])

  // newCountry is to store the search data (as teh user types)
  const [searchCountry, setSearchCountry] = useState('')

  const [showCountry, setShowCountry] = useState([])

  const handleShow = (name) => {
      setShowCountry(filteredCountries.filter(country => country.name.common.includes(name))[0])
  }

  const filteredCountries =  countries.filter(country => country.name.common.startsWith(searchCountry))


  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setSearchCountry(event.target.value)
    setShowCountry([])
  }

  useEffect(() => {
    countryServices
      .getAll()
      .then(innitialCountries => {
        setCoutries(innitialCountries)
      })
  }, [])

  return (
    <div>
      <span>Find Countries: </span><input type='text' onChange={handleCountryChange}></input>
      <Countries list={filteredCountries} showCountry={showCountry} showDetails={handleShow} />
    </div>
  )
}

export default App