const getIframeDocument = iframeName => {
  return cy.get(iframeName).its('0.contentDocument').should('exist');
};

const getIframeBody = iframeName => {
  // get the document
  return (
    getIframeDocument(iframeName)
      // automatically retries until body is loaded
      .its('body')
      .should('not.be.undefined')
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  );
};

describe('Checkout: Desktop', () => {
  it('TC2.1 add an item to cart as guest and verify cart contains that item', () => {
    cy.addMaterialToCart('ibt-resin');
    //visit checkout page to check cart items
    cy.get('span').contains('Checkout').click();
    //verify the url
    cy.url().should('contain', '/checkout/cart?cartId=');
    //verify cart contains IBT Resin item
    cy.get('.product-item-name > a').should('contain', 'IBT Resin');
  });

  it('TC2.2 Tests new user checkout flow with Credit or Debit Card payment method', () => {
    cy.addMaterialToCart('ibt-resin');

    //Visit checkout page to check cart items
    cy.get('span').contains('Checkout').click();

    //Take screenshot for visual testing
    cy.get('#maincontent').matchImageSnapshot('1-my-cart-v1');

    cy.get('.cart-summary > .primary-button > span').click();

    //Verify the url
    cy.url().should('contain', 'account/login/');

    //Take screenshot for visual testing
    cy.get('.create-account-container').matchImageSnapshot(
      '2-create-account-form-v1'
    );
    cy.get('.block-customer-login').matchImageSnapshot('3-login-form-v1');

    cy.fixture('user_data').then(user => {
      cy.generateRandomString(8).then(randomString => {
        //Create new User Account
        cy.createAccount(
          randomString + '@formlabs.com',
          user.firstName,
          user.lastName,
          randomString,
          user.password
        );
      });
      cy.wait(30000);

      //Take screenshot for visual testing
      cy.get('#shipping').matchImageSnapshot('4-shipping-address-form-v1');
      cy.get('#opc-shipping_method').matchImageSnapshot(
        '5-shipping-methods-v1'
      );
      //Enter data on shipping address form
      cy.get('.form[class="form form-shipping-address"]').within(() => {
        cy.get('input[name="street[0]"]').type(user.street);
        cy.get('input[name="city"]').type(user.city);
        cy.get('select[name="region_id"]').select('California');
        cy.get('input[name="postcode"]').type(user.postalCode);
        cy.get('input[name="telephone"]').type(user.mobNumber);
      });
      cy.wait(5000);

      //Select Shipping Methods and continue to Payment
      cy.get('.form[id="co-shipping-method-form"]').within(() => {
        cy.get('input[type="radio"]').first().check({ force: true });
        cy.get('span').contains('Continue To Payment').click();
      });
      cy.wait(7000);

      //Verify url contains 'payment'
      cy.url().should('contain', 'payment');
      cy.get('.loader > img',{ timeout: 10000 }).should('not.visible')
      //Take screenshot for visual testing
      cy.get('#co-payment-form').matchImageSnapshot('6-payment-methods-v1');
      cy.get('.opc-block-summary').matchImageSnapshot('7-order-summary-v1');

      //Tests Credit or Debit Card payment method on all env except production
      cy.url().then($url => {
        if ($url.includes('integration')) {
          //Select Credit or Debit Card payment method
          cy.get('.form[id="co-payment-form"]').within(() => {
            cy.get('input[type="radio"]').first().check({ force: true });
            cy.wait(2000);

            cy.fixture('credit_card_data').then(card => {
              //Enter card number
              getIframeBody('iframe[title="Secure card number input frame"]')
                .find('input[name="cardnumber"]')
                .type(card.cardNumber);

              //Enter card expiry date
              getIframeBody(
                'iframe[title="Secure expiration date input frame"]'
              )
                .find('input[name="exp-date"]')
                .type(card.expDate);

              //Enter CVC code
              getIframeBody('iframe[title="Secure CVC input frame"]')
                .find('input[name="cvc"]')
                .type(card.cvv);
            });
            //Click button to Place order
            cy.get('#actions-toolbar > div.primary').click();
            cy.wait(20000);

            //Verify that user is on 'Success Page'
            cy.url().should('contain', 'success');
            cy.wait(5000);
            cy.title().should('contain', 'Success Page');
          });
        } else {
          cy.log('Can not test payment method on production env');
        }
      });
    });
  });
});
