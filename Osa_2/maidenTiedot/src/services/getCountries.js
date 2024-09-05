import axios from 'axios'

const getAll = () =>{

    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getOne = (country) => {

    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getFlag = (url) => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getCoordinates = (cityName, countryCode, stateCode) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode},&appid=${api_key}`)
    request.then((response)=> {console.log(response.data)})
    return request.then((response => response.data))
}

const getWeather = (lat, lon) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
    request.then((response) => {console.log(response.data)})
    return request.then((response) => response.data)
}


export default {getAll, getOne, getFlag, getCoordinates, getWeather}