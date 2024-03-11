import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"

const initialState = []

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload.toSorted((a, b) => b.likes - a.likes)
    },
    appendBlog: (state, action) => {
      return [...state, action.payload]
    }
  }
})

export const { setBlogs, appendBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await(blogsService.create(newBlog))
    dispatch(appendBlog(blog))
  }
}

export default blogsSlice.reducer