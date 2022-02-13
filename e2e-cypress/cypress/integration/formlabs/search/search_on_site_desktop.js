describe('Search on US, UK, EU, DE, ES, FR & IT: Desktop', () => {
  const countriesData = require('../../../fixtures/countries_with_search_feature');

  countriesData.countries.forEach(country => {
    it(
      'TC4.1 : ' +
        '(Country Code: ' +
        country.countryCode +
        '): Tests visibility of different elements on the search panel',
      () => {
        cy.visit(Cypress.env('HOST') + '/' + country.countryCode);
        // Verify Search icon is visible on navigation bar & click
        cy.get('.fl-v2-fl-search').should('be.visible').click();

        // Verify search panel open on search-icon click
        cy.get('div[class^="SearchBox_search-bar"]')
          .should('be.visible')
          .within(() => {
            // Verify that formlabs logo is visible
            cy.get('img[alt= "' + country.logoAlt + '"]').should('be.visible');

            //Verify that search-icon is visible on seaerch bar
            cy.get('.fl-v2-fl-search').should('be.visible');

            // Get search input and verify that it has required placeholder
            cy.get('input[class^="SearchBox_search-box"]')
              .should('be.visible')
              .should('have.attr', 'placeholder', country.searchBoxPlaceholder);

            // Verify that “x” icon does not exist for empty search field
            cy.get('.fl-v2-fl-exit').should('not.exist');

            // Get search input, type 3 characters and verify “x” icon appears
            cy.get('input[class^="SearchBox_search-box"]').type('for');
            cy.get('.fl-v2-fl-exit').should('be.visible');

            // Verify “x” clears search input field
            cy.get('.fl-v2-fl-exit').click();
            cy.get('input[class^="SearchBox_search-box"]')
              .invoke('val')
              .should('be.empty');
          });
        // Verify that there is Popular Searches heading and there are 5 popular search terms
        cy.contains('Popular Searches').should('be.visible');
        cy.get('p > button[class^="SearchBox_animated"]')
          .should('have.length', '5')
          .and('be.visible');

        // Get CANCEL button, should be visible and verify that it closes Search panel
        cy.get('button[class^="SearchBox_close"]').should('be.visible').click();
        cy.get('div[class^="SearchBox_search-bar"]').should('not.exist');
      }
    );

    it(
      'TC4.2 : ' +
        '(Country Code: ' +
        country.countryCode +
        '): Test popular searches populate search input field',
      () => {
        cy.visit(Cypress.env('HOST') + '/' + country.countryCode);
        // Open search panel
        cy.get('.fl-v2-fl-search').click();

        // Get popular search terms and select/click second term
        cy.get('p > button[class^="SearchBox_animated"]')
          .eq(1)
          .click()
          .invoke('text')
          .then(searchQuery => {
            // Verify that search input value has been updated with the selected term
            cy.get('input[class^="SearchBox_search-box"]')
              .invoke('val')
              .should('eq', searchQuery);

            // Verify that heading 'Search Results for "<Search Query>"' contain selected term
            cy.get('#search-results > h4')
              .should('be.visible')
              .and('contain', searchQuery);
          });

        // Test all three main parts of search results: Products, Pages and Blog Posts
        cy.testValidSearchQueryResults(
          country.countryCode,
          country.shopURL,
          country.pagesResultHeading
        );
      }
    );

    it(
      'TC4.3 : ' +
        '(Country Code: ' +
        country.countryCode +
        '): Test search closes when navigating to a result',
      () => {
        cy.visit(Cypress.env('HOST') + '/' + country.countryCode);
        // Open search panel
        cy.get('.fl-v2-fl-search').should('be.visible').click();

        // Get search input, type search query
        cy.get('input[class^="SearchBox_search-box"]').type('Form 3');

        // Get search results and navigate to first result from pages
        cy.get('#search-results')
          .siblings('div')
          .eq(1)
          .find('h5[class^="Header_headerText"]')
          .eq(0)
          .click();

        // Verify search box is closed when navigating to the result
        cy.wait(1000);
        cy.url().should('not.include', '/?search=');
        cy.get('div[class^="SearchBox_search-box"]').should('not.exist');
      }
    );

    it(
      'TC4.4 : ' +
        '(Country Code: ' +
        country.countryCode +
        '): Test search results for "Form 3" query',
      () => {
        cy.visit(Cypress.env('HOST') + '/' + country.countryCode);
        // Open search panel
        cy.get('.fl-v2-fl-search').click();

        // Get search input and type search query
        cy.get('input[class^="SearchBox_search-box"]').type('Form 3');

        // Get 'Search Results for "<Search Query>"' heading and verify that it contains searched query
        cy.get('#search-results > h4')
          .should('be.visible')
          .and('contain', 'Form 3');

        // Test all three main parts of search results: Products, Pages and Blog Posts
        cy.testValidSearchQueryResults(
          country.countryCode,
          country.shopURL,
          country.pagesResultHeading
        );
      }
    );

    it(
      'TC4.5 : ' +
        '(Country Code: ' +
        country.countryCode +
        '): Test results for SKU number query',
      () => {
        cy.visit(Cypress.env('HOST') + '/' + country.countryCode);
        // Open search panel
        cy.get('.fl-v2-fl-search').should('be.visible').click();

        // Get search input and type search query
        cy.get('input[class^="SearchBox_search-box"]').type('PKG-F3-SVC-BASI');

        // Get 'Search Results for "<Search Query>"' heading and verify that it contains searched query
        cy.get('#search-results > h4')
          .should('be.visible')
          .and('contain', 'PKG-F3-SVC-BASI');

        // Test all three main parts of search results: Products, Pages and Blog Posts
        cy.testValidSearchQueryResults(
          country.countryCode,
          country.shopURL,
          country.pagesResultHeading
        );
      }
    );
    it(
      'TC4.6 : ' +
        '(Country Code: ' +
        country.countryCode +
        '): Test results for Gibberish query',
      () => {
        cy.visit(Cypress.env('HOST') + '/' + country.countryCode);
        // Open search panel
        cy.get('.fl-v2-fl-search').should('be.visible').click();

        // Get search input and type gibberish search query
        cy.get('input[class^="SearchBox_search-box"]').type(
          'agalkjfdglkjal;fsdg'
        );

        // Verify that heading 'Search Results for "<Search Query>"' does not exist
        cy.get('#search-results > h4').should('not.exist');

        // Verify that there are no search results
        cy.get('#search-results').should('not.exist');

        // Verify that there is Popular Searches heading and there are 5 popular search terms
        cy.contains('Popular Searches').should('be.visible');
        cy.get('p > button[class^="SearchBox_animated"]')
          .should('have.length', '5')
          .and('be.visible');

        // Verify that no result found announcement banner is visible
        cy.get('div[class^="Announcement_content"]').should(
          'contain',
          country.noResultFoundText
        );

        // Verify that "Reset your search" button on announcement banner clears the search input field
        cy.get('button').contains(country.resetButtonText).click();
        cy.get('input[class^="SearchBox_search-box"]')
          .invoke('val')
          .should('be.empty');
      }
    );
  });
});
