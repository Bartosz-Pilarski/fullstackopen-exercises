import { useParams } from "react-router-dom"

import { getById } from "../services/users"
import { useEffect, useState } from "react"

import UserInfo from "../components/UserInfo"

const UserDetails = () => {
  const id = useParams().id
  /*
    Won't use redux's list of users for this.
    Feel like if it had to comb a list of potentially thousands of users it'd scale horribly
    A single request to get the user in question should be faster
  */
  const [user, setUser] = useState(null)

  useEffect(() => {
    const initializeUserdata = async () => {
      const newUser = await getById(id)
      setUser(newUser)
    }
    initializeUserdata()
  }, [])

  if(!user) return (
    <h2> User not found </h2>
  )

  return (
    <UserInfo user={user} />
  )
}

export default UserDetails