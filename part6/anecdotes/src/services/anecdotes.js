import axios from 'axios'
import { getId } from '../reducers/store'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const obj = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const updateItem = async (id) => {
  const obj = await getOne(id)
  obj.votes = obj.votes + 1
  const response = await axios.put(`${baseUrl}/${id}`, obj)
  return response.data
}

export default { getAll, createNew, updateItem }
