import { useState, useEffect } from "react"
import axios from "axios"

export const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        setNotes(res.data)
      })
  }, [])

  return notes
}