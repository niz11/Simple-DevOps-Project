beforeEach(() => {
  //Visit HOST
  cy.visit(Cypress.env('HOST'));
});
describe('User account: Desktop', () => {
  it('TC3.1 Tests new user account creation flow', () => {
    //Open cart to visit signin page
    cy.get('.fl-v2-fl-shopping_cart').click();

    //Visit Sign in/ Sign up page
    cy.get('a').contains('Sign In to Your Account').click();

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

      //Verify that after account creation user is on "My account" page
      cy.get('.block-dashboard-info > .block-title > strong').should(
        'contain',
        'Account Information'
      );
    });
  });
  it('TC3.2 Tests customer login & logout through the signin drop down', () => {
    cy.get('[title="Sign In"]').trigger('mouseover');
    cy.fixture('user_data').then(user => {
      //Enter login credentials to login
      cy.get('#username').type(user.email);
      cy.get('#password').type(user.password);
      cy.get('[value="Log In"]').click();
      cy.wait(3000);

      //Varify that customer is logged in
      cy.contains('FL').should('be.visible');

      //Logout customer
      cy.get('span').contains('FL').trigger('mouseover');
      cy.get('span').contains('Sign Out').click();

      //Varify that Customer is logged out
      cy.get('[title="Sign In"]').should('have.class', 'fl-v2-fl-user');
    });
  });

  it('TC3.3 Tests customer login through Cart page & logout through My Account page', () => {
    //Open cart to visit signin page
    cy.get('.fl-v2-fl-shopping_cart').click();

    //Visit Sign in/ Sign up page
    cy.get('a').contains('Sign In to Your Account').click();

    //Enter login credentials to login
    cy.fixture('user_data').then(user => {
      cy.get('#email').type(user.email);
      cy.get('#pass').type(user.password);
      cy.get('#send2').click();
      cy.wait(5000);

      //Verify that customer is logged in and on "My account" page
      cy.get('.block-dashboard-info > .block-title > strong').should(
        'contain',
        'Account Information'
      );

      //Logout customer
      cy.get('.customer-name').click();
      cy.get('a').contains('Sign Out').click();

      //Varify that Customer is logged out
      cy.url().should('contain', 'logoutSuccess');
    });
  });
  it('TC3.4 Tests account password reset flow', () => {
    cy.visit(Cypress.env('HOST') + '/dashboard/#forgot-password/request');

    //Enter email to reset password
    cy.get('input[name="email"]').type('web-service@formlabs.com');
    cy.get('input[type="submit"]').click();

    //Wait and get password reset email from gmail
    cy.wait(6000);
    cy.task('gmail:get-messages', {
      options: {
        from: 'Dashboard+no-reply@formlabs.com',
        subject: 'Reset your password',
        include_body: true
      }
    }).then(emails => {
      assert.isAtLeast(
        emails.length,
        1,
        'Expected to find at least one email, but none were found!'
      );

      //Get password reset link from email
      const email = emails[0].body.html;
      const regex =
        /https:\/\/formlabs.com\/dashboard\/#forgot-password\/.+?(?=<\/p>)/g;
      const url = email.match(regex)[0];

      //Visit link to reset password
      cy.visit(url);
      cy.generateRandomString(8).then(randomString => {
        const password = randomString;
        cy.get('#new_password_textfield').type(password);
        cy.get('#new_password_repeat_textfield').type(password);
        cy.get('.js-submit').click();

        cy.get('.alert-message').should(
          'contain',
          'Your password has been updated, you can use it'
        );

        //Verify that new password works
        cy.get('#login-email_field').type('web-service@formlabs.com', {
          force: true
        });
        cy.get('#login-passwd_field').type(password, { force: true });
        cy.get('#login-submit').click({ force: true });
        cy.get('div').should('contain', 'Welcome to Dashboard!');
      });
    });
  });
});
