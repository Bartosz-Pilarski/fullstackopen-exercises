describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const newUser = {
      username: "JohnFH",
      name: "Jonathan ForHonor",
      password: "thisgamesucks"
    }
    cy.request("POST", "http://localhost:3003/api/users", newUser)
    cy.visit("http://localhost:5173")
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
})