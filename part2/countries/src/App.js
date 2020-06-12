import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather'

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  
  useEffect(() => {
      console.log('effect');
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('promise fulfilled');
            setCountries(response.data);
        })
  }, []);
  console.log('render', countries.length, 'notes')  

  const result = (country) => country.name
    .toLowerCase()
    .includes(filter
    .toLowerCase()) === true

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const showCountry = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  if (countries.filter(result).length === countries.length) {
      return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
        </div>
      )
  }
  else if (countries.filter(result).length > 10) {
    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
            <p>Too many matches, specify another filter</p>
        </div>
    )
  }
  else if (countries.filter(result).length === 1){
    //newCapital('Jakarta')

    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
              {countries.filter(result)
                  .map(country =>
                <div key={country.name}>
                  <h1>{country.name}</h1>
                  <p>capital {country.capital}</p>
                  <p>population {country.population}</p>
                  <h2>languages</h2>
                  <ul>
                    {country.languages.map(lang => 
                      <li key={lang.name}>{lang.name}</li>
                    )}
                  </ul>
                  <img src={country.flag} alt={country.name}/>
                    <Weather capital={country.capital} />
                </div>               
              )}
        </div>
    )
  }
  else if (countries.filter(result).length <= 10) {
    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
              {countries.filter(result)
                  .map(country =>
                    <div key={country.name}>
                      <p>{country.name} </p>
                      <button onClick={showCountry} value={country.name}>Show</button>
                    </div>
              )}
        </div>
    )
  }

}

export default App