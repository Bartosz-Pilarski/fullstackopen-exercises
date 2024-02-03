const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./blog_test_helper")

const api = supertest(app)

beforeAll(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))

  await Promise.all(blogObjects.map((blog) => blog.save()))
})

describe("Getting blogs", () => {
  test("Blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  }, 100000)
  test("Getting all blogs returns them correctly", async () => {
    const blogs = await api.get("/api/blogs")
    expect(blogs.body.length).toEqual(4)
  }, 100000)
  test("Blogs have an \"id\" property, instead of \"_id\"", async () => {
    const blogs = await api.get("/api/blogs")
    expect(blogs.body[0].id).toBeDefined()
  }, 100000)
})

afterAll(async () => {
  await mongoose.connection.close()
})