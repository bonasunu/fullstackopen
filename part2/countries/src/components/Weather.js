import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState('')

    useEffect(()=>{
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`)
            .then(response=>{
                setWeather(response.data.current)
            })
    },[capital])

    if (!weather) {
		return (
			<div></div>
		)
	}

	return (
		<div>
			<p><strong>temperature</strong>  {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt='weather'/>
    <p>wind {weather.wind_speed} kph direction {weather.wind_dir}</p>
        </div>
	)
}

export default Weather