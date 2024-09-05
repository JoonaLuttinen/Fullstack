import { useState, useEffect } from 'react'
import axios from 'axios'
import countries from './services/getCountries'

const Filter = ({value, setFilterOnChance}) => {
  return (
    <div>
      find countries
      < input value={value} onChange={setFilterOnChance}/>
    </div>
  )
}

const CountryDisplay = ({country, ifRender, setShowButton})=>{

  if(ifRender !== 'list'){
    return null
  }
  
  return(
    <li>
      {country} <button onClick={() => setShowButton(country)}>show</button>
    </li>
  )
}

const TooLongDisplay = ({ifRender}) => {

  if(ifRender !== 'tooMany'){
    return null
  }

  return(
    <div>
      Too many matches, specify another filter
    </div>
  )
}

const DetailsDisplay = ({ifRender, countryDetails, flag, weather, weatherIcon}) => {

  if(ifRender !== 'details'){
    return null
  }
  
  return(
    <div>
      <h1>{countryDetails.name.common}</h1>
        <ul>
          {countryDetails.capital}
        </ul>
        <ul>
          area {countryDetails.area}
        </ul>
        <ul>
          population {countryDetails.population}
        </ul>
      <h3>Languages</h3>
        <div>
          {Object.values(countryDetails.languages).map((language)=>{
            return(
              <li key={language}>
                {language}
              </li>
            )})}
        </div>
        <img src={flag}/>
        <h2>Weather in {countryDetails.capital}</h2>
        <div>temperature {weather.temp} Celcius</div>
        <img src={weatherIcon}/>
        <div>wind {weather.windSpeed} m/s</div>
    </div>
  )
}

function App() {

  const [allCountries, setAllCountries] = useState(null)
  const [oneCountry, setOneCountry] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState('')
  const [ifRender, setIfRender] = useState('tooMany')
  const [flag, setFlag] = useState(null)
  const [weather, setWeather] = useState({})
  const [weatherIcon, setWeatherIcon] = useState(null)

  useEffect(()=>{
    const tempData = []
    countries.getAll()
    .then((response)=>{for(let i = 0; i< response.length;i++){
                      tempData.push(response[i].name.common)
                      }
    setAllCountries(tempData)
    setFilteredList(tempData)})},[])
 
  const setFilterOnChance = (event) => {

    const filterList = allCountries.filter((country)=>{
      const re = new RegExp(event.target.value, 'i')
      return(country.match(re))
    })

    if(filterList.length > 10 ){
      setIfRender('tooMany')
    }

    else if(filterList.length === 1){
      const data = countries.getOne(filterList[0])

      data.then((response) => {
        console.log(response);
        
        setFlag(response.flags.png)
        setOneCountry(response)
        setIfRender('details')

        const coordinates = countries.getCoordinates(response.capital, response.ccn3, null)

        coordinates.then((response) => {
          const countryWeather = countries.getWeather(response[0].lat, response[0].lon)
          countryWeather.then((response) => {
            const newWeather = {temp:response.current.temp, windSpeed:response.current.wind_speed}
            setWeather(newWeather)

            const iconId = response.current.weather[0].icon
            setWeatherIcon(`https://openweathermap.org/img/wn/${iconId}@2x.png`)
          })
          
        
        })
      })    
    }

    else{
      setIfRender('list')
    }

    setFilter(event.target.value)
    setFilteredList(filterList)
    }

    if(!allCountries){
    return null
    }


  const setShowButton = (country) => {
    const data = countries.getOne(country)

    data.then((response) => {
      setFlag(response.flags.png)
      setOneCountry(response)
      setIfRender('details')

      const coordinates = countries.getCoordinates(response.capital, response.ccn3, null)

        coordinates.then((response) => {
          const countryWeather = countries.getWeather(response[0].lat, response[0].lon)
          countryWeather.then((response) => {
            const newWeather = {temp:response.current.temp, windSpeed:response.current.wind_speed}
            setWeather(newWeather)

            const iconId = response.current.weather[0].icon
            setWeatherIcon(`https://openweathermap.org/img/wn/${iconId}@2x.png`)
          })
        })
    })

    setFilter("")
  }


  return (
      <div>
        <Filter value={filter} setFilterOnChance={setFilterOnChance}/>
        <TooLongDisplay ifRender={ifRender}/> 
        {filteredList.map(country => <CountryDisplay country={country} ifRender={ifRender} key={country} setShowButton={setShowButton}/>)}
        <DetailsDisplay ifRender={ifRender} countryDetails={oneCountry} flag={flag} weather={weather} weatherIcon={weatherIcon}/>
      </div>
  )
}

export default App
