import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  else if (countries.filter(result).length <= 10) {
    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
              {countries.filter(result)
                  .map(country =>
                  <p key={country.name}>{country.name}</p>
              )}
        </div>
    )
  }
  else if (countries.filter(result).length === 1){
    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange}/>
              {countries.filter(result)
                  .map(country =>
                <p key={country.name}>{country.name}</p>
              )}
        </div>
    )
  }

}

export default App