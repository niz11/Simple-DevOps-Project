describe('Visual Test: Plugins : Mobile', () => {
  it('Tests Plugins visually', () => {
    cy.viewport(414, 896);
    cy.setCookie('formlabsCookieConsent', 'true');
    cy.fixture('cms_data').then(data => {
      cy.loginCMS(data.username, data.password);
    });

    cy.visit(
      'https://cms-preview-staging.formlabs.com/api/preview/?secret=Clkn6CfAxkLPLOk4Z5q1&slug=/playground/visual-testing/visual-testing-do-not-publish/'
    );
    cy.wait(15000);

    cy.get('[alt="Form 3 3d printer"]')
      .should('be.visible')
      .and($img => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect(
          $img[0].naturalWidth,
          'image has natural width'
        ).to.be.greaterThan(0);
      });
      cy.get('[alt="Form 3l 3d printer"]')
      .should('be.visible')
      .and($img => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect(
          $img[0].naturalWidth,
          'image has natural width'
        ).to.be.greaterThan(0);
      });
    cy.fixture('cms_plugins').then(plugins => {
      cy.get(plugins.modules).each(module => {
        cy.get(module.path).scrollIntoView();
        cy.wait(4000);
        cy.get(module.path).matchImageSnapshot(module.name);
      });
    });
    cy.get('#detailed-cards span[class^="AlignmentWrapper"]').each(
      (card, index) => {
        cy.get(card).matchImageSnapshot('9-detailed-card-' + index + '-v2');
      }
    );
  });
});
