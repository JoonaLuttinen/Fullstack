import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNumber = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deleteNumber = (deletePerson) => {
    const request = axios.delete(`${baseUrl}/${deletePerson}`)
    return request.then(response => response.data)
}

const updateNumber = (updatedNumber,id) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedNumber)
    return request.then(response => response.data)
}

export default {getAll, addNumber, deleteNumber, updateNumber}