Cypress.Commands.add(
  'testValidSearchQueryResults',
  (country_code, shop_url, pagesResultHeading) => {
    // Verify that all three main parts: products, pages, posts of search result are visible
    cy.get('#search-results')
      .siblings('div')
      .should('have.length', '3')
      .and('be.visible')
      .as('searchResults');
    cy.wait(1000);
    /*
     *
     * ASSERTIONS ON PRODUCTS PART OF SEARCH RESULT
     *
     */

    // Verify that titles of products are visible
    cy.get('@searchResults')
      .eq(0)
      .find('div[class^="SearchBox_name"] > a')
      .should('be.visible');

    // Verify that product images are visible
    cy.get('@searchResults').eq(0).find('img').should('be.visible');

    // Verify that price of each product in visible
    cy.get('@searchResults')
      .eq(0)
      .find('div[class^="SearchBox_price"] > div')
      .should('be.visible');

    // Verify that links of products have attribute href and contain /store/ string
    cy.get('@searchResults')
      .eq(0)
      .find('a')
      .should('have.attr', 'href')
      .should('not.eq', '#undefined')
      .and('contain', shop_url);

    /*
     *
     * ASSERTIONS ON PAGES PART OF SEARCH RESULT
     *
     */

    // Verify that heading of each Page result is visible
    cy.get('@searchResults')
      .eq(1)
      .find('h4')
      .should('have.text', pagesResultHeading)
      .and('be.visible');

    // Verify that titles are visible
    cy.get('@searchResults')
      .eq(1)
      .find('h5[class^="Header_headerText"]')
      .should('be.visible');

    // Verify that descriptions are visible
    cy.get('@searchResults')
      .eq(1)
      .find('p[class^="SearchBox_page-description"]')
      .should('be.visible');

    // Verify that links have attribute href and are not undefined
    cy.get('@searchResults')
      .eq(1)
      .find('a')
      .should('have.attr', 'href')
      .should('not.eq', '#undefined');

    /*
     *
     * ASSERTIONS ON BLOG POSTS PART OF SEARCH RESULT
     *
     */

    // Verify that images of Blog posts are visible
    cy.get('@searchResults').eq(2).find('img').should('be.visible');

    // Verify that categories are visible and have color rgb(7, 98, 200)
    cy.get('@searchResults')
      .eq(2)
      .find('div[class^="SearchBox_post-category"] > span')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(7, 98, 200)');

    // Verify that titles are visible
    cy.get('@searchResults').eq(2).find('h5').should('be.visible');

    // Verify that dates and descriptions of blog posts are visible
    cy.get('@searchResults')
      .eq(2)
      .find('div[class^="Card_card-content"] >p')
      .should('be.visible');

    // Verify that links of blog posts have attribute href and contain /uk/blog/
    cy.get('@searchResults')
      .eq(2)
      .find('a')
      .should('have.attr', 'href')
      .should('not.eq', '#undefined')
      .and('contain', country_code + '/blog/');
  }
);
