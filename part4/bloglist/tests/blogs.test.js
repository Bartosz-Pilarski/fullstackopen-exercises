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

describe("Posting blogs", () => {
  test("Posted blogs are added to the database", async () => {
    const newPost = {
      title: "Writing unit tests",
      author: "Ubert Theodore Est",
      url: "https://utest.com",
      likes: 1
    }

    const savedPost = await api
      .post("/api/blogs")
      .send(newPost)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAfterPost = await Blog.find({})

    expect(blogsAfterPost.length).toEqual(helper.initialBlogs.length+1)

    expect(blogsAfterPost.map(blog => blog.toJSON())).toContainEqual(savedPost.body)
  })
  test("Posted blogs without a likes value default to 0", async () => {
    const newPost = {
      title: "Guys please like my blog :(",
      author: "Un Popular",
      url: "https://agagsdgdsgxvxxxxx.pl"
    }

    const savedPost = await api
      .post("/api/blogs")
      .send(newPost)

    const blogsInDb = await Blog.find({})

    expect(savedPost.body.likes).toEqual(0)
    expect(blogsInDb.map(blog => blog.toJSON())).toContainEqual(savedPost.body)
  })
  test("Posting a blog with no title is refused with status 400", async () => {
    const newPost = {
      author: "Joshua Header",
      url: "https://ihatetitles.com",
      likes: 10
    }

    await api
      .post("/api/blogs")
      .send(newPost)
      .expect(400)
  })
  test("Posting a blog with no url is refused with status 400", async () => {
    const newPost = {
      title: "This blog is in my notepad :D",
      author: "George? *illegible*",
      likes: 1
    }

    await api
      .post("/api/blogs")
      .send(newPost)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})