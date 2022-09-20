const loginData = require("../../fixtures/login_data.json");
const mainPage = require("../../fixtures/main_page.json");
const seats = require("../../fixtures/seats.json");

it("Should be able to booking ticket", () => {
    cy.visit("admin/index.php");
    cy.login(loginData.validEmail, loginData.validPassword);

    cy.get(mainPage.allName)
        .invoke("text")
        .then((text) => {
            const hallName = text;

            cy.visit("/client/payment.php");
            cy.get(mainPage["fourthDay"]).click();
            cy.get(mainPage.sectionMovie)
                .contains(hallName)
                .siblings(mainPage.seancesList)
                .children()
                .children()
                .click();
        });
    seats.forEach((seat) => {
        cy.get(
            `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
        ).click();
    });
    const hallPage = require("../../fixtures/hall_page.json");
    cy.get(hallPage.bookButton).click();
    cy.contains("Вы выбрали билеты:").should("be.visible");
});