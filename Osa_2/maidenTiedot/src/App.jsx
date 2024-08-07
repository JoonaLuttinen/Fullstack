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

const CountryDisplay = ({country, ifRender})=>{

  if(ifRender !== 'list'){
    return null
  }

  return(
    <li>
      {country}
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

const DetailsDisplay = ({ifRender, countryDetails, flag}) => {

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
  const [blob, setBlob] = useState(null)

  useEffect(()=>{
    const tempData = []
    countries.getAll()
    .then((response)=>{for(let i = 0; i< response.length;i++){
                      tempData.push(response[i].name.common)
                      }
    setAllCountries(tempData)
    setFilteredList(tempData)})},[])
 

  const setFilterOnChance = (event) => {

    let binaryImage = null

    const filterList = allCountries.filter((country)=>{
      const re = new RegExp(event.target.value, 'i')
      return(country.match(re))
    })

    if(filterList.length > 10 ){
      setIfRender('tooMany')
    }

    else if(filterList.length === 1){
      const data = countries.getOne(filterList)

      data.then((response) => {
        setOneCountry(response)
        setIfRender('details')
      })

      data.then((response)=>{return(countries.getFlag(response.flags.png))}).then((response) => {console.log(response)})
      
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


  return (
      <div>
        <Filter value={filter} setFilterOnChance={setFilterOnChance}/>
        <TooLongDisplay ifRender={ifRender}/> 
        {filteredList.map(country => <CountryDisplay country={country} ifRender={ifRender} key={country}/>)}
        <DetailsDisplay ifRender={ifRender} countryDetails={oneCountry} flag={flag}/>
      </div>
  )
}

export default App
