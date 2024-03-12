import axios from "axios"
const baseUrl = "/api/blogs"

let token = ""
const setToken = (newToken) => token = `Bearer ${newToken}`

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getBlogById = async (blogId) => {
  const request = await axios.get(`${baseUrl}/${blogId}`)
  return request.data
}

const getCommentsById = async (blogId) => {
  const request = await axios.get(`${baseUrl}/${blogId}/comments`)
  return request.data
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

const createComment = async (blogId, comment) => {
  const request = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
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

export default { getAll, getBlogById, getCommentsById, create, createComment, like, deleteBlog, setToken }