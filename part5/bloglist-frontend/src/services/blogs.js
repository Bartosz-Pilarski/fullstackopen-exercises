import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ""
const setToken = (newToken) => token = `Bearer ${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.post(baseUrl, newBlog, config)
  console.log(request.data)
  return request.data
}

export default { getAll, create, setToken }