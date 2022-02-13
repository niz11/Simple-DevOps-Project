describe('Forms: Desktop', () => {
  it('TC5.1 Tests Contact Sales form', () => {
    //Visit HOST
    cy.visit(Cypress.env('HOST') + '/shipping/30-day-guarantee/');

    //Enter data in all fields
    cy.fixture('user_data').then(user => {
      cy.get('#Contact_Sales_text_FirstName').type(user.firstName);
      cy.get('#Contact_Sales_text_LastName').type(user.lastName);
      cy.get('#Contact_Sales_email_Email').type(user.email);
      cy.get('input[aria-label="Phone"]').type(user.mobNumber);
      cy.get('#Contact_Sales_text_Company').type(user.company);
      cy.get('#Contact_Sales_companySize_NumberOfEmployees').select(
        'Self-employed'
      );
      cy.get(
        '#Contact_Sales_occupation_How_would_you_describe_yourself__c'
      ).select('Engineer');
      cy.get('#Contact_Sales_countryAndUsState_Country').select('Germany');
      cy.get('#Contact_Sales_industry_Industry').select('Medical');
      cy.get('#Contact_Sales_textarea_Sales_Question__c').type(
        'Some text here'
      );

      //Submit form
      cy.get('button[form="form_Contact_Sales"]').click();

      //Varify that message shows after successful form submission
      cy.get('span[class^="Form_message"]').should('be.visible');
    });
  });
});
