describe('Header menu: Desktop ', () => {
  it('TC7.1 Tests Desktop header menu', () => {
    //Visit HOST
    cy.visit(Cypress.env('HOST'));

    //Verify that navigation bar is visible and main menu item links to right page
    cy.get('div[role="navigation"]')
      .should('be.visible')
      .within(() => {
        cy.get('a')
          .contains('3D Printers')
          .should('have.attr', 'href', '/3d-printers/catalog/');
        cy.get('a')
          .contains('Materials')
          .should('have.attr', 'href', '/materials/');
        cy.get('a')
          .contains('Software')
          .should('have.attr', 'href', '/software/');
        cy.get('a')
          .contains('Services')
          .should('have.attr', 'href', '/services/');
        cy.get('a')
          .contains('Industries')
          .should('have.attr', 'href', '/industries/');
        cy.get('a').contains('Learn').should('have.attr', 'href', '/blog/');
        cy.get('a')
          .contains('Support')
          .should(
            'have.attr',
            'href',
            'https://support.formlabs.com/s/?language=en_US'
          );
      });

    //***********************************************************
    //Dropdown menu testing
    //***********************************************************

    //Verify 3D Printers sub menu text and images are visible and links to correct page
    cy.get('div[role="navigation"]')
      .should('be.visible')
      .within(() => {
        cy.get('a').contains('3D Printers').trigger('mouseover');
      });
    cy.get('img[alt="Form 3+"]')
      .should('be.visible')
      .parents('a')
      .should('have.attr', 'href', '/3d-printers/form-3/')
      .siblings('a')
      .should('have.attr', 'href', '/3d-printers/form-3/')
      .children('span')
      .should('contain', 'Form 3+');

    cy.get('[alt="Form 3L"]')
      .should('be.visible')
      .parents('a')
      .should('have.attr', 'href', '/3d-printers/form-3l/')
      .siblings('a')
      .should('have.attr', 'href', '/3d-printers/form-3l/')
      .children('span')
      .should('contain', 'Form 3L');

    cy.get('[alt="Fuse 1"]')
      .should('be.visible')
      .parents('a')
      .should('have.attr', 'href', '/3d-printers/fuse-1/')
      .siblings('a')
      .should('have.attr', 'href', '/3d-printers/fuse-1/')
      .children('span')
      .should('contain', 'Fuse 1');

    cy.get('[alt="Form 3B+"]')
      .should('be.visible')
      .parents('a')
      .should('have.attr', 'href', '/3d-printers/form-3b/')
      .siblings('a')
      .should('have.attr', 'href', '/3d-printers/form-3b/')
      .children('span')
      .should('contain', 'Form 3B+');

    cy.get('[alt="Form 3BL"]')
      .should('be.visible')
      .parents('a')
      .should('have.attr', 'href', '/3d-printers/form-3bl/')
      .siblings('a')
      .should('have.attr', 'href', '/3d-printers/form-3bl/')
      .children('span')
      .should('contain', 'Form 3BL');

    cy.get('[alt="Post-Processing"]')
      .should('be.visible')
      .parents('a')
      .should('have.attr', 'href', '/post-processing/')
      .siblings('a')
      .should('have.attr', 'href', '/post-processing/')
      .children('span')
      .should('contain', 'Post-Processing');

    //Verify Materials sub menu text and images are visible
    cy.get('a')
      .contains('Materials')
      .should('have.attr', 'href', '/materials/')
      .trigger('mouseover');

    // Verify that Materials main categories(should not be less than 1) are visible,
    // have 'href' attribute and cover picture is visible
    cy.get('div[class^="HeaderMenu_description-secondary"]')
      .eq(0)
      .should('be.visible')
      .children('a')
      .should('not.have.length.lt', 1)
      .each($submenu => {
        expect($submenu).to.have.attr('href');
        cy.get($submenu).trigger('mouseover');
        cy.get('div[class^="HeaderMenu_menu-image"]').should('be.visible');
      });

    cy.get('div[class^="HeaderMenu_description-secondary"]')
      .eq(1)
      .should('be.visible')
      .children('a')
      .each($submenu => {
        expect($submenu).to.have.attr('href');
      });

    //Verify Software sub menu text and images are visible and links to correct page
    cy.get('a').contains('Software').trigger('mouseover');

    cy.get('img[alt="PreForm"]')
      .should('be.visible')
      .parents('a')
      .should('have.attr', 'href', '/software/#preform')
      .siblings('a')
      .should('have.attr', 'href', '/software/#preform')
      .children('span')
      .should('contain', 'PreForm');

    cy.get('img[alt="Dashboard"]')
      .should('be.visible')
      .parents('a')
      .should('have.attr', 'href', '/dashboard/')
      .siblings('a')
      .should('have.attr', 'href', '/dashboard/')
      .children('span')
      .should('contain', 'Dashboard');

    //Verify Learn sub menu text and images are visible
    cy.get('div[role="navigation"]')
      .should('be.visible')
      .within(() => {
        cy.get('a').contains('Learn').trigger('mouseover');
      });

    // Verify that Learn main categories (should not be less than 5) are visible,
    // have 'href' attribute and cover picture is visible
    cy.get('div[class^="HeaderMenu_description-secondary"]')
      .eq(0)
      .should('be.visible')
      .children('a')
      .should('not.have.length.lt', 5)
      .each($submenu => {
        expect($submenu).to.have.attr('href');
        cy.get($submenu).trigger('mouseover');
        cy.get('div[class^="HeaderMenu_menu-image"]').should('be.visible');
      });

    cy.get('div[class^="HeaderMenu_description-secondary"]')
      .eq(1)
      .children('p')
      .should('be.visible');

    //Verify Industries sub menu text and images are visible
    cy.get('a').contains('Industries').trigger('mouseover');

    // Verify that Industries main categories (should not be less than 5) are visible,
    // have 'href' attribute and cover picture is visible
    cy.get('div[class^="HeaderMenu_description-secondary"]')
      .eq(0)
      .should('be.visible')
      .children('a')
      .should('not.have.length.lt', 5)
      .each($submenu => {
        expect($submenu).to.have.attr('href');
        cy.get($submenu).trigger('mouseover');
        cy.get('div[class^="HeaderMenu_menu-image"]').should('be.visible');
      });

    cy.get('div[class^="HeaderMenu_description-secondary"]')
      .eq(1)
      .children('p')
      .should('be.visible');
  });
});
