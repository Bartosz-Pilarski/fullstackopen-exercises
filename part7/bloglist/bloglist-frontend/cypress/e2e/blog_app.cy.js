Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password
  }).then(response => {
    localStorage.setItem("bloglistUser", JSON.stringify(response.body))
    cy.visit("")
  })
})

Cypress.Commands.add("addBlog", ({ title, author, url }) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
    body: {
      title,
      author,
      url
    },
    headers: {
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("bloglistUser")).token}`
    }
  })
})

describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    const newUser = {
      username: "JohnFH",
      name: "Jonathan ForHonor",
      password: "thisgamesucks"
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, newUser)
    cy.visit("")
  })

  it("Login form is shown by default", function() {
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })

  describe("Logging in", function() {
    it("...fails with wrong credentials", function() {
      cy.contains("username")
        .find("input")
        .type("JohnFH")
      cy.contains("password")
        .find("input")
        .type("thisgameisgreat")
      cy.contains("login")
        .click()

      cy.contains("Invalid credentials")
        .should("have.css", "color", "rgb(255, 50, 50)")
    })
    it("...succeeds with the correct credentials", function() {
      cy.contains("username")
        .find("input")
        .type("JohnFH")
      cy.contains("password")
        .find("input")
        .type("thisgamesucks")
      cy.contains("login")
        .click()

      cy.contains("Hello, Jonathan ForHonor")
      cy.contains("log out")
      cy.contains("Create new blog")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({
        username: "JohnFH",
        password: "thisgamesucks"
      })
    })
    it("...user can create a new blog", function() {
      cy.contains("Create new blog")
        .click()

      cy.get("input[placeholder=\"Name the blog\"]")
        .type("For Honor sucks")

      cy.get("input[placeholder=\"Name the author\"")
        .type("Jonathan ForHonor")

      cy.get("input[placeholder=\"blogurl.com\"")
        .type("https://itruinedmylife.com")

      cy.get("form")
        .contains("button[type=\"submit\"]", "Create")
        .click()

      cy.contains("Blog For Honor sucks created succesfully")
      cy.contains("For Honor sucks")
    })
  })

  describe("With a blog already created", function() {
    beforeEach(function() {
      cy.login({
        username: "JohnFH",
        password: "thisgamesucks"
      })

      cy.addBlog({
        title: "For Honor isn't that bad",
        author: "Jonathan ForHonor",
        url: "https://butidontrecommendit.com"
      })

      cy.visit("")
    })

    it("...a blog can be liked", function() {
      cy.contains("For Honor isn't that bad")
        .parent()
        .as("blogPost")
        .contains("View details")
        .click()

      cy.get("@blogPost")
        .contains("like")
        .parent()
        .as("likeContainer")
        .contains("0")

      cy.get("@blogPost")
        .contains("like")
        .click()

      cy.get("@likeContainer")
        .contains("1")

      //Persists after reload
      cy.visit("")
        .get("@likeContainer")
        .contains("1")
    })

    describe("Deleting blogs", function() {
      it("...the author can delete their own blog post", function() {
        cy.contains("For Honor isn't that bad")
          .parent()
          .as("blogPost")
          .contains("View details")
          .click()

        cy.get("@blogPost")
          .contains("Delete")
          .click()

        cy.contains("For Honor isn't that bad")
          .should("not.exist")
      })

      it("...the user can't delete a blog they didn't post", function() {
        const newUser = {
          username: "MarioMH",
          name: "Mario Mordhau",
          password: "thisgameisdead"
        }
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, newUser)
          .login({
            username: "MarioMH",
            password: "thisgameisdead"
          })

        cy.contains("For Honor isn't that bad")
          .parent()
          .as("blogPost")
          .contains("View details")
          .click()

        cy.get("@blogPost")
          .contains("Delete")
          .should("not.exist")
      })
    })
  })

  describe("With multiple blogs created", function() {
    beforeEach(function() {
      cy.login({
        username: "JohnFH",
        password: "thisgamesucks"
      })

      cy.addBlog({
        title: "For Honor isn't that bad",
        author: "Jonathan ForHonor",
        url: "https://butidontrecommendit.com"
      })
      cy.addBlog({
        title: "For Honor could be better",
        author: "Jonathan ForHonor",
        url: "https://butidontrecommendit.com"
      })
      cy.addBlog({
        title: "For Honor is alright",
        author: "Jonathan ForHonor",
        url: "https://butidontrecommendit.com"
      })

      cy.visit("")
    })

    it.only("Blogs are sorted according to like count", function() {
      cy.get(".blogpost")
        .eq(2)
        .as("topPost")
        .contains("View details")
        .click()
      cy.get("@topPost")
        .contains("like")
        .parent()
        .as("topLikeContainer")

      cy.get(".blogpost")
        .eq(0)
        .as("midPost")
        .contains("View details")
        .click()
      cy.get("@midPost")
        .contains("like")
        .parent()
        .as("midLikeContainer")

      //Bit of repetition but should be alright
      cy.get("@topLikeContainer")
        .contains("like")
        .click()
      cy.get("@topLikeContainer")
        .contains("1")
      cy.get("@topLikeContainer")
        .contains("like")
        .click()
      cy.get("@topLikeContainer")
        .contains("2")

      cy.get("@midLikeContainer")
        .contains("like")
        .click()
      cy.get("@midLikeContainer")
        .contains("1")

      cy.visit("")

      cy.get(".blogpost")
        .eq(0)
        .contains("For Honor is alright")
      cy.get(".blogpost")
        .eq(1)
        .contains("For Honor isn't that bad")
    })
  })
})