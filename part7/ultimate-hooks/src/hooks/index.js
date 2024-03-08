import { useState, useEffect } from "react"
import axios from "axios"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = async (resource) => {
    const result = await axios
      .post(baseUrl, resource)
    return result.data
  }

  //baseUrl is a dependency due to linter - don't really understand why it's required but i'll assume it's a good practice
  useEffect(() => {
    const get = async () => {
      const result = await axios
        .get(baseUrl)
      return result.data
    }

    const getResources = async () => {
      const res = await get()
      setResources(res)
    }

    getResources()
  }, [baseUrl])

  const service = {
    create
  }

  return [
    resources, service
  ]
}