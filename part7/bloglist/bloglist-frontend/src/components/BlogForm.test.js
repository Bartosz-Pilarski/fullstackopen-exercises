import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"

import BlogForm from "./BlogForm"

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const titleField = screen.getByPlaceholderText("Name the blog")
  const authorField = screen.getByPlaceholderText("Name the author")
  const urlField = screen.getByPlaceholderText("blogurl.com")
  const finalizeButton = screen.getByText("Create")

  await user.type(titleField, "testing the form")
  await user.type(authorField, "the tester")
  await user.type(urlField, "example.com")
  await user.click(finalizeButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls[0][0].title).toBe("testing the form")
  expect(addBlog.mock.calls[0][0].author).toBe("the tester")
  expect(addBlog.mock.calls[0][0].url).toBe("example.com")
})