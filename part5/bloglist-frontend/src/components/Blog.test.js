import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("Only the blog title is displayed initially", () => {
  const blog = {
    title: "Yeah",
    author: "Yeremiah Eah",
    url: "https://y.es",
    likes: 1,
    id: "bajojajo",
    user: {
      username: "YeremiahEah",
      name: "Y3ah"
    }
  }

  const mockDeletion = jest.fn()

  render(<Blog blog={blog} handleDeletion={mockDeletion}/>)

  screen.getByText(blog.title)
  const extraInfoParent = screen.queryByText(blog.url).closest("div")
  expect(extraInfoParent).toHaveStyle("display: none")
})