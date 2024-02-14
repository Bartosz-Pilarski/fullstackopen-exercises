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
  return request.data
}

const like = async (blogId) => {
  const request = await axios.put(`${baseUrl}/${blogId}`)
  return request.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = await axios.delete(`${baseUrl}/${blogId}`, config)
  return request.data
}

export default { getAll, create, like, deleteBlog, setToken }