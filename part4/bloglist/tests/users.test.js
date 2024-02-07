const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const User = require("../models/user")
const helper = require("./user_test_helper")

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
})

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
})

afterAll(async () => {
  await mongoose.connection.close()
})