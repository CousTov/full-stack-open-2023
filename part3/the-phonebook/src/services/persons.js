import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = (phoneObject) => {
    const request = axios.post(baseUrl, phoneObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, phoneObject) => {
    const request = axios.put(`${baseUrl}/${id}`, phoneObject)
    return request.then(response => response.data)
}

const personService = { addPerson, getAll, deletePerson, update }

export default personService