const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const User = require("../models/user")
const helper = require("./user_test_helper")

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
})

describe("Creating users", () => {
  describe("In an empty users database", () => {
    test("A new user can be added correctly", async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: "root",
        name: "superuser",
        password: "NoneOYerBusiness"
      }

      const savedUser = await api
        .post("/api/users")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd.length).toEqual(usersAtStart.length+1)
      expect(usersAtEnd).toContainEqual(savedUser.body)
    })
  })

  describe("User validation:", () => {
    test("Creating two users with the same username is impossible", async () => {
      const newUser = {
        username: "root",
        name: "doppelganger",
        password: "phony"
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
    })

    test("Usernames need to be at least 3 characters long", async () => {
      const newUser = {
        username: "eh",
        name: "ebenezer hearmoore",
        password: "loveInitials"
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
    })

    test("Passwords need to be at least 3 characters long", async () => {
      const newUser = {
        username: "grug",
        name: "grug caveman",
        password: "ug"
      }

      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
    })

    test("No invalid users were added to the database", async () => {
      const usersInDb = await helper.usersInDb()
      expect(usersInDb.length).toEqual(1)
    })
  })
})

describe("Logging in", () => {
  test("Logging in as a previously created user is possible", async () => {
    const loginInfo = {
      username: "root",
      password: "NoneOYerBusiness"
    }

    await api
      .post("/api/login")
      .send(loginInfo)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  describe("It's impossible to log in while missing:",  () => {
    test("The username", async () => {
      const loginInfo = {
        password: "NoneOYerBusiness"
      }

      await api
        .post("/api/login")
        .send(loginInfo)
        .expect(400)
    })

    test("The password", async () => {
      const loginInfo = {
        username: "root"
      }

      await api
        .post("/api/login")
        .send(loginInfo)
        .expect(400)
    })
  })

  describe("The request returns 401 - Unathorized with the wrong credentials", () => {
    test("Wrong password", async () => {
      const loginInfo = {
        username: "root",
        password: "yahaharr"
      }

      await api
        .post("/api/login")
        .send(loginInfo)
        .expect(401)
    })
    test("Wrong username", async () => {
      const loginInfo = {
        username: "rewt",
        password: "NoneOYerBusiness"
      }

      await api
        .post("/api/login")
        .send(loginInfo)
        .expect(401)
    })
    test("Both username and password", async () => {
      const loginInfo = {
        username: "rewt",
        password: "yaharr"
      }

      await api
        .post("/api/login")
        .send(loginInfo)
        .expect(401)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})