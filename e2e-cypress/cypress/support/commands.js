import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

// command for visual testing
addMatchImageSnapshotCommand({
  failureThreshold: 0.01, // threshold for entire image
  failureThresholdType: 'percent' // percent of image or number of pixels
});

Cypress.Commands.add('generateRandomString', length => {
  var text = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    text += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return text;
});

Cypress.Commands.add('loginCMS', (username, password) => {
  cy.visit('https://new-content-staging.formlabs.com/admin/login/');
  cy.get('#show-admin-log-in').click();
  cy.get('#id_username').type(username);
  cy.get('#id_password').type(password);
  cy.get('.submit-row > input').click();
});
