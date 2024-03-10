const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./blog_test_helper")

const api = supertest(app)

let token = ""
let blogToDelete = undefined

beforeAll(async () => {
  await User.deleteMany({})

  const testUser = {
    username: "tester",
    name: "blogTester",
    password: "yeah",
  }
  await api.post("/api/users").send(testUser)

  const credentials = {
    username: "tester",
    password: "yeah",
  }
  const login = await api.post("/api/login").send(credentials)

  token = login.body.token

  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))

  await Promise.all(blogObjects.map((blog) => blog.save()))
}, 100000)

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
  test('Blogs have an "id" property, instead of "_id"', async () => {
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
      likes: 1,
    }

    const savedPost = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newPost)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost.length).toEqual(helper.initialBlogs.length + 1)

    blogToDelete = savedPost.body
  })
  test("Posted blogs without a likes value default to 0", async () => {
    const newPost = {
      title: "Guys please like my blog :(",
      author: "Un Popular",
      url: "https://agagsdgdsgxvxxxxx.pl",
    }

    const savedPost = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newPost)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(savedPost.body.likes).toEqual(0)
  })
  test("Posting a blog with no title is refused with status 400", async () => {
    const newPost = {
      author: "Joshua Header",
      url: "https://ihatetitles.com",
      likes: 10,
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newPost)
      .expect(400)
  })
  test("Posting a blog with no url is refused with status 400", async () => {
    const newPost = {
      title: "This blog is in my notepad :D",
      author: "George? *illegible*",
      likes: 1,
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newPost)
      .expect(400)
  })
})

describe("Deleting blogs", () => {
  test("Blogs can be correctly deleted", async () => {
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)

    const blogsAfterDeletion = await helper.blogsInDb()
    expect(blogsAfterDeletion).not.toContainEqual(blogToDelete)
  })
})

/*
!- OUTDATED ROUTE HANDLING                         -!
!- EDITING BLOGS DOES NOT USE TOKEN AUTHENTICATION -!
!- TESTS CURRENTLY IRRELEVANT                      -!
*/

describe("Editing blogs", () => {
  test("Blogs can be correctly edited", async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToEdit = blogsInDb[0]

    const newBlog = {
      title: "We need to keep changing",
      author: "Jorg Evolution",
      url: "https://iwillchangethesite.too",
      likes: 52,
    }

    const savedBlog = await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(newBlog)
      .expect(200)

    const blogsAfterEdit = await helper.blogsInDb()
    expect(blogsAfterEdit).toContainEqual(savedBlog.body)
  })
  test("Attempting to edit a blog without providing a title is refused with status 400", async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToEdit = blogsInDb[0]

    const newBlog = {
      author: "Hubert Ungry",
      url: "https://sohungryiatethetitle.de",
      likes: 10,
    }

    await api.put(`/api/blogs/${blogToEdit.id}`).send(newBlog).expect(400)
  })
  test("Attempting to edit a blog without providing an url is refused with status 400", async () => {
    const blogsInDb = await helper.blogsInDb()
    const blogToEdit = blogsInDb[0]

    const newBlog = {
      title: "Man I HATE browsers.",
      author: "Bowser",
      likes: 2,
    }

    await api.put(`/api/blogs/${blogToEdit.id}`).send(newBlog).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
