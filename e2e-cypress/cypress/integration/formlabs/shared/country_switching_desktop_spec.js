describe('Country Switching: Desktop', () => {
  it('TC8.1 Tests country switching through Region Bar ', () => {
    // Set ipcountry Cookie and visit Spain domain
    cy.setCookie('ipcountry', 'US');
    cy.visit(Cypress.env('HOST') + '/es/');

    //Verify store_view cookie value
    cy.getCookie('store_view').should('have.property', 'value', 'es_es');
    cy.getCookie('ipcountry').should('have.property', 'value', 'US');

    //From region bar change region to Germany
    cy.get('div[class^="RegionBar_bar"]')
      .should('be.visible')
      .within(() => {
        cy.get('select').select('DE');
        cy.get('button')
          .eq(0)
          .click();
        cy.wait(7000);

        //Verify store_view cookie value and domain is according to selected region
        cy.url().should('contain', 'de');
        cy.getCookie('store_view').should('have.property', 'value', 'de_de');
      });
  });

  it('TC8.2 Tests country switching from header menu', () => {
    //Visit Spain domain
    cy.visit(Cypress.env('HOST') + '/es/');

    //Verify store_view cookie value
    cy.getCookie('store_view').should('have.property', 'value', 'es_es');

    //From header menu change region to Germany
    cy.get('div[title="Change Region"]').click();
    cy.get('div[class^="CenterModal_modal"]')
      .should('be.visible')
      .within(() => {
        cy.get('span')
          .contains('Germany')
          .click();
      });
    cy.wait(7000);

    //Verify store_view cookie value and domain is according to selected region
    cy.url().should('contain', 'de');
    cy.getCookie('store_view').should('have.property', 'value', 'de_de');
  });
  it('TC8.3 Tests country switching in checkout', () => {
    //Visit IBT Resin material item page
    cy.visit(Cypress.env('HOST') + '/store/materials/ibt-resin/');

    //Add to cart IBT Resin
    cy.get('span')
      .contains('Buy Now')
      .click();
    cy.wait(5000);

    //Visit checkout page to check cart items
    cy.get('span')
      .contains('Checkout')
      .click();

    //Verify the url
    cy.url().should('contain', '/checkout/cart');

    //Verify cart contains IBT Resin item
    cy.get('.product-item-name > a').should('contain', 'IBT Resin');
    cy.get('.cart-summary > .primary-button > span').click();

    //Verify the url
    cy.url().should('contain', 'account/login/');

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

      //Verify store_view cookie value before country switching
      cy.getCookie('store_view').should('have.property', 'value', 'us_en');

      //On shipping address change country from United States to Germany
      cy.get('.form[class="form form-shipping-address"]').within(() => {
        cy.get('input[name="postcode"]').type('24106');
        cy.get('select[name="country_id"]')
          .select('Germany')
          .should('have.value', 'DE');
      });
      cy.wait(5000);

      //Verify store_view cookie value and domain is according to selected region
      cy.url().should('contain', 'de_de');
      cy.getCookie('store_view').should('have.property', 'value', 'de_de');
    });
  });
});
