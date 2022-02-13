Cypress.Commands.add(
    'createAccount',
    (email, firstName, lastName, username, password) => {
      //Enter user data on sign up form
      cy.get('#email_address').type(email);
      cy.get('#firstname').type(firstName);
      cy.get('#lastname').type(lastName);
      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('#password-confirmation').type(password);
  
      //Agree to the Privacy Policy
      cy.get('span').contains('I have read and agree to the').click();
      cy.wait(2000);
  
      //Click on Create Account button
      cy.get('.account > .fieldset > .actions-toolbar > .primary-button').click();
    }
  );