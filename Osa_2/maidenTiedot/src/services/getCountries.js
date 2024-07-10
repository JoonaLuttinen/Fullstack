import axios from 'axios'

const getAll = () =>{
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getOne = (country) => {
    console.log(country[0]);
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${country[0]}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default {getAll, getOne}