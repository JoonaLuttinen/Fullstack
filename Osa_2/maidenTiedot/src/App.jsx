import { useState, useEffect } from 'react'
import axios from 'axios'
import countries from './services/getCountries'

const Filter = ({value, setFilterOnChance}) => {
  return (
  <input value={value} onChange={setFilterOnChance}/>
  )
}

const CountryDisplay = ({country})=>{
    
  return(
    <li>
      {country}
    </li>
  )
}

const TooLongDisplay = () => {
  return(
    <div>
      Too many matches, specify another filter
    </div>
  )
}

function App() {

  const [allCountries, setAllCountries] = useState(null)
  const [oneCountry, setOneCountry] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState('')
  const [isTooLong, setIsTooLong] = useState(true)

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
      setIsTooLong(true)
    }
    else if(filterList.length === 1){
      countries.getOne(filterList)
      .then((response) => {
        setOneCountry(response)
        setIsTooLong(false)})
    }
    else{
      setIsTooLong(false)
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
        {isTooLong ? <TooLongDisplay/> : filteredList.map(country => <CountryDisplay country={country} key={country}/>)}
      </div>
  )
}

export default App
