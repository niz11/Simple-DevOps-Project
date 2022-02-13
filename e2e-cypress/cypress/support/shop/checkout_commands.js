Cypress.Commands.add('addMaterialToCart', materialName => {
  //Visit material item page
  cy.visit(Cypress.env('HOST') + '/store/materials/' + materialName);

  //Add to cart
  cy.get('span').contains('Buy Now').click();
  cy.wait(5000);
});
