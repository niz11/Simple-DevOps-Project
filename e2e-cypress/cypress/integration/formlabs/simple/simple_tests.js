describe('General simple Tests', () => {
  it('Test Formlabs top pages have no Application Error', () => {
    const corePages = [
      '/',
      '/3d-printers/',
      '/materials/',
      '/materials/',
      '/store/',
      '/blog/'
    ];

    corePages.forEach(page => {
      cy.visit(`${Cypress.env('HOST')}${page}`);
      cy.get('body').should(
        'not.contain.text',
        'Application error: a client-side exception has occurred'
      );
      cy.title().should('not.eq', 'Page Not Found');
      cy.task(
        'log',
        `Formlabs - ${Cypress.env('HOST')}${page} finised loading`
      );
    });
  });
});
