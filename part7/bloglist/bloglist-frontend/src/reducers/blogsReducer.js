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
    },
    deleteBlogById: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
    replaceBlogById: (state, action) => {
      return state.map((blog) => blog.id === action.payload.id ? action.payload : blog)
    }
  }
})

export const { setBlogs, appendBlog, deleteBlogById, replaceBlogById } = blogsSlice.actions

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

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(blogId)
    dispatch(deleteBlogById(blogId))
  }
}

export const likeBlog = (blogId) => {
  return async (dispatch) => {
    const likedBlog = await blogsService.like(blogId)
    dispatch(replaceBlogById(likedBlog))
  }
}

export default blogsSlice.reducer