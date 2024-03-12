import axios from "axios"

const baseUrl = "http://localhost:3003/api/users"

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(res => res.data)
}

const getById = (userId) => {
  return axios
    .get(`${baseUrl}/${userId}`)
    .then(res => res.data)
    .catch(err => null)
}

export { getAll, getById }