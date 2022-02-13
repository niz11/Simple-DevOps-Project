describe('Tests top pages', () => {
  it('Test Formlabs top page are Application Error free and links are not broken', () => {
    const corePages = [
      '/3d-printers/catalog/',
      '/3d-printers/form-3/',
      '/3d-printers/form-3l/',
      '/3d-printers/fuse-1/',
      '/3d-printers/form-3b/',
      '/3d-printers/form-3bl/',
      '/post-processing/',
      '/materials/',
      '/materials/standard/',
      '/materials/engineering/',
      '/materials/rigid/',
      '/materials/tough-durable/',
      '/materials/flexible-elastic/',
      '/materials/jewelry/',
      '/materials/medical/',
      '/materials/nylon/',
      '/material-selector/'
    ];
    cy.visit(Cypress.env('HOST'));

    corePages.forEach(page => {
      if (page.includes('3d-printers')) {
        cy.get('div[role="navigation"]').within(() => {
          cy.get('a[href="/3d-printers/catalog/"]').trigger('mouseover');
        });
      } else {
        cy.get('div[role="navigation"]').within(() => {
          cy.get('a[href="/materials/"]').trigger('mouseover');
        });
      }
      cy.get('a[href="' + page + '"]')
        .invoke('removeAttr', 'target')
        .first()
        .click({ force: true });
      cy.get('body').should(
        'not.contain.text',
        'Application error: a client-side exception has occurred'
      );
      cy.title().should('not.eq', 'Page Not Found');
    });
  });
  it('Test Dental top page are Application Error free and links are not broken', () => {
    const dentalPages = [
      '/products/',
      '/products/form-3b/',
      '/products/form-3bl/',
      '/post-processing/',
      '/software/',
      '/services/',
      '/materials/'
    ];
    if (Cypress.env('HOST').includes('staging')) {
      cy.visit('https://dental-staging.formlabs.com/');
    } else {
      cy.visit('https://dental.formlabs.com/');
    }
    dentalPages.forEach(page => {
      cy.get('a[href="/products/"]').eq(0).trigger('mouseover');
      cy.get('a[href="' + page + '"]')
        .invoke('removeAttr', 'target')
        .click({ multiple: true, force: true });
      cy.get('body').should(
        'not.contain.text',
        'Application error: a client-side exception has occurred'
      );
    });
  });
});
