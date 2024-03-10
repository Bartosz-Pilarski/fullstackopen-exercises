const listHelper = require("../utils/list_helper")

test("Dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

//Shared between blog tests
const blogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Man just put anything",
    author: "Not me",
    url: "https://example.com",
    likes: 5,
    __v: 0,
  },
  {
    _id: "6b422aa71b54a676234d17f8",
    title: "And I don't see any issues so far",
    author: "Someone",
    url: "https://google.pl",
    likes: 1,
    __v: 1,
  },
  {
    _id: "5a422aa71b54a669234d17f8",
    title: "Doesn't really matter",
    author: "Me",
    url: "https://example.com",
    likes: 7,
    __v: 0,
  },
  {
    _id: "6b422aa71b54a676234d17f8",
    title: "Does it now",
    author: "Someone",
    url: "https://google.com",
    likes: 2,
    __v: 1,
  },
  {
    _id: "6b422aa71b54a676234d17f8",
    title: "I suppose not",
    author: "Someone",
    url: "https://google.de",
    likes: 1,
    __v: 2,
  },
]

describe("Total likes", () => {
  test("Of an empty list is 0", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("Of a list with only one blog is the same as the likes of said blog", () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(5)
  })

  test("Of a bigger list is calculated correctly", () => {
    expect(listHelper.totalLikes(blogs)).toBe(16)
  })
})

describe("Favorite blog", () => {
  test("Of an empty list is an empty object", () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test("Of a list with only one blog to be that blog", () => {
    expect(listHelper.favoriteBlog([blogs[2]])).toEqual(blogs[2])
  })

  test("Of a bigger list to show the one with the highest likes value", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe("Most prolific blog author", () => {
  test("In an empty list is an empty object", () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })

  test("In a list of only one entry is the author of said entry with only one blog credited", () => {
    expect(listHelper.mostBlogs([blogs[1]])).toEqual({
      author: "Someone",
      blogs: 1,
    })
  })

  test("In a list of multiple entries from the same author, is said author with the correct amount of blogs credited", () => {
    expect(listHelper.mostBlogs([blogs[3], blogs[4]])).toEqual({
      author: "Someone",
      blogs: 2,
    })
  })

  test("Is calculated and credited correctly in bigger, diverse, lists", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Someone",
      blogs: 3,
    })
  })
})

describe("Most likes gathered by author", () => {
  test("In an empty list is an empty object", () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })
  test("In a list of only one entry, is the author of said entry and the appropriate amount of likes", () => {
    expect(listHelper.mostLikes([blogs[3]])).toEqual({
      author: "Someone",
      likes: 2,
    })
  })
  test("In a list of multiple entries from the same author, is said author with the correct amount of likes", () => {
    expect(listHelper.mostLikes([blogs[3], blogs[4]])).toEqual({
      author: "Someone",
      likes: 3,
    })
  })
  test("Is calculated properly in bigger, diverse, lists", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: "Me", likes: 7 })
  })
})
