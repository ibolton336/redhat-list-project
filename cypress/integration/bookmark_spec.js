describe("Bookmark functionality test", function() {
  it("Checks that bookmark is available after creating it", function() {
    cy.visit("localhost:9000");
    cy.get(".username-nav").then($btn => {
      const txt = $btn.first().text();

      cy.get(".username-nav")
        .first()
        .click();
      cy.url().should("include", "/user");

      cy.get(".bookmark-button").click();
      cy.get(".section")
        .contains("User List")
        .click();
      cy.get(".bookmark-link").should($btn2 => {
        expect($btn2.first().text()).to.eq(txt);
      });
    });
  });
});
