Cypress.Commands.add('returnPriceInt', div => {
  var priceText = div.text();
  var price = parseInt(priceText.match(/\d+(,\d+)?/)[0].replace(/\,/g, ''));
  return price;
});

Cypress.Commands.add(
  'checkProductData',
  (productCardPosition, productID, productName, productPrice, quantity) => {
    var productCardPosition = productCardPosition - 1;
    if (quantity > 1) {
      productName = quantity + ' x ' + productName;
    }
    cy.get('span[class^="ProductOptionControl_title"]')
      .eq(productCardPosition)
      .contains(productName)
      .siblings()
      .then(div => {
        cy.returnPriceInt(div).then(price => {
          expect(price).to.equal(productPrice * quantity);
        });
      });
    cy.get('input[value= ' + productID + ']').should('be.checked');
  }
);

Cypress.Commands.add(
  'checkServicePlan',
  (servicePlanCardPosition, servicePlanName, servicePlanPrice) => {
    var servicePlanCardPosition = servicePlanCardPosition - 1;

    cy.get('span[class^="ProductOptionControl_title"]')
      .eq(servicePlanCardPosition)
      .contains(servicePlanName)
      .siblings()
      .then(div => {
        cy.returnPriceInt(div).then(price => {
          expect(price).to.equal(servicePlanPrice);
        });
      });
  }
);

Cypress.Commands.add('deselectItem', itemCardNumber => {
  var itemCardPosition = itemCardNumber - 1;
  cy.get('span[class^="ProductOptionControl_title"]')
    .eq(itemCardPosition)
    .click();
  cy.get('input[aria-label="Set quantity"]')
    .eq(itemCardPosition)
    .should('have.value', '0');
});

Cypress.Commands.add('selectItem', itemCardNumber => {
  var itemCardPosition = itemCardNumber - 1;
  cy.get('span[class^="ProductOptionControl_title"]')
    .eq(itemCardPosition)
    .click();
  cy.get('input[aria-label="Set quantity"]')
    .eq(itemCardPosition)
    .should('have.value', '1');
});

Cypress.Commands.add('increaseQuantity', (itemCardNumber, quantity) => {
  var itemCardPosition = itemCardNumber - 1;
  for (var i = 0; i < quantity; i++) {
    cy.get('button[aria-label="Increase quantity"]')
      .eq(itemCardPosition)
      .click();
  }
});

Cypress.Commands.add('goToCustomizeStep', () => {
  cy.get('a[href="#/customize/"]').click({ force: true });
});

Cypress.Commands.add('goToServicePlanStep', () => {
  cy.get('a[href="#/service/"]').click();
});

Cypress.Commands.add(
  'checkForm3lServicePlan',
  (servicePlan, numberOfPrinters) => {
    servicePlan.forEach((plan, index) => {
      cy.get('span[class^="ProductOptionControl_title"]')
        .eq(index)
        .contains(plan.name)
        .siblings()
        .then(div => {
          cy.returnPriceInt(div).then(price => {
            expect(price).to.equal(plan.price * numberOfPrinters);
          });
        });
    });
  }
);
