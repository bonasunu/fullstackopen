import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getPeep = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPeep = newPeep => {
    const request = axios.post(baseUrl, newPeep)
    return request.then(response => response.data)
}

const updatePeep = (newPeep, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newPeep)
    return request.then(response => response.data)
}

const deletePeep = (id) => {
    axios.delete(`${baseUrl}/${id}`)

}

export default { 
    getPeep: getPeep, 
    addPeep: addPeep, 
    updatePeep: updatePeep,
    deletePeep: deletePeep
}