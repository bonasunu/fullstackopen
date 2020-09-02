import axios from 'axios'
import { getId } from '../reducers/store'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const obj = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, obj)
  return response.data
}

export default { getAll, createNew }
