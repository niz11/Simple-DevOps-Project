describe('Visual Test: Plugins : Desktop', () => {
  it('Tests Plugins visually', () => {
    cy.setCookie('formlabsCookieConsent', 'true');
    cy.fixture('cms_data').then(data => {
      cy.loginCMS(data.username, data.password);
    });

    cy.visit(
      'https://cms-preview-staging.formlabs.com/api/preview/?secret=Clkn6CfAxkLPLOk4Z5q1&slug=/playground/visual-testing/visual-testing-do-not-publish/'
    );

    cy.wait(10000);

    //Stop videos to autoplay
    cy.get('.cms-plugin-3798104').scrollIntoView();
    cy.get('.cms-plugin-3798104 video').invoke('removeAttr', 'autoplay');
    cy.get('.cms-plugin-3798118').scrollIntoView();
    cy.get('.cms-plugin-3798118 video').invoke('removeAttr', 'autoplay');

    //Load plugins names and ids/classes from fixtures/plugins.json and test visually
    cy.fixture('cms_plugins').then(plugins => {
      cy.get(plugins.modules).each(module => {
        cy.get(module.path).scrollIntoView();
        cy.wait(1000);
        cy.get(module.path).matchImageSnapshot(module.name);
      });
    });

    //Tests 3 cards avaiable in module 9. #detailed-cards
    cy.get('#detailed-cards span[class^="AlignmentWrapper"]').each(
      (card, index) => {
        cy.get(card).matchImageSnapshot('9-detailed-card-' + index + '-v2');
      }
    );
  });
});
