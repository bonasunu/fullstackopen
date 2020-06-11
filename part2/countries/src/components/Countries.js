import React from 'react';

const Countries = ({ countries, filter, handleFilterChange }) => {

    const result = (country) => country.name
    .toLowerCase()
    .includes(filter
    .toLowerCase()) === true        


    const showResult = countries.filter(result)

    if (showResult.length === 250) {
        return (
          <div>
              find countries <input value={filter} onChange={handleFilterChange}/>
          </div>
        )
    }
    else if (showResult.length > 10 ) {
          return (
              <div>
                find countries <input value={filter} onChange={handleFilterChange}/>
                <p>Too many matches, specify another filter</p>
              </div>
          )
    }
    else if (showResult.length < 10 && showResult.length > 2) {
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
    else if (showResult.length === 1) {
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

export default Countries