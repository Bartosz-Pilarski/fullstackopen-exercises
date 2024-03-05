import axios from "axios"

const baseUrl = "http://localhost:3001"

export const getAnecdotes = () => {
  return axios
    .get(`${baseUrl}/anecdotes`)
    .then((res) => res.data)
}