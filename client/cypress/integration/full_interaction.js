
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("user full interaction", () => {
  it("from start to finish - logically", () => {

    //user visit the site
    cy.visit("/").as("route1");

    //user click on sign up
    cy.findByText(/התחבר/i).click();

    //login
    cy.get('[type="email"]').type(process.env.REACT_APP_CYPRESS_ACCOUNT);
    cy.get('[type="password"]').type(process.env.REACT_APP_CYPRESS_PASS);

    cy.findByRole("button", { name: /כניסה לחשבון/i }).click();

    //user will add products from first page
    cy.wait(2000);
    cy.get('[data-testid="productsNav"]').click(); // מוצרים
    cy.get('[data-testid="sweetsNav"]').click(); // מתוקים
    cy.wait(2000);

    //user will add products (also with amount)
    cy.get('[data-testid="CartPutProductTest-0"]').click(); // הוסף - שוקולד
    cy.get('[data-testid="AmountProductTest-5"]').click(); // כמות - עוגיות
    cy.get('[data-testid="AddIconProductTest-5"]').click(); // כפתור +
    cy.get('[data-testid="AddIconProductTest-5"]').click(); // כפתור +
    cy.get('[data-testid="CartPutProductTest-5"]').click(); // הוסף - עוגיות

    //user will click the cart to checkout
    cy.get('[data-testid="ShoppingCartOutlinedIcon"]').click(); // סל קניות

    //user will add and remove products from cart section
    cy.findByTestId("AddIconTest-0").click(); // להוסיף כמות 1 לשוקולד
    cy.get('[data-testid="RemoveIconTest-1"] > path').click(); // להוריד כמות 1 מעוגיות

    //user will click payment
    cy.findByRole("button", { name: /לתשלום/i }).click();
  });
});
