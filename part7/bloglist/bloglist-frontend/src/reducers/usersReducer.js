import { createSlice } from "@reduxjs/toolkit"
import { getAll } from "../services/users"

/*
  !!! this reducer handles generic user data          !!!
  !!! for the logged in user refer to userReducer.js  !!!
*/

const initialState = []

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return [...action.payload]
    }
  }
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const usersData = await getAll()
    dispatch(setUsers(usersData))
  }
}

export default usersSlice.reducer