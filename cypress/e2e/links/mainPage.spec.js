const mainPage = require("../../fixtures/main_page.json")

it("Should be able to open the main page", () => {
    cy.visit("/client/index.php");
    cy.contains("Идём");
});

it("Should show correct number of days", () => {
    cy.visit("/client/index.php");
    cy.get(mainPage.daysWeek).should("have.length", 7);
});