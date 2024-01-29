const listHelper = require("../utils/list_helper")

test("Dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("Total likes", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Man just put anything",
      author: "Not me",
      url: "https://example.com",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a669234d17f8",
      title: "Doesn't really matter",
      author: "Me",
      url: "https://example.com",
      likes: 7,
      __v: 0
    },
    {
      _id: "6b422aa71b54a676234d17f8",
      title: "Does it now",
      author: "Someone",
      url: "https://google.com",
      likes: 2,
      __v: 1
    }
  ]

  test("Of an empty list is 0", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("Of a list with only one blog is the same as the likes of said blog", () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(5)
  })

  test("Of a bigger list is calculated correctly", () => {
    expect(listHelper.totalLikes(blogs)).toBe(14)
  })
})