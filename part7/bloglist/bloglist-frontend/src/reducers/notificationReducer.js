import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isError: false,
  content: ""
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotificationContent(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState
    }
  }
})

export const { setNotificationContent, clearNotification } = notificationSlice.actions

export const setNotification = (newNotif, timeout) => {
  return async (dispatch) => {
    dispatch(setNotificationContent(newNotif))
    setTimeout(() => {
      dispatch(setNotificationContent(initialState))
    }, timeout)
  }
}

export default notificationSlice.reducer