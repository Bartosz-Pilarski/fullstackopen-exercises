Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password
  }).then(response => {
    localStorage.setItem("bloglistUser", JSON.stringify(response.body))
    cy.visit("")
  })
})

Cypress.Commands.add("addBlog", ([ title, author, url ]) => {
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

    describe("When logged in", function() {
      beforeEach(function() {
        cy.login({
          username: "JohnFH",
          password: "thisgamesucks"
        })
      })
      it.only("...user can create a new blog", function() {
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
  })
})