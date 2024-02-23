import { createSlice } from '@reduxjs/toolkit'

const initialState = "Page loaded"

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationText(state, action) {
      return action.payload
    },
    clearNotificationText() {
      return ""
    }
  }  
})

export const { setNotificationText, clearNotificationText } = notificationSlice.actions

export const setNotification = (text, timeout) => {
  return async (dispatch) => {
    dispatch(setNotificationText(text))
    setTimeout(() => {
      dispatch(clearNotificationText())
    }, timeout);
  }
}

export default notificationSlice.reducer