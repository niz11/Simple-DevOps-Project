describe('ROI Calculator: Desktop', () => {
  it('TC6.1 Test one path and final report', () => {
    cy.visit(Cypress.env('HOST') + '/roi');
    //Select industry
    cy.get('img[alt="Manufacturing"]').click();
    cy.get('span').contains('Continue').click();

    //Select printer
    cy.get('img[alt="Form 3L"]').click();
    cy.get('span').contains('Continue').click();

    //Select Part
    cy.get('img[alt="Enclosure"]').click();
    cy.get('span').contains('Continue').click();

    //Continue with default production need values
    cy.get('span').contains('Continue').click();

    //Change values at last step
    cy.get('#industries').select('Engineering');
    cy.get('#printers').select('Fuse 1');
    cy.get('#parts').select('Bike Pedals');
    cy.get('img[alt="Bike Pedals"]').should('be.visible');
    cy.get('#production-parts').type('{leftarrow}1');
    cy.get('#production-time').select('week');
    cy.get('#production-cost').type('{backspace}{backspace}{rightarrow}5');

    //Fill form to see Your Complete Report
    cy.fixture('user_data').then(user => {
      cy.get('#ROI_Calculator_text_FirstName').type(user.firstName);
      cy.get('#ROI_Calculator_text_LastName').type(user.lastName);
      cy.get('#ROI_Calculator_email_Email').type(user.email);
      cy.get('input[aria-label="Phone"]').type(user.mobNumber);
      cy.get('#ROI_Calculator_text_Company').type(user.company);
      cy.get('#ROI_Calculator_countryAndUsState_Country').select('Germany');
      cy.get(
        'select[id^="ROI_Calculator_occupation_How_would_you_describe_yourself"]'
      ).select('Engineer');
      cy.get('button[form="form_ROI_Calculator"]').click();
    });

    //Verify parts per year and per month calculations
    cy.get('span')
      .contains('Parts Per Year')
      .siblings()
      .should('contain', '780');
    cy.get('span')
      .contains('Parts Per Month')
      .siblings()
      .should('contain', '65');

    //Verify Cost per Part Depending on Production Rate calculations and graph are visible
    cy.get('span').contains('Cost per Part').siblings().should('contain', '16');
    cy.get('svg#costPerPart').should('be.visible');

    //Compare to Alternatives
    //Outsourcing (Benchmark)
    cy.get('svg#costOverTime').should('be.visible');
    //Verify graphs for Outsourced Production & In-House Alternative are visible
    cy.get('button').contains('Outsourced Production').click();
    cy.get('svg#costOverTime').should('be.visible');

    //Verify Costs per Part Breakdown Table is visible
    cy.get('div[class^="CostBreakdownTable"]').should('be.visible');

    //Verify Production Time for a Single Part graph is visible
    cy.get('div[class^="LeadTimesGraph"]').should('be.visible');
  });
});
