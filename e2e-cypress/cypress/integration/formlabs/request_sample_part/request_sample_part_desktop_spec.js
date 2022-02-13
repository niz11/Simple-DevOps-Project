describe('Request sample part: Desktop', () => {
  it('TC1.1 Tests application & printer filter and tests request sample part flow', () => {
    //Clears the abtest_202011_Sample_Request_Single_Form Cookie
    cy.clearCookie('abtest_202011_Sample_Request_Single_Form');
    //Visit the Request Sample Part page
    cy.visit(Cypress.env('HOST') + '/request-sample-part/');

    //Set the A/B Test Cookie value
    cy.setCookie(
      'abtest_202011_Sample_Request_Single_Form',
      'Single_Form_Sample_Request_Single_Form'
    );
    //Varify the set value of A/B Test Cookie
    cy.getCookie('abtest_202011_Sample_Request_Single_Form').should(
      'have.property',
      'value',
      'Single_Form_Sample_Request_Single_Form'
    );
    //Filters the parts by Application and Printer and select "Draft" sample part
    cy.get('select[aria-label="Filter by Application"]').select('Standard');
    cy.get('select[aria-label="Filter by Printer"]').select('Form 3');
    cy.get('p')
      .contains('Draft')
      .click();

    cy.get('span')
      .contains('Proceed with Draft')
      .click();
    //Uses user_data from fixtures
    cy.fixture('user_data').then(user => {
      //Enters the user data
      cy.get('input[aria-label="First Name"]').type(user.firstName);
      cy.get('input[aria-label="Last Name"]').type(user.lastName);
      cy.get('[id^=Sample_Parts][id$=_email_Email]').type(user.email);
      cy.wait(3000);

      //Enters data in Tell us some more fields
      cy.get('#Sample_Parts_text_Company').type(user.company);
      cy.get('#Sample_Parts_companySize_NumberOfEmployees').select(
        'Self-employed'
      );
      cy.get(
        '[id^=Sample_Parts_occupation_How_would_you_describe_yourself]'
      ).select('Engineer');
      cy.get(
        '[id^=Sample_Parts_select_How_do_you_plan_to_use_your_sample_part]'
      ).select('Evaluating purchasing a 3D printer');
      cy.wait(3000);

      //Enters Shipping Address
      cy.get('#Sample_Parts_text_Address').type(user.street);
      cy.get('#Sample_Parts_text_City').type(user.city);
      cy.get('[id^=Sample_Parts_country]').select('Germany');
      cy.get('#Sample_Parts_text_PostalCode').type(user.postalCode);
      cy.get('#Sample_Parts_tel_Phone').type(user.mobNumber);
    });

    //Confirms Order
    cy.get('button')
      .contains('Confirm Order')
      .click();
    cy.wait(3000);
    // Verify Thank you page at successful sample part request submission
    cy.contains('Thank you for your request');
  });
});
