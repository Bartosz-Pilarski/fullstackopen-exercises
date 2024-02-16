import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Only the blog title is displayed initially", () => {
  let container

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

  beforeEach(() => {
    container = render(<Blog blog={blog} handleDeletion={mockDeletion}/>).container
  })

  test("Only the title is displayed at first", () => {
    screen.getByText(blog.title)
    const extraInfoParent = screen.queryByText(blog.url).closest("div")
    expect(extraInfoParent).toHaveStyle("display: none")
  })

  test("More info is displayed upon clicking button", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("View details")

    await user.click(button)
    const extraInfoParent = screen.queryByText(blog.url).closest("div")
    expect(extraInfoParent).not.toHaveStyle("display: none")
  })
})